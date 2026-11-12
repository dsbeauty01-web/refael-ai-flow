import type { L10n } from '@/config/site';

/**
 * /customer-service: the live talking-face website agent (the service, not a character).
 * Rendered by pages/AgentPage.tsx. Every string has he, en, th.
 * Rules: no em dashes or double dashes, no character names, never "replaces your
 * sales team", never promise a sales lift. Prices are shown on THIS page only
 * (rendered directly, not through <Price>, which stays off site-wide).
 * Internal cost basis is secret: never put it here.
 */

// swap to /site/live-widget-session.mp4 when the real widget session recording is added
export const SESSION_VIDEO = '/site/tools-explainer.mp4';
export const SESSION_POSTER = '/site/tools-explainer.jpg';

export const FACE_VIDEO = '/agent/face.mp4';
export const FACE_POSTER = '/agent/face.jpg';

export const HERO = {
  h1: {
    he: 'נציג חי באתר שלכם. מקבל כל מבקר, עונה בעברית ושולח לכם את הליד.',
    en: 'A live agent on your website. It greets every visitor, answers in Hebrew and sends you the lead.',
    th: 'เจ้าหน้าที่ AI แบบสดบนเว็บไซต์ของคุณ ทักทายผู้เข้าชมทุกคน ตอบด้วยเสียง และส่งลีดถึงคุณ',
  } as L10n,
  lead: {
    he: 'פנים מדברות בפינת האתר. כמה שניות אחרי שהדף נפתח הנציג פונה למבקר בעצמו, עונה על מחירים ושאלות מתוך המידע של העסק, ושומר שם וטלפון אצלכם. שורת קוד אחת, על כל אתר.',
    en: 'A talking face in the corner of your site. A few seconds after the page opens it greets the visitor by itself, answers prices and questions from your own business info, and saves their name and phone for you. One line of code, on any site.',
    th: 'ใบหน้าที่พูดได้ที่มุมเว็บไซต์ของคุณ ไม่กี่วินาทีหลังเปิดหน้า เจ้าหน้าที่จะทักผู้เข้าชมเอง ตอบเรื่องราคาและคำถามจากข้อมูลธุรกิจของคุณ และเก็บชื่อกับเบอร์โทรไว้ให้คุณ โค้ดบรรทัดเดียว ใช้ได้กับทุกเว็บ',
  } as L10n,
  cta: {
    he: 'הדגמה חיה של 3 דקות, על האתר שלכם, בחינם',
    en: 'Free 3-minute live demo, on YOUR site',
    th: 'เดโมสด 3 นาทีบนเว็บของคุณ ฟรี',
  } as L10n,
  seePrices: { he: 'לראות מחירים', en: 'See prices', th: 'ดูราคา' } as L10n,
  priceChip: { he: 'מ־₪13 ביום', en: 'From ₪13 a day', th: 'เริ่ม ₪13 ต่อวัน' } as L10n,
  priceChipNote: { he: 'חבילה בסיסית, ₪390 לחודש', en: 'Basic package, ₪390 a month', th: 'แพ็กเกจ Basic ₪390 ต่อเดือน' } as L10n,
  ctaNote: {
    he: 'בוואטסאפ, ישירות לרפאל. שלחו כתובת אתר ונראה לכם אותו עם נציג.',
    en: 'On WhatsApp, straight to Refael. Send your site address and we show it to you with an agent.',
    th: 'ทาง LINE ถึงราฟาเอลโดยตรง ส่งที่อยู่เว็บไซต์มา แล้วเราจะโชว์เว็บของคุณพร้อมเจ้าหน้าที่ AI',
  } as L10n,
  facts: [
    { he: 'עונה תוך כ־3.5 שניות', en: 'Answers in about 3.5 s', th: 'ตอบภายในราว 3.5 วินาที' },
    { he: 'קול עברי ואוזן עברית', en: 'Hebrew voice and Hebrew ears', th: 'พูดและฟังภาษาฮีบรู' },
    { he: 'לידים ישר לוואטסאפ', en: 'Leads straight to your WhatsApp', th: 'ลีดส่งตรงถึง WhatsApp ของคุณ' },
  ] as L10n[],
  caption: {
    he: 'המחשה. הקלטה אמיתית למטה.',
    en: 'Illustration. Real recorded session below.',
    th: 'ภาพประกอบ ดูการบันทึกจริงด้านล่าง',
  } as L10n,
  mockLabel: {
    he: 'המחשה: אתר של קליניקה עם נציג AI בפינה. הנציג מברך את המבקרת, עונה על מחיר הסרת שיער בלייזר, שומר את השם והטלפון שלה, וליד חדש מגיע לבעלת העסק בוואטסאפ.',
    en: 'Illustration: a clinic website with an AI agent in the corner. The agent greets the visitor, answers the price of laser hair removal, saves her name and phone, and a new lead reaches the owner on WhatsApp.',
    th: 'ภาพประกอบ: เว็บไซต์คลินิกที่มีเจ้าหน้าที่ AI อยู่มุมจอ เจ้าหน้าที่ทักทายผู้เข้าชม ตอบราคาเลเซอร์กำจัดขน เก็บชื่อและเบอร์โทร แล้วลีดใหม่ก็ส่งถึงเจ้าของธุรกิจทาง WhatsApp',
  } as L10n,
};

