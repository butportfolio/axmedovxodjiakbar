/* ─── INIT LUCIDE ICONS ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initMobileMenu();
  initSkillBars();
  initReveal();
  renderServices();
});

/* ─── SCROLL TO SECTION ──────────────────────────────────────────────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  closeMobileMenu();
}

/* ─── MOBILE MENU ────────────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('mobileMenu');
  const icon   = document.getElementById('menuIcon');
  let open = false;

  toggle.addEventListener('click', () => {
    open = !open;
    if (open) {
      menu.classList.add('open');
      icon.setAttribute('data-lucide', 'x');
    } else {
      closeMobileMenu();
    }
    lucide.createIcons();
  });
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  menu.classList.remove('open');
  if (icon) icon.setAttribute('data-lucide', 'menu');
  lucide.createIcons();
}

/* ─── SKILL BARS (IntersectionObserver) ─────────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(bar => observer.observe(bar));
}

/* ─── REVEAL ON SCROLL ───────────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-40px' });

  els.forEach(el => observer.observe(el));
}

/* ─── SERVICES DATA & RENDER ─────────────────────────────────────────── */
const SERVICES = [
  {
    icon: 'video',
    title: 'Video Shooting',
    desc: 'Cinematic video production with professional-grade equipment and storytelling techniques.',
    url: 'video-shooting.html'
  },
  {
    icon: 'palette',
    title: 'UI/UX Design',
    desc: 'Intuitive, beautiful interfaces built around user behavior and accessibility.',
    url: 'uiux.html'
  },
  {
    icon: 'box',
    title: '3D Modeling',
    desc: 'High-fidelity 3D assets and environments crafted in Blender for any medium.',
    url: '3dmodeling.html'
  },
  {
    icon: 'gamepad-2',
    title: 'Game Design',
    desc: 'Immersive game worlds developed with Unity — from concept to playable build.',
    url: 'gamedesign.html'
  },
  {
    icon: 'camera',
    title: 'Photography',
    desc: 'Visual narratives through the lens — portraits, products, events, and beyond.',
    url: 'photoshooting.html'
  },
  {
    icon: 'monitor',
    title: '2D Graphics',
    desc: 'Bold illustrations and vector art designed to communicate and captivate.',
    url: '2dgraphics.html'
  },
];

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  SERVICES.forEach((svc, i) => {
    const link = document.createElement('a');
    link.href = svc.url;
    link.className = 'service-card-link';

    const card = document.createElement('div');
    card.className = 'service-card';
    card.style.transitionDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="service-icon">
        <i data-lucide="${svc.icon}"></i>
      </div>
      <h3>${svc.title}</h3>
      <p>${svc.desc}</p>
    `;

    link.appendChild(card);
    grid.appendChild(link);
  });

  // Re-init lucide icons for dynamically added cards
  lucide.createIcons();

  // Observe service cards for reveal
  const cards = grid.querySelectorAll('.service-card-link .service-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-40px' });

  cards.forEach(card => observer.observe(card));
}
