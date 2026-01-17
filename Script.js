// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Back-to-top visibility
const backToTop = document.querySelector('.back-to-top');
const onScroll = () => {
  if (window.scrollY > 600) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
};
window.addEventListener('scroll', onScroll);

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for internal links (enhanced)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav after click
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Contact form (prototype handler)
const form = document.querySelector('.contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    status.textContent = `Thanks, ${name}! Your inquiry has been received. We’ll contact you soon.`;
    form.reset();
    setTimeout(() => (status.textContent = ''), 6000);
  });
}
