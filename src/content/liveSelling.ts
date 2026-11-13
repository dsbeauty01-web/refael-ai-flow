import type { L10n } from '@/config/site';

/**
 * /live-selling (v2, Nov 2026): video-first page for the AI live host.
 * Rendered by pages/LiveSelling.tsx. Every string has he, en, th. Hebrew first.
 * Rules: no em dashes or double dashes, no invented numbers or testimonials,
 * no character names in headlines.
 *
 * HONESTY RULE: every clip carries a true tag (see TAGS).
 *   real  = recorded as it aired on a real YouTube / Facebook live
 *   test  = a private live we recorded, with comments we typed in ourselves
 *   prerec = rendered ahead of time, never ran live, or origin not proven (weaker label wins)
 * Never move a clip to a stronger tag without proof in the maya-lt asset library.
 *
 * Prices are shown on this page (manager's assumption, Nov 12 2026): full-body live needs
 * its own GPU pod per live, so the price is per live hour. Internal cost basis is NOT on the page.
 */

export type Tag = 'real' | 'test' | 'prerec';

export const TAGS: Record<Tag, L10n> = {
  real: { he: 'שידור חי אמיתי', en: 'Real live', th: 'ไลฟ์จริง' },
  test: { he: 'בדיקה מוקלטת', en: 'Recorded test', th: 'การทดสอบที่บันทึกไว้' },
  prerec: { he: 'קליפ מוכן מראש', en: 'Pre-recorded clip', th: 'คลิปที่ทำไว้ล่วงหน้า' },
};

export const SECTIONS = [
  { href: '#clips', he: 'קליפים', en: 'Clips', th: 'คลิป' },
  { href: '#cohost', he: 'מנחה שותף', en: 'Co-host', th: 'พิธีกรร่วม' },
  { href: '#pricing', he: 'מחירים', en: 'Pricing', th: 'ราคา' },
  { href: '#faq', he: 'שאלות', en: 'FAQ', th: 'คำถาม' },
];

/* ------------------------------------------------------------------ hero */

/** Real YouTube LIVE + Facebook LIVE, 30.10.2026, cut to 31 s with captions per language. */
export const HERO_VIDEO: L10n = { he: '/site/live-proof-he.mp4', en: '/site/live-proof-en.mp4', th: '/site/live-proof-th.mp4' };
export const HERO_POSTER: L10n = { he: '/site/live-proof-he.jpg', en: '/site/live-proof-en.jpg', th: '/site/live-proof-th.jpg' };

export const HERO = {
  h1: {
    he: 'מנחה AI שמריץ לכם את הלייב ומגיב לצ׳אט בזמן אמת.',
    en: 'An AI host that runs your live and reacts to the chat in real time.',
    th: 'พิธีกร AI ที่ดำเนินไลฟ์ให้คุณ และตอบสนองแชทแบบเรียลไทม์',
  } as L10n,
  lead: {
    he: 'הצופים כותבים בצ׳אט. המנחה עונה בקול, בשם, ומציג את המוצר שלכם.',
    en: 'Viewers type in the chat. The host answers out loud, by name, and shows your product.',
    th: 'ผู้ชมพิมพ์ในแชท พิธีกรตอบด้วยเสียง เรียกชื่อ และนำเสนอสินค้าของคุณ',
  } as L10n,
  steps: [
    { he: 'צופה כותב ״red״', en: 'Viewer types “red”', th: 'ผู้ชมพิมพ์ “red”' },
    { he: 'המנחה קורא את הצ׳אט', en: 'Host reads the chat', th: 'พิธีกรอ่านแชท' },
    { he: 'ועושה את זה בלייב', en: 'Does it live', th: 'ทำให้ดูสดๆ' },
  ] as L10n[],
  videoCaption: {
    he: 'YouTube LIVE ו־Facebook LIVE, 30.10.2026. אותה דמות, הצ׳אט בחר סוף אחר.',
    en: 'YouTube LIVE and Facebook LIVE, 30.10.2026. Same character, the chat picked a different ending.',
    th: 'YouTube LIVE และ Facebook LIVE 30.10.2026 ตัวละครเดียวกัน แชทเลือกตอนจบต่างกัน',
  } as L10n,
  videoLabel: {
    he: 'הקלטה של לייב אמיתי: הצופה כותב red בצ׳אט והמנחה מוזג את הנוזל האדום',
    en: 'Recording of a real live: a viewer types red in the chat and the host pours the red liquid',
    th: 'บันทึกจากไลฟ์จริง: ผู้ชมพิมพ์ red ในแชท แล้วพิธีกรเทของเหลวสีแดง',
  } as L10n,
  cta: { he: 'לייב בדיקה חינם, 10 דקות', en: 'Free 10-minute test live', th: 'ไลฟ์ทดลองฟรี 10 นาที' } as L10n,
  ctaNote: {
    he: 'עם המוצר שלכם. בוואטסאפ, ישירות לרפאל.',
    en: 'With your product. On WhatsApp, straight to Refael.',
    th: 'กับสินค้าของคุณ ทาง LINE ถึงราฟาเอลโดยตรง',
  } as L10n,
  seePrices: { he: 'למחירים', en: 'See prices', th: 'ดูราคา' } as L10n,
};

