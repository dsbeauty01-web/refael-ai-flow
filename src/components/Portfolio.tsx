import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Portfolio = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const items = t('portfolio.items') as unknown as Array<{
    title: string;
    industry: string;
    description: string;
    result: string;
  }>;

  return (
    <section id="portfolio" className="section-padding bg-secondary" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('portfolio.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('portfolio.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {Array.isArray(items) && items.map((item, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2 text-xs">{item.industry}</Badge>
                <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                  <TrendingUp className="h-4 w-4" />
                  {item.result}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
