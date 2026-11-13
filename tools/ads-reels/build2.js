// v2 builder: node build2.js [name ...]
const fs = require('fs');
const { SRC, OUT, renderOverlay, renderScene, closeBrowser, run } = require('./lib');
const { REELS2 } = require('./scenes2');

const FINAL = '/home/claude/rf-ads/public/ads';
const SHEETS = '/tmp/claude-0/-home-claude/913e448f-9965-5831-97f9-9cc952847ae6/scratchpad/ads';

// 120 BPM loop: kick on every beat, clap on 2 and 4, offbeat hats, pumping bass, offbeat chord stabs (Am F C G)
function beat(dur, out) {
  const m = (x) => `mod(t${x},0.5)`;
  const root = "if(lt(mod(t,8),2),55,if(lt(mod(t,8),4),43.65,if(lt(mod(t,8),6),65.41,49)))";
  const ch = (i) => {
    const C = [[220, 261.63, 329.63], [174.61, 220, 261.63], [196, 261.63, 329.63], [196, 246.94, 293.66]];
    return `if(lt(mod(t,8),2),${C[0][i]},if(lt(mod(t,8),4),${C[1][i]},if(lt(mod(t,8),6),${C[2][i]},${C[3][i]})))`;
  };
  const kick = `0.95*sin(2*PI*(48*${m('')}+3.4*(1-exp(-24*${m('')}))))*exp(-8*${m('')})`;
  const hat = `(random(1)*2-1)*(0.55*exp(-60*${m('+0.25')})+0.18*exp(-110*mod(t,0.25)))`;
  const clap = `(random(2)*2-1)*0.8*exp(-16*mod(t+0.5,1))`;
  const bass = `0.55*(sin(2*PI*${root}*t)+0.45*sin(4*PI*${root}*t)+0.2*sin(6*PI*${root}*t))*(0.15+0.85*min(${m('')}/0.18,1))`;
  const stab = `0.22*(sin(2*PI*${ch(0)}*t)+sin(2*PI*${ch(1)}*t)+sin(2*PI*${ch(2)}*t)+0.5*sin(4*PI*${ch(0)}*t))*exp(-10*${m('+0.25')})`;
  const src = (e) => ['-f', 'lavfi', '-i', `aevalsrc='${e}':s=48000:d=${dur}`];
  run([...src(kick), ...src(hat), ...src(clap), ...src(bass), ...src(stab),
    '-filter_complex',
    '[0]volume=1.0[k];[1]highpass=f=6500,volume=0.5[h];[2]highpass=f=900,lowpass=f=5000,volume=0.35[c];[3]lowpass=f=420,volume=0.7[b];[4]lowpass=f=2600,volume=0.45[s];'
    + `[k][h][c][b][s]amix=inputs=5:normalize=0,pan=stereo|c0=c0|c1=c0,afade=t=out:st=${(dur - 0.6).toFixed(2)}:d=0.6[a]`,
    '-map', '[a]', '-ar', '48000', out]);
}

function audio(name, dur, voices, dings) {
  const b = `${OUT}/beat_${name}.wav`;
  beat(dur, b);
  const out = `${OUT}/aud2_${name}.m4a`;
  const ins = ['-i', b, '-i', `${SRC}/speak-he.mp4`, '-f', 'lavfi', '-i', "aevalsrc='(0.5*sin(2*PI*1318.5*t)+0.3*sin(2*PI*1975.5*t))*exp(-7*t)':s=48000:c=stereo:d=0.6"];
  const fc = [];
  voices.forEach(([at, s, e], i) => {
    fc.push(`[1:a]atrim=${s}:${e},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st=${(e - s - 0.04).toFixed(3)}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[v${i}]`);
  });
  const vl = voices.map((_, i) => `[v${i}]`).join('');
  fc.push(voices.length ? `${vl}amix=inputs=${voices.length}:normalize=0,volume=1.6,apad,atrim=0:${dur},asplit=2[voice][key]` : `anullsrc=r=48000:cl=stereo,atrim=0:${dur},asplit=2[voice][key]`);
  dings.forEach((t, i) => fc.push(`[2:a]volume=0.7,adelay=${Math.round(t * 1000)}|${Math.round(t * 1000)},apad,atrim=0:${dur}[d${i}]`));
  fc.push(`[0:a]volume=0.55[m];[m][key]sidechaincompress=threshold=0.02:ratio=10:attack=8:release=220:makeup=1[duck]`);
  fc.push(`[duck][voice]${dings.map((_, i) => `[d${i}]`).join('')}amix=inputs=${2 + dings.length}:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]`);
  run([...ins, '-filter_complex', fc.join(';'), '-map', '[a]', '-ar', '48000', '-c:a', 'aac', '-b:a', '128k', out]);
  return out;
}

async function buildReel(name) {
  console.log('reel', name);
  const items = REELS2[name]();
  const files = [], voices = [], dings = [];
  let t = 0;
  for (const it of items) {
    const s = it.scene;
    const ov = await renderOverlay(s.name, s.html, s.dur);
    files.push(renderScene(s.name, s.dur, s.bg, s.layers, ov));
    if (it.voice) voices.push([t, it.voice[0], it.voice[1]]);
    if (it.ding !== undefined) dings.push(t + it.ding);
    t += s.dur;
  }
  const dur = +t.toFixed(3);
  const list = `${OUT}/list2_${name}.txt`;
  fs.writeFileSync(list, files.map((f) => `file '${f}'`).join('\n'));
  const vid = `${OUT}/vid2_${name}.mp4`;
  run(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', vid]);
  const aud = audio(name, dur, voices, dings);
  const tmp = `${FINAL}/${name}.tmp.mp4`;
  run(['-i', vid, '-i', aud, '-map', '0:v', '-map', '1:a', '-c', 'copy', '-t', String(dur), '-movflags', '+faststart', tmp]);
  fs.renameSync(tmp, `${FINAL}/${name}.mp4`);
  run(['-ss', '0.6', '-i', `${FINAL}/${name}.mp4`, '-frames:v', '1', '-q:v', '3', `${FINAL}/${name}.jpg`]);
  const times = Array.from({ length: 6 }, (_, i) => ((i + 0.5) / 6) * dur);
  const ins = times.flatMap((x) => ['-ss', x.toFixed(2), '-i', `${FINAL}/${name}.mp4`]);
  const fc = times.map((x, i) => `[${i}:v]scale=360:640,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='${x.toFixed(1)}s':x=8:y=8:fontsize=22:fontcolor=yellow:box=1:boxcolor=black@0.6[f${i}]`).join(';')
    + ';' + times.map((_, i) => `[f${i}]`).join('') + 'hstack=6';
  run([...ins, '-filter_complex', fc, '-frames:v', '1', '-q:v', '3', `${SHEETS}/${name}.jpg`]);
  console.log(`  -> ${name}.mp4 ${dur.toFixed(2)}s ${(fs.statSync(`${FINAL}/${name}.mp4`).size / 1e6).toFixed(2)} MB, cuts ${items.length}, voices ${voices.length}`);
}

(async () => {
  const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(REELS2);
  for (const n of names) await buildReel(n);
  await closeBrowser();
})().catch(async (e) => { console.error(e); await closeBrowser(); process.exit(1); });
