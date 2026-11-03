import type { L10n } from '@/config/site';

/**
 * /co-host — the AI co-host product page. A human owner and Maya side by side
 * on one screen, in one of three layouts. No em dashes, no prices, no claim of
 * a public "live" for generated footage (Refael's rules).
 */

export const MEDIA: Record<'he' | 'en' | 'th', { src: string; poster: string }> = {
  he: { src: '/site/cohost-explainer-he.mp4', poster: '/site/cohost-explainer.jpg' },
  en: { src: '/site/cohost-explainer-en.mp4', poster: '/site/cohost-explainer.jpg' },
  th: { src: '/site/cohost-explainer-en.mp4', poster: '/site/cohost-explainer.jpg' },
};

export const HERO = {
  kicker: { he: 'שידור חי, לא עוד לבד.', en: "Live, you're not alone.", th: 'ไลฟ์ ไม่ต้องเหงาคนเดียว' } as L10n,
  h1a: { he: 'מיה עולה', en: 'Maya joins', th: 'มายาเข้าร่วม' } as L10n,
  h1b: { he: 'לשידור שלכם.', en: 'your live.', th: 'ไลฟ์ของคุณ' } as L10n,
  lead: {
    he: 'דמות AI יושבת לצדכם על המסך, כל השידור. עונה כשאתם עוצרים, שותקת כשאתם מדברים, וממלאת שקט עם המוצר שלכם.',
    en: 'An AI character sits beside you on screen for the whole show. Answers when you pause, goes quiet when you speak, fills silence with your product.',
    th: 'ตัวละคร AI อยู่เคียงข้างคุณบนจอตลอดไลฟ์ ตอบเมื่อคุณหยุด เงียบเมื่อคุณพูด เติมเต็มช่วงเงียบด้วยสินค้าของคุณ',
  } as L10n,
  cta: { he: 'שלחו רשימת מוצרים', en: 'Send a product list', th: 'ส่งรายการสินค้ามาเลย' } as L10n,
  hear: { he: 'לשמוע אותה', en: 'Hear her', th: 'ฟังเสียงเธอ' } as L10n,
  ctaNote: {
    he: 'בוואטסאפ, ישירות לרפאל. בלי טפסים.',
    en: 'On WhatsApp, straight to Refael. No forms.',
    th: 'ทาง LINE ถึงราฟาเอลโดยตรง ไม่ต้องกรอกฟอร์ม',
  } as L10n,
};

export const PROOF: { n: string; label: L10n }[] = [
  { n: '~2.75s', label: { he: 'חציון זמן תגובה, בשפתיים מסונכרנות', en: 'median response, lips in sync', th: 'เวลาตอบสนองเฉลี่ย ริมฝีปากซิงค์' } },
  { n: '0.3s', label: { he: 'שותקת כשאתם מדברים', en: 'goes quiet when you speak', th: 'เงียบเมื่อคุณพูด' } },
  { n: 'HE', label: { he: 'קול עברי, אוזן עברית', en: 'Hebrew voice, Hebrew ears', th: 'เสียงฮีบรูแท้' } },
];
export const PROOF_NOTE: L10n = {
  he: 'נמדד בשידורי ניסיון פרטיים, אוקטובר עד נובמבר 2026.',
  en: 'Measured in private test lives, October to November 2026.',
  th: 'วัดจากไลฟ์ทดสอบส่วนตัว ตุลาคมถึงพฤศจิกายน 2026',
};

export type Layout = {
  name: L10n;
  body: L10n;
  badge: 'coming' | 'now';
  media: { kind: 'video' | 'image'; src: string; poster?: string };
};

export const LAYOUTS_HEAD = {
  title: { he: 'שלושה לייאוטים, אתם בוחרים לכל שידור', en: 'Three layouts, you pick per show', th: 'สามเลย์เอาต์ เลือกได้ทุกไลฟ์' } as L10n,
  sub: {
    he: 'אותה דמות, אותה טכנולוגיה. רק סידור המסך משתנה.',
    en: 'Same character, same technology. Only the screen layout changes.',
    th: 'ตัวละครเดียวกัน เทคโนโลยีเดียวกัน แค่การจัดวางหน้าจอเปลี่ยนไป',
  } as L10n,
};

