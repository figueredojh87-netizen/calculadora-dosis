const CACHE = "calc-dosis-v1";
const ASSETS = [
  "/calculadora-dosis/",
  "/calculadora-dosis/index.html",
  "/calculadora-dosis/manifest.webmanifest",
  "/calculadora-dosis/sw.js",
  "/calculadora-dosis/icon-192.png",
  "/calculadora-dosis/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
