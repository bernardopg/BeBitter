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

// Dados dos posts do blog (extraídos do blog-posts.ts em build time)
interface BlogPostMeta {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  tags: string[];
  author: string;
}

async function getBlogPosts(): Promise<BlogPostMeta[]> {
  // Importa o módulo compilado se disponível, senão lê o source
  try {
    const mod = await import("../src/constants/blog-posts.js");
    return mod.blogPosts;
  } catch {
    // Fallback: parsear o TS source
    const src = fs.readFileSync(
      path.join(ROOT, "src/constants/blog-posts.ts"),
      "utf-8"
    );
    const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
    const titles = [...src.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
    const excerpts = [...src.matchAll(/excerpt:\s*\n\s*"([^"]+)"/g)].map(
      (m) => m[1]
    );
    return slugs
      .filter((s) => !["slug", "string"].includes(s))
      .map((slug, i) => ({
        slug,
        title: titles[i] ?? slug,
        titleEn: titles[i] ?? slug,
        excerpt: excerpts[i] ?? "",
        tags: [],
        author: "Bernardo Gomes",
      }));
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html: string, meta: RouteMeta): string {
  const { title, description, path: routePath, ogType = "website", ogImage } = meta;
  const canonical = `${BASE_URL}${routePath}`;
  const image =
    ogImage || `${BASE_URL}/images/logos/BeBitter.svg`;

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
  const posts = await getBlogPosts();
  for (const post of posts) {
    routes.push({
      path: `/blog/${post.slug}`,
      title: `${post.titleEn || post.title} | Bernardo Gomes`,
      description: post.excerpt || post.title,
      ogType: "article",
    });
  }

  // Projetos conhecidos do GitHub (estático)
  const projects = [
    "BeBitter",
    "doctoralia-scrapper",
    "cmmg-calendar",
    "mvp-estetoscopio",
    "arduino-audio-controller",
    "dms-adguard-vpn-plugin",
    "AutoJoin-for-SteamGifts",
  ];
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
