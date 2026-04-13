import { PhoneOff, TrendingDown, DollarSign } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

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

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-[0.85rem] font-semibold uppercase tracking-widest text-coral">The Problem</span>
        <h2 className="font-hebrew text-[3.5rem] font-black mt-3 mb-1 text-right mx-auto max-w-2xl" dir="rtl">
          כל יום אתה מפסיד לקוחות
        </h2>
        <p className="text-[2rem] font-semibold text-muted-foreground mb-16 text-left mx-auto max-w-2xl">
          Every Day You're Losing Customers
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`bg-background rounded-2xl p-8 card-float border border-border transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-5">
                <p.icon className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="font-hebrew text-[1.4rem] font-bold mb-1 text-right" dir="rtl">{p.he}</h3>
              <p className="text-[1.1rem] text-muted-foreground mb-3 text-left">{p.en}</p>
              <p className="font-hebrew text-[1.1rem] text-muted-foreground leading-relaxed text-right" dir="rtl">{p.heDesc}</p>
              <p className="text-[1rem] text-muted-foreground leading-relaxed mt-1 text-left">{p.enDesc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
