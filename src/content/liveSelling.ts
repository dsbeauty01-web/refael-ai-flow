import type { L10n } from '@/config/site';

/**
 * /live-selling — the funnel page every Facebook post, DM and comment points at.
 * Ported from the old static maya.html / maya-en.html / maya-th.html.
 * Thai uses the Thai host (not Maya), so Thai copy says "พิธีกร AI" where the
 * others say Maya. No em dashes in copy (Refael's rule).
 */

// badge: draw our LIVE marker only where the footage doesn't already carry one
export const MEDIA: Record<'he' | 'en' | 'th', { src: string; poster: string; ratio: '4/5' | '9/16'; badge: boolean }> = {
  he: { src: '/maya/maya-live.mp4', poster: '/maya/maya-live-poster.jpg', ratio: '4/5', badge: false },
  en: { src: '/media/maya_speaking_en.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16', badge: true },
  th: { src: '/site/thai-host-live.mp4', poster: '/site/thai-host-live.jpg', ratio: '9/16', badge: false },
};

export const HERO = {
  kicker: { he: 'הבוט שלך ישן.', en: 'Your bot is asleep.', th: 'บอทของคุณกำลังหลับ' } as L10n,
  h1a: { he: 'מיה', en: 'Maya', th: 'พิธีกร AI' } as L10n,
  h1b: { he: 'מוכרת בשידור חי.', en: 'sells on live.', th: 'ขายของบนไลฟ์ให้คุณ' } as L10n,
  lead: {
    he: 'דמות AI שעולה לשידור, מציגה את המוצרים שלכם וקוראת את הצ׳אט. כל מי שכותב מקבל תשובה בקול, בשם שלו, תוך כמה שניות.',
    en: 'An AI character that goes live, presents your products and reads the chat. Everyone who comments gets an answer out loud, by their name, within seconds.',
    th: 'ตัวละคร AI ที่ขึ้นไลฟ์ นำเสนอสินค้าของคุณ และอ่านแชท ทุกคนที่คอมเมนต์จะได้คำตอบด้วยเสียง เรียกชื่อ ภายในไม่กี่วินาที',
  } as L10n,
  cta: { he: 'שלחו תמונה של מוצר', en: 'Send a product photo', th: 'ส่งรูปสินค้ามาเลย' } as L10n,
  hear: { he: 'לשמוע אותה', en: 'Hear her', th: 'ฟังเสียงเธอ' } as L10n,
  ctaNote: {
    he: 'בוואטסאפ, ישירות לרפאל. בלי טפסים.',
    en: 'On WhatsApp, straight to Refael. No forms.',
    th: 'ทาง WhatsApp ถึงราฟาเอลโดยตรง ไม่ต้องกรอกฟอร์ม',
  } as L10n,
};

export const PROOF: { n: string; label: L10n }[] = [
  { n: '15', label: { he: 'שידורים חיים אמיתיים בפייסבוק', en: 'real Facebook lives', th: 'ไลฟ์จริงบน Facebook' } },
  { n: '10/10', label: { he: 'תגובות נענו, כל אחת בשם', en: 'comments answered, each by name', th: 'คอมเมนต์ที่ตอบ เรียกชื่อทุกคน' } },
  { n: '~5', label: { he: 'שניות מהתגובה לתשובה', en: 'seconds from comment to answer', th: 'วินาทีจากคอมเมนต์ถึงคำตอบ' } },
];

export type Chat = { who: L10n; text: L10n; host?: boolean }[];
export type Feature = { icon: string; title: L10n; body: L10n; chat?: Chat; product?: boolean };

const HOST_LABEL: L10n = { he: 'מיה, בקול', en: 'Maya, out loud', th: 'พิธีกร AI, ด้วยเสียง' };

export const FEATURES_HEAD = {
  title: { he: 'מה היא עושה בשידור', en: 'What she does on live', th: 'เธอทำอะไรบนไลฟ์' } as L10n,
  sub: { he: 'אתם מתעסקים במוצר. היא מתעסקת בקהל.', en: 'You handle the product. She handles the crowd.', th: 'คุณดูแลสินค้า เธอดูแลผู้ชม' } as L10n,
};

