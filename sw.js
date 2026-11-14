const CACHE='fujinomiya-mylife-v9-restaurant-grid';
const ASSETS=['./','./index.html','./style.css?v=8-menu-cleanup','./app.js?v=8-menu-cleanup','./icon.png','./manifest.webmanifest','./medical-data.js','./shopping-data.js?v=4','./restaurant-data.js?v=9'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fujinomiya-mylife-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{})}return r}).catch(()=>caches.match(e.request)))});
