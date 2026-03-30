# BeBitter

<div align="center">
  <img src="public/images/logos/BeBitter.svg" alt="Logo do BeBitter" width="140" />
  <p><strong>Portfólio de Bernardo Gomes</strong><br />React 19, TypeScript, Vite 7 e foco em performance, segurança e SEO.</p>

  <p>
    <a href="https://bebitterbebetter.com.br"><img alt="Website" src="https://img.shields.io/website?style=flat-square&up_message=online&down_message=offline&url=https%3A%2F%2Fbebitterbebetter.com.br" /></a>
    <a href="https://github.com/bernardopg/BeBitter/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/bernardopg/BeBitter/ci.yml?branch=main&style=flat-square&label=CI" /></a>
    <a href="https://github.com/bernardopg/BeBitter/actions/workflows/codeql-eslint-nodejs.yml"><img alt="CodeQL" src="https://img.shields.io/github/actions/workflow/status/bernardopg/BeBitter/codeql-eslint-nodejs.yml?branch=main&style=flat-square&label=CodeQL" /></a>
    <a href="LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/bernardopg/BeBitter?style=flat-square" /></a>
    <a href="https://github.com/bernardopg/BeBitter/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/bernardopg/BeBitter?style=flat-square" /></a>
  </p>

  <p>
    <img alt="Node 20-22" src="https://img.shields.io/badge/node-20--22-339933?style=flat-square&logo=node.js&logoColor=white" />
    <img alt="pnpm 10" src="https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white" />
    <img alt="React 19" src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square&logo=react&logoColor=111827" />
    <img alt="TypeScript 5.9" src="https://img.shields.io/badge/typescript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Vite 7" src="https://img.shields.io/badge/vite-7-646CFF?style=flat-square&logo=vite&logoColor=white" />
    <img alt="Tailwind CSS 4.2" src="https://img.shields.io/badge/tailwindcss-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  </p>
</div>

## Visão geral

BeBitter é o portfólio público de Bernardo Gomes. O projeto entrega uma homepage modular, páginas de serviços e atualizações pessoais, catálogo de projetos integrado ao GitHub e páginas detalhadas por repositório.

O stack principal usa React 19, TypeScript, Vite 7, Tailwind CSS 4, Radix UI e TanStack Query. Em produção, o build gera sitemap automaticamente, aplica inlining de CSS crítico, gera assets comprimidos em gzip e Brotli e publica `dist/` na Hostinger via SSH com backup remoto e verificação HTTP.

## Preview

<table>
  <tr>
    <td><img src="public/images/screenshots/bebitterbebetter-br-home-light.png" alt="Home em tema claro" width="100%" /></td>
    <td><img src="public/images/screenshots/bebitterbebetter-br-home-dark.png" alt="Home em tema escuro" width="100%" /></td>
  </tr>
  <tr>
    <td align="center">Home · light · pt-BR</td>
    <td align="center">Home · dark · pt-BR</td>
  </tr>
  <tr>
    <td><img src="public/images/screenshots/bebitterbebetter-pt-now-light.png" alt="Página Now em tema claro" width="100%" /></td>
    <td><img src="public/images/screenshots/bebitterbebetter-en-now-dark.png" alt="Página Now em tema escuro" width="100%" /></td>
  </tr>
  <tr>
    <td align="center">Now · light · pt-BR</td>
    <td align="center">Now · dark · en</td>
  </tr>
</table>

## O que este repositório cobre

- Site público com rotas `/`, `/projects`, `/services` e `/now`.
- Páginas de projeto alimentadas pela API do GitHub com cache no cliente.
- Pipeline de qualidade com `lint`, `test`, `build`, CodeQL e Dependency Review.
- Sanitização do HTML vindo dos READMEs do GitHub antes da renderização.
- Deploy para Hostinger com `rsync`, backup remoto e checagem pós-publicação.

## Stack

| Área | Ferramentas |
| --- | --- |
| Frontend | React 19, React Router 7, TypeScript 5.9 |
| UI | Tailwind CSS 4.2, Radix UI, shadcn/ui, Framer Motion |
| Dados | TanStack Query, React Context, GitHub REST API |
| Formulários | React Hook Form, Zod |
| Qualidade | ESLint 10, Vitest 4, Testing Library, CodeQL |
| Build | Vite 7, Critters, gzip, Brotli |
| Deploy | SSH + rsync para Hostinger |

## Rotas e sitemap

O sitemap é gerado por `pnpm sitemap:gen` durante o `build` e publica as rotas principais do site e as páginas individuais de projetos. As rotas públicas base são:

| Rota | Papel | Prioridade |
| --- | --- | --- |
| `/` | Landing page principal | `1.0` |
| `/projects` | Catálogo de projetos | `0.9` |
| `/services` | Página comercial | `0.9` |
| `/now` | Atualizações correntes | `0.8` |

O detalhe das URLs geradas está em [docs/routes-and-sitemap.md](docs/routes-and-sitemap.md).

## Rodando localmente

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Validações úteis:

```bash
pnpm ci:check
pnpm security:audit
pnpm build
```

## Deploy

O deploy padrão publica `dist/` na Hostinger via SSH.

```bash
cp .env.deploy.example .env.deploy
pnpm deploy:hostinger -- --dry-run
pnpm deploy:hostinger
```

Checklist completa em [DEPLOY-CHECKLIST.md](DEPLOY-CHECKLIST.md).

## Documentação

- [docs/README.md](docs/README.md) - índice da documentação
- [docs/technical-overview.md](docs/technical-overview.md) - arquitetura, stack e automação
- [docs/routes-and-sitemap.md](docs/routes-and-sitemap.md) - rotas públicas e estrutura do sitemap
- [SECURITY.md](SECURITY.md) - postura de segurança e hardening
- [PERFORMANCE-OPTIMIZATION.md](PERFORMANCE-OPTIMIZATION.md) - estratégia de performance
- [SEO-CHECKLIST.md](SEO-CHECKLIST.md) - itens de SEO e indexação
- [scripts/README.md](scripts/README.md) - scripts de build, deploy e otimização

## Contato

- Site: [bebitterbebetter.com.br](https://bebitterbebetter.com.br)
- GitHub: [@bernardopg](https://github.com/bernardopg)
- LinkedIn: [bernardopg](https://www.linkedin.com/in/bernardopg/)
- Email: [bernardo.gomes@bebitterbebetter.com.br](mailto:bernardo.gomes@bebitterbebetter.com.br)

## Licença

Distribuído sob a [MIT License](LICENSE.md).
