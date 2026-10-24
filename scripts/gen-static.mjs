// Generates the static SEO files from src/config/routes.json:
//   public/sitemap.xml  — every route x he/en/th, with hreflang alternates
//   public/<old>.html   — redirect stubs for pages that moved into the app
//
//   npm run seo        (re-run after adding a route or moving a page)
//
// Stubs keep their original Open Graph tags and og:url pointing at themselves, so a
// link already shared on Facebook keeps its preview card. Facebook's scraper does not
// run JS; browsers and Google do, and follow the redirect to the new page.
// public/privacy.html is intentionally NOT a stub: it is the privacy + data-deletion
// URL registered with the Meta app, so it must stay a real page.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'src/config/routes.json'), 'utf8'));
const SITE = cfg.siteUrl;
const LANGS = cfg.languages;
const today = new Date().toISOString().slice(0, 10);

const url = (p, l) => `${SITE}${p}${l === cfg.defaultLanguage ? '' : `?lang=${l}`}`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------- sitemap
const urls = [];
for (const r of cfg.routes) {
  for (const l of LANGS) {
    const alts = LANGS.map(a => `    <xhtml:link rel="alternate" hreflang="${a}" href="${esc(url(r.path, a))}"/>`).join('\n');
    urls.push(`  <url>
    <loc>${esc(url(r.path, l))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq || 'monthly'}</changefreq>
    <priority>${(l === cfg.defaultLanguage ? r.priority : Math.max(0.1, r.priority - 0.1)).toFixed(1)}</priority>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(url(r.path, cfg.defaultLanguage))}"/>
  </url>`);
  }
}
fs.writeFileSync(
  path.join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
);

// ---------------------------------------------------------------- redirect stubs
const OG = `${SITE}/og/site-he.jpg`;
const LS = l => `${SITE}/og/live-selling-${l}.jpg`;
const STUBS = [
  // maya.html is special: /maya (clean URL, old flagship nav link) -> /live-avatar,
  // /maya.html (funnel link in posts and DMs) -> /live-selling.
  { file: 'maya.html', to: '/live-selling', cleanTo: '/live-avatar', lang: 'he', dir: 'rtl', image: LS('he'),
    title: 'מיה | דמות AI שמוכרת בשידור חי', ogt: 'הבוט שלך ישן. מיה מוכרת.',
    ogd: 'דמות AI בשידור חי שעונה לכל צופה בשם, בקול. שלחו תמונה של מוצר וראו אותה מציגה אותו.', go: 'להמשך' },
  { file: 'maya-en.html', to: '/live-selling', addLang: 'en', lang: 'en', dir: 'ltr', image: LS('en'),
    title: 'Maya | the AI character that sells on live', ogt: 'Your bot is asleep. Maya sells.',
    ogd: 'A live AI character that answers every viewer by name, out loud. Send a product photo and watch her present it.', go: 'Continue' },
  { file: 'maya-th.html', to: '/live-selling', addLang: 'th', lang: 'th', dir: 'ltr',
    title: 'พิธีกร AI | ตัวละคร AI ที่ขายของสดบนไลฟ์', ogt: 'บอทของคุณกำลังหลับ พิธีกร AI ขายของแทนคุณ',
    ogd: 'ตัวละคร AI สดที่ตอบผู้ชมทุกคนด้วยชื่อ ด้วยเสียง ส่งรูปสินค้ามาแล้วดูเธอนำเสนอ', go: 'ไปต่อ', image: LS('th') },
  { file: 'ai-live-host.html', to: '/live-selling', lang: 'he', dir: 'rtl', image: LS('he'),
    title: 'מנחה AI ללייב מכירות בפייסבוק | עונה לכל צופה בשם | Refael.ai',
    ogt: 'מנחה AI ללייב מכירות בפייסבוק | עונה לכל צופה בשם | Refael.ai',
    ogd: 'מנחה דיגיטלית שעולה ללייב, מציגה מוצרים ועונה לכל תגובה בצ׳אט בשם, בקול, תוך כ-5 שניות. 15 שידורים אמיתיים בפייסבוק.', go: 'להמשך' },
  { file: 'ai-avatar-business.html', to: '/ai-avatar', lang: 'he', dir: 'rtl',
    title: 'אווטאר AI מדבר לעסקים בעברית | דמות דיגיטלית שמוכרת | Refael.ai',
    ogt: 'אווטאר AI מדבר לעסקים בעברית | דמות דיגיטלית שמוכרת | Refael.ai',
    ogd: 'אווטאר AI שמדבר עברית בקול טבעי, עם שפתיים מסונכרנות, מציג מוצרים ועונה ללקוחות בזמן אמת. לייב, סרטונים ומסכים בעסק.', go: 'להמשך' },
  { file: 'ai-brand-character.html', to: '/brand-character', lang: 'he', dir: 'rtl',
    title: 'דמות AI למותג | קמע דיגיטלי שמדבר עם לקוחות | Refael.ai',
    ogt: 'דמות AI למותג | קמע דיגיטלי שמדבר עם לקוחות | Refael.ai',
    ogd: 'דמות AI מצוירת או תלת ממדית למותג שלכם: מציגה מוצרים, עונה לילדים ולהורים בשם, בעברית ובאנגלית. מתאים לצעצועים, אפליקציות ומוזיאונים.', go: 'להמשך' },
];

for (const s of STUBS) {
  const target = `${s.to}${s.addLang ? `?lang=${s.addLang}` : ''}`;
  const html = `<!doctype html>
<html lang="${s.lang}" dir="${s.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.title)}</title>
<meta name="description" content="${esc(s.ogd)}">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${esc(SITE + target)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Refael.ai">
<meta property="og:title" content="${esc(s.ogt)}">
<meta property="og:description" content="${esc(s.ogd)}">
<meta property="og:image" content="${esc(s.image || OG)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${esc(`${SITE}/${s.file}`)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#080B12">
<script>
  // Moved into the main site. Keep the visitor's ?utm/fbclid and #hash.
  (function () {
    var clean = ${s.cleanTo ? `!/\\.html$/.test(location.pathname)` : 'false'};
    var to = clean ? ${JSON.stringify(s.cleanTo || '')} : ${JSON.stringify(s.to)};
    var p = new URLSearchParams(location.search);
    ${s.addLang ? `if (!p.has('lang')) p.set('lang', ${JSON.stringify(s.addLang)});` : ''}
    var q = p.toString();
    location.replace(to + (q ? '?' + q : '') + location.hash);
  })();
</script>
<style>html,body{margin:0;background:#080B12;color:#E8EEF7;font:16px system-ui,sans-serif}a{color:#00B8D9}main{min-height:100vh;display:grid;place-items:center}</style>
</head>
<body>
<main><a href="${esc(target)}">${esc(s.go)}</a></main>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, 'public', s.file), html);
}

console.log(`sitemap: ${urls.length} urls; stubs: ${STUBS.map(s => s.file).join(', ')}`);
