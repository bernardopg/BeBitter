import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig(() => ({
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
  },
  plugins: [
    dyadComponentTagger(),
    react(),
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
    minify: "terser",
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Code splitting para melhor cache
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
          ],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
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
    // Configurações de compressão
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  publicDir: "public",
  // Otimizações de dependências
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["@dyad-sh/react-vite-component-tagger"],
  },
}));
