// scripts/webrtc.core.js
import { state } from './state.js';

const ICE_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export function createPeerConnection() {
  if (state.peerConnection) {
    state.peerConnection.close();
    state.peerConnection = null;
  }

  const pc = new RTCPeerConnection(ICE_CONFIG);

  if (state.webcamStream) {
    state.webcamStream.getTracks().forEach(track => {
      pc.addTrack(track, state.webcamStream);
    });
  }

  pc.ontrack = event => {
    if (!state.remoteStream) {
      state.remoteStream = new MediaStream();
    }

    event.streams[0].getTracks().forEach(track => {
      const exists = state.remoteStream
        .getTracks()
        .some(t => t.id === track.id);
      if (!exists) state.remoteStream.addTrack(track);
    });
  };

  pc.onicecandidate = event => {
    if (event.candidate && state.socket) {
      state.socket.emit('webrtc-ice-candidate', {
        candidate: event.candidate
      });
    }
  };

  state.peerConnection = pc;
  return pc;
}

export async function createOffer() {
  if (!state.peerConnection) return;

  const offer = await state.peerConnection.createOffer();
  await state.peerConnection.setLocalDescription(offer);

  state.socket?.emit('webrtc-offer', { offer });
}

export async function handleOffer(offer) {
  if (!state.peerConnection) {
    createPeerConnection();
  }

  await state.peerConnection.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  const answer = await state.peerConnection.createAnswer();
  await state.peerConnection.setLocalDescription(answer);

  state.socket?.emit('webrtc-answer', { answer });
}

export async function handleAnswer(answer) {
  if (!state.peerConnection) return;

  await state.peerConnection.setRemoteDescription(
    new RTCSessionDescription(answer)
  );
}

export async function handleIceCandidate(candidate) {
  if (!state.peerConnection) return;

  try {
    await state.peerConnection.addIceCandidate(
      new RTCIceCandidate(candidate)
    );
  } catch (e) {
    console.warn('[webrtc] ICE error', e);
  }
}

export function closePeerConnection() {
  if (state.peerConnection) {
    state.peerConnection.close();
    state.peerConnection = null;
  }

  if (state.remoteStream) {
    state.remoteStream.getTracks().forEach(t => t.stop());
    state.remoteStream = null;
  }
}