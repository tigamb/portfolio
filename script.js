/* ============================================================
   DANNY AMBAOU – PORTFOLIO  |  script.js
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   PROJECT DATA
   ────────────────────────────────────────── */
const PROJECTS = [
  {
    title:       'Playwright Automation Framework',
    video:       'https://drive.google.com/file/d/1jX3Oze8cm5Xy1SG5W5D2Jjq06yU_yeSK/preview',
    thumb:       'assets/images/thumb-playwright.jpg',
    tags:        ['Python', 'Playwright', 'Pytest', 'Allure'],
    desc:        'A production-grade end-to-end automation framework built from scratch using Playwright and Python. Implements the Page Object Model pattern for maintainability, parallel execution across multiple browsers, and generates beautiful Allure HTML reports. Designed to integrate seamlessly into CI/CD pipelines with zero configuration.',
    challenge:   'The team had no standardized automation setup. Tests were slow, brittle, and not maintainable across a growing engineering team.',
    solution:    'Designed a layered POM architecture with shared fixtures, environment-agnostic configuration management, custom retry logic for flaky selectors, and a Jenkins pipeline that runs tests in parallel across Chromium, Firefox, and WebKit.',
    achievements:[
      'Reduced test suite execution time by 60% through parallelisation',
      'Achieved 95%+ coverage on critical user journeys',
      'Zero-configuration onboarding — new engineers run the full suite in under 5 minutes',
      'Allure reports auto-published to internal dashboard after each CI run',
    ],
    github:      'https://github.com/danny-ambaou/playwright-framework',
  },
  {
    title:       'REST API Automation',
    video:       null, // Replace with Google Drive link when ready
    thumb:       'assets/images/thumb-api.jpg',
    tags:        ['Python', 'Requests', 'Pytest', 'Postman', 'JSON Schema'],
    desc:        'Comprehensive API test suite covering authentication flows, CRUD operations, contract testing, error handling, and performance benchmarking. Schema validation on every response ensures backward compatibility is never silently broken.',
    challenge:   'API changes were regularly breaking downstream consumers with no automated safety net catching regressions before production.',
    solution:    'Built a layered API client abstraction with automatic JWT token refresh, JSON Schema contract validation on every response, data-driven test generation from OpenAPI specs, and performance thresholds that fail the build if p95 latency degrades.',
    achievements:[
      'Caught 12 breaking API changes before reaching production in first 3 months',
      'Contract tests run in under 90 seconds across 200+ endpoints',
      'Performance baseline monitoring with automatic Slack alerts on degradation',
      'Data-driven: test matrix auto-generated from OpenAPI specification',
    ],
    github:      'https://github.com/danny-ambaou/api-automation',
  },
];

/* ──────────────────────────────────────────
   LOADING SCREEN
   ────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      // Trigger hero animations
      document.querySelectorAll('.hero-content .fade-up').forEach(el => {
        el.classList.add('visible');
      });
    }
  }, 1900);
});

/* ──────────────────────────────────────────
   SCROLL PROGRESS BAR
   ────────────────────────────────────────── */
function updateScrollProgress() {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = progress + '%';
}

/* ──────────────────────────────────────────
   NAVBAR – SCROLL BEHAVIOUR
   ────────────────────────────────────────── */
let lastScroll = 0;

