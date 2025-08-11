import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { initPerformanceMonitoring } from "./utils/performance";

// Register Service Worker para melhor performance e cache
if ("serviceWorker" in navigator) {
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
if (process.env.NODE_ENV === "production") {
  initPerformanceMonitoring();
}

createRoot(document.getElementById("root")!).render(<App />);
