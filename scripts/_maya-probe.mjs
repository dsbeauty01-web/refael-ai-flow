import puppeteer from 'puppeteer-core';

const OUT = process.argv[2] || 'maya_full.png';
const b = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new' });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 1000 });
await p.goto('http://localhost:4173/maya', { waitUntil: 'networkidle0' });

// Force reveal-on-scroll content visible, kill lazy gating, and load every clip,
// so a full-page screenshot shows the real page instead of blank panels.
await p.addStyleTag({ content: `
  html { scroll-behavior: auto !important; }
  .fade-up-init { opacity: 1 !important; transform: none !important; }
`});
await p.evaluate(() => {
  document.querySelectorAll('video[src], video:not([src])').forEach(v => {
    const s = v.getAttribute('src'); if (s) { v.src = s; v.load?.(); }
  });
});
await new Promise(r => setTimeout(r, 2500));

const txt = await p.evaluate(() => document.body.innerText);
const checks = [
  'השלט החי','ידיים אמיתיות','גבולות ברזל','פרויקט הדגל','29,900','990',
  'הכוכבת','The Digital Actress','59,900','1,490','קול משובט','דו-שיח','שמגיעה עליה כתבה',
  'נבנה בישראל','הסיפור הטכנולוגי','רוצים מאיה משלכם',
];
for (const c of checks) console.log((txt.includes(c) ? 'OK' : 'MISSING'), c);
const secs = await p.$$eval('section', els => els.map(e => e.id).filter(Boolean));
console.log('sections:', secs.join(', '));

// overflow check (RTL pages love to leak horizontally)
const of = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
console.log('overflow:', of.sw <= of.cw + 1 ? 'none' : `LEAK sw=${of.sw} cw=${of.cw}`);

await p.screenshot({ path: OUT, fullPage: true });
console.log('saved', OUT);
await b.close();
