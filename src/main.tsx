import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { initPerformanceMonitoring } from "./utils/performance";

// The development mode service worker cleanup has been moved to an inline script
// in index.html to run before any module scripts are loaded. This prevents
// a lingering service worker from interfering with Vite's dev server.

// Initialize performance monitoring
if (import.meta.env.PROD) {
  initPerformanceMonitoring();
}

createRoot(document.getElementById("root")!).render(<App />);
