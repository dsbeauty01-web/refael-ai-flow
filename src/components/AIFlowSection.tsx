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
    <section className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Soft ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-purple-500/[0.04] blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            {isHebrew ? 'עוזר AI שמכיר את כל החנות שלך' : 'AI Assistant That Knows Your Entire Store'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {isHebrew
              ? 'עוזר חכם שעובד 24/7, מאומן על כל המוצרים, המדיניות והמידע העסקי שלך — כדי שתוכל להתמקד בצמיחה'
              : 'A 24/7 intelligent assistant trained on all your products, policies, and store data — so you can focus on growth'}
          </p>
          <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground max-w-3xl mx-auto ${isHebrew ? 'direction-rtl' : ''}`}>
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
              <span key={i} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent" />
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Flow container */}
        <div className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
          {/* Inner subtle grid */}
          <div className="absolute inset-0 rounded-3xl opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Desktop flow */}
          <div className="hidden md:block relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-px -translate-y-1/2 z-0">
              <div className="w-full h-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-emerald-400/30" />
              {/* Animated pulse on line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
            </div>

            <div className={`flex items-center justify-between relative z-10 ${isHebrew ? 'flex-row-reverse' : ''}`}>
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  {/* Glow behind icon */}
                  <div className={`absolute w-16 h-16 rounded-full ${glowColors[i]} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon container */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[i]} border backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <step.Icon className={`w-7 h-7 ${iconColors[i]}`} />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-semibold text-muted-foreground text-center max-w-[100px] leading-tight">
                    {isHebrew ? labels[step.labelKey].he : labels[step.labelKey].en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile flow (vertical) */}
          <div className="md:hidden flex flex-col items-center gap-1 relative">
            {steps.map((step, i) => (
              <div key={i}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[i]} border backdrop-blur-sm flex items-center justify-center shadow-lg`}>
                    <step.Icon className={`w-6 h-6 ${iconColors[i]}`} />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {isHebrew ? labels[step.labelKey].he : labels[step.labelKey].en}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-6 bg-gradient-to-b from-border to-transparent ml-7" />
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