export const FEATURES: Feature[] = [
  {
    icon: '💬',
    title: { he: 'קוראת את הצ׳אט בזמן אמת', en: 'Reads the chat in real time', th: 'อ่านแชทแบบเรียลไทม์' },
    body: {
      he: 'כל תגובה שנכתבת בשידור מגיעה אליה תוך שניות. שאלות על מחיר, מידות, משלוח, צבעים. אף שאלה לא נבלעת בגלילה.',
      en: 'Every comment in the live reaches her within seconds. Questions on price, sizes, shipping, colors. No question gets lost in the scroll.',
      th: 'ทุกคอมเมนต์ในไลฟ์ไปถึงเธอภายในไม่กี่วินาที คำถามเรื่องราคา ไซซ์ การจัดส่ง สี ไม่มีคำถามไหนหายไปในแชท',
    },
    chat: [
      { who: { he: 'דנה', en: 'Dana', th: 'ดาว' }, text: { he: 'כמה עולה התיק החום?', en: 'How much is the brown bag?', th: 'กระเป๋าสีน้ำตาลราคาเท่าไหร่คะ?' } },
      {
        who: HOST_LABEL,
        host: true,
        text: {
          he: 'דנה, הוא 490 במקום 690, רק בשידור הזה. הקישור בצ׳אט.',
          en: "Dana, it's $129 instead of $179, this live only. Link's in the chat.",
          th: 'คุณดาว ราคา 1,290 บาท จากปกติ 1,790 เฉพาะไลฟ์นี้เท่านั้น ลิงก์อยู่ในแชทค่ะ',
        },
      },
    ],
  },
  {
    icon: '🗣️',
    title: { he: 'עונה בקול, ובשם', en: 'Answers out loud, by name', th: 'ตอบด้วยเสียง และเรียกชื่อ' },
    body: {
      he: 'לא טקסט אוטומטי. היא פונה לצופה בשם שלו, בשפה טבעית, והשפתיים זזות עם המילים. אנשים נשארים בשידור כשמדברים אליהם.',
      en: 'Not canned text. She calls each viewer by their name, in natural speech, and her lips move with the words. People stay in a live when you talk to them.',
      th: 'ไม่ใช่ข้อความอัตโนมัติ เธอเรียกผู้ชมด้วยชื่อ พูดภาษาไทยเป็นธรรมชาติ และริมฝีปากขยับตามคำพูด คนอยู่ในไลฟ์นานขึ้นเมื่อมีคนพูดกับเขา',
    },
  },
  {
    icon: '🛍️',
    title: { he: 'מציגה מוצר ומחיר על המסך', en: 'Shows product and price on screen', th: 'แสดงสินค้าและราคาบนจอ' },
    body: {
      he: 'כרטיס מוצר עם תמונה, מחיר ומחיר לפני הנחה. היא עוברת בין המוצרים לפי הסדר שלכם, או לפי מה שהקהל שואל.',
      en: 'A product card with image, price and pre-discount price. She moves between products in your order, or by what the crowd is asking.',
      th: 'การ์ดสินค้าพร้อมรูป ราคา และราคาก่อนลด เธอเลื่อนระหว่างสินค้าตามลำดับของคุณ หรือตามที่ผู้ชมถาม',
    },
    product: true,
  },
  {
    icon: '⚡',
    title: { he: '"אני!" הופך להזמנה', en: '"Me!" turns into an order', th: '"CF!" กลายเป็นออเดอร์' },
    body: {
      he: 'מי שכותב "אני" או "רוצה" מקבל ממנה קישור לקנייה מיד, בזמן שהוא עוד בהתלהבות.',
      en: 'Anyone who types "me" or "want" gets a buy link from her right away, while they are still excited.',
      th: 'ใครที่พิมพ์ "CF" หรือ "เอา" จะได้ลิงก์สั่งซื้อจากเธอทันที ตอนที่ยังอยากได้อยู่',
    },
    chat: [
      { who: { he: 'מורן', en: 'Moran', th: 'มล' }, text: { he: 'אני!!', en: 'me!!', th: 'CF ค่ะ!!' } },
      {
        who: HOST_LABEL,
        host: true,
        text: {
          he: 'מורן, מעולה! שלחתי לך קישור, מחכה לך בצ׳אט.',
          en: 'Moran, perfect! Sent you a link, it is waiting in the chat.',
          th: 'คุณมล เยี่ยมเลย! ส่งลิงก์ให้แล้ว รออยู่ในแชทนะคะ',
        },
      },
    ],
  },
  {
    icon: '🙋',
    title: { he: 'יודעת מתי להעביר אליכם', en: 'Knows when to hand off to you', th: 'รู้ว่าเมื่อไหร่ควรส่งต่อให้คุณ' },
    body: {
      he: 'שאלה רגישה, הזמנה מיוחדת או תלונה? היא לא ממציאה. היא אומרת שתחזרו אליו, ומסמנת לכם את התגובה.',
      en: "A sensitive question, a special order or a complaint? She doesn't make things up. She says you will get back to them, and flags the comment for you.",
      th: 'คำถามละเอียดอ่อน ออเดอร์พิเศษ หรือข้อร้องเรียน? เธอไม่แต่งเรื่อง เธอบอกว่าคุณจะติดต่อกลับ และทำเครื่องหมายคอมเมนต์ไว้ให้คุณ',
    },
  },
  {
    icon: '📊',
    title: { he: 'דוח אחרי כל שידור', en: 'A report after every live', th: 'รายงานหลังจบทุกไลฟ์' },
    body: {
      he: 'מה שאלו, מי רצה לקנות, אילו מוצרים עניינו, ומה כדאי לשנות בשידור הבא.',
      en: 'What they asked, who wanted to buy, which products drew interest, and what to change for the next one.',
      th: 'ลูกค้าถามอะไร ใครอยากซื้อ สินค้าไหนน่าสนใจ และควรปรับอะไรในไลฟ์ครั้งต่อไป',
    },
  },
];

