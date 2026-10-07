// Inko moved to https://dexcimino.com/inko/. This worker exists only to retire
// the one an old install of inko.dexcimino.com still has: the browser fetches
// sw.js to check for updates (it is the one path NOT redirected), installs
// this, and this clears the old caches, unregisters itself, and sends any
// open window to the new home.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) {
      try { await client.navigate('https://dexcimino.com/inko/'); } catch (e) { /* the redirect catches the next load */ }
    }
  })());
});
