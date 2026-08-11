import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App, { AppRoutes } from "./App.tsx";
import "./globals.css";
import { preloadRoutePage } from "./pageLoaders";
import { initPerformanceMonitoring } from "./utils/performance";

// The development mode service worker cleanup has been moved to an inline script
// in index.html to run before any module scripts are loaded. This prevents
// a lingering service worker from interfering with Vite's dev server.

// Initialize performance monitoring
if (import.meta.env.PROD) {
  initPerformanceMonitoring();
}

const container = document.getElementById("root")!;

const tree = (
  <App>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </App>
);

// O build pré-renderiza cada rota (scripts/prerender.ts). Quando o HTML já vem
// com markup, hidratamos em cima dele em vez de descartar e repintar — é o que
// preserva o conteúdo que o usuário já está vendo. No dev o container é vazio.
if (container.hasChildNodes()) {
  // A página da rota é resolvida antes de hidratar: com ela pendente, o Suspense
  // cairia no fallback e o React descartaria justamente o HTML que já está na
  // tela. `finally` e não `then`: se o chunk falhar, hidratar mesmo assim deixa
  // o ErrorBoundary lidar com o erro em vez de congelar a página.
  preloadRoutePage(window.location.pathname).finally(() => {
    hydrateRoot(container, tree);
  });
} else {
  createRoot(container).render(tree);
}
