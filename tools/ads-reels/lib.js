// Shared helpers: HTML overlay rendering (Playwright) + ffmpeg scene compositing.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const W = '/tmp/claude-0/-home-claude/913e448f-9965-5831-97f9-9cc952847ae6/scratchpad/work';
const SRC = W + '/src';
const OUT = W + '/out';
const FPS = 30;
fs.mkdirSync(OUT, { recursive: true });

const fontsCss = fs.readFileSync(W + '/fonts/fonts.css', 'utf8');

const BASE_CSS = `
${fontsCss}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;background:transparent;overflow:hidden}
body{font-family:'Assistant','Inter',sans-serif;color:#fff;-webkit-font-smoothing:antialiased}
body.en{font-family:'Inter','Assistant',sans-serif}
.abs{position:absolute}
.cx{left:0;right:0;display:flex;justify-content:center;text-align:center}
.pill{display:inline-block;background:rgba(9,11,18,.84);border-radius:28px;padding:16px 34px 20px;font-weight:800;font-size:64px;line-height:1.15;box-shadow:0 10px 40px rgba(0,0,0,.35)}
.en .pill{font-weight:700;font-size:58px;padding:18px 34px}
.grad{background:linear-gradient(90deg,#00B8D9,#7C5CF0)}
.gradtxt{background:linear-gradient(90deg,#22D3EE,#A78BFA);-webkit-background-clip:text;background-clip:text;color:transparent}
.tag{display:inline-block;font-size:30px;font-weight:700;padding:8px 20px;border-radius:999px;background:rgba(9,11,18,.72);color:#E6EAF2;letter-spacing:.3px}
.ltr{direction:ltr;unicode-bidi:isolate}
@keyframes up{from{opacity:0;transform:translateY(46px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes out{to{opacity:0}}
@keyframes pop{0%{opacity:0;transform:scale(.8)}70%{opacity:1;transform:scale(1.04)}100%{opacity:1;transform:scale(1)}}
@keyframes down{from{opacity:0;transform:translateY(-140px)}to{opacity:1;transform:none}}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
`;

// animation style helper: a('up', 0.3, 0.5, 2.6) -> in at 0.3s for 0.5s, fade out at 2.6s
function a(name, d, dur = 0.5, outAt = null) {
  let s = `${name} ${dur}s cubic-bezier(.2,.8,.2,1) ${d}s both`;
  if (outAt !== null) s += `, out .3s linear ${outAt}s forwards`;
  return `data-anim="${s}"`;
}

function page(lang, body, css = '', tick = '') {
  return `<!doctype html><html lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8">
<style>${BASE_CSS}${css}</style></head><body class="${lang}">${body}
<script>document.querySelectorAll('[data-anim]').forEach(function(e){e.style.animation=e.dataset.anim});</script>
<script>window.tick=function(t){${tick};return ''};</script></body></html>`;
}

// ---------- overlay frame rendering ----------
let browser = null;
async function getBrowser() {
  if (!browser) {
    const { chromium } = require('playwright');
    browser = await chromium.launch();
  }
  return browser;
}
async function closeBrowser() { if (browser) await browser.close(); browser = null; }

async function renderOverlay(name, html, dur) {
  const dir = `${OUT}/ov_${name}`;
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const htmlPath = `${OUT}/ov_${name}.html`;
  fs.writeFileSync(htmlPath, html);
  const b = await getBrowser();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await p.goto('file://' + htmlPath);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(150);
  const n = Math.round(dur * FPS);
  let prevSig = null, prevFile = null;
  for (let i = 0; i < n; i++) {
    const t = i / FPS;
    const sig = await p.evaluate((t) => {
      const parts = [];
      for (const an of document.getAnimations()) {
        an.pause(); an.currentTime = t * 1000;
        const ct = an.effect.getComputedTiming();
        parts.push(ct.progress === null ? 'n' : ct.progress.toFixed(4));
      }
      parts.push(window.tick(t));
      return parts.join('|');
    }, t);
    const file = `${dir}/${String(i).padStart(5, '0')}.png`;
    if (sig === prevSig) {
      fs.linkSync(prevFile, file);
    } else {
      await p.screenshot({ path: file, omitBackground: true });
      prevSig = sig; prevFile = file;
    }
  }
  await p.close();
  return dir;
}

