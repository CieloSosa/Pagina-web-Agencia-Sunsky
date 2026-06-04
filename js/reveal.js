/* ================================================
   SCROLL REVEAL — IntersectionObserver
   Agencia Sunsky  ·  js/reveal.js
   ------------------------------------------------
   Detecta cuando un elemento .reveal entra al viewport
   y le agrega la clase .visible para activar la animación
   definida en css/animations.css
================================================ */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -36px 0px'
  }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
