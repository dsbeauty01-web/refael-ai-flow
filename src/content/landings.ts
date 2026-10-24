import type { L10n } from '@/config/site';

/**
 * Keyword landing pages, ported from the old static ai-avatar-business.html and
 * ai-brand-character.html (Hebrew kept as written; English and Thai added).
 * Rendered by pages/Landing.tsx. No em dashes in copy.
 */
export type Block = { h: L10n; p?: L10n[]; bullets?: L10n[] };
export type Landing = {
  path: string;
  crumb: L10n;
  h1: L10n;
  lead: L10n;
  media: Record<'he' | 'en' | 'th', { src: string; poster: string; ratio: '4/5' | '9/16' }>;
  live: boolean;
  blocks: Block[];
  faq: { q: L10n; a: L10n }[];
};

export const LANDINGS: Record<string, Landing> = {
  '/ai-avatar': {
    path: '/ai-avatar',
    crumb: { he: 'אווטאר AI לעסקים', en: 'AI avatar for business', th: 'อวตาร AI สำหรับธุรกิจ' },
    h1: {
      he: 'אווטאר AI שמדבר ומוכר בשבילכם.',
      en: 'An AI avatar that talks and sells for you.',
      th: 'อวตาร AI ที่พูดและขายแทนคุณ',
    },
    lead: {
      he: 'לא עוד בוט שמחכה לשאלות. דמות עם פנים, קול ואופי, שעולה לשידור, מציגה מוצר ועונה ללקוחות בשם.',
      en: 'Not another bot waiting for questions. A character with a face, a voice and a personality that goes live, presents your product and answers customers by name.',
      th: 'ไม่ใช่บอทที่รอคำถามอีกต่อไป แต่เป็นตัวละครที่มีใบหน้า เสียง และบุคลิก ขึ้นไลฟ์ นำเสนอสินค้า และตอบลูกค้าด้วยชื่อ',
    },
    media: {
      he: { src: '/maya/maya-live.mp4', poster: '/maya/maya-live-poster.jpg', ratio: '4/5' },
      en: { src: '/media/maya_speaking_en.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16' },
      th: { src: '/site/thai-host-live.mp4', poster: '/site/thai-host-live.jpg', ratio: '9/16' },
    },
    live: true,
    blocks: [
      {
        h: { he: 'מבוט שעונה לדמות שמוכרת', en: 'From a bot that answers to a character that sells', th: 'จากบอทที่แค่ตอบ สู่ตัวละครที่ขายได้' },
        p: [
          {
            he: 'רוב העסקים כבר מכירים צ׳אט בוט. שואלים, הוא עונה. אחר כך נוסף קול, ואחר כך פנים. אבל כולם עדיין מחכים שמישהו יפנה אליהם.',
            en: 'Most businesses already know chatbots. You ask, it answers. Then came voice, then a face. But they all still wait for someone to come to them.',
            th: 'ธุรกิจส่วนใหญ่รู้จักแชทบอทอยู่แล้ว ถามแล้วมันตอบ ต่อมามีเสียง แล้วก็มีใบหน้า แต่ทั้งหมดยังรอให้มีคนเข้ามาหาก่อน',
          },
          {
            he: 'אווטאר מכירות עובד הפוך: הוא פונה לקהל, מציג את המוצר, קורא את התגובות ועונה לכל אחד בשם, בקול, עם שפתיים שזזות עם המילים.',
            en: 'A sales avatar works the other way round: it addresses the audience, presents the product, reads the comments and answers each person by name, out loud, with lips that move with the words.',
            th: 'อวตารขายของทำงานกลับกัน มันพูดกับผู้ชม นำเสนอสินค้า อ่านคอมเมนต์ และตอบทุกคนด้วยชื่อ ด้วยเสียง พร้อมริมฝีปากที่ขยับตามคำพูด',
          },
        ],
      },
      {
        h: { he: 'מה היא יודעת לעשות', en: 'What she can do', th: 'เธอทำอะไรได้บ้าง' },
        bullets: [
          { he: 'לדבר עברית ואנגלית בקול טבעי, כולל שיבוט של הקול שלכם באישורכם.', en: 'Speak Hebrew, English or Thai in a natural voice, including a clone of your own voice, with your permission.', th: 'พูดภาษาไทย อังกฤษ หรือฮีบรูด้วยเสียงธรรมชาติ รวมถึงโคลนเสียงของคุณเองเมื่อได้รับอนุญาต' },
          { he: 'להציג מוצרים עם מחיר על המסך ולשלוח קישור לקנייה.', en: 'Show products with the price on screen and send a buy link.', th: 'แสดงสินค้าพร้อมราคาบนจอ และส่งลิงก์สั่งซื้อ' },
          { he: 'להנחות לייב, וובינר או השקה, ולענות לשאלות בזמן אמת.', en: 'Host a live stream, a webinar or a launch, and answer questions in real time.', th: 'ดำเนินไลฟ์ เว็บบินาร์ หรืองานเปิดตัว และตอบคำถามแบบเรียลไทม์' },
          { he: 'להפיק קליפים קצרים מהשידורים, מוכנים לרילס ולטיקטוק.', en: 'Turn the streams into short clips, ready for Reels and TikTok.', th: 'ตัดไลฟ์เป็นคลิปสั้น พร้อมลง Reels และ TikTok' },
        ],
      },
      {
        h: { he: 'איפה משתמשים בה', en: 'Where you use her', th: 'ใช้งานที่ไหนได้บ้าง' },
        p: [
          {
            he: 'לייב בפייסבוק וביוטיוב, מסך בחנות או בלובי, שיעורים ווובינרים, וסרטוני מוצר לרשתות. אותה דמות, תפקיד אחר.',
            en: 'Facebook and YouTube lives, a screen in your store or lobby, classes and webinars, and product videos for social. One character, different jobs.',
            th: 'ไลฟ์บน Facebook และ YouTube จอในร้านหรือล็อบบี้ คลาสและเว็บบินาร์ และวิดีโอสินค้าสำหรับโซเชียล ตัวละครเดียว หลายหน้าที่',
          },
        ],
      },
    ],
    faq: [
      {
        q: { he: 'במה זה שונה מצ׳אט בוט?', en: 'How is this different from a chatbot?', th: 'ต่างจากแชทบอทอย่างไร?' },
        a: {
          he: 'צ׳אט בוט עונה בטקסט ומחכה לשאלה. האווטאר מדבר בקול, עם פנים ושפתיים מסונכרנות, ויכול להוביל שידור שלם בעצמו.',
          en: 'A chatbot answers in text and waits to be asked. The avatar speaks out loud, with a face and synced lips, and can run a whole stream on its own.',
          th: 'แชทบอทตอบเป็นข้อความและรอให้ถาม อวตารพูดด้วยเสียง มีใบหน้าและปากที่ขยับตรงกับคำพูด และดำเนินไลฟ์ทั้งรายการได้เอง',
        },
      },
      {
        q: { he: 'אפשר דמות לפי המותג שלנו?', en: 'Can we have a character that matches our brand?', th: 'ทำตัวละครให้เข้ากับแบรนด์ของเราได้ไหม?' },
        a: {
          he: 'כן. מיה ונובה הן דוגמאות. אפשר לבנות דמות לפי המראה והאופי של המותג, כולל קמע קיים.',
          en: "Yes. Maya and Nova are examples. We build a character around your brand's look and personality, including an existing mascot.",
          th: 'ได้ ตัวละครที่เห็นเป็นตัวอย่าง เราสร้างตัวละครตามหน้าตาและบุคลิกของแบรนด์คุณ รวมถึงมาสคอตที่มีอยู่แล้ว',
        },
      },
      {
        q: { he: 'כמה זמן לוקח להתחיל?', en: 'How long does it take to start?', th: 'เริ่มได้เร็วแค่ไหน?' },
        a: {
          he: 'שולחים תמונה של מוצר, מקבלים קליפ של 10 שניות, ואחרי שמכינים רשימת מוצרים ושאלות נפוצות היא עולה לשידור הראשון.',
          en: 'Send a product photo, get a 10-second clip back, and once your product list and common questions are ready she goes live for the first time.',
          th: 'ส่งรูปสินค้า รับคลิป 10 วินาที และเมื่อเตรียมรายการสินค้ากับคำถามที่พบบ่อยเสร็จ เธอก็ขึ้นไลฟ์ครั้งแรกได้เลย',
        },
      },
      {
        q: { he: 'כמה זה עולה?', en: 'How much does it cost?', th: 'ราคาเท่าไหร่?' },
        a: {
          he: 'תלוי במספר המוצרים והשידורים. שלחו תמונה של מוצר בוואטסאפ ואגיד לכם בדיוק.',
          en: "It depends on the number of products and lives. Send a product photo on WhatsApp and I'll tell you exactly.",
          th: 'ขึ้นอยู่กับจำนวนสินค้าและไลฟ์ ส่งรูปสินค้ามาทาง WhatsApp แล้วเราจะแจ้งราคาที่แน่นอน',
        },
      },
    ],
  },

  '/brand-character': {
    path: '/brand-character',
    crumb: { he: 'דמות AI למותג', en: 'AI brand character', th: 'ตัวละคร AI สำหรับแบรนด์' },
    h1: {
      he: 'דמות AI למותג שלכם. מדברת, מוכרת, זוכרת שמות.',
      en: 'An AI character for your brand. It talks, sells and remembers names.',
      th: 'ตัวละคร AI สำหรับแบรนด์ของคุณ พูดได้ ขายได้ และจำชื่อลูกค้าได้',
    },
    lead: {
      he: 'תכירו את נובה: היא מציגה ערכת ניסויים לילדים בשידור חי, וכשאמא שואלת אם זה מתאים לגיל שש, היא עונה לה בשם.',
      en: 'Meet Nova: she presents a kids’ science kit on a live stream, and when a mum asks whether it suits a six-year-old, Nova answers her by name.',
      th: 'พบกับโนวา เธอนำเสนอชุดทดลองวิทยาศาสตร์สำหรับเด็กบนไลฟ์ และเมื่อคุณแม่ถามว่าเหมาะกับเด็กหกขวบไหม โนวาก็ตอบด้วยชื่อของเธอ',
    },
    media: {
      he: { src: '/maya/nova-he.mp4', poster: '/maya/nova-he.jpg', ratio: '9/16' },
      en: { src: '/maya/nova-en.mp4', poster: '/maya/nova-en.jpg', ratio: '9/16' },
      th: { src: '/maya/nova-en.mp4', poster: '/maya/nova-en.jpg', ratio: '9/16' },
    },
    live: false,
    blocks: [
      {
        h: { he: 'קמע שלא רק מחייך מהאריזה', en: 'A mascot that does more than smile from the box', th: 'มาสคอตที่ทำได้มากกว่ายิ้มอยู่บนกล่อง' },
        p: [
          {
            he: 'למותגים רבים יש דמות או קמע. ברוב המקרים היא נשארת על האריזה או בסרטון פרסומת אחד. דמות AI הופכת את הקמע למשהו שמדבר עם הלקוחות באמת.',
            en: 'Plenty of brands have a character or a mascot. Usually it stays on the packaging or in one ad. An AI character turns that mascot into something that actually talks with your customers.',
            th: 'หลายแบรนด์มีตัวละครหรือมาสคอต แต่ส่วนใหญ่อยู่แค่บนบรรจุภัณฑ์หรือในโฆษณาเรื่องเดียว ตัวละคร AI ทำให้มาสคอตพูดคุยกับลูกค้าได้จริง',
          },
          {
            he: 'היא עולה ללייב, מציגה את המוצר, עונה להורים ולילדים בשם, ויכולה לעבור בין עברית לאנגלית.',
            en: 'It goes live, presents the product, answers parents and kids by name, and can switch languages mid-stream.',
            th: 'มันขึ้นไลฟ์ นำเสนอสินค้า ตอบผู้ปกครองและเด็กด้วยชื่อ และสลับภาษาได้ระหว่างไลฟ์',
          },
        ],
      },
      {
        h: { he: 'מתאים במיוחד ל', en: 'A natural fit for', th: 'เหมาะเป็นพิเศษกับ' },
        bullets: [
          { he: 'מותגי צעצועים ומשחקים', en: 'Toy and game brands', th: 'แบรนด์ของเล่นและเกม' },
          { he: 'אפליקציות לימוד', en: 'Learning apps', th: 'แอปการเรียนรู้' },
          { he: 'מוזיאונים ואטרקציות לילדים', en: 'Museums and kids’ attractions', th: 'พิพิธภัณฑ์และสถานที่ท่องเที่ยวสำหรับเด็ก' },
          { he: 'מותגי מזון לחיות מחמד', en: 'Pet food brands', th: 'แบรนด์อาหารสัตว์เลี้ยง' },
          { he: 'כל מותג שרוצה פנים קבועות ברשתות', en: 'Any brand that wants a consistent face on social', th: 'ทุกแบรนด์ที่อยากมีหน้าตาประจำบนโซเชียล' },
        ],
      },
      {
        h: { he: 'איך בונים דמות', en: 'How a character is built', th: 'สร้างตัวละครอย่างไร' },
        p: [
          {
            he: 'מתחילים מהמראה: קמע קיים או דמות חדשה. בוחרים קול ואופי. מכינים לה ידע על המוצרים. ואז היא מוכנה ללייב, לסרטונים ולמסך בחנות.',
            en: 'It starts with the look: an existing mascot or a new character. Then a voice and a personality, then knowledge about your products. After that it is ready for lives, videos and an in-store screen.',
            th: 'เริ่มจากหน้าตา จะเป็นมาสคอตเดิมหรือตัวละครใหม่ก็ได้ เลือกเสียงและบุคลิก ใส่ความรู้เรื่องสินค้า แล้วก็พร้อมสำหรับไลฟ์ วิดีโอ และจอในร้าน',
          },
        ],
      },
    ],
    faq: [
      {
        q: { he: 'אפשר להשתמש בקמע שכבר יש לנו?', en: 'Can we use the mascot we already have?', th: 'ใช้มาสคอตที่เรามีอยู่แล้วได้ไหม?' },
        a: {
          he: 'כן, בתנאי שיש לכם זכויות עליו. בונים ממנו דמות מדברת עם קול ואופי שמתאימים למותג.',
          en: 'Yes, as long as you hold the rights to it. We turn it into a talking character with a voice and personality that fit the brand.',
          th: 'ได้ หากคุณถือลิขสิทธิ์ เราจะสร้างเป็นตัวละครที่พูดได้ มีเสียงและบุคลิกที่เข้ากับแบรนด์',
        },
      },
      {
        q: { he: 'היא מדברת גם באנגלית?', en: 'Does it speak other languages?', th: 'พูดได้หลายภาษาไหม?' },
        a: {
          he: 'כן. אותה דמות יכולה לעבוד בעברית ובאנגלית, גם באותו שידור.',
          en: 'Yes. The same character can work in Hebrew, English and Thai, even within one stream.',
          th: 'ได้ ตัวละครเดียวกันใช้ได้ทั้งภาษาไทย อังกฤษ และฮีบรู แม้ในไลฟ์เดียวกัน',
        },
      },
      {
        q: { he: 'זה בטוח לקהל של ילדים?', en: 'Is it safe for an audience of kids?', th: 'ปลอดภัยสำหรับผู้ชมที่เป็นเด็กไหม?' },
        a: {
          he: 'היא עונה רק מתוך מה שהכנתם לה, לא ממציאה, ושאלות רגישות מועברות אליכם.',
          en: 'It only answers from what you prepared, never makes things up, and sensitive questions are passed to you.',
          th: 'ตัวละครตอบเฉพาะจากข้อมูลที่คุณเตรียมไว้ ไม่แต่งเรื่องเอง และคำถามที่ละเอียดอ่อนจะถูกส่งต่อให้คุณ',
        },
      },
      {
        q: { he: 'איך מתחילים?', en: 'How do we start?', th: 'เริ่มต้นอย่างไร?' },
        a: {
          he: 'שולחים תמונה של מוצר ומקבלים קליפ קצר של הדמות מציגה אותו.',
          en: 'Send a photo of a product and get back a short clip of the character presenting it.',
          th: 'ส่งรูปสินค้ามา แล้วรับคลิปสั้นที่ตัวละครนำเสนอสินค้านั้น',
        },
      },
    ],
  },
};
