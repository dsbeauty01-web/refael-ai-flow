import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useT } from '@/components/refael/i18n';
import { MAYA_IDLE, MAYA_POSTER, MAYA_SPEAKING } from '@/config/avatars';

/**
 * The flagship stage: Maya standing in her lit panel, looping silently until the
 * visitor wakes her — then she speaks, out loud, in their language. Same "never a
 * dead iframe" rule as the home hero: the wake button plays her real recorded clip
 * (guaranteed), and the live-wake pod can later slot in behind the same trigger.
 *
 * `overlay` lets a section composite a live card / caption on top of the footage.
 */
export default function MayaStage({
  clip,
  speakOnWake = true,
  overlay,
  className = '',
}: {
  clip?: string;
  speakOnWake?: boolean;
  overlay?: ReactNode;
  className?: string;
}) {
  const { pick, language } = useT();
  const [speaking, setSpeaking] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const speakingSrc = MAYA_SPEAKING[language];

  useEffect(() => {
    if (!speaking) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.currentTime = 0;
    v.play().catch(() => setBlocked(true));
  }, [speaking]);

  const wake = () => {
    if (!speakOnWake) return;
    setBlocked(false);
    setSpeaking(true);
  };

  const src = speaking ? speakingSrc : clip ?? MAYA_IDLE;

  return (
    <div className={`relative mx-auto w-[min(82vw,360px)] sm:w-[400px] lg:w-[440px] ${className}`}>
      <div className="absolute -inset-10 stage-glow pointer-events-none" aria-hidden />

      <div className="relative stage px-4 pt-4 overflow-hidden">
        <video
          ref={videoRef}
          key={speaking ? 'speaking' : clip ?? 'idle'}
          src={src}
          poster={MAYA_POSTER}
          autoPlay
          muted={!speaking}
          playsInline
          loop={!speaking}
          onEnded={() => setSpeaking(false)}
          className="relative w-full h-auto blend-white"
          aria-label={pick('מיה — אווטארית חיה בגוף מלא', 'Maya — a full-body live avatar')}
        />

        {overlay}

        {speaking && !blocked && (
          <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 bg-live-gradient text-white text-[0.78rem] font-semibold px-3.5 py-1.5 rounded-full shadow-[0_8px_20px_-8px_rgba(0,184,217,0.6)]">
              <VoiceBars />
              {pick('הקול שלה — חי', 'Her real voice')}
            </span>
          </div>
        )}

        {blocked && (
          <div className="absolute inset-x-0 top-3 flex justify-center px-4">
            <button
              onClick={() => { const v = videoRef.current; if (v) { v.muted = false; v.play().then(() => setBlocked(false)).catch(() => {}); } }}
              className="inline-flex items-center gap-2 bg-paper text-ink text-[0.78rem] font-semibold px-3.5 py-1.5 rounded-full shadow-lg"
            >
              {pick('הדפדפן חסם את הקול — הקישו להפעלה', 'Your browser blocked the sound — tap to play')}
            </button>
          </div>
        )}

        <div className="absolute inset-x-10 bottom-3 h-6 avatar-floor pointer-events-none" aria-hidden />
      </div>

      {speakOnWake && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={wake}
            className="group inline-flex items-center gap-2.5 bg-live-gradient text-white font-semibold px-7 py-3.5 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition-all"
          >
            <MicIcon />
            {pick('דברו איתה עכשיו', 'Talk to her now')}
          </button>
        </div>
      )}
    </div>
  );
}

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

function MicIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10a7 7 0 0 1-14 0" />
      <path d="M12 17v5" />
    </svg>
  );
}
