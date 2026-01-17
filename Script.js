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

// Scroll animations using Intersection Observer
const observerOptions = {
  threshold: 0,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe section headers
document.querySelectorAll('.section-header').forEach(header => {
  observer.observe(header);
});

// Observe grids for cards
document.querySelectorAll('.grid, .gallery-grid').forEach(grid => {
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.info-card, .feature, .gallery-item');
        children.forEach(child => {
          child.classList.add('animate');
        });
      }
    });
  }, observerOptions);
  gridObserver.observe(grid);
});

// Trigger animations for elements already in view on load
document.querySelectorAll('.section-header').forEach(header => {
  const rect = header.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    header.classList.add('animate');
  }
});
