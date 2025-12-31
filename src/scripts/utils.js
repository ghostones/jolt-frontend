/**
 * JOLT Utility Helpers
 */

export function qs(id) {
  return document.getElementById(id);
}

export function safeJSONParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function throttle(lastTime, interval) {
  const now = Date.now();
  if (now - lastTime < interval) return false;
  return now;
}
