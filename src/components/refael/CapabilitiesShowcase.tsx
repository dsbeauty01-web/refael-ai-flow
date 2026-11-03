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

export default function CapabilitiesShowcase() {
  const { pick, fontDisplay } = useT();
  return (
    <section id="capabilities" className="py-24 sm:py-32 px-5 bg-gradient-to-b from-white to-paper dark:from-midnight/80 dark:to-midnight">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-live-a">
              {pick('לא רק לייב', 'Beyond live selling', 'มากกว่าไลฟ์ขายของ')}
            </span>
            <h2 className={`mt-3 ${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] text-ink`}>
              {pick(
                'אותה דמות. כל תפקיד.',
                'Same character. Every role.',
                'ตัวละครเดิม ทุกบทบาท'
              )}
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
              {pick(
                'ייעוץ עור, גלריית אמנות, מדריך מעבדה, מוצרי ילדים. אותה טכנולוגיה, דמות שמתאימה לעסק שלכם.',
                'Skin consultation, art gallery, lab guide, kids products. Same tech, a character that fits your business.',
                'ที่ปรึกษาผิว แกลเลอรี ไกด์ห้องแล็บ สินค้าเด็ก เทคโนโลยีเดียวกัน ตัวละครที่เหมาะกับธุรกิจคุณ'
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
