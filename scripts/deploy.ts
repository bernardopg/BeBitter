import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";

const rootDir = process.cwd();
const envFiles = [".env", ".env.local", ".env.deploy", ".env.deploy.local"];

for (const file of envFiles) {
  const envPath = path.resolve(rootDir, file);
  if (existsSync(envPath)) {
    loadEnv({ path: envPath, override: true });
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
};

if (!existsSync(deployConfig.keyPath)) {
  console.error(`SSH key not found: ${deployConfig.keyPath}`);
  process.exit(1);
}

const remoteTarget = `${deployConfig.user}@${deployConfig.host}`;
const sshArgs = [
  "-i",
  deployConfig.keyPath,
  "-p",
  deployConfig.port,
  "-o",
  "StrictHostKeyChecking=accept-new",
];
const sshTransport = `ssh -i ${quoteForShell(deployConfig.keyPath)} -p ${quoteForShell(deployConfig.port)} -o StrictHostKeyChecking=accept-new`;
const backupSuffix = formatTimestamp(new Date());
const backupDir = `${deployConfig.remoteDir}.backup-${backupSuffix}`;

if (!skipBuild) {
  run("pnpm", ["build"]);
}

if (!dryRun) {
  run("ssh", [
    ...sshArgs,
    remoteTarget,
    [
      "set -eu",
      `test -d ${quoteForShell(deployConfig.remoteDir)}`,
      `test ! -e ${quoteForShell(backupDir)}`,
      `cp -a ${quoteForShell(deployConfig.remoteDir)} ${quoteForShell(backupDir)}`,
      `printf 'Remote backup created: %s\\n' ${quoteForShell(backupDir)}`,
    ].join("; "),
  ]);
}

const rsyncArgs = [
  "-az",
  "--delete",
  "--checksum",
  "--human-readable",
  "--itemize-changes",
  ...(dryRun ? ["--dry-run"] : []),
  "-e",
  sshTransport,
  "dist/",
  `${remoteTarget}:${deployConfig.remoteDir}/`,
];

run("rsync", rsyncArgs);

if (!dryRun) {
  run("ssh", [
    ...sshArgs,
    remoteTarget,
    [
      "set -eu",
      `chmod -R u=rwX,go=rX ${quoteForShell(deployConfig.remoteDir)}`,
      `test -f ${quoteForShell(path.posix.join(deployConfig.remoteDir, "index.html"))}`,
      `test -f ${quoteForShell(path.posix.join(deployConfig.remoteDir, ".htaccess"))}`,
      `test -f ${quoteForShell(path.posix.join(deployConfig.remoteDir, "robots.txt"))}`,
      `test -f ${quoteForShell(path.posix.join(deployConfig.remoteDir, "sitemap.xml"))}`,
      "printf 'Remote verification passed.\\n'",
    ].join("; "),
  ]);

  verifyHttp(deployConfig.siteUrl);
}

function run(command: string, commandArgs: string[], captureOutput = false) {
  const printableArgs = commandArgs.map((arg) =>
    /\s/.test(arg) ? quoteForShell(arg) : arg
  );
  console.log(`\n$ ${command} ${printableArgs.join(" ")}`);

  const result = spawnSync(command, commandArgs, {
    cwd: rootDir,
    encoding: "utf8",
    stdio: captureOutput ? ["inherit", "pipe", "pipe"] : "inherit",
  });

  if (result.status !== 0) {
    if (captureOutput) {
      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
    }
    process.exit(result.status ?? 1);
  }

  return captureOutput ? result.stdout : "";
}

function verifyHttp(siteUrl: string) {
  const indexHtml = run(
    "curl",
    ["-fsSL", "-H", "Cache-Control: no-cache", siteUrl],
    true
  );
  const robotsTxt = run("curl", ["-fsSL", `${siteUrl}/robots.txt`], true);
  const sitemapXml = run("curl", ["-fsSL", `${siteUrl}/sitemap.xml`], true);

  assertIncludes(indexHtml, "<div id=\"root\"></div>", "homepage root");
  assertIncludes(robotsTxt, "Sitemap:", "robots sitemap declaration");
  assertIncludes(sitemapXml, "<urlset", "sitemap urlset");

  console.log("\nHTTP verification passed.");
}

function assertIncludes(contents: string, expected: string, label: string) {
  if (!contents.includes(expected)) {
    console.error(`Expected ${label} to include: ${expected}`);
    process.exit(1);
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
