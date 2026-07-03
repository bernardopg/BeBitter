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
      relevante; monitorar cobertura mensalmente. (manual)

## Fase 2 — Performance & Core Web Vitals

- [ ] **Lighthouse CI no GitHub Actions** — orçamento de performance por PR
      (LCP < 2.0s, INP < 200ms, CLS < 0.1); falhar o job se regredir.
- [ ] **Migrar imagens públicas para AVIF/WebP com `srcset`** — hoje
      `optimize:images` existe, mas as tags não usam `<picture>`.
- [ ] **Font loading** — revisar `font-display` e preload da fonte crítica.
- [ ] **Reduzir JS inicial** — auditar `manualChunks`; mover framer-motion
      para import dinâmico nas seções abaixo da dobra.
- [ ] **Revisar Service Worker** — estratégia stale-while-revalidate para
      assets versionados; garantir purga na troca de versão.

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
