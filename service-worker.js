// Minimal no-op service worker for JOLT
self.addEventListener('install', (event) => {
  // Skip waiting so this SW becomes active immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim clients so it starts controlling pages
  event.waitUntil(self.clients.claim());
});

// You can extend this later with caching logic if you want
self.addEventListener('fetch', (event) => {
  // For now, just pass everything through
});
