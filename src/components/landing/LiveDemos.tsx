import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Play, Loader2 } from 'lucide-react';
import SoundBars from './SoundBars';
import demoAvatar from '@/assets/demo-avatar.png';
import demoAvatarSalon from '@/assets/demo-avatar-salon.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface DemoProps {
  heTitle: string;
  enTitle: string;
  src: string;
  heChips: string[];
  enChips: string[];
  accentColor: string;
  avatar: string;
}

const TypingMessage = ({ text, delay }: { text: string; delay: number }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return (
    <div className="animate-fade-in bg-white/10 backdrop-blur rounded-xl px-4 py-2.5 text-[0.95rem] text-white/80 max-w-[200px]">
      {text}
    </div>
  );
};

const DemoCard = ({ heTitle, enTitle, src, heChips, enChips, accentColor, avatar }: DemoProps) => {
  const [state, setState] = useState<'idle' | 'loading' | 'loaded'>('idle');
  const { isHebrew } = useLanguage();

  const handleLoad = () => {
    setState('loading');
    setTimeout(() => setState('loaded'), 2000);
  };

  return (
    <div className="flex flex-col">
      <h3 className={`text-[1.75rem] font-bold mb-1 text-white ${isHebrew ? 'font-hebrew text-right' : 'text-left'}`} dir={isHebrew ? 'rtl' : 'ltr'}>
        {isHebrew ? heTitle : enTitle}
      </h3>
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0d0d18] mt-3 shadow-2xl glow-soft" style={{ minHeight: 520 }}>
        {state === 'idle' && (
          <button onClick={handleLoad} className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#12121f] to-[#1a1530] hover:from-[#181828] hover:to-[#221940] transition-colors cursor-pointer z-10 group">
            {/* Live badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 backdrop-blur-md shadow-[0_0_20px_hsl(0_84%_60%/0.4)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-red-300">Live</span>
            </div>
            <div className="relative animate-float-y">
              <div className="absolute inset-0 blur-3xl opacity-60 rounded-full" style={{ background: accentColor }} />
              <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img src={avatar} alt="Demo avatar" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <SoundBars count={7} height={36} color={accentColor} />
            <div className="space-y-2 mt-2">
              <TypingMessage text={isHebrew ? 'היי! איך אפשר לעזור?' : 'Hi! How can I help you?'} delay={500} />
              <TypingMessage text={isHebrew ? 'מחפשים מוצרים?' : 'Looking for products?'} delay={2000} />
            </div>
            <div className="relative mt-4">
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: `${accentColor}55`, transform: 'scale(1.6)' }} />
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: `${accentColor}33`, transform: 'scale(2.0)', animationDelay: '0.6s' }} />
              <div className="flex items-center gap-2 text-white font-bold px-10 py-4 rounded-full shadow-2xl relative z-10 text-[1.1rem] group-hover:scale-110 transition-transform" style={{ background: accentColor, boxShadow: `0 10px 40px ${accentColor}99` }}>
                <Play className="h-5 w-5 fill-white" />
                <span className={isHebrew ? 'font-hebrew' : ''}>{isHebrew ? 'טען דמו' : 'Load Demo'}</span>
              </div>
            </div>
          </button>
        )}
        {state === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#12121f] to-[#1a1530] z-10">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        )}
        {(state === 'loading' || state === 'loaded') && (
          <iframe src={src} width="100%" height="520" className={`border-0 rounded-3xl transition-opacity duration-500 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}`} allow="camera; microphone; autoplay" title={enTitle} onLoad={() => setState('loaded')} />
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {(isHebrew ? heChips : enChips).map(c => (
          <span key={c} className={`text-[0.9rem] px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 backdrop-blur-md ${isHebrew ? 'font-hebrew' : ''}`}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

const LiveDemos = () => {
  const { ref, inView } = useInView();
  const { isHebrew } = useLanguage();

  return (
    <section id="demos" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-section-mid overflow-hidden" ref={ref}>
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-20 bg-accent/40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[0.85rem] font-semibold uppercase tracking-widest text-coral">
            {isHebrew ? 'דמואים חיים' : 'Live Demos'}
          </span>
          <h2 className={`text-[3rem] sm:text-[4rem] font-black mt-3 mb-1 text-white tracking-tight ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            {isHebrew ? 'אל תאמין לי — תנסה בעצמך' : "Don't Take My Word For It — Try Them Now"}
          </h2>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <DemoCard
            enTitle="Beauty Store Assistant"
            heTitle="עוזרת מכירות לחנות יופי"
            src="https://dsbeauty01-web.github.io/avatar/"
            heChips={['הראי לי תיקים', 'מדיניות החזרה?']}
            enChips={['Show me leather bags', 'Return policy?']}
            accentColor="hsl(217 91% 60%)"
            avatar={demoAvatar}
          />
          <DemoCard
            enTitle="Salon Receptionist"
            heTitle="פקידת קבלה למספרה"
            src="https://dsbeauty01-web.github.io/salon/"
            heChips={['קבעי תור', 'נסי קול']}
            enChips={['Book a haircut', 'Try voice']}
            accentColor="hsl(24 95% 53%)"
            avatar={demoAvatarSalon}
          />
        </div>
      </div>
    </section>
  );
};

export default LiveDemos;
