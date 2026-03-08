import { useLanguage } from '@/contexts/LanguageContext';
import { Zap, Settings, Clock, Building, Target } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const pointIcons = [Zap, Settings, Clock, Building, Target];

const WhyWorkWithMe = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const points = t('whyMe.points') as unknown as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="why-me" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('whyMe.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('whyMe.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Array.isArray(points) && points.map((point, index) => {
            const Icon = pointIcons[index];
            return (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
