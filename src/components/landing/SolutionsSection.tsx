import { useInView } from '@/hooks/useInView';
import { ShoppingCart, Calendar, Video, MessageSquare, ShoppingBag, Check } from 'lucide-react';
import SoundBars from './SoundBars';
import avatarSpeaking from '@/assets/avatar-speaking.png';
import { useLanguage } from '@/contexts/LanguageContext';

const solutions = [
  {
    icon: ShoppingCart,
    heTitle: 'בוט מכירות חכם',
    enTitle: 'Smart Sales Bot',
    heDesc: 'הבוט מכיר כל מוצר, כל מחיר, כל מבצע. הוא ממליץ, מראה לינקים, ועוזר ללקוח לקנות.',
    enDesc: 'Knows every product, every price, every deal. Recommends, shows links, helps close.',
    heTags: ['חיפוש מוצרים', 'המלצות', 'לינקים לקנייה'],
    enTags: ['Product Search', 'Recommendations', 'Links to Buy'],
    heOld: 'עלות ארגונית: $10K+', enOld: 'Enterprise cost: $10K+',
    heNew: 'המחיר שלי: מנוי חודשי משתלם', enNew: 'My price: affordable monthly',
    visual: 'sales',
  },
  {
    icon: Calendar,
    heTitle: 'פקידת קבלה AI',
    enTitle: 'AI Receptionist',
    heDesc: 'בודקת יומן, קובעת תורים, אוספת פרטים. עובדת 24/7 בלי חופש מחלה. עם קלט קולי.',
    enDesc: 'Checks calendar, books appointments, collects details. Works 24/7 with voice input.',
    heTags: ['קלט קולי', 'Google Calendar', 'אישורים אוטומטיים'],
    enTags: ['Voice Input', 'Google Calendar', 'Auto Confirmations'],
    heOld: 'משכורת פקידה: ₪6K+/חודש', enOld: 'Receptionist salary: ₪6K+/mo',
    heNew: 'המחיר שלי: שבר מזה', enNew: 'My price: fraction of that',
    visual: 'calendar',
  },
  {
    icon: Video,
    heTitle: 'אווטאר מדבר',
    enTitle: 'Talking AI Avatar',
    heDesc: 'לא צ׳אטבוט. פנים אמיתיות שמדברות עם הלקוחות שלך. עם סינכרון שפתיים וקול טבעי.',
    enDesc: 'Not a chatbot. A real face that talks with lip-sync and natural voice.',
    heTags: ['סנכרון שפתיים', 'קול טבעי', 'תחושה אנושית'],
    enTags: ['Lip Sync', 'Natural Voice', 'Human Feel'],
    heOld: 'הפקת וידאו: $5K+', enOld: 'Video production: $5K+',
    heNew: 'אווטאר: תמיד פעיל, תמיד מעודכן', enNew: 'Avatar: always on, always updated',
    visual: 'avatar',
  },
];

const AnimatedSalesVisual = () => {
  const { isHebrew } = useLanguage();
  return (
    <div className="relative bg-secondary/50 rounded-2xl p-5 space-y-3 overflow-hidden">
      <div className="flex gap-2 items-start">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <MessageSquare className="h-4 w-4 text-primary" />
        </div>
        <div className="bg-card rounded-xl px-4 py-2.5 text-[1rem]">
          {isHebrew ? 'הראי לי תיקי עור מתחת ל-₪300' : 'Show me leather bags under ₪300'}
        </div>
      </div>
      <div className="flex gap-2 items-start justify-end">
        <div className="gradient-blue text-white rounded-xl px-4 py-2.5 text-[1rem] max-w-[240px]">
          {isHebrew ? 'הנה 3 אפשרויות עם משלוח חינם!' : 'Here are 3 options with free shipping!'}
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <ShoppingBag className="h-14 w-14 text-primary/40 animate-float" />
      </div>
    </div>
  );
};

const AnimatedCalendarVisual = () => (
  <div className="bg-secondary/50 rounded-2xl p-5">
    <div className="grid grid-cols-7 gap-1 text-center text-[0.85rem] text-muted-foreground mb-2">
      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-[1rem]">
      {Array.from({ length: 28 }, (_, i) => (
        <div key={i} className={`py-1.5 rounded relative ${[8, 14, 21].includes(i) ? 'gradient-coral text-white font-bold' : 'text-muted-foreground'}`}>
          {i + 1}
          {i === 14 && <Check className="absolute -top-1 -right-1 h-4 w-4 text-green-500 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }} />}
        </div>
      ))}
    </div>
  </div>
);

const AnimatedAvatarVisual = () => (
  <div className="flex flex-col items-center justify-center py-4 gap-3">
    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
      <img src={avatarSpeaking} alt="Talking avatar" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
    </div>
    <SoundBars count={5} height={24} color="hsl(217 91% 60% / 0.6)" />
    <div className="bg-card px-4 py-1.5 rounded-full text-[0.85rem] font-semibold border border-border shadow">Speaking...</div>
  </div>
);

const visuals: Record<string, React.ReactNode> = {
  sales: <AnimatedSalesVisual />,
  calendar: <AnimatedCalendarVisual />,
  avatar: <AnimatedAvatarVisual />,
};

const SolutionsSection = () => {
  const { ref, inView } = useInView();
  const { isHebrew } = useLanguage();

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[0.85rem] font-semibold uppercase tracking-widest text-primary">
            {isHebrew ? 'פתרונות' : 'Solutions'}
          </span>
          <h2 className={`text-[3.5rem] font-black mt-3 mb-1 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            {isHebrew ? 'מה אני בונה לך' : 'What I Build For You'}
          </h2>
        </div>

        <div className="space-y-8">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-8 items-center bg-card rounded-3xl border border-border p-6 sm:p-8 card-float transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                {visuals[s.visual]}
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-[1.6rem] font-bold ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? s.heTitle : s.enTitle}
                  </h3>
                </div>
                <p className={`text-[1.1rem] text-muted-foreground leading-relaxed mb-4 ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? s.heDesc : s.enDesc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isHebrew ? s.heTags : s.enTags).map(t => (
                    <span key={t} className={`text-[0.85rem] px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border ${isHebrew ? 'font-hebrew' : ''}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 bg-green-500/10 rounded-xl px-4 py-3 border border-green-500/20">
                  <p className={`text-[1rem] text-muted-foreground line-through ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? s.heOld : s.enOld}
                  </p>
                  <p className={`text-[1rem] text-primary font-bold ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? s.heNew : s.enNew}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
