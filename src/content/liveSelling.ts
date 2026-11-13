import type { L10n } from '@/config/site';

/**
 * /live-selling (v3, Nov 2026): the AI live host page, written for the seller who buys it.
 * Rendered by pages/LiveSelling.tsx. Every string has he, en, th. Hebrew first.
 * Rules: no em dashes or double dashes, no invented numbers or testimonials,
 * no character names in headlines.
 *
 * Section order follows the buyer's questions:
 *   does it really work live (hero) -> on my platform (PLATFORMS) -> can it sell my product (GALLERY)
 *   -> can I host with it (COHOST) -> which business (USE_CASES) -> what does it cost (PRICING)
 *   -> what can't it do (FAQ) -> try it (FINAL).
 *
 * HONESTY RULE: every clip carries a true tag (see TAGS), on the clip itself and on every phone mockup.
 *   real   = recorded as it aired on a real YouTube / Facebook live (only the Professor lives of 30.10.2026)
 *   test   = a private live we recorded, with comments we typed in ourselves
 *   prerec = rendered ahead of time, never ran live, or origin not proven (weaker label wins)
 * Never move a clip to a stronger tag without proof in the maya-lt asset library.
 * The chat bubbles drawn in the phone frames are samples and are labeled "Example" on the page.
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
  { href: '#platforms', he: 'פלטפורמות', en: 'Platforms', th: 'แพลตฟอร์ม' },
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
    he: 'מנחה AI שמוכר בלייב שלכם ועונה לצ׳אט בשם.',
    en: 'An AI host that sells on your live and answers the chat by name.',
    th: 'พิธีกร AI ที่ขายของในไลฟ์ของคุณ และตอบแชทโดยเรียกชื่อ',
  } as L10n,
  lead: {
    he: 'לא צריך לעמוד מול המצלמה כל ערב. המנחה קורא את התגובות, עונה בקול ומציג את המוצר שלכם עם המחיר.',
    en: "You don't have to be on camera every night. The host reads the comments, answers out loud and shows your product with the price.",
    th: 'ไม่ต้องอยู่หน้ากล้องทุกคืน พิธีกรอ่านคอมเมนต์ ตอบด้วยเสียง และโชว์สินค้าของคุณพร้อมราคา',
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
    th: 'กับสินค้าของคุณ ทาง LINE ถึงราฟาเอลโดยตรงครับ',
  } as L10n,
  seePrices: { he: 'למחירים', en: 'See prices', th: 'ดูราคา' } as L10n,
  /** Plain text proof chips under the CTA (no logos). */
  proof: ['YouTube LIVE', 'Facebook LIVE', '30.10.2026'],
  proofLabel: { he: 'שודר באמת:', en: 'Aired for real:', th: 'ออกอากาศจริง:' } as L10n,
};

/* ------------------------------------------------------------------ platforms */

export type Platform = {
  id: 'youtube' | 'facebook' | 'tiktok';
  name: string;
  src: string;
  poster: string;
  tag: Tag;
  source: L10n;
  lines: [L10n, L10n];
  /** Sample chat lines drawn under the clip, labeled "Example" on the page. */
  sample: L10n[];
  videoLabel: L10n;
};

