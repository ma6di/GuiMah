# GuiMah Studio

Marketing site for GuiMah Studio — Guilherme Mazzolini + Mahdi Cheraghali, a two-person
engineering team in Berlin.

Single-page static site built with Vite. Vanilla HTML, CSS, and JS — no framework.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173, opens automatically
```

Edits to HTML, CSS, or JS hot-reload in the browser.

```bash
npm run build    # -> dist/
npm run preview  # serve the built site locally to check it before deploying
```

## Deploy

`npm run build`, then publish `dist/`.

- **Netlify** — build command `npm run build`, publish directory `dist`
- **Vercel** — detected automatically
- **GitHub Pages** — push `dist/` to your Pages branch

`base: './'` in `vite.config.js` keeps asset paths relative, so the build also works
from a subpath like `user.github.io/repo` rather than only at a domain root.

### Self-host with Docker + Caddy (HTTPS)

For a VPS deploy on your own domain, everything you need is here:

```bash
cp .env.example .env             # set SITE_ADDRESS=guimah.studio
docker compose up -d --build
```

- **Two-stage image** — Node 20 builds the site, then Caddy 2 (Alpine) serves the
  `dist/`. Runtime image is ~95 MB and carries no Node.
- **Automatic HTTPS** — Caddy provisions a Let's Encrypt cert the first time the
  container comes up with a public hostname pointing at it. The `caddy_data` volume
  persists the account key + certs across restarts — **don't skip it**, or you'll hit
  the ACME rate limit on redeploys (5 duplicate certs per week).
- **Security headers** — HSTS (1 year + preload), CSP scoped to same-origin +
  Formspree, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options.
  Fonts are self-hosted (no Google Fonts). All configured in `Caddyfile`.
- **Caching** — `/assets/*` (Vite's hashed bundles) cached one year immutable;
  HTML always revalidates so new deploys reach visitors immediately.
- **HTTP/3** — port 443/UDP is exposed in `docker-compose.yml`.

Local dev-only run with a self-signed cert (Caddy's internal CA):

```bash
docker compose up --build     # SITE_ADDRESS defaults to localhost
# https://localhost/  — browser will warn once, then trust it
```

Update `guimahstudio@gmail.com` in `Caddyfile` if you switch the domain — Let's Encrypt
uses that address to warn about expiring accounts.

## Structure

```
index.html          Landing page — one page, anchored sections:
                    #top, #about, #work, #services, #contact
projects.html       The full project list — everything, in three groups
src/css/style.css   All styles — design tokens live at the top under :root
src/js/main.js      Entry: imports the CSS, then scroll reveals, scroll spy,
                    nav, mobile menu, form handling
public/assets/img/  Photos and project screenshots (copied to dist as-is)
design-refs/        Original design inspiration images — not part of the site
vite.config.js      Build config — both pages are registered here
```

Both pages are registered under `build.rollupOptions.input` in `vite.config.js`. Adding
another page means creating the `.html` file **and** adding it there — Vite is
single-page by default and will silently skip anything unregistered.

The landing page shows four selected projects and links to `projects.html` for the rest.
Nav links on `projects.html` point back with `index.html#section`.

### Keeping it short

The landing page is deliberately lean — about 5–6 screens. An earlier version carried
every section from a five-page site (timeline, stats, process, engagement models, FAQ)
and ran to 16 screens, which buried the things that actually matter: who you are, what
you've shipped, and how to make contact.

If you add a section, consider what comes out. Depth belongs on `projects.html` or
behind the portfolio links — not on the landing page.

### Brand mark

Two SVGs in `public/assets/img/` — reuse anywhere you need the logo outside the site:

- `logo-mark.svg` — the standalone monogram tile (favicon, app icon, avatars).
- `logo-wordmark.svg` — tile + wordmark, for headers, decks, and email signatures.

The `.brand-mark` in the nav (`<span class="brand-mark">GM</span>`) is CSS-only — it
avoids an extra network round-trip and stays crisp on retina. The favicon is inlined
as a data URI in each page's `<head>`, so there's no separate .ico to keep in sync.

### Form input guards

The contact form's client-side validation is **UX, not security** — a determined
attacker skips the form entirely and POSTs to Formspree. What we do handle here:

- `maxlength` + `pattern` on inputs — the browser blocks over-typing and rejects
  malformed emails without JS.
- Character counter on the message field.
- Blur-time validation with inline errors, localised for EN/DE.
- **Zero-width and bidi override scrubbing** — pastes containing `​` (ZWSP),
  `‮` (RLO), etc. get cleaned before submit, so no one can hide payloads inside a
  visible name.
- Submit-time re-validation catches JS-set values that bypass `maxlength`.

The heavy lifting lives at Formspree's end — spam filtering, honeypot, reCAPTCHA —
and the `_gotcha` honeypot field is still in the HTML for their bot detector.

### German UI

The site ships **English in the HTML**; German lives in `src/js/i18n.js` and swaps in at
runtime. Switching back to English restores the original DOM text from a snapshot taken
on load — so English needs no dictionary and can't drift out of sync with the markup.

- **First visit** follows the browser language (`de-*` → German), then the choice is
  remembered in `localStorage` and persists across both pages.
- The EN/DE switcher lives in the **header bar, not inside `.nav-links`** — that panel is
  translated off-screen on mobile, which would hide the switcher behind the burger menu.
- `document.documentElement.lang` updates on switch, which screen readers and Google both
  depend on.

To translate a new string, tag the element and add the key to the `de` object:

| Attribute | Swaps | Use for |
|---|---|---|
| `data-i18n="key"` | `textContent` | plain text |
| `data-i18n-html="key"` | `innerHTML` | text containing `<span class="italic">` or links |
| `data-i18n-ph="key"` | `placeholder` | form inputs |
| `data-i18n-aria="key"` | `aria-label` | icon buttons |

`<title>` and the meta description are driven by `data-title-key` / `data-desc-key` on
`<body>`.

**German runs ~30% longer than English.** `:lang(de) .display` caps the hero type — at the
full English size "Zwei Entwickler." wraps, which breaks the line-by-line mask animation
and pushes the CTAs below the fold. Check both languages after any type-scale change.

### Voice

The copy names GuiMah rather than "we" alone ("At GuiMah we build every project
together", "Brief GuiMah once"), and frames the studio as **one team** — no per-person
role labels, no split tech stacks, no individual project bylines. The shared stack under
the bios is deliberately one list.

The page loads a single module entry (`<script type="module" src="/src/js/main.js">`),
which imports the stylesheet. That's what enables hot reload — don't add a raw
`<link rel="stylesheet">` back in, since a `src/` path wouldn't survive the build.

### Adding a section

1. Give the `<section>` an `id` and add it to the nav with `href="#your-id"` and a
   `data-spy` attribute.
2. `[id] { scroll-margin-top: 5.5rem; }` already offsets anchor jumps so headings clear
   the fixed nav — no per-section work needed.

Every nav link that points at a section needs `data-spy`, **including the "Start a
project" CTA**. The scroll spy highlights the last link whose section has passed the
scroll line; if a link is missing from that list, its section can never become active and
the previous one stays lit while you read it.

## Adding Guilherme's photo

The site shows a styled "G" monogram card in place of a photo, because LinkedIn photos
can't be downloaded programmatically. To swap in a real one:

1. Save the photo to `public/assets/img/gui.jpg` (portrait, ~800px on the short edge).
2. In `index.html`, find the two monogram blocks (one in the hero collage, one in the
   About section):

```html
<div class="person-media monogram">
  <span class="mg-letter">G</span>
</div>
```

3. Replace each with:

```html
<div class="person-media">
  <img src="assets/img/gui.jpg" alt="Guilherme Mazzolini" loading="lazy">
</div>
```

The hero collage version uses `<figure class="frame short monogram">` — same swap, but
keep the `frame short` classes and leave the `<figcaption>` in place.

## Notes

- **Contact form** posts to Formspree (`https://formspree.io/f/xojgdzzn`) via `fetch`.
  The endpoint lives on the `<form action>` in `index.html`; success/error copy is handled
  in `src/js/main.js`. Confirm your domain in the Formspree dashboard before going live.
- Update `guimahstudio@gmail.com` in `index.html` (and Formspree notification settings) if
  you register a different domain.
- Animations are gated behind a `.js` class on `<html>` and respect
  `prefers-reduced-motion`. Without JS the page renders as a plain readable document.
