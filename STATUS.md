# Refael.ai website: how it is built

_Last update: 2026-11-12 (/live-selling v3: platform phones, client-first copy)._
Live: https://refael-ai-flow.lovable.app · Repo is the source of truth; Lovable builds `main` when you hit Publish.

## Pages (site map)

| URL | What | File |
|---|---|---|
| `/` | Homepage: hero (live Maya demo), product hub, how it works, use cases, packages, FAQ, contact | `src/pages/Index.tsx` |
| `/customer-service` | Live AI website agent (talking face in the corner of any site). v2 (Nov 12 2026): video-first. Hero clinic mock with the face loop, "hear it talk" (speaking clip per language + 3 character-style loops), "see it work" (tools recording with sound), 3 steps, **prices** (Demo ₪0, Start ₪99 for 60 minutes, Business ₪390 recommended, Pro ₪790; setup ₪0; headline "a conversation from about ₪4"), first-year bars vs HeyGen/Tavus/D-ID with breakdown + sources, short FAQ with honest limits. Autoplay budget: max 2 clips play at once, only on screen, none for reduced motion. Web cuts of clips live in `public/agent/`. `/noa` and `/live-agent` redirect here. | `src/pages/AgentPage.tsx` + `src/content/agentPage.ts` |
| `/live-selling` | AI live host. v3 (Nov 12 2026): written for the seller, sections in the order of the buyer's questions (each opens with the question as an eyebrow). Hero = the real Professor YouTube/Facebook live (30.10.2026) + 3-step caption + plain-text proof chips (YouTube LIVE, Facebook LIVE, 30.10.2026). **Platform section**: three CSS phone frames (no logos, platform name as text), each with a clip, its honesty tag in the frame header and a sample chat marked "Example": YouTube = real live cut (`site/platform-youtube-real.mp4`), Facebook = real live cut (`site/platform-facebook-real.mp4`), TikTok = recorded test (`site/maya-live-test.mp4`, needs LIVE access + stream key, not tested on a real TikTok live). 8-clip gallery (one plays at a time; new: Zara jacket recorded test, puppy + robot pre-recorded clips; Thai and gallery clips re-cut without fake app UI / viewer counts), co-host section (bigger test clip + 3 things she does, "still in private testing"), use-cases strip, **prices per live hour** (test live ₪0 for 10 min, ₪199 an hour, 10 hours ₪1,490, own character = quote), short client FAQ. **Every clip carries a true tag** (`TAGS` in the content file: real live / recorded test / pre-recorded clip); never upgrade a tag without proof. Old fallbacks for `/ai-avatar` and `/brand-character` moved to `src/content/landingDefaults.ts`. | `src/pages/LiveSelling.tsx` + `src/content/liveSelling.ts` |
| `/live-avatar` | Flagship: Maya as a full-body lobby/museum/showroom avatar | `src/pages/Maya.tsx` + `src/components/maya/*` |
| `/ai-avatar` | Keyword page: talking AI avatar for business | `src/pages/Landing.tsx` + `src/content/landings.ts` |
| `/brand-character` | Keyword page: AI brand character / mascot (Nova) | same as above |
| `/voices` | Live voice agents you can call from the page | `src/pages/Voices.tsx` |
| `/legal/privacy` `/legal/terms` `/legal/accessibility` | Legal | `src/pages/Legal.tsx` + `src/content/legal.ts` |

Every page is in Hebrew (default), English and Thai: add `?lang=en` or `?lang=th`.

## Old URLs (do not delete these files)

| Old | Goes to |
|---|---|
| `/maya.html` (in FB posts, comments, DMs) | `/live-selling` |
| `/maya-en.html`, `/maya-th.html` | `/live-selling?lang=en` / `?lang=th` |
| `/maya` (old nav link) | `/live-avatar` |
| `/ai-live-host.html`, `/ai-avatar-business.html`, `/ai-brand-character.html` | `/live-selling`, `/ai-avatar`, `/brand-character` |

The `.html` files are redirect stubs that keep their Facebook preview card, and `?utm`/`fbclid` survive the
redirect. **Share `maya.html` / `maya-en.html` / `maya-th.html` on Facebook**: Facebook's preview bot does not run
JavaScript, so these stubs are what give the right card per language.
`public/privacy.html` is NOT a stub: it is the privacy + data-deletion URL registered with the Meta app.

## How to change things

- **Copy** for a page: the matching file in `src/content/` (every string has `he`, `en`, `th`). No em dashes.
- **Products** (header menu, homepage hub, footer): `PRODUCTS` in `src/config/site.ts`.
- **SEO titles/descriptions**: `src/config/routes.json`. Then run `npm run seo` to regenerate `public/sitemap.xml`
  and the redirect stubs.
- **Prices**: hidden site-wide (`SHOW_PRICES = false` in `src/config/site.ts`), EXCEPT on `/customer-service` and
  `/live-selling`, which show their own prices directly (Nov 2026). A page whose `sections` include `#pricing` takes over the header's Pricing link. The header has a "Pricing" link to `/customer-service#pricing`.
  Set `SHOW_PRICES` to `true` and every other price comes back.
- **A new page**: add the route in `src/App.tsx`, its entry in `routes.json`, call `useSeo({ path })` in the page,
  wrap it in `<SiteLayout sections={...}>`, add it to `PRODUCTS` if it is a product, then `npm run seo`.
- **Social preview cards** (`public/og/*.jpg`, 1200x630): `scripts/og-cards.mjs` (instructions at the top).

## Building blocks

- `src/components/site/SiteLayout.tsx`: header + footer + floating WhatsApp, used by every page.
- `SiteHeader.tsx`: Products menu, the page's own section links, language switch, WhatsApp button, mobile menu.
- `SiteFooter.tsx`: the site map (products, site sections, languages, legal).
- `Seo.tsx`: `useSeo()` sets title, description, canonical, Open Graph, hreflang (he/en/th/x-default) and JSON-LD.
- `RouteEffects.tsx`: keeps `?lang=` in sync with the chosen language; scroll to top / to `#section` on navigation.
- `autoplay.tsx`: shared autoplay budget (max 2 clips playing, only on screen, none for reduced motion) + sound button, used by `/customer-service` and `/live-selling`.
- `blocks.tsx`: `SpeakingVideo` (tap for sound, pauses off-screen), `FaqList`, `RelatedProducts`.
- `Price.tsx`: every price renders through it.

## Checks

- `npm run build` must pass (Lovable runs it).
- `npm run qa -- <outDir> "/,/live-selling" "he,en,th"` against `vite preview` (port 4173): screenshots every page x
  language x desktop/mobile and reports console errors, horizontal overflow and broken internal links.

## Known gaps

- `/live-avatar` (flagship) and its sections are Hebrew + English only; Thai visitors see English there.
- `/avatar-videos` plays `public/media/maya_speaking_{he,en,th}-v2.mp4` (Nov 12 2026: new ElevenLabs v3 voice "Matilda" + LatentSync lips via fal). The homepage and `/customer-service` (`public/agent/talk-*.mp4`) still use the old OpenAI-voice cuts.
- `/ai-avatar` still plays `/maya/maya-live.mp4` (the ad removed from `/live-selling`).
- Search Console: verify the site and submit `https://refael-ai-flow.lovable.app/sitemap.xml` (needs Refael's Google login).
- Old generalist components under `src/components/landing/`, `portfolio/` and the root `components/*.tsx` are not routed
  (dead code, safe to delete later).

## Analytics
GA4 measurement ID: G-9RW8J7CTBE (property created 2026-11-04, account dsbeauty01@gmail.com). Meta Pixel: 2243359692576106. Both set in index.html.
