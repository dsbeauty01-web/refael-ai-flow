import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Bot, Filter, CalendarCheck, Receipt, Megaphone, ChevronDown, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const icons = [Bot, Filter, CalendarCheck, Receipt, Megaphone];

const ProductGrid = () => {
  const { t, isHebrew } = useLanguage();
  const ref = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = t('products.items') as unknown as Array<{
    title: string;
    shortDesc: string;
    fullDesc: string;
    highlights: string[];
    cta: string;
  }>;

  if (!Array.isArray(items)) return null;

  return (
    <section id="products" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide mb-4">
            {t('products.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4">
            {t('products.title')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Grid: 3 + 2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = icons[index];
            const isLastRow = index >= 3;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl border border-border bg-card p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30 hover:-translate-y-1 ${
                  isLastRow ? 'lg:col-span-1 lg:last:col-start-2' : ''
                }`}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {item.shortDesc}
                </p>

                {/* Learn More Button */}
                <button
                  onClick={() => setOpenIndex(index)}
                  className="relative inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group/btn"
                >
                  {item.cta}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for full details */}
      {openIndex !== null && (
        <Dialog open={openIndex !== null} onOpenChange={() => setOpenIndex(null)}>
          <DialogContent className="max-w-lg" dir={isHebrew ? 'rtl' : 'ltr'}>
            <DialogHeader>
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-3">
                {(() => {
                  const Icon = icons[openIndex];
                  return <Icon className="h-6 w-6 text-accent-foreground" />;
                })()}
              </div>
              <DialogTitle className="text-xl font-bold text-primary">
                {items[openIndex].title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed pt-2">
                {items[openIndex].fullDesc}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 pt-2">
              {items[openIndex].highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/60">
                  <div className="w-5 h-5 rounded-full gradient-accent flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-accent-foreground">{i + 1}</span>
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{h}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/972543301889"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center w-full gap-2 rounded-xl gradient-accent text-accent-foreground font-semibold py-3 hover:opacity-90 transition-opacity"
            >
              {t('products.modalCta')}
            </a>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ProductGrid;
