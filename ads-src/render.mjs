// Render helper.
//   node render.mjs stills <compId> <frame,frame,...> <outDir>
//   node render.mjs video <compId|all> <outDir>
//   node render.mjs meta <outFile>           (writes all specs as JSON, used for .srt)
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition, getCompositions } from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const BROWSER = process.env.REMOTION_BROWSER || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const [, , mode, a, b, c] = process.argv;
const root = path.dirname(new URL(import.meta.url).pathname);

const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'public') });
const common = { serveUrl, browserExecutable: BROWSER, chromiumOptions: { gl: 'swangle' } };

if (mode === 'meta') {
  const comps = await getCompositions(serveUrl, { browserExecutable: BROWSER });
  fs.writeFileSync(a, JSON.stringify(comps.map((x) => x.defaultProps.spec), null, 1));
  console.log('meta', comps.length);
} else if (mode === 'stills') {
  const comp = await selectComposition({ ...common, id: a, inputProps: {} });
  fs.mkdirSync(c, { recursive: true });
  for (const fr of b.split(',').map(Number)) {
    const out = path.join(c, `${a}_${String(fr).padStart(4, '0')}.jpg`);
    await renderStill({ ...common, composition: comp, frame: fr, output: out, imageFormat: 'jpeg', jpegQuality: 90 });
    console.log(out);
  }
} else if (mode === 'video') {
  const comps = await getCompositions(serveUrl, { browserExecutable: BROWSER });
  const ids = a === 'all' ? comps.map((x) => x.id) : a.split(',');
  fs.mkdirSync(b, { recursive: true });
  for (const id of ids) {
    const comp = comps.find((x) => x.id === id);
    const tmp = path.join(b, `${id}.tmp.mp4`);
    const t0 = Date.now();
    await renderMedia({
      ...common,
      composition: comp,
      codec: 'h264',
      crf: 14,
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '320k',
      outputLocation: tmp,
      concurrency: Number(process.env.CONC || 4),
      onProgress: ({ progress }) => {
        if (Math.round(progress * 100) % 25 === 0) process.stdout.write(`\r${id} ${Math.round(progress * 100)}%   `);
      },
    });
    fs.renameSync(tmp, path.join(b, `${id}.mp4`));
    console.log(`\n${id} done in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
}
