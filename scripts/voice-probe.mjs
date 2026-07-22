/**
 * voice-probe — proves the hero actually makes sound.
 *
 * The whole page sells voice-to-voice, so "the video plays" is not the bar:
 * we assert the element is UNMUTED, has a real audio track, and that playback
 * time is genuinely advancing. Run against `npx vite preview --port 4173`.
 */
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new',
  // let autoplay-with-sound resolve in headless, mirroring a real user click
  args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio=false'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));

const fail = [];
const ok = [];

// 1. the speaking clip must actually be served, with an audio track
const head = await page.evaluate(async () => {
  const r = await fetch('/media/maya_speaking_he.mp4', { method: 'HEAD' });
  return { status: r.status, type: r.headers.get('content-type'), len: r.headers.get('content-length') };
});
head.status === 200 && +head.len > 100000
  ? ok.push(`clip served: ${head.status} ${head.type} ${(+head.len / 1024).toFixed(0)}KB`)
  : fail.push(`clip not served properly: ${JSON.stringify(head)}`);

// 2. before the click, the hero must be silent (idle loop, muted)
const before = await page.$eval('section video', v => ({ muted: v.muted, src: v.getAttribute('src') }));
before.muted ? ok.push('idle state is muted (correct)') : fail.push('idle video is unmuted — it would blast on load');

// 3. click "hear her speak"
const clicked = await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find(x =>
    /שמעו אותה|Hear her speak|ฟังเธอพูด/.test(x.textContent || ''));
  if (!b) return false;
  b.click();
  return true;
});
clicked ? ok.push('found + clicked the "hear her speak" button') : fail.push('no "hear her speak" button on the page');

await new Promise(r => setTimeout(r, 2500));

// 4. the payoff: unmuted, playing, audio present, time advancing
const t1 = await page.$eval('section video', v => v.currentTime);
await new Promise(r => setTimeout(r, 1500));
const state = await page.$eval('section video', v => ({
  src: v.getAttribute('src'),
  muted: v.muted,
  volume: v.volume,
  paused: v.paused,
  t: v.currentTime,
  dur: v.duration,
  // Chromium exposes these once the audio track decodes
  hasAudio: v.webkitAudioDecodedByteCount > 0 || v.mozHasAudio || Boolean(v.audioTracks?.length),
  decoded: v.webkitAudioDecodedByteCount ?? null,
}));

state.src?.includes('maya_speaking') ? ok.push(`swapped to the speaking clip (${state.src})`) : fail.push(`src did not swap: ${state.src}`);
state.muted === false ? ok.push('video is UNMUTED') : fail.push('video is still muted — visitor hears nothing');
state.volume === 1 ? ok.push('volume at 1.0') : fail.push(`volume is ${state.volume}`);
!state.paused ? ok.push('playing') : fail.push('playback is paused');
state.t > t1 ? ok.push(`time advancing ${t1.toFixed(2)}s → ${state.t.toFixed(2)}s of ${state.dur?.toFixed(1)}s`) : fail.push(`time frozen at ${state.t}`);
state.hasAudio ? ok.push(`audio track decoding (${state.decoded} bytes)`) : fail.push('NO audio bytes decoded — the clip is silent');

// 5. the "her real voice" badge should be visible while speaking
const badge = await page.evaluate(() => /הקול שלה|Her real voice|เสียงจริง/.test(document.body.innerText));
badge ? ok.push('"her real voice" badge visible') : fail.push('speaking badge missing');

await page.screenshot({ path: 'scripts/_voice-probe.png' });
await browser.close();

console.log('\nPASS:');
ok.forEach(l => console.log('  ✓ ' + l));
if (fail.length) {
  console.log('\nFAIL:');
  fail.forEach(l => console.log('  ✗ ' + l));
}
console.log(`\n${ok.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
