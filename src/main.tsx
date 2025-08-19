import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { initPerformanceMonitoring } from "./utils/performance";

// The development mode service worker cleanup has been moved to an inline script
// in index.html to run before any module scripts are loaded. This prevents
// a lingering service worker from interfering with Vite's dev server.

// Register Service Worker para melhor performance e cache
// Only register in production to avoid development issues
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Initialize performance monitoring
if (import.meta.env.PROD) {
  initPerformanceMonitoring();
}

createRoot(document.getElementById("root")!).render(<App />);