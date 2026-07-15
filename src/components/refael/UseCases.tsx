import { useT } from './i18n';
import FadeUp from './FadeUp';

const CASES = [
  {
    he: { t: 'לובי משרדים', b: 'מקבל אורחים, מכוון לקומה הנכונה, עונה על שאלות בסיסיות.' },
    en: { t: 'Office lobby', b: 'Greets visitors, points them to the right floor, answers the basics.' },
  },
  {
    he: { t: 'מוזיאון', b: 'מדריך אינטראקטיבי, או דמות היסטורית שאפשר לדבר איתה.' },
    en: { t: 'Museum', b: 'An interactive guide, or a historical figure you can actually talk to.' },
  },
  {
    he: { t: 'אולם תצוגה', b: 'מציג את המוצר ועונה על שאלות של לקוחות — גם כשאין נציג פנוי.' },
    en: { t: 'Showroom', b: 'Presents the product and fields customer questions — even when no rep is free.' },
  },
  {
    he: { t: 'קליניקה', b: 'צ׳ק-אין, הכוונה, ומענה סבלני לשאלות שחוזרות על עצמן.' },
    en: { t: 'Clinic', b: 'Check-in, wayfinding, and patient answers to the questions that repeat all day.' },
  },
  {
    he: { t: 'בתוך האפליקציה שלכם', b: 'דמות חיה כרכיב במוצר — כמו נובה, מורת הריקוד לילדים.' },
    en: { t: 'Inside your app', b: 'A live character as a product component — like Nova, the kids\' dance teacher.' },
  },
];

export default function UseCases() {
  const { isHebrew, pick } = useT();
  return (
    <section id="uses" className="py-28 sm:py-36 px-5 bg-surface/40">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp>
          <h2 className={`${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1]`}>
            {pick('איפה זה עובד', 'Where it works')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => {
            const v = isHebrew ? c.he : c.en;
            return (
              <FadeUp key={i}>
                <div className="surface p-6 h-full">
                  <h3 className="text-[1.1rem] font-semibold text-foreground">{v.t}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground leading-[1.6]">{v.b}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}