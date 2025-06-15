
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('libra-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/notifications.html',
        '/overallCSS_responsive.css',
        '/librarianDashboardJscript_responsive.js',
        '/manifest.json',
        '/images/icons/icon-192x192.png',
        '/images/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

