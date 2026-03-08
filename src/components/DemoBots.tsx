import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Play } from 'lucide-react';
import MockChatModal from './MockChatModal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DemoBots = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimation();
  const [openChat, setOpenChat] = useState<number | null>(null);

  const items = t('demos.items') as unknown as Array<{
    name: string;
    description: string;
    useCase: string;
    buttonText: string;
  }>;

  return (
    <section id="demos" className="section-padding bg-secondary/50" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{t('demos.title')}</h2>
        </div>
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-16">
          {t('demos.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {Array.isArray(items) && items.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground flex items-start gap-2.5">
                  <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  {item.useCase}
                </p>
              </div>

              <Button
                className="w-full gradient-accent text-accent-foreground font-semibold rounded-xl h-12 hover:opacity-90 transition-opacity"
                onClick={() => setOpenChat(index)}
              >
                <Play className="h-4 w-4" />
                {item.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {openChat !== null && (
        <MockChatModal
          open={true}
          onOpenChange={() => setOpenChat(null)}
          chatIndex={openChat}
          title={Array.isArray(items) ? items[openChat]?.name : ''}
        />
      )}
    </section>
  );
};

export default DemoBots;