// ---------- background layers ----------
// layer: {file, ss, segs:[[s,e],..], loop, crop:'w:h:x:y', post:'filters before scale', w,h,x,y, vf:'extra after scale', hold}
function run(args) {
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '));
}

const ENC = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-maxrate', '2600k', '-bufsize', '5200k',
  '-pix_fmt', 'yuv420p', '-r', String(FPS), '-g', '60', '-profile:v', 'high', '-an'];

function renderScene(name, dur, bgColor, layers, ovDir) {
  const inputs = ['-f', 'lavfi', '-i', `color=c=${bgColor}:s=1080x1920:r=${FPS}:d=${dur}`];
  const fl = [];
  let cur = '[0:v]';
  layers.forEach((L, i) => {
    const idx = i + 1;
    if (L.loop) inputs.push('-stream_loop', '-1');
    inputs.push('-i', L.file);
    let chain;
    if (L.segs) {
      const parts = L.segs.map((s, k) => `[${idx}:v]trim=start=${s[0]}:end=${s[1]},setpts=PTS-STARTPTS[s${idx}_${k}]`);
      fl.push(...parts);
      chain = `${L.segs.map((s, k) => `[s${idx}_${k}]`).join('')}concat=n=${L.segs.length}:v=1:a=0,`;
    } else {
      chain = `[${idx}:v]trim=start=${L.ss || 0},setpts=PTS-STARTPTS,`;
    }
    chain += `fps=${FPS},`;
    if (L.crop) chain += `crop=${L.crop},`;
    if (L.post) chain += L.post + ',';
    chain += `scale=${L.w}:${L.h}:flags=lanczos,setsar=1`;
    if (L.vf) chain += ',' + L.vf;
    if (L.zoom) {
      const [z0, z1] = L.zoom;
      const zt = L.zoomDur || dur;
      const z = `(${z0}+(${z1}-${z0})*min(t/${zt},1))`;
      chain += `,scale=w='trunc(${L.w}*${z}/2)*2':h='trunc(${L.h}*${z}/2)*2':eval=frame:flags=bicubic,crop=${L.w}:${L.h}`;
    }
    chain += `,tpad=stop_mode=clone:stop_duration=${dur},trim=duration=${dur}[l${idx}]`;
    fl.push(chain);
    let ox = String(L.x || 0), oy = String(L.y || 0);
    if (L.slide) {
      const sd = L.slideDur || 0.2, k = `if(lt(t,${sd}),pow(1-t/${sd},2),0)`;
      if (L.slide === 'right') ox = `'${ox}+1100*${k}'`;
      if (L.slide === 'left') ox = `'${ox}-1100*${k}'`;
      if (L.slide === 'up') oy = `'${oy}+1950*${k}'`;
      if (L.slide === 'down') oy = `'${oy}-1950*${k}'`;
    }
    fl.push(`${cur}[l${idx}]overlay=x=${ox}:y=${oy}:eof_action=repeat[b${idx}]`);
    cur = `[b${idx}]`;
  });
  const ovIdx = layers.length + 1;
  inputs.push('-framerate', String(FPS), '-i', `${ovDir}/%05d.png`);
  fl.push(`${cur}[${ovIdx}:v]overlay=0:0:format=auto,format=yuv420p,trim=duration=${dur}[v]`);
  const tmp = `${OUT}/scene_${name}.tmp.mp4`;
  run([...inputs, '-filter_complex', fl.join(';'), '-map', '[v]', ...ENC, '-t', String(dur), tmp]);
  fs.renameSync(tmp, `${OUT}/scene_${name}.mp4`);
  return `${OUT}/scene_${name}.mp4`;
}

module.exports = { W, SRC, OUT, FPS, a, page, renderOverlay, renderScene, closeBrowser, run };