/* ------------------------------------------------------------------ channels */

export const CHANNELS = {
  title: {
    he: 'שדרו ב־YouTube, Facebook ו־TikTok',
    en: 'Go live on YouTube, Facebook and TikTok',
    th: 'ไลฟ์บน YouTube, Facebook และ TikTok',
  } as L10n,
  note: {
    he: 'מתחבר עם מפתח השידור של הערוץ שלכם.',
    en: "Connects with your channel's stream key.",
    th: 'เชื่อมต่อด้วย stream key ของช่องคุณ',
  } as L10n,
  /** Text badges only. Official brand-kit logo files can be dropped in later (do not draw the marks). */
  names: ['YouTube', 'Facebook', 'TikTok'],
};

/* ------------------------------------------------------------------ gallery */

export type Clip = { id: string; src: string; poster: string; tag: Tag; label: L10n; line: L10n };

export const GALLERY = {
  title: { he: 'עוד מנחים, עוד מוצרים', en: 'More hosts, more products', th: 'พิธีกรอื่นๆ สินค้าอื่นๆ' } as L10n,
  sub: {
    he: 'כל קליפ מסומן: שידור חי אמיתי, בדיקה מוקלטת או קליפ מוכן מראש. לחצו על קליפ כדי לשמוע.',
    en: 'Every clip is labeled: real live, recorded test or pre-recorded clip. Tap a clip to hear it.',
    th: 'ทุกคลิปมีป้ายบอก: ไลฟ์จริง การทดสอบที่บันทึกไว้ หรือคลิปที่ทำไว้ล่วงหน้า แตะคลิปเพื่อฟังเสียง',
  } as L10n,
  clips: [
    {
      id: 'prof-red',
      src: '/site/prof-red-live.mp4',
      poster: '/site/prof-red-live.jpg',
      tag: 'test',
      label: { he: 'הצ׳אט בוחר את הסוף', en: 'Chat picks the ending', th: 'แชทเลือกตอนจบ' },
      line: {
        he: 'אדום ניצח, הוא מוזג, וכרטיס הערכה עולה עם המחיר.',
        en: 'Red wins, he pours, and the kit card comes up with the price.',
        th: 'สีแดงชนะ เขาเทให้ดู แล้วการ์ดชุดทดลองขึ้นพร้อมราคา',
      },
    },
    {
      id: 'skin',
      src: '/site/zara-skinread.mp4',
      poster: '/site/zara-skinread.jpg',
      tag: 'prerec',
      label: { he: 'קוראת את העור', en: 'Reads your skin', th: 'อ่านสภาพผิว' },
      line: {
        he: 'צופה שולחת תמונה, והמנחה מסמנת לה אזור T שמנוני ולחיים יבשות.',
        en: 'A viewer sends a photo and the host marks an oily T-zone and dry cheeks.',
        th: 'ผู้ชมส่งรูปมา พิธีกรชี้ให้เห็น T-zone มันและแก้มแห้ง',
      },
    },
    {
      id: 'earbuds',
      src: '/site/daniel-live-test.mp4',
      poster: '/site/daniel-live-test.jpg',
      tag: 'test',
      label: { he: 'אוזניות ב־₪199', en: 'Earbuds, ₪199', th: 'หูฟัง ₪199' },
      line: {
        he: 'צופה כותב ״תשים אחת באוזן״, והוא עונה בשם ומראה.',
        en: 'A viewer types “put one in your ear”, he answers by name and shows it.',
        th: 'ผู้ชมพิมพ์ “ใส่หูให้ดูหน่อย” เขาตอบด้วยชื่อและโชว์ให้ดู',
      },
    },
    {
      id: 'kids-kit',
      src: '/site/nova-live-test.mp4',
      poster: '/site/nova-live-test.jpg',
      tag: 'test',
      label: { he: 'ערכת מדע לילדים', en: 'Kids science kit', th: 'ชุดวิทยาศาสตร์เด็ก' },
      line: {
        he: 'דמות מצוירת מציגה ערכה ב־₪129 ומראה אותה מקרוב כשמבקשים.',
        en: 'A cartoon host presents a ₪129 kit and holds it up close when asked.',
        th: 'ตัวละครการ์ตูนนำเสนอชุด ₪129 และยกให้ดูใกล้ๆ เมื่อมีคนขอ',
      },
    },
    {
      id: 'thai',
      src: '/site/thai-host-live.mp4',
      poster: '/site/thai-host-live.jpg',
      tag: 'prerec',
      label: { he: 'לייב בתאית', en: 'Thai live', th: 'ไลฟ์ภาษาไทย' },
      line: {
        he: 'מנחה תאית מציגה בדים על מסך של אפליקציית לייב.',
        en: 'A Thai host shows fabrics on a live-app screen.',
        th: 'พิธีกรไทยนำเสนอผ้าบนหน้าจอแอปไลฟ์',
      },
    },
    {
      id: 'gallery',
      src: '/site/maya-gallery.mp4',
      poster: '/site/maya-gallery.jpg',
      tag: 'prerec',
      label: { he: 'סיור בגלריה', en: 'Gallery tour', th: 'ทัวร์แกลเลอรี' },
      line: {
        he: 'מנחה מציגה ציור ועונה לצופים שמברכים אותה.',
        en: 'A host presents a painting and answers viewers who greet her.',
        th: 'พิธีกรนำเสนอภาพวาด และตอบผู้ชมที่ทักทายเธอ',
      },
    },
  ] as Clip[],
};

