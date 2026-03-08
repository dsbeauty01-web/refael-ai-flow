import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Info } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Portfolio = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const items = t('portfolio.items') as unknown as Array<{
    title: string;
    industry: string;
    description: string;
    result: string;
    details: string;
  }>;

  return (
    <section id="portfolio" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{t('portfolio.title')}</h2>
        </div>
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-16">
          {t('portfolio.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {Array.isArray(items) && items.map((item, index) => (
            <div key={index} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
              <Badge variant="secondary" className="mb-4 text-xs font-semibold">{item.industry}</Badge>
              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{item.description}</p>

              {/* Result */}
              <div className="flex items-center gap-2.5 text-accent font-bold mb-4">
                <TrendingUp className="h-5 w-5" />
                <span>{item.result}</span>
              </div>

              {/* Details */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3">
                <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                {item.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