/** The fictional client site inside the hero mock. */
export const MOCK = {
  brand: { he: 'קליניקת הדר', en: 'Hadar Clinic', th: 'Hadar Clinic' } as L10n,
  url: 'hadar-clinic.co.il',
  nav: [
    { he: 'טיפולים', en: 'Treatments', th: 'ทรีตเมนต์' },
    { he: 'מחירון', en: 'Prices', th: 'ราคา' },
    { he: 'צור קשר', en: 'Contact', th: 'ติดต่อ' },
  ] as L10n[],
  headline: { he: 'עור חלק, בלי לחץ.', en: 'Smooth skin, no pressure.', th: 'ผิวเนียน สบายใจ' } as L10n,
  sub: {
    he: 'קליניקה לטיפולי לייזר ואסתטיקה',
    en: 'Laser and aesthetics clinic',
    th: 'คลินิกเลเซอร์และความงาม',
  } as L10n,
  book: { he: 'קביעת תור', en: 'Book a visit', th: 'จองคิว' } as L10n,
  agentName: { he: 'העוזרת של הקליניקה', en: 'Clinic assistant', th: 'ผู้ช่วยของคลินิก' } as L10n,
  online: { he: 'מחוברת', en: 'Online', th: 'ออนไลน์' } as L10n,
  inputHint: { he: 'דברו או כתבו…', en: 'Talk or type…', th: 'พูดหรือพิมพ์…' } as L10n,
  chat: [
    {
      agent: true,
      text: {
        he: 'היי, אני העוזרת הדיגיטלית של הקליניקה. אפשר לשאול אותי כל דבר, בקול או בכתב.',
        en: "Hi, I'm the clinic's AI assistant. Ask me anything, by voice or by text.",
        th: 'สวัสดีค่ะ ฉันเป็นผู้ช่วย AI ของคลินิก ถามได้ทุกเรื่อง จะพูดหรือพิมพ์ก็ได้ค่ะ',
      },
    },
    {
      agent: false,
      text: {
        he: 'כמה עולה הסרת שיער בלייזר לרגליים?',
        en: 'How much is laser hair removal for the legs?',
        th: 'เลเซอร์กำจัดขนที่ขาราคาเท่าไหร่คะ?',
      },
    },
    {
      agent: true,
      text: {
        he: '₪450 לטיפול, או ₪2,200 לסדרה של 6. לשמור לך שיחת ייעוץ?',
        en: '₪450 a session, or ₪2,200 for a series of 6. Shall I save you a consultation?',
        th: 'ครั้งละ ₪450 หรือ ₪2,200 สำหรับ 6 ครั้ง ให้จองคิวปรึกษาไว้ให้ไหมคะ?',
      },
    },
    {
      agent: false,
      text: { he: 'דנה, 052-555-0147', en: 'Dana, 052-555-0147', th: 'Dana, 052-555-0147' },
    },
    {
      agent: true,
      text: {
        he: 'תודה דנה, שמרתי. הקליניקה תחזור אלייך היום.',
        en: 'Thanks Dana, saved. The clinic will get back to you today.',
        th: 'ขอบคุณค่ะคุณ Dana บันทึกแล้ว คลินิกจะติดต่อกลับวันนี้ค่ะ',
      },
    },
  ] as { agent: boolean; text: L10n }[],
  lead: {
    title: { he: 'ליד חדש מהאתר', en: 'New lead from your site', th: 'ลีดใหม่จากเว็บไซต์' } as L10n,
    app: 'WhatsApp',
    rows: [
      { k: { he: 'שם', en: 'Name', th: 'ชื่อ' }, v: { he: 'דנה', en: 'Dana', th: 'Dana' } },
      { k: { he: 'טלפון', en: 'Phone', th: 'โทร' }, v: { he: '052-555-0147', en: '052-555-0147', th: '052-555-0147' } },
      { k: { he: 'מתעניינת ב', en: 'Interested in', th: 'สนใจ' }, v: { he: 'לייזר, רגליים', en: 'Laser, legs', th: 'เลเซอร์ ขา' } },
      { k: { he: 'שעה', en: 'Time', th: 'เวลา' }, v: { he: '21:47', en: '21:47', th: '21:47' } },
    ] as { k: L10n; v: L10n }[],
  },
};

export const PROOF = {
  title: { he: 'הקלטה של סשן אמיתי', en: 'A recorded session', th: 'บันทึกการใช้งานจริง' } as L10n,
  body: {
    he: 'מוקלט בבדיקות פרטיות: אותו מוח n8n מפעיל כלים אמיתיים: קישור תשלום, ליד לגוגל שיטס, תור ביומן, הודעה לבעל העסק.',
    en: 'Recorded in private tests: the same n8n brain runs real tools: a payment link, a lead into Google Sheets, a calendar booking, a message to the owner.',
    th: 'บันทึกจากการทดสอบส่วนตัว: สมอง n8n ตัวเดียวกันสั่งงานเครื่องมือจริง ได้แก่ ลิงก์ชำระเงิน ลีดลง Google Sheets นัดหมายในปฏิทิน และข้อความถึงเจ้าของธุรกิจ',
  } as L10n,
  videoLabel: {
    he: 'הקלטת מסך: הנציג מפעיל כלים אמיתיים דרך n8n',
    en: 'Screen recording: the agent running real tools through n8n',
    th: 'บันทึกหน้าจอ: เจ้าหน้าที่ AI ใช้เครื่องมือจริงผ่าน n8n',
  } as L10n,
};

export const HOW = {
  title: { he: 'איך זה עובד', en: 'How it works', th: 'ทำงานอย่างไร' } as L10n,
  steps: [
    {
      t: { he: 'אנחנו בונים את הנציג שלכם', en: 'We build your agent', th: 'เราสร้างเจ้าหน้าที่ของคุณ' },
      b: {
        he: 'דמות, קול ושם לבחירתכם, וידע מתוך המחירון, השאלות הנפוצות והשירותים של העסק. מאחורי הקלעים: מוח n8n שבנוי רק בשבילכם.',
        en: 'A character, voice and name of your choice, plus knowledge from your price list, FAQ and services. Behind it: an n8n brain built only for you.',
        th: 'ตัวละคร เสียง และชื่อที่คุณเลือก พร้อมความรู้จากรายการราคา คำถามที่พบบ่อย และบริการของคุณ เบื้องหลังคือสมอง n8n ที่สร้างเฉพาะสำหรับคุณ',
      },
    },
    {
      t: { he: 'אתם מדביקים שורה אחת באתר', en: 'You paste one line on your site', th: 'คุณวางโค้ดบรรทัดเดียวบนเว็บ' },
      b: {
        he: 'עובד על וורדפרס, Wix, Shopify וכל אתר HTML. אם אין לכם גישה, אנחנו נעזור.',
        en: 'Works on WordPress, Wix, Shopify and any HTML site. No access? We will help.',
        th: 'ใช้ได้กับ WordPress, Wix, Shopify และทุกเว็บ HTML ถ้าเข้าระบบเองไม่ได้ เราช่วยได้',
      },
      code: '<script src=".../widget.js"></script>',
    },
    {
      t: { he: 'הלידים מגיעים אליכם', en: 'Leads arrive on your phone', th: 'ลีดส่งถึงคุณ' },
      b: {
        he: 'שם, טלפון ומה עניין אותם, ישר לוואטסאפ, למייל, לגיליון גוגל או ל־CRM.',
        en: 'Name, phone and what they asked about, straight to WhatsApp, email, a Google Sheet or your CRM.',
        th: 'ชื่อ เบอร์โทร และสิ่งที่ลูกค้าสนใจ ส่งตรงไปที่ WhatsApp อีเมล Google Sheet หรือ CRM ของคุณ',
      },
    },
  ] as { t: L10n; b: L10n; code?: string }[],
};

