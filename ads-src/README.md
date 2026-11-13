# Ad pack source (Remotion)

Source of the videos in `public/ads/pack/`. Separate from the site: its own package.json, never imported by the site build.

- `src/specs.ts`: every video as data (scenes, captions, voice lines, sound effects, timings in frames at 30 fps). Change copy and timing here.
- `src/components/`: phone, lock screen, fake client websites with the widget, editor, price cards, end card.
- `public/face/`: the face lip-synced per voice line (fal LatentSync over `public/agent/face.mp4`), plus `IDLE.mp4` (closed mouth loop).
- `public/vo/`: voice lines (fal ElevenLabs v3, voice "Matilda"); texts in `tools/lines.json`.
- `public/sfx/`: UI sounds synthesized by `tools/sfx.py` (no downloads, no music).

Render:
```
npm i
node render.mjs video all ./raw            # one mp4 per composition, crf 14, needs Chromium
node render.mjs stills RA-2304-15s 0,200 ./frames
node render.mjs meta ./meta.json           # specs as JSON for captions
```
Set `REMOTION_BROWSER` to a Chromium binary if the default path does not exist.
`tools/post.py` makes the delivery files (loudness -14 LUFS, H.264 + AAC, 4:5 crop, covers, .srt, safe-zone frames);
edit the paths at its top before running it.

A new voice line needs a new TTS + LatentSync run (about $0.01 per line) and an entry in `VO` in `src/theme.ts`.
