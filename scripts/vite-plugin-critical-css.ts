/**
 * Vite plugin for inlining critical CSS
 * Uses Critters to extract and inline above-the-fold CSS
 */

// @ts-expect-error - Critters doesn't have proper type definitions
import Critters from "critters";
import type { Plugin } from "vite";

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
   * Whether to preload non-critical CSS (default: true)
   */
  preload?: boolean;

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

  let critters: Critters;

  return {
    name: "vite-plugin-critical-css",
    apply: "build",
    enforce: "post",

    configResolved() {
      // Initialize Critters with configuration
      critters = new Critters({
        path: "",
        publicPath: "",
        inlineFonts: true,
        preload,
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

            // Process HTML with Critters
            const html = file.source;
            const result = await critters.process(html);

            // Update the bundle with the processed HTML
            file.source = result;

            console.log(`✅ Critical CSS inlined for ${fileName}`);
          } catch (error) {
            console.error(
              `❌ Error processing critical CSS for ${fileName}:`,
              error
            );
            // Don't fail the build, just skip this file
          }
        }
      }
    },
  };
}