export const BENEFITS = {
  title: { he: 'למה זה שווה לכם', en: 'Why it pays off', th: 'ทำไมถึงคุ้ม' } as L10n,
  items: [
    {
      t: { he: '24/7, גם בלילה ובשבת', en: '24/7, nights and weekends too', th: 'ตลอด 24 ชม. รวมกลางคืนและวันหยุด' },
      b: {
        he: 'רוב המבקרים מגיעים כשאין מי שיענה. הנציג עונה גם בעשר בלילה.',
        en: 'Most visitors come when nobody is there to answer. Your agent answers at 10 pm too.',
        th: 'ผู้เข้าชมส่วนใหญ่มาตอนที่ไม่มีใครตอบ เจ้าหน้าที่ของคุณตอบได้แม้ตอนสี่ทุ่ม',
      },
    },
    {
      t: { he: 'מדבר עברית טבעית', en: 'Speaks natural Hebrew', th: 'พูดภาษาฮีบรูอย่างเป็นธรรมชาติ' },
      b: {
        he: 'שומע עברית, עונה בקול עברי טבעי, עם פנים חיות ולא סרטון מוקלט.',
        en: 'Hears Hebrew and answers in a natural Hebrew voice, with a live face, not a pre-recorded video.',
        th: 'ฟังภาษาฮีบรู ตอบด้วยเสียงฮีบรูที่เป็นธรรมชาติ ด้วยใบหน้าสด ไม่ใช่วิดีโอที่อัดไว้',
      },
    },
    {
      t: { he: 'תופס מבקרים שהיו עוזבים', en: 'Catches visitors who would leave', th: 'รั้งผู้เข้าชมที่กำลังจะออกไป' },
      b: {
        he: 'במקום טופס שאף אחד לא ממלא, מישהו פונה אליהם ושואל במה אפשר לעזור.',
        en: 'Instead of a form nobody fills in, someone talks to them and asks how to help.',
        th: 'แทนฟอร์มที่ไม่มีใครกรอก มีคนทักและถามว่าช่วยอะไรได้บ้าง',
      },
    },
    {
      t: { he: 'הליד ישר לטלפון שלכם', en: 'The lead goes straight to your phone', th: 'ลีดส่งตรงถึงโทรศัพท์ของคุณ' },
      b: {
        he: 'שם, טלפון ונושא הפנייה, תוך שניות מסיום השיחה.',
        en: 'Name, phone and topic, seconds after the conversation ends.',
        th: 'ชื่อ เบอร์โทร และเรื่องที่สนใจ ภายในไม่กี่วินาทีหลังจบบทสนทนา',
      },
    },
    {
      t: { he: 'עולה פחות מנציג צ׳אט במשרה חלקית', en: 'Costs less than a part-time chat rep', th: 'ถูกกว่าพนักงานแชทพาร์ตไทม์' },
      b: {
        he: 'נציג אנושי בחצי משרה עולה ₪3,000 ומעלה בחודש, ועובד רק במשמרת שלו.',
        en: 'A part-time human rep costs ₪3,000+ a month and only works their shift.',
        th: 'พนักงานพาร์ตไทม์มีค่าใช้จ่าย ₪3,000 ขึ้นไปต่อเดือน และทำงานแค่ในกะของตัวเอง',
      },
    },
  ] as { t: L10n; b: L10n }[],
  fitTitle: { he: 'מתאים במיוחד ל', en: 'Best fit for', th: 'เหมาะที่สุดสำหรับ' } as L10n,
  fitNote: {
    he: 'עסקים שבהם לקוח אחד שווה ₪500 ומעלה.',
    en: 'Businesses where one customer is worth ₪500 or more.',
    th: 'ธุรกิจที่ลูกค้าหนึ่งคนมีมูลค่า ₪500 ขึ้นไป',
  } as L10n,
  fit: [
    { he: 'קליניקות', en: 'Clinics', th: 'คลินิก' },
    { he: 'אסתטיקה וקוסמטיקה', en: 'Aesthetics', th: 'ความงาม' },
    { he: 'עורכי דין ורואי חשבון', en: 'Lawyers and accountants', th: 'ทนายความและนักบัญชี' },
    { he: 'קורסים והדרכות', en: 'Courses', th: 'คอร์สเรียน' },
    { he: 'שיפוצים', en: 'Renovation', th: 'รีโนเวต' },
    { he: 'נדל״ן', en: 'Real estate', th: 'อสังหาริมทรัพย์' },
    { he: 'שירותי רכב', en: 'Car services', th: 'บริการรถยนต์' },
    { he: 'שירותים לעסקים', en: 'B2B services', th: 'บริการสำหรับธุรกิจ' },
  ] as L10n[],
  study: {
    he: 'מחקר מקרה של ספק (Anam) מצא שהוספת אווטאר מדבר העלתה את שיעור המבקרים שפותחים שיחה מ־7.75% ל־26.58%. זו הייתה בדיקת לפני ואחרי, לא ניסוי אקראי.',
    en: 'A vendor case study (Anam) found that adding a talking avatar raised the share of visitors who start a conversation from 7.75% to 26.58%. It was a before/after test, not a randomized one.',
    th: 'กรณีศึกษาจากผู้ให้บริการ (Anam) พบว่าการเพิ่มอวตารที่พูดได้ทำให้สัดส่วนผู้เข้าชมที่เริ่มบทสนทนาเพิ่มจาก 7.75% เป็น 26.58% เป็นการทดสอบก่อนและหลัง ไม่ใช่การทดลองแบบสุ่ม',
  } as L10n,
  limitsTitle: { he: 'מה הוא עוד לא יודע לעשות', en: "What it can't do yet", th: 'สิ่งที่ยังทำไม่ได้' } as L10n,
  limits: [
    {
      he: 'מבקר אחד בכל רגע לכל ערוץ שרת. הרחבה לכמה מבקרים במקביל בתכנון.',
      en: 'One visitor at a time per server slot today. Scaling to more at once is planned.',
      th: 'ตอนนี้รองรับผู้เข้าชมครั้งละหนึ่งคนต่อหนึ่งช่องเซิร์ฟเวอร์ กำลังวางแผนขยาย',
    },
    {
      he: 'אי אפשר עדיין לקטוע אותו בקול באמצע משפט. בכתב זה עובד.',
      en: "Visitors can't interrupt it by voice mid-sentence yet. Typing works.",
      th: 'ผู้เข้าชมยังพูดแทรกกลางประโยคไม่ได้ แต่พิมพ์แทรกได้',
    },
    {
      he: 'צריך חיבור לאינטרנט.',
      en: 'It needs an internet connection.',
      th: 'ต้องใช้อินเทอร์เน็ต',
    },
  ] as L10n[],
};