function handleNavbar() {
  const navbar    = document.getElementById('navbar');
  const scrollTop = window.scrollY;

  if (!navbar) return;

  if (scrollTop > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollTop;
}

/* ──────────────────────────────────────────
   ACTIVE NAV LINK ON SCROLL
   ────────────────────────────────────────── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current    = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ──────────────────────────────────────────
   MOBILE HAMBURGER
   ────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ──────────────────────────────────────────
   PARTICLE CANVAS
   ────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');

  let particles = [];
  const COUNT   = 80;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.5 + 0.3,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', init);
})();

/* ──────────────────────────────────────────
   TYPING ANIMATION
   ────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Python | Playwright | Selenium',
    'Appium | Mobile Automation',
    'REST API | Pytest | Jenkins',
    'AI-Powered Test Automation',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let pause      = false;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting && charIdx <= current.length) {
      el.textContent = current.substring(0, charIdx++);
      setTimeout(type, 70);
    } else if (!deleting && charIdx > current.length) {
      pause = true;
      setTimeout(() => { deleting = true; pause = false; type(); }, 2000);
    } else if (deleting && charIdx >= 0) {
      el.textContent = current.substring(0, charIdx--);
      setTimeout(type, 35);
    } else {
      deleting   = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      charIdx    = 0;
      setTimeout(type, 400);
    }
  }

  setTimeout(type, 2000); // Wait for loader
})();

/* ──────────────────────────────────────────
   INTERSECTION OBSERVER – REVEAL & SKILLS
   ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animate skill bars when they enter viewport
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

/* ──────────────────────────────────────────
   ANIMATED COUNTERS
   ────────────────────────────────────────── */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

/* Project cards now use thumbnail images — no hover video needed */

/* ──────────────────────────────────────────
   PROJECT MODAL
   ────────────────────────────────────────── */
const overlay    = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalVideo = document.getElementById('modalVideo');

function isExternalEmbed(url) {
  return url && (url.includes('youtube.com/embed') || url.includes('drive.google.com'));
}

function openModal(idx) {
  const p = PROJECTS[idx];
  if (!p || !overlay) return;

  // Populate text fields
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent  = p.desc;
  document.getElementById('modalChallenge').textContent = p.challenge;
  document.getElementById('modalSolution').textContent  = p.solution;

  const achList = document.getElementById('modalAchievements');
  achList.innerHTML = p.achievements.map(a => `<li>${a}</li>`).join('');

  const tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = p.tags.map(t => `<span class="ptag">${t}</span>`).join('');

  const githubBtn = document.getElementById('modalGithub');
  if (githubBtn) githubBtn.href = p.github;

  // Video section
  const videoWrapper = document.querySelector('.modal-video-wrapper');
  const customControls = document.querySelector('.custom-controls');

  // Remove any existing iframe
  const existingIframe = videoWrapper.querySelector('iframe.modal-iframe');
  if (existingIframe) existingIframe.remove();

  if (!p.video) {
    // No video — hide the entire video wrapper
    videoWrapper.style.display = 'none';
    if (customControls) customControls.style.display = 'none';
  } else if (isExternalEmbed(p.video)) {
    videoWrapper.style.display = '';
    modalVideo.style.display = 'none';
    if (customControls) customControls.style.display = 'none';

    const iframe = document.createElement('iframe');
    iframe.className       = 'modal-iframe';
    iframe.src             = p.video;
    iframe.allow           = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    videoWrapper.insertBefore(iframe, modalVideo);
  } else {
    videoWrapper.style.display = '';
    modalVideo.style.display = '';
    if (customControls) customControls.style.display = '';
    modalVideo.src = p.video;
    modalVideo.load();
    initVideoControls(modalVideo);
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.src = '';
  }
  // Remove iframe to stop external video playback
  const iframe = document.querySelector('.modal-iframe');
  if (iframe) iframe.remove();
  const videoWrapper = document.querySelector('.modal-video-wrapper');
  if (videoWrapper) videoWrapper.style.display = '';
  const customControls = document.querySelector('.custom-controls');
  if (customControls) customControls.style.display = '';
  if (modalVideo) modalVideo.style.display = '';
}

// Trigger buttons
document.querySelectorAll('.modal-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(parseInt(btn.dataset.project, 10));
  });
});

// Close
if (modalClose) modalClose.addEventListener('click', closeModal);
if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ──────────────────────────────────────────
   CUSTOM VIDEO PLAYER CONTROLS
   ────────────────────────────────────────── */
