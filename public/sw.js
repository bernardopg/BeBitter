// Cache only stable static assets. HTML stays network-first to avoid stale deploys.
const CACHE_NAME = "bebitter-static-v20260306-1";
const STATIC_ASSETS = [
  "/images/icons/android-chrome-192x192.png",
  "/images/icons/android-chrome-512x512.png",
  "/images/icons/apple-touch-icon.png",
  "/images/icons/favicon-16x16.png",
  "/images/icons/favicon-32x32.png",
  "/images/logos/BeBitter.svg",
  "/images/logos/BeBitter_Alt.svg",
];

const isHtmlRequest = (request) =>
  request.mode === "navigate" ||
  request.headers.get("accept")?.includes("text/html");

const isStaticAssetRequest = (request) =>
  ["style", "script", "image", "font"].includes(request.destination);

const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type === "basic") {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
};

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const networkResponsePromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200 && response.type === "basic") {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || networkResponsePromise;
};

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
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
        self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  if (isHtmlRequest(event.request)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (isStaticAssetRequest(event.request)) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  event.respondWith(fetch(event.request));
});
