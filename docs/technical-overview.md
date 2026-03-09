# Technical Overview

## Objetivo

BeBitter e um portfolio publico construido para servir duas frentes ao mesmo tempo:

- apresentacao profissional de Bernardo Gomes
- vitrine de projetos com dados puxados do GitHub

## Stack

| Camada | Ferramentas |
| --- | --- |
| App shell | React 19, React DOM 19, React Router 7 |
| Linguagem | TypeScript 5.9 |
| Estado e dados | TanStack Query 5, React Context |
| UI | Tailwind CSS 3.4, Radix UI, shadcn/ui, Framer Motion |
| Formularios | React Hook Form, Zod |
| Testes | Vitest 3, Testing Library, jsdom |
| Build | Vite 6, terser, vite-plugin-compression |
| Deploy | SSH + rsync para Hostinger |

## Rotas publicas

Definidas em [src/App.tsx](../src/App.tsx):

- `/`
- `/now`
- `/services`
- `/projects`
- `/projects/:slug`

## Estrutura do codigo

```text
src/
├── components/      # layout, SEO, analytics e UI compartilhada
├── constants/       # configuracoes e textos estaticos
├── contexts/        # idioma e catalogo de projetos
├── hooks/           # integracoes e logica reutilizavel
├── lib/             # helpers compartilhados
├── pages/           # paginas e secoes
├── test/            # setup de testes
└── utils/           # seguranca, performance e utilitarios
```

## Integracoes relevantes

- GitHub REST API para listar repositorios e montar paginas de projeto
- Google Analytics via componente dedicado
- Service worker para cache e gestao de atualizacao
- WhatsApp widget carregado de forma lazy em telas maiores

## Build e entrega

O fluxo de producao parte de `pnpm build`:

1. gera `public/sitemap.xml`
2. executa o build do Vite
3. aplica inlining de CSS critico
4. gera assets comprimidos em gzip e Brotli

O deploy para Hostinger usa [scripts/deploy.ts](../scripts/deploy.ts) e faz:

1. build local
2. backup remoto da pasta `public_html`
3. sincronizacao com `rsync --delete`
4. ajuste de permissao
5. verificacao de `index.html`, `robots.txt` e `sitemap.xml`

## Qualidade e seguranca

- `pnpm ci:check` roda lint, testes e build
- GitHub Actions executa CI em Node 20 e 22
- CodeQL roda em PR e push
- Dependency Review valida mudancas de lockfile
- Dependabot monitora dependencias
- README HTML vindo do GitHub e sanitizado antes da renderizacao em [src/utils/security.ts](../src/utils/security.ts)

## Variaveis de ambiente

Aplicacao local:

```bash
cp .env.example .env.local
```

Deploy:

```bash
cp .env.deploy.example .env.deploy
```

As variaveis de deploy esperadas estao descritas em [DEPLOY-CHECKLIST.md](../DEPLOY-CHECKLIST.md) e em [scripts/deploy.ts](../scripts/deploy.ts).
