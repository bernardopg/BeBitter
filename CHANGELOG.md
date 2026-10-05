# Changelog

## 1.9.8

### Fixed

- Lint limpo: `LanguageContext` movido para `src/contexts/language-context.ts` (mesmo padrão de `projects-context.ts`), eliminando o warning `react-refresh/only-export-components`.
- `vite.config.ts` e `vitest.config.ts` compatíveis com `configLoader: 'native'`: `import.meta.dirname` no lugar de `__dirname` e import do plugin de critical CSS com extensão `.ts`.
- CHANGELOG: restaurado o cabeçalho `## 1.9.6`, sobrescrito por engano no release 1.9.7.
- `CLAUDE.md`: versão de Node atualizada (>=24, CI em 24.x).

### Validation

- `pnpm ci:check` sem warnings (lint, typecheck, 36/36 testes, build).

## 1.9.7

### Updated

- Runtime: `@tanstack/react-query` 5.104.1, `framer-motion` 14.0.0 (major), `lucide-react` 1.52.0, `react-day-picker` 10.0.2, `react-resizable-panels` 4.14.2.
- Tooling: `@types/node` 26.6.4, `@vitejs/plugin-react` 6.1.2, `chrome-launcher` 1.2.2, `dotenv` 18.0.5, `eslint` 10.12.0, `globals` 17.13.0, `jsdom` 30.1.2, `typescript-eslint` 8.71.0, `vite` 8.3.2; `pnpm-lock.yaml` refreshed.
- Package manager: pnpm 12.6.0 -> 12.9.1 (`packageManager` field plus `ci`/`deploy`/`lighthouse`/`release` workflows; `release` also gained the missing pnpm version pin).
- Workflows: `softprops/action-gh-release` pinned `v3` -> `v3.0.3`; all other Actions already at latest (`checkout` v7.0.1, `setup-node` v7.0.0, `pnpm/action-setup` v6.1.0, `dependency-review-action` v5.0.0, `codeql-action` v4.38.2); runners stay on rolling `ubuntu-latest`; no Docker/container images in the repo (`sharp` 0.35.5 already latest).
- Removed the stale `rolldown: 1.2.1` override from `pnpm-workspace.yaml` (vite 8.3.2 requires `rolldown ~1.2.11`; resolves to 1.2.12).
- Kept blocks: TypeScript 6.x and Vitest 4.x (`typescript-eslint` 8.x peer range; `jest-dom` matcher augmentation breaks under Vitest 5). `eslint-plugin-jsx-a11y` still lacks a declared ESLint 10 peer range (lint passes; pnpm reports the upstream warning).

### Validation

- `pnpm lint` (1 pre-existing `react-refresh` warning), `pnpm typecheck`, `pnpm test:run` (36/36), `pnpm build` (35 rotas prerenderizadas).
- Supersedes/closes Dependabot PRs #124 (runtime), #125 (tooling) and #126 (framer-motion 14).

## 1.9.6

### Updated

- Updated compatible direct dependencies and refreshed `pnpm-lock.yaml`.
- Kept TypeScript 6.0.3 and Vitest 4.1.11 pinned in `pnpm-workspace.yaml`: TypeScript 7 is not yet supported by the installed `typescript-eslint` version, and Vitest 5 currently breaks the `@testing-library/jest-dom` matcher type augmentation used by the project.
- Retained ESLint 10.11.0. `eslint-plugin-jsx-a11y` has not declared ESLint 10 peer support; lint currently succeeds, but pnpm reports this upstream peer-range warning.

### Validation

- `pnpm ci:check` (lint, typecheck, tests, production build).
- Local validation ran on Node 24.19.0 and reports the repository's Node engine mismatch (`>=22 <23`). Release/deploy workflows run on Node 22 and perform their own checks.
