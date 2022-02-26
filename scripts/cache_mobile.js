self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('cache_mobile').then(function(cache) {
     return cache.addAll([
       '/zhao/',
       '/zhao/index.html',
       '/zhao/mobile.js',
       '/zhao/mobile.css',
       '/zhao/select.js'
     ]);
   })
 );
});

  self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});