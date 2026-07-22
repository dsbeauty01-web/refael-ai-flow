import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Eye, Wand2, Navigation, Brain, Hand, Drama, Smile, ShieldCheck,
  BarChart3, Moon, Calendar, RefreshCw, Mail, Database, MessageSquare, Plug,
} from 'lucide-react';
import { useT } from '@/components/refael/i18n';
import FadeUp from '@/components/refael/FadeUp';

/** A muted looping clip in a lit panel — real production footage, no sound. */
function Clip({ src, overlay }: { src: string; overlay?: ReactNode }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="relative mx-auto w-[min(78vw,320px)]">
      <div className="absolute -inset-8 stage-glow pointer-events-none" aria-hidden />
      <div className="relative stage px-4 pt-4 overflow-hidden">
        <video
          ref={ref}
          src={seen ? src : undefined}
          poster="/media/maya_poster.jpg"
          autoPlay muted playsInline loop
          className="relative w-full h-auto blend-white"
        />
        {overlay}
        <div className="absolute inset-x-10 bottom-3 h-6 avatar-floor pointer-events-none" aria-hidden />
      </div>
    </div>
  );
}

/** The unique feature, composited live: Maya holds a card, real data on it. */
function LiveSignOverlay() {
  const { pick } = useT();
  return (
    <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="bg-white/95 rounded-lg shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] px-3.5 py-3 flex items-center gap-3 border border-live-a/30">
        <div className="text-right leading-tight">
          <div className="text-[0.62rem] font-semibold text-[#0e1320]/55 tracking-wide">{pick('התור שלך', 'Your number')}</div>
          <div className="font-mono-num text-[1.4rem] font-bold text-[#0e1320]">4</div>
          <div className="text-[0.6rem] text-[#0e1320]/70 whitespace-nowrap">{pick('ד״ר לוי · 10:30', 'Dr. Levi · 10:30')}</div>
        </div>
        <FauxQR />
      </div>
    </div>
  );
}

function FauxQR() {
  const cells = [
    1,1,1,0,1,1,1, 1,0,1,0,0,0,1, 1,0,1,1,1,0,1,
    1,0,1,0,1,0,1, 1,1,1,0,1,1,1, 0,0,0,1,0,0,0, 1,1,0,1,1,0,1,
  ];
  return (
    <svg width="42" height="42" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden>
      <rect width="7" height="7" fill="#fff" />
      {cells.map((c, i) => c ? <rect key={i} x={i % 7} y={Math.floor(i / 7)} width="1" height="1" fill="#0e1320" /> : null)}
    </svg>
  );
}

/** A big alternating feature row: footage on one side, words on the other. */
function FeatureRow({ icon, kicker, title, body, clip, flip = false }: {
  icon: ReactNode; kicker: string; title: string; body: string; clip: ReactNode; flip?: boolean;
}) {
  return (
    <FadeUp>
      <div className={`grid gap-8 lg:gap-14 lg:grid-cols-2 items-center ${flip ? 'lg:[direction:ltr]' : ''}`}>
        <div className={flip ? 'lg:order-2 lg:[direction:rtl]' : ''}>
          <div className="inline-flex items-center gap-2.5 text-live-a mb-4">
            <span className="w-9 h-9 rounded-xl bg-live-a/12 flex items-center justify-center">{icon}</span>
            <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">{kicker}</span>
          </div>
          <h3 className="text-[1.7rem] sm:text-[2rem] font-bold text-ink leading-tight">{title}</h3>
          <p className="mt-4 text-[1.05rem] text-ink/75 leading-[1.7] max-w-[520px]">{body}</p>
        </div>
        <div className={flip ? 'lg:order-1 lg:[direction:rtl]' : ''}>{clip}</div>
      </div>
    </FadeUp>
  );
}

/** A compact capability card for the grid. */
function Card({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <FadeUp className="h-full">
      <div className="surface h-full p-6 sm:p-7">
        <span className="inline-flex w-11 h-11 rounded-xl bg-live-a/12 items-center justify-center text-live-a mb-4">{icon}</span>
        <h3 className="text-[1.15rem] font-bold text-ink">{title}</h3>
        <div className="mt-2.5 text-[0.95rem] text-ink/70 leading-[1.65] space-y-2">{children}</div>
      </div>
    </FadeUp>
  );
}

