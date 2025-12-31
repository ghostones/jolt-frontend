import { state } from './state.js';

export function renderPremiumDashboard() {
  if (!state.user || !state.user.isPremium) return;

  const root = document.getElementById('appRoot');
  if (!root) return;

  const box = document.createElement('div');
  box.className = 'profile-card';

  const title = document.createElement('h3');
  title.innerText = '⭐ Premium Dashboard';
  box.appendChild(title);

  const expiry = new Date(state.user.premiumUntil);
  const expiryText = document.createElement('p');
  expiryText.innerText = `Valid until: ${expiry.toDateString()}`;
  box.appendChild(expiryText);

  root.appendChild(box);
}
