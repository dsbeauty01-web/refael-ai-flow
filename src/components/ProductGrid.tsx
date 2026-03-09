import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Filter, CalendarCheck, Receipt, ChevronDown } from 'lucide-react';

const WhatsAppCardVisual = () => (
  <div className="relative w-full h-40 rounded-xl bg-gradient-to-br from-[hsl(142,70%,35%)] to-[hsl(142,70%,25%)] overflow-hidden flex items-center justify-center">
    {/* Phone frame */}
    <div className="relative w-44 h-32 rounded-xl bg-[hsl(142,10%,12%)] border border-[hsl(142,40%,30%)]/30 shadow-2xl overflow-hidden">
      {/* Header bar */}
      <div className="h-7 bg-[hsl(142,70%,28%)] flex items-center gap-2 px-3">
        <div className="w-5 h-5 rounded-full bg-[hsl(142,50%,45%)] flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">AI</span>
        </div>
        <span className="text-[9px] text-white/90 font-medium">WhatsApp Bot</span>
        <div className="ml-auto flex gap-1">
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
        </div>
      </div>
      {/* Chat bubbles */}
      <div className="p-2 space-y-1.5">
        <div className="flex justify-end">
          <div className="bg-[hsl(142,70%,32%)] rounded-lg rounded-tr-sm px-2 py-1 max-w-[75%]">
            <span className="text-[7px] text-white/90 leading-tight block">Hi, I need help 👋</span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-[hsl(0,0%,20%)] rounded-lg rounded-tl-sm px-2 py-1 max-w-[80%]">
            <span className="text-[7px] text-white/80 leading-tight block">Hey! I'm your AI assistant. How can I help? 🤖</span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[hsl(142,70%,32%)] rounded-lg rounded-tr-sm px-2 py-1 max-w-[70%]">
            <span className="text-[7px] text-white/90 leading-tight block">What's the pricing?</span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-1">
          <div className="bg-[hsl(0,0%,20%)] rounded-lg rounded-tl-sm px-2 py-1">
            <div className="flex gap-0.5 items-center">
              <div className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-white/60 animate-pulse [animation-delay:0.2s]" />
              <div className="w-1 h-1 rounded-full bg-white/60 animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Decorative glow */}
    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[hsl(142,80%,50%)]/15 blur-2xl" />
    <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-[hsl(142,80%,40%)]/10 blur-xl" />
  </div>
);

const AvatarCardVisual = () => (
  <div className="relative w-full h-40 rounded-xl bg-gradient-to-br from-[hsl(250,40%,18%)] to-[hsl(220,50%,12%)] overflow-hidden flex items-center justify-center">
    {/* Avatar face silhouette */}
    <div className="relative flex flex-col items-center">
      {/* Head */}
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(250,60%,55%)] to-[hsl(200,70%,45%)] flex items-center justify-center shadow-lg shadow-[hsl(250,60%,50%)]/20">
        {/* Face features */}
        <div className="absolute inset-1 rounded-full border border-white/10" />
        <div className="flex gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-[hsl(200,100%,70%)] shadow-sm shadow-[hsl(200,100%,70%)]/50" />
          <div className="w-2 h-2 rounded-full bg-[hsl(200,100%,70%)] shadow-sm shadow-[hsl(200,100%,70%)]/50" />
        </div>
        {/* Scan line effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-x-0 h-px bg-[hsl(200,100%,70%)]/30 top-1/2 animate-pulse" />
        </div>
      </div>
      {/* Sound waves */}
      <div className="flex items-end gap-0.5 mt-3 h-5">
        {[3, 5, 8, 12, 8, 14, 10, 6, 9, 5, 3].map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-[hsl(250,60%,55%)] to-[hsl(200,100%,65%)]"
            style={{
              height: `${h}px`,
              animation: `pulse 1.2s ease-in-out ${i * 0.1}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </div>
    {/* Video frame corners */}
    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[hsl(200,100%,65%)]/40 rounded-tl" />
    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[hsl(200,100%,65%)]/40 rounded-tr" />
    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[hsl(200,100%,65%)]/40 rounded-bl" />
    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[hsl(200,100%,65%)]/40 rounded-br" />
    {/* REC indicator */}
    <div className="absolute top-4 right-8 flex items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      <span className="text-[8px] text-red-400/80 font-mono">REC</span>
    </div>
    {/* Glow effects */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[hsl(250,60%,50%)]/10 blur-3xl" />
  </div>
);

const iconCards = [null, Filter, CalendarCheck, Receipt, null];

const ProductGrid = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const items = t('products.items') as unknown as Array<{
    title: string;
    shortDesc: string;
    fullDesc: string;
    highlights: string[];
    cta: string;
  }>;

  if (!Array.isArray(items)) return null;

  const toggle = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

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
            const isExpanded = expandedIndex === index;
            const isWhatsApp = index === 0;
            const isAvatar = index === 4;
            const isSpecialCard = isWhatsApp || isAvatar;
            const Icon = iconCards[index];
            const isLastRow = index >= 3;

            return (
              <div
                key={index}
                className={`group relative rounded-2xl border bg-card flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isExpanded ? 'border-accent/40 shadow-lg shadow-accent/5' : 'border-border hover:border-accent/30'
                } ${isWhatsApp ? 'hover:shadow-[hsl(142,70%,35%)]/10' : ''} ${isAvatar ? 'hover:shadow-[hsl(250,60%,50%)]/10' : ''} ${isLastRow ? 'lg:col-span-1 lg:last:col-start-2' : ''}`}
              >
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  isWhatsApp ? 'bg-gradient-to-br from-[hsl(142,70%,35%)]/[0.04] to-transparent' :
                  isAvatar ? 'bg-gradient-to-br from-[hsl(250,60%,50%)]/[0.04] to-transparent' :
                  'bg-gradient-to-br from-accent/[0.03] to-transparent'
                }`} />

                {/* Main card content */}
                <div className="relative p-8 flex flex-col flex-1">
                  {/* Visual area for special cards, icon for others */}
                  {isWhatsApp && (
                    <div className="mb-6">
                      <WhatsAppCardVisual />
                    </div>
                  )}
                  {isAvatar && (
                    <div className="mb-6">
                      <AvatarCardVisual />
                    </div>
                  )}
                  {!isSpecialCard && Icon && (
                    <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-accent-foreground" />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {item.shortDesc}
                  </p>

                  {/* More Info Button */}
                  <button
                    onClick={() => toggle(index)}
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                      isWhatsApp ? 'text-[hsl(142,70%,35%)] hover:text-[hsl(142,70%,45%)]' :
                      isAvatar ? 'text-[hsl(250,60%,55%)] hover:text-[hsl(250,60%,65%)]' :
                      'text-accent hover:text-accent/80'
                    }`}
                  >
                    {item.cta}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Expandable area */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isExpanded ? '500px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="px-8 pb-8 pt-2 border-t border-border/60">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {item.fullDesc}
                    </p>
                    <div className="space-y-2">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/60">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isWhatsApp ? 'bg-[hsl(142,70%,35%)]' :
                            isAvatar ? 'bg-gradient-to-br from-[hsl(250,60%,55%)] to-[hsl(200,70%,45%)]' :
                            'gradient-accent'
                          }`}>
                            <span className="text-[10px] font-bold text-white">{i + 1}</span>
                          </div>
                          <span className="text-sm text-foreground leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
