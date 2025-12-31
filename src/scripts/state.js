/**
 * JOLT Runtime State
 * In-memory only. No persistence here.
 */

export const state = {
  // Identity
  user: null,
  session: null,

  // Socket
  socket: null,
  socketHandlersAttached: false,

  // WebRTC
  peerConnection: null,
  webcamStream: null,
  remoteStream: null,

  // Chat
  lastPartner: '',
  lastMsgTime: 0,
  skipLock: false,

  // Moderation
  strikes: 0
};
