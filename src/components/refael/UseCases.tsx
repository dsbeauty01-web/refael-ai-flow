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
  const { isHebrew, pick, fontDisplay } = useT();
  return (
    <section id="uses" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink`}>
            {pick('איפה זה עובד', 'Where it works')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => {
            const v = isHebrew ? c.he : c.en;
            return (
              <FadeUp key={i}>
                <div className="surface p-6 h-full hover:-translate-y-1 hover:shadow-[0_20px_44px_-20px_rgba(14,19,32,0.18)] transition-all duration-300">
                  <h3 className="text-[1.1rem] font-bold text-ink">{v.t}</h3>
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