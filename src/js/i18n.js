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
  'meta.title': 'GuiMah Studio — Entwickler-Team — remote, Standort Berlin',
  'meta.desc':
    'GuiMah Studio ist ein remote arbeitendes Entwickler-Team mit Standort Berlin. Wir bauen Web-Apps, mobile Produkte und KI-Workflows.',
  'meta.title.projects': 'Projekte — GuiMah Studio',
  'meta.desc.projects':
    'Alle Projekte von GuiMah Studio — eine veröffentlichte App-Store-Anwendung, Kunden-Websites und Full-Stack-Webanwendungen.',
  'meta.title.flewi': 'Flewi — Case Study — GuiMah Studio',
  'meta.desc.flewi':
    'Flewi — eine live Spaced-Repetition-Lernplattform von GuiMah Studio. App Store, flewi.app, von Deutsch zu jeder Sprache und jedem Thema.',
  'meta.title.impressum': 'Impressum — GuiMah Studio',
  'meta.desc.impressum':
    'Impressum von GuiMah Studio — Guilherme Mazzolini und Mahdi Cheraghali, Berlin.',
  'meta.title.privacy': 'Datenschutz — GuiMah Studio',
  'meta.desc.privacy':
    'Datenschutzerklärung von GuiMah Studio — Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.',

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
  'hero.eyebrow': 'Remote — Standort Berlin',
  'hero.l1': 'Zwei Entwickler.',
  'hero.l2': 'Ein Team.',
  'hero.l3': 'Fertige Software.',
  'hero.lede':
    'GuiMah Studio, das sind Guilherme und Mahdi — ein freiberufliches Entwickler-Team mit Standort Berlin, remote für Web-Apps, mobile Produkte und KI-Workflows. Die zwei Personen im Gespräch sind die zwei Personen, die den Code schreiben.',
  'hero.work': 'Unsere Arbeiten',

  /* About */
  'about.eyebrow': '01 — Über uns',
  'about.h2':
    'Bei GuiMah entwickeln wir jedes Projekt <span class="italic">gemeinsam</span>, von Anfang bis Ende — ein Team, ein Ansprechpartner, vom ersten Gespräch bis zum Launch.',
  'about.role': 'Entwickler — Remote / Berlin',
  'about.gui':
    'Full-Stack-Entwickler mit Hintergrund in Umweltingenieurwesen — Studium bei IronHack und TechLabs.',
  'about.mahdi':
    'Full-Stack-Entwickler mit Hintergrund in Bauingenieurwesen — Informatikstudium an der 42 Berlin.',
  'about.stack': 'Womit GuiMah arbeitet',

  /* Work */
  'work.eyebrow': '02 — Arbeiten',
  'work.h2':
    'Einige Projekte von GuiMah. Eines davon ist live im <span class="italic">App Store</span>.',
  'work.flewi':
    'Sprachlernplattform — entworfen, entwickelt und im Apple App Store veröffentlicht.',
  'work.flewi.link': 'Im App Store ansehen',
  'work.flewi.case': 'Case Study lesen',
  'work.apple':
    'Apples Produktseite nachgebaut — mit scroll-gesteuerter GSAP-Animation und 3D-Modell-Viewer.',
  'work.ft':
    'Echtzeit-Multiplayer-Plattform mit Authentifizierung, Monitoring und skalierbaren Backend-Services.',
  'work.vmp':
    'Full-Stack-App für personalisierte Ernährungspläne, mit Bildverwaltung und Benutzerkonten.',
  'work.visit': 'Live ansehen',
  'work.sanches':
    'Live-Website einer Anwaltskanzlei in São Paulo — für echte Mandantenanfragen gebaut, nicht als Template.',
  'work.rafael':
    'Live-Portfolio für einen Fotografen & Filmemacher — Galerie, Video-Flow und ein Kontaktbereich, der funktioniert.',
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
  'con.email.k': 'E-Mail',
  'con.where.k': 'Standort',
  'con.where.v': 'Berlin, Deutschland (MEZ)',
  'con.where.note': 'Wir arbeiten remote mit Kunden in ganz Europa.',
  'con.name': 'Ihr Name',
  'con.name.ph': 'Jana Müller',
  'con.mail': 'E-Mail',
  'con.mail.ph': 'jana@firma.de',
  'con.msg': 'Was möchten Sie bauen?',
  'con.msg.ph': 'Eine grobe Idee genügt für den Anfang.',
  'con.send': 'Anfrage senden',
  'con.note':
    'Wir melden uns innerhalb eines Werktags.',

  /* Footer */
  'foot.where': 'Remote · Berlin, Deutschland',
  'foot.impressum': 'Impressum',
  'foot.privacy': 'Datenschutz',

  /* Impressum */
  'imp.eyebrow': 'Rechtliches',
  'imp.h1': 'Impressum',
  'imp.lede': 'Angaben gemäß § 5 TMG.',
  'imp.1.h': 'Anbieter',
  'imp.1.p':
    'GuiMah Studio<br>Guilherme Mazzolini &amp; Mahdi Cheraghali<br><span class="legal-todo">[Straße und Hausnummer]</span><br><span class="legal-todo">[PLZ]</span> Berlin<br>Deutschland',
  'imp.2.h': 'Kontakt',
  'imp.2.p':
    'E-Mail: <a href="mailto:hello@guimah.studio">hello@guimah.studio</a><br>Telefon: <a href="tel:+491744005625">(+49) 174 4005625</a>',
  'imp.3.h': 'Verantwortlich für den Inhalt',
  'imp.3.p':
    'Guilherme Mazzolini &amp; Mahdi Cheraghali<br>Anschrift wie oben',
  'imp.4.h': 'Umsatzsteuer-ID',
  'imp.4.p':
    'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br><span class="legal-todo">[USt-IdNr., falls vorhanden — sonst diesen Abschnitt entfernen]</span>',
  'imp.5.h': 'EU-Streitschlichtung',
  'imp.5.p':
    'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
  'imp.6.h': 'Haftung für Inhalte',
  'imp.6.p':
    'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.',
  'imp.7.h': 'Haftung für Links',
  'imp.7.p':
    'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
  'imp.note':
    'Bitte ersetzen Sie die hervorgehobenen Adress-Platzhalter vor der Veröffentlichung durch Ihre echte Berliner Straßenadresse. Siehe auch unsere <a href="datenschutz.html">Datenschutzerklärung</a>.',

  /* Privacy / Datenschutz */
  'priv.eyebrow': 'Rechtliches',
  'priv.h1': 'Datenschutzerklärung',
  'priv.lede':
    'Informationen zur Verarbeitung personenbezogener Daten beim Besuch dieser Website (Art. 13 DSGVO).',
  'priv.1.h': '1. Verantwortlicher',
  'priv.1.p':
    'GuiMah Studio<br>Guilherme Mazzolini &amp; Mahdi Cheraghali<br><span class="legal-todo">[Straße und Hausnummer]</span><br><span class="legal-todo">[PLZ]</span> Berlin, Deutschland<br>E-Mail: <a href="mailto:hello@guimah.studio">hello@guimah.studio</a><br>Telefon: <a href="tel:+491744005625">(+49) 174 4005625</a>',
  'priv.2.h': '2. Hosting',
  'priv.2.p':
    'Diese Website wird bei einem Hosting-Anbieter betrieben. Beim Aufruf der Seite verarbeitet der Anbieter automatisch Server-Logdaten (z. B. IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp), die technisch zur Auslieferung der Website erforderlich sind. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und funktionsfähigen Website).',
  'priv.3.h': '3. Kontaktformular',
  'priv.3.p':
    'Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht), um Ihre Anfrage zu bearbeiten. Das Formular wird über <a href="https://formspree.io/" target="_blank" rel="noopener">Formspree</a> (Formspree, Inc.) übermittelt, das als Auftragsverarbeiter die Nachricht an uns zustellt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) und/oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Anfragedaten speichern wir nur so lange, wie es zur Bearbeitung erforderlich ist, sofern keine längere gesetzliche Aufbewahrungspflicht besteht.',
  'priv.4.h': '4. Schriftarten',
  'priv.4.p':
    'Die auf dieser Website verwendeten Schriftarten (Instrument Serif, Inter, JetBrains Mono) werden auf unserem eigenen Server gehostet. Beim Laden der Seite stellt Ihr Browser keine Verbindung zu Google oder einem anderen Drittanbieter für Schriftarten her.',
  'priv.5.h': '5. Sprachauswahl',
  'priv.5.p':
    'Wir speichern Ihre Sprachauswahl (EN/DE) im Local Storage Ihres Browsers, damit die Einstellung über Besuche hinweg erhalten bleibt. Diese Daten verbleiben auf Ihrem Gerät und werden nicht an uns übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer nutzbaren zweisprachigen Oberfläche).',
  'priv.6.h': '6. Cookies &amp; Analyse',
  'priv.6.p':
    'Wir verwenden auf dieser Website keine Werbe-Cookies und keine Analyse-Tools (wie Google Analytics).',
  'priv.7.h': '7. Ihre Rechte',
  'priv.7.p':
    'Nach der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen eine Verarbeitung auf Grundlage berechtigter Interessen. Außerdem haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren — in Berlin z. B. bei der <a href="https://www.datenschutz-berlin.de/" target="_blank" rel="noopener">Berliner Beauftragten für Datenschutz und Informationsfreiheit</a>. Zur Ausübung Ihrer Rechte schreiben Sie uns an <a href="mailto:hello@guimah.studio">hello@guimah.studio</a>.',
  'priv.8.h': '8. Aktualisierungen',
  'priv.8.p':
    'Wir können diese Datenschutzerklärung anpassen, wenn sich unsere Website oder rechtliche Anforderungen ändern. Die aktuelle Fassung ist stets auf dieser Seite verfügbar.',
  'priv.note':
    'Bitte ersetzen Sie die Adress-Platzhalter vor der Veröffentlichung durch dieselbe Straßenadresse wie im <a href="impressum.html">Impressum</a>.',

  /* Projects page */
  'pj.eyebrow': 'Projekte',
  'pj.l1': 'Alles, was wir',
  'pj.l2': 'gebaut haben.',
  'pj.lede':
    'Die vollständige Liste — Kundenarbeiten, eigene Produkte und die Projekte, die wir von Anfang bis Ende umgesetzt haben. Eines davon ist gerade live im App Store.',
  'pj.1.eyebrow': '01 — Veröffentlicht & live',
  'pj.1.h2':
    'Entworfen, entwickelt und durch das Apple-Review gebracht — <span class="italic">von Anfang bis Ende</span>.',
  'pj.flewi.lede':
    'Eine Sprachlernplattform, live im Apple App Store — entworfen, entwickelt und veröffentlicht.',
  'pj.flewi.body':
    'Der komplette Produktzyklus in einem Projekt: Mobile-Client, API-Design, relationale Datenmodellierung, Caching und die unspektakuläre letzte Meile aus App-Store-Einreichung, Review und Release. Die App ist öffentlich — Sie können sie herunterladen.',
  'pj.flewi.link': 'Im App Store ansehen',
  'pj.flewi.case': 'Case Study lesen',
  'pj.2.eyebrow': '02 — Web & Produkt',
  'pj.2.h2': 'Full-Stack-Anwendungen und Frontend-Projekte.',
  'pj.apple':
    'Apples Produktseite nachgebaut — scroll-gesteuerte GSAP-Timelines, Video-Sequencing und ein Layout, das in jeder Breite hält.',
  'pj.brainwave':
    'Eine moderne SaaS-Landingpage mit Parallax-Tiefe und mehrschichtiger Animation — ein Marketing-Frontend, das teuer aussehen und schnell laden muss.',
  'pj.vmp':
    'Full-Stack-Anwendung für personalisierte Ernährungspläne — Benutzerkonten, Rezeptdaten und Bildverwaltung über Cloudinary, auf einem Kern aus Node und MongoDB.',
  'pj.visit': 'Live ansehen',
  'pj.sanches':
    'Live-Website einer Anwaltskanzlei in São Paulo — für echte Mandantenanfragen gebaut, nicht als Template.',
  'pj.rafael':
    'Live-Portfolio für einen Fotografen & Filmemacher — Galerie, Video-Flow und ein Kontaktbereich, der funktioniert.',
  'pj.gameaward':
    'Eine motion-starke Landingpage — scroll-gesteuerte Übergänge, responsive Choreografie und eine UI, die sich hochwertig anfühlt.',
  'pj.shop':
    'In Arbeit — ein E-Commerce-Projekt von Grund auf mit Next.js, mit Fokus auf sauberes UX und produktionsreife Architektur.',
  'pj.iron':
    'Eine Plattform, auf der Studierende ihre Projekte veröffentlichen und durchsuchen — serverseitig gerendert mit Handlebars auf einem Node- und MongoDB-Stack.',
  'pj.ft':
    'Echtzeit-Multiplayer-Plattform mit Authentifizierung, Monitoring, Observability und skalierbaren Backend-Services — durchgehend containerisiert.',
  'pj.run':
    'Ein Jump-’n’-Run im Mario-Stil über drei Level, gebaut mit der Canvas-API in reinem JavaScript — Kollision, Sprites und Game-Loop von Grund auf.',
  'pj.cta.eyebrow': 'Ihr Projekt als Nächstes',
  'pj.cta.h2': 'Soll GuiMah <span class="italic">Ihres</span> bauen?',
  'pj.cta.p':
    'Erzählen Sie uns, was Sie bauen. Wir sagen Ihnen ehrlich, ob wir das richtige Team dafür sind — und wenn nicht, sagen wir das auch.',

  /* Flewi case study */
  'cs.eyebrow': 'Case Study — Flewi',
  'cs.l2': 'Karten, die bleiben.',
  'cs.lede':
    'Live Spaced-Repetition-Plattform auf iOS, Android und im Web. Angefangen mit Deutsch — heute Spaces, Smart Add und Mehrsprachigkeit.',
  'cs.fact.role.k': 'Unsere Rolle',
  'cs.fact.role.v': 'Produkt, Design, Mobile, API, Infra',
  'cs.fact.status.k': 'Status',
  'cs.fact.status.v': 'Live — App Store & flewi.app',
  'cs.fact.platform.k': 'Plattformen',
  'cs.fact.platform.v': 'iOS, Android, PWA',
  'cs.fact.now.k': 'Als Nächstes',
  'cs.fact.now.v': 'Web-Parität · Flashcard Master',
  'cs.appstore': 'Im App Store ansehen',
  'cs.live': 'flewi.app öffnen',
  'cs.back': 'Alle Projekte',

  'cs.peek.k': 'Ein Blick auf das Kommende',
  'cs.peek.spaces': 'Spaces — DE, AR, IT, TR, FR',
  'cs.peek.plan': 'Heutiger Plan',
  'cs.peek.smart': 'Smart Add',
  'cs.peek.artikel': 'Artikel — le / la / les',
  'cs.peek.review': 'Review Session',

  'cs.1.eyebrow': '01 — Warum',
  'cs.1.h2': 'Ein Schmerz. Dann eine <span class="italic">Plattform</span>.',
  'cs.1.p1':
    'Deutsche Artikel und Pluralformen sind der Punkt, an dem Lernende aufgeben. Flewi startete dort — eigenes SRS, Artikel-Training, automatisch erfasste Karten — und wuchs zu Spaces und Mehrsprachigkeit, ohne den Kern neu zu bauen.',

  'cs.2.eyebrow': '02 — Die Lücke',
  'cs.2.h2': 'Anki-Tiefe. Native Feel. <span class="italic">Nichts dazwischen.</span>',
  'cs.2.anki': 'Ernsthaftes SRS. Brutale UX. Jede Karte von Hand.',
  'cs.2.duo': 'Gute Schleifen. Flache Tiefe. Keine echten eigenen Decks.',
  'cs.2.quizlet': 'Einfaches Teilen. Generische Karten. Kein Grammatik-Parsing.',

  'cs.3.eyebrow': '03 — Stack',
  'cs.3.h2': 'Selbst gehostet. <span class="italic">Bewusst unaufgeregt.</span>',
  'cs.3.fe.k': 'Web',
  'cs.3.fe.v': 'React · Vite · Tailwind · PWA',
  'cs.3.mob.k': 'Mobile',
  'cs.3.mob.v': 'Expo / React Native — Produkt-Wahrheit',
  'cs.3.be.k': 'Backend',
  'cs.3.be.v': 'FastAPI · PostgreSQL · Redis',
  'cs.3.infra.k': 'Infra',
  'cs.3.infra.v': 'Docker · Caddy · Hetzner',

  'cs.cta.eyebrow': 'Ihr Produkt als Nächstes',
  'cs.cta.h2': 'So weit bringen wir <span class="italic">Ihres auch.</span>',
  'cs.cta.p':
    'Von der Idee in den App Store — dieselben zwei Personen, mit denen Sie sprechen. Erzählen Sie uns, was Sie bauen.',
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
