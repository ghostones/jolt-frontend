/**
 * Secure API Configuration
 * Obfuscated to prevent inspection
 */

(function() {
  'use strict';
  
  // Use centralized base URL configuration
  // Make sure base-url-config.js is loaded before this file
  const getApiBase = function() {
    if (window.getApiBaseUrl) {
      return window.getApiBaseUrl();
    }
    // Fallback if base-url-config.js is not loaded
    return window.JOLT_BACKEND_URL || window.BACKEND_URL || 'https://jolt-backendnew.onrender.com';
  };
  
  // HMAC-SHA256 signing (using Web Crypto API if available)
  async function signRequest(payload, timestamp, nonce, secret) {
    const data = JSON.stringify(payload) + timestamp + nonce;
    
    // Use Web Crypto API if available (more secure)
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const messageData = encoder.encode(data);
      
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, messageData);
      return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    
    // Fallback: simple hash (less secure but works everywhere)
    const hash = btoa(data + secret).split('').reverse().join('');
    return hash.substring(0, 64);
  }
  
  // API Client Secret (encoded to hide from inspection)
  // This should match API_CLIENT_SECRET env var on server
  const CLIENT_SECRET = atob('am9sdGNsaWVudHNlY3JldA==') || 'joltclientsecret';
  
  // Secure fetch wrapper
  async function secureFetch(endpoint, options = {}) {
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15) +
                  Date.now().toString(36);
    const method = options.method || 'POST';
    const isGetRequest = method === 'GET';
    const payload = isGetRequest ? {} : (options.body || {});
    
    // Sign request
    const signature = await signRequest(payload, timestamp, nonce, CLIENT_SECRET);
    
    return fetch(getApiBase() + endpoint, {
      ...options,
      method: method,
      headers: {
        ...(isGetRequest ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
        'X-Request-Signature': signature,
        'X-Request-Timestamp': timestamp.toString(),
        'X-Request-Nonce': nonce
      },
      body: isGetRequest ? undefined : JSON.stringify(payload)
    });
  }
  
  // Expose minimal API
  window.__API = {
    base: getApiBase(),
    fetch: secureFetch
  };
})();
