// Service Worker para cache e performance
const CACHE_NAME = "bebitter-v1";
const STATIC_ASSETS = [
  "/",
  "/images/logos/bebitter-logo.png",
  "/images/logos/bebitter-logo-alt.png",
  "/images/icons/favicon-32x32.png",
  "/images/icons/favicon-16x16.png",
  "/images/icons/apple-touch-icon.png",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Cache successful responses for static assets
          const responseToCache = response.clone();
          const url = event.request.url;

          // Cache images, fonts, and JS/CSS files
          if (
            url.includes("/images/") ||
            url.includes("/assets/") ||
            url.includes(".js") ||
            url.includes(".css") ||
            url.includes(".woff") ||
            url.includes(".woff2")
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        })
        .catch(() => {
          // Return offline fallback for navigation requests
          if (event.request.destination === "document") {
            return caches.match("/");
          }
        });
    })
  );
});

// Background sync for analytics (optional)
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle background sync tasks
      console.log("Background sync triggered")
    );
  }
});
