# Brief: co-host launch + agent campaign (approved by Refael 2026-11-02 23:44 PT)

Hand this to the agent/model doing the work. Everything below is approved; do not re-ask Refael. Show him only: finished posts for one-line approval, and the homepage once rearranged.

## Hard rules (break none)
- No em dashes (—) or double dashes anywhere. The copy bank in the repo has them; strip every one.
- No prices on screen, in posts, or on the site (SHOW_PRICES=false). Both room stills carry a "₪149" card: crop or cover it before use.
- Co-host footage = "private tests", never "aired", never "live" as if public. Generated clips (cohost-scene) never presented as a real live.
- "a viewer comment", never "viewers". Co-host test comments were planted. The one real comment in the Professor live was Refael's own account: say "a real comment".
- The one-room layout is "coming" (concept still), not real. The woman beside Maya is a stand-in. Dana (hostdrop clip) is stock footage, not a client.
- Never use jewellery-lead-* footage. Zara clips are Zara, not Maya.
- English replies to Refael. Short. Pick one option, do not offer five.
- Posts via API only (Page + YouTube). Groups need facebook.com allowed in his Chrome extension; it is currently blocked, so queue group posts with `rm groups` and tell him, do not retry Chrome.
- Never DM from @refaeldance. Never enter passwords or the Messenger PIN.

## Repos and paths
- Website: `/home/claude/refael-ai-flow` (GitHub `dsbeauty01-web/refael-ai-flow`, branch main, Lovable deploys; Refael presses Publish in Lovable).
- Assets: `/home/claude/maya-lt`, remote branches `lane/motion-transfer` (videos in `release/share/`, marketing pack in `release/marketing/cohost/`) and `lane/cohost-live` (layout previews `bench/results/cohost-split/`, room stills `release/proof/`). Both already fetched; `FETCH_HEAD` = lane/motion-transfer.
- Marketing CLI: `cd /home/claude/refael-marketing && python3 -m rm --help` (commands: fb, post, reels, groups, stats, cold). Page posting and YouTube already worked this way (Chef/Zara post ids in project memory).
- Scratch: `/tmp/claude-0/-home-claude/12135856-f7b4-51df-9fb9-1cc85e2aff5b/scratchpad/cohost/` holds sbs_preview.mp4, split_preview.mp4, SMART-ROOM-wide-v3.jpg, SMART-ROOM-close.jpg, L1-widget-br.jpg, full-he.mp4, full-en.mp4 (74 s explainers).

## Already done this session (do not redo)
- Co-host added to `src/config/site.ts` PRODUCTS at position 2, path `/co-host` (page does NOT exist yet, 404).
- `CapabilitiesShowcase.tsx`: 3 landscape proof cards (agent-ad, cohost-product, tools-showcase) + 6 portrait demos (skinread, gallery, professor, zara-vote, cohost-human, nova-kids). HowItWorks uses tools-showcase.mp4. ProductsGrid heading "Seven ways".
- Compressed assets in `public/site/`: agent-ad, cohost-scene, cohost-product (30 s silent clip), cohost-human, tools-showcase, zara-vote (each .mp4 + .jpg), plus `cohost-explainer-he.mp4`, `cohost-explainer-en.mp4` (74 s, with audio, 2.9 MB each) and `cohost-explainer.jpg`. The explainer files are NOT committed yet.
- Reels A and B (HE+EN, 9x16) delivered to Refael as files.

