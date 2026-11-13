# Refael.ai Meta ad pack: the live website agent (Hebrew)

Built 12.11.2026 from PLAN-v2. Product: the talking AI agent in the corner of a business website (page: /customer-service).
Every video carries a "דמות AI" label on the face and "המחשה" on scripted demo scenes. The websites in the videos
(קליניקת הדר, סטודיו גלים, סטודיו תנועה) are invented for the illustration. The face, her voice and her lip movement are the
product's real character, voiced with the same ElevenLabs voice that is on the site.

## Files (public/ads/pack/)

- 23:04 (story): RA_2304_15s_9x16_he.mp4 (cold), RA_2304_15s_4x5_he.mp4 (feed), RA_2304_7s_9x16_he.mp4 (bumper), RA_2304_38s_9x16_he.mp4 (long, retargeting)
- שורה אחת (install): RA_line_15s_9x16_he.mp4, RA_line_15s_4x5_he.mp4, RA_line_8s_9x16_he.mp4, RA_line_31s_9x16_he.mp4
- משמרת לילה (price): RA_night_15s_9x16_he.mp4, RA_night_15s_4x5_he.mp4, RA_night_7s_9x16_he.mp4, RA_night_31s_9x16_he.mp4
- פנים (face vs chat vs voice): RA_face_15s_9x16_he.mp4, RA_face_15s_4x5_he.mp4, RA_face_32s_9x16_he.mp4 (no bumper)

Each video has a cover (same name, .jpg) and a Hebrew caption file (same name, .srt).
Safe-zone check frames: RA_2304_15s_9x16_he_safezone.jpg, RA_line_15s_9x16_he_safezone.jpg, RA_night_15s_9x16_he_safezone.jpg, RA_face_15s_9x16_he_safezone.jpg
(red = Reels UI top 14% and bottom 35%, orange = action rail on both sides because Hebrew UI mirrors it, cyan = 4:5 crop, y 260 to 1610).

Specs: 1080x1920 (4:5 = 1080x1350), 30 fps, H.264 High yuv420p, AAC 160k 48 kHz, faststart, -14 LUFS integrated, true peak under -1.5 dBFS.
Captions are burned in. Upload the .srt anyway (Meta shows it when a viewer turns captions on). Sound: her voice plus UI sounds, no music.

Source to re-render: ads-src/ (Remotion). `npm i`, then `node render.mjs video all <outDir>`; see ads-src/README.md.


## Ad 1: 23:04 (story)

**Hypothesis:** with the same broad audience and budget, 23:04 gets the highest 3-second hook rate of the three (target 30%+) and a lower cost per WhatsApp conversation than "שורה אחת", because a specific late-night moment stops the scroll better than a setup step.

**Primary text 1**
```
23:04. מישהי נכנסה לאתר שלכם ורוצה לדעת כמה עולה טיפול. עכשיו יש מי שעונה לה.
עוזרת AI בפינת האתר מדברת עם המבקרים בקול, בעברית, מתוך המחירון שלכם. השם והטלפון מחכים לכם בוואטסאפ בבוקר.
הדגמה חיה של 3 דקות על האתר שלכם. בחינם.
₪99 לחודש / שעת שיחה. הקמה ₪0.
```
**Primary text 2**
```
שאלות על מחירים מגיעות גם אחרי שעות הפעילות. עוזרת AI באתר עונה עליהן בקול, בעברית, 24/7, ושולחת לכם את הליד לוואטסאפ.
שלחו לנו כתובת אתר ותקבלו הדגמה חיה של 3 דקות, בחינם.
```
**Primary text 3**
```
גם בלילה נכנסים לאתר שלכם. מי עונה? הדגמה חיה של 3 דקות על האתר שלכם, בחינם. ₪99 לחודש / שעת שיחה, הקמה ₪0.
```
**Headlines** (max 40)
1. עוזרת AI שעונה באתר שלכם, גם בלילה
2. הדגמה חיה על האתר שלכם, בחינם
3. ₪99 לחודש / שעת שיחה. הקמה ₪0