export const PRODUCT_CARD = {
  name: { he: 'תיק עור קוניאק', en: 'Cognac leather bag', th: 'กระเป๋าหนังสีคอนญัก' } as L10n,
  price: { he: '₪490', en: '$129', th: '฿1,290' } as L10n,
  was: { he: '₪690', en: '$179', th: '฿1,790' } as L10n,
};

export const WHERE_HEAD = {
  title: { he: 'איפה היא עובדת', en: 'Where she works', th: 'เธอทำงานที่ไหน' } as L10n,
  sub: { he: 'אותה דמות, בכל מקום שיש בו מצלמה וקהל.', en: "Same character, anywhere there's a camera and an audience.", th: 'ตัวละครเดียวกัน ทุกที่ที่มีกล้องและผู้ชม' } as L10n,
};

export const WHERE: { icon: string; t: L10n; b: L10n }[] = [
  { icon: '📺', t: { he: 'לייב בפייסבוק', en: 'Facebook Live', th: 'Facebook Live' }, b: { he: 'מכירות בשידור חי, עם הקהל הקיים שלכם', en: 'Live selling, with the audience you already have', th: 'ขายสดกับผู้ติดตามที่คุณมีอยู่' } },
  { icon: '🎵', t: { he: 'TikTok ואינסטגרם', en: 'TikTok and Instagram', th: 'TikTok Shop และ Instagram' }, b: { he: 'לייבים וקליפים קצרים מהשידורים', en: 'Lives, plus short clips cut from them', th: 'ไลฟ์และคลิปสั้นจากไลฟ์' } },
  { icon: '▶️', t: { he: 'לייב ביוטיוב', en: 'YouTube Live', th: 'YouTube Live' }, b: { he: 'השקות, הדגמות מוצר, שאלות ותשובות', en: 'Launches, product demos, Q&A', th: 'เปิดตัว สาธิตสินค้า ถาม-ตอบ' } },
  { icon: '🏬', t: { he: 'מסך בחנות או בלובי', en: 'A screen in your store', th: 'จอในร้านหรือล็อบบี้' }, b: { he: 'מקבלת אורחים ומספרת על המוצרים', en: 'Greets guests and talks about the products', th: 'ต้อนรับแขกและเล่าเรื่องสินค้า' } },
  { icon: '🎓', t: { he: 'שיעור או וובינר', en: 'Class or webinar', th: 'คลาสหรือเว็บบินาร์' }, b: { he: 'מנחה שמלמדת ועונה לשאלות', en: 'A host who teaches and answers questions', th: 'ผู้นำเสนอที่สอนและตอบคำถาม' } },
  { icon: '🌍', t: { he: 'עברית, אנגלית ותאית', en: 'Hebrew, English and Thai', th: 'ไทย อังกฤษ และฮีบรู' }, b: { he: 'אותה דמות, שלוש שפות', en: 'One character, three languages', th: 'ตัวละครเดียว สามภาษา' } },
];

