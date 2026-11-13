# Ad reel build scripts

Source of the reels in `public/ads/`. Text overlays are HTML/CSS (RTL, Assistant / Suez One / Inter) rendered to transparent PNG frames with Playwright, composited over the clips with ffmpeg, one file per scene, joined with the concat demuxer.

- `scenes.js` + `build.js`: v1 reels (`node build.js [reel-name]`).
- `scenes2.js` + `build2.js`: v2 draft cuts (stopped).
- `lib.js`: overlay renderer and scene compositor.

Paths at the top of `lib.js` point to the scratch work folder used on 2026-11-12 (source clips in `work/src`, fonts in `work/fonts`); set `W` to your own folder and copy the clips listed in `scenes.js` there before rebuilding.
Run with `NODE_PATH=$(npm root -g) node build.js`.
