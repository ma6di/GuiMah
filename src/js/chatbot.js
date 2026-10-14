/* ==========================================================================
   GuiMah Studio — site assistant
   A small rule-based chatbot. No server, no API key, no network calls: the
   whole thing is a keyword scorer over a hand-written knowledge base, so it
   can only ever say things we wrote here.

   How a message is answered:
     1. normalise   — lowercase, strip accents/punctuation, collapse spaces
     2. detect      — German or English, from the message itself
     3. score       — every intent scores its keywords against the message
     4. reply       — highest score wins, below threshold falls back

   Anything about money, timelines or scope routes to the enquiry form rather
   than guessing a number. Adding knowledge means adding an INTENT below —
   nothing else in the file needs to change.
   ========================================================================== */

import '../css/chatbot.css';

/* ---------- Chrome copy ---------- */

const UI = {
  en: {
    title: 'GuiMah Assistant',
    subtitle: 'Rule-based bot — a real human replies to enquiries',
    open: 'Open chat',
    close: 'Close chat',
    placeholder: 'Ask me something…',
    send: 'Send',
    clear: 'Clear chat',
    you: 'You',
    bot: 'Assistant',
    suggestions: 'Suggestions',
  },
  de: {
    title: 'GuiMah Assistent',
    subtitle: 'Regelbasierter Bot — auf Anfragen antwortet ein Mensch',
    open: 'Chat öffnen',
    close: 'Chat schließen',
    placeholder: 'Fragen Sie mich etwas…',
    send: 'Senden',
    clear: 'Chat leeren',
    you: 'Sie',
    bot: 'Assistent',
    suggestions: 'Vorschläge',
  },
};

/* The enquiry hand-off, reused by every question we shouldn't answer with a
   number. `action` renders as a button in the bubble. */
const ENQUIRY = {
  en: 'Send us an enquiry with a rough idea of what you need — we come back to you within a couple of days.',
  de: 'Schicken Sie uns eine Anfrage mit einer groben Idee — wir melden uns innerhalb von ein paar Tagen.',
};

const ACTION_ENQUIRY = {
  href: 'index.html#contact',
  label: { en: 'Send an enquiry', de: 'Anfrage senden' },
};

/* ---------- Knowledge base ----------
   keys   — trigger words in BOTH languages; matching is language-agnostic so
            German input works even while the site is in English mode.
            Multi-word keys score higher, which is what keeps "how much" from
            being drowned out by a stray "hi".
   reply  — string, or an array to rotate through.
   action — optional button rendered under the reply.
   next   — ids of intents offered as follow-up chips. */

