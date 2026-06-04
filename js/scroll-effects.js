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

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.getAttribute('id');

    navLinks.forEach(link => {
      const matches = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', matches);
    });
  });
}, {
  threshold: 0.35,
  rootMargin: '-10% 0px -45% 0px'
});

sections.forEach(section => sectionObserver.observe(section));
