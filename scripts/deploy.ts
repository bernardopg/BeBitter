import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { parseEnv } from "node:util";

const rootDir = process.cwd();
const envFiles = [".env", ".env.local", ".env.deploy", ".env.deploy.local"];

for (const file of envFiles) {
  const envPath = path.resolve(rootDir, file);
  if (existsSync(envPath)) {
    Object.assign(process.env, parseEnv(readFileSync(envPath, "utf8")));
  }
}

const helpText = `
Usage:
  pnpm deploy:hostinger
  pnpm deploy:hostinger -- --skip-build
  pnpm deploy:hostinger -- --dry-run

Required env vars (.env.deploy or .env.deploy.local):
  DEPLOY_SSH_HOST
  DEPLOY_SSH_PORT
  DEPLOY_SSH_USER
  DEPLOY_SSH_KEY_PATH
  DEPLOY_REMOTE_DIR

Optional:
  DEPLOY_SITE_URL
  DEPLOY_KEEP_BACKUPS   (default: 5)
`.trim();

const args = new Set(process.argv.slice(2));

if (args.has("--help")) {
  console.log(helpText);
  process.exit(0);
}

const skipBuild = args.has("--skip-build");
const dryRun = args.has("--dry-run");

const requiredKeys = [
  "DEPLOY_SSH_HOST",
  "DEPLOY_SSH_PORT",
  "DEPLOY_SSH_USER",
  "DEPLOY_SSH_KEY_PATH",
  "DEPLOY_REMOTE_DIR",
] as const;

const missingKeys = requiredKeys.filter((key) => !process.env[key]);

if (missingKeys.length > 0) {
  console.error(
    `Missing deploy env vars: ${missingKeys.join(", ")}\n\n${helpText}`
  );
  process.exit(1);
}

const deployConfig = {
  host: process.env.DEPLOY_SSH_HOST!,
  port: process.env.DEPLOY_SSH_PORT!,
  user: process.env.DEPLOY_SSH_USER!,
  keyPath: process.env.DEPLOY_SSH_KEY_PATH!,
  remoteDir: process.env.DEPLOY_REMOTE_DIR!,
  siteUrl:
    process.env.DEPLOY_SITE_URL ||
    process.env.VITE_SITE_URL ||
    "https://bebitterbebetter.com.br",
  keepBackups: parsePositiveInt(process.env.DEPLOY_KEEP_BACKUPS, 5),
};

const productionHost = "bebitterbebetter.com.br";
const expectedDir = `/domains/${productionHost}/public_html`;
const remoteDir = deployConfig.remoteDir.replace(/\/$/, "");
if (
  !existsSync(deployConfig.keyPath) ||
  !/^u[0-9]+$/.test(deployConfig.user) ||
  !/^[0-9]{1,5}$/.test(deployConfig.port) ||
  !/^[a-zA-Z0-9][a-zA-Z0-9.-]+$/.test(deployConfig.host) ||
  !/^\/(?:[a-zA-Z0-9_-]+\/)+[a-zA-Z0-9.-]+\/public_html$/.test(remoteDir) ||
  !remoteDir.endsWith(expectedDir) ||
  new URL(deployConfig.siteUrl).origin !== `https://${productionHost}`
) {
  throw new Error("Invalid SSH configuration or deploy target for BeBitter");
}

const remoteTarget = `${deployConfig.user}@${deployConfig.host}`;
const sshArgs = [
  "-i", deployConfig.keyPath,
  "-p", deployConfig.port,
  "-o", "BatchMode=yes",
  "-o", "IdentitiesOnly=yes",
  "-o", "StrictHostKeyChecking=yes",
  "-o", "ConnectTimeout=20",
];
const sshTransport = ["ssh", ...sshArgs].map(quoteForShell).join(" ");
const destination = quoteForShell(remoteDir);
const backupDir = `${remoteDir}.backup-${formatTimestamp(new Date())}`;
const backup = quoteForShell(backupDir);
const lock = quoteForShell(`${remoteDir}.deploy-lock`);
const verifyTarget = [
  `test -d ${destination}`,
  `test "$(realpath -- ${destination})" = "$(realpath -- "$HOME")${expectedDir}"`,
  `test "${remoteDir}" = "$(realpath -- ${destination})"`,
];

