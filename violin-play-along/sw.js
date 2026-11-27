// Service Worker for Violin Play-Along PWA (offline support + fresh song library updates)
const CACHE_NAME = "violin-play-along-v4";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./orchestra.js",
  "./concert3d.js",
  "./lib/three.module.min.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./songs/catalog.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Cache-first for immutable studio audio samples & 3D library
  if (url.pathname.includes("/samples/") || url.pathname.includes("/lib/") || url.pathname.includes("/icons/")) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((resp) => {
            if (resp.ok) {
              const copy = resp.clone();
              caches.open(CACHE_NAME).then((c) => c.put(req, copy));
            }
            return resp;
          })
      )
    );
    return;
  }

  // Stale-while-revalidate for app shell & songs/catalog.json so new songs appear automatically
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((resp) => {
          if (resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
