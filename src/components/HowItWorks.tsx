import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Wrench, Rocket } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const stepIcons = [Search, Wrench, Rocket];

const HowItWorks = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const steps = t('howItWorks.steps') as unknown as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section id="how-it-works" className="section-padding bg-secondary" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('howItWorks.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {Array.isArray(steps) && steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="text-4xl font-extrabold text-accent/20 mb-2">{step.number}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