const INTENTS = [
  /* ---------------- Small talk ---------------- */
  {
    id: 'greeting',
    keys: ['hi', 'hii', 'hey', 'heya', 'hello', 'helo', 'hallo', 'halo', 'yo', 'howdy',
           'good morning', 'good afternoon', 'good evening', 'greetings',
           'guten tag', 'guten morgen', 'guten abend', 'moin', 'servus', 'gruezi', 'na'],
    reply: {
      en: ['Hey! I\'m the GuiMah Studio assistant. Ask me about what we build, our projects, or how to reach us.',
           'Hi there! Happy to help. I can tell you about our services, the team, or our work.',
           'Hello! What would you like to know about GuiMah Studio?'],
      de: ['Hallo! Ich bin der Assistent von GuiMah Studio. Fragen Sie mich, was wir bauen, nach unseren Projekten oder wie Sie uns erreichen.',
           'Hi! Gerne. Ich kann Ihnen etwas zu unseren Leistungen, zum Team oder zu unseren Arbeiten sagen.',
           'Hallo! Was möchten Sie über GuiMah Studio wissen?'],
    },
    next: ['services', 'projects', 'contact'],
  },
  {
    id: 'howareyou',
    keys: ['how are you', 'how are u', 'hows it going', 'how is it going', 'hows things',
           'how do you do', 'you good', 'alright',
           'wie gehts', 'wie geht es', 'wie geht es dir', 'wie geht es ihnen', 'alles klar', 'alles gut'],
    reply: {
      en: 'Running fine, thanks for asking — no bugs today. How can I help?',
      de: 'Läuft, danke der Nachfrage — heute keine Bugs. Wie kann ich helfen?',
    },
    next: ['services', 'projects'],
  },
  {
    id: 'imfine',
    keys: ['im good', 'i am good', 'im fine', 'i am fine', 'im great', 'not bad', 'im ok', 'im okay',
           'mir gehts gut', 'gut danke', 'ganz gut'],
    reply: {
      en: 'Good to hear. What can I tell you about GuiMah?',
      de: 'Freut mich. Was darf ich Ihnen über GuiMah erzählen?',
    },
    next: ['services', 'projects', 'contact'],
  },
  {
    id: 'thanks',
    keys: ['thanks', 'thank you', 'thankyou', 'thx', 'ty', 'cheers', 'appreciate it', 'nice one',
           'danke', 'dankeschon', 'vielen dank', 'besten dank', 'merci'],
    reply: {
      en: ['Any time. Anything else you\'d like to know?', 'You\'re welcome! Ask away if something else comes up.'],
      de: ['Jederzeit. Möchten Sie noch etwas wissen?', 'Gern geschehen! Fragen Sie einfach, wenn noch etwas offen ist.'],
    },
    next: ['contact'],
  },
  {
    id: 'bye',
    keys: ['bye', 'byebye', 'goodbye', 'see you', 'see ya', 'later', 'good night', 'gtg', 'gotta go',
           'tschuss', 'tschuess', 'ciao', 'auf wiedersehen', 'bis dann', 'bis bald', 'schonen tag'],
    reply: {
      en: 'Take care! If you want to start something, the enquiry form is always open.',
      de: 'Machen Sie es gut! Wenn Sie etwas starten möchten — das Anfrageformular ist immer offen.',
    },
    action: ACTION_ENQUIRY,
  },
  {
    id: 'name',
    keys: ['your name', 'whats your name', 'what is your name', 'who are you', 'what are you', 'who am i talking to',
           'wie heisst du', 'wie heissen sie', 'wer bist du', 'wer sind sie', 'was bist du'],
    reply: {
      en: 'I\'m the GuiMah Studio assistant — a small helper bot on this site. The humans behind it are Guilherme and Mahdi.',
      de: 'Ich bin der Assistent von GuiMah Studio — ein kleiner Helfer auf dieser Website. Die Menschen dahinter sind Guilherme und Mahdi.',
    },
    next: ['team', 'services'],
  },
  {
    id: 'isbot',
    keys: ['are you a bot', 'are you a robot', 'are you human', 'are you real', 'are you ai',
           'are you chatgpt', 'are you claude', 'bist du ein bot', 'bist du echt', 'bist du ein mensch',
           'bist du eine ki', 'roboter'],
    reply: {
      en: 'A bot, and a simple one — I match keywords against a list of answers, no AI behind me. For anything I can\'t answer, a real person replies to enquiries.',
      de: 'Ein Bot, und ein einfacher — ich gleiche Stichwörter mit einer Antwortliste ab, keine KI dahinter. Was ich nicht beantworten kann, beantwortet ein Mensch über das Anfrageformular.',
    },
    action: ACTION_ENQUIRY,
  },
  {
    id: 'help',
    keys: ['help', 'what can you do', 'what do you know', 'options', 'menu', 'commands',
           'hilfe', 'was kannst du', 'was weisst du', 'womit kannst du helfen'],
    reply: {
      en: 'I can answer questions about what GuiMah builds, the team, our tech stack, our projects (including the Flewi case study), how we work, and how to get in touch.',
      de: 'Ich beantworte Fragen dazu, was GuiMah baut, zum Team, zum Tech-Stack, zu unseren Projekten (inklusive der Flewi Case Study), wie wir arbeiten und wie Sie uns erreichen.',
    },
    next: ['services', 'projects', 'team', 'contact'],
  },
  {
    id: 'joke',
    keys: ['joke', 'funny', 'make me laugh', 'tell me a joke', 'witz', 'lustig', 'erzahl mir einen witz'],
    reply: {
      en: 'There are two hard things in software: naming things, cache invalidation, and off-by-one errors.',
      de: 'Es gibt zwei schwere Dinge in der Softwareentwicklung: Dinge benennen, Cache-Invalidierung und Off-by-one-Fehler.',
    },
    next: ['services', 'projects'],
  },

  /* ---------------- Studio ---------------- */
  {
    id: 'services',
    // Deliberately no bare "offer"/"do you offer": "do you offer photography?"
    // is a question about photography, not a request for the whole list.
    keys: ['what do you do', 'what do you build', 'what do you make', 'what you do', 'services', 'service',
           'what do you offer', 'what can you build', 'specialise', 'specialize', 'expertise',
           'was macht ihr', 'was machen sie', 'was baut ihr', 'was bauen sie', 'leistungen',
           'dienstleistungen', 'angebot', 'womit beschaftigt'],
    chip: { en: 'What do you build?', de: 'Was baut ihr?' },
    reply: {
      en: 'Four things in software, all in-house: web applications with real auth and real data, mobile products in React Native (built and pushed through App Store review), AI & automation with sensible fallbacks, and backend/APIs — schema design, caching, containerised deploys. Alongside that we also offer professional photography, IT support and IT consulting.',
      de: 'Vier Dinge in der Software, alles im Haus: Web-Anwendungen mit echter Authentifizierung und echten Daten, mobile Produkte mit React Native (entwickelt und durch das App-Store-Review gebracht), KI & Automatisierung mit sinnvollen Fallbacks, sowie Backend und APIs — Schema-Design, Caching, containerisierte Deployments. Dazu bieten wir professionelle Fotografie, IT-Support und IT-Beratung an.',
    },
    next: ['photography', 'itsupport', 'stack', 'pricing'],
  },
  {
    id: 'team',
    // Head-count questions live in `teamsize`; this one is about who we are.
    keys: ['who are you guys', 'the team', 'team', 'who works',
           'who is behind', 'whos behind', 'behind this', 'behind guimah', 'about you',
           'agency', 'founders', 'guilherme', 'gui', 'mahdi', 'mazzolini', 'cheraghali',
           'wer seid ihr', 'wer arbeitet', 'euer team', 'ihr team', 'grunder'],
    chip: { en: 'Who is behind GuiMah?', de: 'Wer steckt hinter GuiMah?' },
    reply: {
      en: 'Two engineers: Guilherme Mazzolini and Mahdi Cheraghali. Every project is built together, end to end — the two people on the call are the two people writing the code. More on the [about section](index.html#about).',
      de: 'Zwei Entwickler: Guilherme Mazzolini und Mahdi Cheraghali. Jedes Projekt entsteht gemeinsam, von Anfang bis Ende — die zwei Personen im Gespräch sind die zwei Personen, die den Code schreiben. Mehr im [Über-uns-Bereich](index.html#about).',
    },
    next: ['location', 'services', 'projects'],
  },
  {
    id: 'teamsize',
    keys: ['how big is your team', 'how big is the team', 'team size', 'size of your team',
           'how many people', 'how many of you', 'how many are you', 'how many developers',
           'how many engineers', 'headcount', 'company size', 'just two', 'only two', 'is two enough',
           'can you scale', 'scale up', 'bigger team', 'more people', 'big project', 'large project',
           'wie gross ist euer team', 'wie gross ist das team', 'teamgrosse', 'wie viele seid ihr',
           'wie viele leute', 'wie viele entwickler', 'nur zwei', 'skalieren', 'grosses projekt'],
    chip: { en: 'How big is your team?', de: 'Wie groß ist euer Team?' },
    reply: {
      en: 'Two of us at the core — Guilherme and Mahdi, who build every project together. For bigger jobs we can expand to a team of more than 10, so project size isn\'t a limit.',
      de: 'Im Kern sind wir zu zweit — Guilherme und Mahdi, die jedes Projekt gemeinsam umsetzen. Für größere Aufgaben können wir auf ein Team von mehr als 10 Personen aufstocken; die Projektgröße ist also keine Grenze.',
    },
    next: ['team', 'services', 'contact'],
  },
  {
    id: 'meeting',
    keys: ['meeting', 'in person', 'in person meeting', 'meet', 'meet you', 'meet up', 'can we meet',
           'could we meet', 'face to face', 'coffee', 'video call', 'zoom', 'appointment',
           'schedule a call', 'book a call', 'sit down', 'come over', 'visit you',
           'treffen', 'personlich', 'personliches treffen', 'termin', 'kennenlernen', 'vor ort',
           'konnen wir uns treffen', 'videocall', 'gesprach', 'besprechung'],
    chip: { en: 'Can we meet in person?', de: 'Können wir uns treffen?' },
    reply: {
      en: 'Yes, gladly. Leave us your contact details and we\'ll arrange a meeting as soon as possible.',
      de: 'Ja, sehr gerne. Hinterlassen Sie uns Ihre Kontaktdaten, und wir vereinbaren so schnell wie möglich ein Treffen.',
    },
    action: ACTION_ENQUIRY,
    next: ['address', 'location', 'contact'],
  },
  {
    id: 'address',
    keys: ['address', 'your address', 'street', 'office', 'your office', 'where is your office',
           'do you have an office', 'postal address', 'headquarters', 'premises', 'come to your office',
           'adresse', 'eure adresse', 'anschrift', 'buro', 'euer buro', 'habt ihr ein buro',
           'wo ist euer buro', 'raumlichkeiten'],
    chip: { en: 'What is your address?', de: 'Wie lautet eure Adresse?' },
    reply: {
      en: 'We currently work fully remote, so there\'s no walk-in office — but a meeting at a proper place is no problem at all. Tell us roughly where you are and we\'ll arrange it.',
      de: 'Wir arbeiten derzeit vollständig remote, es gibt also kein Büro zum Vorbeikommen — ein Treffen an einem passenden Ort ist aber überhaupt kein Problem. Sagen Sie uns ungefähr, wo Sie sind, und wir organisieren das.',
    },
    action: ACTION_ENQUIRY,
    next: ['meeting', 'location'],
  },
  {
    id: 'photography',
    keys: ['photography', 'photographer', 'photo', 'photos', 'photoshoot', 'photo shoot', 'photograph',
           'pictures', 'product photography', 'headshots', 'shoot',
           'fotografie', 'fotograf', 'foto', 'fotos', 'bilder', 'fotoshooting', 'aufnahmen'],
    chip: { en: 'Do you do photography?', de: 'Macht ihr Fotografie?' },
    reply: {
      en: 'Yes — professional photography is one of our services. It pairs well with a website or a launch that deserves real images instead of stock.',
      de: 'Ja — professionelle Fotografie gehört zu unseren Leistungen. Das passt gut zu einer Website oder einem Launch, der echte Bilder statt Stockfotos verdient.',
    },
    action: ACTION_ENQUIRY,
    next: ['itsupport', 'services', 'pricing'],
  },
  {
    id: 'itsupport',
    keys: ['it support', 'it help', 'help desk', 'helpdesk', 'it consulting', 'it consultancy',
           'it consultation', 'consulting', 'consultancy', 'consultation', 'maintenance', 'maintain',
           'troubleshooting', 'technical support', 'support contract', 'ongoing support',
           'it beratung', 'it unterstutzung', 'beratung', 'wartung', 'betreuung', 'it dienstleistungen',
           'technischer support'],
    chip: { en: 'Do you offer IT support?', de: 'Bietet ihr IT-Support?' },
    reply: {
      en: 'Yes — IT support and IT consulting are both on offer: keeping things running, advising on a setup, or a one-off consultation before you commit to a direction.',
      de: 'Ja — IT-Support und IT-Beratung bieten wir beide an: Dinge am Laufen halten, bei einem Setup beraten oder eine einmalige Beratung, bevor Sie sich auf eine Richtung festlegen.',
    },
    action: ACTION_ENQUIRY,
    next: ['photography', 'services', 'contact'],
  },
  {
    id: 'location',
    // "office"/"address" belong to `address` — that question wants the meeting
    // answer, not the country we're in.
    keys: ['where are you', 'where are you based', 'where do you work', 'location', 'based in',
           'city', 'country', 'berlin', 'germany', 'remote', 'do you work remotely', 'timezone', 'time zone',
           'wo seid ihr', 'wo sind sie', 'standort', 'wo arbeitet ihr', 'deutschland', 'zeitzone'],
    chip: { en: 'Where are you based?', de: 'Wo seid ihr?' },
    reply: {
      en: 'Remote, based in Berlin, Germany (CET). We work with clients across Europe, so being in another city or country is no problem.',
      de: 'Remote, mit Standort Berlin, Deutschland (MEZ). Wir arbeiten mit Kunden in ganz Europa — eine andere Stadt oder ein anderes Land ist also kein Problem.',
    },
    next: ['contact', 'services'],
  },
  {
    id: 'stack',
    keys: ['tech stack', 'stack', 'technologies', 'technology', 'what do you use', 'which tools', 'tools',
           'languages you use', 'frameworks', 'framework', 'react', 'react native', 'typescript', 'python',
           'fastapi', 'node', 'nodejs', 'postgres', 'postgresql', 'mongodb', 'redis', 'docker', 'tailwind', 'nextjs',
           'technologien', 'welche technologien', 'womit arbeitet ihr', 'programmiersprache'],
    chip: { en: 'What tech do you use?', de: 'Welche Technologien?' },
    reply: {
      en: 'React, React Native, TypeScript, Python, FastAPI, Node.js, PostgreSQL, MongoDB, Redis, Docker, Tailwind, and AI agents. We pick per project rather than forcing one stack onto everything.',
      de: 'React, React Native, TypeScript, Python, FastAPI, Node.js, PostgreSQL, MongoDB, Redis, Docker, Tailwind und KI-Agenten. Wir wählen pro Projekt aus, statt allem denselben Stack überzustülpen.',
    },
    next: ['projects', 'services'],
  },
  {
    id: 'ai',
    keys: ['ai', 'artificial intelligence', 'llm', 'agents', 'chatbot', 'chat bot', 'automation', 'gpt',
           'machine learning', 'ki', 'kunstliche intelligenz', 'automatisierung', 'agenten'],
    reply: {
      en: 'Yes — AI agents and LLM features inside real products, always with fallbacks so nothing fails hard. (This little assistant is deliberately not one of them: it\'s plain rule-based JavaScript.)',
      de: 'Ja — KI-Agenten und LLM-Features in echten Produkten, immer mit Fallbacks, damit nichts hart ausfällt. (Dieser kleine Assistent gehört bewusst nicht dazu: Er ist reines regelbasiertes JavaScript.)',
    },
    next: ['services', 'pricing'],
  },
  {
    id: 'language',
    keys: ['do you speak german', 'speak german', 'speak english', 'what language', 'in english', 'auf deutsch',
           'sprecht ihr deutsch', 'sprechen sie deutsch', 'sprecht ihr englisch', 'welche sprache'],
    reply: {
      en: 'English and German both work — this site, this chat and our enquiries all run in either. Use the EN/DE switch at the top to change the site language.',
      de: 'Englisch und Deutsch gehen beide — diese Website, dieser Chat und unsere Anfragen laufen in beiden Sprachen. Oben können Sie mit EN/DE die Sprache umschalten.',
    },
    next: ['contact'],
  },

  /* ---------------- Work ---------------- */
  {
    id: 'projects',
    keys: ['projects', 'project', 'portfolio', 'your work', 'work you did', 'previous work', 'past work',
           'case study', 'case studies', 'examples', 'example', 'references', 'showcase', 'what have you built',
           'projekte', 'referenzen', 'arbeiten', 'beispiele', 'was habt ihr gebaut'],
    chip: { en: 'Show me your projects', de: 'Zeig mir eure Projekte' },
    reply: {
      en: 'A shipped App Store product (Flewi), live client sites for a São Paulo law firm and a photographer, plus full-stack builds like MealPlan and a Next.js commerce project. The full list is on the [projects page](projects.html).',
      de: 'Ein veröffentlichtes App-Store-Produkt (Flewi), Live-Websites für eine Kanzlei in São Paulo und einen Fotografen, dazu Full-Stack-Projekte wie MealPlan und ein Next.js-Commerce-Projekt. Die vollständige Liste finden Sie auf der [Projektseite](projects.html).',
    },
    next: ['flewi', 'clients', 'contact'],
  },
  {
    id: 'flewi',
    keys: ['flewi', 'app store', 'appstore', 'ios app', 'your app', 'language app', 'flashcard', 'flashcards',
           'srs', 'spaced repetition', 'sprachlern', 'karteikarten', 'eure app', 'deine app'],
    chip: { en: 'Tell me about Flewi', de: 'Erzähl mir von Flewi' },
    reply: {
      en: 'Flewi is our own product — a spaced-repetition flashcard platform, live on the App Store and the web. It started by fixing the hardest part of German (der/die/das and plurals) and now opens up to any language and subject. Full write-up in the [Flewi case study](flewi.html).',
      de: 'Flewi ist unser eigenes Produkt — eine Karteikarten-Plattform mit Spaced Repetition, live im App Store und im Web. Angefangen hat sie mit dem schwersten Teil des Deutschen (der/die/das und Pluralformen) und öffnet sich jetzt für jede Sprache und jedes Thema. Alles dazu in der [Flewi Case Study](flewi.html).',
    },
    next: ['stack', 'projects', 'contact'],
  },
  {
    id: 'clients',
    keys: ['clients', 'client work', 'customers', 'real clients', 'who do you work with', 'testimonials',
           'kunden', 'kundenarbeit', 'mit wem arbeitet ihr', 'auftraggeber'],
    chip: { en: 'Who are your clients?', de: 'Wer sind eure Kunden?' },
    reply: {
      en: 'Real ones — among them a São Paulo law firm (Sanches & Muniz) and a photographer/cinematographer (Rafael Hennig), both live sites built for actual enquiries rather than as templates.',
      de: 'Echte — darunter eine Anwaltskanzlei in São Paulo (Sanches & Muniz) und ein Fotograf und Filmemacher (Rafael Hennig). Beide Websites sind live und für echte Anfragen gebaut, nicht als Template.',
    },
    next: ['projects', 'contact'],
  },

  /* ---------------- Scope of work ---------------- */
  {
    id: 'takeover',
    keys: ['existing website', 'existing site', 'existing app', 'take over', 'takeover', 'my website',
           'my site', 'current website', 'current site', 'redesign', 'rebuild', 'fix my', 'improve my',
           'migrate', 'migration', 'legacy', 'relaunch', 'developer left', 'unfinished',
           'bestehende website', 'bestehende seite', 'ubernehmen', 'uberarbeiten', 'meine website',
           'umbauen', 'neu machen'],
    chip: { en: 'Can you fix my existing site?', de: 'Könnt ihr meine Website übernehmen?' },
    reply: {
      en: 'Yes — taking over an existing site or app is ordinary work for us, whether it needs a rescue, a rebuild, or just someone reliable to keep it moving. Send us the URL and what\'s wrong with it.',
      de: 'Ja — eine bestehende Website oder App zu übernehmen ist für uns normale Arbeit, ob Rettung, Neuaufbau oder einfach jemand Verlässliches, der sie weiterführt. Schicken Sie uns die URL und was daran hakt.',
    },
    action: ACTION_ENQUIRY,
    next: ['services', 'process', 'pricing'],
  },
  {
    id: 'ecommerce',
    keys: ['online shop', 'webshop', 'web shop', 'ecommerce', 'e commerce', 'shop', 'sell online',
           'checkout', 'cart', 'stripe', 'online store', 'sell products',
           'onlineshop', 'online laden', 'verkaufen', 'warenkorb', 'kasse'],
    chip: { en: 'Can you build a shop?', de: 'Könnt ihr einen Shop bauen?' },
    reply: {
      en: 'Yes — we\'re building an e-commerce platform from scratch in Next.js right now, so shops with real checkout flows are squarely in scope. It\'s on the [projects page](projects.html).',
      de: 'Ja — wir bauen gerade eine E-Commerce-Plattform von Grund auf mit Next.js, Shops mit echten Checkout-Abläufen liegen also klar im Rahmen. Zu sehen auf der [Projektseite](projects.html).',
    },
    action: ACTION_ENQUIRY,
    next: ['projects', 'pricing'],
  },
  {
    id: 'multilingual',
    keys: ['two languages', 'multiple languages', 'multilingual', 'multi language', 'translation',
           'translate', 'english and german', 'bilingual', 'i18n', 'localisation', 'localization',
           'mehrsprachig', 'zweisprachig', 'ubersetzung', 'ubersetzen', 'mehrere sprachen'],
    chip: { en: 'Can it be bilingual?', de: 'Geht das zweisprachig?' },
    reply: {
      en: 'Yes — the site you\'re on is fully bilingual EN/DE, legal pages and this chat included. Multi-language is something we\'ve actually shipped, not a checkbox on a list.',
      de: 'Ja — die Website, auf der Sie gerade sind, ist komplett zweisprachig EN/DE, inklusive Rechtstexte und diesem Chat. Mehrsprachigkeit haben wir also wirklich umgesetzt, nicht nur angekreuzt.',
    },
    next: ['services', 'projects'],
  },
  {
    id: 'hosting',
    keys: ['hosting', 'do you host', 'host it', 'server', 'servers', 'domain', 'domains', 'deployment',
           'deploy', 'hetzner', 'aws', 'cloud', 'ssl', 'https', 'certificate', 'uptime',
           'hosten', 'serverbetrieb', 'domains registrieren', 'betreiben'],
    chip: { en: 'Do you handle hosting?', de: 'Übernehmt ihr das Hosting?' },
    reply: {
      en: 'Yes, hosting and deployment can be part of it. We run our own product exactly that way: Dockerised services behind a Caddy reverse proxy with automatic TLS, self-hosted on Hetzner with zero-downtime deploys.',
      de: 'Ja, Hosting und Deployment können dazugehören. Unser eigenes Produkt läuft genau so: dockerisierte Services hinter einem Caddy-Reverse-Proxy mit automatischem TLS, selbst gehostet bei Hetzner, Deploys ohne Ausfallzeit.',
    },
    next: ['stack', 'itsupport', 'pricing'],
  },
  {
    id: 'cms',
    keys: ['cms', 'edit the content', 'edit content', 'update the text', 'update content', 'edit it myself',
           'update it myself', 'change the text', 'wordpress', 'headless', 'admin panel', 'admin area',
           'backend access', 'content management',
           'inhalte bearbeiten', 'selbst bearbeiten', 'selbst pflegen', 'texte andern', 'redaktionssystem'],
    chip: { en: 'Can I edit content myself?', de: 'Kann ich Inhalte selbst pflegen?' },
    reply: {
      en: 'That depends on the build — a CMS or admin area is something we scope with you rather than assume, because it changes the shape of the project. Tell us how often your content changes and we\'ll advise.',
      de: 'Das hängt vom Projekt ab — ein CMS oder Admin-Bereich wird mit Ihnen abgestimmt und nicht vorausgesetzt, weil es das Projekt anders zuschneidet. Sagen Sie uns, wie oft sich Ihre Inhalte ändern, dann beraten wir Sie.',
    },
    action: ACTION_ENQUIRY,
    next: ['process', 'pricing'],
  },
  {
    id: 'seo',
    keys: ['seo', 'search engine', 'google ranking', 'ranking', 'rank on google', 'found on google',
           'page speed', 'load time', 'loading', 'lighthouse', 'core web vitals', 'how fast is',
           'suchmaschine', 'suchmaschinenoptimierung', 'ladezeit', 'sichtbarkeit', 'gefunden werden'],
    chip: { en: 'What about SEO & speed?', de: 'Was ist mit SEO & Tempo?' },
    reply: {
      en: 'Both are built in rather than bolted on: static-first pages, self-hosted fonts, semantic markup, proper metadata and Open Graph tags. We can\'t promise a Google position — nobody honestly can — but the technical groundwork is there.',
      de: 'Beides ist eingebaut statt nachgerüstet: statisch ausgelieferte Seiten, selbst gehostete Schriften, semantisches Markup, saubere Metadaten und Open-Graph-Tags. Eine Google-Position können wir nicht versprechen — das kann seriös niemand —, aber die technische Grundlage steht.',
    },
    next: ['accessibility', 'services'],
  },
  {
    id: 'accessibility',
    keys: ['accessibility', 'accessible', 'a11y', 'wcag', 'screen reader', 'screenreader',
           'keyboard navigation', 'colour contrast', 'color contrast', 'disabled users',
           'barrierefrei', 'barrierefreiheit', 'bfsg', 'zuganglich', 'screenreader tauglich'],
    chip: { en: 'Is it accessible?', de: 'Ist es barrierefrei?' },
    reply: {
      en: 'It matters to us — this very site ships skip links, ARIA labelling, visible keyboard focus and full prefers-reduced-motion support. How far a given project goes (WCAG level, audits) is something we scope together.',
      de: 'Das ist uns wichtig — schon diese Website hat Skip-Links, ARIA-Auszeichnung, sichtbaren Tastaturfokus und volle Unterstützung für prefers-reduced-motion. Wie weit ein Projekt geht (WCAG-Stufe, Audits), stimmen wir gemeinsam ab.',
    },
    next: ['gdpr', 'seo', 'services'],
  },
  {
    id: 'gdpr',
    keys: ['gdpr', 'dsgvo', 'data protection', 'privacy', 'privacy policy', 'cookies', 'cookie banner',
           'compliant', 'compliance', 'data privacy', 'tracking',
           'datenschutz', 'datenschutzerklarung', 'cookie hinweis', 'rechtssicher', 'abmahnsicher'],
    chip: { en: 'What about GDPR?', de: 'Und der Datenschutz?' },
    reply: {
      en: 'We build with data protection in mind — this site self-hosts its fonts, sets no analytics or advertising cookies, and ships its own privacy notice. Our own formal GDPR paperwork is still in progress, so we\'d go through the specifics with you directly. We\'re engineers, not lawyers, so we don\'t promise legal compliance.',
      de: 'Wir bauen mit Datenschutz im Blick — diese Website hostet ihre Schriften selbst, setzt keine Analyse- oder Werbe-Cookies und hat eine eigene Datenschutzerklärung. Unsere eigene formale DSGVO-Dokumentation ist noch in Arbeit, die Details würden wir also direkt mit Ihnen durchgehen. Wir sind Entwickler, keine Juristen — Rechtskonformität versprechen wir daher nicht.',
    },
    action: ACTION_ENQUIRY,
    next: ['accessibility', 'hosting'],
  },

  /* ---------------- Commercials ----------------
     Terms are settled per project, in writing. The bot points at that rather
     than inventing conditions nobody has agreed to. */
  {
    id: 'ownership',
    keys: ['own the code', 'owns the code', 'ownership', 'who owns', 'source code', 'intellectual property',
           'copyright', 'the rights', 'my property', 'handover',
           'quellcode', 'urheberrecht', 'eigentum', 'rechte am code', 'wem gehort', 'ubergabe'],
    chip: { en: 'Who owns the code?', de: 'Wem gehört der Code?' },
    reply: {
      en: 'We settle code ownership in writing per project, before the work starts, so nothing is left open afterwards. Send us an enquiry and we\'ll set it out for your case.',
      de: 'Die Rechte am Code halten wir pro Projekt schriftlich fest, bevor die Arbeit beginnt — damit hinterher nichts offen bleibt. Schicken Sie uns eine Anfrage, dann legen wir es für Ihren Fall dar.',
    },
    action: ACTION_ENQUIRY,
    next: ['nda', 'payment', 'process'],
  },
  {
    id: 'nda',
    keys: ['nda', 'non disclosure', 'nondisclosure', 'confidential', 'confidentiality', 'secret project',
           'under wraps', 'geheimhaltung', 'geheimhaltungsvereinbarung', 'vertraulich',
           'vertraulichkeit', 'verschwiegenheit'],
    chip: { en: 'Do you sign NDAs?', de: 'Unterschreibt ihr NDAs?' },
    reply: {
      en: 'Send the NDA along with your enquiry and we\'ll review it before any detail gets discussed.',
      de: 'Schicken Sie die NDA zusammen mit Ihrer Anfrage — wir sehen sie uns an, bevor Details besprochen werden.',
    },
    action: ACTION_ENQUIRY,
    next: ['ownership', 'contact'],
  },
  {
    id: 'payment',
    keys: ['how do i pay', 'how do you get paid', 'payment terms', 'payment', 'deposit', 'upfront',
           'up front', 'milestones', 'instalments', 'installments', 'net 30', 'bank transfer',
           'zahlung', 'zahlungsbedingungen', 'anzahlung', 'raten', 'vorkasse', 'uberweisung', 'bezahlen'],
    chip: { en: 'How does payment work?', de: 'Wie läuft die Zahlung?' },
    reply: {
      en: 'Payment terms are agreed per project and put in writing before anything starts — send us an enquiry and we\'ll set them out for your scope.',
      de: 'Die Zahlungsbedingungen vereinbaren wir pro Projekt und halten sie schriftlich fest, bevor etwas beginnt — schicken Sie uns eine Anfrage, dann legen wir sie für Ihren Umfang dar.',
    },
    action: ACTION_ENQUIRY,
    next: ['vat', 'pricing', 'ownership'],
  },
  {
    id: 'vat',
    keys: ['vat', 'vat number', 'vat id', 'invoice', 'invoices', 'invoicing', 'tax', 'receipt',
           'umsatzsteuer', 'ust', 'ust idnr', 'mwst', 'mehrwertsteuer', 'steuer', 'rechnung',
           'rechnungsstellung', 'steuernummer'],
    chip: { en: 'Do you invoice with VAT?', de: 'Rechnung mit Umsatzsteuer?' },
    reply: {
      en: 'Our VAT registration is still being set up — that part is in progress. We\'ll confirm the invoicing details with you directly before any work starts.',
      de: 'Unsere Umsatzsteuer-Registrierung wird gerade eingerichtet — das ist noch in Arbeit. Die Rechnungsdetails klären wir direkt mit Ihnen, bevor die Arbeit beginnt.',
    },
    action: ACTION_ENQUIRY,
    next: ['payment', 'contact'],
  },
  {
    id: 'aftercare',
    keys: ['after launch', 'after the launch', 'once its live', 'post launch', 'warranty', 'guarantee',
           'fix bugs', 'bugs after', 'what happens after', 'long term', 'keep it updated',
           'nach dem launch', 'nach dem start', 'garantie', 'fehler beheben', 'danach', 'langfristig'],
    chip: { en: 'What happens after launch?', de: 'Was passiert nach dem Launch?' },
    reply: {
      en: 'A launch isn\'t the end of it. What happens afterwards — bug fixes, updates, ongoing support — is agreed per project, and IT support and consulting are things we offer for exactly that.',
      de: 'Mit dem Launch ist es nicht vorbei. Was danach passiert — Fehlerbehebung, Updates, laufende Betreuung — vereinbaren wir pro Projekt, und genau dafür bieten wir IT-Support und Beratung an.',
    },
    action: ACTION_ENQUIRY,
    next: ['itsupport', 'hosting', 'payment'],
  },
  {
    id: 'hiring',
    keys: ['are you hiring', 'hiring', 'job', 'jobs', 'vacancy', 'vacancies', 'internship', 'intern',
           'work for you', 'join your team', 'my cv', 'my resume', 'application',
           'stelle', 'stellenangebot', 'praktikum', 'bewerbung', 'mitarbeiten', 'lebenslauf'],
    reply: {
      en: 'We\'re two at the core and don\'t run a standing hiring process — but we do expand the team per project. If you work in this field, say hello anyway.',
      de: 'Wir sind im Kern zu zweit und haben kein laufendes Bewerbungsverfahren — für Projekte stocken wir das Team aber auf. Wenn Sie in dem Bereich arbeiten, melden Sie sich trotzdem gern.',
    },
    action: ACTION_ENQUIRY,
    next: ['teamsize', 'contact'],
  },

  /* ---------------- Money, time, process ---------------- */
  {
    id: 'pricing',
    keys: ['price', 'prices', 'pricing', 'cost', 'costs', 'how much', 'how much does it cost', 'budget',
           'rate', 'rates', 'hourly', 'per hour', 'day rate', 'quote', 'estimate', 'expensive', 'cheap', 'fee',
           'preis', 'preise', 'kosten', 'was kostet', 'wie viel kostet', 'wieviel kostet', 'wie teuer',
           'stundensatz', 'tagessatz', 'angebot', 'kostenvoranschlag', 'budget'],
    chip: { en: 'What does it cost?', de: 'Was kostet das?' },
    reply: {
      en: `Every project is quoted individually — scope decides the number, so I won't guess one here. ${ENQUIRY.en}`,
      de: `Jedes Projekt wird individuell kalkuliert — der Umfang bestimmt den Preis, deshalb rate ich hier nicht. ${ENQUIRY.de}`,
    },
    action: ACTION_ENQUIRY,
    next: ['timeline', 'process'],
  },
  {
    id: 'timeline',
    keys: ['how long', 'how long does it take', 'timeline', 'time frame', 'timeframe', 'deadline', 'duration',
           'when can you start', 'how fast', 'how soon', 'delivery', 'lead time',
           'wie lange', 'wie lange dauert', 'dauer', 'zeitrahmen', 'wann konnt ihr', 'wann konnen sie',
           'lieferzeit', 'frist'],
    chip: { en: 'How long does it take?', de: 'Wie lange dauert das?' },
    reply: {
      en: `It depends entirely on scope — a landing page and a full product are different animals. ${ENQUIRY.en}`,
      de: `Das hängt ganz vom Umfang ab — eine Landingpage und ein komplettes Produkt sind zwei verschiedene Dinge. ${ENQUIRY.de}`,
    },
    action: ACTION_ENQUIRY,
    next: ['process', 'pricing'],
  },
  {
    id: 'process',
    keys: ['how do you work', 'how does it work', 'process', 'workflow', 'what happens next', 'next steps',
           'first step', 'get started', 'how to start', 'onboarding', 'contract',
           'wie arbeitet ihr', 'wie lauft das', 'ablauf', 'vorgehen', 'wie fangen wir an', 'erste schritte'],
    chip: { en: 'How do you work?', de: 'Wie arbeitet ihr?' },
    reply: {
      en: `One team from the first call to launch — no handoffs, no account manager in between. You tell us what you're building, we tell you honestly whether we're the right team for it, and if we're not, we say so. ${ENQUIRY.en}`,
      de: `Ein Team vom ersten Gespräch bis zum Launch — keine Übergaben, kein Account Manager dazwischen. Sie sagen uns, was Sie bauen, wir sagen Ihnen ehrlich, ob wir das richtige Team dafür sind — und wenn nicht, sagen wir das auch. ${ENQUIRY.de}`,
    },
    action: ACTION_ENQUIRY,
    next: ['pricing', 'contact'],
  },
  {
    id: 'availability',
    keys: ['are you available', 'availability', 'do you have capacity', 'taking clients', 'accepting projects',
           'can you build', 'can you help', 'can you make', 'would you build', 'do you take on', 'hire you',
           'work with you', 'work together', 'i need a website', 'i need an app', 'i have a project',
           'habt ihr kapazitat', 'seid ihr verfugbar', 'konnt ihr', 'konnen sie', 'ich brauche eine website',
           'ich brauche eine app', 'zusammenarbeiten', 'beauftragen'],
    chip: { en: 'Are you available?', de: 'Habt ihr Kapazität?' },
    reply: {
      en: `Most likely yes — but it depends on what and when. ${ENQUIRY.en}`,
      de: `Sehr wahrscheinlich ja — es kommt aber darauf an, was und wann. ${ENQUIRY.de}`,
    },
    action: ACTION_ENQUIRY,
    next: ['services', 'process'],
  },
  {
    id: 'responsetime',
    keys: ['how quickly do you reply', 'how fast do you reply', 'how long to reply', 'response time',
           'when will you reply', 'when do you reply', 'hear back', 'how soon do you answer',
           'antwortzeit', 'wie schnell antwortet', 'wann antwortet ihr', 'wie schnell meldet'],
    chip: { en: 'How fast do you reply?', de: 'Wie schnell antwortet ihr?' },
    reply: {
      en: 'Within one business day for enquiries — and it\'s Guilherme or Mahdi replying, not a ticket queue.',
      de: 'Bei Anfragen innerhalb eines Werktags — und es antworten Guilherme oder Mahdi, keine Ticket-Warteschlange.',
    },
    action: ACTION_ENQUIRY,
    next: ['contact', 'process'],
  },
  {
    id: 'contact',
    keys: ['contact', 'contact you', 'get in touch', 'reach you', 'email', 'e mail', 'mail', 'phone',
           'call you', 'number', 'talk to a human', 'speak to someone', 'enquiry', 'inquiry',
           'kontakt', 'erreichen', 'erreiche', 'anfrage', 'telefon', 'anrufen', 'nummer',
           'mensch sprechen', 'melden'],
    chip: { en: 'How do I contact you?', de: 'Wie erreiche ich euch?' },
    reply: {
      en: 'Email guimahstudio@gmail.com, phone (+49) 174 4005625, or use the form below — a rough idea is enough to start, and we come back to you within a couple of days.',
      de: 'E-Mail guimahstudio@gmail.com, Telefon (+49) 174 4005625, oder nutzen Sie das Formular unten — eine grobe Idee genügt für den Anfang, und wir melden uns innerhalb von ein paar Tagen.',
    },
    action: ACTION_ENQUIRY,
    next: ['location', 'process'],
  },

  /* ---------------- Conversation repair ----------------
     A keyword bot will miss things. These keep the miss from turning into a
     dead end: apologise once, then get a human involved. */
  {
    id: 'frustration',
    keys: ['useless', 'not helpful', 'youre not helping', 'you are not helping', 'not helping',
           'stupid bot', 'dumb bot', 'bad bot', 'terrible', 'annoying', 'you dont understand',
           'you do not understand', 'that didnt help', 'wrong answer', 'nonsense', 'rubbish',
           'nutzlos', 'blodsinn', 'hilft nicht', 'hilft mir nicht', 'verstehst nichts', 'unbrauchbar',
           'quatsch', 'bringt nichts'],
    reply: {
      en: 'Sorry — that\'s on me. I\'m a simple keyword bot and I miss plenty. A human will do better: send us a message and Guilherme or Mahdi will reply.',
      de: 'Entschuldigung — das liegt an mir. Ich bin ein einfacher Stichwort-Bot und übersehe einiges. Ein Mensch macht das besser: Schicken Sie uns eine Nachricht, Guilherme oder Mahdi antworten Ihnen.',
    },
    action: ACTION_ENQUIRY,
    next: ['contact', 'help'],
  },
  {
    id: 'compliment',
    keys: ['nice site', 'nice website', 'cool site', 'great site', 'love the site', 'love this site',
           'looks good', 'looks great', 'looks nice', 'nice design', 'nice work', 'great work',
           'good work', 'impressive', 'beautiful', 'well done', 'i like it', 'like your site',
           'schone website', 'schone seite', 'tolle seite', 'gefallt mir', 'sieht gut aus',
           'gut gemacht', 'sehr schon'],
    reply: {
      en: ['Thank you — that\'s kind. Guilherme and Mahdi built it themselves, no template involved.',
           'Much appreciated! It\'s hand-built — glad it landed.'],
      de: ['Danke — das freut uns. Guilherme und Mahdi haben sie selbst gebaut, ganz ohne Template.',
           'Vielen Dank! Handgebaut — schön, dass es gefällt.'],
    },
    next: ['projects', 'services', 'contact'],
  },
  {
    id: 'alreadysent',
    keys: ['already sent', 'i sent', 'ive sent', 'did you get my', 'sent you an email', 'sent a message',
           'no reply', 'havent heard', 'have not heard', 'still waiting', 'any update',
           'schon geschickt', 'schon geschrieben', 'habe geschrieben', 'keine antwort', 'noch keine antwort',
           'warte noch'],
    reply: {
      en: 'Thanks for getting in touch already — enquiries are answered within one business day, so a reply should be with you shortly. If it\'s been longer than that, email guimahstudio@gmail.com directly and we\'ll chase it.',
      de: 'Danke, dass Sie sich schon gemeldet haben — Anfragen beantworten wir innerhalb eines Werktags, eine Antwort sollte also bald da sein. Falls es länger dauert, schreiben Sie direkt an guimahstudio@gmail.com, dann gehen wir dem nach.',
    },
    next: ['contact', 'responsetime'],
  },
  {
    id: 'whobuiltyou',
    keys: ['who built you', 'who made you', 'who created you', 'how were you built', 'how are you built',
           'what are you made of', 'are you open source', 'what powers you', 'which model',
           'wer hat dich gebaut', 'wer hat dich gemacht', 'wie wurdest du gebaut', 'welches modell'],
    reply: {
      en: 'Guilherme and Mahdi did, in plain JavaScript — no AI model, no server, no tracking. Everything I say is written by hand in a list of answers, which is why I\'m confident about GuiMah and useless about everything else.',
      de: 'Guilherme und Mahdi, in reinem JavaScript — kein KI-Modell, kein Server, kein Tracking. Alles, was ich sage, steht handgeschrieben in einer Antwortliste. Deshalb bin ich bei GuiMah sicher und bei allem anderen nutzlos.',
    },
    next: ['ai', 'services', 'help'],
  },
];

