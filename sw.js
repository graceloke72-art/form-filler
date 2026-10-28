/* Form Filler offline cache: the app page and icons are saved on the phone; the newest version is fetched whenever there is signal. */
const CACHE = "form-filler-v3";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())) });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())) });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;
  const lib = /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com|fonts\.(googleapis|gstatic)\.com/.test(url.host);
  if (!same && !lib) return;
  if (same && (req.mode === "navigate" || url.pathname.endsWith("/index.html"))) {
    /* app page: newest first, saved copy when offline */
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", cp)); return r })
      .catch(() => caches.match("./index.html")));
    return;
  }
  /* icons, libraries, fonts: saved copy first */
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === "opaque") { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)) }
    return r;
  })));
});
