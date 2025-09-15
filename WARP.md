# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Quick Start

BeBitter is a modern React portfolio built with Vite, TypeScript, and Tailwind CSS. It uses **pnpm** as the package manager.

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Common Commands

```bash
# Development
pnpm dev                    # Start dev server at http://localhost:8080
pnpm dev --host            # Expose dev server on network

# Building
pnpm build                 # Production build to dist/
pnpm build:dev             # Development mode build
pnpm build:analyze         # Build with bundle analysis
pnpm preview               # Preview production build
pnpm preview:network       # Preview on network

# Code Quality
pnpm lint                  # Run ESLint

# Performance Analysis
pnpm analyze:bundle        # Analyze bundle size with vite-bundle-analyzer
pnpm performance:audit     # Reminder to run Lighthouse manually

# Deploy
./deploy.sh                # FTP deploy to Hostinger (requires credentials)
```

## Architecture Overview

### Entry Point & Provider Stack

- **Entry**: `src/main.tsx` → `src/App.tsx`
- **Provider hierarchy** (outer to inner):
  1. ErrorBoundary
  2. QueryClientProvider (TanStack Query)
  3. ThemeProvider (next-themes)
  4. LanguageProvider (custom i18n)
  5. TooltipProvider
  6. BrowserRouter (React Router v6)

### Project Structure

```text
src/
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── Analytics.tsx    # Google Analytics 4
│   ├── WebVitals.tsx    # Performance monitoring
│   ├── ErrorBoundary.tsx
│   └── ServiceWorkerManager.tsx
├── pages/               # Route components (lazy loaded)
│   ├── Index.tsx        # Homepage
│   ├── Now.tsx          # /now page
│   └── NotFound.tsx     # 404 page
├── contexts/            # React contexts
├── constants/           # Static data & translations
├── hooks/               # Custom hooks
├── lib/                 # Utilities (cn helper, etc.)
└── utils/               # Performance & utility functions
```

### Routing

- React Router v6 with lazy-loaded pages
- Routes defined in `App.tsx`
- Layout wrapper with Header/Footer

## Internationalization

**Custom i18n implementation** (not using i18next):

- **Languages**: Portuguese (pt) default, English (en)
- **Implementation**: `src/contexts/LanguageContext.tsx`
- **Translations**: `src/constants/translations.ts`
- **Detection**: Browser language with localStorage persistence
- **Usage**: `const { t, language, setLanguage } = useLanguage();`

### Adding New Translation Keys

1. Add keys to both `pt` and `en` objects in `translations.ts`
2. Use dot notation: `"section.key": "value"`
3. Access via `t("section.key")`

## Analytics & Monitoring

### Google Analytics 4

- **Component**: `src/components/Analytics.tsx`
- **Events**: Page views, button clicks, external links, contact attempts
- **Environment variable**: `VITE_GA_TRACKING_ID`

### Web Vitals

- **Component**: `src/components/WebVitals.tsx`
- **Utility**: `src/utils/performance.ts`
- **Metrics**: CLS, INP, LCP, FCP, TTFB
- **Sends to**: GA4 custom events

### Error Boundary

- **Component**: `src/components/ErrorBoundary.tsx`
- **Behavior**: Catches React errors, shows user-friendly UI
- **Reporting**: Sends errors to GA4

## Service Worker & Performance

### Custom Service Worker

- **File**: `public/sw.js`
- **Strategy**: Cache-first for static assets
- **Registration**: Production only in `src/main.tsx`
- **Cache name**: `bebitter-v1.0.1` (update version to invalidate)
- **Clear cache**: Visit `/clear-sw.html` (utility page)

### Performance Features

- Route-based code splitting with React.lazy
- Manual chunks in Vite config (vendor, ui, router, query)
- Image lazy loading
- Gzip + Brotli compression
- Asset optimization in build

## Components & Design System

### shadcn/ui Integration

- **Config**: `components.json`
- **Location**: `src/components/ui/`
- **Theme**: CSS variables in `src/globals.css`
- **Utility**: `cn()` helper in `src/lib/utils.ts`
- **Adding components**: Use shadcn CLI or copy from ui.shadcn.com

### Theme System

- **Provider**: next-themes with class-based dark mode
- **CSS Variables**: Defined in `globals.css` for light/dark themes
- **Toggle**: `src/components/ThemeToggle.tsx`

