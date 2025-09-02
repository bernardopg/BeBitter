import { useEffect } from 'react';

const ServiceWorkerManager = () => {
  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('✅ Service Worker registered successfully:', registration.scope);

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  console.log('🔄 New version available! Please refresh the page.');
                }
              });
            }
          });
        } catch (error) {
          console.error('❌ Service Worker registration failed:', error);
        }
      };

      // Register service worker after page load to avoid blocking
      window.addEventListener('load', registerSW);

      return () => {
        window.removeEventListener('load', registerSW);
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default ServiceWorkerManager;
