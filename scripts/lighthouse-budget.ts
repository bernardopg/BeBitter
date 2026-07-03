#!/usr/bin/env tsx
/**
 * Orçamento de performance com Lighthouse (API Node, sem @lhci/cli).
 * Sobe `vite preview` sobre o dist, audita as URLs-chave e falha (exit 1)
 * se qualquer métrica estourar o orçamento.
 *
 * Uso: pnpm build && pnpm lighthouse:budget
 */
import { spawn } from "node:child_process";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const URLS = ["/", "/blog/", "/services/"];

// Baseline 2026-07: SPA sem SSG pinta só após boot do JS (LCP ~5.6s na
// emulação mobile 4x). Orçamento guarda contra REGRESSÃO; a meta de
// LCP < 2.5s depende de pré-render com conteúdo real (ver TODO.md).
const BUDGET = {
  categories: {
    performance: 0.65,
    accessibility: 0.9,
    "best-practices": 0.9,
    seo: 0.95,
  },
  metrics: {
    "largest-contentful-paint": 6500,
    "cumulative-layout-shift": 0.1,
    "total-blocking-time": 500,
  },
} as const;

// Analytics fica fora da auditoria: beacons pendentes travam o "network quiet"
const BLOCKED_PATTERNS = [
  "*googletagmanager.com*",
  "*google-analytics.com*",
  "*google.com/g/collect*",
  "*google.com/ccm/collect*",
];

async function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // servidor ainda subindo
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Servidor não respondeu em ${url}`);
}

async function main() {
  const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "ignore",
    detached: false,
  });

  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  let failures = 0;

  try {
    await waitForServer(BASE + "/");

    const audit = (url: string) =>
      lighthouse(url, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: Object.keys(BUDGET.categories),
        blockedUrlPatterns: [...BLOCKED_PATTERNS],
        maxWaitForLoad: 45_000,
      });

    for (const path of URLS) {
      const url = BASE + path;
      // 1ª navegação após o launch do Chrome falha esporadicamente
      // (NO_FCP/PAGE_HUNG) — uma retentativa resolve o cold start.
      let result = await audit(url);
      if (!result || result.lhr.runtimeError) {
        const code = result?.lhr.runtimeError?.code ?? "sem resultado";
        console.warn(`⚠️  ${path}: ${code} — retentando...`);
        result = await audit(url);
      }

      if (!result) {
        console.error(`❌ ${path}: Lighthouse não retornou resultado`);
        failures++;
        continue;
      }

      const { lhr } = result;
      if (lhr.runtimeError) {
        console.error(`❌ ${path}: ${lhr.runtimeError.code} — ${lhr.runtimeError.message}`);
        failures++;
        continue;
      }

      console.log(`\n📊 ${path}`);
      for (const [cat, min] of Object.entries(BUDGET.categories)) {
        const score = lhr.categories[cat]?.score ?? 0;
        const ok = score >= min;
        if (!ok) failures++;
        console.log(`  ${ok ? "✅" : "❌"} ${cat}: ${(score * 100).toFixed(0)} (mín. ${min * 100})`);
      }
      for (const [audit, max] of Object.entries(BUDGET.metrics)) {
        const value = lhr.audits[audit]?.numericValue ?? Infinity;
        const ok = value <= max;
        if (!ok) failures++;
        console.log(`  ${ok ? "✅" : "❌"} ${audit}: ${value.toFixed(audit.includes("shift") ? 3 : 0)} (máx. ${max})`);
      }
    }
  } finally {
    chrome.kill();
    preview.kill("SIGTERM");
  }

  if (failures > 0) {
    console.error(`\n❌ Orçamento de performance estourado: ${failures} falha(s).`);
    process.exit(1);
  }
  console.log("\n✅ Orçamento de performance dentro do limite em todas as páginas.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
