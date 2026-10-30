/* Metro Travels service worker — keeps the program files on the computer so it opens with NO internet.
   Your DATA is not stored here (it lives in the browser's database), so updating the program never touches it.
   Strategy: open instantly from the saved copy, quietly fetch the newest copy in the background,
   and tell the page when a new version has arrived. */
const CACHE = 'metro-travels-shell-v1';
const SHELL = ['index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(SHELL.map(async u => {
      try { const r = await fetch(new Request(u, {cache: 'reload'})); if (r.ok) await c.put(u, r); else if (u === 'index.html') throw new Error('index.html ' + r.status); }
      catch (err) { if (u === 'index.html') throw err; }
    }));
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('metro-travels-shell-') && k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || url.pathname.endsWith('/sw.js')) return;   // GitHub API etc. pass straight through
  e.respondWith(handle(e, req));
});
async function handle(e, req) {
  const cache = await caches.open(CACHE);
  const nav = req.mode === 'navigate';
  const key = nav ? new URL('index.html', self.registration.scope).href : req;
  const cached = await cache.match(key, {ignoreSearch: true});
  const update = fetch(nav ? key : req, {cache: 'no-cache'}).then(async res => {
    if (res && res.ok) {
      const tag = r => r && (r.headers.get('etag') || r.headers.get('last-modified') || r.headers.get('content-length'));
      const changed = cached && tag(cached) && tag(res) && tag(cached) !== tag(res);
      await cache.put(key, res.clone());
      if (changed && nav) (await self.clients.matchAll()).forEach(c => c.postMessage({type: 'app-updated'}));
    }
    return res;
  }).catch(() => null);
  if (cached) { e.waitUntil(update); return cached; }
  const res = await update;
  return res || new Response('Metro Travels is offline and this file is not saved yet. Connect to the internet once and reload.', {status: 503, headers: {'Content-Type': 'text/plain'}});
}
