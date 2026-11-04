// METAL KAP 2 PHONE offline: everything the app needs is kept on the phone; a new version is fetched in the background and used at the next start
const V="mk2-c60c5e18de",FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r).then(res=>{if(res&&res.ok&&(new URL(r.url).origin===location.origin||r.url.includes("fonts.g")))c.put(r,res.clone());return res}).catch(()=>hit);
  return hit||net}))});