/* ------------------------------------------------------------------ co-host */

/** Cut from maya-lt release/share/cohost-human-plus-ai-133s.mp4 (47.5 to 97 s): Refael + AI co-host, private test. */
export const COHOST = {
  title: { he: 'אתם מנחים. ה־AI עונה לצ׳אט.', en: 'You host. The AI co-host takes the chat.', th: 'คุณเป็นพิธีกร AI ดูแลแชทให้' } as L10n,
  lines: [
    {
      he: 'מנחת ה־AI לצדכם על אותו מסך, ואתם מדברים איתה כמו עם שותפה.',
      en: 'The AI co-host is beside you on the same screen, and you talk to her like a partner.',
      th: 'พิธีกรร่วม AI อยู่ข้างคุณบนจอเดียวกัน คุณคุยกับเธอเหมือนคุยกับคู่หู',
    },
    {
      he: 'היא עונה לתגובות בשם הכותב ומציגה כרטיס מוצר עם המחיר מהקטלוג שלכם.',
      en: "She answers comments by the viewer's name and shows a product card with the price from your catalogue.",
      th: 'เธอตอบคอมเมนต์โดยเรียกชื่อผู้ชม และแสดงการ์ดสินค้าพร้อมราคาจากแคตตาล็อกของคุณ',
    },
    {
      he: 'המנחה השותפה עדיין בבדיקות פרטיות.',
      en: 'The co-host is still in private testing.',
      th: 'พิธีกรร่วมยังอยู่ระหว่างการทดสอบแบบส่วนตัว',
    },
  ] as L10n[],
  video: '/live/cohost-test.mp4',
  poster: '/live/cohost-test.jpg',
  tag: 'test' as Tag,
  videoLabel: {
    he: 'רפאל ומנחת ה־AI, בדיקה פרטית: היא עונה על סרום ויטמין C ומציגה את המחיר',
    en: 'Refael and the AI co-host, private test: she answers about a vitamin C serum and shows the price',
    th: 'ราฟาเอลกับพิธีกรร่วม AI การทดสอบส่วนตัว: เธอตอบเรื่องเซรั่มวิตามินซีและแสดงราคา',
  } as L10n,
};

/* ------------------------------------------------------------------ pricing */

export type LivePlan = {
  id: 'test' | 'hour' | 'pack' | 'custom';
  name: L10n;
  price: number | null;
  unit: L10n;
  includes: L10n[];
  cta: L10n;
  recommended?: boolean;
};

