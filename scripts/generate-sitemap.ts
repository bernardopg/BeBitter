#!/usr/bin/env tsx
import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = process.env.VITE_SITE_URL || "https://bebitterbebetter.com.br";

// Define routes with individual settings for better SEO
interface Route {
  path: string;
  priority: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

const routes: Route[] = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly", // Homepage updated regularly
  },
  {
    path: "/now",
    priority: "0.9", // High priority for Now page
    changefreq: "weekly", // Updated frequently
  },
];

const now = new Date().toISOString();
const urls = routes
  .map((route) => {
    return `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>\n`;

mkdirSync(resolve("public"), { recursive: true });
writeFileSync(resolve("public/sitemap.xml"), xml);
console.log("Sitemap generated at public/sitemap.xml");
