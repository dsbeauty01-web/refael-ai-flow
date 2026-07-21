import { useEffect, useRef, useState } from 'react';
import { useT } from './i18n';
import {
  WHATSAPP_URL,
  MAYA_IDLE,
  MAYA_POSTER,
  MAYA_GESTURES,
  MAYA_SPEAKING,
} from '@/config/avatars';

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
  const { isHebrew, pick, fontDisplay } = useT();
  const greeting = pick('שלום, ברוכים הבאים.', 'Hello, welcome in.', 'สวัสดีค่ะ ยินดีต้อนรับ');
  const { out } = useTyped(greeting, 60);
  const [active, setActive] = useState<string | null>(null);

  // The chips and the stage talk through a tiny event, keeping GestureStage self-contained
  const fire = (key: string, src: string) => {
    setActive(key);
    window.dispatchEvent(new CustomEvent('maya-gesture', { detail: src }));
    window.setTimeout(() => setActive(null), 5200);
  };

  const jump = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  // The one button that proves the pitch: it makes her talk, out loud, right here.
  const speak = () => window.dispatchEvent(new CustomEvent('maya-speak'));

  return (
    <section className="relative hero-bg overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20">
      <div className="max-w-[1160px] mx-auto px-5 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase mb-7">
            {pick('REFAEL.AI · אווטארים חיים', 'REFAEL.AI · LIVE AVATARS', 'REFAEL.AI · อวตารเสมือนจริง')}
          </p>

          <h1
            className={`${fontDisplay} text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-tight text-ink`}
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
              "That's what your avatar says to everyone who walks in. Out loud. In real time. No script.",
              'นี่คือสิ่งที่อวตารของคุณจะพูดกับทุกคนที่เดินเข้ามา ด้วยเสียงจริง แบบเรียลไทม์ ไม่มีบท'
            )}
          </p>

          <p className="mt-4 text-[1rem] text-muted-foreground max-w-[620px] leading-[1.7]">
            {pick(
              'Refael.ai בונה אווטארים חיים בגוף מלא שמנהלים שיחה קולית אמיתית בעברית או באנגלית — ללובי, למוזיאון, לאולם התצוגה או לאפליקציה שלכם.',
              'Refael.ai builds full-body live avatars that hold a real voice conversation in Hebrew or English — for your lobby, museum, showroom, or app.',
              'Refael.ai สร้างอวตารเสมือนจริงแบบเต็มตัวที่สนทนาด้วยเสียงได้จริง สำหรับล็อบบี้ พิพิธภัณฑ์ โชว์รูม หรือแอปของคุณ'
            )}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={speak}
              className="group inline-flex items-center gap-2.5 bg-live-gradient text-white font-semibold px-7 py-3.5 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition-all"
            >
              <SpeakerIcon />
              {pick('שמעו אותה מדברת', 'Hear her speak', 'ฟังเธอพูด')}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink/15 text-ink px-7 py-3.5 rounded-full text-[0.95rem] hover:bg-ink/5 transition-colors"
            >
              {pick('לתאם דמו חי', 'Book a live demo', 'นัดชมการสาธิตสด')}
            </a>
          </div>
          <p className="mt-3 text-[0.82rem] text-muted-foreground">
            {pick(
              'הפעילו את הרמקולים — זו ההקלטה שלה, לא קריינות.',
              "Turn your sound on — that's her, not a voice-over.",
              'เปิดเสียงด้วย นี่คือเสียงของเธอจริง ๆ ไม่ใช่เสียงพากย์'
            )}
          </p>

          <div className="mt-10">
            <p className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
              {pick('נסו אותה — לחצו על תנועה והיא תבצע אותה', 'Try her — click a gesture and she performs it', 'ลองดูสิ คลิกเลือกท่าทาง แล้วเธอจะทำให้ดู')}
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
                  {pick(g.he, g.en, g.th)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[0.82rem] text-muted-foreground/80">
              {pick(
                'אלה קטעים אמיתיים מתוך המערכת — בשיחה חיה ה-AI בוחר את התנועות בעצמו.',
                'These are real clips from the system — in a live conversation the AI picks the gestures itself.',
                'คลิปเหล่านี้มาจากระบบจริง ในการสนทนาสด AI จะเลือกท่าทางเองโดยอัตโนมัติ'
              )}
            </p>
          </div>

          <p className="mt-10 text-[0.85rem] text-muted-foreground tracking-wide">
            {pick(
              'גוף מלא · קול-מול-קול · עברית · תנועות שה-AI מפעיל לבד · מחיר חודשי קבוע',
              'Full body · Voice-to-voice · Hebrew · Gestures the AI fires itself · Flat monthly cost',
              'เต็มตัว · สนทนาด้วยเสียง · หลายภาษา · ท่าทางที่ AI สั่งเอง · ค่าบริการรายเดือนคงที่'
            )}
          </p>
        </div>

        <GestureStage />
      </div>
    </section>
  );
}

function SpeakerIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
  );
}

/** Live audio meter — only ever shown while sound is genuinely playing. */
function VoiceBars() {
  return (
    <span className="flex items-end gap-[2px] h-3.5" aria-hidden>
      {[0, 1, 2, 3].map(i => (
        <span
          key={i}
          className="voice-bar w-[2.5px] h-full rounded-full bg-white"
          style={{ animationDelay: `${i * 0.12}s`, animationDuration: `${0.55 + i * 0.1}s` }}
        />
      ))}
    </span>
  );
}

/** Wraps MayaStage: listens for gesture chips, and for the "hear her speak" button. */
function GestureStage() {
  const { pick } = useT();
  const [clip, setClip] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const onGesture = (e: Event) => {
      const src = (e as CustomEvent<string>).detail;
      setStarted(true);
      setSpeaking(false);
      setClip(null);
      requestAnimationFrame(() => setClip(src));
    };
    const onSpeak = () => {
      setStarted(true);
      setBlocked(false);
      setClip(null);
      setSpeaking(true);
    };

    window.addEventListener('maya-gesture', onGesture);
    window.addEventListener('maya-speak', onSpeak);
    return () => {
      window.removeEventListener('maya-gesture', onGesture);
      window.removeEventListener('maya-speak', onSpeak);
    };
  }, []);

  /**
   * Autoplay policy: a click grants permission, but the play() promise can still
   * reject (background tab, iOS low-power). Never swallow it — if sound is refused
   * we say so instead of silently playing a mute clip and looking broken.
   */
  useEffect(() => {
    if (!speaking) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.currentTime = 0;
    v.play().catch(() => setBlocked(true));
  }, [speaking]);

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
          alt={pick('מיה — אווטארית חיה בגוף מלא', 'Maya — a full-body live avatar', 'มายา อวตารเสมือนจริงแบบเต็มตัว')}
          className="relative w-full h-auto blend-white"
        />
      ) : (
        <video
          ref={videoRef}
          key={speaking ? 'speaking' : clip ?? 'idle'}
          src={speaking ? MAYA_SPEAKING : clip ?? MAYA_IDLE}
          poster={MAYA_POSTER}
          autoPlay
          muted={!speaking}
          playsInline
          loop={!speaking && clip === null}
          onEnded={() => { setClip(null); setSpeaking(false); }}
          className="relative w-full h-auto blend-white"
          aria-label={pick('מיה — אווטארית חיה בגוף מלא', 'Maya — a full-body live avatar', 'มายา อวตารเสมือนจริงแบบเต็มตัว')}
        />
      )}

      {speaking && !blocked && (
        <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 bg-live-gradient text-white text-[0.78rem] font-semibold px-3.5 py-1.5 rounded-full shadow-[0_8px_20px_-8px_rgba(0,184,217,0.6)]">
            <VoiceBars />
            {pick('הקול שלה — חי', 'Her real voice', 'เสียงจริงของเธอ')}
          </span>
        </div>
      )}

      {blocked && (
        <div className="absolute inset-x-0 top-3 flex justify-center px-4">
          <button
            onClick={() => { const v = videoRef.current; if (v) { v.muted = false; v.play().then(() => setBlocked(false)).catch(() => {}); } }}
            className="inline-flex items-center gap-2 bg-ink text-white text-[0.78rem] font-semibold px-3.5 py-1.5 rounded-full"
          >
            <SpeakerIcon />
            {pick('הדפדפן חסם את הקול — הקישו להפעלה', 'Your browser blocked the sound — tap to play', 'เบราว์เซอร์บล็อกเสียง แตะเพื่อเล่น')}
          </button>
        </div>
      )}

      <div className="absolute inset-x-8 -bottom-2 h-7 avatar-floor pointer-events-none" aria-hidden />
    </div>
  );
}
