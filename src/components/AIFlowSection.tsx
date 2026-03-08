import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Brain, Database, ShoppingBag, Headphones } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  { Icon: MessageCircle, labelKey: 'customer' },
  { Icon: Brain, labelKey: 'ai' },
  { Icon: Database, labelKey: 'knowledge' },
  { Icon: ShoppingBag, labelKey: 'products' },
  { Icon: Headphones, labelKey: 'human' },
];

const labels: Record<string, { en: string; he: string }> = {
  customer: { en: 'Customer Question', he: 'שאלת לקוח' },
  ai: { en: 'AI Assistant', he: 'עוזר AI' },
  knowledge: { en: 'Business Data', he: 'מידע עסקי' },
  products: { en: 'Recommendations', he: 'המלצות' },
  human: { en: 'Human Support', he: 'תמיכה אנושית' },
};

const colors = [
  'from-blue-500/20 to-blue-400/10 border-blue-400/20 shadow-blue-500/10',
  'from-purple-500/20 to-purple-400/10 border-purple-400/20 shadow-purple-500/10',
  'from-teal-500/20 to-teal-400/10 border-teal-400/20 shadow-teal-500/10',
  'from-indigo-500/20 to-indigo-400/10 border-indigo-400/20 shadow-indigo-500/10',
  'from-emerald-500/20 to-emerald-400/10 border-emerald-400/20 shadow-emerald-500/10',
];

const iconColors = [
  'text-blue-400',
  'text-purple-400',
  'text-teal-400',
  'text-indigo-400',
  'text-emerald-400',
];

const glowColors = [
  'bg-blue-400/20',
  'bg-purple-400/20',
  'bg-teal-400/20',
  'bg-indigo-400/20',
  'bg-emerald-400/20',
];

const AIFlowSection = () => {
  const { isHebrew } = useLanguage();
  const ref = useScrollAnimation();

  return (
    <section className="relative overflow-hidden py-20 md:py-28" ref={ref}>
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,hsl(215_30%_8%)_0%,hsl(211_52%_16%)_30%,hsl(200_45%_18%)_60%,hsl(215_35%_10%)_100%)]" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(220_70%_50%/0.08),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(166_84%_32%/0.08),transparent_65%)] blur-3xl" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(280_60%_50%/0.05),transparent_60%)] blur-3xl" />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(0 0% 100%) 0.5px, transparent 0.5px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground tracking-tight mb-6 leading-[1.1]">
            {isHebrew ? 'עוזר AI שמכיר את כל החנות שלך' : 'AI Assistant That Knows'}
            <span className="block text-gradient mt-1">
              {isHebrew ? '' : 'Your Entire Store'}
            </span>
          </h2>
          <p className="text-primary-foreground/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {isHebrew
              ? 'עוזר חכם שעובד 24/7, מאומן על כל המוצרים, המדיניות והמידע העסקי שלך — כדי שתוכל להתמקד בצמיחה'
              : 'A 24/7 intelligent assistant trained on all your products, policies, and store data — so you can focus on growth'}
          </p>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 max-w-3xl mx-auto ${isHebrew ? 'direction-rtl' : ''}`}>
            {(isHebrew
              ? [
                  'מענה מיידי עם מידע מדויק על מוצרים',
                  'ממליץ על המוצרים הנכונים להגדלת מכירות',
                  'לוכד לידים ופרטי לקוחות אוטומטית',
                  'מעביר לנציג אנושי כשצריך',
                  'עובד בצ׳אט באתר וברשתות חברתיות',
                  'זמין תמיד, יום ולילה',
                ]
              : [
                  'Instant answers with accurate product info',
                  'Recommends the right products to boost sales',
                  'Captures leads & customer details automatically',
                  'Escalates to human support when needed',
                  'Works on website chat & social media',
                  'Always available, day and night',
                ]
            ).map((line, i) => (
              <span key={i} className="flex items-center gap-2 text-sm md:text-base font-semibold text-primary-foreground/50">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Flow container */}
        <div className="relative rounded-3xl border border-primary-foreground/[0.08] bg-primary-foreground/[0.04] backdrop-blur-xl p-8 md:p-14 shadow-2xl">
          {/* Inner grid */}
          <div className="absolute inset-0 rounded-3xl opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle, hsl(0 0% 100%) 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Desktop flow */}
          <div className="hidden md:block relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2 z-0 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-blue-400/25 via-purple-400/25 to-emerald-400/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
            </div>

            <div className={`flex items-center justify-between relative z-10 ${isHebrew ? 'flex-row-reverse' : ''}`}>
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-5 group">
                  {/* Glow */}
                  <div className={`absolute w-20 h-20 rounded-full ${glowColors[i]} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${colors[i]} border backdrop-blur-sm flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}>
                    <step.Icon className={`w-9 h-9 ${iconColors[i]}`} />
                  </div>

                  {/* Label */}
                  <span className="text-sm font-bold text-primary-foreground/60 text-center max-w-[120px] leading-tight">
                    {isHebrew ? labels[step.labelKey].he : labels[step.labelKey].en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile flow */}
          <div className="md:hidden flex flex-col items-center gap-1 relative">
            {steps.map((step, i) => (
              <div key={i}>
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[i]} border backdrop-blur-sm flex items-center justify-center shadow-xl`}>
                    <step.Icon className={`w-7 h-7 ${iconColors[i]}`} />
                  </div>
                  <span className="text-base font-bold text-primary-foreground/60">
                    {isHebrew ? labels[step.labelKey].he : labels[step.labelKey].en}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[2px] h-6 bg-gradient-to-b from-primary-foreground/10 to-transparent ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFlowSection;
