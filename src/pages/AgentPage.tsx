import { useEffect, useRef, useState, type RefObject } from 'react';
import { Check, Mic, SendHorizontal, Lock, MessageCircle, UserPlus, CalendarCheck } from 'lucide-react';
import { useT } from '@/components/refael/i18n';
import SiteLayout from '@/components/site/SiteLayout';
import { FaqList, RelatedProducts } from '@/components/site/blocks';
import { WhatsAppGlyph, LineGlyph, SpeakerGlyph } from '@/components/site/icons';
import { useSeo, serviceLd, faqLd, breadcrumbLd, ORG_ID } from '@/components/site/Seo';
import { WHATSAPP_URL, LINE_URL } from '@/config/avatars';
import { routeMeta, urlFor, SITE_URL, type L10n } from '@/config/site';
import { trackWhatsAppClick, trackLineClick } from '@/lib/analytics';
import {
  FACE_VIDEO, FACE_POSTER, TALK_VIDEO, TALK_POSTER, WORK_VIDEO, WORK_POSTER, STYLES,
  HERO, MOCK, TALK, BIZ, WORK, HOW, PRICING, COMPARE, FAQ_HEAD, FAQ, FINAL, SECTIONS, type Plan,
} from '@/content/agentPage';

const PATH = '/customer-service';

const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const shekel = (n: number) => `₪${n.toLocaleString('en-US')}`;

/** The display faces draw ₪ as a ש״ח ligature or lack it; set the sign in the body face. */
const sh = (text: string) =>
  text.split('₪').flatMap((part, i) => (i === 0 ? [part] : [<span key={i} className="font-hebrew">₪</span>, part]));

/* ------------------------------------------------------------------ autoplay budget */

/**
 * Every autoplaying clip on the page registers here. Only clips that are on screen
 * play, and never more than MAX_PLAYING at once: a clip the visitor unmuted wins,
 * then the most visible ones. Reduced motion: nothing registers, posters only.
 */
const MAX_PLAYING = 2;
const registry = new Map<HTMLVideoElement, { ratio: number; prio: number }>();

function syncPlayback() {
  const ranked = [...registry.entries()]
    .filter(([, e]) => e.ratio > 0)
    .sort(([va, a], [vb, b]) => (Number(!vb.muted) - Number(!va.muted)) || (b.prio - a.prio) || (b.ratio - a.ratio));
  const allowed = new Set(ranked.slice(0, MAX_PLAYING).map(([v]) => v));
  registry.forEach((_, v) => {
    if (allowed.has(v)) { if (v.paused) v.play().catch(() => {}); }
    else if (!v.paused) v.pause();
  });
}

function useAutoplay(ref: RefObject<HTMLVideoElement>, { prio = 0, threshold = 0.35, enabled = true } = {}) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !enabled || reducedMotion() || !('IntersectionObserver' in window)) return;
    registry.set(v, { ratio: 0, prio });
    const io = new IntersectionObserver(
      ([e]) => {
        const entry = registry.get(v);
        if (!entry) return;
        entry.ratio = e.isIntersecting && e.intersectionRatio >= threshold ? e.intersectionRatio : 0;
        syncPlayback();
      },
      { threshold: [0, threshold, 0.6, 0.9] }
    );
    io.observe(v);
    return () => { io.disconnect(); registry.delete(v); v.pause(); syncPlayback(); };
  }, [ref, prio, threshold, enabled]);
}

/** Tap for sound: unmute and restart, or mute again. */
function useSound(ref: RefObject<HTMLVideoElement>) {
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => { setMuted(v.muted); syncPlayback(); };
    v.addEventListener('volumechange', sync);
    return () => v.removeEventListener('volumechange', sync);
  }, [ref]);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.muted) { v.muted = false; v.currentTime = 0; v.play().catch(() => {}); }
    else v.muted = true;
  };
  return { muted, toggle };
}

