const CACHE_NAME = 'imam-pwa-cache-v1';
const urlsToCache = [
  '/Tugas-Desainweb/',
  '/Tugas-Desainweb/index.html',
  '/Tugas-Desainweb/about.html',
  '/Tugas-Desainweb/contact.html',
  '/Tugas-Desainweb/offline.html',
  '/Tugas-Desainweb/style.css',
  '/Tugas-Desainweb/images/icons-192.png',
  '/Tugas-Desainweb/images/icons-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .catch(() => {
            return caches.match('offline.html');
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('imam-pwa-') && cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});