export const LAYOUTS: Layout[] = [
  {
    name: { he: 'ביחד בחדר', en: 'Same room', th: 'ในห้องเดียวกัน' },
    body: {
      he: 'מיה בגוף מלא לצדכם, כאילו היא עומדת באותו חדר. הקונספט מוכן, עדיין בפיתוח.',
      en: "Maya full body beside you, as if she's standing in the same room. The concept is ready, still in development.",
      th: 'มายาแบบเต็มตัวอยู่ข้างคุณ เหมือนยืนอยู่ในห้องเดียวกัน แนวคิดพร้อมแล้ว อยู่ระหว่างพัฒนา',
    },
    badge: 'coming',
    media: { kind: 'image', src: '/site/cohost-sameroom.jpg' },
  },
  {
    name: { he: 'כל אחד בחדר שלו', en: 'Cam to cam', th: 'แต่ละคนในห้องของตัวเอง' },
    body: {
      he: 'אתם ומיה, זה לצד זה, בסטייל שיחת וידאו. זמין עכשיו.',
      en: 'You and Maya, side by side, call style. Available now.',
      th: 'คุณกับมายาเคียงข้างกันแบบวิดีโอคอล พร้อมใช้งานแล้ว',
    },
    badge: 'now',
    media: { kind: 'video', src: '/site/cohost-camtocam.mp4' },
  },
  {
    name: { he: 'מארח ראשי + מיה בפינה', en: 'Main host + small co-host', th: 'โฮสต์หลัก + มายามุมเล็ก' },
    body: {
      he: 'אתם במסך מלא, מיה בווידג׳ט קטן בפינה. זמין עכשיו.',
      en: 'You fill the frame, Maya sits in a small widget in the corner. Available now.',
      th: 'คุณเต็มเฟรม มายาอยู่ในวิดเจ็ตเล็กที่มุมจอ พร้อมใช้งานแล้ว',
    },
    badge: 'now',
    media: { kind: 'image', src: '/site/cohost-widget.jpg' },
  },
];

export const LAYOUT_PICK_NOTE: L10n = {
  he: 'הלקוח בוחר לייאוט לכל שידור.',
  en: 'The client picks the layout per show.',
  th: 'ลูกค้าเลือกเลย์เอาต์ได้ในทุกไลฟ์',
};

const HOST_LABEL: L10n = { he: 'מיה, בקול', en: 'Maya, out loud', th: 'มายา, ด้วยเสียง' };

export type Feature = { icon: string; title: L10n; body: L10n };

export const FEATURES_HEAD = {
  title: { he: 'שמונה דברים שמיה עושה לצדכם', en: 'Eight things Maya does beside you', th: '8 สิ่งที่มายาทำเคียงข้างคุณ' } as L10n,
  sub: { he: 'אתם מנהלים את השידור. היא ממלאת את החורים.', en: 'You run the show. She fills the gaps.', th: 'คุณคุมไลฟ์ เธอเติมเต็มช่องว่าง' } as L10n,
};

