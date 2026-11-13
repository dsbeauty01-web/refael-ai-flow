import type { L10n } from '@/config/site';

/**
 * /customer-service (v2): the live talking-face website agent.
 * Rendered by pages/AgentPage.tsx. Every string has he, en, th.
 * Rules: no em dashes or double dashes, no character names, no invented numbers,
 * never "replaces your sales team", never promise a sales lift.
 * Prices are shown on THIS page only (osek patur: final prices, no VAT line).
 * Internal cost basis is secret: never put it here.
 */

/* ------------------------------------------------------------------ media */

export const FACE_VIDEO = '/agent/face.mp4';
export const FACE_POSTER = '/agent/face.jpg';

/** Cropped, compressed web cuts of /media/maya_speaking_{he,en,th}.mp4 (head to waist, 480x600). */
export const TALK_VIDEO: L10n = { he: '/agent/talk-he.mp4', en: '/agent/talk-en.mp4', th: '/agent/talk-th.mp4' };
export const TALK_POSTER = '/agent/talk.jpg';

/** Tools screen recording from private test sessions. Swap when the real widget session is recorded. */
export const WORK_VIDEO = '/site/tools-explainer.mp4';
export const WORK_POSTER = '/site/tools-explainer.jpg';

/** 6 s silent loops cut from existing clips, 288x360. */
export const STYLES: { src: string; poster: string; label: L10n }[] = [
  {
    src: '/agent/style-3d.mp4',
    poster: '/agent/style-3d.jpg',
    label: { he: 'דמות תלת־ממד, בלייב אמיתי ביוטיוב', en: '3D character, on a real YouTube live', th: 'ตัวละคร 3D ในไลฟ์จริงบน YouTube' },
  },
  {
    src: '/agent/style-real.mp4',
    poster: '/agent/style-real.jpg',
    label: { he: 'מגיש מציאותי, בבדיקה חיה', en: 'Realistic presenter, live test', th: 'พิธีกรสมจริง ทดสอบสด' },
  },
  {
    src: '/agent/style-clinic.mp4',
    poster: '/agent/style-clinic.jpg',
    label: { he: 'סגנון קליניקה, סשן בדיקה', en: 'Clinic look, test session', th: 'สไตล์คลินิก เซสชันทดสอบ' },
  },
];

/* ------------------------------------------------------------------ hero */

