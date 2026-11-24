import { readFileSync, readdirSync } from "node:fs";
import { gzipSync } from "node:zlib";

const entry = readFileSync("dist/index.html", "utf8");
const files = new Set(Array.from(
  entry.matchAll(/(?:src|href)="\/(assets\/[^"]+\.(?:js|css))"/g),
  (match) => match[1],
));
const assets = readdirSync("dist/assets", { recursive: true, encoding: "utf8" })
  .filter((file) => /\.(js|css)$/.test(file));
const size = (file: string) => gzipSync(readFileSync(`dist/${file}`), { level: 9 }).length;
const kib = 1024;

if (!assets.some((file) => file.endsWith(".js")) ||
    ![...files].some((file) => file.endsWith(".js")) ||
    ![...files].some((file) => file.endsWith(".css"))) {
  throw new Error("Build is missing its JavaScript or CSS entry assets");
}

const measurements = [
  { name: "Homepage entry and preloads", bytes: [...files].reduce((sum, file) => sum + size(file), 0), limit: 250 * kib },
  { name: "All JavaScript and CSS", bytes: assets.reduce((sum, file) => sum + size(`assets/${file}`), 0), limit: 620 * kib },
];

for (const { name, bytes, limit } of measurements) {
  console.log(`${name}: ${(bytes / kib).toFixed(1)} KiB gzip (limit ${limit / kib} KiB)`);
  if (bytes > limit) process.exitCode = 1;
}
