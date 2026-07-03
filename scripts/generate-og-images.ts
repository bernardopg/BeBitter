#!/usr/bin/env tsx
/**
 * Gera imagens Open Graph (1200×630) por rota em build time.
 * SVG composto manualmente e rasterizado com sharp (sem dependências novas).
 * Saída: public/images/og/<nome>.png (gitignored; copiado para dist pelo Vite).
 */
import "dotenv/config";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { blogPosts } from "../src/constants/blog-posts";
import { FEATURED_REPOSITORIES } from "../src/constants/config";
import { ogImageNameForPath } from "../src/utils/og";

const OUT_DIR = resolve("public/images/og");

interface OgSpec {
  path: string;
  title: string;
  subtitle: string;
  badge: string;
}

const SITE_LABEL = "bebitterbebetter.com.br";
const AUTHOR = "Bernardo Gomes";

const specs: OgSpec[] = [
  {
    path: "/",
    title: "Frontend, automação\ne Linux",
    subtitle: "Produtos refinados para web, Linux e fluxos de saúde",
    badge: "Portfólio",
  },
  {
    path: "/projects",
    title: "Projetos\nOpen Source",
    subtitle: "React, TypeScript, Python, QML e hardware",
    badge: "Projetos",
  },
  {
    path: "/services",
    title: "Serviços de engenharia\nde produto e automação",
    subtitle: "Frontend, automações, ferramentas internas e Linux",
    badge: "Serviços",
  },
  {
    path: "/blog",
    title: "Blog — Artigos\nTécnicos",
    subtitle: "React, TypeScript, performance, IA e Linux",
    badge: "Blog",
  },
  {
    path: "/now",
    title: "O que estou\nfazendo agora",
    subtitle: "Foco atual, projetos em andamento",
    badge: "Now",
  },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: wrapTitle(post.title),
    subtitle: `${post.readingTime} min de leitura · ${post.tags.join(" · ")}`,
    badge: "Blog",
  })),
  ...FEATURED_REPOSITORIES.map((repo) => ({
    path: `/projects/${repo}`,
    title: wrapTitle(repo),
    subtitle: "Projeto open source",
    badge: "Projeto",
  })),
];

/** Quebra título em até 3 linhas de ~24 caracteres. */
function wrapTitle(text: string, maxLen = 24, maxLines = 3): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxLen && current) {
      lines.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{3}$/, "") + "…";
  }
  return lines.join("\n");
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSvg(spec: OgSpec): string {
  const titleLines = spec.title.split("\n").map(escapeXml);
  const titleSize = titleLines.some((l) => l.length > 20) ? 64 : 76;
  const lineHeight = titleSize * 1.18;
  const titleStartY = 300 - ((titleLines.length - 1) * lineHeight) / 2;

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${titleStartY + i * lineHeight}">${line}</tspan>`
    )
    .join("");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0b12"/>
      <stop offset="100%" stop-color="#16121f"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- grade sutil -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
  </g>

  <!-- badge -->
  <rect x="80" y="96" rx="18" ry="18" width="${spec.badge.length * 15 + 48}" height="40" fill="url(#accent)" opacity="0.92"/>
  <text x="${80 + (spec.badge.length * 15 + 48) / 2}" y="123" font-family="DejaVu Sans, Arial, sans-serif" font-size="21" font-weight="700" fill="#ffffff" text-anchor="middle">${escapeXml(spec.badge)}</text>

  <!-- título -->
  <text font-family="DejaVu Sans, Arial, sans-serif" font-size="${titleSize}" font-weight="800" fill="#f5f3ff">${titleTspans}</text>

  <!-- subtítulo -->
  <text x="80" y="${titleStartY + titleLines.length * lineHeight + 20}" font-family="DejaVu Sans, Arial, sans-serif" font-size="28" fill="#a1a1aa">${escapeXml(spec.subtitle.slice(0, 70))}</text>

  <!-- rodapé -->
  <rect x="80" y="536" width="52" height="6" rx="3" fill="url(#accent)"/>
  <text x="80" y="580" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" font-weight="700" fill="#e4e4e7">${escapeXml(AUTHOR)}</text>
  <text x="1120" y="580" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" fill="#7c7c8a" text-anchor="end">${escapeXml(SITE_LABEL)}</text>
</svg>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  let count = 0;
  for (const spec of specs) {
    const name = ogImageNameForPath(spec.path);
    const svg = buildSvg(spec);
    await sharp(Buffer.from(svg))
      .png({ compressionLevel: 9, palette: true })
      .toFile(resolve(OUT_DIR, `${name}.png`));
    count++;
  }

  console.log(`✅ ${count} imagens OG geradas em public/images/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
