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
    <section id="why-me" className="section-padding gradient-hero" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight">{t('whyMe.title')}</h2>
        </div>
        <p className="text-center text-primary-foreground/65 text-lg leading-relaxed max-w-3xl mx-auto mb-16">
          {t('whyMe.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(points) && points.map((point, index) => {
            const Icon = pointIcons[index];
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
