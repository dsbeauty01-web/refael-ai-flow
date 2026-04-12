import { PhoneOff, TrendingDown, DollarSign } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const problems = [
  {
    icon: PhoneOff,
    he: 'אף אחד לא עונה',
    en: "Nobody's answering",
    desc: 'לקוח מתקשר ב-9 בערב. אתה בבית. הוא הלך למתחרה.',
  },
  {
    icon: TrendingDown,
    he: 'האתר לא מוכר',
    en: "Your website doesn't sell",
    desc: 'אנשים נכנסים, מסתכלים, ויוצאים. אין מי שיגיד להם מה הם צריכים.',
  },
  {
    icon: DollarSign,
    he: 'עובדים עולים כסף',
    en: 'Staff costs keep rising',
    desc: 'פקידת קבלה, איש מכירות — כל אחד עולה אלפים בחודש.',
  },
];

const ProblemSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-coral">The Problem</span>
        <h2 className="font-hebrew text-4xl sm:text-5xl font-black mt-3 mb-2">כל יום אתה מפסיד לקוחות</h2>
        <p className="text-lg text-muted-foreground mb-16">Every Day You're Losing Customers</p>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`bg-background rounded-2xl p-8 card-lift border border-border transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-5">
                <p.icon className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="font-hebrew text-xl font-bold mb-1">{p.he}</h3>
              <p className="text-base text-muted-foreground mb-3">{p.en}</p>
              <p className="font-hebrew text-base text-muted-foreground leading-relaxed" dir="rtl">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
