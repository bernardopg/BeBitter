#!/usr/bin/env tsx
/**
 * Notifica mecanismos de busca via IndexNow (Bing, Yandex, Naver, Seznam)
 * sobre as URLs do site. Não requer conta — apenas a chave pública em
 * public/<KEY>.txt (deve estar publicada antes do ping).
 *
 * Uso: pnpm indexnow:ping (rodar após publicar o build de dist/)
 */
import { existsSync, readFileSync } from "node:fs";
import { loadEnvFile } from "node:process";

if (existsSync(".env")) loadEnvFile(".env");

const SITE_URL = (process.env.VITE_SITE_URL || "https://bebitterbebetter.com.br").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const KEY = "1be9dd1a7dd9a81e9806ea5fe68e37ef";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

async function main() {
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].replaceAll("&amp;", "&"));
  if (!urls.length || urls.some((url) => new URL(url).host !== HOST)) {
    throw new Error("sitemap.xml vazio ou fora do domínio de produção");
  }

  // Confere que a chave está publicada antes de pingar
  const keyCheck = await fetch(KEY_LOCATION, { signal: AbortSignal.timeout(15_000) });
  if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
    console.error(`❌ Chave IndexNow não publicada em ${KEY_LOCATION} — faça o deploy primeiro.`);
    process.exit(1);
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    signal: AbortSignal.timeout(15_000),
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
