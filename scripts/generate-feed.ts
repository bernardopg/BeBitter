#!/usr/bin/env tsx
/**
 * Gera feed RSS 2.0 do blog em public/feed.xml (prebuild).
 */
import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "../src/constants/blog-posts";

const SITE_URL = process.env.VITE_SITE_URL || "https://bebitterbebetter.com.br";
const FEED_URL = `${SITE_URL}/feed.xml`;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const sorted = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const items = sorted
  .map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}/`;
    const pubDate = new Date(`${post.date}T12:00:00-03:00`).toUTCString();
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
      <author>bernardo.gomes@bebitterbebetter.com.br (${escapeXml(post.author)})</author>
    </item>`;
  })
  .join("\n");

const lastBuildDate = new Date(
  `${sorted[0].date}T12:00:00-03:00`
).toUTCString();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Bernardo Gomes</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
    <description>Artigos técnicos sobre React, TypeScript, performance web, IA e automação. Conteúdo em PT-BR para desenvolvedores.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>
`;

mkdirSync(resolve("public"), { recursive: true });
writeFileSync(resolve("public/feed.xml"), xml);
console.log(`✅ Feed RSS gerado em public/feed.xml (${sorted.length} posts)`);
