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
  }>;

  return (
    <section id="industries" className="section-padding bg-secondary" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('industries.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('industries.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.isArray(items) && items.map((item, index) => {
            const Icon = industryIcons[index];
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-primary mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
