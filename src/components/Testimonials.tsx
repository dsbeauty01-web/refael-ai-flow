import { useLanguage } from '@/contexts/LanguageContext';
import { Quote, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Testimonials = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();

  const items = t('testimonials.items') as unknown as Array<{
    name: string;
    role: string;
    text: string;
    result: string;
  }>;

  return (
    <section id="testimonials" className="section-padding bg-secondary/50" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{t('testimonials.title')}</h2>
        </div>
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-16">
          {t('testimonials.subtitle')}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {Array.isArray(items) && items.map((item, index) => (
            <div key={index} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <Quote className="h-6 w-6 text-accent/25 mb-3" />
              <p className="text-foreground leading-relaxed mb-6 flex-1">{item.text}</p>

              {/* Result badge */}
              <div className="bg-accent/10 rounded-xl p-3 mb-6">
                <p className="text-sm font-bold text-accent text-center">{item.result}</p>
              </div>

              {/* Author */}
              <div className="border-t border-border pt-5">
                <p className="font-bold text-primary text-lg">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
