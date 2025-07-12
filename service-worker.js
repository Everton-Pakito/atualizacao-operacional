
self.addEventListener('install', e => {
  console.log('[ServiceWorker] Installed');
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
