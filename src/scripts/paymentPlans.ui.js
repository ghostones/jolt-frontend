const PLAN_ORDER = [
  'premium_weekly',
  'premium_monthly',
  'premium_quarterly',
  'premium_half_yearly',
  'premium_yearly'
];

export function renderPaymentPlans(plans) {
  const root = document.getElementById('appRoot');
  if (!root) return;

  // Prevent duplicate rendering
  const existing = document.querySelector('.plansContainer');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'plansContainer';

  const title = document.createElement('h2');
  title.innerText = 'Choose a Premium Plan';
  title.style.textAlign = 'center';
  title.style.margin = '12px 0';
  container.appendChild(title);

  PLAN_ORDER.forEach((key) => {
    const plan = plans[key];
    if (!plan) return;

    const card = document.createElement('div');
    card.className = 'planCard';

    // ⭐ Best Value (yearly = highest discount)
    if (key === 'premium_yearly') {
      const badge = document.createElement('div');
      badge.innerText = '⭐ Best Value';
      badge.className = 'planBadge';
      card.appendChild(badge);
    }

    const label = document.createElement('h3');
    label.innerText = plan.label;
    card.appendChild(label);

    const priceINR = document.createElement('p');
    priceINR.innerText = `₹${(plan.inr / 100).toFixed(0)}`;
    card.appendChild(priceINR);

    const priceUSD = document.createElement('p');
    priceUSD.innerText = `($${plan.usd})`;
    priceUSD.className = 'planUsd';
    card.appendChild(priceUSD);

    // Savings vs Monthly (skip weekly & monthly)
    if (key !== 'premium_weekly' && key !== 'premium_monthly') {
      const monthlyPrice = plans.premium_monthly.inr / 100;
      const effectiveMonthly =
        ((plan.inr / plan.durationDays) * 30) / 100;

      const savings = Math.round(monthlyPrice - effectiveMonthly);

      if (savings > 0) {
        const saveText = document.createElement('p');
        saveText.innerText = `Save ~₹${savings} / month`;
        saveText.className = 'planSavings';
        card.appendChild(saveText);
      }
    }

    const btn = document.createElement('button');
    btn.className = 'planBtn';
    btn.innerText = `Choose ${plan.label}`;

    btn.onclick = () => {
      btn.disabled = true;
      btn.innerText = 'Processing…';
      startCheckout(key).finally(() => {
        btn.disabled = false;
        btn.innerText = `Choose ${plan.label}`;
      });
    };

    card.appendChild(btn);
    container.appendChild(card);
  });

  root.appendChild(container);
}

async function startCheckout(planKey) {
  const session = JSON.parse(localStorage.getItem('joltSession'));
  if (!session?.sessionId) {
    alert('Please login first.');
    return;
  }

  const choice = confirm(
    'Press OK for Razorpay (INR)\nPress Cancel for PayPal (USD)'
  );

  // ================= RAZORPAY =================
  if (choice) {
    try {
      const res = await fetch('/payments/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': session.sessionId
        },
        body: JSON.stringify({ plan: planKey })
      });

      if (!res.ok) throw new Error('Order creation failed');

      const data = await res.json();

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: 'INR',
        name: 'JOLT Premium',
        description: `${planKey} plan`,
        order_id: data.orderId,

        modal: {
          ondismiss: () => {
            import('./paymentStatus.ui.js').then(({ showPaymentError }) => {
              showPaymentError(
                'Payment was cancelled. No money was deducted.',
                () => startCheckout(planKey)
              );
            });
          }
        },

        handler: async (response) => {
          try {
            const verify = await fetch('/payments/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-session-id': session.sessionId
              },
              body: JSON.stringify(response)
            });

            if (!verify.ok) throw new Error();

            alert('Premium activated 🎉');
            location.reload();
          } catch {
            import('./paymentStatus.ui.js').then(({ showPaymentError }) => {
              showPaymentError(
                'Payment verification failed. Please retry.',
                () => startCheckout(planKey)
              );
            });
          }
        }
      };

      new Razorpay(options).open();

    } catch {
      import('./paymentStatus.ui.js').then(({ showPaymentError }) => {
        showPaymentError(
          'Unable to start payment. Please try again.',
          () => startCheckout(planKey)
        );
      });
    }

  // ================= PAYPAL =================
  } else {
    try {
      const res = await fetch('/payments/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': session.sessionId
        },
        body: JSON.stringify({ plan: planKey })
      });

      if (!res.ok) throw new Error();

      const { orderId } = await res.json();

      const capture = await fetch('/payments/paypal/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': session.sessionId
        },
        body: JSON.stringify({ orderId })
      });

      if (!capture.ok) throw new Error();

      alert('Premium activated 🎉');
      location.reload();

    } catch {
      import('./paymentStatus.ui.js').then(({ showPaymentError }) => {
        showPaymentError(
          'PayPal payment failed or was cancelled.',
          () => startCheckout(planKey)
        );
      });
    }
  }
}