const READY_CHARACTER: L10n = { he: 'דמות מוכנה מהספרייה', en: 'A ready-made character', th: 'ตัวละครสำเร็จรูป' };

export const PRICING = {
  title: { he: 'מחירים', en: 'Pricing', th: 'ราคา' } as L10n,
  statement: { he: 'משלמים לפי שעת לייב.', en: 'You pay per live hour.', th: 'จ่ายตามชั่วโมงไลฟ์' } as L10n,
  why: {
    he: 'כל לייב רץ על שרת GPU משלו לכל אורך השידור, ולכן המחיר הוא לפי שעה.',
    en: 'Every live runs on its own GPU server for the whole show, so the price is per hour.',
    th: 'ทุกไลฟ์รันบนเซิร์ฟเวอร์ GPU ของตัวเองตลอดการไลฟ์ ราคาจึงคิดเป็นรายชั่วโมง',
  } as L10n,
  note: {
    he: 'מחירים סופיים בשקלים.',
    en: 'Final prices in Israeli shekels. Outside Israel, ask for a USD or THB quote.',
    th: 'ราคาสุทธิเป็นเงินเชเกลอิสราเอล หากอยู่นอกอิสราเอล ขอใบเสนอราคาเป็น USD หรือ THB ได้',
  } as L10n,
  recommended: { he: 'הכי משתלם', en: 'Best value', th: 'คุ้มที่สุด' } as L10n,
  quote: { he: 'הצעת מחיר', en: 'Quote', th: 'ใบเสนอราคา' } as L10n,
  plans: [
    {
      id: 'test',
      name: { he: 'לייב בדיקה', en: 'Test live', th: 'ไลฟ์ทดลอง' },
      price: 0,
      unit: { he: '10 דקות', en: '10 minutes', th: '10 นาที' },
      includes: [
        { he: 'לייב של 10 דקות עם המוצר שלכם', en: 'A 10-minute live with your product', th: 'ไลฟ์ 10 นาทีกับสินค้าของคุณ' },
        READY_CHARACTER,
      ],
      cta: { he: 'לקבוע לייב בדיקה', en: 'Book the test live', th: 'นัดไลฟ์ทดลอง' },
    },
    {
      id: 'hour',
      name: { he: 'שעת לייב', en: 'Live hour', th: 'ไลฟ์รายชั่วโมง' },
      price: 199,
      unit: { he: 'לשעה', en: 'an hour', th: 'ต่อชั่วโมง' },
      includes: [
        READY_CHARACTER,
        { he: 'קורא את הצ׳אט ועונה בשם', en: 'Reads the chat, answers by name', th: 'อ่านแชท ตอบโดยเรียกชื่อ' },
        { he: 'כרטיס מוצר עם מחיר על המסך', en: 'Product card with price on screen', th: 'การ์ดสินค้าพร้อมราคาบนจอ' },
      ],
      cta: { he: 'להזמין שעת לייב', en: 'Book a live hour', th: 'จองไลฟ์ 1 ชั่วโมง' },
    },
    {
      id: 'pack',
      name: { he: '10 שעות לייב', en: '10 live hours', th: 'ไลฟ์ 10 ชั่วโมง' },
      price: 1490,
      unit: { he: 'כ־₪149 לשעה', en: '≈₪149 an hour', th: '≈₪149 ต่อชั่วโมง' },
      includes: [
        { he: 'כל מה שיש בשעת לייב', en: 'Everything in a live hour', th: 'ทุกอย่างในไลฟ์รายชั่วโมง' },
        { he: 'לסדרה של לייבים קבועים', en: 'For a regular series of lives', th: 'สำหรับไลฟ์ประจำเป็นซีรีส์' },
      ],
      cta: { he: 'להזמין 10 שעות', en: 'Book 10 hours', th: 'จอง 10 ชั่วโมง' },
      recommended: true,
    },
    {
      id: 'custom',
      name: { he: 'דמות משלכם', en: 'Your own character', th: 'ตัวละครของคุณเอง' },
      price: null,
      unit: { he: 'לפי המותג', en: 'built for your brand', th: 'ตามแบรนด์ของคุณ' },
      includes: [
        { he: 'דמות לפי המותג שלכם, או לפי קמע קיים', en: 'A character built for your brand, or from an existing mascot', th: 'ตัวละครตามแบรนด์ของคุณ หรือจากมาสคอตที่มีอยู่' },
        { he: 'אפשר גם את הקול שלכם, באישורכם', en: 'Your own voice too, with your permission', th: 'ใช้เสียงของคุณได้ด้วย โดยได้รับอนุญาตจากคุณ' },
      ],
      cta: { he: 'לבקש הצעת מחיר', en: 'Ask for a quote', th: 'ขอใบเสนอราคา' },
    },
  ] as LivePlan[],
  planMessage: (name: string): L10n => ({
    he: `היי רפאל, ראיתי את עמוד הלייב. מעניין אותי: ${name}. אני מוכר/ת: `,
    en: `Hi Refael, I saw the live page. I'm interested in: ${name}. I sell: `,
    th: `สวัสดีคุณราฟาเอล เห็นหน้าไลฟ์แล้ว สนใจ: ${name} ร้านขาย: `,
  }),
};

