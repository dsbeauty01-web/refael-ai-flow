import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Play } from 'lucide-react';

interface DemoProps {
  title: string;
  subtitle: string;
  src: string;
  hint: string;
}

const DemoCard = ({ title, subtitle, src, hint }: DemoProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold mb-1 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
      <div
        className="relative rounded-2xl overflow-hidden glow-border bg-card"
        style={{ minHeight: 700 }}
      >
        {!loaded ? (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card hover:bg-secondary/50 transition-colors cursor-pointer z-10"
          >
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center shadow-lg">
              <Play className="h-8 w-8 text-primary-foreground ml-1" />
            </div>
            <span className="text-foreground font-semibold text-lg">{title}</span>
            <span className="text-muted-foreground text-sm">Click to load demo</span>
          </button>
        ) : (
          <iframe
            src={src}
            width="100%"
            height="700"
            className="border-0 rounded-2xl"
            allow="camera; microphone; autoplay"
            title={title}
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-3">{hint}</p>
    </div>
  );
};

const LiveDemos = () => {
  const { ref, inView } = useInView();

  return (
    <section id="demos" className="py-24 px-4 sm:px-6 lg:px-16" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Try It Live</h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          These are real AI assistants — interact with them right now
        </p>
        <div
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <DemoCard
            title="Beauty Store Assistant"
            subtitle="Ask about products, get recommendations, see links"
            src="https://dsbeauty01-web.github.io/avatar/"
            hint="💡 Type 'show me leather bags' or 'what's your return policy?'"
          />
          <DemoCard
            title="Salon Receptionist"
            subtitle="Book an appointment by voice — try the 🎤 button"
            src="https://dsbeauty01-web.github.io/salon/"
            hint="💡 Say 'I want to book a haircut for tomorrow at 3pm'"
          />
        </div>
      </div>
    </section>
  );
};

export default LiveDemos;
