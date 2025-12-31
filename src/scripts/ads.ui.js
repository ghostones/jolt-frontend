export function renderAd() {
  const root = document.getElementById('appRoot');
  if (!root) return;

  const ad = document.createElement('div');
  ad.innerHTML = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3289856543483173"
     crossorigin="anonymous"></script>
  `;
  ad.style.margin = '16px 0';

  root.appendChild(ad);
}
export function renderWaitingAd() {
  const root = document.getElementById('appRoot');
  if (!root) return;

  const adWrap = document.createElement('div');
  adWrap.className = 'ad-container';

  adWrap.innerHTML = `
    <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-3289856543483173"
      data-ad-slot="8037278823"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  `;

  root.appendChild(adWrap);

  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.warn('AdSense render error', e);
  }
}
