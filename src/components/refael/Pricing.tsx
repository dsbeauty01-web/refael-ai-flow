import { useT } from './i18n';
import FadeUp from './FadeUp';

export default function Pricing() {
  const { isHebrew, pick } = useT();

  const cards = [
    {
      title: pick('הקמת אווטאר', 'Avatar setup'),
      price: '₪9,500',
      period: pick('חד-פעמי', 'one-time'),
      bullets: pick(
        [
          'עיצוב הדמות או דיגיטציה של דמות קיימת',
          'בניית אישיות וידע',
          'בנק תנועות מותאם',
          'התקנה ופריסה מלאה',
        ],
        [
          'Character design or digitizing an existing figure',
          'Personality & knowledge build',
          'Custom gesture bank',
          'Full deployment',
        ]
      ),
    },
    {
      title: pick('מנוי חודשי', 'Monthly'),
      price: '₪1,490',
      period: pick('לחודש', 'per month'),
      bullets: pick(
        [
          'שרת GPU ייעודי',
          'ניטור ותחזוקה',
          'עדכוני ידע ושיפורים שוטפים',
        ],
        [
          'Dedicated GPU server',
          'Monitoring & upkeep',
          'Ongoing knowledge updates & improvements',
        ]
      ),
    },
  ];

  return (
    <section id="pricing" className="py-28 sm:py-36 px-5">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp>
          <h2 className={`${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] max-w-[820px]`}>
            {pick('הקמה חד-פעמית. מנוי חודשי. זהו.', 'One setup fee. One monthly fee. That\'s it.')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <FadeUp key={i}>
              <div className="surface p-8 h-full flex flex-col">
                <p className="text-[0.85rem] tracking-widest uppercase text-muted-foreground">{c.title}</p>
                <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono-num text-[clamp(2.25rem,5vw,3.25rem)] text-foreground leading-none">{c.price}</span>
                  <span className="text-[0.95rem] text-muted-foreground">{c.period}</span>
                </div>
                <ul className="mt-8 space-y-3 text-[0.95rem] text-foreground/85">
                  {c.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-live-gradient flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-8">
          <p className="text-[0.9rem] text-muted-foreground max-w-[720px]">
            {pick(
              'לשם השוואה: פתרון Enterprise מקביל בחו״ל מתחיל בכ-$2,000 לחודש — עוד לפני ההקמה.',
              'For scale: a comparable enterprise solution abroad starts around $2,000/month — before setup.'
            )}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}