export const HERO = {
  h1: {
    he: 'נציג חי באתר שלכם. עונה בעברית ושולח לכם את הליד.',
    en: 'A live agent on your website. It answers in Hebrew and sends you the lead.',
    th: 'เจ้าหน้าที่ AI แบบสดบนเว็บไซต์ของคุณ ตอบลูกค้าด้วยเสียง แล้วส่งลีดถึงคุณ',
  } as L10n,
  lead: {
    he: 'פנים מדברות בפינת האתר, 24/7. שורת קוד אחת.',
    en: 'A talking face in the corner of your site, 24/7. One line of code.',
    th: 'ใบหน้าที่พูดได้ที่มุมเว็บไซต์ ตลอด 24 ชั่วโมง โค้ดบรรทัดเดียว',
  } as L10n,
  priceChip: { he: 'מ־₪99 לחודש', en: 'From ₪99 a month', th: 'เริ่ม ₪99 ต่อเดือน' } as L10n,
  priceChipNote: { he: 'הקמה ₪0. מבטלים בכל חודש.', en: 'Setup ₪0. Cancel any month.', th: 'ค่าติดตั้ง ₪0 ยกเลิกได้ทุกเดือน' } as L10n,
  cta: {
    he: 'הדגמה חיה על האתר שלכם, בחינם',
    en: 'Free live demo on your own site',
    th: 'ขอเดโมสดบนเว็บของคุณ ฟรี',
  } as L10n,
  ctaNote: {
    he: '3 דקות בוואטסאפ, ישירות מול רפאל.',
    en: '3 minutes on WhatsApp, straight with Refael.',
    th: '3 นาทีทาง LINE คุยกับราฟาเอลโดยตรง',
  } as L10n,
  seePrices: { he: 'למחירים', en: 'See prices', th: 'ดูราคา' } as L10n,
  caption: {
    he: 'המחשה של האתר. הפנים בפינה הן הקלטה אמיתית של הנציג.',
    en: 'Illustrated site. The face in the corner is a real recording of the agent.',
    th: 'เว็บไซต์เป็นภาพประกอบ ใบหน้าที่มุมเป็นการบันทึกจริงของเจ้าหน้าที่',
  } as L10n,
  mockLabel: {
    he: 'המחשה: אתר של קליניקה עם נציג AI בפינה. הנציג מברך את המבקרת, עונה על מחיר, שומר את השם והטלפון שלה, וליד חדש מגיע לבעלת העסק בוואטסאפ.',
    en: 'Illustration: a clinic website with an AI agent in the corner. The agent greets the visitor, answers a price question, saves her name and phone, and a new lead reaches the owner on WhatsApp.',
    th: 'ภาพประกอบ: เว็บไซต์คลินิกที่มีเจ้าหน้าที่ AI อยู่มุมจอ ทักทายผู้เข้าชม ตอบคำถามเรื่องราคา เก็บชื่อและเบอร์โทร แล้วลีดใหม่ก็ส่งถึงเจ้าของธุรกิจทาง WhatsApp',
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
  sub: { he: 'קליניקה לטיפולי לייזר ואסתטיקה', en: 'Laser and aesthetics clinic', th: 'คลินิกเลเซอร์และความงาม' } as L10n,
  book: { he: 'קביעת תור', en: 'Book a visit', th: 'จองคิว' } as L10n,
  agentName: { he: 'העוזרת של הקליניקה', en: 'Clinic assistant', th: 'ผู้ช่วยของคลินิก' } as L10n,
  online: { he: 'מחוברת', en: 'Online', th: 'ออนไลน์' } as L10n,
  inputHint: { he: 'דברו או כתבו…', en: 'Talk or type…', th: 'พูดหรือพิมพ์…' } as L10n,
  chat: [
    {
      agent: true,
      text: {
        he: 'היי, אני העוזרת הדיגיטלית של הקליניקה. אפשר לשאול אותי כל דבר.',
        en: "Hi, I'm the clinic's AI assistant. Ask me anything.",
        th: 'สวัสดีค่ะ ฉันเป็นผู้ช่วย AI ของคลินิก ถามได้ทุกเรื่องค่ะ',
      },
    },
    {
      agent: false,
      text: { he: 'כמה עולה לייזר לרגליים?', en: 'How much is laser for the legs?', th: 'เลเซอร์ที่ขาราคาเท่าไหร่คะ?' },
    },
    {
      agent: true,
      text: {
        he: '₪450 לטיפול. לשמור לך שיחת ייעוץ?',
        en: '₪450 a session. Shall I save you a consultation?',
        th: 'ครั้งละ ₪450 ค่ะ ให้จองคิวปรึกษาไว้ให้ไหมคะ?',
      },
    },
    { agent: false, text: { he: 'דנה, 052-555-0147', en: 'Dana, 052-555-0147', th: 'Dana, 052-555-0147' } },
    {
      agent: true,
      text: {
        he: 'שמרתי, דנה. הקליניקה תחזור אלייך היום.',
        en: 'Saved, Dana. The clinic will call you today.',
        th: 'บันทึกแล้วค่ะคุณ Dana คลินิกจะติดต่อกลับวันนี้ค่ะ',
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
    ] as { k: L10n; v: L10n }[],
  },
};

/* ------------------------------------------------------------------ see it talk */

export const TALK = {
  title: { he: 'ככה הוא נשמע', en: 'Hear it talk', th: 'ฟังเสียงจริง' } as L10n,
  line: {
    he: 'קול טבעי, בעברית, באנגלית או בתאית. לחצו על הקול.',
    en: 'A natural voice, in Hebrew, English or Thai. Tap for sound.',
    th: 'เสียงธรรมชาติ ภาษาฮีบรู อังกฤษ หรือไทย แตะเพื่อเปิดเสียง',
  } as L10n,
  videoLabel: {
    he: 'קליפ מוקלט: דמות מדברת עברית',
    en: 'Recorded clip: a character speaking English',
    th: 'คลิปที่บันทึกไว้: ตัวละครพูดภาษาไทย',
  } as L10n,
  stylesTitle: { he: 'הדמות שלכם, בסגנון שלכם', en: 'Your character, your style', th: 'ตัวละครของคุณ ในสไตล์ของคุณ' } as L10n,
  stylesNote: {
    he: 'דמויות שבנינו. אתם בוחרים מראה, קול ושם.',
    en: 'Characters we built. You choose the look, voice and name.',
    th: 'ตัวละครที่เราสร้างไว้ คุณเลือกหน้าตา เสียง และชื่อได้',
  } as L10n,
};

/* ------------------------------------------------------------------ any business site */

/**
 * Illustration loops: AI-animated (fal.ai Kling 2.1) from still mockups, 540x960, ~4.7 s, silent.
 * Not real client sites. The caption says so.
 */
export const BIZ = {
  title: { he: 'עובד על כל אתר עסקי', en: 'Works on any business site', th: 'ใช้ได้กับทุกเว็บไซต์ธุรกิจ' } as L10n,
  line: {
    he: 'קליניקה, מספרה, חדר כושר או מסעדה. הנציג יושב בפינה ומדבר עם המבקרים.',
    en: 'Clinic, salon, gym or restaurant. The agent sits in the corner and talks to visitors.',
    th: 'คลินิก ร้านทำผม ฟิตเนส หรือร้านอาหาร เจ้าหน้าที่อยู่มุมจอและคุยกับผู้เข้าชม',
  } as L10n,
  caption: {
    he: 'איור. השיחה האמיתית מוקלטת למטה.',
    en: 'Illustration. The real recorded conversation is below.',
    th: 'ภาพประกอบ บทสนทนาจริงที่บันทึกไว้อยู่ด้านล่าง',
  } as L10n,
  clips: [
    { id: 'dental', label: { he: 'מרפאת שיניים', en: 'Dental clinic', th: 'คลินิกทันตกรรม' } },
    { id: 'beauty', label: { he: 'קליניקת יופי', en: 'Beauty clinic', th: 'คลินิกความงาม' } },
    { id: 'salon', label: { he: 'מספרה', en: 'Hair salon', th: 'ร้านทำผม' } },
    { id: 'gym', label: { he: 'חדר כושר', en: 'Gym', th: 'ฟิตเนส' } },
    { id: 'restaurant', label: { he: 'מסעדה', en: 'Restaurant', th: 'ร้านอาหาร' } },
  ].map(c => ({ ...c, src: `/agent/biz-${c.id}.mp4`, poster: `/agent/biz-${c.id}.jpg` })) as {
    id: string; label: L10n; src: string; poster: string;
  }[],
};

/* ------------------------------------------------------------------ see it work */

export const WORK = {
  title: { he: 'ככה הוא עובד', en: 'See it work', th: 'ดูการทำงานจริง' } as L10n,
  line: {
    he: 'הקלטת מסך מבדיקות פרטיות. הכלים אמיתיים, דרך n8n.',
    en: 'Screen recording from private tests. The tools are real, run through n8n.',
    th: 'บันทึกหน้าจอจากการทดสอบส่วนตัว เครื่องมือเป็นของจริง ทำงานผ่าน n8n',
  } as L10n,
  videoLabel: {
    he: 'הקלטת מסך: הנציג שולח קישור קנייה, שומר ליד בגוגל שיטס, קובע תור ומעדכן את בעל העסק',
    en: 'Screen recording: the agent sends a buy link, saves a lead to Google Sheets, books a slot and notifies the owner',
    th: 'บันทึกหน้าจอ: เจ้าหน้าที่ส่งลิงก์ซื้อ บันทึกลีดลง Google Sheets จองคิว และแจ้งเจ้าของธุรกิจ',
  } as L10n,
  points: [
    { he: 'עונה מתוך המידע שלכם', en: 'Answers from your info', th: 'ตอบจากข้อมูลของคุณ' },
    { he: 'תופס את הליד', en: 'Catches the lead', th: 'เก็บลีดไว้ให้' },
    { he: 'קובע תור ביומן', en: 'Books the slot', th: 'จองคิวในปฏิทิน' },
  ] as L10n[],
};

/* ------------------------------------------------------------------ how it starts */

export const HOW = {
  title: { he: 'איך מתחילים', en: 'How it starts', th: 'เริ่มต้นอย่างไร' } as L10n,
  steps: [
    {
      he: 'שולחים לנו כתובת אתר ומקבלים הדגמה חיה של 3 דקות, בחינם.',
      en: 'Send your site address and get a free 3-minute live demo.',
      th: 'ส่งที่อยู่เว็บไซต์มา รับเดโมสด 3 นาทีฟรี',
    },
    {
      he: 'בוחרים חבילה ודמות. אנחנו מכינים את הידע מהמחירון והשאלות שלכם.',
      en: 'Pick a plan and a character. We load your prices and FAQ.',
      th: 'เลือกแพ็กเกจและตัวละคร เราใส่ราคาและคำถามที่พบบ่อยของคุณให้',
    },
    {
      he: 'מדביקים שורת קוד אחת באתר. הלידים מגיעים לוואטסאפ.',
      en: 'Paste one line of code on your site. Leads arrive on WhatsApp.',
      th: 'วางโค้ดบรรทัดเดียวบนเว็บ ลีดส่งถึง WhatsApp',
    },
  ] as L10n[],
  platforms: 'Wix · WordPress · Shopify · HTML',
};

/* ------------------------------------------------------------------ pricing */

export type Plan = {
  id: 'start' | 'business' | 'pro';
  name: L10n;
  tagline: L10n;
  price: number;
  minutes: number;
  convs: number;
  perMin: string;
  perConv: string;
  perDay: string;
  includes: L10n[];
  recommended?: boolean;
};

const SETUP_FREE: L10n = { he: 'הקמה ₪0', en: 'Setup ₪0', th: 'ค่าติดตั้ง ₪0' };

export const PRICING = {
  title: { he: 'מחירים', en: 'Pricing', th: 'ราคา' } as L10n,
  statement: {
    he: 'שיחה עם לקוח: מ־₪4 בערך',
    en: 'A conversation with a customer: from about ₪4',
    th: 'คุยกับลูกค้าหนึ่งครั้ง: เริ่มราว ₪4',
  } as L10n,
  statementNote: {
    he: 'שיחה טיפוסית של 2.5 דקות בחבילת Start. מחירים סופיים, הקמה ₪0, מבטלים בכל חודש.',
    en: 'A typical 2.5-minute conversation on Start. Final prices, setup ₪0, cancel any month.',
    th: 'บทสนทนาทั่วไป 2.5 นาทีในแพ็กเกจ Start ราคาสุทธิ ค่าติดตั้ง ₪0 ยกเลิกได้ทุกเดือน',
  } as L10n,
  perMonth: { he: 'לחודש', en: '/ month', th: '/ เดือน' } as L10n,
  minutesLabel: { he: 'דקות שיחה', en: 'minutes of conversation', th: 'นาทีสนทนา' } as L10n,
  convsLabel: (n: number): L10n => ({ he: `כ־${n} שיחות`, en: `about ${n} conversations`, th: `ราว ${n} บทสนทนา` }),
  perConvLabel: { he: 'לשיחה', en: 'a conversation', th: 'ต่อบทสนทนา' } as L10n,
  perMinLabel: { he: 'לדקה', en: 'a minute', th: 'ต่อนาที' } as L10n,
  perDayLabel: { he: 'ביום', en: 'a day', th: 'ต่อวัน' } as L10n,
  recommended: { he: 'הכי משתלם לרוב העסקים', en: 'Best fit for most businesses', th: 'เหมาะกับธุรกิจส่วนใหญ่' } as L10n,
  free: {
    name: { he: 'הדגמה', en: 'Demo', th: 'เดโม' } as L10n,
    tagline: { he: 'לראות לפני שמחליטים', en: 'See it before you decide', th: 'ดูก่อนตัดสินใจ' } as L10n,
    includes: [
      { he: 'הדגמה חיה של 3 דקות על האתר שלכם, עם המידע האמיתי שלכם', en: 'A 3-minute live demo on your own site, with your real info', th: 'เดโมสด 3 นาทีบนเว็บของคุณ ด้วยข้อมูลจริงของคุณ' },
      { he: 'שיחת ייעוץ', en: 'A consultation call', th: 'คุยปรึกษา' },
    ] as L10n[],
    cta: { he: 'להדגמה בחינם', en: 'Get the free demo', th: 'ขอเดโมฟรี' } as L10n,
  },
  plans: [
    {
      id: 'start',
      name: { he: 'Start', en: 'Start', th: 'Start' },
      tagline: { he: 'להתחיל בקטן', en: 'To start small', th: 'เริ่มเล็กๆ ก่อน' },
      price: 99,
      minutes: 60,
      convs: 24,
      perMin: '≈₪1.65',
      perConv: '≈₪4',
      perDay: '≈₪3.30',
      includes: [
        { he: 'דמות מוכנה מהספרייה', en: 'A ready-made character', th: 'ตัวละครสำเร็จรูป' },
        SETUP_FREE,
      ],
    },
    {
      id: 'business',
      name: { he: 'Business', en: 'Business', th: 'Business' },
      tagline: { he: 'דמות משלכם, מספיק לעסק פעיל', en: 'Your own character, enough for an active business', th: 'ตัวละครของคุณเอง พอสำหรับธุรกิจที่มีลูกค้าเข้าเรื่อยๆ' },
      price: 390,
      minutes: 150,
      convs: 60,
      perMin: '₪2.60',
      perConv: '₪6.50',
      perDay: '₪13',
      includes: [
        { he: 'דמות מותאמת אישית, כלולה', en: 'Your own custom character, included', th: 'ตัวละครเฉพาะของคุณ รวมแล้ว' },
        SETUP_FREE,
      ],
      recommended: true,
    },
    {
      id: 'pro',
      name: { he: 'Pro', en: 'Pro', th: 'Pro' },
      tagline: { he: 'נציג שגם מבצע פעולות', en: 'An agent that also takes actions', th: 'เจ้าหน้าที่ที่ลงมือทำงานให้ด้วย' },
      price: 790,
      minutes: 400,
      convs: 160,
      perMin: '≈₪1.98',
      perConv: '≈₪5',
      perDay: '≈₪26',
      includes: [
        { he: 'דמות מותאמת אישית', en: 'Custom character', th: 'ตัวละครเฉพาะของคุณ' },
        { he: 'פעולות n8n: תורים, CRM, מעקב בוואטסאפ', en: 'n8n actions: booking, CRM, WhatsApp follow-up', th: 'แอ็กชัน n8n: จองคิว CRM ติดตามทาง WhatsApp' },
        SETUP_FREE,
      ],
    },
  ] as Plan[],
  planCta: (name: string): L10n => ({ he: `להתחיל עם ${name}`, en: `Start with ${name}`, th: `เริ่มกับ ${name}` }),
  planMessage: (name: string): L10n => ({
    he: `היי רפאל, מעניינת אותי חבילת ${name} לנציג באתר. האתר שלי: `,
    en: `Hi Refael, I'm interested in the ${name} plan for the website agent. My site: `,
    th: `สวัสดีครับ/ค่ะ สนใจแพ็กเกจ ${name} สำหรับเจ้าหน้าที่บนเว็บ เว็บของฉัน: `,
  }),
  extras: [
    { k: { he: 'דקה נוספת', en: 'Extra minute', th: 'นาทีเพิ่มเติม' }, v: { he: '₪2.50', en: '₪2.50', th: '₪2.50' } },
    { k: { he: 'דמות משלכם ב־Start', en: 'Own character on Start', th: 'ตัวละครเฉพาะใน Start' }, v: { he: '₪490 חד־פעמי, לא חובה', en: '₪490 once, optional', th: '₪490 ครั้งเดียว ไม่บังคับ' } },
    { k: { he: 'תשלום שנתי', en: 'Annual billing', th: 'จ่ายรายปี' }, v: { he: 'חודשיים מתנה', en: '2 months free', th: 'ฟรี 2 เดือน' } },
    { k: { he: 'ביטול', en: 'Cancel', th: 'ยกเลิก' }, v: { he: 'בכל חודש', en: 'Any month', th: 'ได้ทุกเดือน' } },
  ] as { k: L10n; v: L10n }[],
  foreign: {
    he: '',
    en: 'Prices in Israeli shekels. Outside Israel, ask for a USD or THB quote.',
    th: 'ราคาเป็นเงินเชเกลอิสราเอล หากอยู่นอกอิสราเอล ขอใบเสนอราคาเป็น USD หรือ THB ได้',
  } as L10n,
};

/* ------------------------------------------------------------------ comparison */

/**
 * Scenario = our Business plan: 150 conversation minutes a month, custom character.
 * $1 = ₪3.08 (Wise, Nov 12 2026), €1 ≈ ₪3.55. Competitor list prices from HeyGen's blog
 * (updated Oct 29 2026), n8n Starter €24 (toolradar 2026), developer from ≈₪5,000 (AI Buddy, dev.to 2026).
 * First year = (face + n8n) × 12 + developer.
 */
export const COMPARE = {
  hook: {
    he: 'פי 2 עד פי 5 זול יותר. הכל כלול. בעברית.',
    en: '2 to 5 times cheaper. Everything included. In Hebrew.',
    th: 'ถูกกว่า 2 ถึง 5 เท่า รวมทุกอย่าง พูดภาษาฮีบรูได้',
  } as L10n,
  scenario: {
    he: 'שנה ראשונה, הכל כלול. 150 דקות שיחה בחודש עם דמות מותאמת אישית.',
    en: 'First year, all-in. 150 minutes of conversation a month with a custom character.',
    th: 'ปีแรก รวมทุกอย่าง สนทนา 150 นาทีต่อเดือน พร้อมตัวละครเฉพาะของคุณ',
  } as L10n,
  oursName: 'Refael.ai',
  oursNote: { he: '₪390 × 12, הקמה ₪0', en: '₪390 × 12, setup ₪0', th: '₪390 × 12 ค่าติดตั้ง ₪0' } as L10n,
  faceAlt: { he: 'הפנים המדברות של הנציג', en: "The agent's talking face", th: 'ใบหน้าที่พูดได้ของเจ้าหน้าที่' } as L10n,
  bars: [
    { name: 'HeyGen', total: 23600 },
    { name: 'D-ID', total: 16900 },
    { name: 'Tavus', total: 10100 },
  ],
  oursTotal: 4680,
  breakdownTitle: { he: 'איך חישבנו', en: 'How we counted', th: 'เราคำนวณอย่างไร' } as L10n,
  competitors: ['HeyGen', 'Tavus', 'D-ID'],
  layers: [
    {
      label: { he: 'פנים + קול, דמות מותאמת, לחודש', en: 'Face + voice, custom character, a month', th: 'ใบหน้า + เสียง ตัวละครเฉพาะ ต่อเดือน' },
      ours: { he: 'כלול', en: 'Included', th: 'รวมแล้ว' },
      others: [
        { t: '≈₪1,463', note: { he: 'Business ‏$475, נדרש לדמות מותאמת ב־1080p', en: 'Business $475, needed for custom 1080p', th: 'Business $475 จำเป็นสำหรับตัวละครเฉพาะ 1080p' } },
        { t: '≈₪343', note: { he: '$59 + ‏150 דקות × $0.35', en: '$59 + 150 min × $0.35', th: '$59 + 150 นาที × $0.35' } },
        { t: '≈₪906', note: { he: '$1.96 לדקה (Advanced). מעל 100 דקות: הצעת מחיר ארגונית', en: '$1.96/min (Advanced). Above 100 min: enterprise quote', th: '$1.96/นาที (Advanced) เกิน 100 นาทีต้องขอราคาองค์กร' } },
      ],
    },
    {
      label: { he: '+ סוכן AI (אחסון n8n), לחודש', en: '+ AI agent (n8n hosting), a month', th: '+ AI agent (โฮสต์ n8n) ต่อเดือน' },
      ours: { he: 'כלול', en: 'Included', th: 'รวมแล้ว' },
      others: Array(3).fill({ t: '≈₪85', note: { he: 'n8n Starter ‏€24', en: 'n8n Starter €24', th: 'n8n Starter €24' } }),
    },
    {
      label: { he: '+ מתכנת: לידים, תורים, וואטסאפ, עברית', en: '+ Developer: leads, booking, WhatsApp, Hebrew', th: '+ นักพัฒนา: ลีด การจอง WhatsApp ภาษาฮีบรู' },
      ours: { he: '₪0', en: '₪0', th: '₪0' },
      others: Array(3).fill({ t: '≈₪5,000+', note: { he: 'חד־פעמי, לפחות', en: 'once, at least', th: 'ครั้งเดียว ขั้นต่ำ' } }),
    },
  ] as { label: L10n; ours: L10n; others: { t: string; note: L10n }[] }[],
  totalLabel: { he: 'שנה ראשונה', en: 'First year', th: 'ปีแรก' } as L10n,
  otherTotals: ['≈₪23,600', '≈₪10,100', '≈₪16,900'],
  honest: {
    he: 'לפי דקה גולמית, מנועים שמוכרים רק פנים יכולים לצאת זולים יותר. הם מוכרים פנים. אנחנו מספקים נציג עובד.',
    en: 'Per raw minute, face-only engines can be cheaper. They sell a face. We deliver a working agent.',
    th: 'ถ้าคิดเป็นนาทีล้วนๆ เอนจินที่ขายแค่ใบหน้าอาจถูกกว่า เขาขายใบหน้า เราส่งมอบเจ้าหน้าที่ที่ทำงานได้จริง',
  } as L10n,
  sourcesNote: {
    he: 'מחירי מחירון כפי שפורסמו. ‏$1 = ₪3.08 (Wise, 12 בנובמבר 2026), €1 ≈ ₪3.55. מעוגל ומסומן ≈. הסכומים של המתחרים הם רף תחתון.',
    en: 'Published list prices. $1 = ₪3.08 (Wise, Nov 12 2026), €1 ≈ ₪3.55. Rounded and marked ≈. Competitor totals are lower bounds.',
    th: 'ราคาตามที่เผยแพร่ $1 = ₪3.08 (Wise, 12 พ.ย. 2026) €1 ≈ ₪3.55 ปัดเศษและทำเครื่องหมาย ≈ ยอดของผู้ให้บริการอื่นเป็นค่าขั้นต่ำ',
  } as L10n,
  sources: [
    {
      label: { he: 'HeyGen, Best real-time AI avatar platforms (עודכן 29.10.2026)', en: 'HeyGen, Best real-time AI avatar platforms (updated Oct 29 2026)', th: 'HeyGen, Best real-time AI avatar platforms (อัปเดต 29 ต.ค. 2026)' },
      href: 'https://www.heygen.com/blog/best-real-time-ai-avatar-platforms',
    },
    { label: { he: 'toolradar, תמחור n8n 2026', en: 'toolradar, n8n pricing 2026', th: 'toolradar, ราคา n8n 2026' }, href: 'https://toolradar.com/blog/n8n-pricing-2026' },
    {
      label: { he: 'AI Buddy ב־dev.to, עלות סוכן AI לעסק ישראלי 2026', en: 'AI Buddy on dev.to, AI agent cost for an Israeli business 2026', th: 'AI Buddy บน dev.to, ค่า AI agent สำหรับธุรกิจอิสราเอล 2026' },
      href: 'https://dev.to/aibuddy_il/how-much-does-an-ai-agent-cost-for-an-israeli-business-real-prices-in-2026-36om',
    },
    { label: { he: 'Wise, דולר לשקל, 12.11.2026', en: 'Wise, USD to ILS, Nov 12 2026', th: 'Wise, USD เป็น ILS, 12 พ.ย. 2026' }, href: 'https://wise.com/us/currency-converter/usd-to-ils-rate' },
  ] as { label: L10n; href: string }[],
  cta: { he: 'לנסות בחינם על האתר שלכם', en: 'Try it free on your own site', th: 'ลองฟรีบนเว็บของคุณ' } as L10n,
};

/* ------------------------------------------------------------------ FAQ */

export const FAQ_HEAD: L10n = { he: 'שאלות', en: 'Questions', th: 'คำถาม' };

export const LIMITS: L10n[] = [
  {
    he: 'עד 3 מבקרים מדברים איתו בו זמנית היום (מגדילים בהמשך).',
    en: 'Up to 3 visitors can talk to it at the same time today (scaling planned).',
    th: 'ตอนนี้คุยกับผู้เข้าชมได้พร้อมกันสูงสุด 3 คน (กำลังวางแผนขยาย)',
  },
  {
    he: 'אי אפשר עדיין לקטוע אותו בקול באמצע משפט. בכתב זה עובד.',
    en: "Visitors can't interrupt it by voice mid-sentence yet. Typing works.",
    th: 'ยังพูดแทรกกลางประโยคไม่ได้ แต่พิมพ์แทรกได้',
  },
  { he: 'צריך חיבור לאינטרנט.', en: 'It needs an internet connection.', th: 'ต้องใช้อินเทอร์เน็ต' },
];

export const FAQ: { q: L10n; a: L10n }[] = [
  {
    q: { he: 'אפשר לנסות לפני שמשלמים?', en: 'Can I try it before I pay?', th: 'ลองก่อนจ่ายได้ไหม?' },
    a: {
      he: 'כן. שלחו כתובת אתר ונראה לכם את הנציג על האתר שלכם, עם המידע האמיתי שלכם, בהדגמה חיה של 3 דקות. בחינם.',
      en: 'Yes. Send your site address and we show you the agent on your own site, with your real info, in a free 3-minute live demo.',
      th: 'ได้ ส่งที่อยู่เว็บไซต์มา แล้วเราจะโชว์เจ้าหน้าที่บนเว็บของคุณ ด้วยข้อมูลจริงของคุณ ในเดโมสด 3 นาที ฟรี',
    },
  },
  {
    q: { he: 'אפשר לבטל?', en: 'Can I cancel?', th: 'ยกเลิกได้ไหม?' },
    a: {
      he: 'כן, בכל חודש. התשלום חודשי, ההקמה ₪0. בתשלום שנתי מקבלים חודשיים מתנה.',
      en: 'Yes, any month. Billing is monthly and setup is ₪0. Pay yearly and get 2 months free.',
      th: 'ได้ทุกเดือน เรียกเก็บรายเดือน ค่าติดตั้ง ₪0 จ่ายรายปีฟรี 2 เดือน',
    },
  },
  {
    q: { he: 'מה נחשב דקה, ומה אם עוברים את החבילה?', en: 'What counts as a minute, and what if I go over?', th: 'นับนาทีอย่างไร และถ้าใช้เกินล่ะ?' },
    a: {
      he: 'נספרות רק דקות של שיחה פעילה עם מבקר. שיחה טיפוסית לוקחת בערך 2.5 דקות. מעבר לחבילה כל דקה עולה ₪2.50, ואפשר לעבור לחבילה גדולה יותר בכל רגע.',
      en: 'Only active conversation minutes with a visitor count. A typical conversation is about 2.5 minutes. Beyond your plan each minute is ₪2.50, and you can move up a plan any time.',
      th: 'นับเฉพาะนาทีที่สนทนากับผู้เข้าชมจริง บทสนทนาทั่วไปราว 2.5 นาที ถ้าเกินแพ็กเกจ นาทีละ ₪2.50 และเปลี่ยนเป็นแพ็กเกจใหญ่ขึ้นได้ทุกเมื่อ',
    },
  },
  {
    q: { he: 'מה עם פרטיות?', en: 'What about privacy?', th: 'เรื่องความเป็นส่วนตัวล่ะ?' },
    a: {
      he: 'נתוני השיחות והלידים שייכים לכם ונשמרים אצלכם (בגיליון, ב־CRM או במייל). אנחנו עובדים לפי חוק הגנת הפרטיות הישראלי ונהלים ברוח ה־GDPR: אוספים רק מה שצריך ומוחקים לפי בקשה.',
      en: 'Conversation and lead data belong to you and stay on your side (your Sheet, CRM or email). We follow the Israeli Privacy Protection Law and GDPR-style practices: collect only what is needed and delete on request.',
      th: 'ข้อมูลบทสนทนาและลีดเป็นของคุณ และเก็บไว้ฝั่งคุณ (Sheet, CRM หรืออีเมล) เราทำตามกฎหมายคุ้มครองความเป็นส่วนตัวของอิสราเอลและแนวปฏิบัติแบบ GDPR เก็บเท่าที่จำเป็นและลบเมื่อร้องขอ',
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
      he: LIMITS.map(l => l.he).join(' '),
      en: LIMITS.map(l => l.en).join(' '),
      th: LIMITS.map(l => l.th).join(' '),
    },
  },
];

/* ------------------------------------------------------------------ final */

export const FINAL = {
  title: { he: 'רוצים לראות אותו על האתר שלכם?', en: 'Want to see it on your own site?', th: 'อยากเห็นบนเว็บของคุณเองไหม?' } as L10n,
  body: {
    he: 'שלחו כתובת אתר. תוך 3 דקות תראו את הנציג שלכם מקבל מבקרים.',
    en: 'Send your site address. In 3 minutes you see your agent greeting visitors.',
    th: 'ส่งที่อยู่เว็บไซต์มา ใน 3 นาทีคุณจะเห็นเจ้าหน้าที่ของคุณต้อนรับผู้เข้าชม',
  } as L10n,
  message: {
    he: 'היי רפאל, אשמח להדגמה חיה של 3 דקות על האתר שלי: ',
    en: 'Hi Refael, I would like the free 3-minute live demo on my site: ',
    th: 'สวัสดีครับ/ค่ะ ราฟาเอล อยากดูเดโมสด 3 นาทีบนเว็บของฉัน: ',
  } as L10n,
};

/** In-page header links. Pricing is not here: the global header always links to #pricing. */
export const SECTIONS = [
  { href: '#talk', he: 'לראות אותו', en: 'See it', th: 'ดูตัวอย่าง' },
  { href: '#compare', he: 'השוואה', en: 'Compare', th: 'เปรียบเทียบ' },
  { href: '#faq', he: 'שאלות', en: 'FAQ', th: 'คำถาม' },
];
