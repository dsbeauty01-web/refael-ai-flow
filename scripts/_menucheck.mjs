import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless:'new' });
const p = await b.newPage();
await p.setViewport({ width:390, height:844, isMobile:true, hasTouch:true });
await p.goto('http://localhost:4173/maya', { waitUntil:'networkidle0' });
const hasHamburger = await p.evaluate(() => !!document.querySelector('button[aria-label="Menu"]'));
await p.click('button[aria-label="Menu"]');
await new Promise(res => setTimeout(res, 400));
const r = await p.evaluate(() => {
  const items = [...document.querySelectorAll('nav.md\\:hidden button')].map(b=>b.textContent.trim());
  return { hasHamburger: true, menuItems: items };
});
console.log('maya mobile hamburger:', r.hasHamburger);
console.log('menu items:', JSON.stringify(r.menuItems));
console.log('has The Star jump:', r.menuItems.some(t=>t.includes('הכוכבת')||t.includes('Star')));
await p.screenshot({ path:'C:/Users/ADMIN/projects/refael-ai-flow/mobile_maya_menu.png' });
await b.close();
