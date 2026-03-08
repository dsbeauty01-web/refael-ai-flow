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
    detail: string;
  }>;

  return (
    <section id="how-it-works" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{t('howItWorks.title')}</h2>
        </div>
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-6">
          {t('howItWorks.subtitle')}
        </p>
        <p className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
          {t('howItWorks.description')}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {Array.isArray(steps) && steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={index} className="relative text-center p-8 rounded-2xl bg-card border border-border">
                {/* Step number */}
                <div className="text-6xl font-black text-accent/10 absolute top-4 inset-x-0 text-center select-none">
                  {step.number}
                </div>

                <div className="relative pt-8">
                  <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>
                  <p className="text-xs text-accent font-semibold uppercase tracking-wider">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