export type Plan = { id: string; name: L10n; price: number; minutes: number; fit: L10n; perMin: string; perDay: string; perConv: string; recommended?: boolean };

export const PRICING = {
  title: { he: 'מחירים', en: 'Pricing', th: 'ราคา' } as L10n,
  sub: {
    he: 'מחיר חודשי קבוע, לפי דקות שיחה. בלי התחייבות.',
    en: 'A fixed monthly price, by conversation minutes. No commitment.',
    th: 'ราคารายเดือนคงที่ ตามนาทีสนทนา ไม่มีสัญญาผูกมัด',
  } as L10n,
  perMonth: { he: 'לחודש', en: '/ month', th: '/ เดือน' } as L10n,
  minutesLabel: { he: 'דקות שיחה בחודש', en: 'conversation minutes a month', th: 'นาทีสนทนาต่อเดือน' } as L10n,
  perMinLabel: { he: 'לדקה בפועל', en: 'effective per minute', th: 'ต่อนาทีโดยเฉลี่ย' } as L10n,
  recommended: { he: 'מומלץ', en: 'Recommended', th: 'แนะนำ' } as L10n,
  statement: { he: 'שיחה עם לקוח: בערך ₪5 עד ₪10', en: 'A customer conversation: about ₪5 to ₪10', th: 'คุยกับลูกค้าหนึ่งครั้ง: ราว ₪5 ถึง ₪10' } as L10n,
  statementNote: {
    he: 'לפי שיחה טיפוסית של 2.5 דקות: ₪5 בחבילת פרו, ₪10 בחבילה הבסיסית.',
    en: 'Based on a typical 2.5-minute conversation: ₪5 on Pro, ₪10 on Basic.',
    th: 'คิดจากบทสนทนาทั่วไป 2.5 นาที: ₪5 ในแพ็กเกจ Pro, ₪10 ในแพ็กเกจ Basic',
  } as L10n,
  perDayLabel: { he: 'ביום', en: 'a day', th: 'ต่อวัน' } as L10n,
  perConvLabel: { he: 'לשיחה', en: 'a conversation', th: 'ต่อบทสนทนา' } as L10n,
  free: {
    name: { he: 'התחלה בחינם', en: 'Start free', th: 'เริ่มต้นฟรี' } as L10n,
    includes: [
      { he: 'שיחת ייעוץ', en: 'A consultation call', th: 'คุยปรึกษา' },
      { he: 'הדגמה חיה של 3 דקות של הנציג על האתר שלכם, עם המידע האמיתי שלכם', en: 'A 3-minute live demo of the agent on YOUR own site, with your real info', th: 'เดโมสด 3 นาทีของเจ้าหน้าที่บนเว็บของคุณเอง ด้วยข้อมูลจริงของคุณ' },
    ] as L10n[],
    note: { he: 'זו נקודת ההתחלה, לא חבילה קבועה.', en: 'This is the free start, not a permanent plan.', th: 'นี่คือจุดเริ่มต้นฟรี ไม่ใช่แพ็กเกจถาวร' } as L10n,
    cta: { he: 'להדגמה החינמית', en: 'Get the free demo', th: 'ขอเดโมฟรี' } as L10n,
  },
  plans: [
    {
      id: 'basic',
      name: { he: 'בסיסי', en: 'Basic', th: 'Basic' },
      price: 390,
      minutes: 100,
      fit: { he: 'לאתר קטן, כ־30 מבקרים ביום', en: 'A small site, about 30 visitors a day', th: 'เว็บเล็ก ราว 30 คนต่อวัน' },
      perMin: '₪3.90',
      perDay: '₪13',
      perConv: '≈₪10',
    },
    {
      id: 'business',
      name: { he: 'עסקי', en: 'Business', th: 'Business' },
      price: 790,
      minutes: 300,
      fit: { he: 'כ־100 מבקרים ביום', en: 'About 100 visitors a day', th: 'ราว 100 คนต่อวัน' },
      perMin: '₪2.63',
      perDay: '≈₪26',
      perConv: '≈₪7',
      recommended: true,
    },
    {
      id: 'pro',
      name: { he: 'פרו', en: 'Pro', th: 'Pro' },
      price: 1490,
      minutes: 800,
      fit: { he: 'אתר עמוס או קמפיינים', en: 'A busy site or campaigns', th: 'เว็บที่มีคนเข้าเยอะหรือช่วงแคมเปญ' },
      perMin: '₪1.86',
      perDay: '≈₪50',
      perConv: '≈₪5',
    },
  ] as Plan[],
  extras: [
    { k: { he: 'דקה נוספת', en: 'Extra minute', th: 'นาทีเพิ่มเติม' }, v: { he: '₪2', en: '₪2', th: '₪2' } },
    {
      k: { he: 'הקמה חד־פעמית', en: 'One-time setup', th: 'ค่าติดตั้งครั้งเดียว' },
      v: {
        he: '₪1,500 עד ₪3,000: דמות, קול, ידע, מוח n8n וזרימת לידים',
        en: '₪1,500 to ₪3,000: character, voice, knowledge, n8n brain and lead flow',
        th: '₪1,500 ถึง ₪3,000: ตัวละคร เสียง ความรู้ สมอง n8n และระบบส่งลีด',
      },
    },
    { k: { he: 'תשלום שנתי', en: 'Annual billing', th: 'จ่ายรายปี' }, v: { he: '15% הנחה', en: '15% off', th: 'ลด 15%' } },
    {
      k: { he: 'תוספת: פעולות n8n', en: 'Add-on: n8n actions', th: 'ส่วนเสริม: แอ็กชัน n8n' },
      v: {
        he: 'קביעת תורים, CRM, מעקב בוואטסאפ. בהצעת מחיר לפי פרויקט',
        en: 'Booking, CRM, WhatsApp follow-up. Quoted per project',
        th: 'จองคิว CRM ติดตามทาง WhatsApp เสนอราคาตามโปรเจกต์',
      },
    },
    { k: { he: 'ביטול', en: 'Cancel', th: 'ยกเลิก' }, v: { he: 'בכל חודש, בלי קנס', en: 'Any month, no penalty', th: 'ได้ทุกเดือน ไม่มีค่าปรับ' } },
  ] as { k: L10n; v: L10n }[],
  trialTitle: { he: '30 יום לשפוט לפי המספרים שלכם', en: '30 days to judge it by your own numbers', th: '30 วันให้คุณตัดสินจากตัวเลขของคุณเอง' } as L10n,
  trialBody: {
    he: 'בחודש הראשון יש לכם מונה של שיחות ולידים, כך שאתם רואים בדיוק כמה אנשים דיברו עם הנציג וכמה השאירו פרטים. לא מתאים? מבטלים.',
    en: 'In the first month you get a counter of conversations and leads, so you see exactly how many people talked to your agent and how many left their details. Not a fit? Cancel.',
    th: 'เดือนแรกคุณจะมีตัวนับบทสนทนาและลีด เห็นชัดว่ามีกี่คนคุยกับเจ้าหน้าที่ และกี่คนทิ้งข้อมูลไว้ ไม่เหมาะก็ยกเลิกได้',
  } as L10n,
  payback: {
    he: 'אם זה מביא לכם 2 לקוחות בחודש, זה כבר החזיר את עצמו.',
    en: 'If it brings you 2 customers a month, it has paid for itself.',
    th: 'ถ้าได้ลูกค้าเพิ่ม 2 คนต่อเดือน ก็คุ้มทุนแล้ว',
  } as L10n,
  foreign: {
    he: '',
    en: 'Prices in Israeli shekels. Outside Israel, ask for a USD or THB quote.',
    th: 'ราคาเป็นเงินเชเกลอิสราเอล หากอยู่นอกอิสราเอล ขอใบเสนอราคาเป็น USD หรือ THB ได้',
  } as L10n,
  cta: {
    he: 'קודם הדגמה חיה, בחינם',
    en: 'Start with a free live demo',
    th: 'เริ่มจากเดโมสดฟรี',
  } as L10n,
};

