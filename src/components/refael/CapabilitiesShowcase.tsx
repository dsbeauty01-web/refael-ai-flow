import FadeUp from './FadeUp';
import { useT } from './i18n';

type Demo = {
  video: string;
  poster: string;
  name: { he: string; en: string; th: string };
  desc: { he: string; en: string; th: string };
  badge: { he: string; en: string; th: string };
  ratio: '9/16' | '4/5' | '16/9';
};

/** Big landscape proof videos shown as wide cards */
type ProofVideo = {
  video: string;
  poster: string;
  title: { he: string; en: string; th: string };
  subtitle: { he: string; en: string; th: string };
  badge: { he: string; en: string; th: string };
};

const PROOF_VIDEOS: ProofVideo[] = [
  {
    video: '/site/agent-ad.mp4',
    poster: '/site/agent-ad.jpg',
    title: { he: 'לא רק מנחה. סוכנת AI לעסק שלך.', en: "Not just a host. An AI agent for your business.", th: 'ไม่ใช่แค่พิธีกร แต่เป็น AI เอเจนต์สำหรับธุรกิจคุณ' },
    subtitle: {
      he: 'לינק קנייה, תגובה לתגובה, קביעת תור ביומן, לידים, תשלום. הכל אמיתי.',
      en: 'Buy link, comment reply, calendar booking, leads, payment. All real.',
      th: 'ลิงก์ซื้อ ตอบคอมเมนต์ จองปฏิทิน ลีด ชำระเงิน ทั้งหมดเป็นของจริง',
    },
    badge: { he: 'הוכחה חיה', en: 'Live proof', th: 'พิสูจน์สด' },
  },
  {
    video: '/site/cohost-product.mp4',
    poster: '/site/cohost-product.jpg',
    title: { he: 'שיתוף מסך: אדם + AI ביחד', en: 'Co-host: human + AI together', th: 'โค-โฮสต์: คนจริง + AI ด้วยกัน' },
    subtitle: {
      he: 'שני אנשים על מסך אחד. אחד מהם AI. שפתיים מסונכרנות, תגובה תוך 2.7 שניות.',
      en: 'Two people on one screen. One is AI. Lips in sync, 2.7s response time.',
      th: 'สองคนบนจอเดียว คนหนึ่งเป็น AI ริมฝีปากซิงค์ ตอบใน 2.7 วินาที',
    },
    badge: { he: 'חדש', en: 'New', th: 'ใหม่' },
  },
  {
    video: '/site/tools-showcase.mp4',
    poster: '/site/tools-showcase.jpg',
    title: { he: '5 כלים יורים בו-זמנית', en: '5 tools firing at once', th: '5 เครื่องมือทำงานพร้อมกัน' },
    subtitle: {
      he: 'לינק קנייה, ליד ל-Sheets, תור ליומן, התראה לבעל העסק, תשלום. מתוך שני שידורי ניסיון פרטיים.',
      en: 'Buy link, lead to Sheets, booking to Calendar, owner notified, payment. From two private test lives.',
      th: 'ลิงก์ซื้อ ลีดไป Sheets จองปฏิทิน แจ้งเจ้าของร้าน ชำระเงิน จากไลฟ์ทดสอบส่วนตัว 2 ครั้ง',
    },
    badge: { he: 'כלים אמיתיים', en: 'Real tools', th: 'เครื่องมือจริง' },
  },
];

