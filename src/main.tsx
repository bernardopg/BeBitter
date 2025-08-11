import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { initPerformanceMonitoring } from "./utils/performance";

// Development mode: Clear any existing service workers that might interfere
if (import.meta.env.DEV) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length > 0) {
        console.log(
          "🧹 Development mode: Clearing existing service workers to prevent MIME type issues..."
        );
        registrations.forEach((registration) => {
          registration.unregister().then(() => {
            console.log("✅ Service worker unregistered:", registration.scope);
          });
        });

        // Clear caches
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            caches.delete(cacheName).then(() => {
              console.log("✅ Cache cleared:", cacheName);
            });
          });
        });
      }
    });
  }
}

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
