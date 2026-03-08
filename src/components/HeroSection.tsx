import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, ArrowDown } from 'lucide-react';

const WHATSAPP_NUMBER = '97253327125';
const WHATSAPP_MESSAGE_HE = 'שלום רפאל, אני מעוניין לשמוע על שירותי האוטומציה שלך';
const WHATSAPP_MESSAGE_EN = 'Hi Refael, I\'m interested in your AI automation services';

const HeroSection = () => {
  const { t, isHebrew } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isHebrew ? WHATSAPP_MESSAGE_HE : WHATSAPP_MESSAGE_EN
  )}`;

  const stats = t('hero.stats') as unknown as Array<{ value: string; label: string }>;

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25">
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
              className="gradient-accent text-accent-foreground font-semibold text-base h-14 px-10 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
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
              className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base h-14 px-10 rounded-xl"
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
