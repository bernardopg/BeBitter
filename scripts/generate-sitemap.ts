#!/usr/bin/env tsx
import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "../src/constants/blog-posts";
import { FEATURED_REPOSITORIES } from "../src/constants/config";

const SITE_URL = process.env.VITE_SITE_URL || "https://bebitterbebetter.com.br";

const routes = [
  ...["/", "/projects/", "/services/", "/now/", "/blog/"].map((path) => ({ path, lastmod: undefined })),
  ...FEATURED_REPOSITORIES.map((repo) => ({ path: `/projects/${repo}/`, lastmod: undefined })),
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}/`,
    lastmod: post.updatedAt ?? post.date,
  })),
];

const urls = routes.map(({ path, lastmod }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>\n`;

mkdirSync(resolve("public"), { recursive: true });
writeFileSync(resolve("public/sitemap.xml"), xml);
console.log("Sitemap generated at public/sitemap.xml");