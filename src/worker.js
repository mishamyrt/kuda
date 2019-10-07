/* global self, caches, fetch */
const cacheKey = '98f76e0d3561c373fe3e'

const clearCache = () => caches.keys()
  .then(keys => keys.filter(key => key !== cacheKey))
  .then(keys => keys.forEach(key => caches.delete(key)))
  .then(() => self.clients.claim())

const saveCache = event => caches.open(cacheKey)
  .then(cache => fetch(event.request)
    .then(response => cache.put(event.request, response.clone())
      .then(() => response)))

const getCache = event => caches.match(event.request)
  .then(cachedResponse => {
    if (cachedResponse) {
      return cachedResponse
    }
    return saveCache(event)
  })

self.addEventListener('activate', event => {
  event.waitUntil(clearCache())
})

self.addEventListener('fetch', event => {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return
  event.respondWith(getCache(event))
})
