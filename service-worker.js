const CACHE_NAME = "nakul-zone-v1";

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME));
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, fetchRes.clone());
            }
            return fetchRes;
          });
        })
      );
    })
  );
});
