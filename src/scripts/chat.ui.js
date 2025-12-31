// public/scripts/chat.ui.js
export const chatUI = {
  setStatus(msg) {
    const el = document.getElementById('chatStatus');
    if (el) el.innerText = msg;
  },

  setPartner(name) {
    const el = document.getElementById('chatPartner');
    if (el) el.innerText = name || 'Unknown';
  },

  addMessage(msg) {
    const box = document.getElementById('chatMessages');
    if (!box) return;

    const div = document.createElement('div');
    div.innerText = msg;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  },

  showBlur() {
    const blur = document.getElementById('safetyBlur');
    if (blur) blur.style.display = 'flex';
  },

  hideBlur() {
    const blur = document.getElementById('safetyBlur');
    if (blur) blur.style.display = 'none';
  },

  reset() {
    this.setPartner('');
    this.setStatus('');
    const box = document.getElementById('chatMessages');
    if (box) box.innerHTML = '';
  }
};
