// Renders the 1200x630 social preview cards in public/og/ with headless Chromium
// (real Hebrew RTL + Thai shaping, which Pillow cannot do).
//   mkdir /tmp/ogf && cd /tmp/ogf && npm i @fontsource/kanit @fontsource/noto-sans-thai @fontsource/heebo @fontsource/space-grotesk @fontsource/suez-one
//   node scripts/og-cards.mjs /tmp/ogf
// Edit the `cards` list below to change headlines or photos.
import { createRequire } from 'node:module';
const puppeteer = createRequire('/home/claude/refael-ai-flow/package.json')('puppeteer-core');
const F = 'file://' + process.argv[2] + '/node_modules/@fontsource';
const PUB = 'file:///home/claude/refael-ai-flow/public';
const OUT = '/home/claude/refael-ai-flow/public/og';
const face = `
@font-face{font-family:Suez;src:url(${F}/suez-one/files/suez-one-hebrew-400-normal.woff2)}
@font-face{font-family:Heebo;font-weight:500;src:url(${F}/heebo/files/heebo-hebrew-500-normal.woff2)}
@font-face{font-family:Heebo;font-weight:800;src:url(${F}/heebo/files/heebo-hebrew-800-normal.woff2)}
@font-face{font-family:Grot;font-weight:700;src:url(${F}/space-grotesk/files/space-grotesk-latin-700-normal.woff2)}
@font-face{font-family:Grot;font-weight:500;src:url(${F}/space-grotesk/files/space-grotesk-latin-500-normal.woff2)}
@font-face{font-family:Kanit;font-weight:700;src:url(${F}/kanit/files/kanit-thai-700-normal.woff2)}
@font-face{font-family:Kanit;font-weight:700;src:url(${F}/kanit/files/kanit-latin-700-normal.woff2)}
@font-face{font-family:NST;font-weight:500;src:url(${F}/noto-sans-thai/files/noto-sans-thai-thai-500-normal.woff2)}
@font-face{font-family:NST;font-weight:500;src:url(${F}/noto-sans-thai/files/noto-sans-thai-latin-500-normal.woff2)}`;
const fonts = { he: ['Suez', 'Heebo'], en: ['Grot', 'Grot'], th: ['Kanit', 'NST'] };
const cards = [
  { file: 'live-selling-he', lang: 'he', img: '/site/maya-boutique.jpg', live: 'שידור חי', h: 'הבוט שלך ישן.<br>מיה מוכרת.', s: 'עונה לכל צופה בשם, בקול, תוך שניות.<br>15 שידורים אמיתיים בפייסבוק.' },
  { file: 'live-selling-en', lang: 'en', img: '/site/maya-boutique.jpg', live: 'LIVE', h: 'Your bot is asleep.<br>Maya sells.', s: 'Answers every viewer by name, out loud,<br>in seconds. 15 real Facebook lives.' },
  { file: 'live-selling-th', lang: 'th', img: '/site/thai-host-boutique.jpg', h: 'บอทของคุณกำลังหลับ<br>พิธีกร AI ขายของแทนคุณ', s: 'ตอบผู้ชมทุกคนด้วยชื่อ ด้วยเสียง<br>ภายในไม่กี่วินาที' },
  { file: 'site-he', lang: 'he', img: '/media/maya_poster.jpg', stage: true, h: 'דמויות AI חיות<br>שמדברות עם הלקוחות.', s: 'בלייב, באתר ובלובי. בעברית, באנגלית ובתאית.' },
  { file: 'site-en', lang: 'en', img: '/media/maya_poster.jpg', stage: true, h: 'Live AI characters<br>that talk to your customers.', s: 'On live streams, on your site, in your lobby.<br>In Hebrew, English and Thai.' },
  { file: 'site-th', lang: 'th', img: '/site/thai-host-boutique.jpg', h: 'ตัวละคร AI<br>ที่คุยกับลูกค้าของคุณ', s: 'บนไลฟ์ บนเว็บไซต์ และในล็อบบี้<br>ไทย อังกฤษ และฮีบรู' },
];
const br = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--allow-file-access-from-files'] });
for (const c of cards) {
  const [dispF, bodyF] = fonts[c.lang]; const rtl = c.lang === 'he';
  const html = `<!doctype html><html lang="${c.lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><style>${face}
  *{margin:0;box-sizing:border-box}body{width:1200px;height:630px;overflow:hidden;color:#E8EEF7;
  background:radial-gradient(ellipse 60% 70% at ${rtl ? '78%' : '22%'} 40%,rgba(0,184,217,.22),transparent 62%),radial-gradient(ellipse 50% 60% at ${rtl ? '10%' : '90%'} 10%,rgba(124,92,240,.28),transparent 60%),#080B12;
  display:flex;align-items:center;gap:56px;padding:0 64px;font-family:${bodyF},sans-serif}
  .txt{flex:1}.brand{font:700 30px Grot,sans-serif;letter-spacing:-.5px;direction:ltr;display:inline-block}.brand b{background:linear-gradient(90deg,#00B8D9,#7C5CF0);-webkit-background-clip:text;color:transparent}
  h1{font-family:${dispF},sans-serif;font-weight:${dispF === 'Suez' ? 400 : 700};font-size:${c.lang === 'th' ? 60 : 66}px;line-height:${c.lang === 'th' ? 1.3 : 1.1};margin:26px 0 22px;letter-spacing:${c.lang === 'en' ? '-1.5px' : '0'}}
  p{font-size:${c.lang === 'th' ? 27 : 29}px;line-height:1.5;color:#B8C2D3;font-weight:500}
  .ph{width:400px;height:530px;border-radius:28px;overflow:hidden;position:relative;flex:none;box-shadow:0 0 0 1px rgba(232,238,247,.14),0 0 70px -10px rgba(0,184,217,.45);
  background:${c.stage ? 'radial-gradient(ellipse 75% 60% at 50% 22%,#fff,#eef3f9)' : '#000'}}
  .ph img{width:100%;height:100%;object-fit:${c.stage ? 'contain' : 'cover'};object-position:top}
  .live{position:absolute;top:18px;${rtl ? 'right' : 'left'}:18px;background:#e5173f;color:#fff;font:800 20px ${bodyF},sans-serif;padding:7px 12px;border-radius:8px;display:flex;gap:8px;align-items:center}.live i{width:10px;height:10px;border-radius:50%;background:#fff}
  </style></head><body><div class="txt"><span class="brand">Refael<b>.ai</b></span><h1>${c.h}</h1><p>${c.s}</p></div>
  <div class="ph"><img src="${PUB}${c.img}">${c.live ? `<span class="live"><i></i>${c.live}</span>` : ''}</div></body></html>`;
  const pg = await br.newPage(); await pg.setViewport({ width: 1200, height: 630 });
  const fs = await import('node:fs'); const f = process.argv[2] + '/' + c.file + '.html'; fs.writeFileSync(f, html);
  await pg.goto('file://' + f, { waitUntil: 'networkidle0' }); await pg.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 300));
  await pg.screenshot({ path: `${OUT}/${c.file}.jpg`, type: 'jpeg', quality: 86 });
  await pg.close(); console.log('og', c.file);
}
await br.close();
