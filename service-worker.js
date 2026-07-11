const CACHE = 'galahad-v7';
const ASSETS = [
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './assets/level-01.gif',
  './assets/level-02.gif',
  './assets/level-03.gif',
  './assets/level-04.gif',
  './assets/level-05.gif',
  './assets/gear-level-01.png',
  './assets/gear-level-02.png',
  './assets/gear-level-03.png',
  './assets/gear-level-04.png',
  './assets/gear-level-05.png',
  './assets/warrior-base.svg',
  './assets/warrior-leather.svg',
  './assets/warrior-chain.svg',
  './assets/warrior-shield.svg',
  './assets/warrior-plate.svg',
  './assets/warrior-legend.svg',
  './assets/background-music.mp3'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  ]));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
