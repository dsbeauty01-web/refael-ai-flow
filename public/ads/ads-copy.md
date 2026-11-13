# Meta ad test: live talking-face customer-service agent

Landing page: https://refael-ai-flow.lovable.app/customer-service
Files: `public/ads/`. v1 (`reel-*.mp4`) = calmer cuts, now on /customer-service in the "Short videos" section. v2 (`*-v2.mp4`) = punchier draft cuts, stopped on 2026-11-12 because a separate commercial ad pack replaces them; kept for reference only (known issue: the comparison bars scene in `reel-3-why-us-he-v2.mp4` renders blank, not fixed). The copy below fits the v1 reels and whatever ad pack replaces them.
Build scripts: `tools/ads-reels/` (Playwright HTML overlays + ffmpeg). Every reel is 9:16, 1080x1920, burned-in Hebrew captions, works with sound off.

House rules applied: no em dashes, no character names, no invented numbers or testimonials. The only outside number (7.75% to 26.58%) is always labelled as a vendor case study. Competitor prices are published list prices (HeyGen blog, updated Oct 29 2026, $1 = ₪3.08), no logos.

## Where the price appears (for a fast swap)

| Reel | Price on screen |
|---|---|
| All reels, end card (v2) | "₪99 לחודש." + "שעה של שיחות." + "הקמה ₪0 · מבטלים בכל חודש" (en: "₪99 a month." + "An hour of conversations.") |
| All reels, end card (v1) | "מ־₪99 לחודש" pill + "שעה של שיחות · הקמה ₪0 · מבטלים בכל חודש" |
| Reel 3 (both versions) | comparison bars: HeyGen ≈₪23,600, D-ID ≈₪16,900, Tavus ≈₪10,100, Refael.ai ₪4,680 (first year) + "מסלול Business: ₪390 לחודש"; v1 tech scene and v2 last beat: "הקמה ₪0" |
| Reel 4 v2 | price beat before the end card: "₪99 לחודש. שעה של שיחות." |
| Reel 2 v1 / Reel 5 | no price outside the end card |

Price strings live in `scenes.js` (`T.he.price`, `endSmall`) and `scenes2.js` (`endCard2`, `R4T.price`) in the build scripts; one edit + rebuild changes every reel.


## Reel 1: "המחקר" (the research)
Files: `reel-1-research-he-v2.mp4` (paid test), `reel-1-research-he.mp4` (site)

- **Primary text:**
  מקרה בוחן של ספק: אחרי שהוסיפו לאתר אווטאר מדבר, שיעור המבקרים שפתחו שיחה עלה מ־7.75% ל־26.58%.
  אצלכם זה נציג חי בפינת האתר שמדבר עברית ושולח לכם את הליד.
  הדגמה של 3 דקות על האתר שלכם, בחינם.
- **Headline:** פנים מדברות באתר שלכם (21)
- **Description:** ₪99 לחודש, שעה של שיחות
- **CTA button:** שלחו הודעה (Click to WhatsApp)
- **Hypothesis:** a number in the first seconds stops the scroll. Reel 1 gets the highest 3-second hook rate of the five; its cost per WhatsApp conversation lands within 20% of the median (curiosity, not buying intent).

## Reel 2: "במקום צ'אט משעמם" (instead of a boring chat widget)
Files: `reel-2-chat-he-v2.mp4`, `reel-2-chat-he.mp4`

- **Primary text:**
  בועת הצ'אט בפינת האתר מחכה שמישהו יקליד.
  במקומה: פנים חיות שמברכות כל מבקר, עונות בקול בעברית וקובעות פגישה.
  שורת קוד אחת. עובד על וורדפרס, ויקס, שופיפיי וכל אתר.
- **Headline:** במקום צ'אט, נציג עם פנים (24)
- **Description:** הקמה ₪0. מבטלים בכל חודש
- **CTA button:** שלחו הודעה
- **Hypothesis:** owners who already run a chat widget recognise their own site. Reel 2 beats reel 1 on link CTR (problem-aware angle), with a similar hook rate.

## Reel 3: "למה אנחנו" (why us; price + tech, for people who already want one)
Files: `reel-3-why-us-he-v2.mp4`, `reel-3-why-us-he.mp4`; English: `reel-3-why-us-en-v2.mp4`, `reel-3-why-us-en.mp4`

- **Primary text (he):**
  HeyGen, D-ID ו־Tavus מוכרים פנים מדברות. אנחנו מספקים נציג שמדבר ועובד: שומר ליד, קובע פגישה, שולח לינק.
  שנה ראשונה, 150 דקות בחודש, הכל כלול: ₪4,680 אצלנו, מול כ־₪10,100 עד כ־₪23,600 לפי המחירונים שפורסמו (אוק׳ 2026).
  מנוע משלנו, על GPU משלנו. הקמה ₪0.