type Cost = { t: L10n; note?: L10n };

/**
 * Layered first-year cost, scenario: 300 conversation minutes a month with a custom character
 * (= our Business plan). $1 = ₪3.08, €1 ≈ ₪3.55 (Wise, Nov 12 2026). Figures computed by Refael;
 * competitor totals are lower bounds (cheapest n8n tier, cheapest developer estimate).
 */
export const COMPARE = {
  hook: {
    he: 'בערך חצי מחיר. הכל כלול. בעברית. בלי מתכנת.',
    en: 'About half the price. Everything included. In Hebrew. No developer.',
    th: 'ราวครึ่งราคา รวมทุกอย่าง เป็นภาษาฮีบรู ไม่ต้องจ้างโปรแกรมเมอร์',
  } as L10n,
  sub: {
    he: 'פלטפורמות האווטאר המובילות מוכרות לכם פנים מדברות. עדיין תשלמו על המוח, על העברית ועל מתכנת. אנחנו מקימים בשבילכם את כל הנציג.',
    en: "Leading avatar platforms sell you a talking face. You'd still pay for the brain, the Hebrew and a developer. We set up the whole agent for you.",
    th: 'แพลตฟอร์มอวตารชั้นนำขายใบหน้าที่พูดได้ให้คุณ คุณยังต้องจ่ายค่าสมอง ค่าภาษาฮีบรู และค่านักพัฒนาอีก เราตั้งค่าเจ้าหน้าที่ทั้งระบบให้คุณ',
  } as L10n,
  cta: {
    he: 'נסו בחינם 3 דקות על האתר שלכם',
    en: 'Try it free for 3 minutes on your own site',
    th: 'ลองฟรี 3 นาทีบนเว็บของคุณเอง',
  } as L10n,
  scenario: {
    he: 'התרחיש: 300 דקות שיחה בחודש, דמות מותאמת אישית.',
    en: 'Scenario: 300 minutes of conversation a month, custom character.',
    th: 'สถานการณ์: สนทนา 300 นาทีต่อเดือน พร้อมตัวละครเฉพาะของคุณ',
  } as L10n,
  competitors: ['HeyGen LiveAvatar', 'Tavus', 'D-ID'],
  oursName: 'Refael.ai',
  faceAlt: { he: 'הפנים המדברות של הנציג', en: "The agent's talking face", th: 'ใบหน้าที่พูดได้ของเจ้าหน้าที่' } as L10n,
  layers: [
    {
      label: { he: 'פנים מדברות + קול (דמות מותאמת)', en: 'Talking face + voice (custom character)', th: 'ใบหน้าพูดได้ + เสียง (ตัวละครเฉพาะ)' },
      ours: { t: { he: 'כלול', en: 'Included', th: 'รวมแล้ว' } },
      others: [
        { t: { he: '≈₪1,463 לחודש', en: '≈₪1,463 / mo', th: '≈₪1,463 / เดือน' }, note: { he: 'Business ‏$475, נדרש לפנים מותאמות ב־1080p', en: 'Business $475, needed for a custom 1080p face', th: 'Business $475 จำเป็นสำหรับใบหน้าเฉพาะ 1080p' } },
        { t: { he: '≈₪505 לחודש', en: '≈₪505 / mo', th: '≈₪505 / เดือน' }, note: { he: 'Builder ‏$59 + ‏300 דקות × $0.35', en: '$59 Builder + 300 min × $0.35', th: 'Builder $59 + 300 นาที × $0.35' } },
        { t: { he: '≈₪1,800 לחודש', en: '≈₪1,800 / mo', th: '≈₪1,800 / เดือน' }, note: { he: 'Advanced ‏$196 ל־100 דקות, 300 דקות באותו תעריף. מעל 100 דקות: הצעת מחיר ארגונית', en: 'Advanced $196 per 100 min, 300 min at that rate. Above 100 min it is an enterprise quote', th: 'Advanced $196 ต่อ 100 นาที คิด 300 นาทีที่อัตรานี้ เกิน 100 นาทีต้องขอราคาองค์กร' } },
      ] as Cost[],
    },
    {
      label: { he: 'סוכן AI שמוכר, קובע ומבצע פעולות (אחסון n8n)', en: 'AI agent that sells, books and takes actions (n8n hosting)', th: 'AI agent ที่ขาย จองคิว และลงมือทำ (โฮสต์ n8n)' },
      ours: { t: { he: 'כלול', en: 'Included', th: 'รวมแล้ว' } },
      others: Array(3).fill({ t: { he: '+≈₪85 עד ₪215 לחודש', en: '+≈₪85 to ₪215 / mo', th: '+≈₪85 ถึง ₪215 / เดือน' }, note: { he: 'n8n cloud ‏€24 עד €60', en: 'n8n cloud €24 to €60', th: 'n8n cloud €24 ถึง €60' } }) as Cost[],
    },
    {
      label: { he: 'מתכנת שמחבר לידים, תורים, וואטסאפ ועברית', en: 'Developer to connect leads, booking, WhatsApp, Hebrew', th: 'นักพัฒนาเพื่อเชื่อมลีด การจอง WhatsApp และภาษาฮีบรู' },
      ours: { t: { he: 'הקמה ₪1,500 עד ₪3,000 חד־פעמי, אנחנו עושים הכול', en: 'Setup ₪1,500 to ₪3,000 once, done for you', th: 'ค่าติดตั้ง ₪1,500 ถึง ₪3,000 ครั้งเดียว เราทำให้ทั้งหมด' } },
      others: Array(3).fill({ t: { he: '+₪5,000 עד ₪20,000 חד־פעמי', en: '+₪5,000 to ₪20,000 once', th: '+₪5,000 ถึง ₪20,000 ครั้งเดียว' }, note: { he: 'הערכת סטודיו ישראלי', en: 'Israeli studio estimate', th: 'ประมาณการจากสตูดิโออิสราเอล' } }) as Cost[],
    },
    {
      label: { he: 'קול עברי וזיהוי דיבור בעברית, מכוונים', en: 'Hebrew voice and Hebrew speech recognition tuned', th: 'เสียงฮีบรูและการรู้จำเสียงฮีบรูที่ปรับแล้ว' },
      ours: { t: { he: 'כלול ומכוון', en: 'Included and tuned', th: 'รวมและปรับแล้ว' }, ok: true },
      others: Array(3).fill({ t: { he: 'אתם מגדירים', en: 'You configure it', th: 'คุณตั้งค่าเอง' } }) as Cost[],
    },
  ] as { label: L10n; ours: Cost & { ok?: boolean }; others: Cost[] }[],
  totalLabel: { he: 'שנה ראשונה, הכול כלול', en: 'First year, all-in', th: 'ปีแรก รวมทุกอย่าง' } as L10n,
  oursTotal: '₪10,980',
  oursTotalNote: { he: '₪790 × 12 + ₪1,500 הקמה', en: '₪790 × 12 + ₪1,500 setup', th: '₪790 × 12 + ค่าติดตั้ง ₪1,500' } as L10n,
  oursPerConv: { he: 'בערך ₪7 לשיחה', en: 'about ₪7 a conversation', th: 'ราว ₪7 ต่อบทสนทนา' } as L10n,
  otherTotals: ['≈₪23,500+', '≈₪12,100+', '≈₪26,800+'],
  perHour: {
    he: 'לפי שעת שיחה, בשימוש הזה: אצלנו ≈₪158 (≈$51). בחבילת פרו זה יוצא ≈₪112 לשעה.',
    en: 'Per hour of conversation at this usage: ours ≈₪158 (≈$51). Our Pro package works out to ≈₪112 an hour.',
    th: 'ต่อชั่วโมงสนทนาที่การใช้งานนี้: ของเรา ≈₪158 (≈$51) แพ็กเกจ Pro ตกราว ≈₪112 ต่อชั่วโมง',
  } as L10n,
  honest: {
    he: 'לפי דקה גולמית, מנועי פנים בלבד (וגם HeyGen עם פנים מוכנות) יכולים לצאת זולים יותר. הם מוכרים פנים. אנחנו מספקים נציג עובד.',
    en: 'Per raw minute, face-only engines (and HeyGen with a stock face) can be cheaper. They sell a face. We deliver a working agent.',
    th: 'ถ้าคิดเป็นนาทีล้วนๆ เอนจินที่ขายแค่ใบหน้า (และ HeyGen แบบใบหน้าสำเร็จรูป) อาจถูกกว่า เขาขายใบหน้า เราส่งมอบเจ้าหน้าที่ที่ทำงานได้จริง',
  } as L10n,
  sourcesTitle: { he: 'מקורות', en: 'Sources', th: 'แหล่งที่มา' } as L10n,
  sourcesNote: {
    he: 'מחירי מחירון כפי שפורסמו, נבדקו באוקטובר 2026. הומר לפי $1 = ₪3.08 ו־€1 ≈ ₪3.55 (Wise, 12 בנובמבר 2026), מעוגל ומסומן ≈. סכומי המתחרים הם רף תחתון.',
    en: 'List prices as published, verified Oct 2026. Converted at $1 = ₪3.08 and €1 ≈ ₪3.55 (Wise, Nov 12 2026), rounded and marked ≈. Competitor totals are lower bounds.',
    th: 'ราคาตามที่เผยแพร่ ตรวจสอบเมื่อ ต.ค. 2026 แปลงที่ $1 = ₪3.08 และ €1 ≈ ₪3.55 (Wise, 12 พ.ย. 2026) ปัดเศษและทำเครื่องหมาย ≈ ยอดรวมของผู้ให้บริการอื่นเป็นค่าขั้นต่ำ',
  } as L10n,
  sources: [
    {
      label: {
        he: 'HeyGen, "Best real-time AI avatar platforms" (עודכן 29.10.2026, מחירים נבדקו אוקטובר 2026)',
        en: 'HeyGen, "Best real-time AI avatar platforms" (updated Oct 29 2026, prices verified Oct 2026)',
        th: 'HeyGen, "Best real-time AI avatar platforms" (อัปเดต 29 ต.ค. 2026 ตรวจสอบราคา ต.ค. 2026)',
      },
      href: 'https://www.heygen.com/blog/best-real-time-ai-avatar-platforms',
    },
    {
      label: { he: 'toolradar.com, תמחור n8n 2026', en: 'toolradar.com, n8n pricing 2026', th: 'toolradar.com, ราคา n8n 2026' },
      href: 'https://toolradar.com/blog/n8n-pricing-2026',
    },
    {
      label: {
        he: 'AI Buddy ב־dev.to, עלות סוכן AI לעסק ישראלי 2026 (הערכת ספק)',
        en: 'AI Buddy on dev.to, AI agent cost for an Israeli business 2026 (vendor estimate)',
        th: 'AI Buddy บน dev.to, ค่าสร้าง AI agent สำหรับธุรกิจอิสราเอล 2026 (ประมาณการของผู้ให้บริการ)',
      },
      href: 'https://dev.to/aibuddy_il/how-much-does-an-ai-agent-cost-for-an-israeli-business-real-prices-in-2026-36om',
    },
    {
      label: { he: 'Wise, שער דולר לשקל, 12 בנובמבר 2026', en: 'Wise, USD to ILS rate, Nov 12 2026', th: 'Wise, อัตรา USD เป็น ILS, 12 พ.ย. 2026' },
      href: 'https://wise.com/gb/currency-converter/usd-to-ils-rate',
    },
  ] as { label: L10n; href: string }[],
};

