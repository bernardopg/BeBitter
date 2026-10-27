# BeBitter

Portfólio e blog de [Bernardo Gomes](https://bebitterbebetter.com.br), com projetos, serviços e artigos técnicos. O site usa React, TypeScript, Vite e Tailwind CSS; o build pré-renderiza as rotas e gera sitemap, feed RSS e imagens de compartilhamento.

## Desenvolvimento

Use a versão de Node indicada em [`.node-version`](.node-version) e o pnpm fixado em [`package.json`](package.json).

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Ajuste `.env.local` quando precisar de configuração específica. Variáveis `VITE_` são públicas no bundle: nunca coloque segredos nelas.

```bash
pnpm ci:check        # lint, tipos, testes e build
pnpm security:audit   # auditoria de dependências
```

## Conteúdo e publicação

Os artigos ficam em [`src/constants/blog-posts.ts`](src/constants/blog-posts.ts) e nos módulos de conteúdo importados por ele. O build gera as páginas em `dist/`, o sitemap e o [feed RSS](https://bebitterbebetter.com.br/feed.xml).

Uma tag `v*` dispara os workflows de [release](.github/workflows/release.yml) e [deploy para a Hostinger](.github/workflows/deploy.yml). O deploy faz backup remoto e verificações após a publicação. Para configuração, execução manual e recuperação, consulte o [checklist de deploy](DEPLOY-CHECKLIST.md).

## Documentação

- [Índice da documentação](docs/README.md)
- [Arquitetura e automação](docs/technical-overview.md)
- [Rotas e sitemap](docs/routes-and-sitemap.md)
- [Segurança](SECURITY.md)
- [Scripts](scripts/README.md)

Licença [MIT](LICENSE.md).
