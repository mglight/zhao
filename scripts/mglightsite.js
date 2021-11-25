self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('mglightsite').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/scripts/main.js',
       '/styles/style.css'
     ]);
   })
 );
});

  self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
      console.log('抓取成功');
    })
  );
});
