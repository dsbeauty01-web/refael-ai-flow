import FadeUp from './FadeUp';
import { useT } from './i18n';

type L = { he: string; en: string; th: string };

type Clip = {
  key: string;
  /** video per language; falls back to `he` */
  src: L;
  poster: L;
  title: L;
  desc: L;
  badge: L;
  link?: { href: string; label: L };
};

const CLIPS: Clip[] = [
  {
    key: 'real-live',
    src: { he: '/site/live-proof-he.mp4', en: '/site/live-proof-en.mp4', th: '/site/live-proof-th.mp4' },
    poster: { he: '/site/live-proof-he.jpg', en: '/site/live-proof-en.jpg', th: '/site/live-proof-th.jpg' },
    title: {
      he: 'לייב אמיתי ביוטיוב ובפייסבוק',
      en: 'A real live on YouTube and Facebook',
      th: 'ไลฟ์จริงบน YouTube และ Facebook',
    },
    desc: {
      he: 'תגובה אמיתית בצ׳אט בחרה אדום או כחול, והדמות ביצעה. אותה דמות, שתי פלטפורמות, שני סופים. 30.10.2026, בלי עריכה בשידור.',
      en: 'A real comment in the chat picked red or blue, and the host did it. Same character, two platforms, two endings. 30.10.2026, nothing edited on air.',
      th: 'คอมเมนต์จริงในแชทเลือกแดงหรือน้ำเงิน แล้วพิธีกรก็ทำตาม ตัวละครเดียว สองแพลตฟอร์ม สองตอนจบ 30.10.2026 ไม่ได้ตัดต่อตอนออกอากาศ',
    },
    badge: { he: 'לייב אמיתי', en: 'Real live', th: 'ไลฟ์จริง' },
    link: {
      href: 'https://www.youtube.com/watch?v=aYT8QPcfp1g',
      label: { he: 'לשידור המלא ביוטיוב', en: 'Watch the full live on YouTube', th: 'ดูไลฟ์เต็มบน YouTube' },
    },
  },
  {
    key: 'maya-test',
    src: { he: '/site/maya-live-test.mp4', en: '/site/maya-live-test.mp4', th: '/site/maya-live-test.mp4' },
    poster: { he: '/site/maya-live-test.jpg', en: '/site/maya-live-test.jpg', th: '/site/maya-live-test.jpg' },
    title: {
      he: 'מיה מוכרת תיק בלייב',
      en: 'Maya sells a bag on live',
      th: 'มายาขายกระเป๋าบนไลฟ์',
    },
    desc: {
      he: 'מבקשים לראות את התיק מקרוב ולפתוח אותו. היא עונה בשם, בקול, ועושה את זה. מתוך לייב בדיקה פרטי, תגובות לדוגמה.',
      en: 'Asked to see the bag up close and open it, she answers by name, out loud, and does it. From a private test live, sample comments, in Hebrew.',
      th: 'มีคนขอดูกระเป๋าใกล้ ๆ และให้เปิด เธอตอบด้วยชื่อ ด้วยเสียง แล้วทำให้ดู จากไลฟ์ทดสอบส่วนตัว คอมเมนต์ตัวอย่าง ภาษาฮีบรู',
    },
    badge: { he: 'לייב בדיקה', en: 'Test live', th: 'ไลฟ์ทดสอบ' },
  },
];

function ClipCard({ clip }: { clip: Clip }) {
  const { pick } = useT();
  const p = (l: L) => pick(l.he, l.en, l.th);
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black">
        <video
          key={p(clip.src)}
          src={p(clip.src)}
          poster={p(clip.poster)}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <span className="mt-5 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-live-a">{p(clip.badge)}</span>
      <h3 className="mt-1 text-[1.15rem] font-semibold text-ink text-center">{p(clip.title)}</h3>
      <p className="mt-2 text-[0.9rem] text-muted-foreground text-center max-w-[320px] leading-relaxed">{p(clip.desc)}</p>
      {clip.link && (
        <a
          href={clip.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-[0.88rem] font-semibold text-live-a underline underline-offset-4"
        >
          {p(clip.link.label)}
        </a>
      )}
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
              {pick('לא עוד סרטון AI. לייב.', 'Not another AI video. A live.', 'ไม่ใช่คลิป AI ธรรมดา นี่คือไลฟ์')}
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[560px] mx-auto leading-relaxed">
              {pick(
                'הדמות מדברת, השפתיים זזות עם המילים, והתגובה בצ׳אט קובעת מה קורה. בזמן אמת.',
                'The host talks, the lips move with the words, and the comment in the chat decides what happens. In real time.',
                'พิธีกรพูด ปากขยับตามคำพูด และคอมเมนต์ในแชทเป็นตัวกำหนดว่าจะเกิดอะไรขึ้น แบบเรียลไทม์'
              )}
            </p>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="grid gap-12 sm:grid-cols-2 justify-items-center max-w-[720px] mx-auto">
            {CLIPS.map((clip) => (
              <ClipCard key={clip.key} clip={clip} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
