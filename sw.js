/* 빵을그리다 월별 위생교육 · 모바일 수강 — 서비스 워커 (홈 화면 설치용, 항상 최신 index.html 우선) */
const CACHE = "bggd-edu-v1";
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  e.respondWith(fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(ca => ca.put(req, c)); return res; }).catch(() => caches.match(req)));
});