export const FEATURES: Feature[] = [
  {
    icon: '👋',
    title: { he: 'פותחת ומברכת, אתכם ואת הקהל', en: 'Opens and greets, you and the audience', th: 'เปิดไลฟ์และทักทายคุณกับผู้ชม' },
    body: {
      he: 'מתחילה את השידור, מציגה אתכם ומזמינה את הקהל להישאר.',
      en: 'Opens the show, introduces you and invites the audience to stay.',
      th: 'เปิดไลฟ์ แนะนำคุณ และชวนผู้ชมให้อยู่ดู',
    },
  },
  {
    icon: '💬',
    title: { he: 'עונה כשאתם עוצרים', en: 'Answers when you pause', th: 'ตอบเมื่อคุณหยุดพูด' },
    body: {
      he: 'שתיקה שלכם היא ההזדמנות שלה לדבר. היא לא נותנת לרגע למות.',
      en: 'Your pause is her cue to speak. She never lets a moment die.',
      th: 'ช่วงที่คุณหยุดคือจังหวะของเธอ ไม่มีช่วงเงียบที่น่าเก้อ',
    },
  },
  {
    icon: '🤫',
    title: { he: 'שותקת ברגע שאתם מדברים', en: 'Goes quiet the moment you speak', th: 'เงียบทันทีที่คุณพูด' },
    body: {
      he: 'תוך כ-0.3 שניות היא נסוגה. אתם לא מתחרים על המיקרופון.',
      en: "Within about 0.3s she backs off. You're never competing for the mic.",
      th: 'ภายในประมาณ 0.3 วินาที เธอจะถอยให้ คุณไม่ต้องแย่งไมค์กัน',
    },
  },
  {
    icon: '📶',
    title: { he: 'מכסה כשהרשת שלכם נופלת', en: 'Covers when your connection drops', th: 'รับช่วงเมื่อสัญญาณคุณขาด' },
    body: {
      he: 'הנייד שלכם קפא לשנייה? היא ממשיכה לדבר לקהל כאילו כלום לא קרה.',
      en: "Your phone froze for a second? She keeps talking to the crowd like nothing happened.",
      th: 'มือถือคุณค้างไปแวบหนึ่ง? เธอยังคุยกับผู้ชมต่อเหมือนไม่มีอะไรเกิดขึ้น',
    },
  },
  {
    icon: '🤐',
    title: { he: 'ממלאת שקט עם המוצר שלכם', en: 'Fills silence with your product', th: 'เติมเต็มความเงียบด้วยสินค้าคุณ' },
    body: {
      he: 'שקט בשידור הוא לקוח שיוצא. היא ממלאת אותו עם עוד פרט על המוצר שלכם, לא עם סתם דיבור.',
      en: "Dead air loses a customer. She fills it with another detail about your product, not small talk.",
      th: 'ความเงียบในไลฟ์คือลูกค้าที่หายไป เธอเติมด้วยรายละเอียดสินค้า ไม่ใช่แค่พูดเล่น',
    },
  },
  {
    icon: '🏷️',
    title: { he: 'מכירה את הקטלוג והמחירים; לא ממציאה הנחות', en: "Knows the catalog and prices; never invents a discount", th: 'รู้แคตตาล็อกและราคา ไม่มั่วส่วนลด' },
    body: {
      he: 'היא יודעת רק מה שאישרתם. בלי מבצעים שלא אישרתם, בלי הבטחות מהאוויר.',
      en: "She knows only what you approved. No sale she wasn't told about, no promise out of thin air.",
      th: 'เธอรู้แค่สิ่งที่คุณอนุมัติ ไม่มีโปรที่ไม่ได้บอก ไม่มีคำสัญญาลอยๆ',
    },
  },
  {
    icon: '🎯',
    title: { he: 'עונה לתגובה של צופה בשם', en: 'Answers a viewer comment by name', th: 'ตอบคอมเมนต์ผู้ชมโดยเอ่ยชื่อ' },
    body: {
      he: 'צופה כותב תגובה, היא קוראת ועונה בשם שלו, בקול.',
      en: 'A viewer writes a comment, she reads it and answers by their name, out loud.',
      th: 'ผู้ชมคอมเมนต์ เธออ่านและตอบโดยเอ่ยชื่อด้วยเสียง',
    },
  },
  {
    icon: '🔚',
    title: { he: 'סוגרת את השידור אם נעלמתם', en: 'Closes the show if you vanish', th: 'ปิดไลฟ์ถ้าคุณหายไป' },
    body: {
      he: 'נפלתם מהרשת ולא חזרתם? היא לא משאירה קהל תקוע במסך ריק.',
      en: "Dropped off and didn't come back? She doesn't leave an audience staring at a dead screen.",
      th: 'หลุดจากไลฟ์แล้วไม่กลับมา? เธอไม่ทิ้งผู้ชมให้จ้องจอเปล่า',
    },
  },
];

export const STATUS_HEAD: L10n = {
  he: 'מה אמיתי היום, מה בדרך',
  en: 'What is real today, what is coming',
  th: 'อะไรจริงแล้ววันนี้ อะไรกำลังจะมา',
};

