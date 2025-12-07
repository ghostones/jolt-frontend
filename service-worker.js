// Minimal service worker for JOLT

self.addEventListener('install', event => {
  // Activate this SW as soon as it’s finished installing
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Take control of any open JOLT tabs immediately
  event.waitUntil(self.clients.claim());
});

// No fetch handler for now – avoids "no-op" warning.
// You can add caching logic later if needed.
