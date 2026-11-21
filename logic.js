// Pure logic: marking, spaced review, syncing, and pace. Has no screen code, so it can be tested alone.
(function (root) {
  const GRAMMAR = new Set(["le","la","les","l","un","une","des","du","de","je","tu","il","elle","on","nous","vous","ils","elles","suis","es","est","sommes","êtes","etes","sont","ma","mon","mes","ta","ton","tes","sa","son","ses","ce","cet","cette","ces","et","ou","où","a","à"]);
  const clean = s => String(s || "").normalize("NFC").replace(/[’ʼ]/g, "'").toLowerCase().replace(/\s+([?!.,:;])/g, "$1").replace(/[?!.,:;]+$/g, "").replace(/\s+/g, " ").trim();
  const bare = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  function lev(a, b) {
    const d = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i;
      for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = t; } }
    return d[b.length];
  }
  // A change between two grammar words (le/la, es/est) is a real mistake, never a typo.
  function grammarChanged(a, b) {
    const x = a.split(/[ ']/), y = b.split(/[ ']/);
    if (x.length !== y.length) return x.some(w => GRAMMAR.has(w) && !y.includes(w)) || y.some(w => GRAMMAR.has(w) && !x.includes(w));
    return x.some((w, i) => w !== y[i] && (GRAMMAR.has(w) || GRAMMAR.has(y[i])));
  }
  // Returns {result:"right"|"slip"|"wrong", closest}
  function mark(given, accepted, strict) {
    const g = clean(given), list = accepted.map(clean);
    if (!g) return { result: "wrong", closest: accepted[0] };
    const hit = list.indexOf(g);
    if (hit >= 0) return { result: "right", closest: accepted[hit] };
    let bi = 0, bd = Infinity;
    list.forEach((a, i) => { const n = lev(g, a); if (n < bd) { bd = n; bi = i; } });
    const best = list[bi], closest = accepted[bi];
    if (strict || grammarChanged(g, best)) return { result: "wrong", closest };
    if (bare(g) === bare(best)) return { result: "slip", closest, kind: "accent" };
    if (best.length >= 4 && bd <= (best.length >= 8 ? 2 : 1)) return { result: "slip", closest, kind: "spelling" };
    return { result: "wrong", closest };
  }
  const DAY = 864e5;
  const ymd = t => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const startOfDay = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  // Flashcards: a word comes back after longer and longer gaps while you know it.
  function reviewCard(c, knew, now) {
    const out = { ...c, u: now };
    if (knew) { out.int = c.int ? Math.ceil(c.int * 2.3) : 1; out.reps = (c.reps || 0) + 1; }
    else { out.int = 0; out.reps = 0; }
    out.due = startOfDay(now) + Math.max(out.int, 1) * DAY;
    return out;
  }
  // Mistakes: three correct answers in a row, days apart, and it counts as fixed.
  const GAPS = [1, 3, 7];
  function reviewMistake(m, right, now) {
    const out = { ...m, u: now };
    if (right) { out.streak = (m.streak || 0) + 1; if (out.streak >= 3) out.fixed = now; else out.due = startOfDay(now) + GAPS[out.streak] * DAY; }
    else { out.streak = 0; out.fixed = 0; out.due = startOfDay(now) + DAY; }
    return out;
  }
  // Each record carries the time it changed, so the newest one wins on each device.
  const MAPS = ["lessons", "cards", "mistakes", "accept", "days", "notes", "quiz", "xp", "speed"];
  function merge(a, b) {
    const out = { v: 1 }; a = a || {}; b = b || {};
    for (const k of MAPS) { const m = { ...(a[k] || {}) };
      for (const [id, r] of Object.entries(b[k] || {})) if (!m[id] || (r.u || 0) > (m[id].u || 0)) m[id] = r;
      out[k] = m; }
    const st = [a.start, b.start].filter(Boolean); out.start = st.length ? Math.min(...st) : Date.now();
    out.skillN = Math.max(a.skillN || 0, b.skillN || 0);
    return out;
  }
  const dayTotals = s => { const t = {}; for (const [k, r] of Object.entries(s.days || {})) { const d = k.split("|")[0]; t[d] = t[d] || { sec: 0, sessions: 0 }; t[d].sec += r.sec || 0; t[d].sessions += r.sessions || 0; } return t; };
  // Uses your real pace from the last 14 days. With under 3 study days, it assumes 1 hour a day.
  function pace(s, totalHours, now) {
    const t = dayTotals(s), hours = Object.values(t).reduce((n, d) => n + d.sec, 0) / 3600;
    let recent = 0, active = 0;
    for (let i = 0; i < 14; i++) { const d = t[ymd(now - i * DAY)]; if (d && d.sec > 0) { recent += d.sec / 3600; active++; } }
    const measured = active >= 3, perDay = measured ? Math.max(recent / 14, 1 / 60) : 1;
    return { hours, measured, perDay, finish: now + (Math.max(totalHours - hours, 0) / perDay) * DAY };
  }
  // Seeded shuffle, so the app and the PDFs build the same quizzes.
  function seeded(seed) { let x = 2166136261; for (const c of String(seed)) x = Math.imul(x ^ c.charCodeAt(0), 16777619); return () => { x = Math.imul(x ^ (x >>> 15), 2246822507) ^ Math.imul(x ^ (x >>> 13), 3266489909); return (x >>> 0) / 4294967296; }; }
  function shuffle(a, seed) { const r = seeded(seed), b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  // Splits a module's questions into quiz sets with a mix of every question type.
  // Listening is left out so each quiz matches its printed PDF.
  const QUIZ_TYPES = ["match", "mc", "fill", "order", "translate"];
  function quizSets(unit, n = 3) {
    const pool = unit.lessons.flatMap((l, li) => l.questions.filter(q => q.type !== "listen").map(q => ({ ...q, lesson: l.id, lessonNo: li + 1 })));
    const sets = Array.from({ length: n }, () => []); let k = 0;
    QUIZ_TYPES.forEach(t => shuffle(pool.filter(q => q.type === t), unit.id + "|" + t).forEach(q => sets[k++ % n].push(q)));
    return sets.map((questions, i) => ({ id: unit.id + "-quiz-" + "ABCDEF"[i], name: "Quiz " + "ABCDEF"[i], questions }));
  }
  // ---------- Points and levels ----------
  // Each level needs 50 more points than the one before: 100, 150, 200…
  const LEVEL_NAMES = [[1, "Débutant"], [3, "Apprenti"], [6, "Explorateur"], [10, "Voyageur"], [15, "Bavard"], [20, "Francophone"], [30, "Expert"]];
  function levelInfo(total) {
    let level = 1, start = 0, need = 100;
    while (total >= start + need) { start += need; level++; need += 50; }
    const name = LEVEL_NAMES.filter(([n]) => level >= n).pop()[1];
    return { level, name, into: total - start, need, total };
  }
  // Points are stored per day and device, so phone and laptop never overwrite each other.
  function xpByDay(s) { const t = {}; for (const [k, r] of Object.entries(s.xp || {})) { const d = k.split("|")[0]; t[d] = (t[d] || 0) + (r.pts || 0); } return t; }
  const xpTotal = s => Object.values(s.xp || {}).reduce((n, r) => n + (r.pts || 0), 0);
  function weekStart(t) { const d = new Date(startOfDay(t)); return d.getTime() - ((d.getDay() + 6) % 7) * DAY; }
  function weekPoints(s, now) {
    const by = xpByDay(s), ws = weekStart(now), sum = (a, b) => { let n = 0; for (let t = a; t < b; t += DAY) n += by[ymd(t + DAY / 2)] || 0; return n; };
    return { thisWeek: sum(ws, ws + 7 * DAY), lastWeek: sum(ws - 7 * DAY, ws) };
  }
  // ---------- Speed round questions ----------
  const PRON = [["je", 0], ["tu", 1], ["il", 2], ["elle", 2], ["on", 2], ["nous", 3], ["vous", 4], ["ils", 5], ["elles", 5]];
  const pick = (a, r) => a[Math.floor(r() * a.length)];
  function distinctOptions(answer, pool, r, n = 4) {
    const others = shuffle([...new Set(pool.filter(x => x !== answer))], String(r()));
    return shuffle([answer, ...others.slice(0, n - 1)], String(r()));
  }
  function verbQuestion(verbs, r) {
    const [inf, forms] = pick(Object.entries(verbs), r), [pron, i] = pick(PRON, r), answer = forms[i];
    const p = pron === "je" && /^[aeiouéèêh]/i.test(answer) ? "j'" : pron;
    return { prompt: `${p} ___`, sub: inf, answer, options: distinctOptions(answer, forms, r), full: `${p}${p.endsWith("'") ? "" : " "}${answer}` };
  }
  function wordQuestion(vocab, r) {
    const [fr, en] = pick(vocab, r);
    return { prompt: fr, sub: "What does it mean?", answer: en, options: distinctOptions(en, vocab.map(v => v[1]), r), full: `${fr} = ${en}`, say: fr };
  }
  function numberQuestion(words, r) {
    const n = Math.floor(r() * words.length), near = [n - 1, n + 1, n + 10, n - 10, (n + 3) % words.length].filter(x => x >= 0 && x < words.length).map(String);
    return { prompt: words[n], sub: "Which number is it?", answer: String(n), options: distinctOptions(String(n), near.length >= 3 ? near : words.map((_, i) => String(i)), r), full: `${words[n]} = ${n}`, say: words[n] };
  }
  // Combo: 3 right in a row doubles points, 6 triples them.
  const comboMult = c => c >= 6 ? 3 : c >= 3 ? 2 : 1;
  root.Logic = { levelInfo, xpByDay, xpTotal, weekStart, weekPoints, verbQuestion, wordQuestion, numberQuestion, comboMult, seeded, shuffle, quizSets, QUIZ_TYPES, clean, bare, lev, mark, reviewCard, reviewMistake, merge, pace, dayTotals, ymd, startOfDay, DAY };
})(typeof window !== "undefined" ? window : globalThis);
