// const FILES_TO_CACHE = [
//     '/',
//     '/assets/css/style.css',
//     'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
//     '/index.html',
//     '/index.js',
//     '/db.js',
//     '/dist/manifest.json',
//     '/dist/bundle.js',
//     '/dist/icon_72x72.png',
//     '/dist/icon_96x96.png',
//     '/dist/icon_128x128.png',
//     '/dist/icon_144x144.png',
//     '/dist/icon_152x152.png',
//     '/dist/icon_192x192.png',
//     '/dist/icon_384x384.png',
//     '/dist/icon_512x512.png',
// ];

// const STATIC_CACHE = "static-cache-v1";
// const RUNTIME_CACHE = "runtime-cache-v1";

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches
//             .open(STATIC_CACHE)
//             .then((cache) => cache.addAll(FILES_TO_CACHE))
//             .then(self.skipWaiting())
//     );
// });

// self.addEventListener("activate", event => {
//     const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
//     event.waitUntil(
//         caches
//             .keys()
//             .then(cacheNames => {
//                 return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
//             })
//             .then(cachesToDelete => {
//                 return Promise.all(
//                     cachesToDelete.map(cacheToDelete => {
//                         return caches.delete(cacheToDelete);
//                     })
//                 );
//             })
//             .then(() => self.clients.claim())
//     );
// });

// Fetch
// check if db access (network connection, if not hit local cache for db info)