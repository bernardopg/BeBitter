/**
 * Pós-build: gera index.html por rota com metadados corretos.
 * Resolve soft 404 e canônica errada no Google Search Console.
 *
 * Para cada rota, cria dist/<rota>/index.html com <title>, <meta description>,
 * <link canonical> e og:* corretos, mantendo todo o resto idêntico ao dist/index.html.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { blogPosts } from "../src/constants/blog-posts";
import { ogImageUrlForPath } from "../src/utils/og.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://bebitterbebetter.com.br";

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  ogImage?: string;
  article?: { date: string; updatedAt?: string; author: string };
}

// Rotas estáticas conhecidas
const staticRoutes: RouteMeta[] = [
  {
    path: "/now",
    title: "Now — O Que Estou Fazendo Agora | Bernardo Gomes",
    description:
      "Foco atual, projetos em andamento e o que está ocupando minha cabeça esta semana — inspirado no movimento /now de Derek Sivers.",
  },
  {
    path: "/services",
    title: "Serviços — Frontend & Automação | Bernardo Gomes",
    description:
      "Desenvolvimento frontend com React e TypeScript, automações Python e integração de sistemas para saúde. Veja como posso ajudar seu projeto.",
  },
  {
    path: "/projects",
    title: "Projetos Open Source | Bernardo Gomes",
    description:
      "Projetos open source: desde automações de saúde até ferramentas Linux e extensões de browser. Explorando código que resolve problemas reais.",
  },
  {
    path: "/blog",
    title: "Blog — Artigos Técnicos | Bernardo Gomes",
    description:
      "Artigos técnicos sobre React, TypeScript, performance web, IA em 2026 e automação. Conteúdo em PT-BR para desenvolvedores.",
  },
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html: string, meta: RouteMeta): string {
  const { title, description, path: routePath, ogType = "website", ogImage } = meta;
  // Trailing slash: Apache redireciona diretórios sem slash → com slash (301)
  // Canonical deve apontar para URL final para evitar redirect chain no GSC
  const canonical = routePath === "/" ? BASE_URL + "/" : `${BASE_URL}${routePath}/`;
  const image = ogImage || ogImageUrlForPath(BASE_URL, routePath);

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  const safeImage = escapeHtml(image);

  // Substituir <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

  // Substituir meta description
  html = html.replace(
    /<meta name="description"\s+content="[^"]*"/,
    `<meta name="description" content="${safeDesc}"`
  );

  // Substituir canonical
  html = html.replace(
    /<link rel="canonical"\s+href="[^"]*"/,
    `<link rel="canonical" href="${safeCanonical}"`
  );

  // Substituir og:title
  html = html.replace(
    /<meta property="og:title"\s+content="[^"]*"/,
    `<meta property="og:title" content="${safeTitle}"`
  );

  // Substituir og:description
  html = html.replace(
    /<meta property="og:description"\s+content="[^"]*"/,
    `<meta property="og:description" content="${safeDesc}"`
  );

  // Substituir og:url
  html = html.replace(
    /<meta property="og:url"\s+content="[^"]*"/,
    `<meta property="og:url" content="${safeCanonical}"`
  );

  // Substituir og:type
  html = html.replace(
    /<meta property="og:type"\s+content="[^"]*"/,
    `<meta property="og:type" content="${escapeHtml(ogType)}"`
  );

  // Substituir og:image
  html = html.replace(
    /<meta property="og:image"\s+content="[^"]*"/,
    `<meta property="og:image" content="${safeImage}"`
  );

  // Substituir og:image:alt
  html = html.replace(
    /<meta property="og:image:alt"\s+content="[^"]*"/,
    `<meta property="og:image:alt" content="${safeTitle}"`
  );

  // Substituir twitter:title
  html = html.replace(
    /<meta name="twitter:title"\s+content="[^"]*"/,
    `<meta name="twitter:title" content="${safeTitle}"`
  );

  // Substituir twitter:description
  html = html.replace(
    /<meta name="twitter:description"\s+content="[^"]*"/,
    `<meta name="twitter:description" content="${safeDesc}"`
  );

  // Substituir twitter:image
  html = html.replace(
    /<meta name="twitter:image"\s+content="[^"]*"/,
    `<meta name="twitter:image" content="${safeImage}"`
  );

  // Substituir twitter:image:alt
  html = html.replace(
    /<meta name="twitter:image:alt"\s+content="[^"]*"/,
    `<meta name="twitter:image:alt" content="${safeTitle}"`
  );

  // Substituir hreflang pt-br
  html = html.replace(
    /<link rel="alternate" hreflang="pt-br"\s+href="[^"]*"/,
    `<link rel="alternate" hreflang="pt-br" href="${safeCanonical}"`
  );

  // Substituir hreflang en
  html = html.replace(
    /<link rel="alternate" hreflang="en"\s+href="[^"]*"/,
    `<link rel="alternate" hreflang="en" href="${safeCanonical}"`
  );

  // Substituir hreflang x-default
  html = html.replace(
    /<link rel="alternate" hreflang="x-default"\s+href="[^"]*"/,
    `<link rel="alternate" hreflang="x-default" href="${safeCanonical}"`
  );

  if (meta.article) {
    const article = {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: meta.title.replace(/ \| Bernardo Gomes$/, ""), description,
      url: canonical, mainEntityOfPage: canonical, inLanguage: "pt-BR",
      datePublished: meta.article.date, dateModified: meta.article.updatedAt ?? meta.article.date,
      author: { "@type": "Person", name: meta.article.author }, image,
    };
    const json = JSON.stringify(article).replace(/</g, "\\u003c");
    html = html.replace("</head>", `<script type="application/ld+json">${json}</script>\n</head>`);
    html = html.replace(/\s*<link rel="alternate" hreflang="(?:pt-br|en|x-default)"[^>]*\/>/g, "");
  }
  return html;
}

async function generateRouteHtml() {
  const baseHtmlPath = path.join(DIST, "index.html");
  if (!fs.existsSync(baseHtmlPath)) {
    console.error("❌ dist/index.html não encontrado — rode pnpm build primeiro");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");
  const routes: RouteMeta[] = [...staticRoutes];

  // Adicionar rotas de blog
  const posts = blogPosts;
  for (const post of posts) {
    routes.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Bernardo Gomes`,
      description: post.excerpt || post.title,
      ogType: "article",
      article: post,
    });
  }

  // Projetos em destaque (fonte única: src/constants/config.ts)
  const { FEATURED_REPOSITORIES } = await import("../src/constants/config.js");
  const projects = [...FEATURED_REPOSITORIES];
  for (const proj of projects) {
    routes.push({
      path: `/projects/${proj}`,
      title: `${proj} — Projeto Open Source | Bernardo Gomes`,
      description: `Detalhes do projeto open source ${proj}: código, tecnologias utilizadas e contribuições.`,
    });
  }

  let count = 0;
  for (const route of routes) {
    const routeDir = path.join(DIST, route.path.slice(1));
    fs.mkdirSync(routeDir, { recursive: true });

    const html = injectMeta(baseHtml, route);
    fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
    count++;
    console.log(`  ✓ ${route.path}`);
  }

  console.log(`\n✅ ${count} rotas com HTML pré-gerado`);
}

generateRouteHtml().catch((err) => {
  console.error("❌ Erro:", err);
  process.exit(1);
});
