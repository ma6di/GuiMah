/* ==========================================================================
   GuiMah Studio — German UI
   The HTML ships English. This module holds only the German strings and
   swaps them in on demand; switching back restores the original DOM text
   from a snapshot taken on load, so English needs no dictionary.

   Markup contract:
     data-i18n="key"       -> textContent
     data-i18n-html="key"  -> innerHTML (headlines with <span class="italic">)
     data-i18n-ph="key"    -> placeholder
     data-i18n-aria="key"  -> aria-label
   ========================================================================== */

const de = {
  /* Meta */
  'meta.title': 'GuiMah Studio — Entwickler-Team aus Berlin',
  'meta.desc':
    'GuiMah Studio ist ein zweiköpfiges Entwickler-Team in Berlin. Wir bauen Web-Apps, mobile Produkte und KI-Workflows.',
  'meta.title.projects': 'Projekte — GuiMah Studio',
  'meta.desc.projects':
    'Alle Projekte von GuiMah Studio — eine veröffentlichte App-Store-Anwendung, Echtzeit-Plattformen, Web-Apps und hardwarenahe Systemprojekte in C und C++.',

  /* Chrome */
  'skip': 'Zum Inhalt springen',
  'nav.menu': 'Menü öffnen und schließen',
  'nav.about': 'Über uns',
  'nav.work': 'Arbeiten',
  'nav.services': 'Leistungen',
  'nav.projects': 'Projekte',
  'nav.cta': 'Projekt starten',
  'lang.label': 'Sprache wählen',

  /* Hero */
  'hero.eyebrow': 'Berlin — Verfügbar ab Q3',
  'hero.l1': 'Zwei Entwickler.',
  'hero.l2': 'Ein Team.',
  'hero.l3': 'Fertige Software.',
  'hero.lede':
    'GuiMah Studio, das sind Guilherme und Mahdi — ein freiberufliches Entwickler-Team in Berlin für Web-Apps, mobile Produkte und KI-Workflows. Die zwei Personen im Gespräch sind die zwei Personen, die den Code schreiben.',
  'hero.work': 'Unsere Arbeiten',

  /* About */
  'about.eyebrow': '01 — Über uns',
  'about.h2':
    'Bei GuiMah entwickeln wir jedes Projekt <span class="italic">gemeinsam</span>, von Anfang bis Ende — ein Team, ein Ansprechpartner, vom ersten Gespräch bis zum Launch.',
  'about.role': 'Entwickler — Berlin',
  'about.gui': 'Umweltingenieur, heute Entwickler. Ausgebildet bei IronHack und TechLabs.',
  'about.mahdi': 'Bauingenieur, heute Entwickler. Informatik an der 42 Berlin.',
  'about.stack': 'Womit GuiMah arbeitet',

  /* Work */
  'work.eyebrow': '02 — Arbeiten',
  'work.h2':
    'Einige Projekte von GuiMah. Eines davon ist live im <span class="italic">App Store</span>.',
  'work.flewi':
    'Sprachlernplattform — entworfen, entwickelt und im Apple App Store veröffentlicht.',
  'work.flewi.link': 'Im App Store ansehen',
  'work.apple':
    'Apples Produktseite nachgebaut — mit scroll-gesteuerter GSAP-Animation und 3D-Modell-Viewer.',
  'work.ft':
    'Echtzeit-Multiplayer-Plattform mit Authentifizierung, Monitoring und skalierbaren Backend-Services.',
  'work.vmp':
    'Full-Stack-App für personalisierte Ernährungspläne, mit Bildverwaltung und Benutzerkonten.',
  'work.all': 'Alle Projekte',

  /* Services */
  'srv.eyebrow': '03 — Leistungen',
  'srv.h2':
    'Ein Briefing an GuiMah — und der <span class="italic">komplette Stack</span> ist abgedeckt, von vorne bis hinten, aus einem Team.',
  'srv.1.h': 'Web-Anwendungen',
  'srv.1.p':
    'Echte Produkte, keine Broschüren. Richtige Authentifizierung, richtige Daten, Frontends, die echten Nutzern standhalten.',
  'srv.2.h': 'Mobile Produkte',
  'srv.2.p':
    'React-Native-Apps — von der Entwicklung über das App-Store-Review bis zum Release.',
  'srv.3.h': 'KI & Automatisierung',
  'srv.3.p':
    'Agenten und LLM-Features in echten Produkten — mit Fallbacks, damit nichts hart ausfällt.',
  'srv.4.h': 'Backend & APIs',
  'srv.4.p':
    'APIs, Schema-Design, Caching, containerisierte Deployments. Unaufgeregt, dokumentiert und in einem Jahr noch lesbar.',

  /* Contact */
  'con.eyebrow': '04 — Kontakt',
  'con.h2': 'Erzählen Sie GuiMah, was Sie <span class="italic">bauen möchten</span>.',
  'con.avail.k': 'Verfügbarkeit',
  'con.avail.v': 'Projekte für Q3 möglich',
  'con.email.k': 'E-Mail',
  'con.where.k': 'Standort',
  'con.where.v': 'Berlin, Deutschland — MEZ',
  'con.where.note': 'Remote möglich.',
  'con.name': 'Ihr Name',
  'con.name.ph': 'Jana Müller',
  'con.mail': 'E-Mail',
  'con.mail.ph': 'jana@firma.de',
  'con.msg': 'Was möchten Sie bauen?',
  'con.msg.ph': 'Eine grobe Idee genügt für den Anfang.',
  'con.send': 'Anfrage senden',
  'con.note':
    'Öffnet Ihr E-Mail-Programm mit den ausgefüllten Angaben — es wird nichts gesendet, bis Sie auf Senden klicken.',

  /* Footer */
  'foot.where': 'Berlin, Deutschland — MEZ',

  /* Projects page */
  'pj.eyebrow': 'Projekte',
  'pj.l1': 'Alles, was wir',
  'pj.l2': 'gebaut haben.',
  'pj.lede':
    'Die vollständige Liste — Kundenprojekte, eigene Produkte und die hardwarenahen Systemprojekte, an denen GuiMah Studio gelernt hat, wie die Maschine wirklich arbeitet. Eines davon ist gerade live im App Store.',
  'pj.1.eyebrow': '01 — Veröffentlicht & live',
  'pj.1.h2':
    'Entworfen, entwickelt und durch das Apple-Review gebracht — <span class="italic">von Anfang bis Ende</span>.',
  'pj.flewi.lede':
    'Eine Sprachlernplattform, live im Apple App Store — entworfen, entwickelt und veröffentlicht.',
  'pj.flewi.body':
    'Der komplette Produktzyklus in einem Projekt: Mobile-Client, API-Design, relationale Datenmodellierung, Caching und die unspektakuläre letzte Meile aus App-Store-Einreichung, Review und Release. Die App ist öffentlich — Sie können sie herunterladen.',
  'pj.flewi.link': 'Im App Store ansehen',
  'pj.2.eyebrow': '02 — Web & Produkt',
  'pj.2.h2': 'Full-Stack-Anwendungen und Frontend-Projekte.',
  'pj.apple':
    'Apples Produktseite nachgebaut — scroll-gesteuerte GSAP-Timelines, Video-Sequencing und ein Layout, das in jeder Breite hält.',
  'pj.brainwave':
    'Eine moderne SaaS-Landingpage mit Parallax-Tiefe und mehrschichtiger Animation — ein Marketing-Frontend, das teuer aussehen und schnell laden muss.',
  'pj.vmp':
    'Full-Stack-Anwendung für personalisierte Ernährungspläne — Benutzerkonten, Rezeptdaten und Bildverwaltung über Cloudinary, auf einem Kern aus Node und MongoDB.',
  'pj.iron':
    'Eine Plattform, auf der Studierende ihre Projekte veröffentlichen und durchsuchen — serverseitig gerendert mit Handlebars auf einem Node- und MongoDB-Stack.',
  'pj.ft':
    'Echtzeit-Multiplayer-Plattform mit Authentifizierung, Monitoring, Observability und skalierbaren Backend-Services — durchgehend containerisiert.',
  'pj.run':
    'Ein Jump-’n’-Run im Mario-Stil über drei Level, gebaut mit der Canvas-API in reinem JavaScript — Kollision, Sprites und Game-Loop von Grund auf.',
  'pj.3.eyebrow': '03 — Systeme & Hardwarenahes',
  'pj.3.h2':
    'Die unspektakuläre Arbeit, die den Rest erst <span class="italic">verständlich macht</span>.',
  'pj.webserv':
    'Ein nicht-blockierender HTTP-Server in C++ mit CGI, Uploads, Routing, parallelen Verbindungen und eigener Konfiguration.',
  'pj.minishell':
    'Eine Unix-Shell nach dem Vorbild von Bash — Lexing, Parsing, Pipes, Umleitungen und eingebaute Befehle, komplett in C geschrieben.',
  'pj.cub3d':
    'Ein von Wolfenstein inspirierter Raycasting-Shooter mit Gegner-KI, Minimap und texturierten Umgebungen — Rendering-Mathematik, keine Engine.',
  'pj.philo':
    'Das Philosophenproblem der Nebenläufigkeit, gelöst mit Threads und Mutexes — Deadlock, Starvation und Timing unter Last.',
  'pj.systems.note':
    'Systemprojekte, entstanden an der 42 Berlin. Quellcode auf <a href="https://github.com/ma6di" target="_blank" rel="noopener" style="border-bottom: 1px solid var(--rule);">GitHub ↗</a>.',
  'pj.cta.eyebrow': 'Ihr Projekt als Nächstes',
  'pj.cta.h2': 'Soll GuiMah <span class="italic">Ihres</span> bauen?',
  'pj.cta.p':
    'Erzählen Sie uns, was Sie bauen. Wir sagen Ihnen ehrlich, ob wir das richtige Team dafür sind — und wenn nicht, sagen wir das auch.',
};

