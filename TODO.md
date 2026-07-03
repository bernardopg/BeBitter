# TODO — Roadmap BeBitter

> Atualizado: 2026-07-03. Fonte única de próximos passos do site.
> Concluído recentemente: veja o fim do arquivo.

## Fase 1 — SEO técnico & rastreabilidade por IA (curto prazo)

- [ ] **OG images dinâmicas por página/post** — gerar imagens Open Graph
      (1200×630) por rota no build (satori/resvg); hoje todas as páginas usam
      o mesmo ícone 512×512.
- [ ] **Schema.org `BlogPosting` por post** — StructuredData hoje cobre
      person/website/article/service; emitir `BlogPosting` com `datePublished`,
      `dateModified`, `wordCount` e `keywords` em cada `/blog/:slug`.
- [ ] **Schema.org `SoftwareSourceCode`** nas páginas `/projects/:slug`
      (linguagem, licença, repositório, estrelas).
- [ ] **FAQ/HowTo schema em `/services`** — rich results no Google.
- [ ] **`lastmod` real no sitemap** — usar `post.updatedAt ?? post.date` e data
      de commit por rota em vez de `new Date()` global (hoje todo build
      "atualiza" tudo, o que o Google penaliza como lastmod não confiável).
- [ ] **Feed RSS/Atom do blog** (`/feed.xml`) — descoberta por leitores e
      crawlers de IA; linkar no `<head>`.
- [ ] **Indexar via Google Search Console + Bing Webmaster** após cada release
      relevante; monitorar cobertura mensalmente.

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
