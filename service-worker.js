const CACHE = 'better-dad-v2';
const ASSETS = ['./index.html', './manifest.webmanifest', './icon.svg', './assets/warrior.gif'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
