# STATUS — Refael.ai LIVE AVATAR landing page

_Last update: 2026-07-15 (CLI took over from Lovable — credits dead; repo is now the source of truth)_

## DONE
- **Prompt 1 (full page rebuild) LANDED** in commit `cf88caf` before Lovable credits died. All sections exist under `src/components/refael/`:
  navbar → hero (typed greeting + caret + 2 CTAs + capability strip) → "לא עוד סרטון מדבר" (4 differentiators) → "תכירו את השלושה" (3 alternating avatar cards) → comparison table (mono numbers, Refael row highlighted) → use cases (5) → pricing (₪9,500 / ₪1,490) → lead form (n8n webhook) → one-line footer.
- **Non-negotiable demo logic** is in, verbatim: `src/config/avatars.ts` (all podUrl/kioskUrl = null) + `src/hooks/useAvatarStatus.ts` (3s abort, 60s poll). Card states: checking = shimmer, live = gradient pulse + "פתחו שיחה חיה" new tab (no iframe), offline = grey badge + muted looping video, missing video → named poster div. No dead states possible.
- **Design system**: midnight/surface/hologram-gradient tokens in `index.css` + `tailwind.config.ts`; gradient reserved for live/interactive elements; Suez One / Assistant / Space Grotesk / Inter / IBM Plex Mono loaded in `index.html`.
- **i18n**: Hebrew default, EN/עב toggle in navbar, persisted to `localStorage("refael_lang")`, `document.documentElement.dir/lang` kept in sync.
- **prefers-reduced-motion**: typed greeting renders instantly; pulse/caret/shimmer/fade-up disabled in CSS.
- **RTL fix (CLI, 2026-07-15)**: removed `md:[direction:ltr]` hack in `AvatarsSection.tsx` — it broke card alternation in Hebrew and forced LTR direction onto Hebrew text in reversed rows. Order classes alone now handle alternation in both languages.
- Old generalist-site components still exist under `src/components/` (landing/, portfolio/, etc.) but are **not routed** — `Index.tsx` renders only the new refael page. Left in place (ship > polish); safe to delete later.

## NEXT
1. `npm run build` verify → commit → push → **Refael hits Publish in Lovable** (free) to flip the live URL.
2. Drop the 3 demo videos into `public/demos/` as `maya.mp4`, `nova_dance.mp4`, `nova_close.mp4` (until then every card shows the named-poster fallback — by design, looks intentional).
3. When a pod is up: paste its proxy URL + kiosk URL into `src/config/avatars.ts` (one file, nothing else to touch). Pod must serve `GET /health` → 200 + `Access-Control-Allow-Origin: *`.

## BLOCKED / WAITING ON REFAEL
- **`lovable-rebuild-prompts.md` is NOT in the repo or on this machine** — copy could not be verified verbatim against the pack, and Prompt 3 (polish spec) is unknown. Send the file if anything reads off.
- Real WhatsApp number (placeholder `wa.me/972000000000` in `src/config/avatars.ts`).
- Confirm pricing ₪9,500 / ₪1,490 (placeholders, already on the page).
- Keep or rename "מיה" (Maya).
- Hologram-lobby hero image (hero currently uses the gradient `hero-bg`; swap slot ready).
- Lead form posts to the old n8n webhook `rafa5555.app.n8n.cloud/webhook/lead-email` — confirm it's still live.
