/* SUNNY EDITOR — Service Worker
 * 오프라인 캐싱: 첫 로드 시 핵심 자산 캐시, 이후 같은 도메인 GET = cache-first
 * 동적 자원(폰트 CDN 등)도 자동 캐싱
 */
const CACHE = 'sunny-editor-v1-1-3';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/guide.html',
  '/favicon.svg',
  '/og-image.svg',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE_ASSETS).catch(() => null))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // chrome-extension·data·blob 등 = 캐시 X
  if (!url.protocol.startsWith('http')) return;

  // navigation = cache-first → fallback to index.html (= PWA offline shell)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() =>
        caches.match(req).then(r => r || caches.match('/index.html'))
      )
    );
    return;
  }

  // 정적 자원 = cache-first
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        // 같은 origin + ok + opaque 아닌 응답만 캐시
        if (resp && resp.ok && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        // 폰트 CDN 같은 cross-origin도 캐시 (opaque)
        else if (resp && (url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('jsdelivr.net'))) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return resp;
      }).catch(() => caches.match(req));
    })
  );
});