const STORE = 'guimah-lang';
const snapshot = new Map();

/** Remember the English the page shipped with, so switching back needs no dictionary. */
function snap(el, kind) {
  const key = `${kind}`;
  if (!snapshot.has(el)) snapshot.set(el, {});
  const store = snapshot.get(el);
  if (!(key in store)) {
    store[key] =
      kind === 'html' ? el.innerHTML
      : kind === 'ph' ? el.getAttribute('placeholder')
      : kind === 'aria' ? el.getAttribute('aria-label')
      : el.textContent;
  }
  return store[key];
}

function apply(lang) {
  const dict = lang === 'de' ? de : null;
  const pick = (key, fallback) => (dict && dict[key] !== undefined ? dict[key] : fallback);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = pick(el.dataset.i18n, snap(el, 'text'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = pick(el.dataset.i18nHtml, snap(el, 'html'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    el.setAttribute('placeholder', pick(el.dataset.i18nPh, snap(el, 'ph')));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', pick(el.dataset.i18nAria, snap(el, 'aria')));
  });

  // Title and description live in <head>, so they need handling by hand.
  const titleKey = document.body.dataset.titleKey;
  const descKey = document.body.dataset.descKey;
  const titleEl = document.querySelector('title');
  const descEl = document.querySelector('meta[name="description"]');
  if (titleEl && titleKey) {
    if (!snapshot.has(titleEl)) snapshot.set(titleEl, { text: titleEl.textContent });
    titleEl.textContent = pick(titleKey, snapshot.get(titleEl).text);
  }
  if (descEl && descKey) {
    if (!snapshot.has(descEl)) snapshot.set(descEl, { text: descEl.getAttribute('content') });
    descEl.setAttribute('content', pick(descKey, snapshot.get(descEl).text));
  }

  // Screen readers and Google both rely on this being accurate.
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });

  try { localStorage.setItem(STORE, lang); } catch { /* private mode */ }
}

function initialLang() {
  try {
    const saved = localStorage.getItem(STORE);
    if (saved === 'de' || saved === 'en') return saved;
  } catch { /* private mode */ }
  return navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
}

export function initI18n() {
  apply(initialLang());

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => apply(btn.dataset.lang));
  });
}
