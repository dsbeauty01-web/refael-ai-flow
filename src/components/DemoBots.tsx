import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare } from 'lucide-react';
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
    <section id="demos" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('demos.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('demos.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {Array.isArray(items) && items.map((item, index) => (
            <Card key={index} className="group bg-card hover:shadow-lg transition-all duration-300 border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary">{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <div className="bg-secondary rounded-lg p-3 mb-4">
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent" />
                    {item.useCase}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setOpenChat(index)}
                >
                  {item.buttonText}
                </Button>
              </CardContent>
            </Card>
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
