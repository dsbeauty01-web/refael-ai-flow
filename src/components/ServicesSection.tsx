import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  }>;

  return (
    <section id="services" className="section-padding bg-secondary" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('services.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(items) && items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Card key={index} className="group bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-accent shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
