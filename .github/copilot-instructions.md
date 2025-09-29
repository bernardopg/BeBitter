# Copilot instructions — BeBitter

Short, practical guardrails to help AI coding agents work productively in this repo. Focus on how this project actually works.

See also: [CLAUDE.md](../CLAUDE.md) for the full AI guide and [WARP.md](../WARP.md) for human-oriented notes. This doc is the concise, code-first version.

## Big picture

- SPA built with React 18 + TypeScript + Vite 6 (dev server: http://localhost:8080). Routing via react-router-dom v6.
- Provider stack lives in `src/App.tsx` in this order: ErrorBoundary → QueryClientProvider → ThemeProvider → LanguageProvider → TooltipProvider → Router → Analytics.
- Styling: Tailwind CSS (class-based dark mode), shadcn/ui primitives under `src/components/ui/` (treat as generated; don’t edit directly).
- Perf & DX: Code-splitting via React.lazy, gzip + brotli compression, manualChunks in `vite.config.ts`, SW registered in production only (`public/sw.js`).
- Analytics: GA4 via `src/components/Analytics.tsx` (gtag). Web Vitals via `src/components/WebVitals.tsx`.

## Day-1 commands

- Install: `pnpm install`
- Dev: `pnpm dev` (host `::`, port `8080`)
- Lint: `pnpm lint` / `pnpm lint:fix`
- Test: `pnpm test` (Vitest + RTL, jsdom; setup at `src/test/setup.ts`)
- Build: `pnpm build` (prebuild runs sitemap generation)
- Preview prod build: `pnpm preview`
- Bundle analysis: `pnpm build:analyze`

## Conventions that matter

- Imports: absolute alias `@` → `src/`. Keep import order: external → internal absolute → relative → types → styles.
- Pages: lazy-load routes in `App.tsx`. Wrap routed pages with `Layout` and keep custom routes above the `*` NotFound route.
- SEO: Each page uses `src/components/SEOHead.tsx` (updates head tags dynamically). Also consider `StructuredData` where relevant.
- i18n: Use `LanguageContext` (`useLanguage` hook). Update `document.documentElement.lang` is handled by `SEOHead` based on context.
- UI: For shadcn components, prefer wrappers/composition in `src/components/` rather than editing `src/components/ui/*` directly.
- External links: Always include `target="_blank" rel="noopener noreferrer"` (see CLAUDE.md examples).
- Analytics events: Use `useAnalytics()` helper for button clicks, forms, downloads, external links, project views.

## Data and integrations

- GitHub Projects: `useGitHubProjects()` uses TanStack Query and optional `VITE_GITHUB_TOKEN`. Without a token, it falls back to curated examples (no noisy errors). Respect existing retry/staleTime defaults.
- Config & constants: `src/constants/config.ts` (GA ID, GitHub username, URLs, perf limits); `src/constants/translations.ts`; `src/constants/images.ts`.
- Service worker: Only in prod. After behavior changes, bump `CACHE_NAME` in `public/sw.js`, then `pnpm build` and redeploy.

## Build & tooling (what’s special)

- Vite config (`vite.config.ts`):
  - Dev server: port 8080, host `::`, custom middleware to set MIME types and guard `/public` path.
  - Plugins: `@vitejs/plugin-react-swc`, `@dyad-sh/react-vite-component-tagger`, dual compression (gzip + brotli).
  - Manual chunks: `vendor`, `ui`, `router`, `query`. Asset naming under `assets/*` for cacheability. Console/debugger dropped in prod (terser).
- Tailwind: class-based dark mode; tokens via CSS variables; `tailwindcss-animate` plugin.
- Tests: Vitest config at `vitest.config.ts` with alias `@` and v8 coverage reporters.

## How to add a new page (concrete example)

1. Create the page component under `src/pages/MyPage.tsx` (or nested like `src/pages/MyPage/*`).
2. Add lazy route in `App.tsx` above the catch-all:
   - `const MyPage = lazy(() => import("./pages/MyPage"));`
   - `<Route path="/my" element={<MyPage/>} />`
3. Add `SEOHead` at the top of the page and optional `StructuredData`.
4. If navigation is needed, update `Header.tsx` links.

### Examples

- Track analytics events (use inside components):

  ```ts
  import { useAnalytics } from "@/components/Analytics";

  const ContactCTA = () => {
    const { trackButtonClick, trackExternalLink } = useAnalytics();
    return (
      <a
        href="https://calendly.com/bernardopg"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackExternalLink("https://calendly.com/bernardopg", "Calendly link")
        }
      >
        Agendar conversa
      </a>
    );
  };
  ```

- Add a shadcn/ui wrapper (don’t modify `components/ui/*` directly):

  ```tsx
  // src/components/PrimaryButton.tsx
  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";

  type Props = React.ComponentProps<typeof Button> & { active?: boolean };
  export const PrimaryButton = ({ className, active, ...props }: Props) => (
    <Button
      className={cn(
        "rounded-md",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    />
  );
  ```

## Performance & UX patterns

- Defer non-critical work: e.g., WhatsApp widget is lazy-loaded on idle in `App.tsx` (see `requestIdleCallback` pattern). Follow this for other heavy, non-critical widgets.
- Prefer IntersectionObserver-based lazy reveals/loads; reuse `useScrollAnimation` and perf helpers under `src/utils/performance.ts`.
- Images: store under `public/images/*`. Use sizes/dimensions to avoid CLS. Consider WebP with fallbacks.

## Security & hygiene

- Never commit secrets or `.env*`. Required env vars (dev): `VITE_GA_TRACKING_ID`, `VITE_SITE_URL`. Optional: `VITE_GITHUB_TOKEN`.
- External links must use `rel="noopener noreferrer"`. No `eval`/dangerous HTML. Production build drops `console` by config.
- Before PR: `pnpm lint` → `pnpm test` → `pnpm build` → quick visual QA (375/768/1440, dark/light, PT/EN). Use `pnpm build:analyze` for big changes.

## Service Worker update playbook

- Bump cache name in `public/sw.js` (e.g., `const CACHE_NAME = "bebitter-v1.0.3"`).
- Build fresh assets: `pnpm build`.
- Optionally preview locally: `pnpm preview` and hard-refresh; verify SW update logs in the console.
- Deploy. Clients will pick up the new SW and purge old caches on activation.

## Pointers to key files

- Routing/providers: `src/App.tsx`, `src/components/Layout.tsx`
- Analytics: `src/components/Analytics.tsx`, `src/components/WebVitals.tsx`
- SEO: `src/components/SEOHead.tsx`, `src/components/StructuredData.tsx`
- i18n: `src/contexts/LanguageContext.tsx`, `src/hooks/useLanguage.ts`
- Data: `src/hooks/useGitHubProjects.ts`, `src/contexts/ProjectsContext.tsx`
- SW: `public/sw.js`
- Tooling: `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `tailwind.config.ts`, `scripts/generate-sitemap.ts`

If something here conflicts with CLAUDE.md, prefer the actual code. Tell us where the drift is so we can reconcile.