**Description:** שורת קוד אחת. מבטלים בכל חודש.
**CTA button:** Send WhatsApp message (שליחת הודעה ב-WhatsApp). Website variant: Learn more.
**WhatsApp opener (prefilled):** היי רפאל, ראיתי את הסרטון של 23:04. אשמח להדגמה חיה של 3 דקות על האתר שלי:
`https://wa.me/972533217125?text=%D7%94%D7%99%D7%99%20%D7%A8%D7%A4%D7%90%D7%9C%2C%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%A1%D7%A8%D7%98%D7%95%D7%9F%20%D7%A9%D7%9C%2023%3A04.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%93%D7%92%D7%9E%D7%94%20%D7%97%D7%99%D7%94%20%D7%A9%D7%9C%203%20%D7%93%D7%A7%D7%95%D7%AA%20%D7%A2%D7%9C%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%D7%99%3A%20`

**UTM links (website variant)**
- 15 s 9:16: `https://refael-ai-flow.lovable.app/customer-service?utm_source=meta&utm_medium=paid&utm_campaign=widget_test&utm_content=2304_15s`
- 15 s 4:5: `...&utm_content=2304_15s_4x5`
- bumper: `...&utm_content=2304_7s`
- long: `...&utm_content=2304_38s`


## Ad 2: שורה אחת (install)

**Hypothesis:** "שורה אחת" gets the highest link CTR of the three (people who already run a site see how little work it is), but a hook rate at least 5 points below 23:04, because a site editor is a weaker first frame than a phone at night.

**Primary text 1**
```
הדבקתם שורה אחת באתר, ובפינה מופיעה עוזרת AI שמדברת עם המבקרים. היא עונה בקול, בעברית, מתוך המידע של העסק, ושולחת לכם כל ליד לוואטסאפ.
עובד על WordPress, Wix, Shopify וכל אתר אחר. את הדמות, הקול והידע אנחנו מקימים בשבילכם. הקמה ₪0.
רוצים לראות אותה על האתר שלכם? הדגמה חיה של 3 דקות, בחינם.
```
**Primary text 2**
```
שורת קוד אחת, והאתר שלכם מתחיל לענות ללקוחות בקול. ₪99 לחודש / שעת שיחה, מבטלים בכל חודש. הדגמה חיה בחינם.
```
**Primary text 3**
```
יש לכם אתר? אפשר לתת לו קול. עוזרת AI עונה למבקרים, שומרת את השם והטלפון שלהם ושולחת לכם. שלחו כתובת אתר ותראו אותה על האתר שלכם תוך 3 דקות.
```
**Headlines**
1. שורה אחת באתר. עוזרת שעונה בקול
2. עובד על כל אתר. הקמה ₪0
3. הדגמה חיה של 3 דקות, בחינם

**Description:** ₪99 לחודש / שעת שיחה
**CTA button:** Send WhatsApp message. Website variant: Learn more.
**WhatsApp opener:** היי רפאל, ראיתי את הסרטון על שורת הקוד. אשמח להדגמה חיה של 3 דקות על האתר שלי:
`https://wa.me/972533217125?text=%D7%94%D7%99%D7%99%20%D7%A8%D7%A4%D7%90%D7%9C%2C%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%A1%D7%A8%D7%98%D7%95%D7%9F%20%D7%A2%D7%9C%20%D7%A9%D7%95%D7%A8%D7%AA%20%D7%94%D7%A7%D7%95%D7%93.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%93%D7%92%D7%9E%D7%94%20%D7%97%D7%99%D7%94%20%D7%A9%D7%9C%203%20%D7%93%D7%A7%D7%95%D7%AA%20%D7%A2%D7%9C%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%D7%99%3A%20`

**UTM links:** same base, `utm_content=line_15s`, `line_15s_4x5`, `line_8s`, `line_31s`.


## Ad 3: משמרת לילה (price)

**Hypothesis:** "משמרת לילה" gets the lowest cost per WhatsApp conversation of the three (the ₪99 anchor next to a salary answers the price question before the chat), with the lowest hook rate, because the price comparison only lands after second 3.

