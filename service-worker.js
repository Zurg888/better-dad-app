const CACHE = 'better-dad-v4';
const ASSETS = [
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './assets/level-01.gif',
  './assets/level-02.gif',
  './assets/level-03.gif',
  './assets/level-04.gif',
  './assets/level-05.gif'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
