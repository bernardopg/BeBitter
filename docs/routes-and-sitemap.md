# Rotas e sitemap

## Como o sitemap é gerado

O sitemap é gerado por [scripts/generate-sitemap.ts](../scripts/generate-sitemap.ts) no `prebuild` e gravado em `public/sitemap.xml` (gitignored; o Vite copia para o `dist`).

As listas vêm das fontes únicas do projeto:

- páginas de projeto: `FEATURED_REPOSITORIES` em [src/constants/config.ts](../src/constants/config.ts)
- posts: `blogPosts` em [src/constants/blog-posts.ts](../src/constants/blog-posts.ts)

Toda URL sai com barra final (`/projects/`, `/blog/<slug>/`), igual ao que o Apache serve para os diretórios pré-renderizados.

## Estado atual

O build atual gera 40 URLs: 4 páginas principais, `/blog`, 8 projetos e 27 posts.

```bash
pnpm sitemap:gen
grep -c '<url>' public/sitemap.xml
```

## Rotas principais

| Rota | Tipo | Changefreq | Prioridade |
| --- | --- | --- | --- |
| `/` | landing page | `weekly` | `1.0` |
| `/projects` | catálogo de projetos | `weekly` | `0.9` |
| `/services` | serviços | `monthly` | `0.9` |
| `/now` | atualizações pessoais | `weekly` | `0.8` |
| `/blog` | índice do blog | `weekly` | `0.8` |

## Páginas de projeto

Publicadas com `changefreq=monthly` e `priority=0.7`, na ordem de `FEATURED_REPOSITORIES`:

| Repositório | URL |
| --- | --- |
| `AiOverviewControl` | `/projects/AiOverviewControl` |
| `LASCMMG` | `/projects/LASCMMG` |
| `ioruba` | `/projects/ioruba` |
| `dms-adguard-vpn-plugin` | `/projects/dms-adguard-vpn-plugin` |
| `cmmg-calendar` | `/projects/cmmg-calendar` |
| `mvp-estetoscopio` | `/projects/mvp-estetoscopio` |
| `GiftPilot` | `/projects/GiftPilot` |
| `steam-idler-python` | `/projects/steam-idler-python` |

Repositórios fora da curadoria continuam acessíveis em `/projects/<repo>`, renderizados em runtime a partir de `app-shell.html`.

## Posts

Cada post vira `/blog/<slug>` com `priority=0.7`. O `lastmod` usa `updatedAt` (ou `date`) do post, em vez do horário do build.

## Pré-render

Depois do `vite build`, `route-html:gen` cria `dist/<rota>/index.html` com `<title>`, description, canonical e `og:*` corretos, e `prerender` injeta o HTML renderizado pelo build SSR dentro do `#root`. Rotas fora dessa lista caem no `app-shell.html` pelo fallback do `.htaccess`.

## Redirecionamentos

| De | Para | Motivo |
| --- | --- | --- |
| `/projects/AutoJoin-for-SteamGifts` | `/projects/GiftPilot/` (301) | repositório renomeado no GitHub |

Ao renomear um repositório da curadoria, atualize `FEATURED_REPOSITORIES` e adicione o 301 em [public/.htaccess](../public/.htaccess), antes do fallback da SPA.

## Validação rápida

```bash
pnpm build
curl -fsSL https://bebitterbebetter.com.br/sitemap.xml | grep -c '<url>'
curl -fsSL https://bebitterbebetter.com.br/robots.txt
```