export const STEPS_HEAD = { he: 'איך מתחילים', en: 'How to start', th: 'เริ่มต้นยังไง' } as L10n;
export const STEPS: { t: L10n; b: L10n }[] = [
  {
    t: { he: 'שולחים תמונה של מוצר', en: 'Send a product photo', th: 'ส่งรูปสินค้า' },
    b: { he: 'צילום מהטלפון, שם ומחיר. בוואטסאפ, דקה של עבודה.', en: 'A phone snap, a name and a price. On WhatsApp, a minute of work.', th: 'ถ่ายจากมือถือ ชื่อและราคา ทาง WhatsApp ใช้เวลาแค่นาทีเดียว' },
  },
  {
    t: { he: 'רואים 10 שניות של לייב עם המוצר שלכם', en: 'See 10 seconds of a live with your product', th: 'ดูไลฟ์ 10 วินาทีกับสินค้าของคุณ' },
    b: {
      he: 'היא מציגה את המוצר, אומרת את המחיר ועונה לצופה בשם. בדיוק כמו בשידור אמיתי, רק עם המוצר שלכם.',
      en: 'She presents the product, says the price and answers a viewer by name. Just like a real live, only with your product.',
      th: 'เธอนำเสนอสินค้า บอกราคา และตอบผู้ชมด้วยชื่อ เหมือนไลฟ์จริง แค่เป็นสินค้าของคุณ',
    },
  },
  {
    t: { he: 'עולים לשידור', en: 'Go live', th: 'ขึ้นไลฟ์' },
    b: { he: 'מעלים את רשימת המוצרים והשאלות הנפוצות, והיא עולה לשידור הראשון שלכם.', en: 'Upload your product list and common questions, and she goes live for the first time.', th: 'อัปโหลดรายการสินค้าและคำถามที่พบบ่อย แล้วเธอจะขึ้นไลฟ์ครั้งแรกของคุณ' },
  },
];

export const OFFER = {
  title: { he: 'שלחו תמונה. ראו אותה מוכרת אותה.', en: 'Send a photo. Watch her sell it.', th: 'ส่งรูปมา แล้วดูเธอขายให้' } as L10n,
  body: {
    he: 'צלמו מוצר אחד שאתם מוכרים ושלחו לי בוואטסאפ. תקבלו בחזרה 10 שניות שלה מציגה אותו בלייב, עם מחיר על המסך ותשובה לצופה בשם.',
    en: "Snap one product you sell and send it to me on WhatsApp. You'll get back 10 seconds of her presenting it live, with the price on screen and an answer to a viewer by name.",
    th: 'ถ่ายรูปสินค้าหนึ่งชิ้นที่คุณขาย แล้วส่งมาทาง WhatsApp คุณจะได้คลิป 10 วินาทีที่เธอนำเสนอสินค้านั้นบนไลฟ์ พร้อมราคาบนจอและคำตอบให้ผู้ชมด้วยชื่อ',
  } as L10n,
  promise: { he: 'בלי התחייבות, בלי טפסים.', en: 'No commitment, no forms.', th: 'ไม่มีข้อผูกมัด ไม่มีแบบฟอร์ม' } as L10n,
  button: { he: 'שלחו תמונה בוואטסאפ', en: 'Send a photo on WhatsApp', th: 'ส่งรูปทาง WhatsApp' } as L10n,
  sub: { he: 'וואטסאפ ישיר לרפאל סלע.', en: 'Direct WhatsApp to Refael Sela.', th: 'WhatsApp ตรงถึงราฟาเอล เซลา' } as L10n,
  message: {
    he: 'היי רפאל, ראיתי את מיה. אשלח תמונה של מוצר, אשמח לראות 10 שניות שלה מציגה אותו בלייב. אני מוכר/ת: ',
    en: "Hi Refael, I saw Maya. I'll send a product photo, I'd love to see 10 seconds of her presenting it live. I sell: ",
    th: 'สวัสดี คุณราฟาเอล เห็นพิธีกร AI แล้ว จะส่งรูปสินค้าให้ อยากดูคลิป 10 วินาทีที่เธอนำเสนอบนไลฟ์ ร้านขาย: ',
  } as L10n,
};

