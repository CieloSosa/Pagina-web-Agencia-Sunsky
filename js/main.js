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
   ANCHOR LINKS — Scroll suave + URL limpia por sección
============================ */

// Mapa de sección → URL limpia
const sectionPaths = {
  planes:   '/planes',
  nosotros: '/nosotros',
  blog:     '/blog',
  faq:      '/faq'
};

function trackSection(path) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', { page_path: path, page_title: document.title });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    const path = sectionPaths[id] || '/';
    history.pushState(null, '', path);
    trackSection(path);
    closeMobile();
  });
});

// Al cargar la página desde una URL de sección (ej: agenciasunsky.com/planes)
// scrollea hasta la sección correspondiente
const pathOnLoad = window.location.pathname.replace('/', '');
if (pathOnLoad && sectionPaths['/' + pathOnLoad] === undefined) {
  // busca la sección por pathname
  const sectionId = Object.keys(sectionPaths).find(k => sectionPaths[k] === window.location.pathname);
  if (sectionId) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  }
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