function remote(...commands: string[]) {
  run("ssh", [...sshArgs, remoteTarget, ["set -eu", ...verifyTarget, ...commands].join("; ")]);
}

// Subdomains whose document roots Hostinger keeps inside public_html. They are
// deployed by their own projects, so the BeBitter sync must never delete them.
const subdomainDirs = ["browser", "idler"];
const keepRemote = [".well-known", ...subdomainDirs].map((dir) => `--exclude=/${dir}`);

// The sync excludes the subdomain roots, so it can only lose one by deleting
// it. Fails the deploy if a root that existed in the backup is now missing or
// empty, after copying it back. A root that still has files is never touched:
// its own project may have deployed meanwhile, and its content is newer.
function verifySubdomains() {
  remote(...subdomainDirs.map((dir) => {
    const kept = quoteForShell(`${remoteDir}/${dir}`);
    const saved = quoteForShell(`${backupDir}/${dir}`);
    return [
      `if [ -d ${saved} ] && [ -n "$(find ${saved} -type f -print -quit)" ] && [ -z "$(find ${kept} -type f -print -quit 2>/dev/null)" ]`,
      `then rm -rf -- ${kept}; cp -a -- ${saved} ${kept}`,
      `echo "Subdomain ${dir} was removed during the deploy; restored it from the backup" >&2; exit 1; fi`,
    ].join("; ");
  }));
}

async function upload() {
  for (let attempt = 1; ; attempt++) {
    try {
      run("rsync", [
        "-az", "--checksum", "--delay-updates", "--delete-delay",
        ...keepRemote, "--itemize-changes", "--timeout=45",
        ...(dryRun ? ["--dry-run"] : []),
        "-e", sshTransport, "dist/", `${remoteTarget}:${remoteDir}/`,
      ]);
      return;
    } catch (error) {
      if (attempt === 3) throw error;
      await delay(attempt * 5_000);
    }
  }
}

if (!skipBuild) run("pnpm", ["build"]);
for (const file of ["index.html", ".htaccess", "robots.txt", "sitemap.xml", "feed.xml"]) {
  if (!existsSync(path.join(rootDir, "dist", file))) throw new Error(`Missing dist/${file}`);
}

if (dryRun) {
  remote();
  await upload();
} else {
  remote(`mkdir -- ${lock}`);
  try {
    remote(`test ! -e ${backup}`, `cp -a -- ${destination} ${backup}`);
    console.log(`Backup: ${backupDir}`);
    try {
      await upload();
      verifySubdomains();
      run("bash", ["scripts/check-site.sh", deployConfig.siteUrl, "dist"]);
    } catch (error) {
      console.error("Deploy failed. Restoring BeBitter from its backup.");
      try {
        remote(`rsync -a --checksum --delay-updates --delete-delay ${keepRemote.join(" ")} -- ${backup}/ ${destination}/`);
        run("bash", ["scripts/check-site.sh", deployConfig.siteUrl]);
      } catch (rollbackError) {
        throw new AggregateError([error, rollbackError], "Deploy and rollback verification failed", { cause: rollbackError });
      }
      throw error;
    }

    if (deployConfig.keepBackups > 0) {
      const backupGlob = `${destination}.backup-[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9]`;
      try {
        remote(
          `stale=$(ls -1d ${backupGlob} 2>/dev/null | sort -r | tail -n +${deployConfig.keepBackups + 1})`,
          `if [ -n "$stale" ]; then printf '%s\\n' "$stale" | while IFS= read -r dir; do rm -rf -- "$dir"; done; fi`,
        );
      } catch (error) {
        console.warn("Could not prune BeBitter backups:", error);
      }
    }
  } finally {
    remote(`rmdir -- ${lock}`);
  }
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function run(command: string, commandArgs: string[]) {
  const result = spawnSync(command, commandArgs, { cwd: rootDir, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} failed (${result.signal ?? result.status})`);
  }
}

function quoteForShell(value: string) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function formatTimestamp(date: Date) {
  const parts = [
    date.getFullYear().toString(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0"),
  ];

  return `${parts[0]}${parts[1]}${parts[2]}-${parts[3]}${parts[4]}${parts[5]}`;
}
