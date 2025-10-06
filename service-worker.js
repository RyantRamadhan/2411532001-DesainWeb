const CACHE_NAME = 'imam-pwa-cache-v1';
const urlsToCache = [
  '/2411532001-DesainWeb/',
  '/2411532001-DesainWeb/index.html',
  '/2411532001-DesainWeb/about.html',
  '/2411532001-DesainWeb/contact.html',
  '/2411532001-DesainWeb/offline.html',
  '/2411532001-DesainWeb/style.css',
  '/2411532001-DesainWeb/images/icons-192.png',
  '/2411532001-DesainWeb/images/icons-512.png'
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
            return caches.match('/2411532001-DesainWeb/offline.html');
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