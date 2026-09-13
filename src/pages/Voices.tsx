import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarCheck, Mic, Radio, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/components/refael/i18n';
import Footer from '@/components/refael/Footer';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'agent-id': string },
        HTMLElement
      >;
    }
  }
}

type Character = {
  id: string;
  agentId: string;
  icon: typeof BookOpen;
  /** stylized 3D portrait in /public/voices */
  img: string;
  /** gradient stops — the character's glow palette */
  orb: [string, string, string];
  name: [string, string];
  role: [string, string];
  desc: [string, string];
  quote: string;
};

const CHARACTERS: Character[] = [
  {
    id: 'storyteller',
    agentId: 'agent_6501m2ddnmd0ewks4mcayy2e54h4',
    icon: BookOpen,
    img: '/voices/storyteller.webp',
    orb: ['#F2C179', '#C77B3A', '#5C3212'],
    name: ['הסבא המספר', 'The Storyteller'],
    role: ['בן שבעים וחמש, זיכרון של שכונה שלמה', '75 years old, a whole neighborhood in his memory'],
    desc: [
      'מדבר לאט, עוצר בדיוק במקום הנכון, ותמיד יש לו עוד סיפור אחד מהשוק, מהצבא, מהחתונה של הדודה. שאלו אותו איך קוראים לכם — ותנו לו לקחת אתכם.',
      'Speaks slowly, pauses in exactly the right place, and always has one more story — the market, the army, the aunt’s wedding. Tell him your name and let him take you along.',
    ],
    quote: '״בוא, שב לידי רגע. בגילי כבר לא ממהרים לשום מקום…״',
  },
  {
    id: 'michal',
    agentId: 'agent_8101m2ddns2dfpe9bm80ejkj3ts8',
    icon: CalendarCheck,
    img: '/voices/michal.webp',
    orb: ['#7FE3DC', '#2FA8A0', '#0D4B47'],
    name: ['מיכל', 'Michal'],
    role: ['קבלה במרפאה — חדה, יעילה, חמה', 'Clinic reception — sharp, efficient, warm'],
    desc: [
      'עונה מהשנייה הראשונה, קובעת תור, אומרת בדיוק מה להביא — וכל המספרים והשעות במילים, כמו בן אדם. נסו לבקש תור ליום שלישי.',
      'Answers from the first second, books the appointment, tells you exactly what to bring — every number and hour spoken in words, like a person. Try booking a Tuesday slot.',
    ],
    quote: '״שלום, הגעתם למרפאת כהן, מדברת מיכל. איך אפשר לעזור?״',
  },
  {
    id: 'host-female',
    agentId: 'agent_9101m2b9ep1bem6ssxch9d9j5131',
    icon: Mic,
    img: '/voices/host-female.webp',
    orb: ['#D9A4F5', '#8B4FD8', '#3A1566'],
    name: ['המארחת', 'The Host'],
    role: ['שידור חי, אנרגיה של מכירה', 'Live broadcast, sales energy'],
    desc: [
      'קול משוכפל מהקלטה אמיתית. חמה, מהירה, יודעת להחזיק שיחה — הבסיס לכל סוכנת מכירה חיה שנבנה ללקוח.',
      'A voice cloned from a real recording. Warm, quick, holds a conversation — the base for every live sales agent we build for a client.',
    ],
    quote: '״שלום! איזה כיף שהתקשרת. ספרי לי רגע מה את מחפשת…״',
  },
  {
    id: 'host-male',
    agentId: 'agent_5501m2d2yc4jfwjtg17nz05w9xwm',
    icon: Radio,
    img: '/voices/host-male.webp',
    orb: ['#8FC7F2', '#3D7FC4', '#12365E'],
    name: ['המארח', 'The Host (male)'],
    role: ['שידור חי, נוכחות רגועה', 'Live broadcast, calm presence'],
    desc: [
      'הגרסה הגברית — אותה טכנולוגיה, טמפרמנט אחר. יציב, סבלני, מתאים לשירות, ייעוץ והנחיה.',
      'The male counterpart — same technology, different temperament. Steady, patient; fits service, consulting and guidance.',
    ],
    quote: '״שלום! כיף שהצטרפת. מה תרצו לשאול אותי?״',
  },
];

const WIDGET_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

function useConvaiScript(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = WIDGET_SRC;
    s.async = true;
    s.type = 'text/javascript';
    document.body.appendChild(s);
  }, [active]);
}

function Portrait({
  src,
  alt,
  colors,
  Icon,
}: {
  src: string;
  alt: string;
  colors: [string, string, string];
  Icon: typeof BookOpen;
}) {
  const [, b, c] = colors;
  return (
    <div className="relative mx-auto w-40 h-40 md:w-44 md:h-44">
      <div
        className="absolute -inset-3 rounded-full blur-2xl opacity-45 motion-safe:animate-pulse"
        style={{ background: `radial-gradient(circle at 50% 50%, ${b}, transparent 70%)` }}
        aria-hidden
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={640}
        height={640}
        className="relative w-full h-full rounded-full object-cover border-2"
        style={{ borderColor: `${b}88`, boxShadow: `0 8px 40px ${c}88` }}
      />
      <span
        className="absolute bottom-1 end-1 grid place-items-center w-9 h-9 rounded-full bg-paper/85 border border-ink/15 backdrop-blur"
        aria-hidden
      >
        <Icon className="text-ink/80" size={18} />
      </span>
    </div>
  );
}