function SoundButton({ muted, onClick, className = '' }: { muted: boolean; onClick: () => void; className?: string }) {
  const { pick } = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!muted}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-black/70 backdrop-blur-md text-white text-[0.9rem] font-semibold px-5 hover:bg-black/85 transition-colors ${className}`}
    >
      <SpeakerGlyph className="w-4 h-4" />
      {muted ? pick('הפעילו קול', 'Turn sound on', 'เปิดเสียง') : pick('השתיקו', 'Mute', 'ปิดเสียง')}
    </button>
  );
}

/* ------------------------------------------------------------------ hero mock */

type Frame = { shown: number; typing: 'agent' | 'visitor' | null; lead: boolean; wait: number };

/** The scripted conversation, one frame per beat; `wait` is how long the frame holds. */
const SCRIPT: Frame[] = [
  { shown: 0, typing: null, lead: false, wait: 700 },
  { shown: 0, typing: 'agent', lead: false, wait: 1800 },
  { shown: 1, typing: null, lead: false, wait: 1200 },
  { shown: 1, typing: 'visitor', lead: false, wait: 1200 },
  { shown: 2, typing: null, lead: false, wait: 400 },
  { shown: 2, typing: 'agent', lead: false, wait: 1400 },
  { shown: 3, typing: null, lead: false, wait: 1600 },
  { shown: 3, typing: 'visitor', lead: false, wait: 1200 },
  { shown: 4, typing: null, lead: false, wait: 400 },
  { shown: 4, typing: 'agent', lead: false, wait: 1100 },
  { shown: 5, typing: null, lead: false, wait: 700 },
  { shown: 5, typing: null, lead: true, wait: 5200 },
];
const FINAL_FRAME: Frame = { shown: 5, typing: null, lead: true, wait: 0 };

function useScript(rootRef: RefObject<HTMLElement>) {
  const [step, setStep] = useState(0);
  const [still] = useState(reducedMotion);
  const stepRef = useRef(0);

  useEffect(() => {
    if (still) return;
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const next = (stepRef.current + 1) % SCRIPT.length;
        stepRef.current = next;
        setStep(next);
        schedule();
      }, SCRIPT[stepRef.current].wait);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) schedule();
      else window.clearTimeout(timer);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [still, rootRef]);

  return still ? FINAL_FRAME : SCRIPT[step];
}

function TypingDots({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-hidden>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-white/80' : 'bg-[#8a7c74]'} motion-safe:animate-bounce`}
          style={{ animationDelay: `${i * 140}ms`, animationDuration: '1s' }}
        />
      ))}
    </span>
  );
}

