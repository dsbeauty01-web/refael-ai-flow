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
    <div className="relative glass rounded-2xl p-5 space-y-3 overflow-hidden">
      <div className="flex gap-2 items-start">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <MessageSquare className="h-4 w-4 text-primary" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[1rem] text-foreground">
          {isHebrew ? 'הראי לי תיקי עור מתחת ל-₪300' : 'Show me leather bags under ₪300'}
        </div>
      </div>
      <div className="flex gap-2 items-start justify-end">
        <div className="gradient-blue text-white rounded-xl px-4 py-2.5 text-[1rem] max-w-[240px] shadow-lg">
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
  <div className="glass rounded-2xl p-5">
    <div className="grid grid-cols-7 gap-1 text-center text-[0.85rem] text-muted-foreground mb-2">
      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-[1rem]">
      {Array.from({ length: 28 }, (_, i) => (
        <div key={i} className={`py-1.5 rounded relative ${[8, 14, 21].includes(i) ? 'gradient-coral text-white font-bold shadow-lg' : 'text-muted-foreground'}`}>
          {i + 1}
          {i === 14 && <Check className="absolute -top-1 -right-1 h-4 w-4 text-green-500 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }} />}
        </div>
      ))}
    </div>
  </div>
);

const AnimatedAvatarVisual = () => {
  const { isHebrew } = useLanguage();
  return (
    <div className="relative flex flex-col items-center justify-center py-6 gap-4">
      <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full" />
      <div className="relative">
        <div className="w-[160px] h-[160px] rounded-full overflow-hidden border-4 border-white/15 shadow-2xl glow-blue animate-float-y">
          <img src={avatarSpeaking} alt="Talking avatar" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute -top-2 -right-4 glass rounded-2xl rounded-bl-sm px-3 py-2 text-[0.8rem] font-medium text-foreground animate-float-y" style={{ animationDelay: '1s' }}>
          {isHebrew ? 'שלום! 👋' : 'Hello!'}
        </div>
      </div>
      <SoundBars count={5} height={28} color="hsl(217 91% 70%)" />
      <div className="glass px-4 py-1.5 rounded-full text-[0.85rem] font-semibold text-foreground">
        {isHebrew ? 'מדבר...' : 'Speaking...'}
      </div>
    </div>
  );
};

const visuals: Record<string, React.ReactNode> = {
  sales: <AnimatedSalesVisual />,
  calendar: <AnimatedCalendarVisual />,
  avatar: <AnimatedAvatarVisual />,
};

const SolutionsSection = () => {
  const { ref, inView } = useInView();
  const { isHebrew } = useLanguage();

  return (
    <section id="solutions" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-section-deep overflow-hidden" ref={ref}>
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 bg-primary/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bg-accent/40 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[0.85rem] font-semibold uppercase tracking-widest text-primary">
            {isHebrew ? 'פתרונות' : 'Solutions'}
          </span>
          <h2 className={`text-[3.5rem] sm:text-[4rem] font-black mt-3 mb-1 tracking-tight ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            {isHebrew ? 'מה אני בונה לך' : 'What I Build For You'}
          </h2>
        </div>

        <div className="space-y-8">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-8 items-center glass rounded-3xl p-6 sm:p-8 card-lift transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                {visuals[s.visual]}
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center shadow-lg glow-blue">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-[1.75rem] font-bold ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? s.heTitle : s.enTitle}
                  </h3>
                </div>
                <p className={`text-[1.1rem] text-muted-foreground leading-relaxed mb-4 ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? s.heDesc : s.enDesc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isHebrew ? s.heTags : s.enTags).map(t => (
                    <span key={t} className={`text-[0.85rem] px-4 py-1.5 rounded-full bg-white/5 text-foreground/80 border border-white/10 ${isHebrew ? 'font-hebrew' : ''}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 bg-green-500/10 rounded-xl px-4 py-3 border border-green-500/30">
                  <p className={`text-[1rem] text-muted-foreground line-through ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? s.heOld : s.enOld}
                  </p>
                  <p className={`text-[1rem] text-green-400 font-bold ${isHebrew ? 'font-hebrew' : ''}`}>
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
