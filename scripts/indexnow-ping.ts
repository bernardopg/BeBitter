#!/usr/bin/env tsx
/**
 * Notifica mecanismos de busca via IndexNow (Bing, Yandex, Naver, Seznam)
 * sobre as URLs do site. Não requer conta — apenas a chave pública em
 * public/<KEY>.txt (deve estar publicada antes do ping).
 *
 * Uso: pnpm indexnow:ping (rodar após cada deploy com conteúdo novo)
 */
import "dotenv/config";
import { blogPosts } from "../src/constants/blog-posts";
import { FEATURED_REPOSITORIES } from "../src/constants/config";

const SITE_URL = process.env.VITE_SITE_URL || "https://bebitterbebetter.com.br";
const HOST = new URL(SITE_URL).host;
const KEY = "1be9dd1a7dd9a81e9806ea5fe68e37ef";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/projects/`,
  `${SITE_URL}/services/`,
  `${SITE_URL}/blog/`,
  `${SITE_URL}/now/`,
  ...FEATURED_REPOSITORIES.map((repo) => `${SITE_URL}/projects/${repo}/`),
  ...blogPosts.map((post) => `${SITE_URL}/blog/${post.slug}/`),
];

async function main() {
  // Confere que a chave está publicada antes de pingar
  const keyCheck = await fetch(KEY_LOCATION);
  if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
    console.error(`❌ Chave IndexNow não publicada em ${KEY_LOCATION} — faça o deploy primeiro.`);
    process.exit(1);
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  // 200 = ok, 202 = aceito (chave será validada depois)
  if (res.status === 200 || res.status === 202) {
    console.log(`✅ IndexNow: ${urls.length} URLs enviadas (HTTP ${res.status})`);
  } else {
    console.error(`❌ IndexNow falhou: HTTP ${res.status} ${await res.text()}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
