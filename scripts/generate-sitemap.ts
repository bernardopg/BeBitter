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

// Featured repositories for individual project pages
const FEATURED_REPOS = [
  "BeBitter",
  "doctoralia-scrapper",
  "cmmg-calendar",
  "mvp-estetoscopio",
  "arduino-audio-controller",
  "dms-adguard-vpn-plugin",
  "AutoJoin-for-SteamGifts",
];

const routes: Route[] = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/projects",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/services",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/now",
    priority: "0.8",
    changefreq: "weekly",
  },
  // Individual project pages
  ...FEATURED_REPOS.map((repo) => ({
    path: `/projects/${repo}`,
    priority: "0.7",
    changefreq: "monthly" as const,
  })),
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