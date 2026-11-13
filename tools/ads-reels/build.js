// node build.js [reelName ...]   (no args = all reels)
const fs = require('fs');
const { W, SRC, OUT, renderOverlay, renderScene, closeBrowser, run } = require('./lib');
const { REELS } = require('./scenes');

const FINAL = '/home/claude/rf-ads/public/ads';
const SHEETS = '/tmp/claude-0/-home-claude/913e448f-9965-5831-97f9-9cc952847ae6/scratchpad/ads';
fs.mkdirSync(FINAL, { recursive: true });
fs.mkdirSync(SHEETS, { recursive: true });

const POSTER_T = {
  'reel-1-research-he': 2.6, 'reel-2-chat-he': 7.5, 'reel-3-why-us-he': 2.5, 'reel-4-any-business-he': 1.6,
  'reel-5-watch-it-work-he': 6.0, 'reel-3-why-us-en': 2.5, 'reel-4-any-business-en': 1.6,
};

const done = new Set();
async function buildScene(s) {
  if (done.has(s.name) && fs.existsSync(`${OUT}/scene_${s.name}.mp4`)) return `${OUT}/scene_${s.name}.mp4`;
  const t0 = Date.now();
  const ov = await renderOverlay(s.name, s.html, s.dur);
  const f = renderScene(s.name, s.dur, s.bg, s.layers, ov);
  done.add(s.name);
  console.log(`  scene ${s.name} ${s.dur}s in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return f;
}

function padExpr() {
  // soft synth pad: A major-ish chord, slow swell
  return "aevalsrc='(0.10*sin(2*PI*110*t)+0.07*sin(2*PI*164.81*t)+0.06*sin(2*PI*220*t)+0.045*sin(2*PI*277.18*t)+0.035*sin(2*PI*329.63*t))*(0.75+0.25*sin(2*PI*0.18*t))':s=48000:c=stereo";
}

function audio(name, dur) {
  const out = `${OUT}/aud_${name}.m4a`;
  const fadeOut = (dur - 1.4).toFixed(2);
  if (name.startsWith('reel-5')) {
    // voice: talk-he segments, ding at the notification, soft pad under everything
    const fc = [
      `[0:a]atrim=0:0.95,asetpts=PTS-STARTPTS,afade=t=out:st=0.9:d=0.05[v1]`,
      `[0:a]atrim=8.40:15.45,asetpts=PTS-STARTPTS,afade=t=in:d=0.02[v2]`,
      `[v1][v2]concat=n=2:v=0:a=1,aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-14:TP=-1.5:LRA=11,apad,atrim=0:${dur}[voice]`,
      `[1:a]atrim=0:${dur},lowpass=f=1600,afade=t=in:d=1,afade=t=out:st=${fadeOut}:d=1.4,volume=0.11[pad]`,
      `[2:a]volume=0.5,adelay=8300|8300,apad,atrim=0:${dur}[ding]`,
      `[voice][pad][ding]amix=inputs=3:normalize=0,alimiter=limit=0.89[a]`,
    ];
    run(['-i', `${SRC}/talk-he.mp4`, '-f', 'lavfi', '-i', padExpr() + `:d=${dur}`,
      '-f', 'lavfi', '-i', "aevalsrc='(0.5*sin(2*PI*1318.5*t)+0.3*sin(2*PI*1975.5*t))*exp(-7*t)':s=48000:c=stereo:d=0.6",
      '-filter_complex', fc.join(';'), '-map', '[a]', '-c:a', 'aac', '-b:a', '128k', out]);
  } else {
    run(['-f', 'lavfi', '-i', padExpr() + `:d=${dur}`, '-af',
      `lowpass=f=1600,afade=t=in:d=1,afade=t=out:st=${fadeOut}:d=1.4,loudnorm=I=-22:TP=-3:LRA=7`,
      '-ar', '48000', '-c:a', 'aac', '-b:a', '128k', out]);
  }
  return out;
}

async function buildReel(name) {
  console.log('reel', name);
  const scenes = REELS[name]();
  const files = [];
  for (const s of scenes) files.push(await buildScene(s));
  const dur = scenes.reduce((x, s) => x + s.dur, 0);
  const list = `${OUT}/list_${name}.txt`;
  fs.writeFileSync(list, files.map((f) => `file '${f}'`).join('\n'));
  const vid = `${OUT}/vid_${name}.mp4`;
  run(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', vid]);
  const aud = audio(name, dur);
  const tmp = `${FINAL}/${name}.tmp.mp4`;
  run(['-i', vid, '-i', aud, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'copy', '-t', String(dur), '-movflags', '+faststart', tmp]);
  fs.renameSync(tmp, `${FINAL}/${name}.mp4`);
  run(['-ss', String(POSTER_T[name]), '-i', `${FINAL}/${name}.mp4`, '-frames:v', '1', '-q:v', '3', `${FINAL}/${name}.jpg`]);
  const times = Array.from({ length: 6 }, (_, i) => ((i + 0.6) / 6) * dur);
  const ins = times.flatMap((t) => ['-ss', t.toFixed(2), '-i', `${FINAL}/${name}.mp4`]);
  const fc = times.map((_, i) => `[${i}:v]scale=360:640,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='${times[i].toFixed(1)}s':x=8:y=8:fontsize=22:fontcolor=yellow:box=1:boxcolor=black@0.6[f${i}]`).join(';')
    + ';' + times.map((_, i) => `[f${i}]`).join('') + 'hstack=6';
  run([...ins, '-filter_complex', fc, '-frames:v', '1', '-q:v', '3', `${SHEETS}/${name}.jpg`]);
  const sz = fs.statSync(`${FINAL}/${name}.mp4`).size / 1e6;
  console.log(`  -> ${name}.mp4 ${dur.toFixed(1)}s ${sz.toFixed(2)} MB`);
}

(async () => {
  const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(REELS);
  for (const n of names) await buildReel(n);
  await closeBrowser();
})().catch(async (e) => { console.error(e); await closeBrowser(); process.exit(1); });
