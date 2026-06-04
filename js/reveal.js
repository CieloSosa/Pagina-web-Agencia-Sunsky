/* Scroll reveal — espera que el CSS esté pintado antes de observar */

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  /* Si el navegador prefiere menos movimiento, mostramos todo de golpe */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* solo anima una vez */
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/*
  Esperamos dos frames: el primero asegura que el CSSOM esté aplicado
  (opacity:0 ya pintado), el segundo que el layout esté calculado.
  Sin esto el observer dispara antes de que el elemento llegue a ser
  invisible y la animación nunca se ve.
*/
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => requestAnimationFrame(initReveal));
  });
} else {
  requestAnimationFrame(() => requestAnimationFrame(initReveal));
}
