import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, ShoppingBag, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIStoreDemo = () => {
  const ref = useScrollAnimation();
  const chatLoaded = useRef(false);

  useEffect(() => {
    if (chatLoaded.current) return;
    chatLoaded.current = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: "https://rafa5555.app.n8n.cloud/webhook/22e378ba-aa29-44e6-bb40-7b434f726689/chat",
        mode: "window",
        initialMessages: ["Hi! Ask me about Hardgraft bags."],
        i18n: {
          en: {
            title: "AI Store Assistant",
            subtitle: "Product help and recommendations",
            inputPlaceholder: "Ask about bags, backpacks, or products..."
          }
        }
      });
    `;
    document.body.appendChild(script);

    return () => {
      link.remove();
      script.remove();
    };
  }, []);

  const steps = [
    { icon: ExternalLink, text: 'Open the Hardgraft catalog' },
    { icon: ShoppingBag, text: 'Pick any bag or product you see' },
    { icon: MessageSquare, text: 'Ask the AI assistant about it' },
  ];

  const exampleQuestions = [
    'Which tote bag do you recommend?',
    'Show me a travel backpack',
    'Do you have laptop bags?',
  ];

  return (
    <section id="store-demo" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
          <Search className="h-4 w-4" />
          Live Demo
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
          AI E-commerce Assistant Demo
        </h2>

        {/* Subtext */}
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          This demo shows how an AI assistant can help customers shop in an online store.
          The assistant searches the store knowledge base and recommends products in real time.
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <step.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">
                <span className="text-accent font-bold mr-1">{i + 1}.</span>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Catalog link */}
        <Button
          asChild
          className="gradient-accent text-accent-foreground font-semibold rounded-xl h-12 px-8 hover:opacity-90 transition-opacity mb-10"
        >
          <a href="https://www.hardgraft.com/collections/all" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Browse Hardgraft Catalog
          </a>
        </Button>

        {/* Example questions */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-start">
          <p className="text-sm font-semibold text-primary mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((q, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm"
              >
                "{q}"
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground">
          This is an independent demo project and is not affiliated with Hardgraft.
        </p>
      </div>
    </section>
  );
};

export default AIStoreDemo;
