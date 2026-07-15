import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const doc = document.scrollingElement;
  const bad = [];
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1 || r.left < -8 || r.right > vw + 8) {
      bad.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 80),
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
      });
    }
  }
  return { vw, scrollW: doc.scrollWidth, clientW: doc.clientWidth, bad: bad.slice(0, 25) };
});
console.log(JSON.stringify(report, null, 1));
await browser.close();
