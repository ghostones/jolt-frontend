import { createSocket } from './socket.core.js';
import { startFrameModeration } from './moderation.js';
import { state } from './state.js';

import {
  renderUpgradeButton,
  renderPremiumBadge
} from './payments.ui.js';

import { renderPaymentPlans } from './paymentPlans.ui.js';
import { renderPremiumDashboard } from './premiumDashboard.ui.js';
import { renderPremiumExpiryReminder } from './premiumExpiryReminder.ui.js';

import plans from '../payments/plans.js';

/* =========================
   INITIAL UI RENDER
========================= */

// Show premium badge if applicable
renderPremiumBadge();

// Show upgrade button
renderUpgradeButton(handleUpgradeClick);

// Show premium-only UI (safe no-op if not premium)
renderPremiumDashboard();
renderPremiumExpiryReminder();

/* =========================
   UPGRADE HANDLER
========================= */

let plansRendered = false;

function handleUpgradeClick() {
  if (plansRendered) return;

  const root = document.getElementById('appRoot');
  if (!root) return;

  renderPaymentPlans(plans);
  plansRendered = true;
}

/* =========================
   JOIN CHAT HANDLER
========================= */

document.getElementById('joinChatBtn')?.addEventListener('click', () => {
  if (!state.username) {
    alert('Please login first.');
    return;
  }

  // Prevent duplicate socket creation
  if (!state.socket) {
    createSocket();
    startFrameModeration();
  }

  const genderFilter = state.isPremium
    ? document.getElementById('filterGender')?.value || ''
    : '';

  const interestFilter = state.isPremium
    ? document
        .getElementById('filterInterests')
        ?.value.split(',')
        .map(x => x.trim())
        .filter(Boolean)
    : [];

  state.socket?.emit('joinChat', {
    genderFilter,
    interestFilter
  });
});
