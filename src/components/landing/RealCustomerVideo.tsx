import { useEffect, useRef, useState } from 'react';
import {
  AvatarCall,
  AvatarVideo,
  ControlBar,
  useAvatarSession,
} from '@runwayml/avatars-react';
import '@runwayml/avatars-react/styles.css';

// ============================================================
//  CONFIG — Mia (salon receptionist demo)
// ============================================================
const BOT_SERVER_URL =
  (import.meta as any).env?.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const SALON_AVATAR_ID = '72860735-d02e-49af-9b5d-1020bc956ebc';
const SALON_IMAGE = '/0e55ac1a-f33c-4d3c-8a42-37c6a40bfef0.png';
// URL-encoded because filename has spaces and underscores
const MIA_FACE = encodeURI(
  '/Nano Banana Pro - Friendly young woman 25 years old_ kids dance instructor_ stylized 3D render with.png'
);
const VIDEO_SRC = '/shil.mp4';

// ============================================================
//  Inner avatar view (must be inside <AvatarCall>)
// ============================================================
function MiaInnerView({ onEnd }: { onEnd: () => void }) {
  const session = useAvatarSession();
  const isActive = session.state === 'active';

  return (
    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
      {!isActive && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 text-white z-10 pointer-events-none">
          <div className="w-10 h-10 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <span className="text-sm">מתחברים למיה...</span>
          <span className="text-xs text-white/60">(עד 50 שניות בפעם הראשונה)</span>
        </div>
      )}
      <AvatarVideo />

      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm">
        <ControlBar />
        <div className="px-3 pb-2 text-center">
          <button
            type="button"
            onClick={onEnd}
            className="text-white/70 hover:text-white text-xs underline"
          >
            סיים שיחה
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  ROOT — RealCustomerVideo section
// ============================================================
export function RealCustomerVideo() {
  const [callStarted, setCallStarted] = useState(false);
  const [awake, setAwake] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer — wake Mia when section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAwake(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-[#0a0a1a] to-[#13131f]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            דמו חי
          </span>
          <h2
            className="text-3xl md:text-5xl font-black text-white tracking-tight"
            dir="rtl"
          >
            ככה זה נראה אצל לקוח אמיתי
          </h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto" dir="rtl">
            דברי עם מיה, המזכירה הדיגיטלית של מספרה. תזמיני תור, תשאלי על מחירים, תראי איך זה עובד.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* LEFT — video */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black min-h-[400px] md:min-h-[520px]">
            <video
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full"
              dir="rtl"
            >
              דוגמה אמיתית
            </div>
          </div>

          {/* RIGHT — salon image with Mia at bottom */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[400px] md:min-h-[520px] bg-[#1a1a2a]">
            {/* Background salon image */}
            <img
              src={SALON_IMAGE}
              alt="קליניקת יופי"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* Bottom gradient so Mia + label are readable */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />

            {/* Salon name label — top-right corner now (so it doesn't fight with Mia) */}
            <div className="absolute top-5 right-5 text-white z-10" dir="rtl">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <div className="text-base font-bold drop-shadow-lg">סלון יופי "אלגנט"</div>
                <div className="text-white/90 text-[11px] drop-shadow-lg">
                  תל אביב • פתוח 9:00–20:00
                </div>
              </div>
            </div>

            {/* Mia avatar — BOTTOM position, not center */}
            {!callStarted && (
              <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-2 px-4">
                {/* Speech bubble — appears when awake */}
                {awake && (
                  <div
                    className="bg-white text-[#2a1f10] text-sm font-semibold rounded-2xl px-4 py-2 shadow-xl relative"
                    dir="rtl"
                    style={{ animation: 'fadeInUp 0.6s ease-out' }}
                  >
                    היי 👋 רוצה לקבוע תור?
                    <div
                      className="absolute left-1/2 -bottom-1.5 w-3 h-3 bg-white rotate-45 -translate-x-1/2"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {/* Mia circle button */}
                  <button
                    type="button"
                    onClick={() => setCallStarted(true)}
                    className="relative group shrink-0"
                    aria-label="דברי עם מיה"
                  >
                    {/* Pulse rings — only when awake */}
                    {awake && (
                      <>
                        <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
                        <span
                          className="absolute inset-0 rounded-full bg-amber-400/25 animate-ping"
                          style={{ animationDelay: '0.6s' }}
                        />
                      </>
                    )}

                    <span
                      className="relative block w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-full shadow-2xl overflow-hidden bg-amber-100 transition-transform group-hover:scale-105"
                      style={{ border: '4px solid #fbbf24' }}
                    >
                      <img
                        src={MIA_FACE}
                        alt="מיה"
                        className="w-full h-full object-cover"
                      />
                    </span>

                    {/* LIVE badge */}
                    <span className="absolute -top-1 -right-1 inline-flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  </button>

                  {/* CTA next to avatar */}
                  <button
                    type="button"
                    onClick={() => setCallStarted(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-[#2a1f10] text-sm font-bold px-4 py-2.5 rounded-full shadow-xl transition-colors"
                    dir="rtl"
                  >
                    🎤 לחצי לדבר איתי
                  </button>
                </div>
              </div>
            )}

            {/* Active call — full overlay */}
            {callStarted && (
              <div className="absolute inset-0 z-30 bg-black/95 backdrop-blur-sm p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3" dir="rtl">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                    <span className="text-white font-semibold">מיה</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCallStarted(false)}
                    className="text-white/70 hover:text-white text-2xl leading-none"
                    aria-label="סגור"
                  >
                    ×
                  </button>
                </div>

                <div className="flex-1 min-h-0">
                  <AvatarCall
                    avatarId={SALON_AVATAR_ID}
                    connectUrl={`${BOT_SERVER_URL}/salon-session`}
                    onEnd={() => setCallStarted(false)}
                  >
                    <MiaInnerView onEnd={() => setCallStarted(false)} />
                  </AvatarCall>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default RealCustomerVideo;
