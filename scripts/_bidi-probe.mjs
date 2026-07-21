/**
 * Numbers inside Hebrew RTL text reorder in ways that are invisible in code and
 * wrong on screen — "₪7,000–9,000" can render as "9,000–7,000₪". This walks the
 * rendered page and reports the actual visual left-to-right glyph order for any
 * text node containing a price, so we compare what the VISITOR sees.
 */
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.evaluateOnNewDocument(() => localStorage.setItem('refael_lang', 'he'));
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

const findings = await page.evaluate(() => {
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent || '';
    if (!/[₪]|\d[\d,]{2,}/.test(text)) continue;
    if (!text.trim()) continue;

    // Read each character's on-screen box. Text wraps, so characters must be
    // bucketed into visual LINES by their y first — sorting the whole node by x
    // would interleave line 1 with line 2 and produce meaningless soup.
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      if (!text[i].trim()) continue;
      const r = document.createRange();
      r.setStart(node, i);
      r.setEnd(node, i + 1);
      const box = r.getBoundingClientRect();
      if (box.width === 0 && box.height === 0) continue;
      chars.push({ ch: text[i], x: box.left, y: Math.round(box.top / 6) });
    }
    if (!chars.length) continue;

    const lines = new Map();
    for (const c of chars) {
      if (!lines.has(c.y)) lines.set(c.y, []);
      lines.get(c.y).push(c);
    }
    const visual = [...lines.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, cs]) => cs.sort((a, b) => a.x - b.x).map(c => c.ch).join(''))
      .join(' ⏎ ');
    out.push({ logical: text.trim(), visual });
  }
  return out;
});

await browser.close();

// A price is safe when its digits survive in order somewhere in the visual string.
const suspect = findings.filter(f => {
  const nums = f.logical.match(/\d[\d,]*/g) || [];
  return nums.some(n => !f.visual.includes(n));
});

console.log(`scanned ${findings.length} numeric text nodes\n`);
if (!suspect.length) {
  console.log('✓ every number keeps its digit order on screen');
} else {
  console.log(`✗ ${suspect.length} node(s) reorder on screen:\n`);
  suspect.forEach(s => {
    console.log('  logical:', s.logical.slice(0, 90));
    console.log('  visual :', s.visual.slice(0, 90));
    console.log('');
  });
}
process.exit(suspect.length ? 1 : 0);
