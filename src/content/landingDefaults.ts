import type { L10n } from '@/config/site';

/**
 * Fallback hero CTA, proof row, offer and FAQ heading for the keyword landings
 * (/ai-avatar, /brand-character) that do not define their own. Moved verbatim from the
 * old /live-selling content when that page was rebuilt (Nov 2026), so those pages do not change.
 */

export const LANDING_HERO = {
  kicker: { he: 'הבוט שלך ישן.', en: 'Your bot is asleep.', th: 'บอทของคุณกำลังหลับ' } as L10n,
  h1a: { he: 'מיה', en: 'Your AI host', th: 'พิธีกร AI' } as L10n,
  h1b: { he: 'מוכרת בשידור חי.', en: 'sells on live.', th: 'ขายของบนไลฟ์ให้คุณ' } as L10n,
  lead: {
    he: 'דמות AI שעולה לשידור, מציגה את המוצרים שלכם וקוראת את הצ׳אט. כל מי שכותב מקבל תשובה בקול, בשם שלו, תוך כמה שניות.',
    en: 'An AI character that goes live, presents your products and reads the chat. Everyone who comments gets an answer out loud, by their name, within seconds.',
    th: 'ตัวละคร AI ที่ขึ้นไลฟ์ นำเสนอสินค้าของคุณ และอ่านแชท ทุกคนที่คอมเมนต์จะได้คำตอบด้วยเสียง เรียกชื่อ ภายในไม่กี่วินาที',
  } as L10n,
  cta: { he: 'שלחו תמונה של מוצר', en: 'Send a product photo', th: 'ส่งรูปสินค้ามาเลย' } as L10n,
  hear: { he: 'לשמוע אותה', en: 'Watch the real live', th: 'ดูไลฟ์จริง' } as L10n,
  ctaNote: {
    he: 'בוואטסאפ, ישירות לרפאל. בלי טפסים.',
    en: 'On WhatsApp, straight to Refael. No forms.',
    th: 'ทาง LINE ถึงราฟาเอลโดยตรง ไม่ต้องกรอกฟอร์ม',
  } as L10n,
};

export const LANDING_PROOF: { n: string; label: L10n }[] = [
  { n: '15', label: { he: 'שידורים חיים אמיתיים בפייסבוק', en: 'real Facebook lives', th: 'ไลฟ์จริงบน Facebook' } },
  { n: '10/10', label: { he: 'תגובות נענו, כל אחת בשם', en: 'comments answered, each by name', th: 'คอมเมนต์ที่ตอบ เรียกชื่อทุกคน' } },
  { n: '~5', label: { he: 'שניות מהתגובה לתשובה', en: 'seconds from comment to answer', th: 'วินาทีจากคอมเมนต์ถึงคำตอบ' } },
];

export const LANDING_OFFER = {
  title: { he: 'שלחו תמונה. ראו אותה מוכרת אותה.', en: 'Send a photo. Watch her sell it.', th: 'ส่งรูปมา แล้วดูเธอขายให้' } as L10n,
  body: {
    he: 'צלמו מוצר אחד שאתם מוכרים ושלחו לי בוואטסאפ. תקבלו בחזרה 10 שניות שלה מציגה אותו בלייב, עם מחיר על המסך ותשובה לצופה בשם.',
    en: "Snap one product you sell and send it to me on WhatsApp. You'll get back 10 seconds of her presenting it live, with the price on screen and an answer to a viewer by name.",
    th: 'ถ่ายรูปสินค้าหนึ่งชิ้นที่คุณขาย แล้วส่งมาทาง LINE คุณจะได้คลิป 10 วินาทีที่เธอนำเสนอสินค้านั้นบนไลฟ์ พร้อมราคาบนจอและคำตอบให้ผู้ชมด้วยชื่อ',
  } as L10n,
  promise: { he: 'בלי התחייבות, בלי טפסים.', en: 'No commitment, no forms.', th: 'ไม่มีข้อผูกมัด ไม่มีแบบฟอร์ม' } as L10n,
  button: { he: 'שלחו תמונה בוואטסאפ', en: 'Send a photo on WhatsApp', th: 'ส่งรูปทาง LINE' } as L10n,
  sub: { he: 'וואטסאפ ישיר לרפאל סלע.', en: 'Direct WhatsApp to Refael Sela.', th: 'LINE ตรงถึงราฟาเอล เซลา' } as L10n,
  message: {
    he: 'היי רפאל, ראיתי את מיה. אשלח תמונה של מוצר, אשמח לראות 10 שניות שלה מציגה אותו בלייב. אני מוכר/ת: ',
    en: "Hi Refael, I saw Maya. I'll send a product photo, I'd love to see 10 seconds of her presenting it live. I sell: ",
    th: 'สวัสดี คุณราฟาเอล เห็นพิธีกร AI แล้ว จะส่งรูปสินค้าให้ อยากดูคลิป 10 วินาทีที่เธอนำเสนอบนไลฟ์ ร้านขาย: ',
  } as L10n,
};

export const LANDING_FAQ_HEAD = { he: 'שאלות שחוזרות', en: 'Questions that come up', th: 'คำถามที่พบบ่อย' } as L10n;
