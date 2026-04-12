import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Play, Loader2 } from 'lucide-react';
import AnimatedAvatar from './AnimatedAvatar';
import SoundBars from './SoundBars';

interface DemoProps {
  title: string;
  heTitle: string;
  src: string;
  chips: string[];
  accentColor: string;
}

const TypingMessage = ({ text, delay }: { text: string; delay: number }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;
  return (
    <div className="animate-fade-in bg-white/10 backdrop-blur rounded-xl px-3 py-2 text-xs text-white/80 max-w-[180px]">
      {text}
    </div>
  );
};

const DemoCard = ({ title, heTitle, src, chips, accentColor }: DemoProps) => {
  const [state, setState] = useState<'idle' | 'loading' | 'loaded'>('idle');

  const handleLoad = () => {
    setState('loading');
    setTimeout(() => setState('loaded'), 2000);
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-hebrew text-xl font-bold mb-0.5 text-white">{heTitle}</h3>
      <p className="text-sm text-white/60 mb-4">{title}</p>
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#12121f]" style={{ minHeight: 520 }}>
        {state === 'idle' && (
          <button
            onClick={handleLoad}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#12121f] hover:bg-[#181828] transition-colors cursor-pointer z-10"
          >
            {/* Animated avatar preview */}
            <AnimatedAvatar size={150} />

            {/* Sound bars below face */}
            <SoundBars count={7} height={36} color={accentColor} />

            {/* Mock typing messages */}
            <div className="space-y-2 mt-2">
              <TypingMessage text="Hi! How can I help you?" delay={500} />
              <TypingMessage text="Looking for products?" delay={2000} />
            </div>

            {/* Glowing play button */}
            <div className="relative mt-4">
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: `${accentColor}33`, transform: 'scale(1.5)' }} />
              <div className="flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full shadow-xl relative z-10"
                style={{ background: accentColor }}>
                <Play className="h-5 w-5" />
                Load Demo
              </div>
            </div>
          </button>
        )}
        {state === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#12121f] z-10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}
        {(state === 'loading' || state === 'loaded') && (
          <iframe
            src={src}
            width="100%"
            height="520"
            className={`border-0 rounded-2xl transition-opacity duration-500 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
            allow="camera; microphone; autoplay"
            title={title}
            onLoad={() => setState('loaded')}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {chips.map(c => (
          <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60">
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
            accentColor="hsl(217 91% 60%)"
          />
          <DemoCard
            title="Salon Receptionist"
            heTitle="פקידת קבלה למספרה"
            src="https://dsbeauty01-web.github.io/salon/"
            chips={['Book a haircut', 'Try voice']}
            accentColor="hsl(24 95% 53%)"
          />
        </div>
      </div>
    </section>
  );
};

export default LiveDemos;