/* Fallback ladder — the second miss stops guessing and hands over. */
const FALLBACK = [
  {
    reply: {
      en: 'I didn\'t quite catch that — I\'m a simple bot. Try asking about what we build, our projects, the team, or how to reach us.',
      de: 'Das habe ich nicht ganz verstanden — ich bin ein einfacher Bot. Fragen Sie mich gern, was wir bauen, nach unseren Projekten, dem Team oder wie Sie uns erreichen.',
    },
    next: ['services', 'projects', 'team', 'contact'],
  },
  {
    reply: {
      en: 'Still not following, sorry. That one\'s better answered by a human — send it over and we\'ll come back to you within a couple of days.',
      de: 'Ich komme leider nicht mit. Das beantwortet ein Mensch besser — schicken Sie es uns, wir melden uns innerhalb von ein paar Tagen.',
    },
    action: ACTION_ENQUIRY,
    next: ['services', 'contact'],
  },
];

const OPENERS = ['services', 'projects', 'pricing', 'contact'];

/* ==========================================================================
   Language + matching
   ========================================================================== */

/** Fold a message down to bare lowercase words: "Wie viel kostet's?!" -> "wie viel kostet s" */
function norm(s) {
  return String(s)
    .toLowerCase()
    .replace(/ß/g, 'ss')
    // Apostrophes join, they don't separate: "what's" -> "whats", not "what s".
    .replace(/['’`´]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // ä -> a, ü -> u, é -> e
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/* Tokens that only ever appear in German. Articles are left out on purpose —
   "der die das" shows up in our own English copy about Flewi. */
const DE_MARKERS = new Set([
  'hallo', 'servus', 'moin', 'gruezi', 'guten', 'tschuss', 'tschuess', 'danke', 'dankeschon', 'bitte',
  'wie', 'was', 'wo', 'wer', 'warum', 'wann', 'welche', 'wieviel', 'viel', 'ihr', 'euch', 'euer', 'eure',
  'ich', 'du', 'sie', 'wir', 'mir', 'mich', 'nicht', 'kein', 'keine', 'und', 'oder', 'aber', 'auch',
  'kostet', 'kosten', 'preis', 'preise', 'teuer', 'konnt', 'konnen', 'kann', 'macht', 'machen', 'baut',
  'bauen', 'habt', 'haben', 'seid', 'sind', 'ist', 'geht', 'gibt', 'brauche', 'mochte', 'wurde',
  'projekte', 'arbeiten', 'arbeitet', 'leistungen', 'kontakt', 'anfrage', 'deutsch', 'lange', 'dauert',
  'stundensatz', 'kunden', 'referenzen', 'hilfe', 'wirklich', 'sehr', 'gut', 'schon',
  'treffen', 'termin', 'personlich', 'personliches', 'moglich', 'gern', 'gerne', 'hatte',
  'buro', 'adresse', 'anschrift', 'lautet', 'gross', 'grosse', 'fotografie', 'fotograf',
  'beratung', 'bietet', 'bieten', 'braucht', 'brauchen', 'wartung', 'unterstutzung',
  'bestehende', 'ubernehmen', 'uberarbeiten', 'meine', 'unsere', 'datenschutz', 'rechnung',
  'zahlung', 'anzahlung', 'bezahlen', 'quellcode', 'urheberrecht', 'vertraulich', 'geheimhaltung',
  'inhalte', 'pflegen', 'garantie', 'danach', 'stelle', 'bewerbung', 'praktikum', 'nutzlos',
  'hilft', 'gefallt', 'sieht', 'tolle', 'schone', 'geschickt', 'geschrieben', 'antwort',
  'antwortet', 'zweisprachig', 'mehrsprachig', 'ubersetzung', 'barrierefrei',
]);

/** German if the message shows a German marker; otherwise follow the site. */
function detectLang(normalised, siteLang) {
  for (const word of normalised.split(' ')) {
    if (DE_MARKERS.has(word)) return 'de';
  }
  return siteLang;
}

/* Precompiled keys: phrase length is the weight, so "how much does it cost"
   outranks a one-word accidental hit. */
const COMPILED = INTENTS.map((intent) => ({
  intent,
  keys: intent.keys.map((k) => {
    const key = norm(k);
    return { key, weight: key.split(' ').length };
  }),
}));

function scoreIntent(padded, keys) {
  let total = 0;
  for (const { key, weight } of keys) {
    if (padded.includes(` ${key} `)) { total += weight * 2; continue; }
    // Prefix hits catch plurals ("project" -> "projects") but are only safe for
    // single words: allowing them on phrases lets "who are you" swallow
    // "who are your clients", which is a different question entirely.
    if (weight === 1 && padded.includes(` ${key}`)) total += 1;
  }
  return total;
}

const MIN_SCORE = 2; // one clean whole-word hit

/** Best-scoring intent for a message, or null. */
function match(text) {
  const padded = ` ${text} `;
  let best = null;
  let bestScore = 0;

  for (const { intent, keys } of COMPILED) {
    const s = scoreIntent(padded, keys);
    if (s > bestScore) { bestScore = s; best = intent; }
  }

  return bestScore >= MIN_SCORE ? { intent: best, score: bestScore } : null;
}

const byId = (id) => INTENTS.find((i) => i.id === id) || null;
const pick = (v) => (Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v);

/* ==========================================================================
   Widget
   ========================================================================== */

const STORE = 'guimah-chat';
const MAX_TURNS = 60;
const MAX_LEN = 400;

export function initChat() {
  // Never mount twice, and never on a page without a body to mount into.
  if (!document.body || document.querySelector('.chat-fab')) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = () => (document.documentElement.lang === 'de' ? 'de' : 'en');
  const t = () => UI[lang()];

  /* ---------- Markup ---------- */
  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'chat-fab';
  fab.setAttribute('aria-expanded', 'false');
  fab.setAttribute('aria-controls', 'chat-panel');
  fab.innerHTML =
    '<svg class="chat-fab-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z" ' +
    'stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/>' +
    '<circle cx="15" cy="10" r="1" fill="currentColor"/></svg>' +
    '<svg class="chat-fab-close" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.id = 'chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', t().title);
  panel.hidden = true;
  panel.innerHTML =
    '<div class="chat-head">' +
      '<div class="chat-head-text">' +
        '<p class="chat-title"></p>' +
        '<p class="chat-sub"></p>' +
      '</div>' +
      '<button type="button" class="chat-icon-btn" data-chat-clear>' +
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" stroke="currentColor" stroke-width="1.5" ' +
        'stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
      '<button type="button" class="chat-icon-btn" data-chat-close>' +
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="chat-log" data-chat-log role="log" aria-live="polite" aria-relevant="additions"></div>' +
    '<div class="chat-chips" data-chat-chips></div>' +
    '<form class="chat-form" data-chat-form novalidate>' +
      `<input class="chat-input" data-chat-input type="text" autocomplete="off" maxlength="${MAX_LEN}">` +
      '<button type="submit" class="chat-send">' +
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" stroke-width="1.8" ' +
        'stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
    '</form>';

  document.body.append(fab, panel);

  const log = panel.querySelector('[data-chat-log]');
  const chipRow = panel.querySelector('[data-chat-chips]');
  const form = panel.querySelector('[data-chat-form]');
  const input = panel.querySelector('[data-chat-input]');
  const titleEl = panel.querySelector('.chat-title');
  const subEl = panel.querySelector('.chat-sub');

  let misses = 0;
  let greeted = false;
  let busy = false;
  let lastChips = null;   // chip ids currently on screen, so EN/DE keeps them

  /* ---------- Chrome text follows the EN/DE switch ---------- */
  function paintChrome() {
    const c = t();
    titleEl.textContent = c.title;
    subEl.textContent = c.subtitle;
    input.placeholder = c.placeholder;
    input.setAttribute('aria-label', c.placeholder);
    panel.setAttribute('aria-label', c.title);
    chipRow.setAttribute('aria-label', c.suggestions);
    fab.setAttribute('aria-label', panel.hidden ? c.open : c.close);
    panel.querySelector('[data-chat-close]').setAttribute('aria-label', c.close);
    panel.querySelector('[data-chat-clear]').setAttribute('aria-label', c.clear);
    panel.querySelector('.chat-send').setAttribute('aria-label', c.send);
  }

  /* ---------- Transcript persistence ----------
     The site is multi-page, so without this a click from Work to Projects
     would silently wipe the conversation mid-sentence. */
  function save() {
    try {
      const turns = [...log.querySelectorAll('[data-role]')].slice(-MAX_TURNS).map((el) => ({
        role: el.dataset.role,
        text: el.dataset.raw,
        action: el.dataset.action || '',
        actionLabel: el.dataset.actionLabel || '',
      }));
      sessionStorage.setItem(STORE, JSON.stringify({ turns, greeted, misses, chips: lastChips }));
    } catch { /* private mode — chat just won't persist */ }
  }

  function load() {
    try {
      const raw = sessionStorage.getItem(STORE);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data?.turns?.length) return false;
      greeted = Boolean(data.greeted);
      misses = Number(data.misses) || 0;
      data.turns.forEach((turn) => {
        addBubble(turn.role, turn.text, turn.action ? { href: turn.action, text: turn.actionLabel } : null, true);
      });
      setChips(data.chips);
      return true;
    } catch {
      return false;
    }
  }

  /* ---------- Rendering ----------
     Bot copy may contain [label](href); user text never runs through this and
     is written with textContent only, so a message can't inject markup. */
  function writeRich(parent, text) {
    const re = /\[([^\]]+)\]\(([^)]+)\)/g;
    let last = 0;
    let m;
    while ((m = re.exec(text))) {
      if (m.index > last) parent.append(document.createTextNode(text.slice(last, m.index)));
      const a = document.createElement('a');
      a.textContent = m[1];
      a.href = m[2];
      if (/^https?:/i.test(m[2])) { a.target = '_blank'; a.rel = 'noopener'; }
      parent.append(a);
      last = re.lastIndex;
    }
    if (last < text.length) parent.append(document.createTextNode(text.slice(last)));
  }

  function addBubble(role, text, action, restoring) {
    const wrap = document.createElement('div');
    wrap.className = `chat-msg chat-msg--${role}`;
    wrap.dataset.role = role;
    wrap.dataset.raw = text;

    const who = document.createElement('span');
    who.className = 'chat-who';
    who.textContent = role === 'you' ? t().you : t().bot;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    if (role === 'you') bubble.textContent = text;
    else writeRich(bubble, text);

    wrap.append(who, bubble);

    if (action) {
      const a = document.createElement('a');
      a.className = 'chat-action';
      a.href = action.href;
      a.textContent = action.text;
      a.dataset.chatEnquiry = '';
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      a.append(' ', arrow);
      bubble.after(a);
      wrap.dataset.action = action.href;
      wrap.dataset.actionLabel = action.text;
    }

    log.append(wrap);
    if (!restoring) log.scrollTop = log.scrollHeight;
    return wrap;
  }

  function setChips(ids) {
    chipRow.textContent = '';
    lastChips = ids || null;
    const l = lang();
    (ids || []).forEach((id) => {
      const intent = byId(id);
      if (!intent?.chip) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chat-chip';
      b.textContent = intent.chip[l];
      b.addEventListener('click', () => {
        if (busy) return;
        addBubble('you', intent.chip[l], null);
        respond(intent, l);
      });
      chipRow.append(b);
    });
  }

  function typing() {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot chat-typing';
    el.innerHTML = '<span class="chat-who"></span><div class="chat-bubble">' +
      '<span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
    el.querySelector('.chat-who').textContent = t().bot;
    log.append(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  /* ---------- Answering ---------- */
  function say(text, action, next) {
    const delay = reduced ? 0 : 380 + Math.random() * 260;
    busy = true;
    const ghost = reduced ? null : typing();

    setTimeout(() => {
      ghost?.remove();
      addBubble('bot', text, action);
      setChips(next);
      busy = false;
      save();
    }, delay);
  }

  function respond(intent, l) {
    misses = 0;
    const action = intent.action ? { href: intent.action.href, text: intent.action.label[l] } : null;
    say(pick(intent.reply[l]), action, intent.next);
  }

  function handle(raw) {
    // Same scrub the contact form uses: control and bidi characters can hide
    // content inside what looks like an ordinary sentence.
    const clean = String(raw)
      .replace(/[\u0000-\u001f\u007f]/g, '')                       // control
      .replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g, '') // bidi / zero-width
      .trim()
      .slice(0, MAX_LEN);
    if (!clean) return;

    addBubble('you', clean, null);

    const text = norm(clean);
    const l = detectLang(text, lang());
    const hit = match(text);

    if (!hit) {
      const step = FALLBACK[Math.min(misses, FALLBACK.length - 1)];
      misses += 1;
      const action = step.action ? { href: step.action.href, text: step.action.label[l] } : null;
      say(pick(step.reply[l]), action, step.next);
      return;
    }

    // "hi, what do you build?" — answer the real question, but don't ignore
    // the hello on the way past.
    if (hit.intent.id !== 'greeting' && !greeted) {
      const g = scoreIntent(` ${text} `, COMPILED.find((c) => c.intent.id === 'greeting').keys);
      if (g >= MIN_SCORE) greeted = true;
    }
    if (hit.intent.id === 'greeting') greeted = true;

    respond(hit.intent, l);
  }

  /* ---------- Open / close ---------- */
  function open() {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    fab.classList.add('is-open');
    fab.setAttribute('aria-label', t().close);
    requestAnimationFrame(() => panel.classList.add('is-open'));

    if (!log.children.length) {
      const l = lang();
      addBubble('bot', l === 'de'
        ? 'Hallo! Ich bin der Assistent von GuiMah Studio. Fragen Sie mich nach unseren Leistungen, Projekten oder dem Team — oder schicken Sie uns direkt eine Anfrage.'
        : 'Hi! I\'m the GuiMah Studio assistant. Ask me about our services, projects or the team — or send us an enquiry directly.', null);
      setChips(OPENERS);
      save();
    }

    log.scrollTop = log.scrollHeight;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) input.focus();
  }

  function close() {
    panel.classList.remove('is-open');
    fab.setAttribute('aria-expanded', 'false');
    fab.classList.remove('is-open');
    fab.setAttribute('aria-label', t().open);
    const finish = () => { panel.hidden = true; };
    if (reduced) finish();
    else setTimeout(finish, 220);
    fab.focus();
  }

  /* ---------- Wiring ---------- */
  fab.addEventListener('click', () => (panel.hidden ? open() : close()));
  panel.querySelector('[data-chat-close]').addEventListener('click', close);

  panel.querySelector('[data-chat-clear]').addEventListener('click', () => {
    log.textContent = '';
    chipRow.textContent = '';
    misses = 0;
    greeted = false;
    try { sessionStorage.removeItem(STORE); } catch { /* ignore */ }
    const l = lang();
    addBubble('bot', l === 'de' ? 'Alles klar, neuer Anfang. Was möchten Sie wissen?'
                                : 'Cleared. What would you like to know?', null);
    setChips(OPENERS);
    save();
    input.focus();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy) return;
    const value = input.value;
    input.value = '';
    handle(value);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });

  // The enquiry button leaves the chat for the form — close on the way out so
  // the visitor lands on the fields, not on a panel covering them.
  panel.addEventListener('click', (e) => {
    const link = e.target.closest('[data-chat-enquiry], .chat-bubble a');
    if (!link || link.target === '_blank') return;

    const [path, hash] = link.getAttribute('href').split('#');
    const samePage = !path || document.location.pathname.endsWith(path);
    close();

    // Already on the page that owns the anchor: scroll it ourselves and put
    // the cursor in the first field, rather than a bare jump.
    if (samePage && hash) {
      e.preventDefault();
      const target = document.getElementById(hash);
      target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      if (hash === 'contact') {
        setTimeout(() => document.querySelector('#name, [data-form] input')?.focus(),
          reduced ? 0 : 700);
      }
    }
  });

  // Re-label the chrome when the visitor flips EN/DE. Past messages stay in the
  // language they were written in — rewriting them mid-conversation reads worse
  // than leaving the history honest.
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => requestAnimationFrame(() => {
      paintChrome();
      setChips(lastChips);
    }));
  });

  paintChrome();
  load();
}