export const STATUS_REAL: L10n[] = [
  { he: 'כל שמונה הדברים האלה, על המסך המשותף', en: 'All eight things above, on the shared screen', th: '8 สิ่งด้านบนทั้งหมด บนจอร่วม' },
  { he: 'שני לייאוטים: קאם-טו-קאם ווידג׳ט קטן', en: 'Two layouts: cam to cam and small widget', th: '2 เลย์เอาต์: cam-to-cam และวิดเจ็ตเล็ก' },
  { he: 'קביעת תורים וליד, בשידור הסולו של מיה', en: "Booking and lead capture, in Maya's solo live show", th: 'นัดหมายและเก็บลีด ในไลฟ์เดี่ยวของมายา' },
];
export const STATUS_SOON: L10n[] = [
  { he: 'לייאוט ביחד בחדר', en: 'The same-room layout', th: 'เลย์เอาต์ในห้องเดียวกัน' },
  { he: 'זיכרון צופה בין שידורים', en: 'Viewer memory across lives', th: 'ความจำผู้ชมข้ามไลฟ์' },
  { he: 'תורים וליד, בתוך שידור הקו-הוסט עצמו', en: 'Booking and lead capture, inside the co-host show itself', th: 'นัดหมายและลีด ในไลฟ์โค-โฮสต์เอง' },
];

export const STEPS_HEAD: L10n = { he: 'איך זה מתחיל', en: 'How it starts', th: 'เริ่มต้นยังไง' };
export const STEPS: { t: L10n; b: L10n }[] = [
  {
    t: { he: 'שולחים רשימת מוצרים', en: 'Send your product list', th: 'ส่งรายการสินค้า' },
    b: {
      he: 'תמונות, מחירים, מה שחשוב שהיא תדע. ככה היא בונה את הידע שלה.',
      en: "Photos, prices, whatever she needs to know. That's how she builds her knowledge.",
      th: 'รูปภาพ ราคา สิ่งที่เธอควรรู้ นี่คือวิธีที่เธอสร้างความรู้ของตัวเอง',
    },
  },
  {
    t: { he: 'שידור ניסיון פרטי על הנייד', en: 'One private test live on your phone', th: 'ไลฟ์ทดสอบส่วนตัวบนมือถือ' },
    b: {
      he: 'קישור אחד, בלי להתקין שום דבר. רק אתם ומיה, לפני שמישהו אחר רואה.',
      en: "One link, nothing to install. Just you and Maya, before anyone else sees it.",
      th: 'ลิงก์เดียว ไม่ต้องติดตั้งอะไร มีแค่คุณกับมายา ก่อนที่คนอื่นจะเห็น',
    },
  },
  {
    t: { he: 'אתם רואים, אתם מחליטים', en: 'You watch, you decide', th: 'คุณดู คุณตัดสินใจ' },
    b: {
      he: 'אין לחץ. אם זה מתאים לכם, עוברים לשידור אמיתי.',
      en: "No pressure. If it fits you, you move to a real show.",
      th: 'ไม่มีการกดดัน ถ้าเหมาะกับคุณ ก็ไปไลฟ์จริงต่อได้',
    },
  },
];

export const OFFER = {
  title: { he: 'מוכנים לנסות את זה בשידור הבא?', en: 'Ready to try it on your next live?', th: 'พร้อมลองในไลฟ์ครั้งหน้าไหม' } as L10n,
  body: {
    he: 'שלחו לנו את רשימת המוצרים, ונקבע שידור ניסיון פרטי. אתם רואים את זה על הנייד שלכם לפני שמישהו אחר.',
    en: "Send us your product list and we'll set up a private test live. You see it on your own phone before anyone else does.",
    th: 'ส่งรายการสินค้ามา แล้วเราจะจัดไลฟ์ทดสอบส่วนตัวให้ คุณจะเห็นมันบนมือถือก่อนใคร',
  } as L10n,
  promise: { he: 'בלי התקנה, בלי מחויבות.', en: 'No install, no commitment.', th: 'ไม่ต้องติดตั้ง ไม่ต้องผูกมัด' } as L10n,
  button: { he: 'שלחו הודעה', en: 'Send a message', th: 'ส่งข้อความ' } as L10n,
  message: {
    he: 'היי, אני רוצה לנסות את הקו-הוסט AI לשידור שלי.',
    en: "Hi, I'd like to try the AI co-host for my live.",
    th: 'สวัสดีครับ อยากลองโค-โฮสต์ AI สำหรับไลฟ์ของผม',
  } as L10n,
  sub: { he: 'תוך יום עובדה נחזור אליכם.', en: "We'll get back to you within a business day.", th: 'เราจะติดต่อกลับภายใน 1 วันทำการ' } as L10n,
};

