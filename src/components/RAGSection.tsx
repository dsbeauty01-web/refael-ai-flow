import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Brain, MessageCircle, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const RAGSection = () => {
  const { isHebrew } = useLanguage();
  const ref = useScrollAnimation();

  const steps = isHebrew
    ? [
        { Icon: Upload, title: 'אנחנו מלמדים אותו', desc: 'מעלים את כל המידע — מוצרים, מחירים, מדיניות, שאלות נפוצות. הבוט מכיר את העסק שלך לעומק.' },
        { Icon: Brain, title: 'הוא מבין ומחפש', desc: 'כשלקוח שואל שאלה, הבוט מוצא את המידע הכי רלוונטי מתוך המאגר שלך — ועונה בדיוק.' },
        { Icon: MessageCircle, title: 'הלקוח מקבל תשובה חכמה', desc: 'תשובות מותאמות אישית בשפה טבעית, עם המלצות מוצרים, קישורים ומידע מדויק.' },
      ]
    : [
        { Icon: Upload, title: 'We Train It', desc: 'Upload all your data — products, prices, policies, FAQs. The bot learns your entire business inside out.' },
        { Icon: Brain, title: 'It Retrieves & Reasons', desc: 'When a customer asks a question, the AI searches your knowledge base and generates an accurate, contextual answer.' },
        { Icon: MessageCircle, title: 'Customer Gets a Smart Reply', desc: 'Personalized responses in natural language — with product recommendations, links, and precise information.' },
      ];

  return (
    <section className="relative overflow-hidden py-20 md:py-28" ref={ref}>
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(145deg,hsl(215_30%_6%)_0%,hsl(220_40%_12%)_40%,hsl(215_35%_9%)_100%)]" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[20%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(166_84%_32%/0.07),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[15%] left-[15%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(220_70%_50%/0.06),transparent_65%)] blur-3xl" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(0 0% 100%) 0.5px, transparent 0.5px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-6">
            {isHebrew ? 'הטכנולוגיה שמאחורי הקלעים' : 'The Technology Behind It'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground tracking-tight leading-[1.1]">
            {isHebrew ? 'בוט שבאמת מכיר את העסק שלך' : 'A Bot That Actually Knows'}
            <span className="block text-gradient mt-1">
              {isHebrew ? '' : 'Your Business'}
            </span>
          </h2>
        </div>
        <p className="text-center text-primary-foreground/55 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
          {isHebrew
            ? 'הבוט שלנו משתמש בטכנולוגיית RAG — הוא לא ממציא תשובות, אלא מושך מידע אמיתי מהמאגר שלך ועונה בצורה מדויקת ואמינה.'
            : 'Our AI uses RAG technology — it doesn\'t make up answers. It retrieves real data from your business knowledge base and responds with precision and confidence.'}
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Card */}
              <div className="relative rounded-2xl border border-primary-foreground/[0.08] bg-primary-foreground/[0.04] backdrop-blur-xl p-8 h-full transition-all duration-300 group-hover:border-accent/20 group-hover:bg-primary-foreground/[0.06]">
                {/* Step number */}
                <div className="text-7xl font-black text-primary-foreground/[0.04] absolute top-4 right-6 select-none">
                  {i + 1}
                </div>

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
                    <step.Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-foreground mb-3">{step.title}</h3>
                  <p className="text-primary-foreground/50 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>

              {/* Arrow between cards (desktop) */}
              {i < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                  <ArrowRight className="w-5 h-5 text-accent/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-primary-foreground/35 text-sm font-semibold mt-10 tracking-wide uppercase">
          {isHebrew
            ? 'מידע אמיתי • תשובות מדויקות • אמינות מלאה'
            : 'Real Data • Accurate Answers • Full Reliability'}
        </p>
      </div>
    </section>
  );
};

export default RAGSection;