export const PLATFORMS = {
  eyebrow: { he: '״זה עובד אצלי?״', en: '“Will it work on my channel?”', th: '“ใช้กับช่องของฉันได้ไหม?”' } as L10n,
  title: {
    he: 'YouTube, Facebook ו־TikTok. אותו מנחה, הערוץ שלכם.',
    en: 'YouTube, Facebook and TikTok. Same host, your channel.',
    th: 'YouTube, Facebook และ TikTok พิธีกรคนเดียวกัน บนช่องของคุณ',
  } as L10n,
  sub: {
    he: 'הלייב יוצא לערוץ שלכם עם מפתח שידור, כמו מכל תוכנת שידור. שני הראשונים נבדקו בלייבים אמיתיים.',
    en: 'The live goes out to your channel with a stream key, like any streaming software. The first two were tested on real lives.',
    th: 'ไลฟ์ส่งออกไปที่ช่องของคุณด้วย stream key เหมือนโปรแกรมไลฟ์ทั่วไป สองช่องแรกทดสอบในไลฟ์จริงแล้วครับ',
  } as L10n,
  example: { he: 'דוגמה', en: 'Example', th: 'ตัวอย่าง' } as L10n,
  chatPlaceholder: { he: 'כתבו תגובה...', en: 'Add a comment...', th: 'เขียนคอมเมนต์...' } as L10n,
  items: [
    {
      id: 'youtube',
      name: 'YouTube',
      src: '/site/platform-youtube-real.mp4',
      poster: '/site/platform-youtube-real.jpg',
      tag: 'real',
      source: { he: 'YouTube LIVE, 30.10.2026', en: 'YouTube LIVE, 30.10.2026', th: 'YouTube LIVE 30.10.2026' },
      lines: [
        {
          he: 'קורא את הצ׳אט של YouTube ועונה בקול, בשם הצופה.',
          en: "Reads the YouTube chat and answers out loud, by the viewer's name.",
          th: 'อ่านแชท YouTube และตอบด้วยเสียง โดยเรียกชื่อผู้ชม',
        },
        {
          he: 'מציג כרטיס מוצר עם המחיר, ויכול לשלוח קישור לקנייה.',
          en: 'Shows a product card with the price, and can drop a buy link.',
          th: 'แสดงการ์ดสินค้าพร้อมราคา และส่งลิงก์ซื้อได้',
        },
      ],
      sample: [
        { he: 'כמה זה עולה?', en: 'How much is it?', th: 'ราคาเท่าไหร่ครับ?' },
        { he: 'red', en: 'red', th: 'red' },
        { he: 'יש משלוח?', en: 'Do you ship?', th: 'มีส่งไหม?' },
      ],
      videoLabel: {
        he: 'הקלטה מלייב אמיתי ב־YouTube: התגובה red מגיעה, המנחה מוזג ומציג את הערכה עם המחיר',
        en: 'Recording of a real YouTube live: the comment red arrives, the host pours and shows the kit with the price',
        th: 'บันทึกจากไลฟ์จริงบน YouTube: คอมเมนต์ red เข้ามา พิธีกรเทและโชว์ชุดพร้อมราคา',
      },
    },
    {
      id: 'facebook',
      name: 'Facebook',
      src: '/site/platform-facebook-real.mp4',
      poster: '/site/platform-facebook-real.jpg',
      tag: 'real',
      source: { he: 'Facebook LIVE, 30.10.2026', en: 'Facebook LIVE, 30.10.2026', th: 'Facebook LIVE 30.10.2026' },
      lines: [
        {
          he: 'שודר מעמוד פייסבוק אמיתי: תגובה אחת בצ׳אט בחרה את הסוף.',
          en: 'Aired from a real Facebook Page: one chat comment picked the ending.',
          th: 'ออกอากาศจากเพจ Facebook จริง คอมเมนต์เดียวในแชทเลือกตอนจบ',
        },
        {
          he: 'עונה בקול ומעלה את כרטיס המוצר עם המחיר.',
          en: 'Answers by voice and brings up the product card with the price.',
          th: 'ตอบด้วยเสียง และขึ้นการ์ดสินค้าพร้อมราคา',
        },
      ],
      sample: [
        { he: 'blue', en: 'blue', th: 'blue' },
        { he: 'זה מתאים לגיל 8?', en: 'Is it OK for age 8?', th: 'เหมาะกับเด็ก 8 ขวบไหม?' },
        { he: 'רוצה אחד', en: 'I want one', th: 'เอาหนึ่งชุดครับ' },
      ],
      videoLabel: {
        he: 'הקלטה מלייב אמיתי בפייסבוק: התגובה blue מגיעה, המנחה מוזג ומציג את הערכה עם המחיר',
        en: 'Recording of a real Facebook live: the comment blue arrives, the host pours and shows the kit with the price',
        th: 'บันทึกจากไลฟ์จริงบน Facebook: คอมเมนต์ blue เข้ามา พิธีกรเทและโชว์ชุดพร้อมราคา',
      },
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      src: '/site/maya-live-test.mp4',
      poster: '/site/maya-live-test.jpg',
      tag: 'test',
      source: {
        he: 'בדיקה פרטית, לא שודר ב־TikTok',
        en: 'Private test, not aired on TikTok',
        th: 'ทดสอบส่วนตัว ยังไม่ได้ออกอากาศบน TikTok',
      },
      lines: [
        {
          he: 'אותו שידור, אותו מפתח שידור: מנחה שמציג את התיק ועונה למי שמבקש לראות מקרוב.',
          en: 'Same stream, same stream key: a host who shows the bag and answers whoever asks to see it closer.',
          th: 'สตรีมเดียวกัน stream key เดียวกัน พิธีกรโชว์กระเป๋าและตอบคนที่ขอดูใกล้ๆ',
        },
        {
          he: 'צריך חשבון TikTok עם גישה ל־LIVE ומפתח שידור. עוד לא נבדק בלייב אמיתי ב־TikTok.',
          en: 'Needs a TikTok account with LIVE access and a stream key. Not yet tested on a real TikTok live.',
          th: 'ต้องมีบัญชี TikTok ที่ไลฟ์ได้และมี stream key ยังไม่ได้ทดสอบในไลฟ์จริงบน TikTok ครับ',
        },
      ],
      sample: [
        { he: 'יש בשחור?', en: 'Do you have it in black?', th: 'มีสีดำไหม?' },
        { he: 'תפתחי אותו', en: 'Open it please', th: 'เปิดให้ดูหน่อย' },
        { he: 'מחיר?', en: 'Price?', th: 'ราคา?' },
      ],
      videoLabel: {
        he: 'בדיקה מוקלטת: צופה מבקש לראות את התיק מקרוב והמנחה מרימה אותו, תיק עור ב־₪490',
        en: 'Recorded test: a viewer asks to see the bag closer and the host lifts it, a leather bag at ₪490',
        th: 'การทดสอบที่บันทึกไว้: ผู้ชมขอดูกระเป๋าใกล้ๆ พิธีกรยกให้ดู กระเป๋าหนัง ₪490',
      },
    },
  ] as Platform[],
};

