// Minimal service worker for JOLT
self.addEventListener('install', () => {
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // Take control without reload
});

// ⚠️ IMPORTANT:
// Do NOT include a fetch handler unless you actually intercept and return responses.
// A no-op handler causes browser warnings.
// Removing it entirely avoids "no-op fetch handler" errors.

// If you add caching later, add a REAL fetch handler with event.respondWith(...)
