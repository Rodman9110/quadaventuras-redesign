document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año en footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Filtro de actividades ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const activityCards = document.querySelectorAll('.activity-card');

  function applyFilter(filter) {
    filterButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.filter === filter);
    });
    activityCards.forEach(card => {
      const match = filter === 'todas' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !match);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  // Enlaces con data-filter (tarjetas de categoría, footer) llevan al filtro correspondiente
  document.querySelectorAll('[data-filter]:not(.filter-btn)').forEach(link => {
    link.addEventListener('click', () => {
      applyFilter(link.dataset.filter);
    });
  });

  /* ---------- Botón volver arriba ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Formulario de contacto (demo) ---------- */
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (form && formNote) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.hidden = false;
      form.reset();
      formNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

});
