# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BeBitter is a portfolio website SPA for Bernardo Gomes, built with React 19, TypeScript (strict), Vite 6, and Tailwind CSS. Package manager: **pnpm** (Node >=20 <23).

## Common Commands

```bash
pnpm dev              # Start dev server on localhost:8080
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix ESLint issues
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once (CI mode)
pnpm test:coverage    # Generate coverage report (HTML)
pnpm ci:check         # lint + test:run + build (full CI check)
pnpm build:analyze    # Build + bundle size analysis
pnpm optimize:images  # Optimize images in public/
pnpm sitemap:gen      # Regenerate public/sitemap.xml
```

To run a single test file:
```bash
pnpm vitest run src/path/to/file.test.tsx
```

## Architecture

**Single-page app** with React Router. Pages are lazy-loaded via `React.lazy()` in `App.tsx`.

### Data Flow

- **GitHub projects**: `useGitHubProjects` hook → GitHub API → TanStack React Query (5 min stale, 10 min GC) → `ProjectsContext`
- **i18n**: `LanguageContext` (PT-BR / EN) with translations in `src/constants/translations.ts`, persisted to localStorage
- **Theme**: `next-themes` via `ThemeProvider`, dark/light toggle
- **Forms**: React Hook Form + Zod schemas for validation
- **Toasts**: `Sonner` library, helper in `src/utils/toast.ts`

### Key Directories

- `src/components/ui/` — shadcn/ui design system components (Radix UI primitives)
- `src/pages/Index/sections/` — Homepage broken into Hero, About, Projects, Contact sections
- `src/hooks/` — Custom hooks (GitHub API, scroll animation, image optimization, i18n, mobile detection)
- `src/contexts/` — React Context providers (Language, Projects)
- `src/constants/` — Static config, translations, image paths
- `src/utils/` — Performance monitoring, toast helpers

### Build Optimizations

Vite is configured with manual chunk splitting (vendor, ui, router, query), SWC transpilation, Terser minification, Gzip + Brotli compression, and a custom critical-CSS inlining plugin (`scripts/vite-plugin-critical-css.ts`). A custom Service Worker handles offline caching (production only).

### Environment Variables

Required variables (see `.env.example`):

```
VITE_SITE_URL=https://bebitterbebetter.com.br
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_DEBUG_MODE=true
```

All client-side env vars must be prefixed `VITE_`.

## TypeScript & Linting

- Strict mode enabled; no `any` without justification
- Path alias `@/*` maps to `src/*`
- ESLint uses **flat config** (`eslint.config.js`, ESLint 9+)
- `jsx-a11y` rules are enabled (accessibility warnings)

## Testing

- Framework: **Vitest** with JSDOM and `@testing-library/react`
- Setup file: `src/test/setup.ts`
- Coverage via V8 provider; reports in `coverage/`
- Tests live alongside source as `__tests__/` subdirectories or `.test.tsx` files

## CI/CD

GitHub Actions runs on push/PR to `main`:
- Matrix: Node 20.x and 22.x
- Steps: `pnpm install` → lint → `test:run` → `build`
- `pnpm ci:check` replicates this locally
