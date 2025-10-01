# Build Scripts

This directory contains various build and optimization scripts for the project.

## Scripts

### `optimize-images.ts`

Generates optimized versions of images in multiple formats and sizes.

**Usage:**

```bash
pnpm optimize:images
```

**What it does:**

- Converts images to WebP and AVIF formats
- Creates responsive versions (252px, 512px, 1024px)
- Optimizes JPEG compression
- Provides detailed size comparison reports

**Requirements:**

- `sharp` package (installed as dev dependency)

### `vite-plugin-critical-css.ts`

Custom Vite plugin for extracting and inlining critical CSS.

**What it does:**

- Extracts above-the-fold CSS during build
- Inlines critical CSS in HTML `<head>`
- Preloads non-critical CSS
- Reduces render-blocking resources

**Configuration:**
See `vite.config.ts` for plugin options.

### `generate-sitemap.ts`

Generates an XML sitemap for the website.

**Usage:**

```bash
pnpm sitemap:gen
```

Automatically runs before each production build.

### `deploy-status.sh`

Checks the deployment status of the website.

**Usage:**

```bash
./scripts/deploy-status.sh
```

## Performance Optimization Workflow

1. **Optimize Images**

   ```bash
   pnpm optimize:images
   ```

2. **Build for Production**

   ```bash
   pnpm build
   ```

   This automatically:
   - Generates sitemap
   - Inlines critical CSS
   - Bundles and minifies code
   - Compresses assets (gzip + brotli)

3. **Preview Locally**

   ```bash
   pnpm preview
   ```

4. **Deploy & Test**
   - Deploy to production
   - Run PageSpeed Insights
   - Verify improvements

## Maintenance

### Adding New Images

When adding new profile images or hero images:

1. Place the original high-resolution image in `public/images/profile/`
2. Update `scripts/optimize-images.ts` if needed
3. Run `pnpm optimize:images`
4. Update image references in components

### Updating Critical CSS

To modify what CSS is considered critical:

1. Edit the inline styles in `index.html`
2. Adjust Critters settings in `vite-plugin-critical-css.ts`
3. Rebuild and test

## Dependencies

- **sharp**: Image processing library
- **critters**: Critical CSS extraction
- **tsx**: TypeScript execution

All dependencies are installed as dev dependencies.
