// public/scripts/webrtc.media.js
import { state } from './state.js';

export async function startWebcam() {
  if (state.webcamStream) return state.webcamStream;

  const video = document.getElementById('localVideo');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    state.webcamStream = stream;
    if (video) {
      video.srcObject = stream;
      await video.play();
    }

    return stream;
  } catch (err) {
    alert('Camera or microphone access denied.');
    throw err;
  }
}

export function stopWebcam() {
  if (!state.webcamStream) return;

  state.webcamStream.getTracks().forEach(t => t.stop());
  state.webcamStream = null;

  const video = document.getElementById('localVideo');
  if (video) video.srcObject = null;
}
