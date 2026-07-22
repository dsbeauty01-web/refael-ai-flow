import { useT } from '@/components/refael/i18n';
import FadeUp from '@/components/refael/FadeUp';
import { Camera, Mic, BrainCircuit, Wrench, User } from 'lucide-react';

/** Five icons, one line: senses → brain → hands → Maya on the screen. */
export default function TechStory() {
  const { pick, fontDisplay } = useT();

  const nodes = [
    { icon: <Camera className="w-5 h-5" />, label: pick('מצלמה', 'Camera') },
    { icon: <Mic className="w-5 h-5" />, label: pick('מיקרופון', 'Mic') },
    { icon: <BrainCircuit className="w-5 h-5" />, label: pick('מוח (שפה + ידע)', 'Brain (language + knowledge)') },
    { icon: <Wrench className="w-5 h-5" />, label: pick('ידיים (יומן/מייל/CRM)', 'Hands (calendar/email/CRM)') },
    { icon: <User className="w-5 h-5" />, label: pick('מאיה על המסך', 'Maya on the screen') },
  ];

  return (
    <section id="tech" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[900px] mx-auto text-center">
        <FadeUp>
          <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            {pick('הסיפור הטכנולוגי', 'The technology')}
          </p>
          <h2 className={`${fontDisplay} mt-3 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.2] text-ink`}>
            {pick('לשכור טכנולוגיה — או לבנות נכס.', 'Renting technology — or building an asset.')}
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-6 text-[1.08rem] text-ink/80 leading-[1.8] max-w-[720px] mx-auto">
            {pick(
              'מאיה רצה על אותה משפחת מנועים שמאחורי מעבדות ה-AI הגדולות בעולם — בקוד פתוח, על שרתי GPU ייעודיים שלנו. בלי תשלום לפי דקה לספק זר, בלי שהנתונים שלכם מאמנים מודל של מישהו אחר. כשיוצא מנוע טוב יותר — והוא יוצא, כל חודש — מאיה משתדרגת.',
              'Maya runs on the same family of engines behind the world\'s biggest AI labs — open source, on our own dedicated GPU servers. No per-minute fee to a foreign vendor, and your data never trains someone else\'s model. When a better engine ships — and one does, every month — Maya upgrades.'
            )}
          </p>
        </FadeUp>

        <FadeUp>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-2 gap-y-6">
            {nodes.map((n, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-2 w-[7.5rem]">
                  <span className="w-14 h-14 rounded-2xl surface flex items-center justify-center text-live-a">{n.icon}</span>
                  <span className="text-[0.78rem] text-ink/70 leading-tight px-1">{n.label}</span>
                </div>
                {i < nodes.length - 1 && (
                  <span className="text-live-a/50 text-xl mx-1 -mt-6 select-none" aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