const DEMOS: Demo[] = [
  {
    video: '/site/zara-skinread.mp4',
    poster: '/site/zara-skinread.jpg',
    name: { he: 'ניתוח עור אישי', en: 'Personal skin analysis', th: 'วิเคราะห์ผิวส่วนตัว' },
    desc: {
      he: 'הצופה שואל על סוג העור שלו, והדמות עונה עם המלצה מותאמת. בזמן אמת.',
      en: 'A viewer asks about their skin type, the host answers with a personalized recommendation. In real time.',
      th: 'ผู้ชมถามเกี่ยวกับประเภทผิว โฮสต์ตอบพร้อมคำแนะนำเฉพาะบุคคล แบบเรียลไทม์',
    },
    badge: { he: 'ייעוץ AI', en: 'AI consultation', th: 'ที่ปรึกษา AI' },
    ratio: '9/16',
  },
  {
    video: '/site/maya-gallery.mp4',
    poster: '/site/maya-gallery.jpg',
    name: { he: 'גלריה ומכירות אמנות', en: 'Gallery and art sales', th: 'แกลเลอรีและขายงานศิลปะ' },
    desc: {
      he: 'מיה מציגה יצירות אמנות בשידור חי, עונה לצופים ומוכרת. הגלריה שלא נסגרת.',
      en: 'Maya presents artwork on a live stream, answers viewers and sells. A gallery that never closes.',
      th: 'มายานำเสนองานศิลปะบนไลฟ์ ตอบผู้ชมและขาย แกลเลอรีที่ไม่มีวันปิด',
    },
    badge: { he: 'אמנות חיה', en: 'Live art', th: 'ศิลปะสด' },
    ratio: '9/16',
  },
  {
    video: '/site/professor-live.mp4',
    poster: '/site/professor-live.jpg',
    name: { he: 'מדריך AI למעבדה', en: 'AI lab guide', th: 'ไกด์ AI ห้องแล็บ' },
    desc: {
      he: 'דמות תלת-ממד שמדגימה ניסויים, עונה לשאלות ומלמדת. לכל גיל.',
      en: 'A 3D character that demonstrates experiments, answers questions and teaches. For any age.',
      th: 'ตัวละคร 3D ที่สาธิตการทดลอง ตอบคำถามและสอน สำหรับทุกวัย',
    },
    badge: { he: 'חינוך', en: 'Education', th: 'การศึกษา' },
    ratio: '9/16',
  },
  {
    video: '/site/zara-vote.mp4',
    poster: '/site/zara-vote.jpg',
    name: { he: 'הצבעה אינטראקטיבית', en: 'Interactive voting', th: 'โหวตแบบอินเทอร์แอคทีฟ' },
    desc: {
      he: 'הצבעה על ז\'קט רצה בתגובות, הדמות מגיבה לכל הצבעה בזמן אמת.',
      en: 'A vote on a jacket runs in the comments, the host reacts to every vote in real time.',
      th: 'มีการโหวตเลือกแจ็คเก็ตในคอมเมนต์ โฮสต์ตอบทุกโหวตแบบเรียลไทม์',
    },
    badge: { he: 'הצבעה חיה', en: 'Live voting', th: 'โหวตสด' },
    ratio: '9/16',
  },
  {
    video: '/site/cohost-human.mp4',
    poster: '/site/cohost-human.jpg',
    name: { he: 'רפאל + מיה ביחד', en: 'Refael + Maya together', th: 'ราฟาเอล + มายา ด้วยกัน' },
    desc: {
      he: 'אדם אמיתי ודמות AI מדברים יחד על מסך אחד. שיחה טבעית, לא מוכנה מראש.',
      en: 'A real person and an AI character talk together on one screen. Natural, unscripted.',
      th: 'คนจริงกับตัวละคร AI คุยกันบนจอเดียว สนทนาธรรมชาติ ไม่ได้เตรียมล่วงหน้า',
    },
    badge: { he: 'שיתוף מסך', en: 'Co-host', th: 'โค-โฮสต์' },
    ratio: '9/16',
  },
  {
    video: '/site/nova-kids.mp4',
    poster: '/site/nova-kids.jpg',
    name: { he: 'נובה מוכרת מוצרי ילדים', en: 'Nova sells kids products', th: 'โนวาขายสินค้าเด็ก' },
    desc: {
      he: 'דמות אנימציה שמדברת בגובה העיניים של הילד ומוכרת מוצרים עם מחיר על המסך.',
      en: 'An animated character that speaks at eye level and sells products with a price overlay on screen.',
      th: 'ตัวละครอนิเมชันที่พูดในระดับสายตาเด็กและขายสินค้าพร้อมราคาบนจอ',
    },
    badge: { he: 'מוצרי ילדים', en: 'Kids products', th: 'สินค้าเด็ก' },
    ratio: '9/16',
  },
];

