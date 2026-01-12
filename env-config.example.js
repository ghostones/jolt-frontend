/**
 * Environment Configuration Example File
 * 
 * This is a template file. Copy this to env-config.js and fill in your actual values.
 * DO NOT commit env-config.js to public repositories!
 * 
 * To use:
 * 1. Copy this file: cp env-config.example.js env-config.js
 * 2. Fill in all the values in env-config.js
 * 3. Add env-config.js to .gitignore
 */

(function() {
  'use strict';
  
  // Google AdSense Publisher ID
  window.ADSENSE_PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX';
  
  // AdSense Slot IDs
  window.ADSENSE_SLOTS = {
    leftSidebar: 'YOUR_LEFT_AD_SLOT_ID',
    rightSidebar: 'YOUR_RIGHT_AD_SLOT_ID',
    banner: 'YOUR_BANNER_AD_SLOT_ID'
  };
  
  // Contact & Support Information
  window.CONTACT_INFO = {
    supportEmail: 'joltchat@outlook.com',
    supportEmailDisplay: 'joltchat@outlook.com',
    supportUrl: 'mailto:joltchat@outlook.com'
  };
  
  // API Keys (if needed)
  window.API_KEYS = {
    // googleMaps: 'YOUR_GOOGLE_MAPS_API_KEY',
  };
  
  // CDN URLs
  window.CDN_URLS = {
    socketIO: 'https://cdn.socket.io/4.7.5/socket.io.min.js',
    razorpay: 'https://checkout.razorpay.com/v1/checkout.js',
    adsense: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  };
  
  // Environment detection
  window.ENV_CONFIG = {
    isProduction: window.location.hostname !== 'localhost' && 
                  window.location.hostname !== '127.0.0.1',
    environment: (() => {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') return 'development';
      return 'production';
    })(),
    hostname: window.location.hostname,
    protocol: window.location.protocol
  };
  
  // Feature flags
  window.FEATURE_FLAGS = {
    enableAds: window.ENV_CONFIG.isProduction,
    enableAnalytics: window.ENV_CONFIG.isProduction,
    enableDebug: !window.ENV_CONFIG.isProduction,
  };
  
})();