/* ------------------------------------------------------------------ gallery */

export type Clip = { id: string; src: string; poster: string; tag: Tag; label: L10n; line: L10n };

export const GALLERY = {
  eyebrow: { he: '״זה ימכור גם את המוצר שלי?״', en: '“Can it sell my product?”', th: '“ขายสินค้าของฉันได้ไหม?”' } as L10n,
  title: { he: 'עוד מנחים, עוד מוצרים', en: 'More hosts, more products', th: 'พิธีกรอื่นๆ สินค้าอื่นๆ' } as L10n,
  sub: {
    he: 'כל קליפ מסומן: בדיקה מוקלטת או קליפ מוכן מראש. לחצו על קליפ כדי לשמוע.',
    en: 'Every clip is labeled: recorded test or pre-recorded clip. Tap a clip to hear it.',
    th: 'ทุกคลิปมีป้ายบอก: การทดสอบที่บันทึกไว้ หรือคลิปที่ทำไว้ล่วงหน้า แตะคลิปเพื่อฟังเสียง',
  } as L10n,
  clips: [
    {
      id: 'jacket',
      src: '/site/zara-jacket-test.mp4',
      poster: '/site/zara-jacket-test.jpg',
      tag: 'test',
      label: { he: 'הצ׳אט בוחר ז׳קט', en: 'The chat picks a jacket', th: 'แชทเลือกแจ็กเก็ต' },
      line: {
        he: 'צופה כותבת ״camel״, והמנחה לובשת את הבלייזר. ₪190.',
        en: 'A viewer types “camel” and the host puts the blazer on. ₪190.',
        th: 'ผู้ชมพิมพ์ “camel” แล้วพิธีกรใส่เบลเซอร์ให้ดู ₪190',
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
      id: 'puppy',
      src: '/site/puppy-clip.mp4',
      poster: '/site/puppy-clip.jpg',
      tag: 'prerec',
      label: { he: 'חנות חיות', en: 'Pet shop', th: 'ร้านสัตว์เลี้ยง' },
      line: {
        he: 'גור כלבים מוכר מזון ב־₪89 ועונה לשאלה ״מתאים לכלב של 5 קילו?״.',
        en: 'A puppy sells ₪89 dog food and answers “is it OK for a 5 kg dog?”.',
        th: 'ลูกหมาขายอาหารสุนัข ₪89 และตอบคำถาม “เหมาะกับหมา 5 กิโลไหม?”',
      },
    },
    {
      id: 'robot',
      src: '/site/robot-clip.mp4',
      poster: '/site/robot-clip.jpg',
      tag: 'prerec',
      label: { he: 'אלקטרוניקה', en: 'Electronics', th: 'อิเล็กทรอนิกส์' },
      line: {
        he: 'רובוט מציג אוזניות ב־₪349 ועונה בשם לשאלה ״עובד עם אייפון?״.',
        en: 'A robot presents ₪349 headphones and answers “works with iPhone?” by name.',
        th: 'หุ่นยนต์นำเสนอหูฟัง ₪349 และตอบคำถาม “ใช้กับ iPhone ได้ไหม?” โดยเรียกชื่อ',
      },
    },
    {
      id: 'thai',
      src: '/site/thai-host-clean.mp4',
      poster: '/site/thai-host-clean.jpg',
      tag: 'prerec',
      label: { he: 'לייב בתאית', en: 'Thai live', th: 'ไลฟ์ภาษาไทย' },
      line: {
        he: 'מנחה תאית מציגה בדים ומדברת תאית.',
        en: 'A Thai host shows fabrics and speaks Thai.',
        th: 'พิธีกรไทยนำเสนอผ้าและพูดภาษาไทย',
      },
    },
    {
      id: 'gallery',
      src: '/site/maya-gallery-clean.mp4',
      poster: '/site/maya-gallery-clean.jpg',
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
  eyebrow: { he: '״ואם אני רוצה להנחות בעצמי?״', en: '“What if I want to host myself?”', th: '“ถ้าฉันอยากเป็นพิธีกรเองล่ะ?”' } as L10n,
  title: { he: 'אתם מנחים. ה־AI לוקח את הצ׳אט.', en: 'You host. The AI takes the chat.', th: 'คุณเป็นพิธีกร AI ดูแลแชทให้' } as L10n,
  sub: {
    he: 'מדברים, מראים, מוכרים. התגובות לא נשארות בלי תשובה.',
    en: "You talk, show and sell. Comments don't go unanswered.",
    th: 'คุณพูด โชว์ และขาย คอมเมนต์ไม่ถูกปล่อยค้างไว้',
  } as L10n,
  does: [
    {
      title: { he: 'עונה לצופים בשם', en: 'Answers viewers by name', th: 'ตอบผู้ชมโดยเรียกชื่อ' },
      body: {
        he: 'שאלה בצ׳אט? היא עונה בקול לכותב, ברגע שאתם עוצרים לנשום.',
        en: 'A question in the chat? She answers the viewer out loud as soon as you pause.',
        th: 'มีคำถามในแชท? เธอตอบผู้ชมด้วยเสียงทันทีที่คุณหยุดพูด',
      },
    },
    {
      title: { he: 'מציגה את המוצר עם המחיר', en: 'Shows the product with the price', th: 'โชว์สินค้าพร้อมราคา' },
      body: {
        he: 'כרטיס מוצר עם המחיר מהקטלוג שלכם עולה על המסך כשמדברים עליו.',
        en: 'A product card with the price from your catalogue comes up when it is mentioned.',
        th: 'การ์ดสินค้าพร้อมราคาจากแคตตาล็อกของคุณขึ้นบนจอเมื่อมีการพูดถึง',
      },
    },
    {
      title: { he: 'נותנת לכם את הבמה', en: 'Gives you the floor', th: 'ให้คุณได้พูดก่อนเสมอ' },
      body: {
        he: 'מתחילים לדבר? היא שותקת. יצאתם רגע מהפריים? היא ממשיכה את הלייב.',
        en: 'You start talking, she goes quiet. You step out of frame, she keeps the live going.',
        th: 'คุณเริ่มพูด เธอเงียบ คุณออกจากเฟรมสักครู่ เธอดำเนินไลฟ์ต่อให้',
      },
    },
  ] as { title: L10n; body: L10n }[],
  note: {
    he: 'המנחה השותפה עדיין בבדיקות פרטיות.',
    en: 'The co-host is still in private testing.',
    th: 'พิธีกรร่วมยังอยู่ระหว่างการทดสอบแบบส่วนตัวครับ',
  } as L10n,
  video: '/live/cohost-test.mp4',
  poster: '/live/cohost-test.jpg',
  tag: 'test' as Tag,
  videoLabel: {
    he: 'רפאל ומנחת ה־AI, בדיקה פרטית: היא עונה על סרום ויטמין C ומציגה את המחיר',
    en: 'Refael and the AI co-host, private test: she answers about a vitamin C serum and shows the price',
    th: 'ราฟาเอลกับพิธีกรร่วม AI การทดสอบส่วนตัว: เธอตอบเรื่องเซรั่มวิตามินซีและแสดงราคา',
  } as L10n,
};

/* ------------------------------------------------------------------ use cases */

export const USE_CASES = {
  title: { he: 'למי זה מתאים', en: 'Who it fits', th: 'เหมาะกับใคร' } as L10n,
  items: [
    {
      name: { he: 'אופנה ובוטיקים', en: 'Boutique fashion', th: 'ร้านแฟชั่น' },
      line: { he: 'מציגה את הפריט, הצ׳אט בוחר, והיא לובשת.', en: 'Shows the item, the chat picks, she wears it.', th: 'โชว์สินค้า แชทเลือก แล้วเธอใส่ให้ดู' },
    },
    {
      name: { he: 'יופי וטיפוח', en: 'Beauty and skincare', th: 'ความงามและสกินแคร์' },
      line: { he: 'עונה ״מתאים לעור שמן?״ מתוך המוצרים שלכם.', en: 'Answers “is it for oily skin?” from your products.', th: 'ตอบ “เหมาะกับผิวมันไหม?” จากสินค้าของคุณ' },
    },
    {
      name: { he: 'מוצרים לילדים', en: 'Kids products', th: 'สินค้าเด็ก' },
      line: { he: 'דמות מצוירת שילדים והורים שואלים אותה.', en: 'A cartoon host kids and parents ask questions.', th: 'ตัวละครการ์ตูนที่เด็กและพ่อแม่ถามได้' },
    },
    {
      name: { he: 'אלקטרוניקה', en: 'Electronics', th: 'อิเล็กทรอนิกส์' },
      line: { he: 'מראה את המוצר מקרוב כשמבקשים, עם המחיר.', en: 'Shows the product up close when asked, with the price.', th: 'โชว์สินค้าใกล้ๆ เมื่อมีคนขอ พร้อมราคา' },
    },
    {
      name: { he: 'השוק התאילנדי', en: 'Thai market', th: 'ตลาดไทย' },
      line: { he: 'מנחה תאית שמדברת תאית, לפייסבוק ול־TikTok.', en: 'A Thai host speaking Thai, for Facebook and TikTok.', th: 'พิธีกรไทยพูดภาษาไทย สำหรับ Facebook และ TikTok' },
    },
  ] as { name: L10n; line: L10n }[],
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
  eyebrow: { he: '״כמה זה עולה?״', en: '“What does it cost?”', th: '“ราคาเท่าไหร่?”' } as L10n,
  title: { he: 'מחירים', en: 'Pricing', th: 'ราคา' } as L10n,
  statement: { he: 'משלמים לפי שעת לייב.', en: 'You pay per live hour.', th: 'จ่ายตามชั่วโมงไลฟ์' } as L10n,
  why: {
    he: 'כל לייב רץ על שרת GPU משלו לכל אורך השידור, ולכן המחיר הוא לפי שעה. מתחילים בלייב בדיקה חינם.',
    en: 'Every live runs on its own GPU server for the whole show, so the price is per hour. Start with a free test live.',
    th: 'ทุกไลฟ์รันบนเซิร์ฟเวอร์ GPU ของตัวเองตลอดการไลฟ์ ราคาจึงคิดเป็นรายชั่วโมง เริ่มจากไลฟ์ทดลองฟรีได้ครับ',
  } as L10n,
  note: {
    he: 'מחירים סופיים בשקלים.',
    en: 'Final prices in Israeli shekels. Outside Israel, ask for a USD or THB quote.',
    th: 'ราคาสุทธิเป็นเงินเชเกลอิสราเอล หากอยู่นอกอิสราเอล ขอใบเสนอราคาเป็น USD หรือ THB ได้ครับ',
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

export const FAQ_EYEBROW = { he: '״ומה הוא לא יודע?״', en: '“And what can’t it do?”', th: '“แล้วอะไรที่ทำไม่ได้?”' } as L10n;
export const FAQ_HEAD = { he: 'שאלות', en: 'Questions', th: 'คำถาม' } as L10n;
export const FAQ: { q: L10n; a: L10n }[] = [
  {
    q: { he: 'איך מחברים את זה ל־YouTube, Facebook או TikTok שלי?', en: 'How do I connect it to my YouTube, Facebook or TikTok?', th: 'เชื่อมกับ YouTube, Facebook หรือ TikTok ของฉันยังไง?' },
    a: {
      he: 'שולחים לנו מפתח שידור (RTMP) מהערוץ שלכם, והלייב יוצא מהשרת שלנו כמו מכל תוכנת שידור. YouTube ו־Facebook נבדקו אצלנו בלייבים אמיתיים. TikTok מקבל את אותו סוג שידור כשבחשבון שלכם יש גישה ל־LIVE ומפתח שידור, ועוד לא בדקנו אותו בלייב אמיתי.',
      en: "You send us a stream key (RTMP) from your channel, and the live goes out from our server like any streaming software. We tested YouTube and Facebook on real lives. TikTok takes the same kind of stream when your account has LIVE access and a stream key, and we haven't tested it on a real live yet.",
      th: 'ส่ง stream key (RTMP) ของช่องคุณมา แล้วไลฟ์จะส่งออกจากเซิร์ฟเวอร์ของเราเหมือนโปรแกรมไลฟ์ทั่วไป เราทดสอบ YouTube และ Facebook ในไลฟ์จริงแล้ว TikTok รับสตรีมแบบเดียวกันได้ถ้าบัญชีของคุณไลฟ์ได้และมี stream key แต่เรายังไม่ได้ทดสอบในไลฟ์จริงครับ',
    },
  },
  {
    q: { he: 'הוא יכול למכור את המוצרים שלי?', en: 'Can it sell my products?', th: 'ขายสินค้าของฉันได้ไหม?' },
    a: {
      he: 'כן. שולחים שם, מחיר, תמונה ופרטי משלוח לכל מוצר. המנחה מציג כרטיס מוצר עם המחיר, עונה לשאלות מתוך המידע הזה, ויכול לשלוח קישור לקנייה. תנועה מיוחדת, כמו להרים את המוצר או לפתוח קופסה, מכינים מראש לכל מוצר.',
      en: 'Yes. You send a name, price, photo and shipping details for each product. The host shows a product card with the price, answers questions from that information, and can send a buy link. A special movement, like lifting the product or opening a box, is prepared ahead for each product.',
      th: 'ได้ครับ ส่งชื่อ ราคา รูป และรายละเอียดการจัดส่งของแต่ละสินค้ามา พิธีกรจะแสดงการ์ดสินค้าพร้อมราคา ตอบคำถามจากข้อมูลนั้น และส่งลิงก์ซื้อได้ ท่าทางพิเศษ เช่น ยกสินค้าหรือเปิดกล่อง ต้องเตรียมไว้ล่วงหน้าสำหรับแต่ละสินค้า',
    },
  },
  {
    q: { he: 'באילו שפות?', en: 'Which languages?', th: 'ภาษาอะไรบ้าง?' },
    a: {
      he: 'עברית, אנגלית ותאית. הלייבים האמיתיים שלנו היו באנגלית, ובדיקות מוקלטות היו בעברית ובאנגלית. תאית לפי בקשה.',
      en: 'Hebrew, English and Thai. Our real lives were in English, and recorded tests were in Hebrew and English. Thai on request.',
      th: 'ฮีบรู อังกฤษ และไทย ไลฟ์จริงของเราเป็นภาษาอังกฤษ การทดสอบที่บันทึกไว้เป็นภาษาฮีบรูและอังกฤษ ภาษาไทยทำได้ตามคำขอครับ',
    },
  },
  {
    q: { he: 'מה קורה כשהוא לא יודע את התשובה?', en: "What happens when it doesn't know the answer?", th: 'ถ้าพิธีกรไม่รู้คำตอบจะเป็นยังไง?' },
    a: {
      he: 'הוא לא ממציא. הוא עונה רק ממה שהכנתם (מוצרים, מחירים, משלוחים), ועל כל השאר אומר שיבדוק ומעביר את השאלה אליכם.',
      en: "It doesn't make things up. It answers only from what you prepared (products, prices, shipping), and for anything else it says it will check and passes the question to you.",
      th: 'พิธีกรไม่แต่งคำตอบเอง ตอบเฉพาะจากสิ่งที่คุณเตรียมไว้ (สินค้า ราคา การจัดส่ง) เรื่องอื่นจะบอกว่าจะเช็กให้ แล้วส่งคำถามต่อให้คุณ',
    },
  },
  {
    q: { he: 'מה בעמוד הזה אמיתי, ומה מוקלט?', en: "What's real on this page, and what's recorded?", th: 'อะไรในหน้านี้จริง อะไรบันทึกไว้?' },
    a: {
      he: 'כל קליפ מסומן. ״שידור חי אמיתי״ (הקליפ למעלה ו־YouTube ו־Facebook) הוא הקלטה של לייב ששודר ב־30.10.2026, ואת התגובה בצ׳אט כתבנו אנחנו כדי לבדוק. ״בדיקה מוקלטת״ היא לייב פרטי שהקלטנו, עם תגובות שהזנו בעצמנו. ״קליפ מוכן מראש״ נוצר מראש ולא רץ בלייב. בועות הצ׳אט שמתחת לקליפים בטלפונים הן דוגמה.',
      en: 'Every clip is labeled. "Real live" (the top clip, YouTube and Facebook) is a recording of a live that aired on 30.10.2026, and we typed the chat comment ourselves to test it. "Recorded test" is a private live we recorded, with comments we typed in. "Pre-recorded clip" was made ahead and did not run live. The chat bubbles under the clips in the phones are examples.',
      th: 'ทุกคลิปมีป้ายบอก “ไลฟ์จริง” (คลิปด้านบน YouTube และ Facebook) คือบันทึกจากไลฟ์ที่ออกอากาศเมื่อ 30.10.2026 และคอมเมนต์ในแชทเราพิมพ์เองเพื่อทดสอบ “การทดสอบที่บันทึกไว้” คือไลฟ์ส่วนตัวที่เราบันทึก โดยเราพิมพ์คอมเมนต์เอง “คลิปที่ทำไว้ล่วงหน้า” สร้างไว้ก่อนและไม่ได้รันสด ส่วนข้อความแชทใต้คลิปในโทรศัพท์เป็นตัวอย่าง',
    },
  },
  {
    q: { he: 'מה המגבלות?', en: 'What are the limits?', th: 'มีข้อจำกัดอะไรบ้าง?' },
    a: {
      he: 'בין תגובה לתשובה עוברות כמה שניות. תנועות הגוף מוכנות מראש, והקול והשפתיים נוצרים בזמן אמת. כל לייב נקבע מראש, כי השרת עולה במיוחד בשבילו. והמנחה השותפה (אתם והמנחה יחד) עדיין בבדיקות פרטיות.',
      en: 'There are a few seconds between a comment and the answer. Body movements are prepared ahead; the voice and lips are made in real time. Every live is booked ahead, because the server starts up just for it. And the co-host (you and the host together) is still in private testing.',
      th: 'ระหว่างคอมเมนต์กับคำตอบมีช่วงไม่กี่วินาที ท่าทางของร่างกายเตรียมไว้ล่วงหน้า ส่วนเสียงและริมฝีปากสร้างแบบเรียลไทม์ ทุกไลฟ์ต้องจองล่วงหน้า เพราะเซิร์ฟเวอร์เปิดขึ้นสำหรับไลฟ์นั้นโดยเฉพาะ และพิธีกรร่วม (คุณกับพิธีกรด้วยกัน) ยังอยู่ระหว่างการทดสอบแบบส่วนตัว',
    },
  },
];

/* ------------------------------------------------------------------ final */

export const FINAL = {
  eyebrow: { he: '״אפשר לנסות?״', en: '“Can I try it?”', th: '“ลองได้ไหม?”' } as L10n,
  title: { he: 'שלחו מוצר. קבלו 10 דקות לייב בחינם.', en: 'Send a product. Get a 10-minute live, free.', th: 'ส่งสินค้ามา รับไลฟ์ 10 นาทีฟรี' } as L10n,
  body: {
    he: 'צלמו מוצר אחד, שלחו שם ומחיר, ונקבע לייב בדיקה של 10 דקות עם המנחה.',
    en: "Snap one product, send its name and price, and we'll book a 10-minute test live with the host.",
    th: 'ถ่ายรูปสินค้าหนึ่งชิ้น ส่งชื่อและราคามา แล้วเราจะนัดไลฟ์ทดลอง 10 นาทีกับพิธีกรครับ',
  } as L10n,
  message: {
    he: 'היי רפאל, אשמח ללייב בדיקה של 10 דקות עם המוצר שלי. אני מוכר/ת: ',
    en: "Hi Refael, I'd like a free 10-minute test live with my product. I sell: ",
    th: 'สวัสดีคุณราฟาเอล อยากได้ไลฟ์ทดลอง 10 นาทีกับสินค้าของฉัน ร้านขาย: ',
  } as L10n,
};
