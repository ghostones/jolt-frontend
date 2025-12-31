// scripts/socket.handlers.js
import { state } from './state.js';
import {
  startWebcam,
  stopWebcam
} from './webrtc.media.js';
import {
  createPeerConnection,
  closePeerConnection,
  createOffer,
  handleOffer,
  handleAnswer,
  handleIceCandidate
} from './webrtc.core.js';

export function attachSocketHandlers(socket) {
  if (!socket || state.socketHandlersAttached) return;
  state.socketHandlersAttached = true;

  // =========================
  // WEBRTC SIGNALING
  // =========================
  socket.on('start-webrtc', async data => {
    if (!state.webcamStream) {
      await startWebcam();
    }

    createPeerConnection();

    if (data?.initiator) {
      setTimeout(createOffer, 500);
    }
  });

  socket.on('webrtc-offer', data => {
    if (data?.offer) handleOffer(data.offer);
  });

  socket.on('webrtc-answer', data => {
    if (data?.answer) handleAnswer(data.answer);
  });

  socket.on('webrtc-ice-candidate', data => {
    if (data?.candidate) handleIceCandidate(data.candidate);
  });

  // =========================
  // MATCHING
  // =========================
  socket.on('waiting', () => {
    console.log('[socket] waiting for partner');
  });

  socket.on('matched', partnerName => {
    state.lastPartner = partnerName;
    state.lastMsgTime = 0;
    console.log('[socket] matched with', partnerName);
  });

  socket.on('chatEnded', () => {
    state.lastPartner = '';
    state.lastMsgTime = 0;
    stopWebcam();
    closePeerConnection();
  });

  // =========================
  // CHAT
  // =========================
  socket.on('chatMsg', msg => {
    console.log('[socket] message:', msg);
  });

  // =========================
  // GIFTS
  // =========================
  socket.on('gift-received', data => {
    console.log('[socket] gift received', data);
  });

  // =========================
  // SAFETY & MODERATION
  // =========================
  socket.on('blur-now', () => {
    state.safetyBlur = true;
  });

  socket.on('content-safe', () => {
    state.safetyBlur = false;
  });

  socket.on('imageRejected', data => {
    console.warn('[moderation] image rejected', data);
  });

  socket.on('audioRejected', data => {
    console.warn('[moderation] audio rejected', data);
  });

  socket.on('content-warning', data => {
    console.warn('[moderation] warning', data);
  });

  socket.on('kicked', data => {
    console.warn('[moderation] kicked', data);
    stopWebcam();
    closePeerConnection();
  });

  socket.on('ai-banned', data => {
    console.error('[moderation] banned', data);
    stopWebcam();
    closePeerConnection();
  });
}
