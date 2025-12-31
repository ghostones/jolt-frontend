/**
 * JOLT Frontend Configuration
 * © 2025 JOLT. All rights reserved.
 */

export const API_BASE = 'https://jolt-backend-ck3c.onrender.com';

export const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export const MODERATION_INTERVAL_MS = 2000;
export const CHAT_SPAM_INTERVAL_MS = 500;
