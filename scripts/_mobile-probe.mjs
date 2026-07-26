import puppeteer from 'puppeteer-core';

// iPhone-ish mobile viewport, checks the two pages the user reported broken on phones.
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new' });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

async function overflow() {
  return p.evaluate(() => {
    const de = document.documentElement;
    return de.scrollWidth <= de.clientWidth + 1 ? 'none' : `LEAK sw=${de.scrollWidth} cw=${de.clientWidth}`;
  });
}

// ---- HOME ----
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
console.log('== HOME (mobile) ==');
console.log('overflow:', await overflow());
// mobile menu should expose the flagship link
const homeMenu = await p.evaluate(() => {
  const btn = [...document.querySelectorAll('button[aria-label="Menu"]')][0];
  btn?.click();
  const links = [...document.querySelectorAll('a[href="/maya"]')].map(a => a.textContent.trim());
  return { hasMayaLink: links.length > 0, labels: links };
});
console.log('flagship link reachable from mobile menu:', homeMenu.hasMayaLink, homeMenu.labels);
await p.screenshot({ path: process.argv[2] || 'mobile_home.png', fullPage: true });

// ---- FLAGSHIP /maya ----
await p.goto('http://localhost:4173/maya', { waitUntil: 'networkidle0' });
await p.addStyleTag({ content: `.fade-up-init{opacity:1!important;transform:none!important}` });
await new Promise(r => setTimeout(r, 800));
console.log('\n== /maya (mobile) ==');
console.log('overflow:', await overflow());

const star = await p.evaluate(() => {
  const s = document.querySelector('#star');
  if (!s) return { present: false };
  const r = s.getBoundingClientRect();
  const txt = s.innerText;
  return {
    present: true,
    width: Math.round(r.width),
    hasPrice: txt.includes('59,900'),
    hasEN: txt.includes('The Digital Actress'),
    hasHe: txt.includes('הכוכבת'),
    cards: s.querySelectorAll('.surface').length,
  };
});
console.log('THE STAR (#star):', JSON.stringify(star));

const secs = await p.$$eval('section', els => els.map(e => e.id).filter(Boolean));
console.log('sections on /maya:', secs.join(', '));

// scroll to the star and shoot it alone
if (star.present) {
  await p.evaluate(() => document.querySelector('#star').scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await p.screenshot({ path: 'mobile_star.png' });
}
await p.screenshot({ path: 'mobile_maya.png', fullPage: true });
console.log('\nsaved mobile_home.png, mobile_maya.png, mobile_star.png');
await b.close();
