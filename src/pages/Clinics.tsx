import { MessageCircle, Moon, PhoneIncoming, ShieldCheck } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { useSeo } from '@/components/site/Seo';
import { WHATSAPP_URL } from '@/config/avatars';
import { trackWhatsAppClick } from '@/lib/analytics';

/**
 * /clinics — the one landing page for aesthetic clinics (Hebrew only).
 * One offer, one demo, one WhatsApp button. Every channel sends traffic here.
 * Offer: 10 days free, no card, then ₪390 a month (Refael, 2026-11-17).
 */

const WA_TEXT = 'היי רפאל, אני רוצה לנסות 10 ימים חינם את העוזרת באתר שלי. כתובת האתר: ';
const WA_LINK = `${WHATSAPP_URL}?text=${encodeURIComponent(WA_TEXT)}`;

const POINTS = [
  {
    icon: Moon,
    title: 'עונה גם ב-23:04',
    text: 'רוב השאלות על טיפולים מגיעות בערב. העוזרת עונה מיד, בעברית, מתוך המידע של הקליניקה שלכם.',
  },
  {
    icon: PhoneIncoming,
    title: 'הליד מחכה לכם בבוקר',
    text: 'שם, טלפון ובמה המבקרת מתעניינת נשלחים אליכם לוואטסאפ. אתם רק מתקשרים.',
  },
  {
    icon: ShieldCheck,
    title: 'אנחנו מקימים הכול',
    text: 'שורת קוד אחת באתר. אנחנו בונים את הדמות, הקול והתשובות, ואתם מאשרים לפני שעולים לאוויר.',
  },
];

const STEPS = [
  'שולחים לנו את כתובת האתר בוואטסאפ.',
  'תוך כמה ימים העוזרת עולה באתר שלכם, בצבעים ובשם של הקליניקה.',
  '10 ימים בלי תשלום ובלי כרטיס אשראי. רואים יחד כמה פניות הגיעו.',
  'ביום העשירי מחליטים: ממשיכים ב-₪390 לחודש, או נפרדים כידידים.',
];

function WhatsAppButton({ source }: { source: string }) {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(source)}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
      שלחו לנו את כתובת האתר בוואטסאפ
    </a>
  );
}

const Clinics = () => {
  useSeo({
    path: '/clinics',
    title: 'עוזרת AI לאתר הקליניקה: 10 ימי ניסיון חינם | Refael.ai',
    description:
      'עוזרת AI בעברית באתר הקליניקה שלכם: עונה למבקרים 24/7 ושולחת לכם שם וטלפון לוואטסאפ. 10 ימי ניסיון חינם, בלי כרטיס אשראי.',
  });

  return (
    <SiteLayout whatsappMessage={WA_TEXT}>
      <div dir="rtl" lang="he" className="pt-28 pb-20 font-hebrew">
        <section className="mx-auto grid max-w-[1080px] items-center gap-10 px-5 md:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center md:text-start">
            <p className="text-sm font-semibold text-ink/55">לקליניקות אסתטיקה · עוזרת AI (לא נציגה אנושית)</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              מישהי שאלה באתר שלכם כמה עולה טיפול. מי ענה לה?
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              עוזרת AI בעברית יושבת בפינת האתר של הקליניקה, עונה למבקרים 24/7, ושולחת לכם את השם והטלפון
              שלהם לוואטסאפ.
            </p>
            <p className="mt-4 text-xl font-bold">10 ימי ניסיון חינם על האתר שלכם. בלי כרטיס אשראי.</p>
            <p className="mt-1 text-base text-ink/70">
              אחרי הניסיון: ₪390 לחודש. בלי דמי הקמה.
            </p>
            <div className="mt-7">
              <WhatsAppButton source="clinics_hero" />
            </div>
            <p className="mt-3 text-sm text-ink/50">בלי התחייבות. מבטלים בהודעת וואטסאפ.</p>
          </div>

          <div className="mx-auto w-full max-w-[320px]">
            <video
              className="w-full rounded-[28px] shadow-2xl"
              src="/m/clinic_demo_he.mp4"
              poster="/m/clinic_demo_poster.jpg"
              controls
              playsInline
              preload="none"
              aria-label="הדגמה של 12 שניות: מבקרת שואלת על מחיר טיפול ב-23:04, העוזרת עונה ושומרת את הפרטים"
            />
            <p className="mt-2 text-center text-xs text-ink/50">הדגמה. 12 שניות.</p>
          </div>
        </section>

        <section className="mx-auto mt-16 grid max-w-[1080px] gap-5 px-5 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-ink/10 bg-white/5 p-6">
              <Icon className="h-7 w-7 text-ink/70" aria-hidden />
              <h2 className="mt-3 text-xl font-bold">{title}</h2>
              <p className="mt-2 leading-relaxed text-ink/70">{text}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-[720px] px-5">
          <h2 className="text-center text-2xl font-extrabold md:text-3xl">איך הניסיון עובד</h2>
          <ol className="mt-6 space-y-3">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-ink/10 bg-white/5 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <WhatsAppButton source="clinics_bottom" />
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-ink/45">
            העוזרת היא בינה מלאכותית ומציגה את עצמה כך למבקרים. היא לא נותנת ייעוץ רפואי, ושיחות עשויות להישמר לצורך
            שיפור השירות.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
};

export default Clinics;