function initVideoControls(video) {
  const playBtn     = document.getElementById('playPauseBtn');
  const playIcon    = document.getElementById('playIcon');
  const pauseIcon   = document.getElementById('pauseIcon');
  const progressWrap= document.getElementById('progressWrapper');
  const progressFill= document.getElementById('progressFill');
  const progressThumb= document.getElementById('progressThumb');
  const timeDisplay = document.getElementById('timeDisplay');
  const muteBtn     = document.getElementById('muteBtn');
  const fullBtn     = document.getElementById('fullscreenBtn');

  if (!video || !playBtn) return;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function updateUI() {
    if (video.paused) {
      playIcon.style.display  = '';
      pauseIcon.style.display = 'none';
    } else {
      playIcon.style.display  = 'none';
      pauseIcon.style.display = '';
    }
    const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    progressFill.style.width  = pct + '%';
    progressThumb.style.left  = pct + '%';
    timeDisplay.textContent   =
      formatTime(video.currentTime) + ' / ' + formatTime(video.duration || 0);
  }

  playBtn.onclick = () => video.paused ? video.play() : video.pause();
  video.addEventListener('play',       updateUI);
  video.addEventListener('pause',      updateUI);
  video.addEventListener('timeupdate', updateUI);
  video.addEventListener('loadedmetadata', updateUI);

  // Progress bar scrubbing
  function scrub(e) {
    const rect = progressWrap.querySelector('.ctrl-bar').getBoundingClientRect();
    const x    = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct  = x / rect.width;
    video.currentTime = pct * (video.duration || 0);
  }

  let scrubbing = false;
  progressWrap.addEventListener('mousedown', (e) => { scrubbing = true; scrub(e); });
  document.addEventListener('mousemove',    (e) => { if (scrubbing) scrub(e); });
  document.addEventListener('mouseup',      ()  => { scrubbing = false; });

  // Mute
  if (muteBtn) {
    muteBtn.onclick = () => { video.muted = !video.muted; };
  }

  // Fullscreen
  if (fullBtn) {
    fullBtn.onclick = () => {
      const wrapper = video.closest('.modal-video-wrapper');
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        (wrapper || video).requestFullscreen().catch(() => {});
      }
    };
  }
}

/* ──────────────────────────────────────────
   CONTACT FORM
   ────────────────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const message = form.querySelector('#message');
    const status  = document.getElementById('formStatus');
    let valid     = true;

    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    if (!name.value.trim()) {
      document.getElementById('nameError').textContent = 'Name is required.';
      valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      document.getElementById('emailError').textContent = 'Valid email is required.';
      valid = false;
    }
    if (!message.value.trim()) {
      document.getElementById('messageError').textContent = 'Message is required.';
      valid = false;
    }

    if (!valid) return;

    const btn = document.getElementById('submitBtn');
    btn.disabled    = true;
    btn.textContent = 'Sending...';

    // Simulated send (replace with real backend/EmailJS/Formspree)
    setTimeout(() => {
      btn.disabled    = false;
      btn.innerHTML   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
      status.textContent = 'Thank you! I\'ll get back to you soon.';
      status.className   = 'form-note success';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
        status.textContent = '';
        status.className   = 'form-note';
      }, 4000);
    }, 1200);
  });
}

/* ──────────────────────────────────────────
   BACK TO TOP
   ────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

/* ──────────────────────────────────────────
   FOOTER YEAR
   ────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────
   SMOOTH SCROLL FOR ANCHOR LINKS
   ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight + 8;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ──────────────────────────────────────────
   SCROLL EVENT (consolidated)
   ────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  updateScrollProgress();
  handleNavbar();
  updateActiveNav();
  updateBackToTop();
}, { passive: true });

// Initial calls
updateScrollProgress();
handleNavbar();
updateActiveNav();
updateBackToTop();

/* ──────────────────────────────────────────
   DOWNLOAD RESUME PLACEHOLDER
   ────────────────────────────────────────── */
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    // Replace href with actual resume file path when ready
    // e.g. downloadBtn.href = 'assets/Danny_Ambaou_Resume.pdf';
    // For now just show alert
    e.preventDefault();
    alert('Resume download will be available soon.\nPlease contact me directly at dannyamb55@gmail.com');
  });
}
