import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Stethoscope, Scissors, Briefcase, Building2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const industryIcons = [ShoppingCart, Stethoscope, Scissors, Briefcase, Building2];

const Industries = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const items = t('industries.items') as unknown as Array<{
    name: string;
    description: string;
    stat: string;
  }>;

  return (
    <section id="industries" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{t('industries.title')}</h2>
        </div>
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-16">
          {t('industries.subtitle')}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {Array.isArray(items) && items.map((item, index) => {
            const Icon = industryIcons[index];
            return (
              <div
                key={index}
                className="text-center p-7 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-primary mb-2 text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                <div className="text-xs font-bold text-accent bg-accent/10 rounded-full py-1.5 px-4 inline-block">
                  {item.stat}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
