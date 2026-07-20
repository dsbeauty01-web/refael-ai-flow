/**
 * Diagnoses the hero avatar's "floating rectangle" look:
 * is the CSS mask actually applied, and what colour is the footage
 * background compared to the page behind it?
 */
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));

const result = await page.evaluate(() => {
  const v = document.querySelector('video.blend-white');
  if (!v) return { error: 'no video.blend-white found' };
  const cs = getComputedStyle(v);
  const r = v.getBoundingClientRect();

  // Sample the footage itself, away from any CSS mask.
  const c = document.createElement('canvas');
  c.width = v.videoWidth; c.height = v.videoHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(v, 0, 0);
  const at = (x, y) => {
    const d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
    return `rgb(${d[0]},${d[1]},${d[2]})`;
  };

  return {
    maskImage: cs.maskImage?.slice(0, 60),
    webkitMaskImage: cs.webkitMaskImage?.slice(0, 60),
    maskComposite: cs.maskComposite,
    webkitMaskComposite: cs.webkitMaskComposite,
    videoSize: `${v.videoWidth}x${v.videoHeight}`,
    renderedRect: `${Math.round(r.width)}x${Math.round(r.height)} @ ${Math.round(r.x)},${Math.round(r.y)}`,
    footage: {
      topLeft: at(4, 4),
      topMid: at(v.videoWidth / 2, 4),
      midLeft: at(4, v.videoHeight / 2),
      centerBg: at(v.videoWidth * 0.12, v.videoHeight * 0.5),
      bottomLeft: at(4, v.videoHeight - 4),
    },
    pageBg: getComputedStyle(document.body).backgroundColor,
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
