self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('libra-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/notifications.html',
		'/studentDashboard_responsive.html',
		'/librarianBookingRequests_responsive.html',
        '/overallCSS_responsive.css',
		'/logincss.css',
		'/overallCSS_responsive2.css',
        '/librarianDashboardJscript_responsive.js',
		'/loginScript.js',
		'/librarianBookingRequestsJscript_responsive.js',
        '/manifest.json',
        '/icon-192x192.png',
        '/icon-512x512.png'
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
