import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, MessageSquare, Bot, User, ArrowRight, Headphones, ShoppingBag, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatIllustration = () => (
  <div className="relative w-full max-w-md mx-auto">
    {/* Glow background */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 blur-2xl" />

    <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
          <Bot className="h-4 w-4 text-accent-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground">AI Store Assistant</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-accent animate-pulse" />
      </div>

      {/* Customer bubble */}
      <div className="flex justify-end">
        <div className="flex items-end gap-2">
          <div className="bg-accent/15 text-foreground text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-[200px]">
            Do you have a leather tote bag?
          </div>
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <User className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* AI bubble */}
      <div className="flex justify-start">
        <div className="flex items-end gap-2">
          <div className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center shrink-0">
            <Bot className="h-3 w-3 text-accent-foreground" />
          </div>
          <div className="bg-secondary text-foreground text-xs px-3 py-2 rounded-2xl rounded-bl-sm max-w-[220px]">
            Yes! Here are our top picks:
          </div>
        </div>
      </div>

      {/* Product cards */}
      <div className="flex gap-2 pl-8">
        {[
          { name: 'Classic Tote', price: '$350' },
          { name: 'Weekender', price: '$490' },
        ].map((p, i) => (
          <div key={i} className="flex-1 rounded-xl border border-border bg-background/60 p-3 space-y-1.5">
            <div className="w-full h-10 rounded-lg bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-[10px] font-semibold text-foreground leading-tight">{p.name}</p>
            <p className="text-[10px] text-accent font-bold">{p.price}</p>
          </div>
        ))}
      </div>

      {/* Arrow to support */}
      <div className="flex items-center gap-2 pl-8">
        <div className="flex-1 h-px bg-border" />
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-[10px] text-muted-foreground font-medium">
          <Headphones className="h-3 w-3" />
          Human support
        </div>
      </div>

      {/* Customer follow-up */}
      <div className="flex justify-end">
        <div className="bg-accent/15 text-foreground text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-[180px]">
          Add the Classic Tote to cart!
        </div>
      </div>
    </div>
  </div>
);

const AIStoreDemo = () => {
  const ref = useScrollAnimation();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatLoaded = useRef(false);

  useEffect(() => {
    if (chatLoaded.current || !chatContainerRef.current) return;
    chatLoaded.current = true;

    const container = chatContainerRef.current;

    // Create shadow root to scope styles
    const wrapper = document.createElement('div');
    wrapper.id = 'store-demo-chat';
    container.appendChild(wrapper);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    container.appendChild(link);

    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: "https://rafa5555.app.n8n.cloud/webhook/22e378ba-aa29-44e6-bb40-7b434f726689/chat",
        mode: "window",
        target: "#store-demo-chat",
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
    container.appendChild(script);

    return () => {
      wrapper.remove();
      link.remove();
      script.remove();
    };
  }, []);

  return (
    <section id="store-demo" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            <ShoppingBag className="h-4 w-4" />
            Live Demo
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              See the AI E-commerce Bot Live
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              This demo shows how an AI assistant can help customers shop in an online store.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The bot understands product questions, recommends items, answers support questions,
              and can escalate to human support when needed.
            </p>

            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold text-foreground">To test the demo:</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Open the Hardgraft store catalog',
                  'Pick any bag you see',
                  'Ask the AI about that product',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Button
              asChild
              className="gradient-accent text-accent-foreground font-semibold rounded-xl h-12 px-8 hover:opacity-90 transition-opacity mt-2"
            >
              <a href="https://www.hardgraft.com/collections/all" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open Hardgraft Store
              </a>
            </Button>
          </div>

          {/* Right: Illustration */}
          <ChatIllustration />
        </div>

        {/* Embedded chat widget */}
        <div
          ref={chatContainerRef}
          className="rounded-2xl border border-border bg-card p-4 min-h-[120px]"
        />

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          This is an independent demo project and is not affiliated with Hardgraft.
        </p>
      </div>
    </section>
  );
};

export default AIStoreDemo;
