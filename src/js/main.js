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
        const href = link.getAttribute('href') || '';
        // Only spy on in-page anchors that exist in the current document.
        // This prevents selectors like `index.html#about` (used on other pages)
        // from interfering with nav highlighting.
        if (!href.startsWith('#')) return null;

        try {
          const el = document.querySelector(href);
          return el ? { link, el } : null;
        } catch {
          return null;
        }
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

  /* ---------- Contact form (Formspree) ----------
     Note: client-side validation is UX, not security. A determined attacker
     bypasses the browser entirely and POSTs to Formspree directly — Formspree
     handles honeypot + spam filtering server-side. Our job here is:
       1. Reject obvious garbage before it hits the network (empty, bad email).
       2. Strip control chars (zero-width, RTL overrides) that let a paste hide
          content.
       3. Show inline errors in the visitor's language, not the browser default.
       4. Cap length so the form can't be used as a paste-and-run channel. */
  const form = document.querySelector('[data-form]');
  if (form) {
    const endpoint = form.getAttribute('action');
    const btn = form.querySelector('button[type="submit"]');
    const label = btn?.querySelector('.btn-label');
    const status = form.querySelector('[data-form-status]');

    // Localised, inline validation messages. Kept here rather than in i18n.js
    // because they're tightly coupled to the field spec (min/maxlength).
    const V = {
      en: {
        required: 'Please fill this in.',
        short:    'A little more, please.',
        long:     'That\'s too long — please shorten it.',
        email:    'Please enter a valid email address.',
      },
      de: {
        required: 'Bitte ausfüllen.',
        short:    'Bitte etwas ausführlicher.',
        long:     'Das ist zu lang — bitte kürzen.',
        email:    'Bitte eine gültige E-Mail-Adresse eingeben.',
      },
    };
    const t = () => V[document.documentElement.lang === 'de' ? 'de' : 'en'];

    // Control-char / zero-width scrub. Preserves normal whitespace, kills the
    // stuff people paste from Word or use to hide payloads (BOM, RLO, ZWSP, …).
    const scrub = (s) =>
      String(s)
        .replace(/[ --]/g, '') // control
        .replace(/[​-‏‪-‮⁠-⁯﻿]/g, '') // bidi / zero-width
        .replace(/\r\n?/g, '\n')
        .trim();

    const showError = (name, msg) => {
      const el = form.querySelector(`[data-error="${name}"]`);
      if (!el) return;
      if (msg) { el.textContent = msg; el.hidden = false; }
      else     { el.textContent = ''; el.hidden = true; }
    };

    const validateField = (input) => {
      const name = input.name;
      const msg = t();
      // scrub before measuring so pure-whitespace / zero-width payloads count as empty
      input.value = scrub(input.value);
      const v = input.value;

      if (!v) return input.required ? msg.required : null;
      if (input.maxLength > 0 && v.length > input.maxLength) return msg.long;
      if (input.minLength > 0 && v.length < input.minLength) return msg.short;
      if (input.type === 'email' && !input.checkValidity()) return msg.email;
      return null;
    };

    // Live character counter for the message field.
    const msg = form.querySelector('#message');
    const count = form.querySelector('[data-count-current]');
    if (msg && count) {
      const tick = () => { count.textContent = String(msg.value.length); };
      msg.addEventListener('input', tick);
      tick();
    }

    // Blur-time validation feels less naggy than input-time.
    form.querySelectorAll('input[name], textarea[name]').forEach((el) => {
      if (el.name === '_gotcha') return;
      el.addEventListener('blur', () => showError(el.name, validateField(el)));
      el.addEventListener('input', () => {
        if (!el.nextElementSibling?.hidden) showError(el.name, validateField(el));
      });
    });

    // Re-render any visible errors after a language switch — otherwise a German
    // visitor sees English error copy until they touch the field again.
    document.querySelectorAll('[data-lang]').forEach((langBtn) => {
      langBtn.addEventListener('click', () => {
        requestAnimationFrame(() => {
          form.querySelectorAll('.field-error:not([hidden])').forEach((errEl) => {
            const name = errEl.dataset.error;
            const field = form.querySelector(`[name="${name}"]`);
            if (field) showError(name, validateField(field));
          });
        });
      });
    });

    // Snapshot the idle button label so we can restore after submit (i18n may have swapped it).
    if (label) label.dataset.idle = label.textContent;

    // Keep the snapshot in sync when the language switcher runs.
    document.querySelectorAll('[data-lang]').forEach((langBtn) => {
      langBtn.addEventListener('click', () => {
        requestAnimationFrame(() => {
          if (label && !btn.disabled) label.dataset.idle = label.textContent;
        });
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!endpoint || btn?.disabled) return;

      // Validate every field ourselves, so error messages appear inline and in
      // the visitor's language rather than as the browser's default popup.
      let firstBad = null;
      form.querySelectorAll('input[name], textarea[name]').forEach((el) => {
        if (el.name === '_gotcha') return;
        const err = validateField(el);
        showError(el.name, err);
        if (err && !firstBad) firstBad = el;
      });
      if (firstBad) { firstBad.focus(); return; }

      const de = document.documentElement.lang === 'de';
      const idle = label?.dataset.idle || label?.textContent || 'Send enquiry';
      const sending = de ? 'Wird gesendet…' : 'Sending…';
      const ok = de
        ? 'Danke — wir melden uns innerhalb eines Werktags.'
        : 'Thanks — we\'ll get back to you within one business day.';
      const err = de
        ? 'Etwas ist schiefgelaufen. Schreiben Sie uns an hello@guimah.studio.'
        : 'Something went wrong. Email us at hello@guimah.studio.';

      if (label) label.textContent = sending;
      if (btn) btn.disabled = true;
      if (status) status.textContent = '';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`Formspree ${res.status}`);

        form.reset();
        if (status) status.textContent = ok;
        if (label) label.textContent = de ? 'Gesendet' : 'Sent';
        setTimeout(() => {
          if (label) {
            label.textContent = label.dataset.idle || idle;
            label.dataset.idle = label.textContent;
          }
          if (btn) btn.disabled = false;
        }, 2800);
      } catch {
        if (status) status.textContent = err;
        if (label) label.textContent = idle;
        if (btn) btn.disabled = false;
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
