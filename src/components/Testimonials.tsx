import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Testimonials = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const items = t('testimonials.items') as unknown as Array<{
    name: string;
    role: string;
    text: string;
  }>;

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('testimonials.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Array.isArray(items) && items.map((item, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="text-foreground text-sm leading-relaxed mb-6">"{item.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-primary">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