export const CUSTOM = {
  title: { he: 'הכול מותאם לעסק שלכם', en: 'Built around your business', th: 'ปรับให้เข้ากับธุรกิจของคุณ' } as L10n,
  items: [
    { t: { he: 'דמות', en: 'Character', th: 'ตัวละคร' }, b: { he: 'סגנון ומראה שמתאימים למותג: מציאותי, מאויר או קמע.', en: 'A look that fits your brand: realistic, illustrated or a mascot.', th: 'หน้าตาที่เข้ากับแบรนด์ สมจริง การ์ตูน หรือมาสคอต' } },
    { t: { he: 'קול', en: 'Voice', th: 'เสียง' }, b: { he: 'קול עברי טבעי, נשי או גברי, בטון של העסק.', en: 'A natural Hebrew voice, female or male, in your tone.', th: 'เสียงฮีบรูธรรมชาติ หญิงหรือชาย ในโทนของธุรกิจคุณ' } },
    { t: { he: 'שם', en: 'Name', th: 'ชื่อ' }, b: { he: 'אתם בוחרים איך הנציג מציג את עצמו.', en: 'You choose how your agent introduces itself.', th: 'คุณเลือกได้ว่าเจ้าหน้าที่จะแนะนำตัวว่าอะไร' } },
    { t: { he: 'ידע', en: 'Knowledge', th: 'ความรู้' }, b: { he: 'מחירון, שירותים, שעות פעילות ושאלות נפוצות. מתעדכן כשמשהו משתנה.', en: 'Prices, services, hours and FAQ. Updated when something changes.', th: 'ราคา บริการ เวลาทำการ และคำถามที่พบบ่อย อัปเดตเมื่อมีการเปลี่ยนแปลง' } },
    { t: { he: 'פעולות דרך n8n', en: 'Actions through n8n', th: 'แอ็กชันผ่าน n8n' }, b: { he: 'קביעת פגישה, שליחת הצעת מחיר, פתיחת פנייה. מוסיפים כשצריך.', en: 'Book a meeting, send a quote, open a ticket. Add them when you need them.', th: 'นัดประชุม ส่งใบเสนอราคา เปิดทิกเก็ต เพิ่มได้เมื่อต้องการ' } },
  ] as { t: L10n; b: L10n }[],
};

