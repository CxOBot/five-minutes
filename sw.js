// Optional offline shell for Five Minutes.
// Only needed if you host the journal (GitHub Pages, Netlify, etc.).
// Drop this file next to gratitude-journal.html — the app registers it automatically
// over https and ignores it entirely otherwise.
const CACHE = 'five-minutes-v1';
const ASSETS = ['./', './gratitude-journal.html', './index.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first, cache as fallback: you always get the newest version when online,
// and the journal still opens on a plane or in a dead spot.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./gratitude-journal.html')))
  );
});
