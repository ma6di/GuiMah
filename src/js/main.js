/* ==========================================================================
   GuiMah Studio — interactions
   Motion is progressive enhancement: everything is visible without JS,
   and all of it yields to prefers-reduced-motion.
   ========================================================================== */

import '../css/style.css';
import { initI18n } from './i18n.js';

(() => {
  'use strict';

  // Before anything measures or animates, so the page never flashes English
  // at a German visitor.
  initI18n();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveal ---------- */
  const revealables = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealables.forEach((el) => {
      // Stagger children of a group so rows cascade rather than pop together.
      const group = el.closest('[data-stagger]');
      if (group) {
        const sibs = [...group.querySelectorAll('[data-reveal]')];
        el.style.setProperty('--delay', `${sibs.indexOf(el) * 80}ms`);
      }
      io.observe(el);
    });
  }

  /* ---------- Headline: reveal on load, not on scroll ----------
     Covers the home hero and the projects page header. Anything above the fold
     must animate immediately — an observer would never fire for it, leaving the
     masked lines translated permanently out of view (an invisible H1). */
  const heroMasks = document.querySelectorAll('.hero .line-mask, .page-head .line-mask');
  heroMasks.forEach((mask, i) => {
    mask.style.setProperty('--delay', `${120 + i * 110}ms`);
    if (reduced) { mask.classList.add('in'); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => mask.classList.add('in')));
  });

  /* ---------- Nav: background once scrolled ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        nav.classList.toggle('is-stuck', window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll spy ----------
     Marks the nav link for whichever section currently owns the viewport.
     Uses scroll position rather than IntersectionObserver so that exactly one
     link is ever active — overlapping observer callbacks can light up two. */
  const spyLinks = [...document.querySelectorAll('[data-spy]')];
  if (spyLinks.length) {
    const sections = spyLinks
      .map((link) => {
        const el = document.querySelector(link.getAttribute('href'));
        return el ? { link, el } : null;
      })
      .filter(Boolean);

    let spying = false;
    const spy = () => {
      if (spying) return;
      spying = true;
      requestAnimationFrame(() => {
        // Offset by the nav height so a section counts as active once it
        // reaches the point where a reader would actually be looking at it.
        const line = window.scrollY + window.innerHeight * 0.28;
        let current = sections[0];

        for (const s of sections) {
          if (s.el.offsetTop <= line) current = s;
        }

        // At the very bottom the last section may be too short to ever cross
        // the line — force it so Contact can be reached.
        const atEnd = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
        if (atEnd) current = sections[sections.length - 1];

        sections.forEach(({ link }) => {
          link.toggleAttribute('data-active', link === current.link);
        });
        spying = false;
      });
    };
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy, { passive: true });
    spy();
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    const setMenu = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      navLinks.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', () => {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });

    // A resize past the breakpoint leaves the panel stuck open otherwise.
    window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = 0.28;

      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 500);
      });
    });
  }

  /* ---------- Hero collage parallax ---------- */
  const parallaxItems = document.querySelectorAll('[data-parallax]');
  if (parallaxItems.length && !reduced) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxItems.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.05;
          el.style.transform = `translate3d(0, ${y * speed * -1}px, 0)`;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Contact form ---------- */
  const form = document.querySelector('[data-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const lines = [
        `Name:  ${data.get('name') || '—'}`,
        `Email: ${data.get('email') || '—'}`,
        '',
        data.get('message') || '',
      ];

      // No backend on a static host — hand off to the user's mail client
      // with everything pre-filled.
      const subject = `Project enquiry — ${data.get('name') || 'New enquiry'}`;
      const href =
        `mailto:hello@guimah.studio` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(lines.join('\n'))}`;

      window.location.href = href;

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.querySelector('.btn-label').textContent;
        btn.querySelector('.btn-label').textContent = 'Opening your mail app…';
        setTimeout(() => { btn.querySelector('.btn-label').textContent = original; }, 3200);
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
