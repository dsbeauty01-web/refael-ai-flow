import puppeteer from 'puppeteer-core';

const [,, out = 'shot.png', w = '390', h = '844', full = '1', lang = '', path = '/'] = process.argv;
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h, isMobile: +w < 500, hasTouch: +w < 500 });
if (lang) {
  await page.evaluateOnNewDocument(l => localStorage.setItem('refael_lang', l), lang);
}
await page.goto(`http://localhost:4173${path}`, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));
await page.screenshot({ path: out, fullPage: full === '1' });
await browser.close();
console.log('saved', out);
