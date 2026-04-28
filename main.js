/* ============================================================
   TwinIsle Digital — main.js
   ============================================================ */

// ── Custom cursor (desktop only) ──────────────────────────────
const isTouchDevice = window.matchMedia('(hover: none)').matches;
if (!isTouchDevice) {
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let ringX = 0, ringY = 0, curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    curX = e.clientX; curY = e.clientY;
    cursor.style.left = curX - 5 + 'px';
    cursor.style.top  = curY - 5 + 'px';
  });

  function animateRing() {
    ringX += (curX - ringX) * 0.12;
    ringY += (curY - ringY) * 0.12;
    cursorRing.style.left = ringX - 18 + 'px';
    cursorRing.style.top  = ringY - 18 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      cursorRing.style.transform = 'scale(1.4)';
      cursorRing.style.borderColor = 'rgba(212,175,55,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorRing.style.transform = 'scale(1)';
      cursorRing.style.borderColor = 'rgba(212,175,55,0.5)';
    });
  });
}

// ── Mobile nav toggle ─────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ── Nav scroll effect ─────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── Smooth scroll with offset ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Animated time counter in hero float card ──────────────────
const timeSaved = document.getElementById('timeSaved');
if (timeSaved) {
  const values = ['4.2h', '4.7h', '5.1h', '3.8h', '5.4h', '4.9h'];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % values.length;
    timeSaved.style.opacity = '0';
    timeSaved.style.transform = 'translateY(4px)';
    setTimeout(() => {
      timeSaved.textContent = values[idx];
      timeSaved.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      timeSaved.style.opacity = '1';
      timeSaved.style.transform = 'translateY(0)';
    }, 300);
  }, 3000);
}

// ── Animated grid orb follow mouse ───────────────────────────
const orb1 = document.querySelector('.orb-1');
if (orb1 && !isTouchDevice) {
  let orbX = 0, orbY = 0;
  document.addEventListener('mousemove', e => {
    const tx = (e.clientX / window.innerWidth - 0.5) * 40;
    const ty = (e.clientY / window.innerHeight - 0.5) * 40;
    orbX += (tx - orbX) * 0.04;
    orbY += (ty - orbY) * 0.04;
  });

  function moveOrb() {
    if (orb1) {
      orb1.style.transform = `translate(${orbX}px, ${orbY}px)`;
    }
    requestAnimationFrame(moveOrb);
  }
  moveOrb();
}

// ── Service cards subtle tilt on hover ────────────────────────
if (!isTouchDevice) {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Problem cards stagger entrance ───────────────────────────
const problemCards = document.querySelectorAll('.problem-card');
if ('IntersectionObserver' in window) {
  const probObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        probObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  problemCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    probObserver.observe(card);
  });
}

// ── Marquee pause on hover ────────────────────────────────────
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}
