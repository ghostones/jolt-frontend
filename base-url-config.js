/**
 * Centralized API Base URL Configuration
 * 
 * TO CHANGE URL: Just comment/uncomment the line below
 * - For LOCAL: Uncomment LOCAL_URL and comment PROD_URL
 * - For PRODUCTION: Uncomment PROD_URL and comment LOCAL_URL
 */

(function () {
  'use strict';

  // ============================================
  // 👇 CHANGE URL HERE - JUST COMMENT/UNCOMMENT 👇
  // ============================================

  // const API_BASE_URL = 'http://localhost:1234';  // 👈 LOCAL - Uncomment this for localhost
  const API_BASE_URL = 'https://jolt-backendnew.onrender.com';  // 👈 PRODUCTION - Uncomment this for production

  // ============================================
  // AUTO-SETUP (Don't change below)
  // ============================================

  // Make it available globally
  window.getApiBaseUrl = function () {
    // Allow override from window config
    if (window.JOLT_BACKEND_URL) return window.JOLT_BACKEND_URL;
    if (window.BACKEND_URL) return window.BACKEND_URL;
    return API_BASE_URL;
  };

  window.API_BASE_CONFIG = {
    current: API_BASE_URL
  };
})();
