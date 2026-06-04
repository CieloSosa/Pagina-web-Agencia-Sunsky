/* ================================================
   SCROLL EFFECTS
   Agencia Sunsky  ·  js/scroll-effects.js
   ------------------------------------------------
   1. Barra de progreso animada en la parte superior
   2. Nav link activo según la sección visible
================================================ */

/* ============================
   1. BARRA DE PROGRESO
============================ */
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress-bar');
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress    = (window.scrollY / totalHeight) * 100;
  progressBar.style.width = progress + '%';
}, { passive: true });


/* ============================
   2. NAV LINK ACTIVO
   Resalta el link del nav según
   la sección que está en pantalla
============================ */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections  = document.querySelectorAll('section[id]');

const sectionUrlMap = {
  planes:   '/planes',
  nosotros: '/nosotros',
  blog:     '/blog',
  faq:      '/faq'
};

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.getAttribute('id');

    // Resalta el link activo en el nav
    navLinks.forEach(link => {
      const matches = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', matches);
    });

    // Actualiza la URL y dispara GA4 al scrollear a una sección trackeada
    const path = sectionUrlMap[id];
    if (path && window.location.pathname !== path) {
      history.replaceState(null, '', path);
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', { page_path: path, page_title: document.title });
      }
    } else if (!path && window.location.pathname !== '/') {
      history.replaceState(null, '', '/');
    }
  });
}, {
  threshold: 0.35,
  rootMargin: '-10% 0px -45% 0px'
});

sections.forEach(section => sectionObserver.observe(section));