const Voices = () => {
  const { language, isHebrew } = useLanguage();
  const { pick } = useT();
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  useConvaiScript(activeAgent !== null);

  return (
    <div
      key={language}
      className={`min-h-screen bg-paper text-ink ${isHebrew ? 'font-hebrew' : 'font-english'}`}
      dir={isHebrew ? 'rtl' : 'ltr'}
    >
      <header className="fixed top-0 inset-x-0 z-50 bg-paper/80 backdrop-blur-xl border-b border-ink/10">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between px-5 h-16">
          <Link to="/" className="text-[1.1rem] font-bold tracking-tight text-ink">
            Refael<span className="text-live-gradient">.ai</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[0.9rem] font-semibold text-ink/70 hover:text-ink transition"
          >
            {pick('חזרה לעמוד הראשי', 'Back to home', 'Back to home')}
            <ArrowRight className={`w-4 h-4 ${isHebrew ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-20">
        <section className="max-w-[1160px] mx-auto px-5 text-center">
          <p className="text-[0.85rem] font-semibold tracking-widest uppercase text-ink/50">
            {pick('קטלוג הקולות', 'Voice catalog', 'Voice catalog')}
          </p>
          <h1 className={`mt-3 text-4xl md:text-5xl ${isHebrew ? 'font-display-he' : 'font-display-en'}`}>
            {pick('דמויות שמדברות. באמת.', 'Characters that talk. Really.', 'Characters that talk. Really.')}
          </h1>
          <p className="mt-4 max-w-[52ch] mx-auto text-ink/65 leading-relaxed">
            {pick(
              'כל דמות כאן חיה — לוחצים, מדברים, והיא עונה בעברית בקול שלה ובאופי שלה. אלה הקולות שאנחנו בונים ללקוחות.',
              'Every character here is live — click, speak, and it answers in Hebrew with its own voice and temperament. These are the voices we build for clients.',
              'Every character here is live — click, speak, and it answers in Hebrew with its own voice and temperament.'
            )}
          </p>
        </section>

        <section className="max-w-[1160px] mx-auto px-5 mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {CHARACTERS.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeAgent === ch.agentId;
            return (
              <article
                key={ch.id}
                className={`rounded-2xl border bg-ink/[0.03] p-6 pt-8 flex flex-col gap-4 text-center transition
                  ${isActive ? 'border-ink/40' : 'border-ink/10 hover:border-ink/25'}`}
              >
                <Portrait
                  src={ch.img}
                  alt={pick(ch.name[0], ch.name[1], ch.name[1])}
                  colors={ch.orb}
                  Icon={Icon}
                />
                <div>
                  <h2 className="text-xl font-bold">{pick(ch.name[0], ch.name[1], ch.name[1])}</h2>
                  <p className="mt-1 text-[0.85rem] font-semibold text-ink/55">
                    {pick(ch.role[0], ch.role[1], ch.role[1])}
                  </p>
                </div>
                <p className="text-[0.9rem] leading-relaxed text-ink/70">
                  {pick(ch.desc[0], ch.desc[1], ch.desc[1])}
                </p>
                <p dir="rtl" lang="he" className="text-[0.9rem] text-ink/85 bg-ink/[0.05] rounded-xl px-4 py-3">
                  {ch.quote}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveAgent(isActive ? null : ch.agentId)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[0.95rem] font-bold transition
                      ${isActive ? 'bg-ink text-paper' : 'bg-ink/10 text-ink hover:bg-ink/20'}`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    {isActive
                      ? pick('בשיחה — לסגור', 'In call — close', 'In call — close')
                      : pick('לדבר איתי עכשיו', 'Talk to me now', 'Talk to me now')}
                  </button>
                  <a
                    href={`https://elevenlabs.io/app/talk-to?agent_id=${ch.agentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8rem] text-ink/45 hover:text-ink/70 transition"
                  >
                    {pick('או בחלון נפרד ↗', 'or in a separate window ↗', 'or in a separate window ↗')}
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        {activeAgent && (
          <>
            <p className="mt-10 text-center text-[0.85rem] text-ink/50">
              {pick(
                'החיבור נפתח בפינת המסך — אשרו גישה למיקרופון ודברו.',
                'The call opens at the corner of the screen — allow the microphone and speak.',
                'The call opens at the corner of the screen — allow the microphone and speak.'
              )}
            </p>
            <elevenlabs-convai key={activeAgent} agent-id={activeAgent} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Voices;
