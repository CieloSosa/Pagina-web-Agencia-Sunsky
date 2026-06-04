/* ================================================
   MAIN — Cursor · Nav · Hamburger · Logos
   Agencia Sunsky  ·  js/main.js
================================================ */

/* ============================
   CURSOR PERSONALIZADO
   Solo activo en desktop (>768px)
============================ */
const cursor = document.getElementById('cursor');

if (window.innerWidth > 768 && cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  const hoverTargets = [
    'a', 'button',
    '.plan-card', '.blog-card',
    '.value-card', '.team-card', '.faq-q'
  ].join(', ');

  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ============================
   NAV — Frosted glass al hacer scroll
============================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ============================
   HAMBURGER — Menú mobile
============================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Función global llamada desde los links del menú mobile
function closeMobile() {
  mobileMenu.classList.remove('open');
}

/* ============================
   LOGO STRIP — Pausa on hover
============================ */
const logosTrack = document.querySelector('.logos-track');

if (logosTrack) {
  logosTrack.addEventListener('mouseenter', () => {
    logosTrack.style.animationPlayState = 'paused';
  });
  logosTrack.addEventListener('mouseleave', () => {
    logosTrack.style.animationPlayState = 'running';
  });
}
