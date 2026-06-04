/* ================================================
   FAQ ACCORDION
   Agencia Sunsky  ·  js/faq.js
   ------------------------------------------------
   Maneja el accordion del FAQ: al hacer clic en una
   pregunta se expande su respuesta y se cierra la
   que estaba abierta (solo una abierta a la vez).
================================================ */

document.querySelectorAll('.faq-q').forEach(question => {
  question.addEventListener('click', () => {
    const item   = question.parentElement;
    const isOpen = item.classList.contains('open');

    // Cerramos todos
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Si no estaba abierto, lo abrimos
    if (!isOpen) item.classList.add('open');
  });
});
