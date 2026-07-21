/**
 * Full-page shot that first scrolls the whole document, so IntersectionObserver
 * reveal animations (FadeUp) have actually fired. A plain fullPage screenshot
 * captures sections that never entered the viewport and they photograph blank.
 */
import puppeteer from 'puppeteer-core';

const [, , out = 'shot.png', w = '1440', h = '900', lang = 'he', path = '/'] = process.argv;

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h, isMobile: +w < 500, hasTouch: +w < 500 });
await page.evaluateOnNewDocument(l => localStorage.setItem('refael_lang', l), lang);
await page.goto(`http://localhost:4173${path}`, { waitUntil: 'networkidle0' });

// walk the page so every observer fires, then return to the top.
// The page sets `scroll-behavior: smooth`, which animates every scrollTo and
// makes a stepped loop fall behind — force instant scrolling for the probe.
await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
await page.evaluate(async () => {
  const step = Math.floor(window.innerHeight * 0.7);
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => requestAnimationFrame(() => setTimeout(r, 90)));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 500));
});

// report anything still invisible — that would be a real bug, not a rig artifact
const hidden = await page.evaluate(() =>
  [...document.querySelectorAll('.fade-up-init')]
    .filter(el => getComputedStyle(el).opacity !== '1')
    .map(el => (el.textContent || '').trim().slice(0, 45))
);

await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('saved', out, '| still-invisible blocks:', hidden.length);
if (hidden.length) console.log(hidden);
