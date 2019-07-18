


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('gif4you').then(function(cache) {
     return cache.addAll([
       '/',
       'app/index.html',
       'app/index.html?homescreen=1',
       'app/?homescreen=1',
       'app/styles/main.css',
       'app/scripts/main.min.js',
       'app/styles/index.css',
       'app/styles/video.css',
     ]);
   })
 );
});


self.addEventListener('fetch', function(event) {

    console.log(event.request.url);
    event.respondWith( caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })    
    );
});