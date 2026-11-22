---
name: site-demo-outreach
description: Cold reach for the Refael.ai website assistant to clinics, courses and schools in Israel. Finds businesses with traffic and no chat, builds a "made for you" demo of THEIR homepage with our talking face on it, and prepares one-tap WhatsApp messages Refael only has to send. Use for any cold reach to businesses with a website.
---

# Site-demo outreach (Refael.ai widget)

## The idea in one line
Show, don't ask. Every message carries a link to the prospect's OWN homepage with our assistant already on it. Never ask a stranger to send their site first (two weeks of "send me your link" got 0 sites).

Built from: coreyhaines31 cold-email, shawnpang cold-outreach, tech-leads-club video-outreach ("Made This For You"), WhatsApp outreach guides, plus Refael.ai results (Nov 2026).

## Refael's limits (hard)
- Refael does **copy/paste or one tap only**. Claude prepares everything: list, demo, message, link.
- Refael never calls anyone. Channel is WhatsApp (the number the business publishes), Messenger only if there is no WhatsApp.
- Nothing is sent by Claude. Nothing is published without Refael's OK.

## 1. Pick targets (worth a demo)
Good: clinics (aesthetic, dental, hair), private colleges, course schools, workshops. Small to mid businesses, owner reachable.
Score from the homepage (scripted check, no paid tool needed):
- Pays for traffic: Google Ads tag (AW-, googleadservices) = strongest. Meta pixel, TikTok pixel = good.
- Google Maps reviews 100+ = real foot traffic.
- What answers visitors today: nothing / WhatsApp button / form only = target. Any live chat or bot (Glassix, Tawk, Intercom, Zendesk, a site bot bubble) = **skip**.
- Skip chains and big brands (HackerU-size), sites that do not load, sites whose hero is broken in a screenshot.
Traffic label is an estimate from these signals, say so. Similarweb blocks the cloud; Apify needs credit.

## 2. Find a real signal (one line, connected to the problem)
Read the homepage text BEFORE closing popups (popups hold the best signals). Rank:
1. They say they are overloaded or slow to answer ("עומס", "נחזור לכל אחד", "זמן מהרגיל").
2. Only a lead form / "השאירו פרטים".
3. Answers only in opening hours.
4. Only path is "book a consultation".
The signal sentence must connect to the problem we solve (visitors not answered right now). If you can delete it and the message still makes sense, it is not personal enough.

## 3. Build the demo (`scripts/site_demo.py`)
`python3 scripts/site_demo.py leads/prospects-<date>.json [slug ...]`
- Screenshots their homepage desktop + mobile, removes cookie banners, popups, accessibility and WhatsApp floaters.
- Same face for everyone: `public/agent/style-clinic.mp4` in a circle, bottom left, bubble "היי! אני העוזרת של {name}". Line changes by kind (clinic: טיפולים, מחירים ותורים; school: קורסים, מחירים ומועדי פתיחה).
- Writes `refael-ai-flow/public/d/<slug>.html` + `<slug>.jpg` (1200x630 preview, shows in WhatsApp) + desk/mob backgrounds.
- **Look at every preview image.** Drop any that is blank, a loader, or shows "video not available". A broken demo is worse than none.
- Push to `main`, then **Refael presses Publish in Lovable** (Claude cannot publish). Check one URL returns 200 before giving links.

## 4. The message (WhatsApp, Hebrew)
Structure: Observation, what I built for you, the link, one soft ask. Founder voice ("בניתי"), peer not vendor.
```
היי, כאן רפאל.
{signal line}
בניתי לכם הדגמה קטנה: עוזרת AI עם פנים וקול שיושבת באתר שלכם, עונה למבקרים גם בלילה ושולחת לכם את הפנייה לוואטסאפ.
ככה זה נראה אצלכם: {demo link}

שווה לבדוק? אפשר להפעיל 10 ימים בחינם.
```
Rules: under 400 characters, one link, no price, no dashes (— or --), no "I hope you're well", no feature list, no call request. Give Refael wa.me links with the text prefilled (one tap, send).

## 5. Volume and safety
- Max 5 new chats a day from Refael's number, spread out. Different text per person (the signal line does this).
- One follow-up only, after 3 days, one line with a new angle (e.g. "הדף נשאר פתוח עד סוף השבוע"). Then stop.
- A "no" or "remove me" ends it forever. Log it.

## 6. When someone replies
Refael pastes the reply to Claude. Claude writes the answer. Goal of the reply: get the trial live, not a meeting. Ask only for what the trial needs (who gets the leads on WhatsApp, 5 common questions + prices).

## 7. Measure (decide after 10 sends)
Count: sent, demo opened (if tracked), replies, trials started. 0 replies from 10 means change the message or the signal, not the list. 1+ trial means repeat the same play on the next 10.

## Files
- Targets and scores: `tools-refael-marketing/leads/cold-shortlist-<date>.md`
- Prospects input: `tools-refael-marketing/leads/prospects-<date>.json` (slug, name, url, kind, wa)
- Ready links: `tools-refael-marketing/leads/wa-links-<date>.md`
