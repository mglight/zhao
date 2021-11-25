self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('mglightsite').then(function(cache) {
     return cache.addAll([
       '/zhao/',
       '/zhao/index.html',
       '/zhao/scripts/main.js',
       '/zhao/styles/style.css'
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
