// Proyecto Solar - app.js

// ---------------- Utility: Router -----------------
const routes = {
  '#inicio': 'view-inicio',
  '#semana1': 'view-semana1',
  '#semana2': 'view-semana2',
  '#semana3': 'view-semana3',
  '#semana4': 'view-semana4',
  '#introduccion': 'view-introduccion',
  '#faq': 'view-faq',
  '#contacto': 'view-contacto',
  '#sobre-mi': 'view-sobre-mi',
};

function router() {
  const hash = window.location.hash || '#inicio';
  // Show corresponding view
  Object.values(routes).forEach((viewId) => {
    const viewEl = document.getElementById(viewId);
    if (viewEl) {
      viewEl.classList.toggle('active', hash === `#${viewId.split('-')[1]}` || hash === `#${viewId.replace('view-', '')}`);
    }
  });
  // Highlight nav link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
  // Close mobile menu on navigation
  const navMenu = document.getElementById('nav-menu');
  if (navMenu.classList.contains('open')) navMenu.classList.remove('open');
}

// -------------- Mobile Nav Toggle -----------------
function initBurger() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// --------------- Populate Tables & FAQ ------------
function populateDynamicContent() {
  const dataScript = document.getElementById('faq-data');
  if (!dataScript) return;
  const data = JSON.parse(dataScript.textContent.trim());

  // Parameters table (Semana 1)
  const paramsTbody = document.getElementById('parameters-table');
  if (paramsTbody && data.parametersTable) {
    data.parametersTable.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.Parámetro}</td><td>${row.Valor}</td>`;
      paramsTbody.appendChild(tr);
    });
  }

  // FAQ accordion
  const faqList = document.getElementById('faq-list');
  if (faqList && data.faq) {
    data.faq.forEach((item) => {
      const details = document.createElement('details');
      details.className = 'faq-item';
      const summary = document.createElement('summary');
      summary.textContent = item.q;
      const p = document.createElement('p');
      p.textContent = item.a;
      details.appendChild(summary);
      details.appendChild(p);
      faqList.appendChild(details);
    });
  }
}

// --------------- Contact Form ---------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensaje enviado');
    form.reset();
  });
}

// ---------------- Init ----------------------------
document.addEventListener('DOMContentLoaded', () => {
  initBurger();
  populateDynamicContent();
  initContactForm();
  router();
  window.addEventListener('hashchange', router);
});
