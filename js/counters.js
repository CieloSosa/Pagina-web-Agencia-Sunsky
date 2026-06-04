/* ================================================
   CONTADORES ANIMADOS
   Agencia Sunsky  ·  js/counters.js
   ------------------------------------------------
   Anima los números de las estadísticas del hero
   (ej: +100, 5, 100%) contando desde 0 cuando
   entran a la pantalla. Conserva prefijos (+) y
   sufijos (%) del texto original.
================================================ */

function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return;

  const prefix = match[1];
  const target = parseInt(match[2], 10);
  const suffix = match[3];

  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);   // ease-out cubic
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      obs.unobserve(entry.target);   // una sola vez
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el));