function DemoCard({ demo }: { demo: Demo }) {
  const { pick } = useT();
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-[240px] rounded-2xl overflow-hidden shadow-2xl bg-black"
        style={{ aspectRatio: demo.ratio }}
      >
        <video
          src={demo.video}
          poster={demo.poster}
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-red-500/90 text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {pick(demo.badge.he, demo.badge.en, demo.badge.th)}
        </span>
      </div>
      <h3 className="mt-4 text-[1rem] font-semibold text-ink text-center">
        {pick(demo.name.he, demo.name.en, demo.name.th)}
      </h3>
      <p className="mt-1.5 text-[0.85rem] text-muted-foreground text-center max-w-[260px] leading-relaxed">
        {pick(demo.desc.he, demo.desc.en, demo.desc.th)}
      </p>
    </div>
  );
}

const ACTIONS = [
  {
    icon: '💬',
    title: { he: 'WhatsApp ומסנג\'ר', en: 'WhatsApp and Messenger', th: 'WhatsApp และ Messenger' },
    body: { he: 'שולחת הודעות, לינקים ומעקב אוטומטי. הלקוח מקבל תשובה גם ב-3 בלילה.', en: 'Sends messages, links and automatic follow-ups. The customer gets an answer even at 3 AM.', th: 'ส่งข้อความ ลิงก์ และติดตามอัตโนมัติ ลูกค้าได้คำตอบแม้ตี 3' },
  },
  {
    icon: '🛒',
    title: { he: 'מכירה ותשלום', en: 'Selling and checkout', th: 'ขายและชำระเงิน' },
    body: { he: 'מציגה מוצר, מראה מחיר, ושולחת לינק קנייה ישיר. מהתגובה להזמנה תוך שניות.', en: 'Shows a product, displays the price, and sends a direct buy link. From comment to order in seconds.', th: 'แสดงสินค้า แสดงราคา และส่งลิงก์ซื้อตรง จากคอมเมนต์ถึงออเดอร์ในไม่กี่วินาที' },
  },
  {
    icon: '📅',
    title: { he: 'קביעת תורים', en: 'Appointment booking', th: 'จองนัดหมาย' },
    body: { he: 'בודקת זמינות ביומן ומזמינה תור מהצ\'אט. בלי טפסים, בלי המתנה.', en: 'Checks calendar availability and books from the chat. No forms, no waiting.', th: 'เช็คปฏิทินว่างและจองจากแชท ไม่ต้องกรอกฟอร์ม ไม่ต้องรอ' },
  },
  {
    icon: '🧠',
    title: { he: 'ידע ו-RAG', en: 'Knowledge and RAG', th: 'ฐานความรู้และ RAG' },
    body: { he: 'מחוברת לכל המידע של העסק. מוצרים, מחירים, משלוחים, החזרות, שעות פעילות. תמיד מעודכנת.', en: 'Connected to all your business info. Products, prices, shipping, returns, hours. Always current.', th: 'เชื่อมกับข้อมูลธุรกิจทั้งหมด สินค้า ราคา การจัดส่ง การคืน เวลาทำการ อัปเดตเสมอ' },
  },
  {
    icon: '📊',
    title: { he: 'לידים ל-Google Sheets', en: 'Leads to Google Sheets', th: 'ลีดไปยัง Google Sheets' },
    body: { he: 'כל פנייה נשמרת אוטומטית. שם, טלפון, מה רצו, מתי פנו. בלי שתקלידו שורה.', en: 'Every inquiry saved automatically. Name, phone, what they wanted, when they reached out. Without you typing a line.', th: 'ทุกคำถามบันทึกอัตโนมัติ ชื่อ เบอร์ สิ่งที่ต้องการ เวลาติดต่อ ไม่ต้องพิมพ์เอง' },
  },
  {
    icon: '⚡',
    title: { he: 'פעולות מותאמות', en: 'Custom actions', th: 'การกระทำแบบกำหนดเอง' },
    body: { he: 'n8n מחבר את הדמות לכל כלי. שליחת SMS, עדכון CRM, הפקת חשבונית, כל דבר.', en: 'n8n connects the character to any tool. Send an SMS, update a CRM, generate an invoice, anything.', th: 'n8n เชื่อมตัวละครกับทุกเครื่องมือ ส่ง SMS อัปเดต CRM ออกใบแจ้งหนี้ ทุกอย่าง' },
  },
];

