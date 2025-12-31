export function showPaymentError(message, retryFn) {
  const root = document.getElementById('appRoot');
  if (!root) return;

  // Clear previous UI
  root.innerHTML = '';

  const box = document.createElement('div');
  box.className = 'payment-status-box';

  const title = document.createElement('h2');
  title.innerText = 'Payment Incomplete';
  box.appendChild(title);

  const msg = document.createElement('p');
  msg.innerText =
    message || 'Your payment was not completed. No money was deducted.';
  box.appendChild(msg);

  const retryBtn = document.createElement('button');
  retryBtn.innerText = 'Retry Payment';
  retryBtn.className = 'retry-btn';
  retryBtn.onclick = retryFn;

  box.appendChild(retryBtn);

  root.appendChild(box);
}
