import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import criticalCSS from "./scripts/vite-plugin-critical-css";

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      // Fix MIME type issues for development
      fs: {
        strict: false,
      },
      middlewareMode: false,
      headers: {
        "Cache-Control": "no-cache",
      },
      // Configure middleware to prevent conflicts with public directory files
      middlewares: [
        // Custom middleware to handle public directory file serving and HTML files
        (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          const url = req.url;

          // Prevent serving files that start with 'public' but aren't in the public directory
          if (url && url.startsWith("/public") && !url.startsWith("/public/")) {
            res.statusCode = 404;
            res.end("Not Found");
            return;
          }

          // Ensure proper MIME types for all static assets including HTML
          if (url) {
            const mimeTypes: Record<string, string> = {
              ".html": "text/html; charset=utf-8",
              ".htm": "text/html; charset=utf-8",
              ".svg": "image/svg+xml",
              ".png": "image/png",
              ".jpg": "image/jpeg",
              ".jpeg": "image/jpeg",
              ".gif": "image/gif",
              ".webp": "image/webp",
              ".css": "text/css; charset=utf-8",
              ".js": "application/javascript; charset=utf-8",
              ".mjs": "application/javascript; charset=utf-8",
              ".json": "application/json; charset=utf-8",
              ".xml": "application/xml; charset=utf-8",
              ".txt": "text/plain; charset=utf-8",
            };

            const ext = url.includes("?")
              ? url.split("?")[0].substring(url.split("?")[0].lastIndexOf("."))
              : url.substring(url.lastIndexOf("."));
            const mimeType = mimeTypes[ext];

            if (mimeType) {
              res.setHeader("Content-Type", mimeType);

              // Apply fs.strict settings for HTML files specifically
              if (ext === ".html" || ext === ".htm") {
                res.setHeader("X-Content-Type-Options", "nosniff");
                res.setHeader(
                  "Cache-Control",
                  "no-cache, no-store, must-revalidate",
                );
              }
            }
          }

          next();
        },
      ],
    },
    plugins: [
      react(),
      // Plugin para substituir variáveis de ambiente no index.html
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            VITE_GA_TRACKING_ID: env.VITE_GA_TRACKING_ID || "",
            VITE_SITE_URL:
              env.VITE_SITE_URL || "https://bebitterbebetter.com.br",
          },
        },
      }),
      // Critical CSS inlining for better FCP/LCP
      criticalCSS({
        inline: true,
        preload: true,
        compress: true,
        minimumExternalSize: 4096,
        pruneSource: true,
      }),
      // Compressão gzip para melhor performance
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
      }),
      // Compressão brotli (melhor que gzip)
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Configurações otimizadas para performance
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
      target: "esnext",
      minify: "esbuild",
      cssMinify: true,
      esbuild: {
        drop: ["console", "debugger"],
      },
      rollupOptions: {
        output: {
          // Code splitting para melhor cache
          manualChunks: (id) => {
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/scheduler/")
            ) {
              return "vendor";
            }

            if (id.includes("node_modules/@radix-ui/")) {
              return "ui";
            }

            if (id.includes("node_modules/react-router-dom/") || id.includes("node_modules/react-router/")) {
              return "router";
            }

            if (id.includes("node_modules/@tanstack/")) {
              return "query";
            }

            if (id.includes("node_modules/framer-motion/")) {
              return "motion";
            }

            if (id.includes("node_modules/lucide-react/")) {
              return "icons";
            }

            if (id.includes("node_modules/react-floating-whatsapp/")) {
              return "whatsapp";
            }

            if (
              id.includes("node_modules/recharts/") ||
              id.includes("node_modules/d3-") ||
              id.includes("node_modules/victory-")
            ) {
              return "charts";
            }

            if (
              id.includes("node_modules/date-fns/") ||
              id.includes("node_modules/react-day-picker/")
            ) {
              return "dates";
            }

            return undefined;
          },
          // Melhor cache busting para assets
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split(".") || [];
            let extType = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            } else if (/woff|woff2/.test(extType)) {
              extType = "css";
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
      assetsInlineLimit: 4096,
      // Configurações de compressão
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      // Otimizações adicionais de performance
      sourcemap: false, // Desabilitar sourcemaps em produção para reduzir tamanho
      cssCodeSplit: true, // Dividir CSS para melhor cache
    },
    publicDir: "public",
    // Otimizações de dependências
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
    },
  };
});