export const FAQ_HEAD: L10n = { he: 'שאלות ותנאים', en: 'Questions and terms', th: 'คำถามและเงื่อนไข' };

export const FAQ: { q: L10n; a: L10n }[] = [
  {
    q: { he: 'איך עובדים 30 הימים הראשונים?', en: 'How do the first 30 days work?', th: '30 วันแรกเป็นอย่างไร?' },
    a: {
      he: 'הנציג עולה לאתר שלכם ויש לכם מונה של שיחות ולידים. אחרי 30 יום אתם מחליטים לפי המספרים שלכם אם להמשיך.',
      en: 'Your agent goes live on your site and you get a counter of conversations and leads. After 30 days you decide by your own numbers whether to continue.',
      th: 'เจ้าหน้าที่ขึ้นบนเว็บของคุณ และคุณมีตัวนับบทสนทนาและลีด หลัง 30 วันคุณตัดสินใจจากตัวเลขของคุณเองว่าจะใช้ต่อหรือไม่',
    },
  },
  {
    q: { he: 'אפשר לבטל?', en: 'Can I cancel?', th: 'ยกเลิกได้ไหม?' },
    a: {
      he: 'כן, בכל חודש, בלי קנס. התשלום חודשי. בתשלום שנתי מקבלים 15% הנחה.',
      en: 'Yes, any month, no penalty. Billing is monthly. Annual billing gets 15% off.',
      th: 'ได้ ทุกเดือน ไม่มีค่าปรับ เรียกเก็บรายเดือน ถ้าจ่ายรายปีลด 15%',
    },
  },
  {
    q: { he: 'מה נחשב דקה, ומה קורה אם עוברים את החבילה?', en: 'What counts as a minute, and what if I go over?', th: 'นับนาทีอย่างไร และถ้าใช้เกินแพ็กเกจล่ะ?' },
    a: {
      he: 'נספרות דקות שיחה פעילה עם מבקר. מעבר לחבילה כל דקה עולה ₪2, ותמיד אפשר לעבור לחבילה גדולה יותר.',
      en: 'We count active conversation minutes with a visitor. Beyond your plan each minute is ₪2, and you can always move up a plan.',
      th: 'นับเฉพาะนาทีที่สนทนากับผู้เข้าชมจริง ถ้าเกินแพ็กเกจ นาทีละ ₪2 และเปลี่ยนเป็นแพ็กเกจใหญ่ขึ้นได้เสมอ',
    },
  },
  {
    q: { he: 'מה עם פרטיות?', en: 'What about privacy?', th: 'เรื่องความเป็นส่วนตัวล่ะ?' },
    a: {
      he: 'נתוני השיחות והלידים שייכים לכם ונשמרים אצלכם (בגיליון, ב־CRM או במייל שלכם). אנחנו עובדים לפי חוק הגנת הפרטיות הישראלי ולפי נהלים ברוח ה־GDPR: איסוף רק של מה שצריך ומחיקה לפי בקשה.',
      en: 'Conversation and lead data belong to you and are kept on your side (your Sheet, CRM or email). We work in line with the Israeli Privacy Protection Law and GDPR-style practices: collect only what is needed and delete on request.',
      th: 'ข้อมูลบทสนทนาและลีดเป็นของคุณ และเก็บไว้ฝั่งคุณ (Sheet, CRM หรืออีเมลของคุณ) เราทำงานตามกฎหมายคุ้มครองความเป็นส่วนตัวของอิสราเอลและแนวปฏิบัติแบบ GDPR เก็บเท่าที่จำเป็นและลบเมื่อมีการร้องขอ',
    },
  },
  {
    q: { he: 'המבקרים יודעים שזה AI?', en: 'Do visitors know it is AI?', th: 'ผู้เข้าชมรู้ไหมว่าเป็น AI?' },
    a: {
      he: 'כן. הנציג מציג את עצמו כעוזר AI כבר במשפט הראשון.',
      en: 'Yes. The agent introduces itself as an AI assistant in its first sentence.',
      th: 'รู้ เจ้าหน้าที่แนะนำตัวว่าเป็นผู้ช่วย AI ตั้งแต่ประโยคแรก',
    },
  },
  {
    q: { he: 'מה הוא עוד לא יודע לעשות?', en: "What can't it do yet?", th: 'ยังทำอะไรไม่ได้บ้าง?' },
    a: {
      he: 'היום הוא מדבר עם מבקר אחד בכל רגע לכל ערוץ שרת (הרחבה בתכנון). אי אפשר עדיין לקטוע אותו בקול באמצע משפט, אבל בכתב זה עובד. והוא צריך חיבור לאינטרנט.',
      en: "Today it talks with one visitor at a time per server slot (scaling is planned). Visitors can't interrupt it by voice mid-sentence yet, but typing works. And it needs an internet connection.",
      th: 'ตอนนี้คุยกับผู้เข้าชมได้ครั้งละหนึ่งคนต่อหนึ่งช่องเซิร์ฟเวอร์ (กำลังวางแผนขยาย) ยังพูดแทรกกลางประโยคไม่ได้ แต่พิมพ์แทรกได้ และต้องใช้อินเทอร์เน็ต',
    },
  },
  {
    q: { he: 'זה עובד על Wix, וורדפרס או Shopify?', en: 'Does it work on Wix, WordPress or Shopify?', th: 'ใช้กับ Wix, WordPress หรือ Shopify ได้ไหม?' },
    a: {
      he: 'כן. זו שורת קוד אחת שמדביקים באתר, והיא עובדת על Wix, וורדפרס, Shopify וכל אתר HTML.',
      en: 'Yes. It is one line of code you paste into your site, and it works on Wix, WordPress, Shopify and any HTML site.',
      th: 'ได้ เป็นโค้ดบรรทัดเดียวที่วางในเว็บ ใช้ได้กับ Wix, WordPress, Shopify และทุกเว็บ HTML',
    },
  },
  {
    q: { he: 'כמה זמן לוקחת ההקמה?', en: 'How long does setup take?', th: 'ติดตั้งนานแค่ไหน?' },
    a: {
      he: 'כמה ימי עסקים מרגע שקיבלנו מכם את המידע: מחירון, שירותים ושאלות נפוצות.',
      en: 'A few business days after we get your info: prices, services and common questions.',
      th: 'ไม่กี่วันทำการหลังจากเราได้รับข้อมูลของคุณ: ราคา บริการ และคำถามที่พบบ่อย',
    },
  },
  {
    q: { he: 'ומה אם שואלים אותו משהו שהוא לא יודע?', en: "What if a visitor asks something it doesn't know?", th: 'ถ้าผู้เข้าชมถามสิ่งที่ไม่รู้ล่ะ?' },
    a: {
      he: 'הוא לא ממציא. הוא אומר שהוא לא בטוח, לוקח שם וטלפון, ואתם חוזרים ללקוח.',
      en: "It doesn't make things up. It says it isn't sure, takes their name and phone, and you get back to them.",
      th: 'ไม่แต่งเรื่อง จะบอกว่าไม่แน่ใจ เก็บชื่อและเบอร์โทร แล้วคุณติดต่อกลับเอง',
    },
  },
  {
    q: { he: 'הוא מבטיח לי יותר מכירות?', en: 'Will it increase my sales?', th: 'จะช่วยเพิ่มยอดขายไหม?' },
    a: {
      he: 'אנחנו לא מבטיחים מכירות. מה שהוא עושה: מדבר עם יותר מבקרים ואוסף יותר לידים, ובחודש הראשון אתם רואים את המספרים בעצמכם. את הסגירה עושים אתם.',
      en: 'We do not promise sales. What it does: talk with more visitors and collect more leads, and in the first month you see the numbers yourself. Closing stays with you.',
      th: 'เราไม่สัญญาเรื่องยอดขาย สิ่งที่ทำคือคุยกับผู้เข้าชมมากขึ้นและเก็บลีดมากขึ้น และเดือนแรกคุณเห็นตัวเลขเอง การปิดการขายยังเป็นของคุณ',
    },
  },
];