export default function CapabilitiesShowcase() {
  const { pick, fontDisplay } = useT();
  return (
    <section id="capabilities" className="py-24 sm:py-32 px-5 bg-gradient-to-b from-white to-paper dark:from-midnight/80 dark:to-midnight">
      <div className="max-w-[1160px] mx-auto">
        {/* Actions grid */}
        <FadeUp>
          <div className="text-center mb-14">
            <span className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-live-a">
              {pick('מה היא יכולה לעשות', 'What she can do', 'เธอทำอะไรได้บ้าง')}
            </span>
            <h2 className={`mt-3 ${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] text-ink`}>
              {pick(
                'לא רק מדברת. מבצעת.',
                "She doesn't just talk. She acts.",
                'ไม่ได้แค่พูด ลงมือทำจริง'
              )}
            </h2>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-24">
            {ACTIONS.map((a, i) => (
              <div key={i} className="surface p-6 hover:-translate-y-1 hover:border-live-a/40 transition-all duration-300">
                <span className="text-[1.5rem] leading-none" aria-hidden>{a.icon}</span>
                <h3 className="mt-3 text-[1.05rem] font-bold text-ink">
                  {pick(a.title.he, a.title.en, a.title.th)}
                </h3>
                <p className="mt-2 text-[0.9rem] text-muted-foreground leading-[1.65]">
                  {pick(a.body.he, a.body.en, a.body.th)}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Proof videos: big landscape cards */}
        <FadeUp>
          <div className="text-center mb-14">
            <span className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-live-a">
              {pick('הוכחות', 'Proof', 'พิสูจน์ให้เห็น')}
            </span>
            <h2 className={`mt-3 ${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] text-ink`}>
              {pick(
                'לא מצגת. הדבר האמיתי.',
                'Not a pitch. The real thing.',
                'ไม่ใช่พรีเซนต์ นี่คือของจริง'
              )}
            </h2>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="grid gap-6 mb-24">
            {PROOF_VIDEOS.map((pv) => (
              <div key={pv.video} className="surface overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <div className="grid lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-3 relative bg-black" style={{ aspectRatio: '16/9' }}>
                    <video
                      src={pv.video}
                      poster={pv.poster}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute top-3 start-3 z-10 inline-flex items-center gap-1.5 bg-red-500/90 text-white text-[0.72rem] font-bold px-2.5 py-1 rounded-full pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {pick(pv.badge.he, pv.badge.en, pv.badge.th)}
                    </span>
                  </div>
                  <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
                    <h3 className={`${fontDisplay} text-[clamp(1.2rem,2.5vw,1.6rem)] leading-[1.2] text-ink`}>
                      {pick(pv.title.he, pv.title.en, pv.title.th)}
                    </h3>
                    <p className="mt-3 text-[0.95rem] text-muted-foreground leading-[1.65]">
                      {pick(pv.subtitle.he, pv.subtitle.en, pv.subtitle.th)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Demo videos */}
        <FadeUp>
          <div className="text-center mb-14">
            <span className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-live-a">
              {pick('עוד דוגמאות', 'More demos', 'ตัวอย่างเพิ่มเติม')}
            </span>
            <h2 className={`mt-3 ${fontDisplay} text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.1] text-ink`}>
              {pick(
                'אותה דמות. כל תפקיד.',
                'Same character. Every role.',
                'ตัวละครเดิม ทุกบทบาท'
              )}
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
              {pick(
                'ייעוץ עור, הצבעה חיה, שיתוף מסך, מוצרי ילדים. אותה טכנולוגיה, דמות שמתאימה לעסק שלכם.',
                'Skin consult, live voting, co-host, kids products. Same tech, a character that fits your business.',
                'ที่ปรึกษาผิว โหวตสด โค-โฮสต์ สินค้าเด็ก เทคโนโลยีเดียวกัน ตัวละครที่เหมาะกับธุรกิจคุณ'
              )}
            </p>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4 justify-items-center">
            {DEMOS.map((demo) => (
              <DemoCard key={demo.video} demo={demo} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
