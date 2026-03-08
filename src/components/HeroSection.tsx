import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot } from 'lucide-react';

const WHATSAPP_NUMBER = '97253327125';
const WHATSAPP_MESSAGE_HE = 'שלום רפאל, אני מעוניין לשמוע על שירותי האוטומציה שלך';
const WHATSAPP_MESSAGE_EN = 'Hi Refael, I\'m interested in your AI automation services';

const HeroSection = () => {
  const { t, isHebrew } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isHebrew ? WHATSAPP_MESSAGE_HE : WHATSAPP_MESSAGE_EN
  )}`;

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/10" />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Bot className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/80">
              {isHebrew ? 'רפאל סלע — אוטומציה עסקית' : 'Refael Sela — Business Automation'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-4 leading-tight animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.headline')}
            <br />
            <span className="text-gradient">{t('hero.subheadline')}</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              className="gradient-accent text-accent-foreground font-semibold text-base px-8 py-6 hover:opacity-90 transition-opacity"
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
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 py-6"
              onClick={() => document.querySelector('#demos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Bot className="h-5 w-5" />
              {t('hero.cta2')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