export default function WowList() {
  const { pick, fontDisplay } = useT();

  return (
    <section id="what" className="relative py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            {pick('מה היא יודעת לעשות', 'What she can do')}
          </p>
          <h2 className={`${fontDisplay} mt-3 text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink max-w-[760px]`}>
            {pick('כל שורה כאן היא פיצ׳ר אמיתי — לא הבטחה.', 'Every line here is a real feature — not a promise.')}
          </h2>
        </FadeUp>

        {/* Three priority visuals, told big */}
        <div className="mt-16 space-y-20">
          <FeatureRow
            icon={<Eye className="w-5 h-5" />}
            kicker={pick('היא רואה אותך', 'She sees you')}
            title={pick('מברכת אותך לפני שאמרת מילה', 'She greets you before you say a word')}
            body={pick(
              'מצלמה דיסקרטית מעל המסך. לקוח מתקרב — מאיה מזדקפת, מנופפת ומברכת. לקוח קבוע? היא מזהה לפי היומן: "שלום מר כהן! ד״ר לוי מחכה לך ב-10."',
              'A discreet camera above the screen. A customer approaches — Maya straightens, waves and greets them. A regular? She recognises them from the calendar: "Hello Mr. Cohen! Dr. Levi is expecting you at 10."'
            )}
            clip={<Clip src="/media/maya_welcome.mp4" />}
          />

          <FeatureRow
            flip
            icon={<Wand2 className="w-5 h-5" />}
            kicker={pick('השלט החי', 'The living sign')}
            title={pick('היא מרימה כרטיס — והמידע שלך מופיע עליו בזמן אמת', 'She lifts a card — and your live data appears on it')}
            body={pick(
              'תנועה אנושית ומידע חי, בשוט אחד: מספר התור שלך, QR לטופס, הוראות הגעה. הפיצ׳ר שאין לאף אחד בעולם — והלקוחות מצלמים אותו.',
              'Human motion and live data in a single shot: your queue number, a QR to the form, directions. The feature no one else in the world has — and customers film it.'
            )}
            clip={<Clip src="/media/maya_nod.mp4" overlay={<LiveSignOverlay />} />}
          />

          <FeatureRow
            icon={<Navigation className="w-5 h-5" />}
            kicker={pick('היא מצביעה על העולם האמיתי', 'She points at the real world')}
            title={pick('"חדר ההמתנה? שם משמאל" — והיד מצביעה לכיוון הנכון', '"The waiting room? Just there on the left" — and her hand points the right way')}
            body={pick(
              'כיול חד-פעמי בהתקנה מלמד אותה את החלל שלכם. הדמות הדיגיטלית הופכת לחלק מהמרחב הפיזי.',
              'A one-time calibration at install teaches her your space. The digital figure becomes part of the physical room.'
            )}
            clip={<Clip src="/media/maya_point_left.mp4" />}
          />
        </div>

        {/* The rest, as a capability grid */}
        <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card icon={<MessageSquare className="w-5 h-5" />} title={pick('היא מדברת — לא מקריאה', 'She speaks — she doesn\'t read aloud')}>
            <p>{pick(
              'קול-לקול אמיתי: שומעת, חושבת ועונה בקול ישראלי טבעי. אפשר להתפרץ לה באמצע משפט — היא עוצרת ומקשיבה, כמו בן אדם.',
              'True voice-to-voice: she hears, thinks and answers in a natural Israeli voice. Interrupt her mid-sentence — she stops and listens, like a person.'
            )}</p>
            <p className="text-[0.85rem] text-muted-foreground">{pick(
              'עברית · אנגלית · רוסית — עוברת שפה לבד לפי הלקוח. פרימיום: קול משובט ייחודי לעסק, שלכם לנצח.',
              'Hebrew · English · Russian — she switches by herself to match the customer. Premium: a unique cloned voice for your business, yours forever.'
            )}</p>
          </Card>

          <Card icon={<Brain className="w-5 h-5" />} title={pick('היא יודעת את העסק שלכם — ורק אותו', 'She knows your business — and only it')}>
            <p>{pick(
              'מוח ידע שנבנה מהחומרים שלכם: שירותים, מחירים, שעות, מדיניות, שאלות נפוצות. עונה אך ורק ממנו — בלי המצאות.',
              'A knowledge brain built from your own material: services, prices, hours, policy, FAQs. She answers only from it — no making things up.'
            )}</p>
            <p className="text-[0.85rem] text-muted-foreground">{pick('עדכון ידע = דקות, לא פיתוח.', 'Updating her knowledge takes minutes, not development.')}</p>
          </Card>

          <Card icon={<Hand className="w-5 h-5" />} title={pick('ידיים אמיתיות — היא מבצעת, לא רק עונה', 'Real hands — she acts, not just answers')}>
            <ul className="space-y-1.5 text-[0.92rem]">
              {[
                [<Calendar className="w-4 h-4" key="c" />, pick('קובעת תור אמיתי ביומן', 'Books a real appointment in the calendar')],
                [<RefreshCw className="w-4 h-4" key="r" />, pick('מבטלת ומזיזה תורים', 'Cancels and reschedules')],
                [<Mail className="w-4 h-4" key="m" />, pick('שולחת אישור + תזכורת', 'Sends confirmation + reminder')],
                [<Database className="w-4 h-4" key="d" />, pick('רושמת כל פנייה ל-CRM — אפס לידים אבודים', 'Logs every enquiry to the CRM — zero lost leads')],
                [<MessageSquare className="w-4 h-4" key="w" />, pick('מזעיקה אדם בוואטסאפ כשצריך', 'Escalates to a human on WhatsApp when needed')],
                [<Plug className="w-4 h-4" key="p" />, pick('מתחברת ליומן, וואטסאפ, CRM, טפסים (n8n)', 'Connects to calendar, WhatsApp, CRM, forms (n8n)')],
              ].map(([ic, tx], i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-live-a mt-0.5">{ic}</span><span>{tx}</span></li>
              ))}
            </ul>
          </Card>

          <Card icon={<Drama className="w-5 h-5" />} title={pick('היא מתנהגת כמו בן אדם', 'She behaves like a person')}>
            <p>{pick(
              'מהנהנת כשאתם מדברים · "בודקת ביומן, שנייה..." · מהנהנת רגע לפני "קבעתי" · מנפנפת רק בשלום ולהתראות · אף פעם לא קופאת.',
              'Nods while you talk · "checking the calendar, one sec..." · nods just before "booked" · waves only on hello and goodbye · never freezes.'
            )}</p>
            <p className="text-[0.85rem] text-muted-foreground">{pick('עשר דקות מולה — ולא תתפסו את הלולאה.', 'Ten minutes with her — and you won\'t catch the loop.')}</p>
          </Card>

          <Card icon={<Smile className="w-5 h-5" />} title={pick('היא מרגישה את הלקוח', 'She reads the customer')}>
            <p>{pick(
              'זיהוי סנטימנט: לקוח מחייך — היא מתחממת. לחוץ — מרגיעה ומקצרת. כועס — איפוס מנומס אחד, ואז העברה לאנושי.',
              'Sentiment awareness: a smiling customer — she warms up. Stressed — she calms and shortens. Angry — one polite reset, then a handover to a human.'
            )}</p>
            <p className="text-[0.85rem] text-muted-foreground">{pick('פרימיום: מצב מראה — הבעות פנים שמגיבות להבעות שלכם.', 'Premium: mirror mode — facial expressions that react to yours.')}</p>
          </Card>

          <Card icon={<ShieldCheck className="w-5 h-5" />} title={pick('גבולות ברזל', 'Iron limits')}>
            <p>{pick(
              'אפס ייעוץ רפואי/משפטי · מחירים = טווחים בלבד · מקרה דחוף ⇐ טלפון + התראה לאנושי · זמינות אך ורק מהיומן — היא לא ממציאה שעה, לעולם.',
              'Zero medical/legal advice · prices = ranges only · emergency ⇒ phone + human alert · availability strictly from the calendar — she never invents a slot.'
            )}</p>
            <p className="text-[0.85rem] text-muted-foreground">{pick('כל שיחה מתועדת.', 'Every conversation is logged.')}</p>
          </Card>

          <Card icon={<BarChart3 className="w-5 h-5" />} title={pick('דשבורד למנהל', 'A dashboard for the manager')}>
            <p>{pick(
              'כמה שיחות היום, כמה תורים נקבעו, מה שאלו הכי הרבה, איפה לקוחות נטשו, ואילו שאלות אין עליהן תשובה בידע — כלומר מה להוסיף.',
              'How many conversations today, how many bookings, what got asked most, where customers dropped off, and which questions have no answer yet — i.e. what to add.'
            )}</p>
            <p className="text-[0.85rem] text-muted-foreground">{pick('הפקידה הראשונה שמגישה לך דוח.', 'The first receptionist that hands you a report.')}</p>
          </Card>

          <Card icon={<Moon className="w-5 h-5" />} title={pick('והיא אף פעם לא...', 'And she never...')}>
            <p>{pick(
              'חולה · מאחרת · שוכחת · מתעצבנת · מתפטרת. עובדת מסביב לשעון, עולה פחות ממנוי חדר כושר ליום.',
              'gets sick · shows up late · forgets · loses her temper · quits. Works around the clock, costs less than a gym membership a day.'
            )}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
