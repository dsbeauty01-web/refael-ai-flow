import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, ArrowDown, Zap, Brain, BarChart3, Mail, FileSpreadsheet, Cloud, MessageSquare, ShoppingCart, Workflow, Cpu, Database } from 'lucide-react';

const WHATSAPP_NUMBER = '97253327125';
const WHATSAPP_MESSAGE_HE = 'שלום רפאל, אני מעוניין לשמוע על שירותי האוטומציה שלך';
const WHATSAPP_MESSAGE_EN = 'Hi Refael, I\'m interested in your AI automation services';

const FloatingIcon = ({ 
  children, 
  className = '',
  style = {}
}: { 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div 
    className={`absolute rounded-2xl bg-primary-foreground/[0.07] backdrop-blur-sm border border-primary-foreground/[0.08] flex items-center justify-center shadow-lg ${className}`}
    style={style}
  >
    {children}
  </div>
);

const HeroSection = () => {
  const { t, isHebrew } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isHebrew ? WHATSAPP_MESSAGE_HE : WHATSAPP_MESSAGE_EN
  )}`;

  const stats = t('hero.stats') as unknown as Array<{ value: string; label: string }>;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[linear-gradient(145deg,hsl(211_52%_14%)_0%,hsl(211_52%_22%)_35%,hsl(200_55%_20%)_65%,hsl(211_52%_18%)_100%)]">
      {/* Mesh gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(166_84%_32%/0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(211_52%_40%/0.12),transparent_70%)]" />
        <div className="absolute top-1/3 left-1/4 w-[40%] h-[40%] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(200_60%_35%/0.06),transparent_70%)]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Floating tech icons - left side */}
      <FloatingIcon className="w-12 h-12 top-[18%] left-[8%] animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}>
        <ShoppingCart className="w-5 h-5 text-primary-foreground/40" />
      </FloatingIcon>
      <FloatingIcon className="w-14 h-14 top-[38%] left-[4%] animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
        <Workflow className="w-6 h-6 text-primary-foreground/35" />
      </FloatingIcon>
      <FloatingIcon className="w-11 h-11 top-[62%] left-[10%] animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>
        <Mail className="w-5 h-5 text-primary-foreground/40" />
      </FloatingIcon>
      <FloatingIcon className="w-13 h-13 top-[80%] left-[6%] animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}>
        <FileSpreadsheet className="w-5 h-5 text-primary-foreground/35" />
      </FloatingIcon>

      {/* Floating tech icons - right side */}
      <FloatingIcon className="w-14 h-14 top-[15%] right-[6%] animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}>
        <Brain className="w-6 h-6 text-primary-foreground/40" />
      </FloatingIcon>
      <FloatingIcon className="w-11 h-11 top-[35%] right-[10%] animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }}>
        <MessageSquare className="w-5 h-5 text-primary-foreground/35" />
      </FloatingIcon>
      <FloatingIcon className="w-12 h-12 top-[58%] right-[5%] animate-[float_5.5s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }}>
        <Cpu className="w-5 h-5 text-primary-foreground/40" />
      </FloatingIcon>
      <FloatingIcon className="w-10 h-10 top-[78%] right-[12%] animate-[float_6.5s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}>
        <Cloud className="w-4 h-4 text-primary-foreground/35" />
      </FloatingIcon>

      {/* Scattered smaller icons */}
      <FloatingIcon className="w-9 h-9 top-[25%] left-[22%] animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}>
        <Zap className="w-4 h-4 text-accent/40" />
      </FloatingIcon>
      <FloatingIcon className="w-9 h-9 top-[72%] right-[22%] animate-[float_7.5s_ease-in-out_infinite]" style={{ animationDelay: '3.5s' }}>
        <BarChart3 className="w-4 h-4 text-accent/40" />
      </FloatingIcon>
      <FloatingIcon className="w-10 h-10 top-[48%] right-[20%] animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>
        <Database className="w-4 h-4 text-primary-foreground/30" />
      </FloatingIcon>
      <FloatingIcon className="w-10 h-10 top-[50%] left-[18%] animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '1.2s' }}>
        <Bot className="w-4 h-4 text-accent/35" />
      </FloatingIcon>

      {/* Connection lines (decorative) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="25%" y2="35%" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="85%" y1="18%" x2="75%" y2="40%" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="8%" y1="65%" x2="20%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="90%" y1="60%" x2="78%" y2="75%" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="50%" cy="30%" r="120" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.5" />
        <circle cx="50%" cy="70%" r="80" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.3" />
      </svg>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 backdrop-blur-sm">
              <Bot className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground/80 tracking-wide">
                {t('hero.badge')}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('hero.headline')}
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gradient leading-[1.1] tracking-tight mt-1 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              {t('hero.subheadline')}
            </h1>
          </div>

          {/* Description */}
          <p className="text-center text-lg sm:text-xl text-primary-foreground/65 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <Button
              size="lg"
              className="gradient-accent text-accent-foreground font-semibold text-base h-14 px-10 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {t('hero.cta1')}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base h-14 px-10 rounded-xl backdrop-blur-sm"
              onClick={() => document.querySelector('#demos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta2')}
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          {Array.isArray(stats) && (
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.45s' }}>
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-accent mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
