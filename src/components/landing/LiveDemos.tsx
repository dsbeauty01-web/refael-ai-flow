import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Play, Loader2 } from 'lucide-react';

interface DemoProps {
  title: string;
  heTitle: string;
  src: string;
  chips: string[];
  accentClass: string;
}

const DemoCard = ({ title, heTitle, src, chips, accentClass }: DemoProps) => {
  const [state, setState] = useState<'idle' | 'loading' | 'loaded'>('idle');

  const handleLoad = () => {
    setState('loading');
    setTimeout(() => setState('loaded'), 2000);
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-hebrew text-xl font-bold mb-0.5">{heTitle}</h3>
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="relative rounded-2xl overflow-hidden border border-border bg-card" style={{ minHeight: 700 }}>
        {state === 'idle' && (
          <button
            onClick={handleLoad}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-card hover:bg-secondary/30 transition-colors cursor-pointer z-10"
          >
            {/* Avatar preview */}
            <div className="relative">
              <div className={`w-32 h-32 rounded-full ${accentClass} flex items-center justify-center shadow-xl`}>
                <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <div className="flex items-center gap-[3px] h-8">
                    {[0,1,2,3,4].map(i => (
                      <div key={i} className="w-[3px] rounded-full bg-white" style={{
                        animation: `wave 1.2s ease-in-out ${i * 0.15}s infinite`, height: '12px'
                      }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-primary/30" />
            </div>
            <div className="flex items-center gap-2 gradient-coral text-white font-semibold px-6 py-2.5 rounded-full shadow-lg">
              <Play className="h-4 w-4" />
              Load Demo
            </div>
          </button>
        )}
        {state === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}
        {(state === 'loading' || state === 'loaded') && (
          <iframe
            src={src}
            width="100%"
            height="700"
            className={`border-0 rounded-2xl transition-opacity duration-500 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
            allow="camera; microphone; autoplay"
            title={title}
            onLoad={() => setState('loaded')}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {chips.map(c => (
          <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

const LiveDemos = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="demos"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'hsl(222 47% 11%)' }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-coral">Live Demos</span>
          <h2 className="font-hebrew text-3xl sm:text-4xl font-bold mt-3 mb-2 text-white">
            אל תאמין לי — תנסה בעצמך
          </h2>
          <p className="text-white/60">Don't Take My Word For It — Try Them Now</p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <DemoCard
            title="Beauty Store Assistant"
            heTitle="עוזרת מכירות לחנות יופי"
            src="https://dsbeauty01-web.github.io/avatar/"
            chips={['Show me leather bags', 'Return policy?']}
            accentClass="gradient-blue"
          />
          <DemoCard
            title="Salon Receptionist"
            heTitle="פקידת קבלה למספרה"
            src="https://dsbeauty01-web.github.io/salon/"
            chips={['Book a haircut', 'Try voice']}
            accentClass="gradient-coral"
          />
        </div>
      </div>
    </section>
  );
};

export default LiveDemos;
