import { useInView } from '@/hooks/useInView';
import { ShoppingCart, Calendar, Video, MessageSquare } from 'lucide-react';

const solutions = [
  {
    icon: ShoppingCart,
    heTitle: 'בוט מכירות חכם',
    enTitle: 'Smart Sales Bot',
    heDesc: 'הבוט מכיר כל מוצר, כל מחיר, כל מבצע. הוא ממליץ, מראה לינקים, ועוזר ללקוח לקנות.',
    enDesc: 'Knows every product, every price, every deal. Recommends, shows links, helps close.',
    tags: ['Product Search', 'Recommendations', 'Links to Buy'],
    price: { old: 'Enterprise cost: $10K+', new: 'My price: affordable monthly' },
    visual: 'sales',
  },
  {
    icon: Calendar,
    heTitle: 'פקידת קבלה AI',
    enTitle: 'AI Receptionist',
    heDesc: 'בודקת יומן, קובעת תורים, אוספת פרטים. עובדת 24/7 בלי חופש מחלה. עם קלט קולי.',
    enDesc: 'Checks calendar, books appointments, collects details. Works 24/7 with voice input.',
    tags: ['Voice Input', 'Google Calendar', 'Auto Confirmations'],
    price: { old: 'Receptionist salary: ₪6K+/mo', new: 'My price: fraction of that' },
    visual: 'calendar',
  },
  {
    icon: Video,
    heTitle: 'אווטאר מדבר',
    enTitle: 'Talking AI Avatar',
    heDesc: 'לא צ׳אטבוט. פנים אמיתיות שמדברות עם הלקוחות שלך. עם סינכרון שפתיים וקול טבעי.',
    enDesc: 'Not a chatbot. A real face that talks with lip-sync and natural voice.',
    tags: ['Lip Sync Video', 'Natural Voice', 'Human Feel'],
    price: { old: 'Video production: $5K+', new: 'Avatar: always on, always updated' },
    visual: 'avatar',
  },
];

const MockChat = () => (
  <div className="bg-secondary/50 rounded-2xl p-4 space-y-3">
    <div className="flex gap-2 items-start">
      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <MessageSquare className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="bg-card rounded-xl px-3 py-2 text-xs">Show me leather bags under ₪300</div>
    </div>
    <div className="flex gap-2 items-start justify-end">
      <div className="gradient-blue text-white rounded-xl px-3 py-2 text-xs max-w-[200px]">
        Here are 3 options with free shipping!
      </div>
    </div>
  </div>
);

const MockCalendar = () => (
  <div className="bg-secondary/50 rounded-2xl p-4">
    <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground mb-2">
      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {Array.from({ length: 28 }, (_, i) => (
        <div
          key={i}
          className={`py-1 rounded ${
            [8, 14, 21].includes(i)
              ? 'gradient-coral text-white font-bold'
              : 'text-muted-foreground'
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

const MockAvatar = () => (
  <div className="flex items-center justify-center py-8">
    <div className="relative">
      <div className="w-28 h-28 rounded-full gradient-blue flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
          <div className="flex items-center gap-[2px] h-6">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-[2px] rounded-full bg-white" style={{
                animation: `wave 1s ease-in-out ${i*0.12}s infinite`, height: '8px'
              }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded-full text-[10px] font-semibold border border-border shadow">
        Speaking...
      </div>
    </div>
  </div>
);

const visuals: Record<string, React.ReactNode> = {
  sales: <MockChat />,
  calendar: <MockCalendar />,
  avatar: <MockAvatar />,
};

const SolutionsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Solutions</span>
          <h2 className="font-hebrew text-3xl sm:text-4xl font-bold mt-3 mb-2">מה אני בונה לך</h2>
          <p className="text-muted-foreground">What I Build For You</p>
        </div>

        <div className="space-y-8">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-8 items-center bg-card rounded-3xl border border-border p-6 sm:p-8 card-lift transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                {visuals[s.visual]}
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`} dir="rtl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl gradient-blue flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-hebrew text-xl font-bold">{s.heTitle}</h3>
                    <p className="text-sm text-muted-foreground">{s.enTitle}</p>
                  </div>
                </div>
                <p className="font-hebrew text-sm text-muted-foreground leading-relaxed mb-2">{s.heDesc}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4" dir="ltr">{s.enDesc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.tags.map(t => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-xs space-y-1" dir="ltr">
                  <p className="text-muted-foreground line-through">{s.price.old}</p>
                  <p className="text-primary font-semibold">{s.price.new}</p>
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
