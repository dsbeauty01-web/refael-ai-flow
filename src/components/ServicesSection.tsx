import { useLanguage } from '@/contexts/LanguageContext';
import { Headphones, UserCheck, CalendarCheck, Receipt, Megaphone, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const icons = [Headphones, UserCheck, CalendarCheck, Receipt, Megaphone];

const ServicesSection = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const items = t('services.items') as unknown as Array<{
    title: string;
    description: string;
    features: string[];
    cta: string;
  }>;

  return (
    <section id="services" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{t('services.title')}</h2>
        </div>
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-16">
          {t('services.subtitle')}
        </p>

        {/* Cards */}
        <div className="space-y-6">
          {Array.isArray(items) && items.map((item, index) => {
            const Icon = icons[index];
            const isEven = index % 2 === 1;
            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 p-8 md:p-10 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Icon + Title */}
                <div className="lg:w-2/5 flex flex-col">
                  <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

                {/* Features */}
                <div className="lg:w-3/5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/60">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