export const FAQ_HEAD = { he: 'שאלות שחוזרות', en: 'Questions that come up', th: 'คำถามที่พบบ่อย' } as L10n;
export const FAQ: { q: L10n; a: L10n }[] = [
  {
    q: { he: 'זה באמת חי, או סרטון מוקלט?', en: 'Is it really live, or a recorded video?', th: 'สดจริงหรือเป็นวิดีโออัด?' },
    a: {
      he: 'חי. היא קוראת את התגובות בזמן השידור ועונה בזמן אמת, בדרך כלל תוך כ-5 שניות. בשידור האחרון שלנו היא ענתה על 10 מתוך 10 תגובות, כל אחת בשם של הכותב.',
      en: "Live. She reads the comments during the stream and answers in real time, usually within about 5 seconds. In our last live she answered 10 out of 10 comments, each by the commenter's name.",
      th: 'สดจริง เธออ่านคอมเมนต์ระหว่างไลฟ์และตอบแบบเรียลไทม์ ปกติภายในประมาณ 5 วินาที ในไลฟ์ล่าสุดเธอตอบ 10 จาก 10 คอมเมนต์ เรียกชื่อผู้ถามทุกคน',
    },
  },
  {
    q: { he: 'אני צריך לעמוד מול המצלמה?', en: 'Do I have to be on camera?', th: 'ต้องอยู่หน้ากล้องไหม?' },
    a: {
      he: 'לא. היא יכולה להנחות את השידור לבד, או לעבוד לצדכם: אתם מציגים את המוצר, היא עונה לצ׳אט.',
      en: 'No. She can host the live on her own, or work alongside you: you show the product, she answers the chat.',
      th: 'ไม่ต้อง เธอดำเนินไลฟ์เองได้ หรือทำงานร่วมกับคุณ คุณนำเสนอสินค้า เธอตอบแชท',
    },
  },
  {
    q: { he: 'מה אם שואלים אותה משהו שהיא לא יודעת?', en: "What if someone asks her something she doesn't know?", th: 'ถ้ามีคนถามสิ่งที่เธอไม่รู้ล่ะ?' },
    a: {
      he: 'היא לא ממציאה. היא עונה רק ממה שהכנתם לה (מוצרים, מחירים, משלוחים, החזרות), ומה שחורג מזה היא מעבירה אליכם.',
      en: "She doesn't make things up. She answers only from what you prepared (products, prices, shipping, returns), and anything beyond that she hands to you.",
      th: 'เธอไม่แต่งเรื่อง เธอตอบเฉพาะจากสิ่งที่คุณเตรียมไว้ (สินค้า ราคา การจัดส่ง การคืนสินค้า) ส่วนที่เกินจากนั้นเธอส่งต่อให้คุณ',
    },
  },
  {
    q: { he: 'באיזה פלטפורמות זה עובד?', en: 'Which platforms does it work on?', th: 'ใช้กับแพลตฟอร์มไหนได้บ้าง?' },
    a: {
      he: 'לייב בפייסבוק, ביוטיוב ובטיקטוק, שידורים פרטיים ומסך בחנות. הדמות זהה, משתנה רק היעד של השידור.',
      en: 'Facebook Live, YouTube, TikTok, private streams and an in-store screen. The character stays the same, only the destination changes.',
      th: 'Facebook Live, YouTube, TikTok Shop, ไลฟ์ส่วนตัว และจอในร้าน ตัวละครเหมือนเดิม เปลี่ยนแค่ช่องทางไลฟ์',
    },
  },
  {
    q: { he: 'אפשר דמות אחרת, או הקול שלי?', en: 'Can I get a different character, or my own voice?', th: 'ขอตัวละครอื่น หรือใช้เสียงของฉันได้ไหม?' },
    a: {
      he: 'כן. מיה ונובה הן דוגמאות. אפשר לבנות דמות לפי המותג שלכם, וגם לשבט את הקול שלכם (באישורכם).',
      en: 'Yes. Maya and Nova are examples. We can build a character around your brand, and clone your own voice (with your permission).',
      th: 'ได้ ตัวละครในหน้านี้เป็นตัวอย่าง เราสร้างตัวละครตามแบรนด์ของคุณได้ และโคลนเสียงของคุณได้ (โดยได้รับอนุญาตจากคุณ)',
    },
  },
  {
    q: { he: 'כמה זה עולה?', en: 'How much does it cost?', th: 'ราคาเท่าไหร่?' },
    a: {
      he: 'תלוי במספר המוצרים והשידורים. שלחו לי תמונה של מוצר בוואטסאפ, תראו אותה בלייב, ואגיד לכם בדיוק.',
      en: "It depends on the number of products and lives. Send me a product photo on WhatsApp, see her live with it, and I'll tell you exactly.",
      th: 'ขึ้นอยู่กับจำนวนสินค้าและไลฟ์ ส่งรูปสินค้ามาทาง WhatsApp ดูเธอบนไลฟ์ แล้วเราจะแจ้งราคาที่แน่นอน',
    },
  },
];
