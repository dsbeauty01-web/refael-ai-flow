"""Builds the Hebrew SEO landing pages + sitemap into public/. Run: python3 scripts/seo/build_pages.py
Content lives in PAGES below; edit text there and re-run. Pages are static HTML so they index without JavaScript."""
import html
import json
import re
import urllib.parse
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PUB = ROOT / "public"
SITE = "https://refael-ai-flow.lovable.app"
STYLE = re.search(r"<style>(.*?)</style>", (PUB / "maya.html").read_text(encoding="utf-8"), re.S).group(1)
WA = "https://wa.me/972533217125?text=" + urllib.parse.quote(
    "היי רפאל, הגעתי מהאתר. שולח/ת לך תמונה של מוצר, אשמח לראות 10 שניות של מיה מציגה אותו בלייב. אני מוכר/ת: ")
WA_SVG = ('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg>')

PAGES = [
    {
        "slug": "ai-live-host.html",
        "title": "מנחה AI ללייב מכירות בפייסבוק | עונה לכל צופה בשם | Refael.ai",
        "desc": "מנחה דיגיטלית שעולה ללייב, מציגה מוצרים ועונה לכל תגובה בצ׳אט בשם, בקול, תוך כ-5 שניות. 15 שידורים אמיתיים בפייסבוק.",
        "kicker": "לייב מכירות עם AI",
        "h1": "מנחה AI ללייב מכירות, <span>שעונה לכל צופה בשם.</span>",
        "lead": "בלייב מכירות רוב השאלות נבלעות בצ׳אט. מיה קוראת כל תגובה ועונה בקול, בשם של מי ששאל, בזמן שאתם ממשיכים להציג.",
        "video": ("/maya/maya-live.mp4", "/maya/maya-live-poster.jpg", "v45"),
        "sections": [
            ("למה לייבים מפספסים מכירות", [
                "בשידור חי אחד יכולות להגיע עשרות שאלות: כמה זה עולה, יש מידה, כמה משלוח, איך משלמים. מי שמציג את המוצר לא מספיק לקרוא את כולן, והצופה שלא קיבל תשובה פשוט ממשיך לגלול.",
                "כל שאלה בלי תשובה היא לקוח שחיכה. מנחה דיגיטלית לא מתעייפת, לא מפספסת תגובה, ופונה לכל אחד בשם.",
            ]),
            ("מה מיה עושה בלייב", [
                "קוראת את הצ׳אט בזמן אמת ועונה בקול, בעברית טבעית, בדרך כלל תוך כחמש שניות.",
                "מציגה כרטיס מוצר עם מחיר ומחיר לפני הנחה, ועוברת בין המוצרים לפי הסדר שלכם.",
                "מי שכותב \"אני\" מקבל קישור לקנייה מיד. שאלות רגישות או הזמנות מיוחדות היא מעבירה אליכם.",
                "אחרי השידור מקבלים דוח: מה שאלו, מי רצה לקנות, ואילו מוצרים עניינו.",
            ]),
            ("למי זה מתאים", [
                "חנויות אופנה, תכשיטים וקוסמטיקה שמוכרות בלייב בפייסבוק. מותגים שעושים השקות ביוטיוב. עסקים שרוצים לייב קבוע בלי לעמוד מול המצלמה כל פעם.",
            ]),
        ],
        "faq": [
            ("זה באמת חי, או סרטון מוקלט?", "חי. היא קוראת את התגובות בזמן השידור ועונה בזמן אמת. בשידור האחרון שלנו היא ענתה על 10 מתוך 10 תגובות, כל אחת בשם הכותב."),
            ("באיזה פלטפורמות זה עובד?", "לייב בפייסבוק, לייב ביוטיוב, שידורים פרטיים ומסך בחנות. הדמות זהה, משתנה רק היעד של השידור."),
            ("אני צריך לעמוד מול המצלמה?", "לא. מיה יכולה להנחות לבד, או לעבוד לצדכם ולענות לצ׳אט בזמן שאתם מציגים."),
            ("מה אם שואלים משהו שהיא לא יודעת?", "היא עונה רק ממה שהכנתם לה: מוצרים, מחירים, משלוחים והחזרות. כל השאר עובר אליכם."),
        ],
    },
    {
        "slug": "ai-avatar-business.html",
        "title": "אווטאר AI מדבר לעסקים בעברית | דמות דיגיטלית שמוכרת | Refael.ai",
        "desc": "אווטאר AI שמדבר עברית בקול טבעי, עם שפתיים מסונכרנות, מציג מוצרים ועונה ללקוחות בזמן אמת. לייב, סרטונים ומסכים בעסק.",
        "kicker": "אווטאר AI לעסקים",
        "h1": "אווטאר AI שמדבר עברית <span>ומוכר בשבילכם.</span>",
        "lead": "לא עוד בוט שמחכה לשאלות. דמות עם פנים, קול ואופי, שעולה לשידור, מציגה מוצר ועונה ללקוחות בשם.",
        "video": ("/maya/maya-live.mp4", "/maya/maya-live-poster.jpg", "v45"),
        "sections": [
            ("מבוט שעונה לדמות שמוכרת", [
                "רוב העסקים כבר מכירים צ׳אט בוט. שואלים, הוא עונה. אחר כך נוסף קול, ואחר כך פנים. אבל כולם עדיין מחכים שמישהו יפנה אליהם.",
                "אווטאר מכירות עובד הפוך: הוא פונה לקהל, מציג את המוצר, קורא את התגובות ועונה לכל אחד בשם, בקול, עם שפתיים שזזות עם המילים.",
            ]),
            ("מה היא יודעת לעשות", [
                "לדבר עברית ואנגלית בקול טבעי, כולל שיבוט של הקול שלכם באישורכם.",
                "להציג מוצרים עם מחיר על המסך ולשלוח קישור לקנייה.",
                "להנחות לייב, וובינר או השקה, ולענות לשאלות בזמן אמת.",
                "להפיק קליפים קצרים מהשידורים, מוכנים לרילס ולטיקטוק.",
            ]),
            ("איפה משתמשים בה", [
                "לייב בפייסבוק וביוטיוב, מסך בחנות או בלובי, שיעורים ווובינרים, וסרטוני מוצר לרשתות. אותה דמות, תפקיד אחר.",
            ]),
        ],
        "faq": [
            ("במה זה שונה מצ׳אט בוט?", "צ׳אט בוט עונה בטקסט ומחכה לשאלה. האווטאר מדבר בקול, עם פנים ושפתיים מסונכרנות, ויכול להוביל שידור שלם בעצמו."),
            ("אפשר דמות לפי המותג שלנו?", "כן. מיה ונובה הן דוגמאות. אפשר לבנות דמות לפי המראה והאופי של המותג, כולל קמע קיים."),
            ("כמה זמן לוקח להתחיל?", "שולחים תמונה של מוצר, מקבלים קליפ של 10 שניות, ואחרי שמכינים רשימת מוצרים ושאלות נפוצות היא עולה לשידור הראשון."),
            ("כמה זה עולה?", "תלוי במספר המוצרים והשידורים. שלחו תמונה של מוצר בוואטסאפ ואגיד לכם בדיוק."),
        ],
    },
    {
        "slug": "ai-brand-character.html",
        "title": "דמות AI למותג | קמע דיגיטלי שמדבר עם לקוחות | Refael.ai",
        "desc": "דמות AI מצוירת או תלת ממדית למותג שלכם: מציגה מוצרים, עונה לילדים ולהורים בשם, בעברית ובאנגלית. מתאים לצעצועים, אפליקציות ומוזיאונים.",
        "kicker": "דמות AI למותג",
        "h1": "דמות AI למותג שלכם. <span>מדברת, מוכרת, זוכרת שמות.</span>",
        "lead": "תכירו את נובה: היא מציגה ערכת ניסויים לילדים בשידור חי, וכשאמא שואלת אם זה מתאים לגיל שש, היא עונה לה בשם.",
        "video": ("/maya/nova-he.mp4", "/maya/nova-he.jpg", "v916"),
        "sections": [
            ("קמע שלא רק מחייך מהאריזה", [
                "למותגים רבים יש דמות או קמע. ברוב המקרים היא נשארת על האריזה או בסרטון פרסומת אחד. דמות AI הופכת את הקמע למשהו שמדבר עם הלקוחות באמת.",
                "היא עולה ללייב, מציגה את המוצר, עונה להורים ולילדים בשם, ויכולה לעבור בין עברית לאנגלית.",
            ]),
            ("מתאים במיוחד ל", [
                "מותגי צעצועים ומשחקים, אפליקציות לימוד, מוזיאונים ואטרקציות לילדים, מותגי מזון לחיות מחמד, וכל מותג שרוצה פנים קבועות ברשתות.",
            ]),
            ("איך בונים דמות", [
                "מתחילים מהמראה: קמע קיים או דמות חדשה. בוחרים קול ואופי. מכינים לה ידע על המוצרים. ואז היא מוכנה ללייב, לסרטונים ולמסך בחנות.",
            ]),
        ],
        "faq": [
            ("אפשר להשתמש בקמע שכבר יש לנו?", "כן, בתנאי שיש לכם זכויות עליו. בונים ממנו דמות מדברת עם קול ואופי שמתאימים למותג."),
            ("היא מדברת גם באנגלית?", "כן. אותה דמות יכולה לעבוד בעברית ובאנגלית, גם באותו שידור."),
            ("זה בטוח לקהל של ילדים?", "היא עונה רק מתוך מה שהכנתם לה, לא ממציאה, ושאלות רגישות מועברות אליכם."),
            ("איך מתחילים?", "שולחים תמונה של מוצר ומקבלים קליפ קצר של הדמות מציגה אותו."),
        ],
    },
]


