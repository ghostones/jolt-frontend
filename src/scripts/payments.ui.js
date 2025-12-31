import { state } from './state.js';

/* =========================
   UPGRADE BUTTON
========================= */

export function renderUpgradeButton(onUpgradeClick) {
  if (!state.user || state.user.isPremium === true) return;

  const root = document.getElementById('appRoot');
  if (!root) return;

  // Prevent duplicate button
  if (document.getElementById('upgradeBtn')) return;

  const info = document.createElement('p');
  info.innerText =
    'Unlock premium filters, priority matching, and an ad-free experience.';
  info.style.textAlign = 'center';
  info.style.marginBottom = '8px';
  info.style.color = '#444';

  const btn = document.createElement('button');
  btn.id = 'upgradeBtn';
  btn.innerText = 'Upgrade to Premium';
  btn.className = 'premium-btn';

  btn.onclick = () => {
    btn.disabled = true;
    btn.innerText = 'Loading plans…';

    if (typeof onUpgradeClick === 'function') {
      onUpgradeClick();
    }
  };

  root.appendChild(info);
  root.appendChild(btn);
}

/* =========================
   PREMIUM BADGE
========================= */

export function renderPremiumBadge() {
  if (!state.user || state.user.isPremium !== true) return;

  const root = document.getElementById('appRoot');
  if (!root) return;

  // Prevent duplicate badge
  if (document.getElementById('premiumBadge')) return;

  const badge = document.createElement('div');
  badge.id = 'premiumBadge';
  badge.innerText = '⭐ PREMIUM MEMBER';
  badge.className = 'premium-badge';

  root.appendChild(badge);
}
