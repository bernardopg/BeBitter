import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

/**
 * Config do bundle de pré-render, separada da config do client.
 *
 * Nada aqui vai para o browser: o bundle só é executado pelo
 * scripts/prerender.ts durante o build. Por isso ficam de fora compressão,
 * critical CSS, service worker, publicDir e code splitting — o que importa é
 * um arquivo com nome estável e o mesmo alias `@` do client.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  publicDir: false,
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist-ssr",
    emptyOutDir: true,
    target: "esnext",
    minify: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js",
        chunkFileNames: "[name].js",
      },
    },
  },
});