- **Headline:** נציג AI עם פנים, ₪390 לחודש (28)
- **Description:** מחירי מחירון כפי שפורסמו, אוק׳ 2026
- **CTA button:** מידע נוסף (to /customer-service#pricing)
- **Primary text (en):**
  HeyGen, D-ID and Tavus sell a talking face. We deliver a talking agent: it saves the lead, books the meeting, sends the link.
  First year, 150 minutes a month, all-in: ₪4,680 with us, against about ₪10,100 to ₪23,600 at their published list prices (Oct 2026).
  Our own engine on our own GPUs. Setup ₪0.
- **Headline (en):** A talking AI agent, ₪390 a month (32)
- **Description (en):** Published list prices, Oct 2026
- **CTA button (en):** Learn more
- **Hypothesis:** solution-aware buyers convert on price + proof. Reel 3 has the lowest hook rate but the lowest cost per WhatsApp conversation of the five.
- Comparison basis: first year, 150 min/month, custom character, all-in incl. AI agent hosting and a developer. Source: HeyGen's blog price list updated Oct 29 2026, $1 = ₪3.08. Refael.ai = Business ₪390 x 12.

## Reel 4: "כל עסק" (any business)
Files: `reel-4-any-business-he-v2.mp4`, `reel-4-any-business-he.mp4`; English: `reel-4-any-business-en-v2.mp4`, `reel-4-any-business-en.mp4`

- **Primary text (he):**
  מרפאה, קוסמטיקה, מספרה, כושר, מסעדה.
  נציג חי בפינת האתר שמברך כל מבקר בעברית ושולח לכם את הליד לוואטסאפ.
  ₪99 לחודש, שעה של שיחות.
- **Headline:** נציג חי לאתר של כל עסק (22)
- **Description:** הדגמה חיה של 3 דקות, בחינם
- **CTA button:** שלחו הודעה
- **Primary text (en):**
  Clinic, beauty, salon, gym, restaurant.
  A live agent in the corner of your site that greets every visitor and sends you the lead on WhatsApp.
  ₪99 a month for an hour of conversations.
- **Headline (en):** A live agent for any business site (34)
- **Description (en):** Free 3-minute live demo
- **CTA button (en):** Send message
- **Hypothesis:** seeing their own kind of business is the strongest relevance cue. Reel 4 gets the highest link CTR of the five.

## Reel 5: "תראו אותה עובדת" (watch it work)
Files: `reel-5-watch-it-work-he-v2.mp4`, `reel-5-watch-it-work-he.mp4`

- **Primary text:**
  ככה זה נשמע: היא מברכת את המבקרים, עונה על שאלות ומזמנת פגישות ליומן.
  כשמישהו משאיר פרטים, השם והטלפון מגיעים אליכם לוואטסאפ.
  רוצים לראות את זה על האתר שלכם? 3 דקות, בחינם.
- **Headline:** תשמעו אותה מדברת עברית (21)
- **Description:** ₪99 לחודש, שעה של שיחות
- **CTA button:** שלחו הודעה
- **Hypothesis:** hearing the Hebrew voice is the proof. Reel 5 gets the best average watch time and the lowest cost per WhatsApp conversation among the cold-audience angles (1, 2, 4, 5).
- Honesty note: the speaking clip is a pre-produced demo clip (voice + lip-sync), tagged "סרטון הדגמה". The WhatsApp card is a generic drawn example tagged "דוגמה להמחשה". The Google Sheets card is from an internal n8n test run (another test row painted out).


## Test plan (1 page)

**Goal:** find the angle with the cheapest real WhatsApp conversation, then scale it.

**Setup**
- Campaign objective: Engagement, conversion location Messaging apps (WhatsApp), so Meta reports cost per conversation started.
- One ad set per reel (ABO), **same daily budget for each** so every angle gets equal spend. Run the 5 Hebrew reels (or the replacement pack, one ad per angle).
- Same audience in every ad set: Israel, Hebrew, ages 25 to 60, interests: small business, small business owners, e-commerce, clinics (dental, aesthetics, beauty). Advantage+ audience off for the test so audiences stay identical.
- Placements: Facebook + Instagram Reels and Stories (Feed allowed). Same primary text length, same CTA type per reel as above.
- English reels 3 and 4: separate small ad set (English-speaking business owners in Israel) or organic posts in the English groups; not part of the 5-way comparison.

**Run:** 4 to 5 days. Do not edit ads during the run (edits reset learning). Each ad needs at least 1,000 impressions before a call.

**Metrics** (read per ad, in this order)
1. **3-second hook rate** = 3-second video plays / impressions. Tells which opening stops the scroll.
2. **CTR (link click-through rate)**. Tells which angle makes people want more.
3. **Cost per WhatsApp conversation started**. The deciding number.

**Decision on day 4 or 5**
- Rank by cost per WhatsApp conversation (ties: higher CTR wins).
- **Kill the bottom 2.**
- **Scale the top one:** raise its budget 20 to 30% every 2 to 3 days while cost per conversation holds.
- Keep #2 and #3 running at the test budget as challengers.
- If a reel wins on hook rate but loses on cost per conversation, keep its opening and pair it with the winner's middle and CTA in the next round.

**Next round:** 3 new hooks on the winning angle (different first second, same body), same rules.