export const FAQ_HEAD: L10n = { he: 'שאלות שנשאלות', en: 'Questions people ask', th: 'คำถามที่พบบ่อย' };
export const FAQ: { q: L10n; a: L10n }[] = [
  {
    q: { he: 'מיה תגיד דברים שלא אישרתי?', en: 'Will Maya say things I never approved?', th: 'มายาจะพูดในสิ่งที่ผมไม่ได้อนุมัติไหม' },
    a: {
      he: 'לא. היא עונה רק מתוך הידע שאישרתם לה: המוצרים, המחירים, הכללים שלכם. בלי המצאות.',
      en: "No. She only answers from the knowledge you approved: your products, your prices, your rules. No improvising.",
      th: 'ไม่ครับ เธอตอบจากข้อมูลที่คุณอนุมัติเท่านั้น สินค้า ราคา กฎของคุณ ไม่มีการแต่งเติม',
    },
  },
  {
    q: { he: 'מה אם היא מדברת ביחד איתי?', en: 'What if she talks over me?', th: 'ถ้าเธอพูดแทรกผมล่ะ' },
    a: {
      he: 'היא נסוגה תוך כ-0.3 שניות כשאתם מדברים. זה כמעט בזמן אמת.',
      en: "She backs off within about 0.3s the moment you speak. It's near instant.",
      th: 'เธอจะเงียบภายในประมาณ 0.3 วินาทีทันทีที่คุณพูด เร็วมาก',
    },
  },
  {
    q: { he: 'איזה לייאוט כדאי לבחור?', en: 'Which layout should I pick?', th: 'ควรเลือกเลย์เอาต์ไหนดี' },
    a: {
      he: 'קאם-טו-קאם מתאים לשידור בסטייל שיחה. ווידג׳ט קטן מתאים אם אתם רוצים להישאר במרכז המסך. אפשר לבחור לכל שידור בנפרד.',
      en: "Cam to cam fits a conversational show. The small widget fits if you want to stay center screen. You can choose per show.",
      th: 'Cam-to-cam เหมาะกับไลฟ์แบบพูดคุย วิดเจ็ตเล็กเหมาะถ้าคุณอยากอยู่กลางจอ เลือกได้ในแต่ละไลฟ์',
    },
  },
  {
    q: { he: 'הלייאוט ביחד בחדר זמין?', en: 'Is the same-room layout available?', th: 'เลย์เอาต์ในห้องเดียวกันพร้อมใช้ไหม' },
    a: {
      he: 'עדיין בפיתוח. הקונספט מוכן ונראה במסך הזה, אבל שני הלייאוטים האחרים הם הזמינים כרגע.',
      en: "Still in development. The concept is ready and shown on this page, but the other two layouts are what's available right now.",
      th: 'ยังอยู่ระหว่างพัฒนา แนวคิดพร้อมแล้วและแสดงอยู่ในหน้านี้ แต่สองเลย์เอาต์ที่เหลือพร้อมใช้งานแล้วตอนนี้',
    },
  },
  {
    q: { he: 'צריך להתקין משהו?', en: 'Do I need to install anything?', th: 'ต้องติดตั้งอะไรไหม' },
    a: {
      he: 'לא. קישור אחד על הנייד, זה הכל. השידור הראשון הוא ניסיון פרטי, רק אתם רואים אותו.',
      en: "No. One link on your phone, that's it. The first show is a private test, only you see it.",
      th: 'ไม่ครับ แค่ลิงก์เดียวบนมือถือ ไลฟ์แรกเป็นการทดสอบส่วนตัว มีแค่คุณที่เห็น',
    },
  },
];
