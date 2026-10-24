import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { useT } from '@/components/refael/i18n';
import { PRODUCTS, type L10n } from '@/config/site';
import { SpeakerGlyph } from './icons';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Unmute + restart a <SpeakingVideo> from anywhere on the page (e.g. a hero button). */
export function playWithSound(id: string) {
  const v = document.getElementById(id) as HTMLVideoElement | null;
  if (!v) return;
  v.muted = false;
  v.currentTime = 0;
  v.play().catch(() => {});
  v.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * A talking-character clip in a lit frame with a LIVE marker. Autoplays muted
 * (browsers block sound), pauses when scrolled away, and never autoplays for
 * people who asked for reduced motion.
 */
export function SpeakingVideo({
  id,
  src,
  poster,
  ratio = '9/16',
  live = true,
  className = '',
}: {
  id: string;
  src: string;
  poster: string;
  ratio?: '4/5' | '9/16' | '1/1';
  live?: boolean;
  className?: string;
}) {
  const { pick } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => setMuted(v.muted);
    v.addEventListener('volumechange', sync);
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => v.removeEventListener('volumechange', sync);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); },
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => { io.disconnect(); v.removeEventListener('volumechange', sync); };
  }, [src]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.muted) { v.muted = false; v.currentTime = 0; v.play().catch(() => {}); }
    else v.muted = true;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-6 rounded-[36px] stage-glow pointer-events-none" aria-hidden />
      <div
        className="relative overflow-hidden rounded-[26px] border border-ink/15 bg-black shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]"
        style={{ aspectRatio: ratio }}
      >
        <video
          id={id}
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {live && (
          <span className="absolute top-3.5 start-3.5 inline-flex items-center gap-1.5 rounded-md bg-[#e5173f] px-2 py-1 text-[0.7rem] font-bold text-white leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
            {pick('שידור חי', 'LIVE', 'ไลฟ์สด')}
          </span>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!muted}
          className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-center gap-2 rounded-full bg-black/65 backdrop-blur-md text-white text-[0.88rem] font-semibold py-2.5 hover:bg-black/80 transition-colors"
        >
          <SpeakerGlyph className="w-4 h-4" />
          {muted ? pick('הפעילו קול', 'Turn the sound on', 'เปิดเสียง') : pick('השתיקו', 'Mute', 'ปิดเสียง')}
        </button>
      </div>
    </div>
  );
}

/** Accessible FAQ: native <details>, so it works without JS and search engines read every answer. */
export function FaqList({ items }: { items: { q: L10n; a: L10n }[] }) {
  const { tr } = useT();
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((it, i) => (
        <details key={i} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.08rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {tr(it.q)}
            <span className="mt-1 shrink-0 text-live-a" aria-hidden>
              <Plus className="w-5 h-5 group-open:hidden" />
              <Minus className="w-5 h-5 hidden group-open:block" />
            </span>
          </summary>
          <p className="mt-3 text-[1rem] leading-[1.75] text-ink/70 max-w-[68ch]">{tr(it.a)}</p>
        </details>
      ))}
    </div>
  );
}

/** "Also from Refael.ai" strip: the other product pages, so no page is a dead end. */
export function RelatedProducts({ current }: { current: string }) {
  const { pick, tr, fontDisplay } = useT();
  const others = PRODUCTS.filter(p => p.path !== current);
  return (
    <section className="px-5 py-20 bg-paper border-t border-ink/10">
      <div className="max-w-[1200px] mx-auto">
        <h2 className={`${fontDisplay} text-[clamp(1.6rem,3.4vw,2.2rem)] text-ink`}>
          {pick('עוד דרכים להשתמש בזה', 'Other ways to use it', 'วิธีใช้งานแบบอื่น')}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map(p => (
            <Link key={p.path} to={p.path} className="group flex gap-4 rounded-2xl border border-ink/10 bg-mist p-3 hover:border-ink/25 transition-colors">
              <img src={tr(p.image)} alt="" loading="lazy" className="w-16 h-16 rounded-xl object-cover object-top bg-ink/10 shrink-0" />
              <span className="py-1">
                <span className="block text-[0.98rem] font-semibold text-ink leading-snug">{tr(p.name)}</span>
                <span className="block text-[0.82rem] text-ink/55 mt-1 line-clamp-2">{tr(p.blurb)}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