function HeroMock() {
  const { tr } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useScript(ref);
  const faceRef = useRef<HTMLVideoElement>(null);
  useAutoplay(faceRef, { prio: 2, threshold: 0.2 });

  const speaking = frame.typing === 'agent';
  const messages = MOCK.chat.slice(0, frame.shown);

  return (
    <figure className="relative">
      <div ref={ref} role="img" aria-label={tr(HERO.mockLabel)} className="relative">
        <div className="absolute -inset-8 rounded-[40px] stage-glow pointer-events-none" aria-hidden />

        {/* browser window: someone else's site, its own light palette */}
        <div className="relative overflow-hidden rounded-[18px] bg-[#fbf7f3] text-[#3b302b] shadow-[0_0_0_1px_rgba(232,238,247,0.14),0_0_70px_-14px_rgba(0,184,217,0.4),0_50px_90px_-40px_rgba(0,0,0,0.95)]">
          <div className="flex items-center gap-3 bg-[#ece6df] px-3.5 h-9 border-b border-[#dcd3ca]">
            <span className="flex gap-1.5 shrink-0" aria-hidden>
              <span className="w-2.5 h-2.5 rounded-full bg-[#f26b5e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5bf4f]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#5fc454]" />
            </span>
            <span dir="ltr" className="flex-1 min-w-0 flex items-center gap-1.5 rounded-md bg-[#fbf7f3] px-2.5 py-1 text-[0.72rem] text-[#6f625b] truncate">
              <Lock className="w-3 h-3 shrink-0" />
              {MOCK.url}
            </span>
          </div>

          <div className="relative h-[430px] sm:h-[460px]">
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="flex items-center gap-2 font-semibold text-[0.95rem]">
                <span className="w-6 h-6 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f1cdbd,#c98f7a)]" />
                {tr(MOCK.brand)}
              </span>
              <span className="hidden sm:flex gap-4 text-[0.78rem] text-[#7d6f67]">
                {MOCK.nav.map((n, i) => <span key={i}>{tr(n)}</span>)}
              </span>
            </div>
            <div className="px-5 pt-7 sm:pt-9 max-w-[58%] sm:max-w-[52%]">
              <p className="text-[0.75rem] text-[#a0705e] font-semibold">{tr(MOCK.sub)}</p>
              <p className="mt-2 text-[1.35rem] sm:text-[1.8rem] leading-[1.15] font-bold tracking-tight">{tr(MOCK.headline)}</p>
              <span className="mt-4 inline-block rounded-full bg-[#c98f7a] text-white text-[0.75rem] font-semibold px-4 py-1.5">{tr(MOCK.book)}</span>
              <div className="mt-6 space-y-2" aria-hidden>
                <span className="block h-2 w-[90%] rounded-full bg-[#ece3da]" />
                <span className="block h-2 w-[75%] rounded-full bg-[#ece3da]" />
                <span className="block h-2 w-[82%] rounded-full bg-[#ece3da]" />
              </div>
            </div>
            <div className="absolute top-16 end-[-40px] w-[48%] h-[200px] rounded-[28px] bg-[radial-gradient(ellipse_at_30%_30%,#f6dccf,#e9c2ae_55%,#dcae98)] opacity-80" aria-hidden />

            {/* the agent widget, bottom corner */}
            <div className="absolute bottom-3 end-3 flex flex-col items-end gap-2.5 w-[min(250px,calc(100%-24px))]">
              <div className="w-full rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(59,48,43,0.55)] border border-[#eadfd6] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#f0e8e1]">
                  <span className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                    <img src={FACE_POSTER} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.72rem] font-bold leading-tight truncate">{tr(MOCK.agentName)}</span>
                    <span className="flex items-center gap-1 text-[0.62rem] text-[#3f8f55] leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf63]" />
                      {tr(MOCK.online)}
                    </span>
                  </span>
                  <span className="ms-auto rounded bg-[#f3ece6] px-1.5 py-0.5 text-[0.58rem] font-bold text-[#8a7c74]">AI</span>
                </div>
                <div className="h-[178px] px-2.5 py-2 flex flex-col justify-end gap-1.5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_22%)]">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[86%] rounded-2xl px-2.5 py-1.5 text-[0.72rem] leading-[1.4] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 ${
                        m.agent ? 'self-start bg-[#f3ece6] text-[#3b302b] rounded-es-md' : 'self-end bg-[#c98f7a] text-white rounded-ee-md'
                      }`}
                    >
                      {m.agent ? tr(m.text) : <bdi>{tr(m.text)}</bdi>}
                    </div>
                  ))}
                  {frame.typing && (
                    <div className={`rounded-2xl px-3 py-1 ${frame.typing === 'agent' ? 'self-start bg-[#f3ece6]' : 'self-end bg-[#c98f7a]'}`}>
                      <TypingDots light={frame.typing === 'visitor'} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 border-t border-[#f0e8e1] text-[0.68rem] text-[#8a7c74]">
                  <span className="flex-1 truncate">{tr(MOCK.inputHint)}</span>
                  <Mic className="w-3.5 h-3.5 text-[#c98f7a]" />
                  <SendHorizontal className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </div>
              </div>

              {/* the talking face */}
              <span className="relative w-[68px] h-[68px] shrink-0">
                <span
                  className={`absolute -inset-[3px] rounded-full bg-[conic-gradient(from_180deg,#00b8d9,#7c5cf0,#00b8d9)] transition-opacity duration-300 ${speaking ? 'opacity-100' : 'opacity-60'}`}
                  aria-hidden
                />
                <video
                  ref={faceRef}
                  src={FACE_VIDEO}
                  poster={FACE_POSTER}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="relative w-full h-full rounded-full object-cover border-2 border-white bg-[#eadfd6]"
                />
                <span className="absolute bottom-0.5 end-0.5 w-3.5 h-3.5 rounded-full bg-[#3fbf63] border-2 border-white" aria-hidden />
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp-style lead notification beside the browser (below it on small screens) */}
        <div
          className={`absolute z-10 -bottom-8 start-3 w-[min(220px,calc(100%-120px))] lg:w-[240px] lg:bottom-24 lg:start-[-44px] transition-all duration-500 ${
            frame.lead ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="rounded-2xl bg-[#0b141a] text-[#e9edef] border border-white/10 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.9)] p-3">
            <div className="flex items-center gap-2 text-[0.68rem] text-[#8696a0]">
              <span className="grid place-items-center w-5 h-5 rounded-md bg-[#25D366] text-[#06210f]">
                <WhatsAppGlyph className="w-3.5 h-3.5" />
              </span>
              {MOCK.lead.app}
              <span className="ms-auto font-mono-num">21:47</span>
            </div>
            <p className="mt-2 text-[0.82rem] font-bold">{tr(MOCK.lead.title)}</p>
            <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[0.74rem]">
              {MOCK.lead.rows.map((r, i) => (
                <div key={i} className="contents">
                  <dt className="text-[#8696a0]">{tr(r.k)}</dt>
                  <dd><bdi>{tr(r.v)}</bdi></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <figcaption className="mt-12 lg:mt-4 text-[0.82rem] text-muted-foreground lg:text-center">{tr(HERO.caption)}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ videos */

/** The speaking clip in the visitor's language, 4:5, with a sound button. */
function TalkVideo() {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplay(ref, { prio: 1 });
  const { muted, toggle } = useSound(ref);
  return (
    <figure className="relative">
      <div className="absolute -inset-6 rounded-[36px] stage-glow pointer-events-none" aria-hidden />
      <div className="relative overflow-hidden rounded-[24px] border border-ink/15 bg-white aspect-[4/5] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
        <video
          ref={ref}
          src={tr(TALK_VIDEO)}
          poster={TALK_POSTER}
          muted
          loop
          playsInline
          preload="none"
          aria-label={tr(TALK.videoLabel)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <SoundButton muted={muted} onClick={toggle} className="absolute bottom-3.5 inset-x-3.5" />
      </div>
      <figcaption className="mt-3 text-[0.82rem] text-muted-foreground">{tr(TALK.videoLabel)}</figcaption>
    </figure>
  );
}

/** One small silent clip of the style row. Plays only while it is the active one. */
function StyleClip({ i, active, onEnded }: { i: number; active: boolean; onEnded: () => void }) {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const s = STYLES[i];
  useAutoplay(ref, { enabled: active, threshold: 0.5 });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.addEventListener('ended', onEnded);
    return () => v.removeEventListener('ended', onEnded);
  }, [onEnded]);
  return (
    <li className="min-w-0">
      <div className={`relative overflow-hidden rounded-2xl aspect-[4/5] bg-black border transition-colors ${active ? 'border-live-a/70' : 'border-ink/10'}`}>
        <video
          ref={ref}
          src={s.src}
          poster={s.poster}
          muted
          playsInline
          preload="none"
          aria-label={tr(s.label)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 text-[0.8rem] leading-[1.4] text-ink/65">{tr(s.label)}</p>
    </li>
  );
}

/** Character variety: one clip plays at a time and hands over to the next when it ends. */
function StyleRow() {
  const [active, setActive] = useState(0);
  const next = useRef(() => setActive(a => (a + 1) % STYLES.length)).current;
  return (
    <ul className="mt-4 grid grid-cols-3 gap-3">
      {STYLES.map((_, i) => <StyleClip key={i} i={i} active={i === active} onEnded={next} />)}
    </ul>
  );
}

/** One illustration clip of the business strip. Plays only while it is the active one. */
function BizClip({ i, active, onEnded, onPick, liRef }: {
  i: number; active: boolean; onEnded: () => void; onPick: () => void; liRef: (el: HTMLLIElement | null) => void;
}) {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const c = BIZ.clips[i];
  useAutoplay(ref, { enabled: active, threshold: 0.5 });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.addEventListener('ended', onEnded);
    return () => v.removeEventListener('ended', onEnded);
  }, [onEnded]);
  return (
    <li ref={liRef} data-i={i} className="snap-start shrink-0 w-[42vw] max-w-[190px] md:w-auto md:max-w-none min-w-0">
      <button
        type="button"
        onClick={onPick}
        aria-label={tr(c.label)}
        className={`relative block w-full overflow-hidden rounded-2xl aspect-[9/16] bg-black border transition-colors ${active ? 'border-live-a/70' : 'border-ink/10'}`}
      >
        <video
          ref={ref}
          src={c.src}
          poster={c.poster}
          muted
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
      </button>
      <p className="mt-2 text-[0.88rem] font-semibold text-ink/80">{tr(c.label)}</p>
    </li>
  );
}

/**
 * "Works on any business site": one clip plays at a time and hands over to the next
 * clip that is on screen (on phones the row scrolls sideways). Tap a clip to play it.
 */
function BizStrip() {
  const n = BIZ.clips.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const seen = useRef<number[]>(Array(n).fill(0));
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const pick = (i: number) => { activeRef.current = i; setActive(i); };

  const next = useRef(() => {
    const from = activeRef.current;
    for (let k = 1; k <= n; k++) {
      const j = (from + k) % n;
      if (seen.current[j] >= 0.5) { pick(j); return; }
    }
  }).current;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { seen.current[Number((e.target as HTMLElement).dataset.i)] = e.isIntersecting ? e.intersectionRatio : 0; });
      // the playing clip scrolled out of view: hand over to the first visible one
      if (seen.current[activeRef.current] < 0.5) {
        const j = seen.current.findIndex(r => r >= 0.5);
        if (j >= 0) pick(j);
      }
    }, { threshold: [0, 0.5, 0.9] });
    items.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ul className="mt-7 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
      {BIZ.clips.map((c, i) => (
        <BizClip key={c.id} i={i} active={i === active} onEnded={next} onPick={() => pick(i)} liRef={el => { items.current[i] = el; }} />
      ))}
    </ul>
  );
}

/** The 16:9 tools recording, with sound. */
function WorkVideo() {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplay(ref, { prio: 1 });
  const { muted, toggle } = useSound(ref);
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-ink/15 bg-black aspect-video shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
      <video
        ref={ref}
        src={WORK_VIDEO}
        poster={WORK_POSTER}
        muted
        loop
        playsInline
        preload="none"
        aria-label={tr(WORK.videoLabel)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <SoundButton muted={muted} onClick={toggle} className="absolute bottom-3 start-3" />
    </div>
  );
}

/** Small looping talking face, used as "our" marker in the comparison. */
function LoopFace({ className = '' }: { className?: string }) {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplay(ref, { threshold: 0.5 });
  return (
    <span className={`relative inline-block shrink-0 rounded-full p-[3px] bg-[conic-gradient(from_180deg,#00b8d9,#7c5cf0,#00b8d9)] ${className}`}>
      <video
        ref={ref}
        src={FACE_VIDEO}
        poster={FACE_POSTER}
        muted
        loop
        playsInline
        preload="none"
        aria-label={tr(COMPARE.faceAlt)}
        className="block w-full h-full rounded-full object-cover bg-mist"
      />
    </span>
  );
}

/* ------------------------------------------------------------------ comparison */

function CostBars() {
  const { tr, fontDisplay } = useT();
  const max = COMPARE.bars[0].total;
  const pct = (n: number) => `${Math.max(6, (n / max) * 100)}%`;
  return (
    <div className="mt-10">
      <p className="text-[0.98rem] font-semibold text-ink/85">{tr(COMPARE.scenario)}</p>
      <ul className="mt-6 space-y-5">
        {COMPARE.bars.map(b => (
          <li key={b.name} className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[8rem_1fr] items-center gap-3 sm:gap-5">
            <span className="text-[0.98rem] font-semibold text-ink/70">{b.name}</span>
            <span className="flex items-center gap-3 min-w-0">
              <span className="h-3.5 rounded-full bg-ink/25" style={{ width: pct(b.total) }} aria-hidden />
              <span dir="ltr" className="font-mono-num text-[0.95rem] sm:text-[1.05rem] text-ink/60 whitespace-nowrap">≈{shekel(b.total)}</span>
            </span>
          </li>
        ))}
        <li className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[8rem_1fr] items-center gap-3 sm:gap-5 pt-2">
          <span className="flex items-center gap-2">
            <LoopFace className="w-11 h-11 sm:w-14 sm:h-14" />
            <span className="sr-only sm:not-sr-only text-[0.98rem] font-bold text-ink">{COMPARE.oursName}</span>
          </span>
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
            <span className="h-3.5 rounded-full bg-live-gradient" style={{ width: pct(COMPARE.oursTotal) }} aria-hidden />
            <span className={`${fontDisplay} text-[1.9rem] sm:text-[2.4rem] leading-none text-live-gradient`}>{sh(shekel(COMPARE.oursTotal))}</span>
            <span className="text-[0.82rem] text-ink/60">{tr(COMPARE.oursNote)}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

function CostBreakdown() {
  const { tr } = useT();
  const L = COMPARE.layers;
  return (
    <details className="group mt-10 rounded-2xl border border-ink/10 bg-paper/60">
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-[1rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        {tr(COMPARE.breakdownTitle)}
        <span className="text-live-a text-[1.3rem] leading-none group-open:rotate-45 transition-transform" aria-hidden>+</span>
      </summary>
      <div className="px-5 pb-5">
        {/* md+: one compact table */}
        <table className="hidden md:table w-full table-fixed border-collapse text-[0.9rem]">
          <caption className="sr-only">{tr(COMPARE.scenario)}</caption>
          <thead>
            <tr className="text-start">
              <td className="w-[30%]" />
              <th scope="col" className="p-3 text-start bg-live-a/[0.08] rounded-t-xl font-bold text-ink"><span className="flex items-center gap-2"><LoopFace className="w-9 h-9" />{COMPARE.oursName}</span></th>
              {COMPARE.competitors.map(n => <th key={n} scope="col" className="p-3 text-start font-semibold text-ink/70">{n}</th>)}
            </tr>
          </thead>
          <tbody>
            {L.map((row, i) => (
              <tr key={i} className="border-t border-ink/10 align-top">
                <th scope="row" className="p-3 text-start font-medium text-ink/80">{tr(row.label)}</th>
                <td className="p-3 bg-live-a/[0.08] font-semibold text-ink">
                  <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-live-a" aria-hidden />{tr(row.ours)}</span>
                </td>
                {row.others.map((c, j) => (
                  <td key={j} className="p-3">
                    <span dir="ltr" className="block font-mono-num text-ink/80">{c.t}</span>
                    <span className="mt-0.5 block text-[0.76rem] leading-[1.4] text-ink/50">{tr(c.note)}</span>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-ink/20">
              <th scope="row" className="p-3 text-start font-bold text-ink">{tr(COMPARE.totalLabel)}</th>
              <td className="p-3 bg-live-a/[0.08] rounded-b-xl font-mono-num font-bold text-live-a">{shekel(COMPARE.oursTotal)}</td>
              {COMPARE.otherTotals.map((t, j) => <td key={j} dir="ltr" className="p-3 text-start font-mono-num text-ink/60">{t}</td>)}
            </tr>
          </tbody>
        </table>

        {/* small screens: one block per layer */}
        <dl className="md:hidden divide-y divide-ink/10">
          {L.map((row, i) => (
            <div key={i} className="py-3">
              <dt className="text-[0.9rem] font-semibold text-ink/85">{tr(row.label)}</dt>
              <dd className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.85rem]">
                <span className="font-semibold text-live-a">{COMPARE.oursName}: {tr(row.ours)}</span>
                {row.others.map((c, j) => (
                  <span key={j} className="text-ink/70">{COMPARE.competitors[j]}: <bdi dir="ltr" className="font-mono-num">{c.t}</bdi></span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </details>
  );
}

/* ------------------------------------------------------------------ pricing */

function PlanCard({ p, cta }: { p: Plan; cta: { href: (msg: L10n) => string; track: (where: string) => () => void; Icon: typeof WhatsAppGlyph } }) {
  const { tr } = useT();
  const rec = !!p.recommended;
  return (
    <article
      className={`relative flex flex-col rounded-[22px] p-6 ${
        rec ? 'border-live-gradient bg-[#0f1626] shadow-[0_30px_70px_-40px_rgba(0,184,217,0.6)] xl:-my-3 xl:py-9' : 'border border-ink/12 bg-mist/60'
      }`}
    >
      {rec && (
        <span className="absolute -top-3 start-6 rounded-full bg-live-gradient px-3 py-1 text-[0.75rem] font-semibold text-white">{tr(PRICING.recommended)}</span>
      )}
      <h3 className="text-[1.2rem] font-bold text-ink">{tr(p.name)}</h3>
      <p className="mt-1 text-[0.9rem] text-ink/60">{tr(p.tagline)}</p>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="font-mono-num text-[2.6rem] font-semibold leading-none text-ink">{shekel(p.price)}</span>
        <span className="text-[0.95rem] text-muted-foreground">{tr(PRICING.perMonth)}</span>
      </p>
      <p className="mt-3 text-[0.98rem] text-ink/85">
        <span className="font-mono-num font-semibold">{p.minutes}</span> {tr(PRICING.minutesLabel)}
        <span className="text-ink/55"> · {tr(PRICING.convsLabel(p.convs))}</span>
      </p>
      <p className="mt-1 text-[0.86rem] text-ink/60">
        <span dir="ltr" className="font-mono-num">{p.perConv}</span> {tr(PRICING.perConvLabel)} · <span dir="ltr" className="font-mono-num">{p.perDay}</span> {tr(PRICING.perDayLabel)}
      </p>
      <ul className="mt-5 pt-4 border-t border-ink/10 space-y-2 text-[0.94rem] leading-[1.5] text-ink/85">
        {p.includes.map((f, i) => (
          <li key={i} className="flex gap-2">
            <Check className="w-4 h-4 mt-1 shrink-0 text-live-a" aria-hidden />
            {tr(f)}
          </li>
        ))}
      </ul>
      <div className="flex-1" aria-hidden />
      <a
        href={cta.href(PRICING.planMessage(p.name.en))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={cta.track(`agent_plan_${p.id}`)}
        className={`mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition ${
          rec ? 'bg-ink text-paper hover:bg-white' : 'border border-ink/25 text-ink hover:bg-ink/5'
        }`}
      >
        <cta.Icon className="w-4 h-4 shrink-0" />
        {tr(PRICING.planCta(p.name.en))}
      </a>
    </article>
  );
}

/* ------------------------------------------------------------------ page */

export default function AgentPage() {
  const { language, pick, tr, fontDisplay, isThai } = useT();
  const waHref = (msg: L10n) => (isThai ? LINE_URL : `${WHATSAPP_URL}?text=${encodeURIComponent(tr(msg))}`);
  const ctaUrl = waHref(FINAL.message);
  const CtaIcon = isThai ? LineGlyph : WhatsAppGlyph;
  const ctaColor = isThai ? 'bg-[#06C755]' : 'bg-[#25D366]';
  const ctaShadow = isThai ? 'shadow-[0_14px_34px_-12px_rgba(6,199,85,0.75)]' : 'shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)]';
  const track = (where: string) => () => (isThai ? trackLineClick(where) : trackWhatsAppClick(where));
  const primaryBtn = `inline-flex min-h-[48px] items-center gap-2.5 rounded-full ${ctaColor} text-[#06210f] font-bold px-6 sm:px-7 py-3.5 text-[1rem] leading-snug ${ctaShadow} hover:brightness-105 transition`;

  const meta = routeMeta(PATH)!;
  const pageUrl = urlFor(PATH, language);
  const offer = (name: string, description: string, price: number) => ({
    '@type': 'Offer',
    name: `Refael.ai ${name}`,
    description,
    price: String(price),
    priceCurrency: 'ILS',
    url: `${pageUrl}#pricing`,
    availability: 'https://schema.org/InStock',
    ...(price > 0 ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: String(price), priceCurrency: 'ILS', unitText: 'MONTH' } } : {}),
    seller: { '@id': ORG_ID },
  });
  const offers = [
    offer('Free demo', '3-minute live demo on your own site + consultation', 0),
    ...PRICING.plans.map(p => offer(p.name.en, `${p.minutes} conversation minutes a month, setup ₪0`, p.price)),
  ];
  useSeo({
    path: PATH,
    jsonLd: [
      {
        ...serviceLd(meta.title![language], meta.description![language], pageUrl, language),
        hasOfferCatalog: { '@type': 'OfferCatalog', name: tr(PRICING.title), itemListElement: offers },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: pick('נציג AI חי לאתר', 'Live AI website agent', 'เจ้าหน้าที่ AI แบบสดสำหรับเว็บไซต์'),
        description: meta.description![language],
        image: `${SITE_URL}${FACE_POSTER}`,
        brand: { '@type': 'Brand', name: 'Refael.ai' },
        offers,
      },
      faqLd(FAQ.map(f => ({ q: tr(f.q), a: tr(f.a) }))),
      breadcrumbLd(
        [
          { name: 'Refael.ai', path: '/' },
          { name: pick('נציג שירות AI לאתר', 'AI website agent', 'เจ้าหน้าที่ AI สำหรับเว็บไซต์'), path: PATH },
        ],
        language
      ),
    ],
  });

  const h2 = `${fontDisplay} text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.12] text-ink`;
  const toPricing = () => document.getElementById('pricing')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  const WorkIcons = [MessageCircle, UserPlus, CalendarCheck];

  return (
    <SiteLayout sections={SECTIONS} whatsappMessage={tr(FINAL.message)}>
      {/* HERO */}
      <section className="relative hero-bg overflow-hidden px-4 sm:px-5 pt-24 pb-16 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
        <div className="relative max-w-[1200px] mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <h1 className={`${fontDisplay} text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.1] tracking-tight text-ink`}>{tr(HERO.h1)}</h1>
            <p className="mt-5 text-[1.12rem] sm:text-[1.25rem] leading-[1.6] text-ink/80">{tr(HERO.lead)}</p>

            <p className="mt-7 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-live-a/30 bg-live-a/[0.07] px-4 py-2.5">
              <span className={`${fontDisplay} text-[1.8rem] sm:text-[2.1rem] leading-none text-ink`}>{sh(tr(HERO.priceChip))}</span>
              <span className="text-[0.85rem] text-ink/65">{sh(tr(HERO.priceChipNote))}</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer" onClick={track('agent_hero')} className={primaryBtn}>
                <CtaIcon className="w-5 h-5 shrink-0" />
                {tr(HERO.cta)}
              </a>
              <button
                type="button"
                onClick={toPricing}
                className="inline-flex min-h-[44px] items-center px-1 text-[0.98rem] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {tr(HERO.seePrices)}
              </button>
            </div>
            <p className="mt-3 text-[0.88rem] text-muted-foreground">{tr(HERO.ctaNote)}</p>
          </div>

          <div className="min-w-0 lg:ps-6">
            <HeroMock />
          </div>
        </div>
      </section>

      {/* SEE IT TALK */}
      <section id="talk" className="overflow-hidden px-4 sm:px-5 py-20 lg:py-24 bg-mist">
        <div className="max-w-[1100px] mx-auto grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-center lg:gap-16">
          <div className="min-w-0 contents md:block">
            <div className="order-1">
              <h2 className={h2}>{tr(TALK.title)}</h2>
              <p className="mt-3 text-[1.08rem] leading-[1.6] text-ink/75">{tr(TALK.line)}</p>
            </div>
            <div className="order-3 md:mt-10">
              <h3 className="text-[1.1rem] font-bold text-ink">{tr(TALK.stylesTitle)}</h3>
              <p className="mt-1 text-[0.9rem] text-ink/60">{tr(TALK.stylesNote)}</p>
              <StyleRow />
            </div>
          </div>
          <div className="order-2 md:order-first w-full max-w-[300px] md:max-w-[380px] mx-auto md:mx-0">
            <TalkVideo />
          </div>
        </div>
      </section>

      {/* ANY BUSINESS SITE */}
      <section id="sites" className="px-4 sm:px-5 pt-16 pb-4 lg:pt-20 lg:pb-6 bg-paper overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <h2 className={h2}>{tr(BIZ.title)}</h2>
          <p className="mt-3 text-[1.05rem] leading-[1.6] text-ink/70">{tr(BIZ.line)}</p>
          <BizStrip />
          <p className="mt-4 text-[0.8rem] text-muted-foreground">{tr(BIZ.caption)}</p>
        </div>
      </section>

      {/* SEE IT WORK */}
      <section id="work" className="px-4 sm:px-5 py-20 lg:py-24 bg-paper">
        <div className="max-w-[1000px] mx-auto">
          <h2 className={h2}>{tr(WORK.title)}</h2>
          <p className="mt-3 text-[1.05rem] leading-[1.6] text-ink/70">{tr(WORK.line)}</p>
          <div className="mt-8">
            <WorkVideo />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[1rem] font-semibold text-ink/85">
            {WORK.points.map((p, i) => {
              const Icon = WorkIcons[i];
              return (
                <li key={i} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-live-a shrink-0" aria-hidden />
                  {tr(p)}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* HOW IT STARTS */}
      <section id="how" className="px-4 sm:px-5 py-16 lg:py-20 bg-mist">
        <div className="max-w-[1100px] mx-auto">
          <h2 className={h2}>{tr(HOW.title)}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-10">
            {HOW.steps.map((s, i) => (
              <li key={i} className="flex gap-4 md:block md:border-t md:border-ink/15 md:pt-5">
                <span className="font-mono-num text-[1.4rem] leading-none text-live-a shrink-0">{i + 1}</span>
                <p className="md:mt-3 text-[1.02rem] leading-[1.6] text-ink/85">{tr(s)}</p>
              </li>
            ))}
          </ol>
          <p dir="ltr" className="mt-6 text-[0.85rem] text-ink/50 rtl:text-right">{HOW.platforms}</p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-4 sm:px-5 py-20 lg:py-24 bg-paper">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[1.1rem] font-semibold text-live-a">{tr(PRICING.title)}</h2>
          <p className={`${fontDisplay} mt-3 text-[clamp(2rem,5vw,3.6rem)] leading-[1.1] text-ink max-w-[20ch]`}>{sh(tr(PRICING.statement))}</p>
          <p className="mt-3 text-[0.92rem] text-ink/65">{sh(tr(PRICING.statementNote))}</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
            {/* the free demo */}
            <article className="flex flex-col rounded-[22px] p-6 border border-dashed border-ink/25">
              <h3 className="text-[1.2rem] font-bold text-ink">{tr(PRICING.free.name)}</h3>
              <p className="mt-1 text-[0.9rem] text-ink/60">{tr(PRICING.free.tagline)}</p>
              <p className="mt-5 font-mono-num text-[2.6rem] font-semibold leading-none text-ink">₪0</p>
              <ul className="mt-5 pt-4 border-t border-ink/10 space-y-2 text-[0.94rem] leading-[1.5] text-ink/85">
                {PRICING.free.includes.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-live-a" aria-hidden />
                    {tr(f)}
                  </li>
                ))}
              </ul>
              <div className="flex-1" aria-hidden />
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track('agent_free_card')}
                className={`mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full ${ctaColor} text-[#06210f] font-bold px-5 py-2.5 text-[0.95rem] hover:brightness-105 transition`}
              >
                <CtaIcon className="w-4 h-4 shrink-0" />
                {tr(PRICING.free.cta)}
              </a>
            </article>

            {PRICING.plans.map(p => (
              <PlanCard key={p.id} p={p} cta={{ href: waHref, track, Icon: CtaIcon }} />
            ))}
          </div>

          <dl className="mt-10 grid gap-x-8 gap-y-4 grid-cols-2 lg:grid-cols-4 border-t border-ink/10 pt-6">
            {PRICING.extras.map((x, i) => (
              <div key={i}>
                <dt className="text-[0.85rem] text-ink/60">{tr(x.k)}</dt>
                <dd className="mt-0.5 text-[1rem] font-semibold text-ink">{sh(tr(x.v))}</dd>
              </div>
            ))}
          </dl>
          {language !== 'he' && <p className="mt-6 text-[0.85rem] text-muted-foreground">{tr(PRICING.foreign)}</p>}
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="px-4 sm:px-5 py-20 lg:py-24 bg-mist">
        <div className="max-w-[1000px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.08] text-ink max-w-[22ch] [text-wrap:balance]`}>{tr(COMPARE.hook)}</h2>
          <CostBars />
          <p className="mt-8 text-[0.98rem] leading-[1.6] text-ink/75 max-w-[62ch]">{tr(COMPARE.honest)}</p>
          <CostBreakdown />
          <div className="mt-6 text-[0.78rem] leading-[1.6] text-ink/55">
            <p>{tr(COMPARE.sourcesNote)}</p>
            <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              {COMPARE.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink break-words">
                    {tr(s.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" onClick={track('agent_compare')} className={`mt-10 ${primaryBtn}`}>
            <CtaIcon className="w-5 h-5 shrink-0" />
            {tr(COMPARE.cta)}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 sm:px-5 py-20 lg:py-24 bg-paper">
        <div className="max-w-[820px] mx-auto">
          <h2 className={`${h2} mb-8`}>{tr(FAQ_HEAD)}</h2>
          <FaqList items={FAQ} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-4 sm:px-5 py-20 lg:py-24 hero-bg overflow-hidden">
        <div className="relative max-w-[720px] mx-auto text-center">
          <h2 className={h2}>{tr(FINAL.title)}</h2>
          <p className="mt-4 text-[1.1rem] leading-[1.6] text-ink/80">{tr(FINAL.body)}</p>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" onClick={track('agent_final')} className={`mt-8 ${primaryBtn}`}>
            <CtaIcon className="w-5 h-5 shrink-0" />
            {tr(HERO.cta)}
          </a>
        </div>
      </section>

      <RelatedProducts current={PATH} />
    </SiteLayout>
  );
}
