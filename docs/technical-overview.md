# Visão técnica

## Objetivo

BeBitter é o portfólio público de Bernardo Gomes. O mesmo código entrega:

- apresentação profissional, serviços e página "Now"
- vitrine de projetos com dados puxados da API do GitHub
- blog técnico bilíngue (títulos e resumos em PT-BR e EN)

## Stack

| Camada | Ferramentas |
| --- | --- |
| App shell | React 19, React DOM 19, React Router 7 |
| Linguagem | TypeScript 6 (strict) |
| Estado e dados | TanStack Query 5, React Context |
| UI | Tailwind CSS 4.3, Radix UI, shadcn/ui, Framer Motion, Lucide |
| Formulários | React Hook Form, Zod |
| Testes | Vitest 5, Testing Library, jsdom |
| Build | Vite 8 (Rolldown), `@vitejs/plugin-react`, plugin próprio de CSS crítico, `vite-plugin-compression` (gzip + Brotli) |
| Qualidade | ESLint 10 (flat config, `jsx-a11y`), Lighthouse 13 |
| Runtime | Node 24 (`.node-version`), pnpm 12 (`packageManager`) |
| Deploy | GitHub Actions + SSH/rsync para Hostinger |

## Rotas públicas

Definidas em [src/App.tsx](../src/App.tsx), todas carregadas com `React.lazy()`:

- `/`
- `/now`
- `/services`
- `/projects`
- `/projects/:slug`
- `/blog`
- `/blog/:slug`
- `*` (404)

Detalhes de sitemap e pré-render em [routes-and-sitemap.md](routes-and-sitemap.md).

## Estrutura do código

```text
src/
├── components/      # layout, SEO, analytics, capa de posts e UI compartilhada (ui/ = shadcn)
├── constants/       # config, traduções, posts do blog e rótulos de tags
├── contexts/        # idioma e catálogo de projetos
├── hooks/           # API do GitHub, idioma, animações e utilitários
├── lib/             # helpers compartilhados
├── pages/           # páginas e seções (Index, Projects, Services, Blog, Now)
├── test/            # setup do Vitest
├── utils/           # segurança, busca do blog, OG, performance
├── entry-server.tsx # entrada SSR usada só pelo pré-render
└── main.tsx         # entrada do cliente (hidratação)
scripts/             # geradores de build, pré-render, deploy e orçamento Lighthouse
```

## Fontes únicas de dados

- `FEATURED_REPOSITORIES` em [src/constants/config.ts](../src/constants/config.ts): curadoria e ordem dos projetos (os 4 primeiros vão para a home). Sitemap, HTML por rota e OG images importam daqui.
- Posts em [src/constants/blog-posts.ts](../src/constants/blog-posts.ts) e [blog-posts-2026.ts](../src/constants/blog-posts-2026.ts).
- Tags dos posts ficam em português nos dados; [blog-tags.ts](../src/constants/blog-tags.ts) traduz o rótulo exibido em inglês e alimenta a busca nos dois idiomas.
- Textos de interface em [src/constants/translations.ts](../src/constants/translations.ts).

## Integrações

- GitHub REST API para listar repositórios e montar páginas de projeto (cache de 5 min via TanStack Query)
- Google Analytics via componente dedicado (fora da auditoria Lighthouse)
- Service worker próprio para cache offline (somente produção)
- Cal.com para agendamento e WhatsApp como contato principal

## Build e entrega

`pnpm build` encadeia três etapas:

1. **prebuild**: `sitemap:gen`, `feed:gen` (RSS) e `og:gen` (imagens Open Graph 1200×630 por rota)
2. **vite build**: bundle com chunks manuais (vendor, ui, router, query, motion, icons), CSS crítico inline e assets gzip + Brotli
3. **postbuild**: `route-html:gen` (HTML com metadados corretos por rota), `build:ssr` e `prerender` (injeta o HTML renderizado no `#root` de cada rota)

O resultado são 40 rotas pré-renderizadas mais `app-shell.html`, usado como fallback para rotas que só existem em runtime.

Uma tag `v*` dispara dois workflows:

- [release.yml](../.github/workflows/release.yml): GitHub Release com tarball do `dist`
- [deploy.yml](../.github/workflows/deploy.yml): roda `ci:check` e delega a [scripts/deploy.ts](../scripts/deploy.ts), o mesmo script do deploy local, que faz backup remoto de `public_html`, `rsync --delete`, ajuste de permissões e verificação de `index.html`, `robots.txt` e `sitemap.xml`

## Qualidade e segurança

- `pnpm ci:check` roda lint, typecheck, testes e build
- [ci.yml](../.github/workflows/ci.yml) executa o mesmo fluxo em Node 24
- [lighthouse.yml](../.github/workflows/lighthouse.yml) aplica o orçamento de performance (`pnpm lighthouse:budget`) em `/`, `/blog/` e `/services/`
- CodeQL e Dependency Review em PRs; Dependabot agrupa atualizações de runtime, tooling e Actions
- Overrides de segurança e exceções de `minimumReleaseAge` (pnpm 12 segura versões recém-publicadas) ficam em [pnpm-workspace.yaml](../pnpm-workspace.yaml)
- HTML de README vindo do GitHub é sanitizado com DOMPurify em [src/utils/security.ts](../src/utils/security.ts)
- HSTS com preload e headers de segurança em [public/.htaccess](../public/.htaccess)

## Variáveis de ambiente

Aplicação local:

```bash
cp .env.example .env.local
```

Variáveis `VITE_*` são embutidas no bundle do cliente: nunca coloque segredos nelas.

Deploy:

```bash
cp .env.deploy.example .env.deploy
```

As variáveis e secrets de deploy estão descritos em [DEPLOY-CHECKLIST.md](../DEPLOY-CHECKLIST.md) e em [scripts/deploy.ts](../scripts/deploy.ts).
