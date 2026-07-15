import { useEffect, useState } from 'react';
import { useT } from './i18n';
import { WHATSAPP_URL } from '@/config/avatars';

function useTyped(text: string, speed = 60) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setOut(text); setDone(true); return; }
    setOut(''); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { out, done };
}

export default function Hero() {
  const { isHebrew, pick } = useT();
  const greeting = pick('שלום, ברוכים הבאים.', 'Hello, welcome in.');
  const { out } = useTyped(greeting, 60);

  const jump = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden pt-24 pb-16">
      <div className="max-w-[1100px] w-full mx-auto px-5">
        <p className="text-[0.72rem] font-medium tracking-[0.28em] text-muted-foreground uppercase mb-8 animate-fade-in">
          {pick('REFAEL.AI · אווטארים חיים', 'REFAEL.AI · LIVE AVATARS')}
        </p>

        <h1
          className={`${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-foreground`}
          style={{ minHeight: '1.15em' }}
          aria-label={greeting}
        >
          <span>{out}</span>
          <span
            aria-hidden
            className="inline-block align-baseline w-[0.06em] h-[0.9em] -mb-[0.05em] mx-[0.05em] bg-live-gradient animate-caret"
          />
        </h1>

        <p className={`mt-6 text-[1.25rem] sm:text-[1.45rem] text-foreground/90 max-w-[720px] leading-[1.45] animate-fade-in`}
           style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          {pick(
            'זה מה שהאווטאר שלכם יגיד לכל מי שנכנס. בקול. בזמן אמת. בלי תסריט.',
            "That's what your avatar says to everyone who walks in. Out loud. In real time. No script."
          )}
        </p>

        <p className="mt-5 text-[1rem] sm:text-[1.05rem] text-muted-foreground max-w-[680px] leading-[1.7] animate-fade-in"
           style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          {pick(
            'Refael.ai בונה אווטארים חיים בגוף מלא שמנהלים שיחה קולית אמיתית בעברית או באנגלית — ללובי, למוזיאון, לאולם התצוגה או לאפליקציה שלכם.',
            'Refael.ai builds full-body live avatars that hold a real voice conversation in Hebrew or English — for your lobby, museum, showroom, or app.'
          )}
        </p>

        <div className="mt-10 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <button
            onClick={() => jump('#avatars')}
            className="bg-live-gradient text-midnight font-semibold px-6 py-3.5 rounded-full text-[0.95rem] hover:brightness-110 transition-all"
          >
            {pick('לדבר עם אווטאר', 'Talk to an avatar')}
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-foreground px-6 py-3.5 rounded-full text-[0.95rem] hover:bg-white/5 transition-colors"
          >
            {pick('לתאם דמו חי', 'Book a live demo')}
          </a>
        </div>

        <p className="mt-12 text-[0.85rem] text-muted-foreground/80 tracking-wide animate-fade-in"
           style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          {pick(
            'גוף מלא · קול-מול-קול · עברית · תנועות שה-AI מפעיל לבד · מחיר חודשי קבוע',
            'Full body · Voice-to-voice · Hebrew · Gestures the AI fires itself · Flat monthly cost'
          )}
        </p>
      </div>
    </section>
  );
}