## Task 1: build `/co-host` page
Template: `src/pages/LiveSelling.tsx` + `src/content/liveSelling.ts` (SiteLayout, SpeakingVideo, FaqList, RelatedProducts, useSeo). Add route in `src/App.tsx` (lazy), entry in `src/config/routes.json` (title/description HE/EN/TH, priority 0.9), OG: reuse `/og/site-{lang}.jpg` unless you render a new card.
Sections, in order:
1. Hero: kicker + H1 from hook 1 ("Go live. You're not alone anymore." / "עולים ללייב. כבר לא לבד."), lead = one-pager "one breath" paragraph. Video = `cohost-explainer-{he|en}.mp4` (Thai uses en), with the "Hear her" button. Proof strip: ~2.75 s answer · yields in 0.3 s · Hebrew voice, lips in sync. Label under strip: "measured in private tests, Oct to Nov 2026".
2. The 3 layouts (Refael's framing): (a) **Same room**: Maya full body beside the owner, one room. Still = SMART-ROOM-wide-v3.jpg with price card cropped. Badge "coming". (b) **Cam to cam**: side by side, call style, owner left, Maya right, "AI co-host" chip. Video = sbs_preview.mp4 (compress, silent, loop). Badge "available now". (c) **Main host + small co-host**: owner full frame, Maya in a corner widget. Still = L1-widget-br.jpg, price card cropped. Badge "available now". One line: the client picks the layout per show.
3. The 8 features (from COHOST-FEATURES.json, HE names given there): greets · answers when you pause · stops when you speak · covers your connection drop · fills the silence with your product · knows the catalogue, never invents a discount · answers a viewer comment by name · closes the show if you vanish. Short body each.
4. "Real today vs coming" strip: real = everything above on the side-by-side screen; coming = one-room shot, viewer memory across lives, booking and lead capture inside the co-host show (real in solo Maya shows, link to /live-selling).
5. How it starts (3 steps): send your product list → one private test live on your phone, one link, nothing to install → you watch, you decide.
6. FAQ = the 5 objections from the one-pager, em dashes stripped.
7. CTA: WhatsApp (HE/EN) or LINE (TH), message prefilled. Then RelatedProducts.
Translate TH naturally, ครับ endings, flag that no native check happened.
Then: `npx tsc --noEmit`, commit (attribution lines per session reminder), push main. Tell Refael to Publish in Lovable.

## Task 2: 3 "full agent" posts × 3 languages, ~4 groups
Theme: our host is a full AI agent (sells, books, captures leads, replies by name), not just a talking face. Media priority: `agent-ad` (main ad, 38 s, share files `agent-ad-{en,he}-{16x9,9x16}` if present, else the 25 s clip in public/site), `tools-showcase`, Reel A, Reel B, co-host explainer.
- Post 1 (agent ad): hook on "not just a host, an AI agent for your business". Proof list in text: buy link, comment reply by name, calendar booking, lead to Sheet, payment in demo mode.
- Post 2 (tools showcase): "5 tools fired in one private test live", honest framing.
- Post 3 (co-host): FB caption 2 from COHOST-COPY.md (the café story), em dashes stripped, "comment LIVE" CTA.
Languages: HE primary, EN, TH (Thai per thai-marketing skill: ครับ, soft question at the end, searchable phrases ไลฟ์ขายของ แม่ค้าออนไลน์, post 12:00 to 13:30 or 20:00 to 22:00 GMT+7, LINE CTA).
Channels: FB Page via `rm fb` (link in first comment, Hebrew first), YouTube via `rm post youtube`. Groups: pick 4 from the HE list not yet posted (done: ids 3,4,5,7,8) + the Thai groups 33 to 43 + EN groups 23 to 32; queue with `rm groups`, max 3 per run; blocked on Chrome, so queue and report.
Show all 9 captions to Refael in one message for a one-word approval before publishing. Log post ids.

## Task 4: YouTube
Upload agent ad (16x9 or 9x16 as Short) and Reel A HE via `rm post youtube`, titles HE+EN, no prices, description links to refael-ai-flow.lovable.app/co-host and /live-selling.

## Task 5: homepage rearranged around tools + co-host
Order after Hero: ProductsGrid (co-host tile already position 2) → CapabilitiesShowcase proof cards first (agent-ad, cohost, tools) → the rest. Fix two honesty lines in CapabilitiesShowcase: tools-showcase subtitle "All from one live" → "from two private test lives"; zara-vote "Viewers vote" → "A vote runs in the comments". Consider moving CapabilitiesShowcase above AvatarsSection/LiveProof so proof is above the fold on scroll. Screenshot the homepage (Playwright, deviceScaleFactor 2, HE) and send it to Refael for approval.

## Facts you may claim (measured)
~2.75 s median answer, lips in sync (17 replies) · stops within ~0.3 s when the owner speaks (322 ms) · Hebrew voice ElevenLabs, Hebrew ears · one link on the phone, nothing to install · 15 real Facebook lives for the solo host (already on /live-selling).
Not commercial yet (never promise): LLM stall up to 12 s, answers filler, flat fill lines, viewer memory, tools inside the co-host show.

## Pricing
Ladder agreed 2026-10-30 (Try free → Starter ₪69 → Pro ₪549 → Business ₪1,450/mo → custom character ₪2,500 → done-for-you live ₪550 to 700). Co-host tier undecided. Nothing public.
