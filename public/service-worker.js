const STATIC_CACHE = "static-cache-v1";
const RUNTIME_CACHE = "runtime-cache-v1";

const FILES_TO_CACHE = [
    '/',
    '/assets/css/style.css',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    '/index.html',
    '/index.js',
    '/db.js',
    '/dist/manifest.json',
    '/dist/bundle.js',
    '/dist/icon_72x72.png',
    '/dist/icon_96x96.png',
    '/dist/icon_128x128.png',
    '/dist/icon_144x144.png',
    '/dist/icon_152x152.png',
    '/dist/icon_192x192.png',
    '/dist/icon_384x384.png',
    '/dist/icon_512x512.png',
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

// // Activation - Clear the cache of all items that aren't 1 of the 2 caches instantiated at the top
// self.addEventListener("activate", event => {
//     const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
//     event.waitUntil(
//         caches.keys()
//         // Return and cache names that aren't current
//         .then(cacheNames => {
//             return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
//         })
//         // Delete any cache names that arent current
//         .then(cachesOther => {
//             return Promise.all(
//                 cachesOther.map(cacheOld => {
//                     return caches.delete(cacheOld);
//                 })
//             );
//         })
//         // Force the waiting service worker to become the active service worker (reloads the service worker)
//         .then(() => self.clients.claim())
//     );
// });

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
// check if db access (network connection, if not hit local cache for db info)