**Primary text 1**
```
מישהו עונה ללקוחות שלכם בלילה? חצי משרה בשכר מינימום עולה בערך ₪3,200 בחודש. עוזרת AI באתר עולה ₪99 לחודש / שעת שיחה, ועונה גם בשבת ב־02:13.
היא עונה בשעות שבהן אין מי שיענה, בקול ובעברית, ומשאירה לכם את הליד בוואטסאפ לבוקר. הקמה ₪0, מבטלים בכל חודש.
הדגמה חיה של 3 דקות על האתר שלכם. בחינם.
```
**Primary text 2**
```
שבת, 02:13. מישהי שואלת באתר על שיעור ניסיון. עוזרת AI עונה לה בקול ושומרת לכם את השם והטלפון. ₪99 לחודש / שעת שיחה. הדגמה חיה בחינם.
```
**Primary text 3**
```
שעות הפעילות שלכם נגמרות, והאתר ממשיך לקבל שאלות. עוזרת AI עונה עליהן בקול, בעברית, 24/7. הקמה ₪0. הדגמה חיה של 3 דקות על האתר שלכם.
```
**Headlines**
1. עונה בלילה. ₪99 לחודש / שעת שיחה
2. עוזרת AI שעונה גם בשבת
3. הדגמה חיה על האתר שלכם, בחינם

**Description:** הקמה ₪0. מבטלים בכל חודש.
**CTA button:** Send WhatsApp message. Website variant: Learn more.
**WhatsApp opener:** היי רפאל, ראיתי את הסרטון על משמרת הלילה. אשמח להדגמה חיה של 3 דקות על האתר שלי:
`https://wa.me/972533217125?text=%D7%94%D7%99%D7%99%20%D7%A8%D7%A4%D7%90%D7%9C%2C%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%A1%D7%A8%D7%98%D7%95%D7%9F%20%D7%A2%D7%9C%20%D7%9E%D7%A9%D7%9E%D7%A8%D7%AA%20%D7%94%D7%9C%D7%99%D7%9C%D7%94.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%93%D7%92%D7%9E%D7%94%20%D7%97%D7%99%D7%94%20%D7%A9%D7%9C%203%20%D7%93%D7%A7%D7%95%D7%AA%20%D7%A2%D7%9C%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%D7%99%3A%20`

**UTM links:** same base, `utm_content=night_15s`, `night_15s_4x5`, `night_7s`, `night_31s`.

**The salary figure:** minimum wage from 1.4.2026 is ₪6,443.85 a month for a full-time job (National Insurance Institute, source below).
Half of that is ₪3,221.93, shown as "≈₪3,200 בחודש". It is the gross wage only, without employer costs, so the comparison is on the low side for the salary.
The on-screen card names the source in small type. Update the card if the minimum wage changes (next update usually 1 April).


## Ad 4: פנים (face vs chat vs voice)

The product is the talking face, so this ad shows the same customer question answered three ways at once (text chat, voice only, our face with the same audio), then leaves the face in the corner of the clinic site, shows two small studies, and ends on the offer. It makes no claim that a face raises sales.

**Hypothesis:** in stage 1 (same broad audience and budget), "פנים" gets a 3-second hook rate at least 3 points above 23:04, because the first frame shows how the product differs from a normal chat widget. Expect cost per WhatsApp conversation within 20% of 23:04; if it is much higher, the comparison grabs attention but does not create intent.

**Organic post for the Refael.ai Page** (no hard sell; post the 15 s video with it)
```
שאלה אחת, שלוש דרכים לענות עליה.
בניתי ניסוי קטן: אותה שאלה של לקוחה ("כמה עולה הסרת שיער בלייזר?") ואותה תשובה. פעם בצ׳אט טקסט, פעם בקול בלבד, ופעם מפנים שמדברות.
חיפשתי מה המחקר אומר על זה ומצאתי שני מחקרים קטנים. באחד (2025, 80 משתתפים) אנשים ענו בפירוט רב יותר מול אווטאר מדבר מאשר מול צ׳אט טקסט. בשני (2023, 31 משתתפים) יותר אנשים אמרו שיסמכו בחירום על ראש רובוט עם פנים מאשר על רמקול חכם.
אלה מחקרים קטנים, אז אני לא מסיק מהם הרבה. אבל זה מעניין אותי מהצד של הלקוח.
אתם, כלקוחות, הייתם מעדיפים לקבל תשובה באתר בטקסט, בקול או מפנים שמדברות?
```
First comment (optional, after people answer): the sources line below.