def page(p):
    faq_html = "".join(f"<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>" for q, a in p["faq"])
    secs = ""
    for h, paras in p["sections"]:
        body = "".join(f"<p>{html.escape(x)}</p>" for x in paras) if len(paras) < 3 else \
            "<ul>" + "".join(f"<li>{html.escape(x)}</li>" for x in paras) + "</ul>"
        secs += f'<section><h2>{html.escape(h)}</h2><div class="prose">{body}</div></section>'
    src, poster, cls = p["video"]
    others = "".join(f'<a href="/{o["slug"]}">{html.escape(o["kicker"])}</a>' for o in PAGES if o["slug"] != p["slug"])
    ld = [
        {"@context": "https://schema.org", "@type": "Service", "name": p["kicker"], "description": p["desc"],
         "provider": {"@type": "ProfessionalService", "name": "Refael.ai", "url": SITE, "areaServed": ["IL", "TH"],
                      "address": {"@type": "PostalAddress", "addressLocality": "Tel Aviv", "addressCountry": "IL"}},
         "areaServed": "IL", "availableLanguage": ["he", "en"]},
        {"@context": "https://schema.org", "@type": "FAQPage",
         "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p["faq"]]},
        {"@context": "https://schema.org", "@type": "VideoObject", "name": p["kicker"], "description": p["desc"],
         "thumbnailUrl": SITE + poster, "contentUrl": SITE + src, "uploadDate": "2026-10-17"},
    ]
    return f"""<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(p['title'])}</title>
<meta name="description" content="{html.escape(p['desc'])}">
<link rel="canonical" href="{SITE}/{p['slug']}">
<meta property="og:type" content="website"><meta property="og:locale" content="he_IL">
<meta property="og:title" content="{html.escape(p['title'])}"><meta property="og:description" content="{html.escape(p['desc'])}">
<meta property="og:image" content="{SITE}/maya/og.jpg"><meta property="og:url" content="{SITE}/{p['slug']}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;800;900&display=swap" rel="stylesheet">
<style>{STYLE}
  .prose p,.prose li{{color:#d8d0c6;font-size:16.5px;line-height:1.65;margin-bottom:10px}}
  .prose ul{{list-style:none;display:grid;gap:9px}}
  .prose li{{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin:0}}
  .crumbs{{font-size:13px;color:var(--dim);margin-bottom:10px;text-align:center}} .crumbs a{{color:var(--mute)}}
  .more{{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}}
  .more a{{color:var(--amber);border:1px solid #5a4317;border-radius:30px;padding:7px 13px;font-size:14.5px;text-decoration:none}}
</style>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body>
<main>
  <nav class="crumbs"><a href="/">Refael.ai</a> · {html.escape(p['kicker'])}</nav>
  <p class="kicker">{html.escape(p['kicker'])}</p>
  <h1>{p['h1']}</h1>
  <p class="lead">{html.escape(p['lead'])}</p>
  <div class="video {cls}"><video id="v" src="{src}" poster="{poster}" playsinline autoplay muted loop preload="metadata"></video></div>
  <button class="sound" data-v="v" type="button">🔊 לחצו לשמוע</button>
  <div class="proof">
    <div class="stat"><b>15</b><small>שידורים חיים אמיתיים בפייסבוק</small></div>
    <div class="stat"><b>10/10</b><small>תגובות נענו, כל אחת בשם</small></div>
    <div class="stat"><b>5</b><small>שניות בערך מהתגובה לתשובה</small></div>
  </div>
  {secs}
  <section class="offer" id="offer">
    <h2>שלחו תמונה. <span>ראו אותה מוכרת אותה.</span></h2>
    <p>צלמו מוצר אחד ושלחו לי בוואטסאפ. תקבלו בחזרה 10 שניות של מיה מציגה אותו בלייב, עם מחיר על המסך ותשובה לצופה בשם.</p>
    <a class="cta" href="{WA}" target="_blank" rel="noopener">{WA_SVG} 📸 שלחו תמונה בוואטסאפ</a>
    <p class="sub">או <a href="/maya.html" style="color:var(--amber)">צפו בכל הדוגמאות של מיה ונובה</a></p>
  </section>
  <section><h2>שאלות <span>שחוזרות</span></h2>{faq_html}</section>
  <div class="more">{others}<a href="/maya.html">מיה בשידור חי</a></div>
  <footer>רפאל סלע · Refael.ai · תל אביב<br><a href="/">לאתר הראשי</a> · <a href="/legal/privacy">פרטיות</a></footer>
</main>
<script>
document.querySelectorAll('.sound').forEach(function(b){{b.addEventListener('click',function(){{var v=document.getElementById(b.dataset.v);try{{v.muted=false;v.currentTime=0;v.play()}}catch(e){{}}b.style.display='none'}})}});
</script>
</body>
</html>
"""


def sitemap():
    today = date.today().isoformat()
    urls = ["/", "/maya.html", "/voices"] + [f"/{p['slug']}" for p in PAGES] + ["/legal/privacy", "/legal/terms"]
    pri = {"/": "1.0", "/maya.html": "0.9"}
    body = "".join(f"<url><loc>{SITE}{u}</loc><lastmod>{today}</lastmod><priority>{pri.get(u, '0.7')}</priority></url>" for u in urls)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{body}</urlset>\n'


if __name__ == "__main__":
    for p in PAGES:
        (PUB / p["slug"]).write_text(page(p), encoding="utf-8")
        print("wrote", p["slug"])
    (PUB / "sitemap.xml").write_text(sitemap(), encoding="utf-8")
    rb = (PUB / "robots.txt").read_text(encoding="utf-8")
    if "Sitemap:" not in rb:
        (PUB / "robots.txt").write_text(rb.rstrip() + f"\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
    print("wrote sitemap.xml, robots.txt")
