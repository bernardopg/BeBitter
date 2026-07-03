#!/usr/bin/env tsx
import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "../src/constants/blog-posts";
import { FEATURED_REPOSITORIES } from "../src/constants/config";

const SITE_URL = process.env.VITE_SITE_URL || "https://bebitterbebetter.com.br";

// Define routes with individual settings for better SEO
interface Route {
  path: string;
  priority: string;
  lastmod?: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

// Featured repositories for individual project pages (fonte única: config)
const FEATURED_REPOS = [...FEATURED_REPOSITORIES];

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
  // Blog
  {
    path: "/blog",
    priority: "0.8",
    changefreq: "weekly" as const,
  },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: "0.7",
    changefreq: "monthly" as const,
    // lastmod real do post — evita "tudo atualizado" a cada build
    lastmod: `${post.updatedAt ?? post.date}T12:00:00-03:00`,
  })),
];

const now = new Date().toISOString();
const urls = routes
  .map((route) => {
    // Trailing slash: homepage já tem /, outras rotas precisam de / pois Apache redireciona diretórios
    const loc = route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}/`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${route.lastmod ?? now}</lastmod>
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