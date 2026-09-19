const CACHE='michifinanzas-v712-real';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon.svg','./config.js','./assets/michi/hero.webp?v=7.1.2','./assets/michi/home-analyst.webp?v=7.1.2','./assets/michi/advice.webp?v=7.1.2','./assets/michi/movements.webp?v=7.1.2','./assets/michi/funds.webp?v=7.1.2','./assets/michi/planning.webp?v=7.1.2','./assets/michi/reports.webp?v=7.1.2','./assets/michi/profile.webp?v=7.1.2','./assets/michi/michi-center.webp?v=7.1.2','./assets/michi/onboarding.webp?v=7.1.2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html')));
    return;
  }
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
  }
});