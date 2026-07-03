# TODO — Roadmap BeBitter

> Atualizado: 2026-07-03. Fonte única de próximos passos do site.
> Concluído recentemente: veja o fim do arquivo.

## Fase 1 — SEO técnico & rastreabilidade por IA (curto prazo)

- [x] **OG images dinâmicas por página/post** — geradas no build
      (`scripts/generate-og-images.ts`, SVG + sharp, 1200×630, sem novas
      dependências); injetadas por rota no HTML pré-renderizado.
- [x] **Schema.org `BlogPosting` por post** — `keywords`, `wordCount`,
      `timeRequired`, `articleSection`, `datePublished/Modified`.
- [x] **Schema.org `SoftwareSourceCode`** nas páginas `/projects/:slug`
      (linguagem, licença, repositório, estrelas, tópicos).
- [x] **FAQ schema em `/services`** — seção visível (accordion PT/EN,
      `src/constants/services-faq.ts`) + JSON-LD `FAQPage`.
- [x] **`lastmod` real no sitemap** — posts usam `updatedAt ?? date`.
      Pendente: lastmod por data de commit para rotas estáticas.
- [x] **Feed RSS do blog** (`/feed.xml`) — RSS 2.0 gerado no prebuild,
      linkado no `<head>`.
- [ ] **Indexar via Google Search Console + Bing Webmaster** após cada release
      relevante; monitorar cobertura mensalmente. (recorrente — feito em
      2026-07-03: sitemap.xml reenviado, feed.xml adicionado, reindexação
      solicitada para /, /blog/ e /services/; Bing coberto via IndexNow —
      rodar `pnpm indexnow:ping` após cada deploy com conteúdo novo)

## Fase 2 — Performance & Core Web Vitals

- [x] **Lighthouse CI no GitHub Actions** — `scripts/lighthouse-budget.ts`
      (Lighthouse 13 via API Node + vite preview) roda em todo push/PR
      (`lighthouse.yml`); orçamento anti-regressão: perf ≥65, a11y ≥90,
      BP ≥90, SEO ≥95, LCP ≤6.5s, CLS ≤0.1, TBT ≤500ms.
- [ ] **Meta LCP < 2.5s** — exige pré-render com conteúdo real (SSG das
      rotas, ex.: vite-ssg ou prerender custom); hoje o SPA pinta só após
      boot do JS (LCP ~4.4-5s na emulação mobile 4x). Maior alavanca de
      performance restante.
- [x] **Imagens** — perfil já servido em AVIF/WebP com `<picture>`;
      original de 3MB e 6MB de screenshots mortos removidos do deploy;
      preload responsivo em AVIF (antes preloadava o JPEG de 3MB).
- [x] **Font loading** — Google Fonts (Inter/Sora) agora assíncrono
      (media=print até onload + noscript), display=swap mantido.
- [x] **Reduzir JS inicial** — LazyMotion + `m` (chunk motion 40→27KB gz);
      widget WhatsApp (300KB) só carrega na primeira interação; animação
      de digitação isolada em componente-folha (`TypingText`).
- [x] **Service Worker revisado** — network-first para HTML, SWR para
      estáticos, purga por versão de cache; perfil AVIF pré-cacheado.

## Fase 3 — Conteúdo & autoridade orgânica

- [ ] **1 post técnico/mês** — cadência realista; priorizar casos reais
      (automação saúde, plugins QML, hardware ioruba) que ninguém mais cobre.
- [ ] **Página de estudo de caso por projeto destaque** — problema → solução →
      stack → resultado, com screenshots; converte melhor que card de repo.
- [ ] **Depoimentos/prova social em `/services`** — pedir a clientes/colegas.
- [ ] **Cross-post no dev.to/Hashnode com canonical** apontando para o blog —
      tráfego e backlinks sem duplicate content.
- [ ] **Newsletter simples** (Buttondown/Listmonk) — captura de e-mail no blog.

## Fase 4 — Funcionalidades & integrações

- [ ] **Integração GitLab API** — unir repositórios do GitLab
      (gitlab.com/bernardopg) aos do GitHub na página `/projects`, com badge
      de origem (hoje o GitLab aparece apenas como link social).
- [ ] **Busca no blog** — client-side (fuse.js) sobre título/tags/excerpt.
- [ ] **Página `/uses`** — setup, ferramentas, hardware; padrão da comunidade
      e ótimo para long-tail SEO.
- [ ] **Modo apresentação do portfólio** — rota `/cv` imprimível (PDF via
      print stylesheet) para recrutadores.
- [ ] **Comentários no blog** — giscus (GitHub Discussions), zero backend.

## Fase 5 — Infra & qualidade contínua

- [ ] **Deploy automatizado via GitHub Actions** — hoje o deploy é manual
      (`pnpm deploy:hostinger` via SSH); mover chave para secret e criar
      workflow `deploy.yml` disparado por release publicada.
- [ ] **Testes E2E (Playwright)** — fluxos críticos: navegação, troca de
      idioma/tema, formulário de contato, filtro do blog.
- [ ] **Aumentar cobertura de testes unitários** — meta 70% em `src/hooks` e
      `src/contexts`.
- [ ] **Renovate ou dependabot mensal agrupado** — reduzir ruído de PRs.
- [ ] **Monitoramento de uptime + Web Vitals reais** (RUM) — hoje só
      web-vitals no client; enviar para endpoint próprio ou GA4 e alertar.

---

## Concluído (histórico recente)

### 2026-07-03 (Fase 2)

- [x] Fase 2 concluída: orçamento Lighthouse no CI, LazyMotion, WhatsApp
      on-interaction, fontes assíncronas, imagens saneadas (-9MB), SW ok.
      Restante: SSG para LCP < 2.5s (movido para item próprio).

### 2026-07-03 (Fase 1)

- [x] Fase 1 completa (exceto indexação manual no GSC/Bing): OG images
      dinâmicas, BlogPosting/SoftwareSourceCode/FAQPage schemas, lastmod real,
      feed RSS.

### 2026-07-03

- [x] Dependências 100% atualizadas (47 pacotes), zero vulnerabilidades;
      PRs dependabot #77/#78 fechados como supersedidos.
- [x] Scroll-to-top automático na troca de rota (`ScrollToTop.tsx`).
- [x] Curadoria de projetos em destaque reordenada por relevância.
- [x] Blog reduzido de 25 → 12 posts; tags normalizadas em ~10 categorias;
      destaques fixados no topo.
- [x] GitLab adicionado (config, hero, footer, structured data `sameAs`).
- [x] `llms.txt` publicado para crawlers de IA.
- [x] `typecheck` no CI; 26 erros TypeScript pré-existentes corrigidos.
- [x] Workflows: lockfile estrito, CodeQL enxuto (sem build), timeouts.
- [x] Fonte única `FEATURED_REPOSITORIES` (config → sitemap → route-html).
