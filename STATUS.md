# Refael.ai website: how it is built

_Last update: 2026-10-24 (site v2: one shell, all landing pages in the app, SEO)._
Live: https://refael-ai-flow.lovable.app · Repo is the source of truth; Lovable builds `main` when you hit Publish.

## Pages (site map)

| URL | What | File |
|---|---|---|
| `/` | Homepage: hero (live Maya demo), product hub, how it works, use cases, packages, FAQ, contact | `src/pages/Index.tsx` |
| `/live-selling` | Maya, AI host for live selling. The funnel page every post/DM points to. Thai shows the Thai host. | `src/pages/LiveSelling.tsx` + `src/content/liveSelling.ts` |
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
- **Prices**: hidden site-wide (`SHOW_PRICES = false` in `src/config/site.ts`, Refael's rule: no public or monthly
  prices). Set it to `true` and every price comes back.
- **A new page**: add the route in `src/App.tsx`, its entry in `routes.json`, call `useSeo({ path })` in the page,
  wrap it in `<SiteLayout sections={...}>`, add it to `PRODUCTS` if it is a product, then `npm run seo`.
- **Social preview cards** (`public/og/*.jpg`, 1200x630): `scripts/og-cards.mjs` (instructions at the top).

## Building blocks

- `src/components/site/SiteLayout.tsx`: header + footer + floating WhatsApp, used by every page.
- `SiteHeader.tsx`: Products menu, the page's own section links, language switch, WhatsApp button, mobile menu.
- `SiteFooter.tsx`: the site map (products, site sections, languages, legal).
- `Seo.tsx`: `useSeo()` sets title, description, canonical, Open Graph, hreflang (he/en/th/x-default) and JSON-LD.
- `RouteEffects.tsx`: keeps `?lang=` in sync with the chosen language; scroll to top / to `#section` on navigation.
- `blocks.tsx`: `SpeakingVideo` (tap for sound, pauses off-screen), `FaqList`, `RelatedProducts`.
- `Price.tsx`: every price renders through it.

## Checks

- `npm run build` must pass (Lovable runs it).
- `npm run qa -- <outDir> "/,/live-selling" "he,en,th"` against `vite preview` (port 4173): screenshots every page x
  language x desktop/mobile and reports console errors, horizontal overflow and broken internal links.

## Known gaps

- `/live-avatar` (flagship) and its sections are Hebrew + English only; Thai visitors see English there.
- English live-selling clip is Maya's general English pitch; a dedicated English live-selling clip needs fal credit.
- Search Console: verify the site and submit `https://refael-ai-flow.lovable.app/sitemap.xml` (needs Refael's Google login).
- Old generalist components under `src/components/landing/`, `portfolio/` and the root `components/*.tsx` are not routed
  (dead code, safe to delete later).
