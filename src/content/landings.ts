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
  /** optional "pick the front end" cards (avatar / voice / chat) */
  modes?: { icon: 'avatar' | 'voice' | 'chat'; title: L10n; body: L10n; where: L10n }[];
  /** optional tool chips: what the agent is wired into */
  tools?: { title: L10n; body: L10n }[];
  /** optional proof row override (defaults to the live-selling numbers) */
  proof?: { n: string; label: L10n }[];
  /** optional offer override; pages without it use the live-selling offer */
  offer?: { cta: L10n; title: L10n; body: L10n; promise: L10n; button: L10n; message: L10n };
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
      en: { src: '/site/live-proof-en.mp4', poster: '/site/live-proof-en.jpg', ratio: '9/16' },
      th: { src: '/site/live-proof-th.mp4', poster: '/site/live-proof-th.jpg', ratio: '9/16' },
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

  '/avatar-videos': {
    path: '/avatar-videos',
    crumb: { he: 'סרטוני אווטאר', en: 'Avatar videos', th: 'วิดีโออวตาร' },
    h1: {
      he: 'סרטון עם דמות שמדברת. בלי צילומים, בלי שחקן.',
      en: 'A video with a talking character. No filming, no actor.',
      th: 'วิดีโอพร้อมตัวละครที่พูดได้ ไม่ต้องถ่ายทำ ไม่ต้องใช้นักแสดง',
    },
    lead: {
      he: 'סרטון הסבר, הדרכה לעובדים, שיעור בקורס או פרסומת. שולחים לי את הטקסט, מקבלים סרטון של דמות שמדברת אותו. אותה דמות בעברית, באנגלית ובתאית.',
      en: 'An explainer, staff training, a course lesson or an ad. Send me the text, get back a video of a character saying it. The same character in Hebrew, English and Thai.',
      th: 'คลิปอธิบาย ฝึกอบรมพนักงาน บทเรียนในคอร์ส หรือโฆษณา ส่งข้อความมาให้ผม แล้วรับวิดีโอที่ตัวละครพูดข้อความนั้น ตัวละครเดียวกัน ทั้งภาษาไทย อังกฤษ และฮีบรู',
    },
    media: {
      he: { src: '/media/maya_speaking_he.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16' },
      en: { src: '/media/maya_speaking_en.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16' },
      th: { src: '/media/maya_speaking_th.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16' },
    },
    live: false,
    proof: [
      { n: '48h', label: { he: 'סרטון ראשון ביד', en: 'first video in your hands', th: 'ได้วิดีโอแรกในมือ' } },
      { n: '3', label: { he: 'שפות, אותה דמות', en: 'languages, one character', th: 'ภาษา ตัวละครเดียว' } },
      { n: '0', label: { he: 'ימי צילום, סטודיו ושחקנים', en: 'shoot days, studios and actors', th: 'วันถ่ายทำ สตูดิโอ และนักแสดง' } },
    ],
    blocks: [
      {
        h: { he: 'מה אפשר להזמין', en: 'What you can order', th: 'สั่งทำอะไรได้บ้าง' },
        bullets: [
          {
            he: 'סרטון הסבר על המוצר או השירות, 60 עד 90 שניות, לאתר ולרשתות.',
            en: 'A product or service explainer, 60 to 90 seconds, for your site and social.',
            th: 'คลิปอธิบายสินค้าหรือบริการ 60 ถึง 90 วินาที สำหรับเว็บและโซเชียล',
          },
          {
            he: 'הדרכה לעובדים חדשים: נהלים, בטיחות, שימוש במערכות.',
            en: 'Onboarding for new staff: procedures, safety, how to use your systems.',
            th: 'ฝึกอบรมพนักงานใหม่ ขั้นตอนการทำงาน ความปลอดภัย วิธีใช้ระบบ',
          },
          {
            he: 'שיעורים לקורס דיגיטלי, עם אותה דמות בכל הפרקים.',
            en: 'Lessons for an online course, with the same character in every episode.',
            th: 'บทเรียนสำหรับคอร์สออนไลน์ ใช้ตัวละครเดียวกันทุกตอน',
          },
          {
            he: 'פרסומת קצרה לרילס, לטיקטוק ולשורטס, אנכית ומוכנה להעלאה.',
            en: 'A short ad for Reels, TikTok and Shorts, vertical and ready to upload.',
            th: 'โฆษณาสั้นสำหรับ Reels, TikTok และ Shorts แนวตั้ง พร้อมอัปโหลด',
          },
          {
            he: 'אותו סרטון בכמה שפות, בלי לצלם מחדש.',
            en: 'The same video in several languages, without reshooting anything.',
            th: 'วิดีโอเดียวกันหลายภาษา โดยไม่ต้องถ่ายใหม่',
          },
        ],
      },
      {
        h: { he: 'למה זה עדיף על צילום', en: 'Why this beats a shoot', th: 'ทำไมดีกว่าการถ่ายทำ' },
        p: [
          {
            he: 'צילום אמיתי דורש שחקן, סטודיו, תאורה ועריכה, וכשמשתנה משפט אחד במחירון צריך להתחיל מהתחלה. כאן משנים את הטקסט ומקבלים גרסה חדשה באותו יום, עם אותה דמות ואותו קול.',
            en: 'A real shoot needs an actor, a studio, lighting and editing, and when one sentence in your price list changes you start over. Here you change the text and get a new version the same day, same character, same voice.',
            th: 'การถ่ายทำจริงต้องมีนักแสดง สตูดิโอ ไฟ และการตัดต่อ และเมื่อข้อความเพียงประโยคเดียวเปลี่ยน ก็ต้องเริ่มใหม่ ที่นี่แก้ข้อความแล้วได้เวอร์ชันใหม่ในวันเดียวกัน ตัวละครเดิม เสียงเดิม',
          },
          {
            he: 'הדמות גם לא מתפטרת. אם בשנה הבאה צריך עוד עשרה סרטונים, זה אותו פנים ואותו קול כמו בראשון.',
            en: 'The character also never quits. If you need ten more videos next year, it is the same face and the same voice as the first one.',
            th: 'ตัวละครก็ไม่ลาออก ถ้าปีหน้าต้องการอีกสิบคลิป ก็ยังเป็นใบหน้าและเสียงเดิมเหมือนคลิปแรก',
          },
        ],
      },
      {
        h: { he: 'איך זה עובד', en: 'How it works', th: 'ขั้นตอนเป็นอย่างไร' },
        bullets: [
          {
            he: 'אתם שולחים את הטקסט, או רק נקודות ואני כותב את התסריט.',
            en: 'You send the text, or just the points and I write the script.',
            th: 'คุณส่งข้อความมา หรือส่งแค่หัวข้อแล้วผมเขียนสคริปต์ให้',
          },
          {
            he: 'בוחרים דמות וקול. אפשר דמות מוכנה, דמות חדשה למותג, או הקול שלכם באישורכם.',
            en: 'You pick a character and a voice. An existing one, a new one built for your brand, or your own voice with your permission.',
            th: 'เลือกตัวละครและเสียง จะใช้ตัวที่มีอยู่ ตัวใหม่ที่สร้างให้แบรนด์คุณ หรือเสียงของคุณเองเมื่อคุณอนุญาต',
          },
          {
            he: 'מקבלים גרסה ראשונה לאישור, עם כתוביות אם צריך.',
            en: 'You get a first version to approve, with subtitles if you want them.',
            th: 'รับเวอร์ชันแรกมาตรวจ พร้อมคำบรรยายถ้าต้องการ',
          },
          {
            he: 'מתקנים מה שצריך ומקבלים את הקבצים הסופיים, אנכי ורחב.',
            en: 'We fix whatever needs fixing and you get the final files, vertical and wide.',
            th: 'แก้ตามที่ต้องการ แล้วรับไฟล์สุดท้าย ทั้งแนวตั้งและแนวนอน',
          },
        ],
      },
    ],
    offer: {
      cta: { he: 'שלחו לי טקסט', en: 'Send me a script', th: 'ส่งสคริปต์มาให้ผม' },
      title: {
        he: 'שלחו פסקה אחת. תקבלו אותה כסרטון.',
        en: 'Send one paragraph. Get it back as a video.',
        th: 'ส่งมาหนึ่งย่อหน้า รับกลับเป็นวิดีโอ',
      },
      body: {
        he: 'שלחו לי בוואטסאפ פסקה מהאתר שלכם, מהמחירון או מנוהל הדרכה. אחזיר לכם אותה כסרטון קצר עם דמות שמדברת, כדי שתראו איך זה נראה לפני שמזמינים.',
        en: 'Send me on WhatsApp a paragraph from your site, your price list or a training document. I will send it back as a short video with a talking character, so you see how it looks before you order anything.',
        th: 'ส่ง WhatsApp มาพร้อมหนึ่งย่อหน้าจากเว็บของคุณ รายการราคา หรือเอกสารฝึกอบรม ผมจะส่งกลับเป็นวิดีโอสั้นที่ตัวละครพูดให้ เพื่อให้คุณเห็นผลก่อนสั่งทำ',
      },
      promise: { he: 'בלי התחייבות, בלי טפסים.', en: 'No commitment, no forms.', th: 'ไม่มีข้อผูกมัด ไม่มีแบบฟอร์ม' },
      button: { he: 'דברו איתי בוואטסאפ', en: 'Talk to me on WhatsApp', th: 'คุยกับผมทาง WhatsApp' },
      message: {
        he: 'היי רפאל, ראיתי את סרטוני האווטאר. הטקסט שלי: ',
        en: 'Hi Refael, I saw the avatar videos. My text: ',
        th: 'สวัสดีครับ/ค่ะ ราฟาเอล เห็นวิดีโออวตารแล้ว ข้อความของฉันคือ: ',
      },
    },
    faq: [
      {
        q: { he: 'כמה זמן לוקח לסרטון אחד?', en: 'How long does one video take?', th: 'หนึ่งคลิปใช้เวลานานแค่ไหน?' },
        a: {
          he: 'סרטון של 60 עד 90 שניות מתסריט מוכן חוזר תוך יום או שניים. אם צריך לכתוב תסריט, תוסיפו עוד יום.',
          en: 'A 60 to 90 second video from a ready script comes back within a day or two. If the script needs writing, add another day.',
          th: 'คลิป 60 ถึง 90 วินาทีจากสคริปต์ที่พร้อมแล้ว ได้กลับภายในหนึ่งถึงสองวัน ถ้าต้องเขียนสคริปต์ด้วย เพิ่มอีกหนึ่งวัน',
        },
      },
      {
        q: { he: 'הדמות מדברת עברית טבעית?', en: 'Does the character speak naturally?', th: 'ตัวละครพูดเป็นธรรมชาติไหม?' },
        a: {
          he: 'כן, בקול טבעי ועם שפתיים מסונכרנות. בעברית, באנגלית ובתאית. אפשר לשמוע דוגמה לפני שמזמינים.',
          en: 'Yes, in a natural voice with synced lips, in Hebrew, English and Thai. You can hear a sample before ordering.',
          th: 'ใช่ ด้วยเสียงธรรมชาติและปากขยับตรงกับคำพูด ทั้งภาษาไทย อังกฤษ และฮีบรู ฟังตัวอย่างก่อนสั่งได้',
        },
      },
      {
        q: { he: 'אפשר להשתמש בפנים שלי?', en: 'Can you use my own face?', th: 'ใช้หน้าของฉันเองได้ไหม?' },
        a: {
          he: 'כן, מתוך קליפ קצר שאתם מצלמים בטלפון, ובאישור בכתב שזה אתם. אחר כך אפשר להפיק סרטונים בלי לצלם שוב.',
          en: 'Yes, from a short clip you film on your phone, with written permission that it is you. After that we make videos without filming again.',
          th: 'ได้ จากคลิปสั้นที่คุณถ่ายด้วยมือถือ พร้อมหนังสืออนุญาตว่าเป็นคุณจริง หลังจากนั้นทำวิดีโอได้โดยไม่ต้องถ่ายอีก',
        },
      },
      {
        q: { he: 'מה אם אני צריך לשנות משפט אחרי שהסרטון מוכן?', en: 'What if I need to change a sentence after it is done?', th: 'ถ้าต้องแก้ประโยคหลังคลิปเสร็จแล้วล่ะ?' },
        a: {
          he: 'שולחים את המשפט החדש ואני מרנדר מחדש. אין צילום מחדש ואין צורך בשחקן, אז זה זול ומהיר.',
          en: 'Send the new sentence and I re-render. No reshoot and no actor needed, so it is cheap and fast.',
          th: 'ส่งประโยคใหม่มา แล้วผมเรนเดอร์ใหม่ ไม่ต้องถ่ายซ้ำและไม่ต้องใช้นักแสดง จึงถูกและเร็ว',
        },
      },
      {
        q: { he: 'מה אני מקבל בסוף?', en: 'What do I get at the end?', th: 'สุดท้ายได้อะไร?' },
        a: {
          he: 'קובץ mp4 בניצב ובאופק, עם כתוביות בקובץ נפרד אם ביקשתם. הקבצים שלכם לשימוש חופשי.',
          en: 'An mp4 in vertical and wide, with subtitles in a separate file if you asked for them. The files are yours to use freely.',
          th: 'ไฟล์ mp4 ทั้งแนวตั้งและแนวนอน พร้อมไฟล์คำบรรยายแยกถ้าขอไว้ ไฟล์เป็นของคุณ ใช้ได้อย่างอิสระ',
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
