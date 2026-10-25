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
  '/customer-service': {
    path: '/customer-service',
    crumb: { he: 'נציג שירות AI', en: 'AI customer service', th: 'บริการลูกค้า AI' },
    h1: {
      he: 'נציג שירות שמכיר את העסק שלכם. ולא הולך הביתה.',
      en: 'A customer service agent that knows your business. And never goes home.',
      th: 'พนักงานบริการลูกค้าที่รู้จักธุรกิจของคุณ และไม่เคยเลิกงาน',
    },
    lead: {
      he: 'עונה ללקוחות 24/7 מתוך המידע של העסק, קובע תורים ביומן, שומר לידים ומעביר אליכם רק את מה שבאמת צריך אתכם. אתם בוחרים איך הוא נראה: אווטאר עם פנים, קול בטלפון, או צ׳אט באתר ובוואטסאפ.',
      en: 'Answers customers 24/7 from your own business info, books appointments into your calendar, saves every lead and passes you only what really needs you. You choose how it shows up: an avatar with a face, a voice on the phone, or chat on your site and WhatsApp.',
      th: 'ตอบลูกค้าตลอด 24 ชม. จากข้อมูลธุรกิจของคุณเอง นัดคิวลงปฏิทิน เก็บทุกลีด และส่งต่อให้คุณเฉพาะเรื่องที่ต้องใช้คุณจริงๆ คุณเลือกได้ว่าจะให้มาในรูปแบบไหน อวตารที่มีใบหน้า เสียงทางโทรศัพท์ หรือแชทบนเว็บและ WhatsApp',
    },
    media: {
      he: { src: '/media/maya_speaking_he.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16' },
      en: { src: '/media/maya_speaking_en.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16' },
      th: { src: '/media/maya_speaking_th.mp4', poster: '/media/maya_speaking_poster.jpg', ratio: '9/16' },
    },
    live: false,
    proof: [
      { n: '24/7', label: { he: 'עונה גם בלילה ובשבת', en: 'answers nights and weekends', th: 'ตอบได้ทั้งกลางคืนและวันหยุด' } },
      { n: '3', label: { he: 'שפות: עברית, אנגלית, תאית', en: 'languages: Hebrew, English, Thai', th: 'ภาษา: ไทย อังกฤษ ฮีบรู' } },
      { n: '3', label: { he: 'דרכים: אווטאר, קול, צ׳אט', en: 'ways: avatar, voice, chat', th: 'รูปแบบ: อวตาร เสียง แชท' } },
    ],
    modes: [
      {
        icon: 'avatar',
        title: { he: 'אווטאר עם פנים', en: 'Avatar with a face', th: 'อวตารที่มีใบหน้า' },
        body: {
          he: 'דמות שמדברת בקול עם שפתיים מסונכרנות. הכי זוכר, הכי מרשים.',
          en: 'A character that talks out loud with synced lips. The most memorable option.',
          th: 'ตัวละครที่พูดด้วยเสียง ปากขยับตามคำพูด จดจำง่ายที่สุด',
        },
        where: { he: 'באתר, במסך בלובי או בחנות, בקיוסק', en: 'On your site, a lobby or store screen, a kiosk', th: 'บนเว็บ จอในล็อบบี้หรือร้าน หรือคีออสก์' },
      },
      {
        icon: 'voice',
        title: { he: 'סוכן קולי', en: 'Voice agent', th: 'เอเจนต์เสียง' },
        body: {
          he: 'שיחה בקול, בזמן אמת, בלי מסך. אפשר גם בקול המשובט שלכם, באישורכם.',
          en: 'A real-time spoken conversation, no screen needed. Can use a clone of your own voice, with your permission.',
          th: 'คุยด้วยเสียงแบบเรียลไทม์ ไม่ต้องมีจอ ใช้เสียงโคลนของคุณเองได้ เมื่อคุณอนุญาต',
        },
        where: { he: 'בטלפון, בכפתור "דברו איתנו" באתר', en: 'On the phone, a "talk to us" button on your site', th: 'ทางโทรศัพท์ หรือปุ่ม "คุยกับเรา" บนเว็บ' },
      },
      {
        icon: 'chat',
        title: { he: 'צ׳אט', en: 'Chat', th: 'แชท' },
        body: {
          he: 'הכי מהיר להקים והכי זול להריץ. אותו מוח, אותם כלים.',
          en: 'Fastest to set up and cheapest to run. Same brain, same tools.',
          th: 'ตั้งค่าเร็วที่สุด ค่าใช้จ่ายต่ำที่สุด สมองเดียวกัน เครื่องมือเดียวกัน',
        },
        where: { he: 'וואטסאפ, אינסטגרם, מסנג׳ר, צ׳אט באתר', en: 'WhatsApp, Instagram, Messenger, website chat', th: 'WhatsApp, Instagram, Messenger, LINE, แชทบนเว็บ' },
      },
    ],
    tools: [
      {
        title: { he: 'ידע של העסק (RAG)', en: 'Your business knowledge (RAG)', th: 'ความรู้ของธุรกิจคุณ (RAG)' },
        body: { he: 'מחירון, שעות, מדיניות, קטלוג, PDFs. עונה רק מתוכם, לא ממציא.', en: 'Price list, hours, policies, catalog, PDFs. Answers only from them, never makes things up.', th: 'ราคา เวลาเปิด นโยบาย แคตตาล็อก PDF ตอบจากข้อมูลเหล่านี้เท่านั้น ไม่แต่งเอง' },
      },
      {
        title: { he: 'יומן ותורים', en: 'Calendar and bookings', th: 'ปฏิทินและการจองคิว' },
        body: { he: 'בודק זמינות, קובע, מזיז ומבטל. שולח תזכורת ללקוח.', en: 'Checks availability, books, moves and cancels. Sends the customer a reminder.', th: 'เช็กเวลาว่าง จอง เลื่อน และยกเลิก ส่งการแจ้งเตือนให้ลูกค้า' },
      },
      {
        title: { he: 'לידים ו־CRM', en: 'Leads and CRM', th: 'ลีดและ CRM' },
        body: { he: 'כל פנייה נשמרת עם שם, טלפון וצורך. ל־Google Sheets, מאנדיי או ה־CRM שלכם.', en: 'Every inquiry saved with name, phone and need. Into Google Sheets, Monday or your CRM.', th: 'ทุกการติดต่อบันทึกชื่อ เบอร์ และความต้องการ ลง Google Sheets, Monday หรือ CRM ของคุณ' },
      },
      {
        title: { he: 'זיכרון לקוח', en: 'Customer memory', th: 'จำลูกค้าได้' },
        body: { he: '"אני זה שדיבר אתמול" והוא זוכר על מה דיברתם.', en: '"It\'s me from yesterday" and it remembers what you talked about.', th: '"คนที่คุยเมื่อวานค่ะ" แล้วมันจำได้ว่าคุยอะไรกันไว้' },
      },
      {
        title: { he: 'העברה לאדם', en: 'Human handoff', th: 'ส่งต่อให้คนจริง' },
        body: { he: 'שאלה רגישה, לקוח כועס או עסקה גדולה? מעביר אליכם בוואטסאפ עם סיכום.', en: 'Sensitive question, upset customer or a big deal? It passes it to you on WhatsApp with a summary.', th: 'คำถามละเอียดอ่อน ลูกค้าไม่พอใจ หรือดีลใหญ่? ส่งต่อให้คุณทาง WhatsApp พร้อมสรุป' },
      },
      {
        title: { he: 'שלוש שפות', en: 'Three languages', th: 'สามภาษา' },
        body: { he: 'עברית, אנגלית ותאית. מזהה את השפה של הלקוח ועונה בה.', en: 'Hebrew, English and Thai. Detects the customer\'s language and answers in it.', th: 'ไทย อังกฤษ และฮีบรู รู้ว่าลูกค้าใช้ภาษาอะไรแล้วตอบเป็นภาษานั้น' },
      },
    ],
    blocks: [
      {
        h: { he: 'מה הוא עושה ביום רגיל', en: 'What it does on a normal day', th: 'ในหนึ่งวันมันทำอะไรบ้าง' },
        bullets: [
          { he: '"כמה עולה X?" עונה מהמחירון שלכם, מדויק.', en: '"How much is X?" Answers from your price list, exactly.', th: '"X ราคาเท่าไหร่คะ?" ตอบจากราคาของคุณ ตรงเป๊ะ' },
          { he: '"יש לכם זמן ב־15:00?" בודק ביומן וקובע.', en: '"Do you have 3pm free?" Checks the calendar and books it.', th: '"บ่ายสามว่างไหมคะ?" เช็กปฏิทินแล้วจองให้เลย' },
          { he: 'שאלות על שעות, משלוחים, החזרות ומדיניות, בלי לחכות לכם.', en: 'Questions on hours, shipping, returns and policy, without waiting for you.', th: 'คำถามเรื่องเวลาเปิด การจัดส่ง การคืนสินค้า และนโยบาย โดยไม่ต้องรอคุณ' },
          { he: 'בבוקר מחכה לכם סיכום: מי פנה, מה רצה, מה נקבע.', en: 'In the morning you get a summary: who reached out, what they wanted, what got booked.', th: 'ตอนเช้าคุณได้สรุป ใครติดต่อมา ต้องการอะไร นัดอะไรไว้แล้วบ้าง' },
        ],
      },
      {
        h: { he: 'כבר עובד אצל עסקים אמיתיים', en: 'Already working for real businesses', th: 'ใช้งานจริงกับธุรกิจแล้ว' },
        p: [
          {
            he: 'מספרה שקובעת תורים לבד, חנות ביוטי שעונה על מוצרים ומחירים, ובוט מכירות שמסנן לידים. אותה מערכת, מותאמת לכל עסק.',
            en: 'A salon that books its own appointments, a beauty store that answers on products and prices, and a sales bot that qualifies leads. One system, tailored to each business.',
            th: 'ร้านทำผมที่จองคิวเองได้ ร้านบิวตี้ที่ตอบเรื่องสินค้าและราคา และบอทขายที่คัดกรองลีด ระบบเดียว ปรับให้เข้ากับแต่ละธุรกิจ',
          },
        ],
      },
    ],
    offer: {
      cta: { he: 'בואו נבנה לכם אחד', en: "Let's build yours", th: 'มาสร้างของคุณกัน' },
      title: { he: 'ספרו לי על העסק. אראה לכם איך זה ייראה אצלכם.', en: "Tell me about your business. I'll show you how it would look for you.", th: 'เล่าเรื่องธุรกิจของคุณให้ฟัง แล้วผมจะให้ดูว่าจะออกมาเป็นแบบไหน' },
      body: {
        he: 'שלחו לי בוואטסאפ מה העסק עושה ואילו שאלות חוזרות אתם מקבלים. אחזור אליכם עם הצעה: אווטאר, קול או צ׳אט, ואילו כלים לחבר.',
        en: "Send me on WhatsApp what your business does and the questions you keep getting. I'll come back with a plan: avatar, voice or chat, and which tools to connect.",
        th: 'ส่ง WhatsApp มาบอกว่าธุรกิจคุณทำอะไร และลูกค้ามักถามอะไรซ้ำๆ แล้วผมจะกลับไปพร้อมแผน อวตาร เสียง หรือแชท และควรเชื่อมเครื่องมืออะไรบ้าง',
      },
      promise: { he: 'בלי התחייבות, בלי טפסים.', en: 'No commitment, no forms.', th: 'ไม่มีข้อผูกมัด ไม่มีแบบฟอร์ม' },
      button: { he: 'דברו איתי בוואטסאפ', en: 'Talk to me on WhatsApp', th: 'คุยกับผมทาง WhatsApp' },
      message: {
        he: 'היי רפאל, ראיתי את נציג השירות AI. העסק שלי: ',
        en: 'Hi Refael, I saw the AI customer service agent. My business: ',
        th: 'สวัสดีครับ/ค่ะ ราฟาเอล เห็นบริการลูกค้า AI แล้ว ธุรกิจของฉันคือ: ',
      },
    },
    faq: [
      {
        q: { he: 'ומה אם הוא לא יודע את התשובה?', en: "What if it doesn't know the answer?", th: 'ถ้ามันไม่รู้คำตอบล่ะ?' },
        a: {
          he: 'הוא אומר שהוא יבדוק, שומר את הפרטים ומעביר אליכם. הוא לא ממציא תשובות.',
          en: "It says it will check, saves the details and passes it to you. It doesn't invent answers.",
          th: 'มันจะบอกว่าขอเช็กก่อน เก็บข้อมูลไว้ แล้วส่งต่อให้คุณ ไม่แต่งคำตอบเอง',
        },
      },
      {
        q: { he: 'מה עדיף: אווטאר, קול או צ׳אט?', en: 'Which is better: avatar, voice or chat?', th: 'แบบไหนดีกว่า อวตาร เสียง หรือแชท?' },
        a: {
          he: 'תלוי איפה הלקוחות שלכם. רוב העסקים מתחילים בצ׳אט בוואטסאפ ומוסיפים אווטאר או קול אחר כך. המוח והכלים זהים, אז אין עבודה כפולה.',
          en: 'It depends where your customers are. Most businesses start with WhatsApp chat and add an avatar or voice later. The brain and tools are the same, so nothing is built twice.',
          th: 'ขึ้นอยู่กับว่าลูกค้าของคุณอยู่ที่ไหน ธุรกิจส่วนใหญ่เริ่มจากแชท แล้วค่อยเพิ่มอวตารหรือเสียงทีหลัง สมองและเครื่องมือเหมือนกัน จึงไม่ต้องสร้างซ้ำ',
        },
      },
      {
        q: { he: 'כמה זמן לוקח להקים?', en: 'How long does setup take?', th: 'ใช้เวลาติดตั้งนานแค่ไหน?' },
        a: {
          he: 'צ׳אט עם ידע ויומן עולה בדרך כלל תוך כמה ימים. אווטאר וקול לוקחים קצת יותר.',
          en: 'Chat with your knowledge and calendar is usually live within a few days. Avatar and voice take a little longer.',
          th: 'แชทที่มีข้อมูลธุรกิจและปฏิทินมักพร้อมใช้งานภายในไม่กี่วัน อวตารและเสียงใช้เวลานานกว่านิดหน่อย',
        },
      },
      {
        q: { he: 'זה מתחבר למערכות שכבר יש לי?', en: 'Does it connect to the systems I already use?', th: 'เชื่อมกับระบบที่ฉันใช้อยู่ได้ไหม?' },
        a: {
          he: 'כן. יומן גוגל, גוגל שיטס, וואטסאפ, מאנדיי ורוב מערכות ה־CRM. אם יש להן חיבור, מחברים.',
          en: 'Yes. Google Calendar, Google Sheets, WhatsApp, Monday and most CRMs. If it has an API, we connect it.',
          th: 'ได้ Google Calendar, Google Sheets, WhatsApp, LINE, Monday และ CRM ส่วนใหญ่ ถ้ามีช่องทางเชื่อมต่อ เราเชื่อมให้ได้',
        },
      },
      {
        q: { he: 'מה עם פרטיות?', en: 'What about privacy?', th: 'แล้วเรื่องความเป็นส่วนตัวล่ะ?' },
        a: {
          he: 'המידע של העסק ושל הלקוחות נשאר בחשבונות שלכם. אנחנו לא משתמשים בו לשום דבר אחר.',
          en: "Your business and customer data stays in your accounts. We don't use it for anything else.",
          th: 'ข้อมูลธุรกิจและลูกค้าอยู่ในบัญชีของคุณ เราไม่นำไปใช้ทำอย่างอื่น',
        },
      },
    ],
  },
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
