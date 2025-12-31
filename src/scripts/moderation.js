// public/scripts/moderation.js
import { state } from './state.js';

let interval = null;

export function startFrameModeration() {
  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    if (!state.socket || !state.webcamStream) return;

    const video = document.getElementById('localVideo');
    if (!video || video.readyState < 2) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frame = canvas.toDataURL('image/jpeg', 0.4);
    state.socket.emit('moderate-frame', { frame });
  }, 2000);
}

export function stopFrameModeration() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

export function showModerationBanner(message, strike = 0, level = 'warning') {
  const banner = document.getElementById('moderationBanner');
  const text = document.getElementById('moderationBannerText');
  const counter = document.getElementById('strikeCounter');
  const count = document.getElementById('strikeCount');

  if (!banner || !text) return;

  if (strike > 0) {
    state.userStrikes += strike;
    count.innerText = state.userStrikes;
    counter.style.display = 'inline-block';
  }

  text.innerText = message;
  banner.style.display = 'block';
  banner.style.opacity = 1;

  setTimeout(() => {
    banner.style.opacity = 0;
    setTimeout(() => (banner.style.display = 'none'), 300);
  }, 4000);
}
