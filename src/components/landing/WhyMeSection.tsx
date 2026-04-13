import { Zap, DollarSign, Target } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const items = [
  {
    icon: Zap,
    he: 'מהיר',
    en: 'Fast',
    heDesc: 'לא חודשים. ימים. הבוט שלך חי באתר תוך שבוע.',
    enDesc: 'Not months. Days. Your bot is live within a week.',
  },
  {
    icon: DollarSign,
    he: 'משתלם',
    en: 'Affordable',
    heDesc: 'מה שסוכנויות גובות ₪40K+, אני בונה בשבר מהמחיר.',
    enDesc: 'What agencies charge ₪40K+ for, I build at a fraction of the cost.',
  },
  {
    icon: Target,
    he: 'מותאם אישית',
    en: 'Custom Built',
    heDesc: 'כל בוט בנוי בדיוק לעסק שלך, עם הנתונים שלך.',
    enDesc: 'Every bot is built exactly for your business, with your data.',
  },
];

const WhyMeSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="why" className="py-24 px-4 sm:px-6 lg:px-8 bg-card" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-hebrew text-[3.5rem] font-black mb-1 text-right mx-auto max-w-xl" dir="rtl">למה דווקא אני?</h2>
        <p className="text-[2rem] font-semibold text-muted-foreground mb-16 text-left mx-auto max-w-xl">Why Work With Me</p>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-background rounded-2xl p-8 border border-border card-float transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-[56px] h-[56px] rounded-2xl gradient-blue flex items-center justify-center mx-auto mb-5">
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-hebrew text-[1.4rem] font-bold mb-0.5 text-right" dir="rtl">{item.he}</h3>
              <p className="text-[1rem] text-muted-foreground mb-3 text-left">{item.en}</p>
              <p className="font-hebrew text-[1.1rem] text-muted-foreground leading-relaxed text-right" dir="rtl">{item.heDesc}</p>
              <p className="text-[1rem] text-muted-foreground leading-relaxed mt-1 text-left">{item.enDesc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
