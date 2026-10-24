// QA sweep against `vite preview` (http://localhost:4173):
// screenshots every page x language x viewport, and reports console errors,
// horizontal overflow and broken internal links.
//
//   node scripts/qa-shots.mjs <outDir> [paths comma-sep] [langs comma-sep]
//
// Chrome path: $CHROME_PATH, else the Playwright Chromium in the cloud box.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const [, , outDir = 'qa-shots', pathsArg = '/', langsArg = 'he,en,th'] = process.argv;
const BASE = process.env.QA_BASE || 'http://localhost:4173';
const paths = pathsArg.split(',');
const langs = langsArg.split(',');
const viewports = [
  { name: 'desk', width: 1440, height: 900 },
  { name: 'mob', width: 390, height: 844, isMobile: true, hasTouch: true },
];
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
});

const report = [];
const internalLinks = new Set();

for (const p of paths) {
  for (const lang of langs) {
    for (const vp of viewports) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push('pageerror: ' + e.message));
      page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
      await page.setViewport(vp);
      await page.evaluateOnNewDocument(l => { try { localStorage.setItem('refael_lang', l); } catch {} }, lang);
      const sep = p.includes('?') ? '&' : '?';
      const url = `${BASE}${p}${sep}lang=${lang}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      } catch (e) { errors.push('goto: ' + e.message); }
      await new Promise(r => setTimeout(r, 1500));
      const info = await page.evaluate(() => ({
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        h1: [...document.querySelectorAll('h1')].map(h => h.innerText.trim()).slice(0, 2),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        dir: document.documentElement.dir, lang: document.documentElement.lang,
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
      }));
      info.links.filter(h => h && h.startsWith('/') && !h.startsWith('//')).forEach(h => internalLinks.add(h.split('#')[0].split('?')[0] || '/'));
      const safe = (p === '/' ? 'home' : p.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, ''));
      const file = `${outDir}/${safe}.${lang}.${vp.name}.png`;
      await page.screenshot({ path: file, fullPage: true });
      report.push({ url, vp: vp.name, title: info.title, h1: info.h1, overflow: info.overflow, dir: info.dir, lang: info.lang, canonical: info.canonical, descLen: info.desc.length, errors });
      await page.close();
    }
  }
}

// internal link check (HTTP status of every same-site href seen)
const linkStatus = {};
for (const href of internalLinks) {
  try {
    const r = await fetch(BASE + href, { redirect: 'manual' });
    linkStatus[href] = r.status;
  } catch (e) { linkStatus[href] = 'ERR ' + e.message; }
}
await browser.close();
fs.writeFileSync(`${outDir}/report.json`, JSON.stringify({ report, linkStatus }, null, 2));
for (const r of report) {
  const flag = (r.errors.length ? ' ERR' : '') + (r.overflow > 1 ? ` OVERFLOW+${r.overflow}` : '');
  console.log(`${r.vp.padEnd(4)} ${r.lang}/${r.dir} ${r.url.replace(BASE, '')} | ${r.title.slice(0, 60)} | h1=${JSON.stringify(r.h1[0] || '').slice(0, 50)}${flag}`);
  r.errors.slice(0, 3).forEach(e => console.log('     ', e.slice(0, 160)));
}
console.log('links:', JSON.stringify(linkStatus));
