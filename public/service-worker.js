const STATIC_CACHE = "static-cache";
const RUNTIME_CACHE = "runtime-cache";

const FILES_TO_CACHE = [
    '/',
    '/assets/css/style.css',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
    '/index.html',
    '/index.js',
    '/db.js',
    '/dist/manifest.json',
    '/dist/bundle.js',
    '/assets/icons/icon_192x192.png',
    '/dist/icons/icon_512x512.png',
];

// Listen for service worker install event once browser resgisters a service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            // add all files to the static cache
            .then(cache => {
                cache.addAll(FILES_TO_CACHE)
            })
            // Force the waiting service worker to become the active service worker (reloads the service worker)
            .then(self.skipWaiting())
    );
});

// Clear the cache of all items that aren't 1 of the 2 caches instantiated at the top
self.addEventListener("activate", function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
        return Promise.all(
            keyList.map(key => {
            // Check each key to see if it should be deleted
            if (key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
                console.log("Removing old cache data, ", key);
                return caches.delete(key);
            }
            })
        );
        })
    );
    // Force the waiting service worker to become the active service worker (reloads the service worker)
    self.clients.claim();
    });

// Fetch missing
self.addEventListener("fetch", function(evt) {
    if (evt.request.url.includes("/api/")) {
        evt.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(evt.request)
                .then(response => {
                    // If the response was good, clone it and store it in the cache.
                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }
                    return response;
                })
                .catch(err => {
                    // Network request failed, try to get it from the cache.
                    return cache.match(evt.request);
                });
            })
            .catch(err => console.log(err))
        );
        return;
    }
    // If the request is not for an api endpoint, then serve the static assets
    evt.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(evt.request).then(response => {
                return response || fetch(evt.request);
            });
        })
    );
});