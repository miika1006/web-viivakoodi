// Service Worker – Web Barcode Reader
// Minimal: registers for PWA installability, no offline caching.
self.addEventListener("install", function() { self.skipWaiting(); });
self.addEventListener("activate", function() { self.clients.claim(); });
