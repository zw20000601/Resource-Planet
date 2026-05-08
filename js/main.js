// ===== NAVIGATION ACTIVE STATE =====
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const tabs = group.querySelectorAll('[data-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        const panelGroup = group.dataset.tabGroup;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll(`[data-panel-group="${panelGroup}"] [data-panel]`).forEach(panel => {
          panel.style.display = panel.dataset.panel === target ? 'block' : 'none';
        });
      });
    });
  });
}

// ===== LOGIN TABS =====
function initLoginTabs() {
  const tabs = document.querySelectorAll('.login-tab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.dataset.type;
      if (loginForm) loginForm.style.display = type === 'login' ? 'block' : 'none';
      if (registerForm) registerForm.style.display = type === 'register' ? 'block' : 'none';
    });
  });
}

// ===== RANKING TABS =====
function initRankingTabs() {
  document.querySelectorAll('.rank-period-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rank-period-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  document.querySelectorAll('.rank-cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rank-cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ===== COLLECTION TABS =====
function initCollTabs() {
  document.querySelectorAll('.coll-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.coll-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ===== FILTER PILLS =====
function initFilterPills() {
  document.querySelectorAll('.filter-pills').forEach(group => {
    group.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        group.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  });

  // Plaza filter pills
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    group.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        group.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  });
}

// ===== VIEW TOGGLE =====
function initViewToggle() {
  const viewBtns = document.querySelectorAll('.view-btn');
  const grid = document.querySelector('.resources-grid');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (grid) {
        if (btn.dataset.view === 'list') {
          grid.classList.remove('resources-grid-5');
          grid.classList.add('resources-grid-1');
          grid.style.gridTemplateColumns = '1fr';
        } else {
          grid.classList.add('resources-grid-5');
          grid.classList.remove('resources-grid-1');
          grid.style.gridTemplateColumns = '';
        }
      }
    });
  });
}

// ===== LIKE BUTTON =====
function initLikeButtons() {
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      if (btn.classList.contains('liked')) {
        btn.textContent = '♥';
        btn.style.background = '#F06868';
        btn.style.color = '#fff';
      } else {
        btn.textContent = '♡';
        btn.style.background = '#FFF0F0';
        btn.style.color = '#F06868';
      }
    });
  });
}

// ===== STICKY NAV SHADOW =====
function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
    }
  });
}

// ===== SEARCH BAR FOCUS =====
function initSearchFocus() {
  const searchInput = document.querySelector('.hero-search input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `plaza.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}

// ===== PASSWORD TOGGLE =====
function initPasswordToggle() {
  document.querySelectorAll('.pwd-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.form-input-wrap').querySelector('input');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.textContent = input.type === 'password' ? '👁' : '🙈';
      }
    });
  });
}

// ===== STAGGERED CARD ANIMATION =====
function initCardAnimations() {
  const cards = document.querySelectorAll('.resource-card, .coll-card, .topic-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
    card.classList.add('reveal');
  });
}

// ===== PLACEHOLDER SPARKLE =====
function createSparkles(container, count = 8) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = Math.random() * 10 + 5;
    s.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${Math.random() * 2 + 2}s;
    `;
    container.appendChild(s);
  }
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initScrollReveal();
  initTabs();
  initLoginTabs();
  initRankingTabs();
  initCollTabs();
  initFilterPills();
  initViewToggle();
  initLikeButtons();
  initNavScroll();
  initSearchFocus();
  initPasswordToggle();
  initCardAnimations();

  document.querySelectorAll('.hero-sparkles').forEach(c => createSparkles(c, 12));
});
