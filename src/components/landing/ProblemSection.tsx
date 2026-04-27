import { PhoneOff, TrendingDown, DollarSign } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const problems = [
  {
    icon: PhoneOff,
    he: 'אף אחד לא עונה',
    en: "Nobody's answering",
    heDesc: 'לקוח מתקשר ב-9 בערב. אתה בבית. הוא הלך למתחרה.',
    enDesc: 'A customer calls at 9pm. You\'re home. They went to a competitor.',
  },
  {
    icon: TrendingDown,
    he: 'האתר לא מוכר',
    en: "Your website doesn't sell",
    heDesc: 'אנשים נכנסים, מסתכלים, ויוצאים. אין מי שיגיד להם מה הם צריכים.',
    enDesc: 'People visit, browse, and leave. Nobody tells them what they need.',
  },
  {
    icon: DollarSign,
    he: 'עובדים עולים כסף',
    en: 'Staff costs keep rising',
    heDesc: 'פקידת קבלה, איש מכירות — כל אחד עולה אלפים בחודש.',
    enDesc: 'A receptionist, a salesperson — each costs thousands per month.',
  },
];

const ProblemSection = () => {
  const { ref, inView } = useInView();
  const { isHebrew } = useLanguage();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-section-mid overflow-hidden" ref={ref}>
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-destructive/40 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto text-center">
        <span className="text-[0.85rem] font-semibold uppercase tracking-widest text-coral">
          {isHebrew ? 'הבעיה' : 'The Problem'}
        </span>
        <h2 className={`text-[3.5rem] sm:text-[4rem] font-black mt-3 mb-1 tracking-tight ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
          {isHebrew ? 'כל יום אתה מפסיד לקוחות' : "Every Day You're Losing Customers"}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`glass rounded-3xl p-8 card-float transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-destructive/15 border border-destructive/30 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_hsl(0_84%_60%/0.25)]">
                <p.icon className="h-12 w-12 text-destructive" />
              </div>
              <h3 className={`text-[1.4rem] font-bold mb-3 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
                {isHebrew ? p.he : p.en}
              </h3>
              <p className={`text-[1.1rem] text-muted-foreground leading-relaxed ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
                {isHebrew ? p.heDesc : p.enDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
