/**
 * Vite plugin for inlining critical CSS
 * Uses Beasties to extract and inline above-the-fold CSS
 */

import Beasties from "beasties";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

export interface CriticalCSSOptions {
  /**
   * Paths to inline critical CSS (relative to output directory)
   */
  paths?: string[];

  /**
   * Whether to inline all critical CSS (default: true)
   */
  inline?: boolean;

  /**
   * Whether/how to preload non-critical CSS (default: true -> "swap")
   */
  preload?:
    | boolean
    | "js"
    | "body"
    | "media"
    | "swap"
    | "swap-high"
    | "swap-low"
    | "js-lazy";

  /**
   * Whether to compress inlined CSS (default: true)
   */
  compress?: boolean;

  /**
   * Minimum external CSS file size threshold (default: 4096 bytes)
   */
  minimumExternalSize?: number;

  /**
   * Whether to prune critical CSS (default: true)
   */
  pruneSource?: boolean;
}

export default function criticalCSS(options: CriticalCSSOptions = {}): Plugin {
  const {
    inline = true,
    preload = true,
    compress = true,
    minimumExternalSize = 4096,
    pruneSource = true,
  } = options;

  // Beasties typings do not currently include `false`, though runtime supports it.
  const beastiesPreload = preload === true ? "swap" : preload;

  let beasties: Beasties;
  let config: ResolvedConfig;

  return {
    name: "vite-plugin-critical-css",
    apply: "build",
    enforce: "post",

    configResolved(resolvedConfig) {
      config = resolvedConfig;

      // Initialize Beasties with configuration
      beasties = new Beasties({
        logLevel: "error",
        path: path.resolve(config.root, config.build.outDir),
        publicPath: "/",
        inlineFonts: true,
        preload: beastiesPreload as NonNullable<
          ConstructorParameters<typeof Beasties>[0]
        >["preload"],
        compress,
        minimumExternalSize,
        pruneSource,
        reduceInlineStyles: true,
        mergeStylesheets: true,
        // Don't add additional critical CSS (we'll handle that)
        additionalStylesheets: [],
      });
    },

    async generateBundle(_, bundle) {
      // Process HTML files in the bundle
      for (const [fileName, file] of Object.entries(bundle)) {
        if (
          fileName.endsWith(".html") &&
          file.type === "asset" &&
          typeof file.source === "string"
        ) {
          try {
            console.log(`\n🎨 Processing critical CSS for ${fileName}...`);

            // Process HTML with Beasties
            const html = file.source;
            const result = await beasties.process(html);

            // Update the bundle with the processed HTML
            file.source = result;

            console.log(`✅ Critical CSS inlined for ${fileName}`);
          } catch (error) {
            console.error(
              `❌ Error processing critical CSS for ${fileName}:`,
              error,
            );
            // Don't fail the build, just skip this file
          }
        }
      }
    },
  };
}
