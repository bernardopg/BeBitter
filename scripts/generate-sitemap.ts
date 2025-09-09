#!/usr/bin/env tsx
import 'dotenv/config';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = process.env.VITE_SITE_URL || 'https://bebitterbebetter.com.br';

// Add all public routes here as the site grows
const routes = ['/', '/now'];

const now = new Date().toISOString();
const urls = routes
  .map((path) => {
    const priority = path === '/' ? '1.0' : '0.8';
    const changefreq = path === '/' ? 'weekly' : 'weekly';
    return `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>\n`;

mkdirSync(resolve('public'), { recursive: true });
writeFileSync(resolve('public/sitemap.xml'), xml);
console.log('Sitemap generated at public/sitemap.xml');

