// Builds a printable paper workbook for a module: one sitting per day, each ending at a STOP line.
const fs = require('fs'), { chromium } = require('playwright');
const R = '/home/claude/cahier/';
global.window = {}; for (const f of ['content.js', 'content-a1.js']) eval(fs.readFileSync(R + f, 'utf8'));
const C = window.COURSE, font = f => fs.readFileSync(R + 'fonts/' + f).toString('base64');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tidy = s => s.replace(/ ([.,])/g, '$1');
function rng(seed) { let h = 2166136261; for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296; }
const shuffle = (a, seed) => { const r = rng(seed), b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
function question(q, no, key) {
  let html = '', ans = '';
  if (q.type === 'match') {
    const right = shuffle(q.pairs.map(p => p[1]), q.id);
    html = `<p class="prompt">${esc(q.prompt)}</p><div class="match"><ol class="l">${q.pairs.map(p => `<li><span lang="fr">${esc(p[0])}</span><i></i></li>`).join('')}</ol><ol class="r">${right.map(t => `<li><i></i><span>${esc(t)}</span></li>`).join('')}</ol></div>`;
    ans = q.pairs.map(p => `${esc(p[0])} = ${esc(p[1])}`).join(' · ');
  } else if (q.type === 'mc') {
    html = `<p class="prompt" lang="fr">${esc(q.prompt)}</p><ul class="opts">${q.options.map(o => `<li><i></i><span lang="fr">${esc(o)}</span></li>`).join('')}</ul>`; ans = esc(q.answer);
  } else if (q.type === 'fill') {
    html = `<p class="hint">${esc(q.prompt)}</p><p class="sent" lang="fr">${esc(q.before)}<span class="blank"></span>${esc(q.after)}</p>`; ans = `${esc(q.before)}<b>${esc(q.accepted[0])}</b>${esc(q.after)}`;
  } else if (q.type === 'order') {
    html = `<p class="hint">Put in order: ${esc(q.prompt.replace(/^Build: /, ''))}</p><p class="tiles" lang="fr">${shuffle(q.words, q.id + 'w').map(x => `<span>${esc(x)}</span>`).join('')}</p><div class="lines"><i></i></div>`; ans = esc(tidy(q.accepted[0]));
  } else if (q.type === 'translate') {
    html = `<p class="hint">Write in French: ${esc(q.prompt.replace(/^Write (the word )?in French: /, ''))}</p><div class="lines"><i></i></div>`; ans = esc(q.accepted[0]);
  }
  key.push(`<li value="${no}">${ans}</li>`);
  return `<li class="q" value="${no}">${html}</li>`;
}
const CSS = `
@font-face{font-family:YS;src:url(data:font/woff2;base64,${font('young-serif-latin-400-normal.woff2')})}
@font-face{font-family:AH;src:url(data:font/woff2;base64,${font('atkinson-hyperlegible-latin-400-normal.woff2')})}
@font-face{font-family:AH;font-weight:700;src:url(data:font/woff2;base64,${font('atkinson-hyperlegible-latin-700-normal.woff2')})}
:root{--ink:#1B1B1B;--soft:#5f5750;--line:#cfc6bd;--accent:#FC6E20;--cream:#FFF3E7}
*{box-sizing:border-box}body{margin:0;font:12.5pt/1.45 AH,sans-serif;color:var(--ink)}
h1,h2,h3{font-family:YS,serif;font-weight:400;margin:0;break-after:avoid}
.eyebrow{font-size:9.5pt;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);font-weight:700}
.muted{color:var(--soft);font-size:10.5pt;margin:2px 0 8px}
article{break-before:page}article:first-child{break-before:auto}
.cover .big{font-size:38pt;line-height:1.1;margin:6px 0 18px}
.rules{border:2px solid var(--ink);border-radius:14px;padding:14px 18px;margin-bottom:18px}.rules h2{font-size:16pt;margin-bottom:6px}.rules ol{margin:0;padding-left:20px;display:grid;gap:5px}
.cover>h2{font-size:18pt;margin:6px 0}
.track{width:100%;border-collapse:collapse;font-size:11pt}.track th,.track td{border-bottom:1px solid var(--line);padding:8px 6px;text-align:left}.track th{font-size:9.5pt;color:var(--soft);text-transform:uppercase;letter-spacing:.06em}
.track td:first-child{font-weight:700;color:var(--accent);width:24px}.track td:nth-child(3){width:90px}.track td:nth-child(4){width:50px}.track td:nth-child(5){width:110px}
.track i,.today i{display:inline-block;width:15px;height:15px;border:1.6px solid var(--ink);border-radius:3px;vertical-align:-2px}
.why{margin:18px 0 0}
.dhead{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;border-bottom:2.5px solid var(--ink);padding-bottom:10px}
.dhead h1{font-size:24pt;line-height:1.1}
.meta{display:grid;gap:6px;font-size:10pt;min-width:170px}.meta div{display:flex;gap:8px;align-items:flex-end}.meta span{flex:1;border-bottom:1.2px solid var(--ink);height:1.2em}
.today{margin:10px 0 6px;background:var(--cream);border-radius:12px;padding:10px 14px;font-size:11pt;display:grid;gap:4px}
.today ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:4px 16px}.today li{display:flex;gap:6px;align-items:center}.today>span{color:var(--soft);font-size:9.5pt}
.step{display:flex;align-items:center;gap:10px;font-size:17pt;margin:16px 0 6px}
.step span{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;font:700 12pt AH,sans-serif}
.block{break-inside:avoid;margin:6px 0 10px}.block h3{font-size:13.5pt;margin-bottom:2px}.block p{margin:0 0 4px}
.ex{border-collapse:collapse;margin:2px 0 0 0;font-size:11.5pt}.ex td{padding:2px 18px 2px 0;vertical-align:top}.ex td:first-child{font-weight:700;white-space:nowrap}.ex td:last-child{color:var(--soft)}
.copy{width:100%;border-collapse:collapse}.copy td{border-bottom:1.3px solid var(--line);height:34px;vertical-align:bottom;padding:2px 6px}
.copy td:first-child{width:36%}.copy small{display:block;color:var(--soft);font-size:9pt}.copy tr{break-inside:avoid}
.qs{margin:0;padding-left:28px}.q{break-inside:avoid;padding:6px 0 8px;border-bottom:1px dotted var(--line)}.q::marker{font-weight:700;color:var(--accent)}
.prompt{margin:0 0 5px;font-weight:700}.hint{margin:0 0 4px;color:var(--soft);font-style:italic}
.opts{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:5px 18px}
.opts li{display:flex;gap:10px;align-items:center}.opts i{flex:none;width:16px;height:16px;border:1.8px solid var(--ink);border-radius:50%}
.sent{margin:0;font-size:15pt}.blank{display:inline-block;width:140px;border-bottom:1.8px solid var(--ink);margin:0 6px;height:1em}
.tiles{margin:2px 0 6px;display:flex;flex-wrap:wrap;gap:8px}.tiles span{border:1.5px solid var(--ink);border-radius:8px;padding:1px 11px;background:var(--cream);font-size:13pt}
.lines i{display:block;height:38px;border-bottom:1.4px solid var(--ink)}
.items{margin:0;padding-left:22px;columns:2;column-gap:30px}.items li{display:flex;gap:10px;align-items:flex-end;margin-bottom:10px;break-inside:avoid}.items span{min-width:90px}.items i{flex:1;border-bottom:1.4px solid var(--ink);height:1.3em}
.match{display:grid;grid-template-columns:1fr 1fr;gap:0 80px;font-size:13pt}.match ol{margin:0;padding:0;list-style:none;display:grid;gap:10px}
.match li{display:flex;align-items:center;gap:10px}.match .l li{justify-content:space-between}.match i{flex:none;width:11px;height:11px;border-radius:50%;background:var(--ink)}
.stop{break-inside:avoid;margin-top:18px;display:flex;justify-content:space-between;align-items:center;gap:16px;background:var(--accent);color:#1B1B1B;border-radius:14px;padding:14px 18px}
.stop b{font:26pt YS,serif;display:block;line-height:1}.stop span{font-weight:700}
.feel{font-size:10.5pt;font-weight:700;display:flex;gap:6px;align-items:center}.feel i{font-style:normal;width:24px;height:24px;border-radius:50%;border:1.8px solid #1B1B1B;display:grid;place-items:center;background:#fff}
.cards h1,.keyp h1{font-size:24pt}.cgrid{display:grid;grid-template-columns:1fr;border-top:1.5px dashed var(--ink)}
.card{display:grid;grid-template-columns:1fr 1fr;border-bottom:1.5px dashed var(--ink);height:19mm;break-inside:avoid}
.card span{display:grid;place-items:center;text-align:center;padding:0 10px;font-size:15pt}.card span:first-child{border-right:1.5px solid var(--ink);font-family:YS,serif;font-size:17pt}
.keyp{columns:2;column-gap:28px;font-size:10.5pt}.keyp>h1,.keyp>p{column-span:all}.kday{break-inside:avoid-column;margin-bottom:12px}.kday h3{font-size:12.5pt;color:var(--accent)}.kday ol{padding-left:22px;margin:4px 0}.kday li{margin-bottom:3px}

.big{border-left:5px solid var(--accent);background:var(--cream);padding:10px 14px;border-radius:0 12px 12px 0;margin:10px 0;font-size:13pt}
.big b{display:block;font-size:9.5pt;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
.ex3{border-collapse:collapse;width:100%;font-size:11.5pt;margin-top:3px}.ex3 td{padding:3px 10px 3px 0;vertical-align:top;border-bottom:1px solid #eee5dc}
.ex3 td:first-child{font-weight:700;width:38%}.ex3 td:nth-child(2){color:var(--soft)}.ex3 td:nth-child(3){font-style:italic;color:var(--accent);width:24%;white-space:nowrap}
.ex3 tr{break-inside:avoid}
.watch{break-inside:avoid;border:2px solid var(--accent);border-radius:12px;padding:10px 14px;margin:14px 0}.watch h3{font-size:13.5pt;margin-bottom:4px}.watch ul{margin:0;padding-left:18px;display:grid;gap:3px}
.sum{break-inside:avoid;margin:14px 0}.sum h3{font-size:13.5pt;margin-bottom:4px}.sum table{border-collapse:collapse;width:100%;font-size:11.5pt}
.sum th{text-align:left;font-size:9.5pt;text-transform:uppercase;letter-spacing:.06em;color:var(--soft);border-bottom:2px solid var(--ink);padding:3px 8px}
.sum td{border-bottom:1px solid var(--line);padding:5px 8px;height:28px}.sum td:first-child{font-weight:700;width:45%}
.sum table{table-layout:fixed}.sum.recall{break-inside:auto}.sum tr{break-inside:avoid}.sum th:first-child{width:45%}
.notes,.stop{clear:both}
.checkq{margin:0;padding-left:24px}.checkq li{break-inside:avoid;margin-bottom:6px}.checkq .lines i{height:32px}
.pkey{display:grid;grid-template-columns:repeat(2,1fr);gap:4px 20px;font-size:10.5pt;border:1.5px solid var(--line);border-radius:12px;padding:10px 14px;margin-top:14px}
.pkey h3{grid-column:1/-1;font-size:13pt}.pkey b{display:inline-block;min-width:34px;color:var(--accent)}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:6px}.cols div{border:1.5px solid var(--ink);border-radius:10px;padding:6px 10px}.cols b{display:block;border-bottom:1px solid var(--line);padding-bottom:3px}.cols i{display:block;height:30px;border-bottom:1px solid var(--line)}
.wordbank{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 6px}.wordbank span{border:1.5px solid var(--ink);border-radius:8px;padding:1px 10px;background:var(--cream)}
.daytype{display:inline-block;margin-left:8px;padding:1px 9px;border-radius:99px;font-size:9pt;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:3px}
.daytype.learn{background:var(--ink);color:#fff}.daytype.practice{background:var(--accent);color:#1B1B1B}.daytype.test{border:1.5px solid var(--ink)}
.notes{margin-top:10px}.notes .lines i{height:30px}
`;

const M = require('/home/claude/cahier/workbooks/src/m1.js');
async function build(unitKey, n, browser) {
  const u = C.units[unitKey], L1 = M.lessons, keys = [], days = [];
  u.lessons.forEach(l => { if (l.isTest) days.push({ type: 'test', l }); else { days.push({ type: 'learn', l }); days.push({ type: 'practice', l }); } });
  const total = days.length;
  const exRows = ex => `<table class="ex3">${ex.map(([fr, en, say]) => `<tr><td lang="fr">${esc(fr)}</td><td>${esc(en)}</td><td>${esc(say || '')}</td></tr>`).join('')}</table>`;
  const task = (x, no, key) => {
    key.push(`<li value="${no}">${esc(x.key)}</li>`);
    let body;
    if (x.cols) body = `<p class="wordbank" lang="fr">${x.items.map(i => `<span>${esc(i)}</span>`).join('')}</p><div class="cols">${x.cols.map(c => `<div><b>${esc(c)}</b>${'<i></i>'.repeat(Math.ceil(x.items.length / 2) + 1)}</div>`).join('')}</div>`;
    else if (x.items) body = `<ol class="items" type="a">${x.items.map(i => `<li><span lang="fr">${esc(i)}</span><i></i></li>`).join('')}</ol>`;
    else body = `<div class="lines">${'<i></i>'.repeat(x.lines)}</div>`;
    return `<li class="q" value="${no}"><p class="prompt">${esc(x.task)}</p>${body}</li>`;
  };
  const stop = d => `<div class="stop"><div><b>STOP</b><span>Jour ${d} done. Stand up. Tomorrow starts here.</span></div><div class="feel">How did it go? <i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div></div>`;
  const head = (d, type, title, steps, mins) => `<header class="dhead"><div><div class="eyebrow">Module ${n} · Jour ${d} of ${total}<span class="daytype ${type}">${type === 'learn' ? 'Learn' : type === 'practice' ? 'Practice' : 'Test'}</span></div><h1>${esc(title)}</h1></div>
    <div class="meta"><div><b>Date</b><span></span></div><div><b>Start</b><span></span></div><div><b>Finish</b><span></span></div></div></header>
    <div class="today"><b>Today, from here to the STOP line:</b><ul>${steps.map(s => `<li><i></i>${s}</li>`).join('')}</ul><span>About ${mins} minutes</span></div>`;
  const pages = days.map((day, i) => {
    const d = i + 1, l = day.l, X = L1[l.id] || {}, key = []; let no = 0;
    if (day.type === 'learn') {
      const secs = X.sections.map(s => `<div class="block"><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p>${s.ex.length ? exRows(s.ex) : ''}</div>`).join('');
      const watch = `<div class="watch"><h3>Watch out</h3><ul>${X.watch.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>`;
      const sum = `<div class="sum"><h3>Summary · ${esc(X.summary.title)}</h3><table><tr>${X.summary.head.map(t => `<th>${esc(t)}</th>`).join('')}</tr>${X.summary.rows.map(r => `<tr><td lang="fr">${esc(r[0])}</td><td lang="fr">${esc(r[1])}</td></tr>`).join('')}</table></div>`;
      const check = `<h2 class="step"><span>2</span>Quick check</h2><p class="muted">Answer without looking back. The answers are in the key.</p><ol class="checkq">${X.check.map(c => { key.push(`<li>${esc(c.a)}</li>`); return `<li><b>${esc(c.q)}</b><div class="lines"><i></i></div></li>`; }).join('')}</ol>`;
      const blank = `<h2 class="step"><span>3</span>Fill in the summary from memory</h2><p class="muted">Cover the summary above, then fill in the right-hand column. Check it, and fix anything you missed.</p><div class="sum recall"><table><tr>${X.summary.head.map(t => `<th>${esc(t)}</th>`).join('')}</tr>${X.summary.rows.map(r => `<tr><td lang="fr">${esc(r[0])}</td><td></td></tr>`).join('')}</table></div>`;
      const notes = `<div class="notes"><h3>My notes</h3><div class="lines">${'<i></i>'.repeat(3)}</div></div>`;
      keys.push(`<section class="kday"><h3>Jour ${d} · Learn · ${esc(l.title)}</h3><ol>${key.join('')}</ol><p class="muted">Summary: compare with the box on the same day.</p></section>`);
      return `<article class="day">${head(d, 'learn', l.title, ['Read and say the examples aloud', 'Read the watch-outs', 'Quick check', 'Fill in the summary from memory'], '35–40')}
        <div class="big"><b>The big idea</b>${esc(X.big)}</div><h2 class="step"><span>1</span>Read</h2>${secs}${watch}${sum}${check}${blank}${notes}${stop(d)}</article>`;
    }
    const qs = l.questions.filter(q => q.type !== 'listen');
    const copy = l.vocab.length ? `<h2 class="step"><span>1</span>Copy the new words</h2><p class="muted">Write each French word twice, and say it out loud as you write.</p><table class="copy">${l.vocab.map(([fr, en]) => `<tr><td lang="fr"><b>${esc(fr)}</b><small>${esc(en)}</small></td><td></td><td></td></tr>`).join('')}</table>` : '';
    const sn = l.vocab.length ? 1 : 0;
    const ex = `<h2 class="step"><span>${sn + 1}</span>${day.type === 'test' ? 'Module test' : 'Practice'}</h2>${day.type === 'test' ? `<p class="muted">One go, no looking back. One point per question. 80% or more means Module ${n} is done.</p>` : ''}<ol class="qs">${qs.map(q => question(q, ++no, key)).join('')}</ol>`;
    const write = `<h2 class="step"><span>${sn + 2}</span>${day.type === 'test' ? 'Write it yourself (not scored)' : 'Write it yourself'}</h2><ol class="qs">${(X.practice || []).map(x => task(x, ++no, key)).join('')}</ol>`;
    keys.push(`<section class="kday"><h3>Jour ${d} · ${day.type === 'test' ? 'Module test' : 'Practice · ' + esc(l.title)}</h3><ol>${key.join('')}</ol></section>`);
    const steps = day.type === 'test' ? ['Do the test', 'Write it yourself', 'Check with the key', 'Tick the tracker'] : ['Copy the new words', 'Do the practice', 'Write it yourself', 'Check with the key'];
    return `<article class="day">${head(d, day.type, day.type === 'test' ? 'Module test' : l.title, steps, day.type === 'test' ? '30–40' : '35–40')}${copy}${ex}${write}${stop(d)}</article>`;
  }).join('');
  const vocabAll = u.lessons.flatMap(l => l.vocab);
  const cards = `<article class="cards"><h1>Flashcards</h1><p class="muted">Cut along the dashed lines. Fold each card in half on the solid line, with French on one side and English on the other.</p>
    <div class="cgrid">${vocabAll.map(([fr, en]) => `<div class="card"><span lang="fr">${esc(fr)}</span><span>${esc(en)}</span></div>`).join('')}</div></article>`;
  const cover = `<article class="cover"><div class="eyebrow">Cahier · A1 · Paper workbook</div><h1 class="big" style="border:0;background:none;padding:0;font-size:38pt">Module ${n}<br>${esc(u.title)}</h1>
    <div class="rules"><h2>How to use this workbook</h2><ol>
      <li><b>One day = one sitting.</b> About 35–40 minutes at a table, not in bed.</li>
      <li><b>Learn days and Practice days take turns.</b> A Learn day teaches a topic. The Practice day after it uses it.</li>
      <li><b>Phone in another room.</b> Music is fine, ideally without words.</li>
      <li><b>Start at the top of the day and stop at the STOP line.</b> Even if you feel you could do more, stop. Ending on a win makes tomorrow easier.</li>
      <li><b>Use a pencil.</b> Check your answers with the key at the back, then fix mistakes in another colour.</li>
      <li><b>Missed a day?</b> Just do the next one. Don't do two at once.</li></ol></div>
    <div class="pkey"><h3>Reading the pronunciation guides</h3>${M.key.map(([k, v]) => `<div><b>${esc(k)}</b>${esc(v)}</div>`).join('')}<div style="grid-column:1/-1;color:var(--soft)">These are close English sounds, not exact. To hear a word, open that lesson in the app for a minute, then come back to paper.</div></div></article>
    <article><h1 style="font-size:24pt;margin-bottom:8px">My tracker</h1><table class="track"><tr><th></th><th>Day</th><th>Date</th><th>Done</th><th>How it felt</th></tr>${days.map((x, i) => `<tr><td>${i + 1}</td><td>${x.type === 'test' ? 'Module test' : (x.type === 'learn' ? 'Learn · ' : 'Practice · ') + esc(x.l.title)}</td><td></td><td><i></i></td><td></td></tr>`).join('')}</table>
    <p class="why"><b>Why I'm doing this:</b></p><div class="lines">${'<i></i>'.repeat(3)}</div></article>`;
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Cahier Module ${n} workbook</title><style>${CSS}</style><body>${cover}${pages}<article class="keyp"><h1>Answer key</h1><p class="muted">Mark your work in a different colour. For your own writing, the key shows an example. Yours can be different and still be right.</p>${keys.join('')}</article>${cards}</body></html>`;
  fs.writeFileSync('/tmp/claude-0/-home-claude/7a9430b3-2f1e-591b-bbcd-ad17df5486f8/scratchpad/wb2.html', html);
  const file = `${R}workbooks/Cahier-A1-Module-${n}-workbook`;
  const p = await browser.newPage(); await p.setContent(html, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: file + '.pdf', format: 'Letter', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: `<div style="width:100%;font:9px sans-serif;color:#5f5750;text-align:center">Cahier · Module ${n} workbook · page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`, margin: { top: '14mm', bottom: '16mm', left: '15mm', right: '15mm' } });
  await p.close(); console.log('built', file + '.pdf', total, 'days');
}
(async () => { const b = await chromium.launch(); await build('a1-u1', 1, b); await b.close(); })();
