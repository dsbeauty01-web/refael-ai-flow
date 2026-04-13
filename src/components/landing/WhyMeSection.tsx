import { Zap, DollarSign, Target } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const items = [
  {
    icon: Zap,
    he: 'מהיר', en: 'Fast',
    heDesc: 'לא חודשים. ימים. הבוט שלך חי באתר תוך שבוע.',
    enDesc: 'Not months. Days. Your bot is live within a week.',
  },
  {
    icon: DollarSign,
    he: 'משתלם', en: 'Affordable',
    heDesc: 'מה שסוכנויות גובות ₪40K+, אני בונה בשבר מהמחיר.',
    enDesc: 'What agencies charge ₪40K+ for, I build at a fraction of the cost.',
  },
  {
    icon: Target,
    he: 'מותאם אישית', en: 'Custom Built',
    heDesc: 'כל בוט בנוי בדיוק לעסק שלך, עם הנתונים שלך.',
    enDesc: 'Every bot is built exactly for your business, with your data.',
  },
];

const WhyMeSection = () => {
  const { ref, inView } = useInView();
  const { isHebrew } = useLanguage();

  return (
    <section id="why" className="py-24 px-4 sm:px-6 lg:px-8 bg-card" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className={`text-[3.5rem] font-black mb-16 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
          {isHebrew ? 'למה דווקא אני?' : 'Why Work With Me'}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-background rounded-2xl p-8 border border-border card-float transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-[56px] h-[56px] rounded-2xl gradient-blue flex items-center justify-center mx-auto mb-5">
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-[1.4rem] font-bold mb-3 ${isHebrew ? 'font-hebrew' : ''}`}>
                {isHebrew ? item.he : item.en}
              </h3>
              <p className={`text-[1.1rem] text-muted-foreground leading-relaxed ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
                {isHebrew ? item.heDesc : item.enDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
