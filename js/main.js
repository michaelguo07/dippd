/* ─── Mobile Nav Drawer Toggle ─────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobile-drawer');

if (hamburger && mobileDrawer) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile drawer when clicking a link inside it
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      mobileDrawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─── Scroll Reveal ─────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    if (!el.classList.contains('active')) revealObserver.observe(el);
  });
}

/* ─── Smooth Scroll with Offset ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 90;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});

/* ─── Clean URLs helper for live site ───────────────── */
if (window.location.protocol.startsWith('http')) {
  // 1. Strip index.html from URL path in the address bar if present
  if (window.location.pathname.endsWith('/index.html')) {
    const newPath = window.location.pathname.slice(0, -10) + window.location.search + window.location.hash;
    window.history.replaceState(null, '', newPath);
  }
  
  // 2. Clean up navbar/footer links on page load
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      if (href.startsWith('index.html#')) {
        link.setAttribute('href', href.replace('index.html#', '/#'));
      } else if (href === 'index.html') {
        link.setAttribute('href', '/');
      } else if (href === 'about.html') {
        link.setAttribute('href', '/about');
      } else if (href === 'reviews.html') {
        link.setAttribute('href', '/reviews');
      } else if (href === 'forms.html') {
        link.setAttribute('href', '/forms');
      }
    }
  });
}

/* ─── Infinite auto-rotating product lineup carousel ────── */
(function () {
  const wrapper = document.getElementById('product-wrapper');
  const rail    = document.getElementById('product-rail');
  if (!wrapper || !rail) return;

  // Clone all cards once so the strip is 2x wide (seamless loop)
  Array.from(rail.children).forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.remove('reveal');
    clone.classList.add('active');
    rail.appendChild(clone);
  });

  let pos        = 0;
  let halfWidth  = 0;
  let isDragging = false;
  let lastX      = 0;
  const SPEED    = 0.3; // Glide slightly slower for readability

  const resizeObserver = new ResizeObserver(() => {
    halfWidth = rail.scrollWidth / 2;
  });
  resizeObserver.observe(rail);

  function loop() {
    if (!isDragging) pos += SPEED;
    if (halfWidth > 0 && pos >= halfWidth) pos -= halfWidth;
    if (pos < 0) pos += halfWidth;
    rail.style.transform = `translateX(${-pos}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX      = e.pageX;
    wrapper.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    pos  -= (e.pageX - lastX);
    lastX = e.pageX;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging           = false;
    wrapper.style.cursor = 'grab';
  });
})();

/* ─── Infinite auto-rotating reviews carousel ───────────── */
(function () {
  const wrapper    = document.getElementById('reviews-wrapper');
  const reviewRail = document.getElementById('reviews-rail');
  if (!wrapper || !reviewRail) return;

  Array.from(reviewRail.children).forEach(card => {
    reviewRail.appendChild(card.cloneNode(true));
  });

  let pos         = 0;
  let halfWidth   = 0;
  let revDragging = false;
  let revLastX    = 0;
  const SPEED     = 0.5;

  const resizeObserver = new ResizeObserver(() => {
    halfWidth = reviewRail.scrollWidth / 2;
  });
  resizeObserver.observe(reviewRail);

  function loop() {
    if (!revDragging) pos += SPEED;
    if (halfWidth > 0 && pos >= halfWidth) pos -= halfWidth;
    if (pos < 0) pos += halfWidth;
    reviewRail.style.transform = `translateX(${-pos}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  wrapper.addEventListener('mousedown', (e) => {
    revDragging = true;
    revLastX    = e.pageX;
    wrapper.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!revDragging) return;
    pos     -= (e.pageX - revLastX);
    revLastX = e.pageX;
  });

  window.addEventListener('mouseup', () => {
    if (!revDragging) return;
    revDragging          = false;
    wrapper.style.cursor = 'grab';
  });
})();
