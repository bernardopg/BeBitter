// Development utility to clean up service workers
// Add this to main.tsx in development mode

export const unregisterServiceWorkers = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();

      for (const registration of registrations) {
        await registration.unregister();
        console.log("Service worker unregistered:", registration.scope);
      }

      // Clear all caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );

      console.log("All service workers and caches cleared");
    } catch (error) {
      console.error("Error clearing service workers:", error);
    }
  }
};
