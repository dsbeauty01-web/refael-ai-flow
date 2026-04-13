import { useInView } from '@/hooks/useInView';
import { ShoppingCart, Calendar, Video, MessageSquare, ShoppingBag, Check } from 'lucide-react';
import SoundBars from './SoundBars';
import avatarSpeaking from '@/assets/avatar-speaking.png';

const solutions = [
  {
    icon: ShoppingCart,
    heTitle: 'בוט מכירות חכם',
    enTitle: 'Smart Sales Bot',
    heDesc: 'הבוט מכיר כל מוצר, כל מחיר, כל מבצע. הוא ממליץ, מראה לינקים, ועוזר ללקוח לקנות.',
    enDesc: 'Knows every product, every price, every deal. Recommends, shows links, helps close.',
    tags: ['חיפוש מוצרים / Product Search', 'המלצות / Recommendations', 'לינקים לקנייה / Links to Buy'],
    price: { oldHe: 'עלות ארגונית: $10K+', oldEn: 'Enterprise cost: $10K+', newHe: 'המחיר שלי: מנוי חודשי משתלם', newEn: 'My price: affordable monthly' },
    visual: 'sales',
  },
  {
    icon: Calendar,
    heTitle: 'פקידת קבלה AI',
    enTitle: 'AI Receptionist',
    heDesc: 'בודקת יומן, קובעת תורים, אוספת פרטים. עובדת 24/7 בלי חופש מחלה. עם קלט קולי.',
    enDesc: 'Checks calendar, books appointments, collects details. Works 24/7 with voice input.',
    tags: ['קלט קולי / Voice Input', 'Google Calendar', 'אישורים אוטומטיים / Auto Confirmations'],
    price: { oldHe: 'משכורת פקידה: ₪6K+/חודש', oldEn: 'Receptionist salary: ₪6K+/mo', newHe: 'המחיר שלי: שבר מזה', newEn: 'My price: fraction of that' },
    visual: 'calendar',
  },
  {
    icon: Video,
    heTitle: 'אווטאר מדבר',
    enTitle: 'Talking AI Avatar',
    heDesc: 'לא צ׳אטבוט. פנים אמיתיות שמדברות עם הלקוחות שלך. עם סינכרון שפתיים וקול טבעי.',
    enDesc: 'Not a chatbot. A real face that talks with lip-sync and natural voice.',
    tags: ['סנכרון שפתיים / Lip Sync', 'קול טבעי / Natural Voice', 'תחושה אנושית / Human Feel'],
    price: { oldHe: 'הפקת וידאו: $5K+', oldEn: 'Video production: $5K+', newHe: 'אווטאר: תמיד פעיל, תמיד מעודכן', newEn: 'Avatar: always on, always updated' },
    visual: 'avatar',
  },
];

const AnimatedSalesVisual = () => (
  <div className="relative bg-secondary/50 rounded-2xl p-5 space-y-3 overflow-hidden">
    <div className="flex gap-2 items-start">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <MessageSquare className="h-4 w-4 text-primary" />
      </div>
      <div className="bg-card rounded-xl px-4 py-2.5 text-[1rem]">Show me leather bags under ₪300</div>
    </div>
    <div className="flex gap-2 items-start justify-end">
      <div className="gradient-blue text-white rounded-xl px-4 py-2.5 text-[1rem] max-w-[220px]">
        Here are 3 options with free shipping!
      </div>
    </div>
    <div className="flex justify-center pt-2">
      <div className="relative">
        <ShoppingBag className="h-14 w-14 text-primary/40 animate-float" />
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute w-3 h-3 rounded bg-primary/30 animate-float"
            style={{ top: -8 - i * 6, left: 10 + i * 8, animationDelay: `${i * 0.4}s`, animationDuration: '2s' }} />
        ))}
      </div>
    </div>
  </div>
);

const AnimatedCalendarVisual = () => (
  <div className="bg-secondary/50 rounded-2xl p-5">
    <div className="grid grid-cols-7 gap-1 text-center text-[0.85rem] text-muted-foreground mb-2">
      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-[1rem]">
      {Array.from({ length: 28 }, (_, i) => (
        <div
          key={i}
          className={`py-1.5 rounded relative ${
            [8, 14, 21].includes(i)
              ? 'gradient-coral text-white font-bold'
              : 'text-muted-foreground'
          }`}
        >
          {i + 1}
          {i === 14 && (
            <Check className="absolute -top-1 -right-1 h-4 w-4 text-green-500 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }} />
          )}
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
    <div className="bg-card px-4 py-1.5 rounded-full text-[0.85rem] font-semibold border border-border shadow">
      Speaking...
    </div>
  </div>
);

const visuals: Record<string, React.ReactNode> = {
  sales: <AnimatedSalesVisual />,
  calendar: <AnimatedCalendarVisual />,
  avatar: <AnimatedAvatarVisual />,
};

const SolutionsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[0.85rem] font-semibold uppercase tracking-widest text-primary">Solutions</span>
          <h2 className="font-hebrew text-[3.5rem] font-black mt-3 mb-1 text-right mx-auto max-w-2xl" dir="rtl">
            מה אני בונה לך
          </h2>
          <p className="text-[2rem] font-semibold text-muted-foreground text-left mx-auto max-w-2xl">
            What I Build For You
          </p>
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
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-hebrew text-[1.6rem] font-bold text-right" dir="rtl">{s.heTitle}</h3>
                    <p className="text-[1.1rem] text-muted-foreground text-left">{s.enTitle}</p>
                  </div>
                </div>
                <p className="font-hebrew text-[1.1rem] text-muted-foreground leading-relaxed mb-1 text-right" dir="rtl">{s.heDesc}</p>
                <p className="text-[1rem] text-muted-foreground leading-relaxed mb-4 text-left">{s.enDesc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.tags.map(t => (
                    <span key={t} className="text-[0.85rem] px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 bg-green-500/10 rounded-xl px-4 py-3 border border-green-500/20">
                  <p className="font-hebrew text-[1rem] text-muted-foreground line-through text-right" dir="rtl">{s.price.oldHe}</p>
                  <p className="text-[0.9rem] text-muted-foreground line-through text-left">{s.price.oldEn}</p>
                  <p className="font-hebrew text-[1rem] text-primary font-bold text-right" dir="rtl">{s.price.newHe}</p>
                  <p className="text-[0.9rem] text-primary font-bold text-left">{s.price.newEn}</p>
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
