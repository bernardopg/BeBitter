# Technical Overview

## Objetivo

BeBitter é um portfólio público construído para servir duas frentes ao mesmo tempo:

- apresentação profissional de Bernardo Gomes
- vitrine de projetos com dados puxados do GitHub

## Stack

| Camada | Ferramentas |
| --- | --- |
| App shell | React 19, React DOM 19, React Router 7 |
| Linguagem | TypeScript 5.9 |
| Estado e dados | TanStack Query 5, React Context |
| UI | Tailwind CSS 4.2, Radix UI, shadcn/ui, Framer Motion |
| Formulários | React Hook Form, Zod |
| Testes | Vitest 4, Testing Library, jsdom |
| Build | Vite 7, terser, Critters, vite-plugin-compression |
| Deploy | SSH + rsync para Hostinger |

## Rotas públicas

Definidas em [src/App.tsx](../src/App.tsx):

- `/`
- `/now`
- `/services`
- `/projects`
- `/projects/:slug`

## Estrutura do código

```text
src/
├── components/      # layout, SEO, analytics e UI compartilhada
├── constants/       # configurações e textos estáticos
├── contexts/        # idioma e catálogo de projetos
├── hooks/           # integrações e lógica reutilizável
├── lib/             # helpers compartilhados
├── pages/           # páginas e seções
├── test/            # setup de testes
└── utils/           # segurança, performance e utilitários
```

## Integrações relevantes

- GitHub REST API para listar repositórios e montar páginas de projeto
- Google Analytics via componente dedicado
- Service worker para cache e gestão de atualização
- WhatsApp widget carregado de forma lazy em telas maiores

## Build e entrega

O fluxo de produção parte de `pnpm build`:

1. gera `public/sitemap.xml`
2. executa o build do Vite 7
3. aplica inlining de CSS crítico
4. gera assets comprimidos em gzip e Brotli

O deploy para Hostinger usa [scripts/deploy.ts](../scripts/deploy.ts) e faz:

1. build local
2. backup remoto da pasta `public_html`
3. sincronização com `rsync --delete`
4. ajuste de permissão
5. verificação de `index.html`, `robots.txt` e `sitemap.xml`

## Qualidade e segurança

- `pnpm ci:check` roda lint, testes e build
- GitHub Actions executa CI em Node 22
- CodeQL roda em PR e push
- Dependency Review valida mudanças de lockfile
- Dependabot monitora dependências
- HTML de README vindo do GitHub é sanitizado antes da renderização em [src/utils/security.ts](../src/utils/security.ts)

## Variaveis de ambiente

Aplicacao local:

```bash
cp .env.example .env.local
```

Deploy:

```bash
cp .env.deploy.example .env.deploy
```

As variáveis de deploy esperadas estão descritas em [DEPLOY-CHECKLIST.md](../DEPLOY-CHECKLIST.md) e em [scripts/deploy.ts](../scripts/deploy.ts).