**Primary text 1**
```
אותה תשובה, בשלוש דרכים: צ׳אט טקסט, קול בלבד, או פנים שמדברות. במה הייתם בוחרים?
עוזרת AI עם פנים יכולה לשבת בפינת האתר שלכם. היא עונה למבקרים בקול ובעברית, מראה להם מחיר ושומרת לכם את השם והטלפון.
הדגמה חיה של 3 דקות על האתר שלכם. בחינם. ₪99 לחודש / שעת שיחה, הקמה ₪0.
```
**Primary text 2**
```
במחקר מ־2025 עם 80 משתתפים, אנשים ענו בפירוט רב יותר מול אווטאר מדבר מאשר מול צ׳אט טקסט. מחקר קטן, ובכל זאת שווה לבדוק את זה על האתר שלכם.
עוזרת AI עם פנים בפינת האתר, ₪99 לחודש / שעת שיחה. הדגמה חיה של 3 דקות, בחינם.
```
**Primary text 3**
```
צ׳אט בפינת האתר כבר מוכר לכולם. פנים שמדברות ועונות בקול, הרבה פחות. רוצים לראות איך זה נראה אצלכם? הדגמה חיה של 3 דקות, בחינם.
```
**Headlines**
1. צ׳אט, קול או פנים? תבחרו
2. פנים שעונות באתר שלכם, בקול
3. הדגמה חיה על האתר שלכם, בחינם

**Description:** ₪99 לחודש / שעת שיחה. הקמה ₪0
**CTA button:** Send WhatsApp message. Website variant: Learn more.
**WhatsApp opener:** היי רפאל, ראיתי את הסרטון על הפנים שמדברות. אשמח להדגמה חיה של 3 דקות על האתר שלי:
`https://wa.me/972533217125?text=%D7%94%D7%99%D7%99%20%D7%A8%D7%A4%D7%90%D7%9C%2C%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%A1%D7%A8%D7%98%D7%95%D7%9F%20%D7%A2%D7%9C%20%D7%94%D7%A4%D7%A0%D7%99%D7%9D%20%D7%A9%D7%9E%D7%93%D7%91%D7%A8%D7%95%D7%AA.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%93%D7%92%D7%9E%D7%94%20%D7%97%D7%99%D7%94%20%D7%A9%D7%9C%203%20%D7%93%D7%A7%D7%95%D7%AA%20%D7%A2%D7%9C%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%D7%99%3A%20`
**UTM links:** same base, `utm_content=face_15s`, `face_15s_4x5`, `face_32s`.

**The research on screen, and its limits**
- Study 1: Krajcovic, Demcak, Kuric, "Talking Surveys: How Photorealistic Embodied Conversational Agents Shape Response Quality, Engagement, and Satisfaction", arXiv 2508.02376 (2025). 80 UK participants, between-subjects, a voice agent with an animated video avatar vs a text chatbot, in an online survey. The abstract says embodied agents "can contribute significantly to more informative, detailed responses". Satisfaction did not differ significantly. On screen: "מול אווטאר מדבר, אנשים ענו בפירוט רב יותר מאשר מול צ׳אט טקסט."
- Study 2: Robb et al., "Seeing eye to eye: trustworthy embodiment for task-based conversational agents", Frontiers in Robotics and AI (30.8.2023), n=31. The face was a Furhat robot head (an animated face on a physical head), compared with a Google Home smart speaker, in a simulated emergency task. Asked "which assistant would you trust more in an emergency": robot 54%, speaker 23%, neither 23% (p = 0.04). A 14-item trust scale showed no difference. On screen this is worded as "ראש רובוט עם פנים" and "על מי תסמכו יותר", because it was a robot head and an opinion question, not a screen avatar or an observed choice.
- On screen under both: "מחקרים קטנים. התוצאות ראשוניות." Neither study measured sales or leads, and the ad does not claim either.
- Not used: vendor case-study numbers.

## Test plan

