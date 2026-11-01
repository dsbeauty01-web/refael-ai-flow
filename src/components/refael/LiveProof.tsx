import FadeUp from './FadeUp';
import { useT } from './i18n';

type Clip = {
  youtubeId: string;
  title: { he: string; en: string; th: string };
  desc: { he: string; en: string; th: string };
  badge: { he: string; en: string; th: string };
};

const CLIPS: Clip[] = [
  {
    youtubeId: 'eBGCQIT66-I',
    title: {
      he: 'שפית AI בשידור חי',
      en: 'AI Chef, live on air',
      th: 'เชฟ AI ออกอากาศสด',
    },
    desc: {
      he: 'הצופים בוחרים מנה, היא מבשלת. בזמן אמת.',
      en: 'Viewers pick a dish, she cooks it. In real time.',
      th: 'ผู้ชมเลือกเมนู เธอทำอาหารให้ดู แบบเรียลไทม์',
    },
    badge: {
      he: 'שידור חי',
      en: 'Live broadcast',
      th: 'ถ่ายทอดสด',
    },
  },
  {
    youtubeId: 'JDXMUKMIQK8',
    title: {
      he: 'זארה מוכרת בשידור חי',
      en: 'Zara sells live',
      th: 'ซาร่าขายของสด',
    },
    desc: {
      he: 'הצופים מצביעים, זארה מציגה את המוצר ומוסיפה לעגלה. עם לינק אמיתי.',
      en: 'Viewers vote, Zara shows the product and adds to cart. With a real buy link.',
      th: 'ผู้ชมโหวต ซาร่าโชว์สินค้าแล้วเพิ่มลงตะกร้า พร้อมลิงก์ซื้อจริง',
    },
    badge: {
      he: 'הצבעה + קנייה',
      en: 'Vote + buy',
      th: 'โหวต + ซื้อ',
    },
  },
];

function ClipCard({ clip }: { clip: Clip }) {
  const { pick } = useT();
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${clip.youtubeId}?rel=0&modestbranding=1`}
          title={pick(clip.title.he, clip.title.en, clip.title.th)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-red-500/90 text-white text-[0.7rem] font-bold px-2.5 py-1 rounded-full pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {pick(clip.badge.he, clip.badge.en, clip.badge.th)}
        </span>
      </div>
      <h3 className="mt-5 text-[1.15rem] font-semibold text-ink text-center">
        {pick(clip.title.he, clip.title.en, clip.title.th)}
      </h3>
      <p className="mt-2 text-[0.9rem] text-muted-foreground text-center max-w-[300px] leading-relaxed">
        {pick(clip.desc.he, clip.desc.en, clip.desc.th)}
      </p>
    </div>
  );
}

export default function LiveProof() {
  const { pick, fontDisplay } = useT();
  return (
    <section id="proof" className="py-24 sm:py-32 px-5 bg-gradient-to-b from-paper to-white dark:from-midnight dark:to-midnight/80">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-live-a">
              {pick('הוכחה חיה', 'Live proof', 'พิสูจน์ได้สด')}
            </span>
            <h2 className={`mt-3 ${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] text-ink`}>
              {pick('לא רק מדברים. עושים.', "We don't just talk. We ship.", 'ไม่ได้แค่พูด ทำจริง')}
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[560px] mx-auto leading-relaxed">
              {pick(
                'קליפים אמיתיים משידורים חיים. הצופים מצביעים, ה-AI מגיב בזמן אמת.',
                'Real clips from live broadcasts. Viewers vote, the AI reacts in real time.',
                'คลิปจริงจากการถ่ายทอดสด ผู้ชมโหวต AI ตอบสนองแบบเรียลไทม์'
              )}
            </p>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="grid gap-10 sm:grid-cols-2 justify-items-center max-w-[700px] mx-auto">
            {CLIPS.map((clip) => (
              <ClipCard key={clip.youtubeId} clip={clip} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