### Component Conventions

- UI components in `src/components/ui/` (from shadcn)
- App-specific components in `src/components/`
- Use Tailwind classes with `cn()` for conditional styling

## State Management

### React Context Pattern

- **LanguageContext**: i18n state and translation function
- **ThemeProvider**: Light/dark theme with system detection
- **No global state library**: Uses local state + React Query for server state

### TanStack Query

- **Config**: 5min stale time, 10min garbage collection, 1 retry
- **Usage**: Server state caching (GitHub API for projects)
- **Error handling**: Graceful fallbacks to static data

## Configuration Reference

### Vite (vite.config.ts)

- **Dev server**: Port 8080, host "::"
- **Plugins**: react-swc, dyad-component-tagger, compression (gzip + brotli)
- **Aliases**: `@/` maps to `src/`
- **Build**: terser minify, manual chunks, optimized asset naming

### TypeScript

- **Base config**: `tsconfig.json` references app and node configs
- **Strict mode**: Partially disabled (`noImplicitAny: false`)
- **Path mapping**: `@/*` for src imports

### ESLint (eslint.config.js)

- **Extends**: JS recommended, TS recommended
- **Plugins**: react-hooks, react-refresh
- **Rules**: Unused vars disabled, react-refresh warnings

### Tailwind (tailwind.config.ts)

- **Dark mode**: class-based
- **Content**: src/**/*.{ts,tsx}
- **Theme**: Extended with CSS variables for shadcn
- **Plugins**: tailwindcss-animate

## Deployment

### Hostinger FTP Deploy

- **Script**: `deploy.sh` (bash script with lftp)
- **Flow**:
  1. Runs `pnpm build`
  2. Uploads `dist/` to FTP root (Hostinger FTP lands directly in `public_html`)
  3. Supports safe test mode and deletion mode

### Deployment Commands

```bash
# Safe test deploy (no file deletion)
DELETE=false ./deploy.sh

# Production deploy (with file deletion)
DELETE=true ./deploy.sh
# or simply:
./deploy.sh  # DELETE=true is the default
```

### FTP Configuration

Create `.env.deploy` (not committed) with:

```bash
FTP_HOST="ftp.yourdomain.com"
FTP_USER="your_ftp_user"
FTP_PASS="your_ftp_password"
FTP_PORT="21"
FTP_REMOTE_DIR="."  # Use "." since Hostinger FTP lands in public_html
LFTP_PARALLEL="5"   # Number of parallel transfers
```

**Important**: Hostinger FTP accounts typically land directly in the `public_html` directory, so `FTP_REMOTE_DIR` should be set to `"."` to avoid creating nested directories.

### Environment Variables

```bash
# .env.local (not committed) - for app runtime
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### SPA Routing Setup

Ensure `.htaccess` in Hostinger root:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Development Tips

### Performance Optimization

- Use React.memo for expensive components
- Lazy load routes and heavy components
- Optimize images (WebP, proper sizing)
- Monitor bundle size with `pnpm analyze:bundle`

### Code Splitting Strategy

- Pages: Automatically split via React.lazy
- Vendor: React/ReactDOM in separate chunk
- UI: Radix UI components grouped
- Router: React Router isolated

### WhatsApp Integration

- **Component**: FloatingWhatsApp (client-side only)
- **Contact**: +55 (31) 98491-6431
- **Features**: Dark mode, notifications, customizable

## Troubleshooting

### Common Issues

1. **Service Worker caching old version**: Visit `/clear-sw.html`
2. **Dev server MIME type errors**: Fixed in vite.config.ts server settings
3. **Build fails**: Check TypeScript errors with `tsc --noEmit`
4. **Deploy fails**: Verify FTP credentials and network connectivity

### Development Mode

- Service Worker disabled in development
- Analytics initialized but may use debug mode
- Hot module replacement active

### Performance Debugging

- Use React DevTools Profiler
- Check Network tab for slow resources
- Monitor Web Vitals in console
- Use Lighthouse on deployed site

## Maintenance

**Update this file when**:

- Adding new scripts to package.json
- Changing build/deploy process
- Adding new environment variables
- Modifying core architecture (routing, state management)
- Adding new development tools or linting rules

**Key files to watch**:

- `package.json` (scripts)
- `vite.config.ts` (build config)
- `deploy.sh` (deployment)
- `src/App.tsx` (provider stack)