/* ------------------------------------------------------------------ faq */

export const FAQ_HEAD = { he: 'שאלות', en: 'Questions', th: 'คำถาม' } as L10n;
export const FAQ: { q: L10n; a: L10n }[] = [
  {
    q: { he: 'איך זה מתחבר ל־YouTube, Facebook ו־TikTok?', en: 'How does it connect to YouTube, Facebook and TikTok?', th: 'เชื่อมกับ YouTube, Facebook และ TikTok ยังไง?' },
    a: {
      he: 'הלייב יוצא מהשרת שלנו כשידור רגיל עם מפתח שידור (RTMP), כמו מתוכנת שידור. YouTube ו־Facebook נבדקו אצלנו בלייבים אמיתיים. TikTok מקבל את אותו סוג שידור כשבחשבון שלכם פתוחה האפשרות לשדר עם מפתח.',
      en: 'The live leaves our server as a normal stream with a stream key (RTMP), like streaming software. We tested YouTube and Facebook on real lives. TikTok takes the same kind of stream when your account has streaming with a key enabled.',
      th: 'ไลฟ์ส่งออกจากเซิร์ฟเวอร์ของเราเป็นสตรีมปกติด้วย stream key (RTMP) เหมือนโปรแกรมไลฟ์ทั่วไป เราทดสอบ YouTube และ Facebook ในไลฟ์จริงแล้ว TikTok รับสตรีมแบบเดียวกันได้ถ้าบัญชีของคุณเปิดใช้การไลฟ์ด้วย stream key',
    },
  },
  {
    q: { he: 'מה המנחה יודע לעשות בלייב?', en: 'What can the host do on a live?', th: 'พิธีกรทำอะไรได้บ้างในไลฟ์?' },
    a: {
      he: 'לקרוא תגובות ולענות בקול בשם הכותב, להציג כרטיס מוצר עם מחיר, לבחור בין תרחישים שהכנו מראש לפי מה שהצ׳אט כותב (כמו אדום או כחול), ולשלוח קישור לקנייה. תנועות הגוף מוכנות מראש. הקול והשפתיים נוצרים בזמן אמת.',
      en: 'Read comments and answer out loud by name, show a product card with the price, pick between scenes we prepared based on what the chat types (like red or blue), and send a buy link. Body movements are prepared ahead. The voice and lips are made in real time.',
      th: 'อ่านคอมเมนต์และตอบด้วยเสียงโดยเรียกชื่อ แสดงการ์ดสินค้าพร้อมราคา เลือกฉากที่เตรียมไว้ตามที่แชทพิมพ์ (เช่น แดงหรือน้ำเงิน) และส่งลิงก์ซื้อ ท่าทางของร่างกายเตรียมไว้ล่วงหน้า ส่วนเสียงและริมฝีปากสร้างแบบเรียลไทม์',
    },
  },
  {
    q: { he: 'באילו שפות?', en: 'Which languages?', th: 'ภาษาอะไรบ้าง?' },
    a: {
      he: 'עברית, אנגלית ותאית. הלייבים האמיתיים שלנו היו באנגלית, ובדיקות מוקלטות היו בעברית ובאנגלית. תאית לפי בקשה.',
      en: 'Hebrew, English and Thai. Our real lives were in English, and recorded tests were in Hebrew and English. Thai on request.',
      th: 'ฮีบรู อังกฤษ และไทย ไลฟ์จริงของเราเป็นภาษาอังกฤษ การทดสอบที่บันทึกไว้เป็นภาษาฮีบรูและอังกฤษ ภาษาไทยทำได้ตามคำขอ',
    },
  },
  {
    q: { he: 'מה כאן אמיתי, ומה מוקלט מראש?', en: "What's real here, and what's pre-recorded?", th: 'อะไรจริง อะไรทำไว้ล่วงหน้า?' },
    a: {
      he: 'כל קליפ מסומן. ״שידור חי אמיתי״ הוא הקלטה של לייב ששודר ב־YouTube וב־Facebook ב־30.10.2026, ואת התגובה בצ׳אט כתבנו אנחנו כדי לבדוק. ״בדיקה מוקלטת״ היא לייב פרטי שהקלטנו, עם תגובות שהזנו בעצמנו. ״קליפ מוכן מראש״ נוצר מראש ולא רץ בלייב.',
      en: 'Every clip is labeled. "Real live" is a recording of a live that aired on YouTube and Facebook on 30.10.2026, and we typed the chat comment ourselves to test it. "Recorded test" is a private live we recorded, with comments we typed in. "Pre-recorded clip" was made ahead and did not run live.',
      th: 'ทุกคลิปมีป้ายบอก “ไลฟ์จริง” คือบันทึกจากไลฟ์ที่ออกอากาศบน YouTube และ Facebook เมื่อ 30.10.2026 และคอมเมนต์ในแชทเราพิมพ์เองเพื่อทดสอบ “การทดสอบที่บันทึกไว้” คือไลฟ์ส่วนตัวที่เราบันทึก โดยเราพิมพ์คอมเมนต์เอง “คลิปที่ทำไว้ล่วงหน้า” สร้างไว้ก่อนและไม่ได้รันสด',
    },
  },
  {
    q: { he: 'מה המגבלות?', en: 'What are the limits?', th: 'มีข้อจำกัดอะไรบ้าง?' },
    a: {
      he: 'המנחה עונה רק ממה שהכנתם (מוצרים, מחירים, משלוחים), ואת השאר מעביר אליכם. בין תגובה לתשובה עוברות כמה שניות. תנועה מיוחדת, כמו לפתוח קופסה, צריך להכין מראש לכל מוצר. וכל לייב נקבע מראש, כי השרת עולה במיוחד בשבילו.',
      en: 'The host answers only from what you prepared (products, prices, shipping) and hands the rest to you. There are a few seconds between a comment and the answer. A special movement, like opening a box, has to be prepared for each product. And every live is booked ahead, because the server starts up just for it.',
      th: 'พิธีกรตอบเฉพาะจากสิ่งที่คุณเตรียมไว้ (สินค้า ราคา การจัดส่ง) ที่เหลือส่งต่อให้คุณ ระหว่างคอมเมนต์กับคำตอบมีช่วงไม่กี่วินาที ท่าทางพิเศษ เช่น เปิดกล่อง ต้องเตรียมไว้สำหรับแต่ละสินค้า และทุกไลฟ์ต้องจองล่วงหน้า เพราะเซิร์ฟเวอร์เปิดขึ้นสำหรับไลฟ์นั้นโดยเฉพาะ',
    },
  },
];

/* ------------------------------------------------------------------ final */

export const FINAL = {
  title: { he: 'שלחו מוצר. קבלו 10 דקות לייב בחינם.', en: 'Send a product. Get a 10-minute live, free.', th: 'ส่งสินค้ามา รับไลฟ์ 10 นาทีฟรี' } as L10n,
  body: {
    he: 'צלמו מוצר אחד, שלחו שם ומחיר, ונקבע לייב בדיקה של 10 דקות עם המנחה.',
    en: "Snap one product, send its name and price, and we'll book a 10-minute test live with the host.",
    th: 'ถ่ายรูปสินค้าหนึ่งชิ้น ส่งชื่อและราคามา แล้วเราจะนัดไลฟ์ทดลอง 10 นาทีกับพิธีกร',
  } as L10n,
  message: {
    he: 'היי רפאל, אשמח ללייב בדיקה של 10 דקות עם המוצר שלי. אני מוכר/ת: ',
    en: "Hi Refael, I'd like a free 10-minute test live with my product. I sell: ",
    th: 'สวัสดีคุณราฟาเอล อยากได้ไลฟ์ทดลอง 10 นาทีกับสินค้าของฉัน ร้านขาย: ',
  } as L10n,
};
