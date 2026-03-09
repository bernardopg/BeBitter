# Routes and Sitemap

## Como o sitemap e gerado

O sitemap do projeto e gerado por [scripts/generate-sitemap.ts](../scripts/generate-sitemap.ts) e executado automaticamente no `prebuild`.

Arquivo gerado:

- [public/sitemap.xml](../public/sitemap.xml)

## Estado atual

No build atual, o sitemap contem 11 URLs.

```bash
rg -c '<url>' public/sitemap.xml
```

## Rotas principais

| Rota | Tipo | Changefreq | Prioridade |
| --- | --- | --- | --- |
| `/` | landing page | `weekly` | `1.0` |
| `/projects` | catalogo de projetos | `weekly` | `0.9` |
| `/services` | servicos | `monthly` | `0.9` |
| `/now` | atualizacoes pessoais | `weekly` | `0.8` |

## Paginas de projeto presentes no sitemap atual

| Slug | URL |
| --- | --- |
| `BeBitter` | `/projects/BeBitter` |
| `doctoralia-scrapper` | `/projects/doctoralia-scrapper` |
| `cmmg-calendar` | `/projects/cmmg-calendar` |
| `mvp-estetoscopio` | `/projects/mvp-estetoscopio` |
| `arduino-audio-controller` | `/projects/arduino-audio-controller` |
| `dms-adguard-vpn-plugin` | `/projects/dms-adguard-vpn-plugin` |
| `AutoJoin-for-SteamGifts` | `/projects/AutoJoin-for-SteamGifts` |

Essas URLs sao publicadas com `changefreq=monthly` e `priority=0.7`.

## Validacao rapida

```bash
pnpm sitemap:gen
curl -fsSL https://bebitterbebetter.com.br/sitemap.xml
curl -fsSL https://bebitterbebetter.com.br/robots.txt
```

## Observacoes

- `lastmod` reflete o momento do build.
- O sitemap cobre apenas rotas publicas renderizadas pelo portfolio.
- Sempre que o catalogo de projetos mudar, o arquivo gerado pode ganhar ou perder entradas.