export const FINAL = {
  title: { he: 'רוצים לראות אותו על האתר שלכם?', en: 'Want to see it on your own site?', th: 'อยากเห็นบนเว็บของคุณเองไหม?' } as L10n,
  body: {
    he: 'שלחו כתובת אתר. נראה לכם בשיחה של 3 דקות איך הנציג שלכם מקבל מבקרים, בלי עלות ובלי התחייבות.',
    en: 'Send your site address. In a 3-minute call we show you how your agent greets visitors, free and with no commitment.',
    th: 'ส่งที่อยู่เว็บไซต์มา แล้วเราจะโชว์ใน 3 นาทีว่าเจ้าหน้าที่ของคุณต้อนรับผู้เข้าชมอย่างไร ฟรี ไม่มีข้อผูกมัด',
  } as L10n,
  message: {
    he: 'היי רפאל, אשמח להדגמה חיה של 3 דקות על האתר שלי: ',
    en: 'Hi Refael, I would like the free 3-minute live demo on my site: ',
    th: 'สวัสดีครับ/ค่ะ ราฟาเอล อยากดูเดโมสด 3 นาทีบนเว็บของฉัน: ',
  } as L10n,
};

/** In-page header links. Pricing is not here: the global header always links to #pricing. */
export const SECTIONS = [
  { href: '#how', he: 'איך זה עובד', en: 'How it works', th: 'ทำงานอย่างไร' },
  { href: '#compare', he: 'השוואה', en: 'Compare', th: 'เปรียบเทียบ' },
  { href: '#faq', he: 'שאלות', en: 'FAQ', th: 'คำถาม' },
];
