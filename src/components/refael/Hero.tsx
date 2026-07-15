import { useEffect, useRef, useState } from 'react';
import { useT } from './i18n';
import { WHATSAPP_URL, MAYA_IDLE, MAYA_POSTER, MAYA_GESTURES } from '@/config/avatars';

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
  const [active, setActive] = useState<string | null>(null);

  // The chips and the stage talk through a tiny event, keeping GestureStage self-contained
  const fire = (key: string, src: string) => {
    setActive(key);
    window.dispatchEvent(new CustomEvent('maya-gesture', { detail: src }));
    window.setTimeout(() => setActive(null), 5200);
  };

  const jump = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative hero-bg overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20">
      <div className="max-w-[1160px] mx-auto px-5 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase mb-7">
            {pick('REFAEL.AI · אווטארים חיים', 'REFAEL.AI · LIVE AVATARS')}
          </p>

          <h1
            className={`${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-tight text-ink`}
            style={{ minHeight: '1.15em' }}
            aria-label={greeting}
          >
            <span>{out}</span>
            <span
              aria-hidden
              className="inline-block align-baseline w-[0.06em] h-[0.9em] -mb-[0.05em] mx-[0.05em] bg-live-gradient animate-caret"
            />
          </h1>

          <p className="mt-6 text-[1.2rem] sm:text-[1.35rem] text-ink/85 max-w-[640px] leading-[1.5]">
            {pick(
              'זה מה שהאווטאר שלכם יגיד לכל מי שנכנס. בקול. בזמן אמת. בלי תסריט.',
              "That's what your avatar says to everyone who walks in. Out loud. In real time. No script."
            )}
          </p>

          <p className="mt-4 text-[1rem] text-muted-foreground max-w-[620px] leading-[1.7]">
            {pick(
              'Refael.ai בונה אווטארים חיים בגוף מלא שמנהלים שיחה קולית אמיתית בעברית או באנגלית — ללובי, למוזיאון, לאולם התצוגה או לאפליקציה שלכם.',
              'Refael.ai builds full-body live avatars that hold a real voice conversation in Hebrew or English — for your lobby, museum, showroom, or app.'
            )}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => jump('#avatars')}
              className="bg-live-gradient text-white font-semibold px-7 py-3.5 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition-all"
            >
              {pick('לדבר עם אווטאר', 'Talk to an avatar')}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink/15 text-ink px-7 py-3.5 rounded-full text-[0.95rem] hover:bg-ink/5 transition-colors"
            >
              {pick('לתאם דמו חי', 'Book a live demo')}
            </a>
          </div>

          <div className="mt-10">
            <p className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
              {pick('נסו אותה — לחצו על תנועה והיא תבצע אותה', 'Try her — click a gesture and she performs it')}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {MAYA_GESTURES.map(g => (
                <button
                  key={g.key}
                  onClick={() => fire(g.key, g.src)}
                  className={`px-4 py-2 rounded-full text-[0.85rem] font-medium border transition-all ${
                    active === g.key
                      ? 'bg-live-gradient text-white border-transparent'
                      : 'border-ink/15 text-ink/80 hover:border-live-a hover:text-ink'
                  }`}
                >
                  {pick(g.he, g.en)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[0.82rem] text-muted-foreground/80">
              {pick(
                'אלה קטעים אמיתיים מתוך המערכת — בשיחה חיה ה-AI בוחר את התנועות בעצמו.',
                'These are real clips from the system — in a live conversation the AI picks the gestures itself.'
              )}
            </p>
          </div>

          <p className="mt-10 text-[0.85rem] text-muted-foreground tracking-wide">
            {pick(
              'גוף מלא · קול-מול-קול · עברית · תנועות שה-AI מפעיל לבד · מחיר חודשי קבוע',
              'Full body · Voice-to-voice · Hebrew · Gestures the AI fires itself · Flat monthly cost'
            )}
          </p>
        </div>

        <GestureStage />
      </div>
    </section>
  );
}

/** Wraps MayaStage and listens for gesture events fired by the chips. */
function GestureStage() {
  const { pick } = useT();
  const [clip, setClip] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const onGesture = (e: Event) => {
      const src = (e as CustomEvent<string>).detail;
      setStarted(true);
      setClip(null);
      requestAnimationFrame(() => setClip(src));
    };
    window.addEventListener('maya-gesture', onGesture);
    return () => window.removeEventListener('maya-gesture', onGesture);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      MAYA_GESTURES.forEach(g => {
        const v = document.createElement('video');
        v.preload = 'auto';
        v.src = g.src;
      });
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const showPoster = reduce && !started;

  return (
    <div className="relative mx-auto w-[min(78vw,340px)] sm:w-[360px] lg:w-[400px]">
      <div className="absolute -inset-x-16 top-6 bottom-10 avatar-halo pointer-events-none" aria-hidden />

      {showPoster ? (
        <img
          src={MAYA_POSTER}
          alt={pick('מיה — אווטארית חיה בגוף מלא', 'Maya — a full-body live avatar')}
          className="relative w-full h-auto blend-white"
        />
      ) : (
        <video
          ref={videoRef}
          key={clip ?? 'idle'}
          src={clip ?? MAYA_IDLE}
          poster={MAYA_POSTER}
          autoPlay
          muted
          playsInline
          loop={clip === null}
          onEnded={() => setClip(null)}
          className="relative w-full h-auto blend-white"
          aria-label={pick('מיה — אווטארית חיה בגוף מלא', 'Maya — a full-body live avatar')}
        />
      )}

      <div className="absolute inset-x-8 -bottom-2 h-7 avatar-floor pointer-events-none" aria-hidden />
    </div>
  );
}
