// Screens and app flow.
(function () {
  const L = window.Logic, C = window.COURSE, CFG = window.CAHIER_CONFIG || {};
  const KEY = "cahier-state-v1", AUTH = "cahier-auth-v1";
  const view = document.getElementById("view"), dock = document.getElementById("dock"), dot = document.getElementById("syncdot");
  const load = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) || f; } catch { return f; } };
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  let S = L.merge(load(KEY, null) || window.CAHIER_DEMO || null, { start: Date.now() });
  let device = localStorage.getItem("cahier-device"); if (!device) { device = Math.random().toString(36).slice(2, 10); try { localStorage.setItem("cahier-device", device); } catch {} }
  let tab = "today", session = null, lastInput = Date.now(), installEvt = null;
  const save = () => { store(KEY, S); queueSync(); };
  const now = () => Date.now();

  // Small DOM helper. Text always goes in as text, so nothing typed can run as code.
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "on") for (const [ev, fn] of Object.entries(v)) e.addEventListener(ev, fn);
      else if (k === "class") e.className = v;
      else if (v !== false && v != null) e.setAttribute(k, v === true ? "" : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : String(c));
    return e;
  }
  const btn = (text, fn, cls = "") => h("button", { type: "button", class: "btn " + cls, on: { click: fn } }, text);
  const show = (...nodes) => { view.replaceChildren(...nodes.flat().filter(Boolean)); window.scrollTo(0, 0); };

  // French speech uses the device's own voice. It prefers Canadian French when available.
  const SPEEDS = [["Very slow", .5], ["Slow", .7], ["Normal", .9]];
  let speed = Math.min(2, Math.max(0, Number(load("cahier-speed", 2)))), lastSaid = "";
  function setSpeed(i) { speed = i; store("cahier-speed", i); }
  function say(text) {
    const sp = window.speechSynthesis; if (!sp) return;
    lastSaid = text;
    sp.cancel(); const u = new SpeechSynthesisUtterance(text), vs = sp.getVoices();
    u.lang = "fr-CA"; u.rate = SPEEDS[speed][1];
    u.voice = vs.find(v => /^fr[-_]CA/i.test(v.lang)) || vs.find(v => /^fr/i.test(v.lang)) || null;
    if (u.voice) u.lang = u.voice.lang; sp.speak(u);
  }
  // Modules in course order. Each lesson id is unique across all modules.
  const UNITS = () => (C.order || Object.keys(C.units)).map(k => C.units[k]).filter(Boolean);
  const lessons = () => UNITS().flatMap(u => u.lessons);
  const unitOf = l => UNITS().find(u => u.lessons.includes(l));
  const unitDone = u => u.lessons.every(l => S.lessons[l.id] && S.lessons[l.id].done);
  const currentUnit = () => unitOf(nextLesson()) || UNITS()[UNITS().length - 1];
  const unitLabel = u => { const m = /^([a-z]\d)-u(\d+)$/i.exec(u.id); return m ? `${m[1].toUpperCase()} · Module ${m[2]}` : u.title; };
  const allQ = () => lessons().flatMap(l => l.questions.map(q => ({ ...q, lesson: l.id })));
  const qById = id => allQ().find(q => q.id === id);
  const nextLesson = () => lessons().find(l => !(S.lessons[l.id] && S.lessons[l.id].done));
  const liveCards = () => Object.entries(S.cards).filter(([, c]) => !c.d).map(([id, c]) => ({ id, ...c }));
  const liveMistakes = () => Object.entries(S.mistakes).filter(([, m]) => !m.d && !m.fixed && qById(m.qid || "")).map(([id, m]) => ({ id, ...m }));
  const dueCards = () => liveCards().filter(c => c.due <= now());
  const dueMistakes = () => liveMistakes().filter(m => m.due <= now());
  const dueCount = () => dueCards().length + dueMistakes().length;
  const accepted = q => [...(q.accepted || []), ...((S.accept[q.id] && S.accept[q.id].list) || [])];

  function addCards(list, lid) {
    list.forEach(([fr, en]) => { const id = "c-" + L.clean(fr).replace(/[^\p{L}\p{N}]+/gu, "-"); if (!S.cards[id]) S.cards[id] = { fr, en, lesson: lid, int: 0, reps: 0, due: now(), u: now() }; });
  }
  function addMistake(q, given, kind) {
    const old = S.mistakes[q.id];
    S.mistakes[q.id] = { qid: q.id, topic: q.topic, given: String(given), kind, count: ((old && old.count) || 0) + 1, streak: 0, fixed: 0, due: L.startOfDay(now()) + L.DAY, u: now() };
    save();
  }
  function allow(q, text) {
    const r = S.accept[q.id] || { list: [] };
    S.accept[q.id] = { list: [...r.list, text], u: now() };
    if (S.mistakes[q.id]) S.mistakes[q.id] = { ...S.mistakes[q.id], d: 1, u: now() };
    save();
  }

  // Time only counts while a session is open and you've touched the screen in the last 2 minutes.
  ["pointerdown", "keydown"].forEach(e => addEventListener(e, () => { lastInput = now(); }, { passive: true }));
  function dayRec() { const k = L.ymd(now()) + "|" + device; return S.days[k] || (S.days[k] = { sec: 0, sessions: 0, u: now() }); }
  setInterval(() => {
    if (session && !document.hidden && now() - lastInput < 12e4) { const r = dayRec(); r.sec += 5; r.u = now(); store(KEY, S); }
  }, 5000);

  // ---------- Tabs ----------
  const TABS = [["today", "Today"], ["course", "Course"], ["words", "Words"], ["mistakes", "Mistakes"]];
  function nav() {
    document.body.classList.toggle("focus", !!session);
    dock.replaceChildren(...TABS.map(([id, label]) => {
      const n = id === "words" ? dueCards().length : id === "mistakes" ? dueMistakes().length : 0;
      return h("button", { type: "button", "aria-current": tab === id ? "page" : null, on: { click: () => go(id) } }, label, n ? h("span", { class: "badge" }, n) : null);
    }));
  }
  function go(id) { tab = id; session = null; nav(); ({ today, course, words, mistakes, settings, progress })[id](); }
  document.getElementById("brand").addEventListener("click", () => { if (!session) go("today"); });

  // Line icons. These strings are fixed in the code, never user text.
  const ICONS = {
    sound: '<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>',
    chat: '<path d="M4 5h16v11H10l-6 4z"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.9.4 5 2.8 5 5.8"/>',
    equals: '<path d="M5 9h14M5 15h14"/>',
    numbers: '<path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"/>',
    test: '<path d="M9 3h6v3H9z"/><path d="M7 4.5H5V21h14V4.5h-2"/><path d="m9 14 2 2 4-4"/>',
    progress: '<circle cx="12" cy="12" r="8" stroke-dasharray="3.2 3.2"/>',
    done: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16 10"/>',
    review: '<path d="M12 4 21 20H3z"/><path d="M12 10v4M12 17h.01"/>',
    retry: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    later: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    tick: '<path d="m6 12.5 4 4L18 8"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    stack: '<path d="M4 7h11v13H4z"/><path d="M8 4h12v13"/>',
    hand: '<path d="M6 14V8a1.5 1.5 0 0 1 3 0v4M9 11V5a1.5 1.5 0 0 1 3 0v6M12 10V6a1.5 1.5 0 0 1 3 0v6M15 11a1.5 1.5 0 0 1 3 0v3a7 7 0 0 1-7 7h-1a6 6 0 0 1-4.5-2.2L3 15.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.3M12 17h.01"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    walk: '<circle cx="13" cy="4.5" r="1.8"/><path d="m9 21 3-7 3 3v4M7 12l3-4 4 1 2 3M12 14l-1-5"/>' 
  };
  function icon(name, cls) { const e = h("span", { class: "ico " + (cls || ""), "aria-hidden": "true" }); e.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + "</svg>"; return e; }
  const STATUS = { progress: ["progress", "In progress"], done: ["done", "Done"], review: ["review", "Review"], retry: ["retry", "Retry"], later: ["later", "Coming"] };
  const status = k => h("span", { class: "status s-" + k }, icon(STATUS[k][0]), STATUS[k][1]);
  function ring(pct) {
    const e = h("span", { class: "ring", role: "img", "aria-label": pct + "% done" }), c = 2 * Math.PI * 18;
    e.innerHTML = `<svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" class="track"/><circle cx="22" cy="22" r="18" class="fillring" stroke-dasharray="${(pct / 100 * c).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 22 22)"/></svg>`;
    e.append(h("b", {}, pct + "%")); return e;
  }
  const hasMistakes = l => liveMistakes().some(m => { const q = qById(m.qid); return q && q.lesson === l.id; });
  function lessonState(l) {
    const r = S.lessons[l.id] || {};
    if (r.done) return { pct: 100, st: hasMistakes(l) ? "review" : "done", done: true };
    if (r.failed) return { pct: r.pct || 0, st: "retry" };
    if (r.pct) return { pct: r.pct, st: "progress" };
    return { pct: 0, st: null };
  }
  function lessonRow(l) {
    const k = lessonState(l), isNext = nextLesson() === l;
    return h("button", { type: "button", class: "lesson" + (isNext ? " next" : ""), on: { click: () => startSession("lesson", l) } },
      h("span", { class: "lico" + (k.done ? " is-done" : "") }, icon(l.icon || "chat"), k.done ? icon("tick", "tickbadge") : null),
      h("span", { class: "ltext" }, h("b", {}, l.title), h("span", { class: "desc" }, l.desc || ""), k.st ? status(k.st) : h("span", { class: "desc mins" }, isNext ? `Up next · ${l.minutes} min` : `${l.minutes} min`)),
      ring(k.pct));
  }
  function moduleBlock(u) {
    const ls = u.lessons, n = ls.filter(l => S.lessons[l.id] && S.lessons[l.id].done).length, pct = Math.round(n / ls.length * 100);
    return h("section", { class: "module" },
      h("div", { class: "mhead" }, h("div", {}, h("span", { class: "eyebrow" }, unitLabel(u)), h("h2", {}, u.title)),
        h("div", { class: "mbar" }, h("div", { class: "bar" }, h("i", { style: `width:${pct}%` })), h("span", { class: "small muted" }, `${n} of ${ls.length} lessons`))),
      h("div", { class: "lessons" }, ls.map(lessonRow)));
  }
  const weekDone = () => { const since = L.startOfDay(now()) - 6 * L.DAY; return Object.values(S.lessons).filter(r => r.done && !r.skipped && (r.doneAt || r.u) >= since).length; };
  const myName = () => { try { return localStorage.getItem("cahier-name") || "Kailash"; } catch { return "Kailash"; } };
  function today() {
    const td = L.dayTotals(S)[L.ymd(now())] || { sec: 0, sessions: 0 }, wk = weekDone(), due = dueCount();
    const tile = (n, label, fn) => h("button", { type: "button", class: "tile", on: { click: fn } }, h("b", {}, n), h("span", {}, label));
    show(
      h("section", { class: "hero" },
        h("div", { class: "hello" },
          h("h1", {}, "Salut, " + myName()),
          h("p", {}, wk ? `You've completed ${wk} ${wk > 1 ? "lessons" : "lesson"} this week.` : "Your first lesson this week is ready."),
          h("button", { type: "button", class: "pill", on: { click: () => go("progress") } }, "View progress")),
        h("div", { class: "tiles" },
          tile(dueCards().length, "Words due", () => go("words")),
          tile(liveMistakes().length, "Mistakes to fix", () => go("mistakes")),
          tile(Math.round(td.sec / 60), "Minutes today", () => go("progress")))),
      h("div", { class: "actions" },
        btn(td.sessions ? "Start another session" : "Start session", () => startSession("full"), "primary"),
        btn(due ? `Quick review · ${due} due` : "Quick review", () => startSession("short"), "quiet")),
      moduleBlock(currentUnit()),
      installEvt ? btn("Install the app on this phone", doInstall, "quiet") : null,
      btn("Settings and backup", settings, "quiet"));
  }
  function progress() {
    tab = "progress"; nav();
    const t = L.dayTotals(S), td = t[L.ymd(now())] || { sec: 0, sessions: 0 }, p = L.pace(S, C.totalHours, now());
    const fin = new Date(p.finish).toLocaleDateString("en-CA", { month: "long", year: "numeric" });
    const strip = h("div", { class: "strip", "aria-label": "Last 14 days" }, Array.from({ length: 14 }, (_, i) => {
      const d = t[L.ymd(now() - (13 - i) * L.DAY)], sec = d ? d.sec : 0;
      return h("i", { "data-n": sec >= 1800 ? 2 : sec > 0 ? 1 : 0, class: i === 13 ? "now" : "" });
    }));
    show(h("h1", {}, "Progress"),
      h("div", { class: "card" },
        h("div", { class: "stats" }, stat(weekDone(), "lessons this week"), stat(p.hours.toFixed(1), `of ${C.totalHours} h`), stat(td.sessions, "sessions today")),
        h("div", { class: "bar" }, h("i", { style: `width:${Math.min(100, p.hours / C.totalHours * 100)}%` })),
        h("p", { class: "small muted" }, p.measured ? `At your recent pace, you'd finish B2 around ${fin}.` : `At 1 hour a day, you'd finish B2 around ${fin}. This updates after 3 study days.`)),
      h("div", { class: "card" }, h("h3", {}, "Last 14 days"), strip, h("p", { class: "small muted" }, "Missed days don't count against you. The plan moves with you.")));
  }
  const stat = (v, l) => h("div", { class: "stat" }, h("b", {}, v), h("span", {}, l));
  async function doInstall() { if (!installEvt) return; installEvt.prompt(); await installEvt.userChoice; installEvt = null; if (tab === "today" && !session) today(); }

  function course() {
    const rows = [];
    UNITS().forEach(u => { rows.push(moduleBlock(u)); if (!unitDone(u)) rows.push(btn(`Quick Check: skip ${unitLabel(u).split(" · ")[1]} if you know it`, () => startSession("check", u), "quiet")); });
    C.levels.forEach(lv => {
      const coming = lv.units.map((t, i) => ({ t, n: i + 1 })).filter(x => !C.units[`${lv.id.toLowerCase()}-u${x.n}`]);
      if (coming.length) rows.push(h("section", { class: "card" },
        h("h3", {}, `${lv.id} · about ${lv.hours} hours`),
        h("div", { class: "list" }, coming.map(x => h("div", { class: "item" }, h("span", {}, `Module ${x.n} · ${x.t}`), status("later"))))));
    });
    show(h("h1", {}, "Course"), rows);
  }

  function words() {
    const fr = h("input", { type: "text", id: "w-fr", lang: "fr", autocomplete: "off", required: true }), en = h("input", { type: "text", id: "w-en", autocomplete: "off", required: true });
    const cards = liveCards().sort((a, b) => a.fr.localeCompare(b.fr, "fr"));
    show(h("h1", {}, "Words"),
      dueCards().length ? btn(`Review ${dueCards().length} due`, () => startSession("cards"), "primary") : h("p", { class: "muted" }, cards.length ? "Nothing is due. Your words will come back when it's time." : "Words appear here after each lesson."),
      h("form", { class: "card", on: { submit: e => { e.preventDefault(); if (!fr.value.trim() || !en.value.trim()) return; addCards([[fr.value.trim(), en.value.trim()]], "own"); save(); words(); nav(); } } },
        h("h3", {}, "Add your own word"), h("label", {}, "French", fr), h("label", {}, "English", en), h("button", { class: "btn", type: "submit" }, "Add word")),
      cards.length ? h("div", { class: "card" }, h("h3", {}, `${cards.length} ${cards.length > 1 ? "words" : "word"}`), h("div", { class: "list" }, cards.map(c => h("div", { class: "item" },
        h("span", {}, h("b", { lang: "fr" }, c.fr), " · " + c.en), h("button", { type: "button", class: "link", "aria-label": "Remove " + c.fr, on: { click: () => { S.cards[c.id] = { ...S.cards[c.id], d: 1, u: now() }; save(); words(); nav(); } } }, "Remove"))))) : null);
  }

  function mistakes() {
    const active = liveMistakes(), fixed = Object.values(S.mistakes).filter(m => m.fixed && !m.d).length;
    show(h("h1", {}, "Mistake book"),
      dueMistakes().length ? btn(`Practice ${dueMistakes().length} due`, () => startSession("mistakes"), "primary") : null,
      h("p", { class: "muted" }, `${active.length} to fix · ${fixed} fixed. Three correct answers in a row fixes a mistake.`),
      active.length ? h("div", { class: "card" }, h("div", { class: "list" }, active.map(m => { const q = qById(m.qid); return h("div", { class: "item" },
        h("span", {}, h("b", {}, q.prompt), h("br"), h("span", { class: "small muted" }, `${m.topic} · You answered: ${m.given || "(blank)"}`)), h("span", { class: "tag" }, `${m.streak}/3`)); }))) : h("p", { class: "muted" }, "Empty for now. Wrong answers land here on their own."));
  }

  function settings() {
    tab = "settings"; nav();
    const a = load(AUTH, null), configured = CFG.supabaseUrl && CFG.supabaseKey, msg = h("p", { class: "small muted", role: "status" });
    const email = h("input", { type: "email", id: "s-email", autocomplete: "email" }), pass = h("input", { type: "password", id: "s-pass", autocomplete: "current-password" });
    const file = h("input", { type: "file", accept: "application/json", hidden: true, on: { change: async e => { try { S = L.merge(S, JSON.parse(await e.target.files[0].text())); save(); msg.textContent = "Backup restored and combined with your progress."; } catch { msg.textContent = "That file isn't a Cahier backup. Choose the .json file you exported."; } } } });
    show(h("h1", {}, "Settings"),
      h("div", { class: "card" }, h("h3", {}, "Cloud sync"),
        !configured ? h("p", { class: "small muted" }, "Not set up yet. Your progress is saved on this device.") :
        a ? [h("p", { class: "small" }, "Signed in as " + a.email), btn("Sync now", () => sync(true).then(() => settings()), "quiet"), btn("Sign out", () => { localStorage.removeItem(AUTH); settings(); setDot("Saved on this device"); }, "quiet")] :
        h("form", { class: "card", style: "border:0;padding:0", on: { submit: e => e.preventDefault() } }, h("label", {}, "Email", email), h("label", {}, "Password (at least 6 characters)", pass),
          h("div", { class: "row" }, btn("Sign in", () => auth("token?grant_type=password", email.value, pass.value, msg), "primary"), btn("Create account", () => auth("signup", email.value, pass.value, msg))))),
      h("div", { class: "card" }, h("label", {}, "Your name on the home screen", h("input", { type: "text", id: "s-name", value: myName(), autocomplete: "given-name", on: { change: e => { try { localStorage.setItem("cahier-name", e.target.value.trim() || "Kailash"); } catch {} } } }))),
      h("div", { class: "card" }, h("h3", {}, "Voice speed"), h("div", { class: "row" }, SPEEDS.map(([label], i) => h("button", { type: "button", class: "btn " + (i === speed ? "primary" : "quiet"), "aria-pressed": i === speed ? "true" : "false", on: { click: () => { setSpeed(i); say("Bonjour, je m'appelle Paul."); settings(); } } }, label)))),
      h("div", { class: "card" }, h("h3", {}, "Backup"), h("p", { class: "small muted" }, "Save a copy of all your progress as a file."),
        btn("Export backup", () => { const u = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: "application/json" })); const l = h("a", { href: u, download: `cahier-backup-${L.ymd(now())}.json` }); l.click(); URL.revokeObjectURL(u); }, "quiet"),
        btn("Restore from a backup", () => file.click(), "quiet"), file, msg),
      window.speechSynthesis ? null : h("p", { class: "note" }, "This browser can't read French aloud."));
  }

  // ---------- Cloud sync ----------
  const setDot = t => { dot.textContent = t; };
  const authHead = a => ({ apikey: CFG.supabaseKey, Authorization: "Bearer " + a.access, "Content-Type": "application/json" });
  async function auth(path, em, pw, msg) {
    try {
      msg.textContent = "One moment…";
      const r = await fetch(`${CFG.supabaseUrl}/auth/v1/${path}`, { method: "POST", headers: { apikey: CFG.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify({ email: em.trim(), password: pw }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.msg || j.error_description || "Check your email and password.");
      if (!j.access_token) { msg.textContent = "Check your email to confirm your account, then sign in."; return; }
      store(AUTH, { email: j.user.email, uid: j.user.id, access: j.access_token, refresh: j.refresh_token, exp: now() + j.expires_in * 1000 });
      await sync(true); settings();
    } catch (e) { msg.textContent = e.message === "Failed to fetch" ? "Couldn't reach the cloud. Check your internet and try again." : e.message; }
  }
  async function fresh(a) {
    if (a.exp - 6e4 > now()) return a;
    const r = await fetch(`${CFG.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: { apikey: CFG.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: a.refresh }) });
    if (!r.ok) throw new Error("signin");
    const j = await r.json(), b = { ...a, access: j.access_token, refresh: j.refresh_token, exp: now() + j.expires_in * 1000 };
    store(AUTH, b); return b;
  }
  let syncT = 0, syncing = false;
  function queueSync() { clearTimeout(syncT); syncT = setTimeout(() => sync(), 3000); }
  async function sync(loud) {
    let a = load(AUTH, null);
    if (!a || !CFG.supabaseUrl) { setDot(window.CAHIER_DEMO ? "Preview · example progress" : "Saved on this device"); return; }
    if (syncing) return; syncing = true;
    try {
      a = await fresh(a);
      const url = `${CFG.supabaseUrl}/rest/v1/cahier_state`;
      const r = await fetch(`${url}?user_id=eq.${a.uid}&select=data`, { headers: authHead(a) });
      if (!r.ok) throw new Error("read");
      const rows = await r.json();
      S = L.merge(S, rows[0] ? rows[0].data : {}); store(KEY, S);
      const w = await fetch(url + "?on_conflict=user_id", { method: "POST", headers: { ...authHead(a), Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ user_id: a.uid, data: S, updated_at: new Date().toISOString() }) });
      if (!w.ok) throw new Error("write");
      setDot("Synced"); nav();
      if (!session && tab !== "settings" && !loud && !view.contains(document.activeElement)) ({ today, course, words, mistakes, progress })[tab]();
    } catch (e) { setDot(e.message === "signin" ? "Sign in again to sync" : "Will sync when online"); }
    syncing = false;
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) sync(); });
  addEventListener("online", () => sync());

  // ---------- Sessions ----------
  // A session is a list of steps. Each step draws itself, then calls next().
  function startSession(mode, lesson) {
    const steps = [], mix = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
    const review = (cn, mn) => { dueCards().slice(0, cn).forEach(c => steps.push({ t: "card", c })); dueMistakes().slice(0, mn).forEach(m => steps.push({ t: "q", q: qById(m.qid), review: m })); };
    const lessonSteps = l => {
      const st = [];
      l.teach.forEach((b, i) => st.push({ t: "teach", b, l, i }));
      if (l.vocab.length) st.push({ t: "vocab", l });
      l.questions.forEach(q => st.push({ t: "q", q, l }));
      st.push({ t: "lessonEnd", l });
      st.forEach((x, k) => { x.k = k; x.n = st.length; }); steps.push(...st);
    };
    if (mode === "full") {
      review(15, 10); const l = nextLesson();
      if (l) lessonSteps(l); else mix(allQ()).slice(0, 12).forEach(q => steps.push({ t: "q", q }));
      steps.push({ t: "skill" });
    } else if (mode === "short") {
      review(20, 10);
      if (!steps.length) { const pool = allQ().filter(q => S.lessons[q.lesson] && S.lessons[q.lesson].done); mix(pool.length ? pool : allQ().filter(q => q.lesson === "l1")).slice(0, 6).forEach(q => steps.push({ t: "q", q })); }
    } else if (mode === "cards") review(50, 0);
    else if (mode === "mistakes") review(0, 50);
    else if (mode === "lesson") lessonSteps(lesson);
    else if (mode === "check") { lesson.quickCheck.forEach(id => steps.push({ t: "q", q: qById(id), check: true })); steps.push({ t: "checkEnd", u: lesson }); }
    session = { mode, steps, i: 0, right: 0, total: 0, start: now(), wrong: 0 };
    lastInput = now(); nav(); step();
  }
  function header() {
    const p = session.steps.length ? session.i / session.steps.length * 100 : 0;
    return h("div", { class: "progress" }, h("div", { class: "bar" }, h("i", { style: `width:${p}%` })), speedBtn(), h("button", { type: "button", class: "close", on: { click: () => endSession() } }, "Exit"));
  }
  // Each tap moves to the next speed and replays the last French line, so you can compare.
  function speedBtn() {
    return h("button", { type: "button", class: "close", "aria-label": "Voice speed: " + SPEEDS[speed][0] + ". Tap to change.", on: { click: e => {
      setSpeed((speed + 1) % SPEEDS.length); e.currentTarget.replaceWith(speedBtn()); if (lastSaid) say(lastSaid);
    } } }, "Voice: " + SPEEDS[speed][0]);
  }
  function next() { session.i++; step(); }
  function step() {
    const s = session.steps[session.i];
    if (!s) return endSession(true);
    // Remember how far into a lesson you got, for its progress ring.
    if (s.l && s.n && s.t !== "lessonEnd") { const r = S.lessons[s.l.id] || {}, pct = Math.round(s.k / s.n * 100); if (!r.done && pct > (r.pct || 0)) { S.lessons[s.l.id] = { ...r, pct, u: now() }; store(KEY, S); } }
    ({ teach: stepTeach, vocab: stepVocab, q: stepQ, card: stepCard, lessonEnd: stepLessonEnd, checkEnd: stepCheckEnd, skill: stepSkill })[s.t](s);
  }
  function endSession(finished) {
    if (finished) { const r = dayRec(); if (now() - session.start > 6e4 || session.total > 0) r.sessions++; r.u = now(); save();
      const m = Math.max(1, Math.round((now() - session.start) / 6e4)), had = session.total, sc = had ? Math.round(session.right / had * 100) : null;
      const done = session; session = null; nav();
      return show(h("div", { class: "card ruled" }, h("h1", {}, "Bien joué !"), h("p", {}, `${m} min${sc != null ? ` · ${sc}% correct` : ""}${done.wrong ? ` · ${done.wrong} added to your mistake book` : ""}`)),
        btn("Start another session", () => startSession("full"), "primary"), btn("Stop for today", () => go("today"), "quiet")); }
    save(); session = null; go("today");
  }
  const exList = ex => h("div", { class: "ex" }, ex.map(([fr, en]) => h("button", { type: "button", lang: "fr", on: { click: () => say(fr) } }, h("span", { class: "play", "aria-hidden": "true" }, "▶"), h("span", { class: "fr" }, fr), h("span", { class: "en", lang: "en" }, en))));
  function stepTeach(s) {
    show(header(), h("div", { class: "card" }, h("span", { class: "chip" }, s.l.title), h("h2", {}, s.b.h), h("p", {}, s.b.p), s.b.ex ? exList(s.b.ex) : null), btn("Continue", next, "primary"));
  }
  function stepVocab(s) {
    show(header(), h("div", { class: "card" }, h("h2", {}, "New words"), h("p", { class: "muted small" }, "Tap to hear each one. They'll go into your flashcards."), exList(s.l.vocab)), btn("Continue", () => { addCards(s.l.vocab, s.l.id); save(); next(); }, "primary"));
  }
  function stepLessonEnd(s) {
    const scored = s.l.questions.length, sc = session.lessonTotal ? Math.round(session.lessonRight / session.lessonTotal * 100) : 0;
    const passed = !s.l.isTest || sc >= 80;
    const old = S.lessons[s.l.id] || {};
    S.lessons[s.l.id] = passed ? { done: 1, score: sc, doneAt: (old.done && old.doneAt) || now(), u: now() } : { ...old, failed: 1, pct: Math.max(old.pct || 0, 90), u: now() };
    save();
    show(header(), h("div", { class: "card ruled" }, h("h2", {}, passed ? "Lesson complete" : "Not quite yet"), h("p", {}, `${sc}% on ${scored} questions.${passed ? "" : " You need 80% to pass. Your mistakes are saved, so review them and try again."}`)), btn("Continue", next, "primary"));
  }
  function stepCheckEnd(st) {
    const sc = Math.round(session.right / session.total * 100), pass = sc >= 80;
    const skip = () => { st.u.lessons.forEach(l => { if (!(S.lessons[l.id] && S.lessons[l.id].done)) S.lessons[l.id] = { done: 1, skipped: 1, u: now() }; addCards(l.vocab, l.id); }); save(); next(); };
    show(h("div", { class: "card ruled" }, h("h2", {}, `Quick Check: ${sc}%`), h("p", {}, pass ? "You know this module well enough to skip it. Its words will still go into your flashcards." : "You need 80% to skip. Start with the lessons. They'll go faster now.")),
      pass ? btn("Skip this module", skip, "primary") : null, btn(pass ? "Do the lessons anyway" : "Back to today", next, pass ? "quiet" : "primary"));
  }
  function stepSkill() {
    const k = C.skills[S.skillN % C.skills.length], ta = k.writing ? h("textarea", { id: "skill-text", rows: 5, lang: "fr", "aria-label": "Your writing" }) : null;
    show(header(), h("div", { class: "card" }, h("span", { class: "chip" }, k.skill), h("h2", {}, k.title), h("p", {}, k.task), k.lines ? exList(k.lines.map(l => [l, "Tap to hear"])) : null, ta),
      btn("Done", () => { S.skillN++; if (ta && ta.value.trim()) S.notes["n-" + now()] = { text: ta.value.trim(), u: now() }; save(); next(); }, "primary"), btn("Skip this time", next, "quiet"));
  }
  function stepCard(s) {
    let shown = false;
    const draw = () => {
      const c = s.c;
      show(header(), h("button", { type: "button", class: "flash", on: { click: () => { say(c.fr); if (!shown) { shown = true; draw(); } } } },
        h("div", {}, h("div", { class: "fr", lang: "fr" }, c.fr), shown ? h("p", {}, c.en) : h("p", { class: "muted" }, "Tap to hear it and see the meaning"))),
        shown ? h("div", { class: "row" }, btn("Didn't know", () => rate(false)), btn("Knew it", () => rate(true), "primary")) : null);
    };
    const rate = knew => { const { id, ...c } = s.c; S.cards[id] = L.reviewCard(c, knew, now()); save(); nav(); next(); };
    draw();
  }

  function stepQ(s) {
    const q = s.q, body = h("div", { class: "card" }), done = (res, given) => feedback(s, q, res, given, body);
    body.append(h("span", { class: "chip" }, s.review ? "Mistake book" : q.topic), h("h2", {}, q.prompt));
    if (q.type === "mc" || q.type === "listen") {
      if (q.say) { body.append(btn("▶ Play", () => say(q.say), "quiet")); setTimeout(() => say(q.say), 200); }
      const o = h("div", { class: "opts" }, q.options.map(t => h("button", { type: "button", class: "opt", lang: "fr", on: { click: e => {
        o.querySelectorAll("button").forEach(b => { b.disabled = true; if (b.textContent === q.answer) b.classList.add("right"); });
        if (t !== q.answer) e.currentTarget.classList.add("wrong");
        done({ result: t === q.answer ? "right" : "wrong", closest: q.answer }, t);
      } } }, t))); body.append(o);
    } else if (q.type === "fill" || q.type === "translate") {
      const i = h("input", { type: "text", id: "ans", lang: "fr", autocomplete: "off", autocapitalize: "none", spellcheck: "false", "aria-label": "Your answer" });
      const check = () => { if (!i.value.trim()) return i.focus(); i.disabled = true; f.remove(); done(L.mark(i.value, accepted(q), q.strict), i.value.trim()); };
      const f = h("div", { class: "card", style: "padding:0;border:0" }, h("div", { class: "keys" }, "éèêàçùôî".split("").map(ch => h("button", { type: "button", lang: "fr", on: { pointerdown: e => { e.preventDefault(); const a = i.selectionStart ?? i.value.length; i.value = i.value.slice(0, a) + ch + i.value.slice(a); i.setSelectionRange(a + 1, a + 1); i.focus(); } } }, ch))), btn("Check", check, "primary"));
      i.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); check(); } });
      body.append(q.type === "fill" ? h("div", { class: "fill", lang: "fr" }, q.before ? h("span", {}, q.before) : null, i, q.after ? h("span", {}, q.after) : null) : i, f);
    } else if (q.type === "order") {
      const pool = q.words.map((w, id) => ({ w, id })).sort(() => Math.random() - .5), sel = [], a = h("div", { class: "slots", "aria-label": "Your sentence" }), b = h("div", { class: "chips" });
      const ch = h("div", {}, btn("Check", () => { ch.remove(); [...b.children].forEach(x => x.disabled = true); const given = sel.map(x => x.w).join(" "); done(L.mark(given, q.accepted, true), given); }, "primary"));
      const r = () => { a.replaceChildren(...sel.map(x => h("button", { type: "button", class: "word", lang: "fr", on: { click: () => { sel.splice(sel.indexOf(x), 1); pool.push(x); r(); } } }, x.w))); b.replaceChildren(...pool.map(x => h("button", { type: "button", class: "word", lang: "fr", on: { click: () => { pool.splice(pool.indexOf(x), 1); sel.push(x); r(); } } }, x.w))); ch.querySelector("button").disabled = !!pool.length; };
      body.append(a, b, ch); r();
    } else if (q.type === "match") {
      let pick = null, miss = false, left = q.pairs.length;
      const mk = (t, key, side) => h("button", { type: "button", class: "opt", lang: side === "l" ? "fr" : "en", "data-k": key, on: { click: e => {
        const b = e.currentTarget;
        if (!pick || pick.dataset.side === side) { if (pick) pick.classList.remove("sel"); pick = b; b.dataset.side = side; b.classList.add("sel"); return; }
        if (pick.dataset.k === key) { [pick, b].forEach(x => { x.classList.remove("sel"); x.classList.add("right", "gone"); x.disabled = true; }); pick = null; if (!--left) done({ result: miss ? "wrong" : "right", closest: q.pairs.map(p => p.join(" = ")).join(", ") }, "Pairs mixed up"); }
        else { miss = true; pick.classList.remove("sel"); pick = null; b.classList.add("wrong"); setTimeout(() => b.classList.remove("wrong"), 450); }
      } } }, t);
      const shuf = a => [...a].sort(() => Math.random() - .5);
      body.append(h("div", { class: "match" }, h("div", {}, shuf(q.pairs).map(p => mk(p[0], p[0], "l"))), h("div", {}, shuf(q.pairs).map(p => mk(p[1], p[0], "r")))));
    }
    show(header(), body);
    const inp = body.querySelector("#ans"); if (inp) inp.focus();
  }
  function count(s, ok) {
    if (s.review) { const { id, ...m } = s.review; S.mistakes[id] = L.reviewMistake(m, ok, now()); }
    session.total++; if (ok) session.right++;
    if (s.l) { session.lessonTotal = (session.lessonTotal || 0) + 1; if (ok) session.lessonRight = (session.lessonRight || 0) + 1; }
    save();
  }
  function feedback(s, q, res, given, body) {
    const typed = q.type === "fill" || q.type === "translate", nextBtn = t => btn(t || "Continue", next, "primary");
    const fresh = !s.review, wrongAdd = () => { if (fresh) { addMistake(q, given, "wrong"); session.wrong++; } };
    let box;
    if (res.result === "right") { count(s, true); box = h("div", { class: "fb right" }, h("b", {}, "Correct"), h("span", {}, q.why)); }
    else if (res.result === "wrong") {
      count(s, false); wrongAdd();
      box = h("div", { class: "fb wrong" }, h("b", {}, "Not this time"), typed || q.type === "order" ? h("span", {}, "Correct answer: ", h("b", { lang: "fr", style: "display:inline" }, res.closest)) : null, h("span", {}, q.why), fresh ? h("span", { class: "small" }, "Added to your mistake book.") : null,
        typed ? h("button", { type: "button", class: "link", on: { click: e => { allow(q, given); session.right++; if (s.l) session.lessonRight = (session.lessonRight || 0) + 1; session.wrong = Math.max(0, session.wrong - (fresh ? 1 : 0)); e.currentTarget.replaceWith(h("span", { class: "small" }, "Saved as an accepted answer.")); } } }, "Count mine as correct") : null);
    } else {
      const ans = choice => { count(s, !choice); if (choice) { if (fresh) { addMistake(q, given, res.kind); session.wrong++; } } a.replaceWith(nextBtn()); };
      const a = h("div", { class: "row" }, btn("Add it", () => ans(true)), btn("No, move on", () => ans(false), "primary"));
      box = h("div", { class: "fb slip" }, h("b", {}, `Almost. Check the ${res.kind === "accent" ? "accent" : "spelling"}.`), h("span", {}, "You wrote: " + given), h("span", {}, "Correct: ", h("b", { lang: "fr", style: "display:inline" }, res.closest)), h("span", {}, "Add this to your mistake book?"), a);
      body.append(box); return;
    }
    body.append(box); view.append(nextBtn());
    view.lastChild.scrollIntoView({ block: "nearest" });
  }

  // ---------- Start ----------
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if (tab === "today" && !session) today(); });
  if ("serviceWorker" in navigator) {
    // When a new version takes over, reload once to show it, unless you're in the middle of a session.
    const hadOld = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadOld && !session) location.reload(); });
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(r => r.update()).catch(() => {});
  }
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  window.speechSynthesis && window.speechSynthesis.getVoices();
  go("today"); sync();
  window.__cahier = { get state() { return S; } };
})();
