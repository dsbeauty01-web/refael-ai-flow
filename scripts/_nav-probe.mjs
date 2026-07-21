/** Checks every nav link resolves to a real section, and the page logs no errors. */
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
});
const page = await browser.newPage();
const errs = [];
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));

await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));

const result = await page.evaluate(() => {
  const wanted = ['avatars', 'how', 'uses', 'difference', 'tech', 'pricing', 'roi', 'services', 'faq', 'about', 'contact'];
  return {
    nav: [...document.querySelectorAll('header nav button')].map(b => b.textContent.trim()),
    missing: wanted.filter(i => !document.getElementById(i)),
    sections: [...document.querySelectorAll('main section')].length,
  };
});

await browser.close();
console.log('nav links      :', result.nav.join(' | '));
console.log('sections on page:', result.sections);
console.log('missing ids    :', result.missing.length ? result.missing : 'none');
console.log('console errors :', errs.length ? errs : 'none');
process.exit(result.missing.length || errs.length ? 1 : 0);
