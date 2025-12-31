import { state } from './state.js';

export function renderPremiumExpiryReminder() {
  if (!state.user || !state.user.isPremium) return;
  if (!state.user.premiumUntil) return;

  const now = Date.now();
  const expiry = new Date(state.user.premiumUntil).getTime();
  const daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

  // Show only if expiring soon
  if (daysLeft > 3 || daysLeft < 0) return;

  // Prevent repeat per session
  if (sessionStorage.getItem('premiumExpiryShown')) return;
  sessionStorage.setItem('premiumExpiryShown', '1');

  const root = document.getElementById('appRoot');
  if (!root) return;

  const box = document.createElement('div');
  box.className = 'expiry-reminder';

  const msg = document.createElement('p');
  msg.innerText =
    daysLeft === 0
      ? '⚠️ Your Premium expires today!'
      : `⏰ Your Premium expires in ${daysLeft} day${daysLeft > 1 ? 's' : ''}.`;

  const btn = document.createElement('button');
  btn.innerText = 'Renew Premium';
  btn.className = 'expiry-renew-btn';

  btn.onclick = () => {
    document.getElementById('upgradeBtn')?.click();
  };

  box.appendChild(msg);
  box.appendChild(btn);

  root.prepend(box);
}