**Stage 1: which angle (4 days)**
- Objective: Engagement, conversion location WhatsApp (click to WhatsApp). One campaign, 3 ad sets (one per concept), ~₪50 a day each, so ~₪600 in total.
- Each ad set: the 15 s 9:16 ad, and the 4:5 version for Feed placements (asset customisation per placement). Primary text 1 + headline 1.
- Audience: Israel, Hebrew, 25 to 65, Advantage+ audience with no interest stack (broad). Placements: Advantage+ (Reels, Feed, Stories).
- Do not edit the ad sets for 4 days. Judge only ads with 1,000+ impressions.
- Read, per ad: hook rate (3-second views / impressions, target 25 to 30%+), hold rate (ThruPlays / 3-second views), link CTR, cost per WhatsApp conversation started.
- Concept 4 (פנים) runs as a 4th ad set in stage 1 (₪50 a day, same settings), or, if stage 1 has already run, against the stage 1 winner for 4 days.
- Decision: the winner is the lowest cost per WhatsApp conversation; if no ad set has 3+ conversations, use the highest hook rate x CTR. Kill any concept under 20% hook rate.

**Stage 2: short vs long (4 to 7 days)**
- Winner 15 s stays on broad cold traffic.
- The winner's long version goes to retargeting only: 50% video viewers of any pack ad (14 days) + /customer-service visitors (30 days). The bumper runs in the same ad set as a frequency reminder.
- Compare cost per WhatsApp conversation, cold 15 s vs retargeted long. Then rotate primary texts 2 and 3 on the winner before making new videos.
- English: none yet. Make English cuts only after a Hebrew winner.

## AI disclosure
- On the video: "דמות AI" on the face in every ad, and "המחשה" on the scripted demo scenes.
- In Ads Manager: turn on Meta's AI disclosure ("AI info" label) on every ad when the option is offered for the ad. The face, voice and lip movement are generated.
- The agent introduces itself as an AI assistant in the long 23:04 version, same as on the live product.

## Landing alignment
- /customer-service hero today: "נציג חי באתר שלכם. עונה בעברית ושולח לכם את הליד." The ads say "עוזרת" (she). After stage 1, make the hero echo the winning hook:
  - 23:04 wins: "23:04. מישהי בודקת את האתר שלכם. עכשיו יש מי שעונה לה."
  - שורה אחת wins: "שורה אחת באתר, והאתר עונה ללקוחות. בקול."
  - משמרת לילה wins: "מישהו עונה ללקוחות שלכם בלילה? עוזרת AI באתר, ₪99 לחודש / שעת שיחה."
- Keep the same three facts as the ads above the fold: free 3-minute live demo, ₪99 לחודש / שעת שיחה, setup ₪0.
- The hero mock already shows the same clinic (קליניקת הדר) and the same ₪450 answer as ad 1, so people who click land on the scene they just saw.

## Compliance notes
- No competitor names, no third-party stats, no reviews or results. No WhatsApp/Wix/WordPress/Shopify/Meta logos (platform names only as text; the lead card is a generic green chat card).
- No personal-attribute wording; copy talks about the business and its website.
- Prices exactly as on the site: ₪99 לחודש / שעת שיחה (Start plan, 60 minutes), הקמה ₪0, free 3-minute live demo.
- Fictional visitors (דנה, רון, אורית) and phone numbers in the 555 range.

## Sources
- Minimum wage from 1.4.2026: Bituach Leumi (National Insurance Institute), "שכר מינימום", https://www.btl.gov.il/MEDINIYUT/GENERALDATA/Pages/שכר%20מינימום.aspx (₪6,443.85 a month; ₪35.40 an hour on a 182-hour basis). Checked 12.11.2026.
- Earlier figure for comparison: Bituach Leumi benefits update January 2026, https://www.btl.gov.il/Publications/benefits_update/Documents/hozerkizba2026.pdf (₪6,247.67 until March 2026).
- Study 1 (concept 4): https://arxiv.org/abs/2508.02376 (checked 12.11.2026).
- Study 2 (concept 4): https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2023.1234767/full (checked 12.11.2026).
- Prices, plans and the clinic mock: src/content/agentPage.ts (this repo).
