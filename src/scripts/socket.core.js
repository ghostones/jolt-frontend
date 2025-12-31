// scripts/socket.core.js
import { API_BASE } from './config.js';
import { state } from './state.js';
import { attachSocketHandlers } from './socket.handlers.js';

export function destroySocket() {
  if (!state.socket) return;

  try {
    state.socket.removeAllListeners();
    state.socket.disconnect();
  } catch (e) {
    console.warn('[socket.core] cleanup error', e);
  }

  state.socket = null;
  state.socketHandlersAttached = false;
  state.lastPartner = '';
}

export function createSocket() {
  // 🔐 HARD RULE: only one socket at a time
  if (state.socket) {
    destroySocket();
  }

  const sessionRaw = localStorage.getItem('joltSession');
  let session = null;

  try {
    session = sessionRaw ? JSON.parse(sessionRaw) : null;
  } catch {
    console.error('[socket.core] Invalid session JSON');
    return null;
  }

  if (!session || !session.sessionId) {
    console.error('[socket.core] Missing sessionId');
    return null;
  }

  const socket = io(API_BASE, {
    transports: ['websocket'],
    secure: true,
    withCredentials: true,
    auth: {
      sessionId: session.sessionId
    }
  });

  socket.on('connect', () => {
    console.log('[socket.core] connected', socket.id);
  });

  socket.on('disconnect', reason => {
    console.warn('[socket.core] disconnected', reason);
  });

  state.socket = socket;

  // 🔗 Attach events AFTER socket exists
  attachSocketHandlers(socket);

  return socket;
}
