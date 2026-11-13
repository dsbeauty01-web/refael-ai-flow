import { useEffect, useState, type RefObject } from 'react';
import { useT } from '@/components/refael/i18n';
import { SpeakerGlyph } from './icons';

/**
 * Shared autoplay budget for video-first pages (/customer-service, /live-selling).
 * Moved out of AgentPage.tsx unchanged.
 */
export const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ autoplay budget */

/**
 * Every autoplaying clip on the page registers here. Only clips that are on screen
 * play, and never more than MAX_PLAYING at once: a clip the visitor unmuted wins,
 * then the most visible ones. Reduced motion: nothing registers, posters only.
 */
export const MAX_PLAYING = 2;
const registry = new Map<HTMLVideoElement, { ratio: number; prio: number }>();

export function syncPlayback() {
  const ranked = [...registry.entries()]
    .filter(([, e]) => e.ratio > 0)
    .sort(([va, a], [vb, b]) => (Number(!vb.muted) - Number(!va.muted)) || (b.prio - a.prio) || (b.ratio - a.ratio));
  const allowed = new Set(ranked.slice(0, MAX_PLAYING).map(([v]) => v));
  registry.forEach((_, v) => {
    if (allowed.has(v)) { if (v.paused) v.play().catch(() => {}); }
    else if (!v.paused) v.pause();
  });
}

export function useAutoplay(ref: RefObject<HTMLVideoElement>, { prio = 0, threshold = 0.35, enabled = true } = {}) {
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
export function useSound(ref: RefObject<HTMLVideoElement>) {
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

export function SoundButton({ muted, onClick, className = '' }: { muted: boolean; onClick: () => void; className?: string }) {
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
