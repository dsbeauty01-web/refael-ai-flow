import { Zap, DollarSign, Target } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const items = [
  {
    icon: Zap,
    he: 'מהיר',
    en: 'Fast',
    desc: 'לא חודשים. ימים. הבוט שלך חי באתר תוך שבוע.',
  },
  {
    icon: DollarSign,
    he: 'משתלם',
    en: 'Affordable',
    desc: 'מה שסוכנויות גובות ₪40K+, אני בונה בשבר מהמחיר.',
  },
  {
    icon: Target,
    he: 'מותאם אישית',
    en: 'Custom Built',
    desc: 'כל בוט בנוי בדיוק לעסק שלך, עם הנתונים שלך.',
  },
];

const WhyMeSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="why" className="py-24 px-4 sm:px-6 lg:px-8 bg-card" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-hebrew text-3xl sm:text-4xl font-bold mb-2">למה דווקא אני?</h2>
        <p className="text-muted-foreground mb-16">Why Work With Me</p>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-background rounded-2xl p-8 border border-border card-lift transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center mx-auto mb-5">
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-hebrew text-lg font-bold mb-1">{item.he}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.en}</p>
              <p className="font-hebrew text-sm text-muted-foreground leading-relaxed" dir="rtl">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
