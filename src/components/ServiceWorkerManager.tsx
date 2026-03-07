import { useEffect } from "react";

const ServiceWorkerManager = () => {
  useEffect(() => {
    // Only register service worker in production
    if (import.meta.env.PROD && "serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log(
            "✅ Service Worker registered successfully:",
            registration.scope
          );

          // Listen for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                }
              });
            }
          });

          registration.update().catch(() => undefined);
        } catch (error) {
          console.error("❌ Service Worker registration failed:", error);
        }
      };

      const handleControllerChange = () => {
        window.location.reload();
      };

      // Register service worker after page load to avoid blocking
      window.addEventListener("load", registerSW);
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        handleControllerChange
      );

      return () => {
        window.removeEventListener("load", registerSW);
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          handleControllerChange
        );
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default ServiceWorkerManager;
