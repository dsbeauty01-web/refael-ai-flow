import { useEffect, useRef, useState } from 'react';
import {
  AvatarCall,
  AvatarVideo,
  ControlBar,
  useAvatarSession,
  useTranscript,
} from '@runwayml/avatars-react';
import '@runwayml/avatars-react/styles.css';

// ============================================================
//  CONFIG — Mia (salon receptionist demo)
// ============================================================
const BOT_SERVER_URL =
  (import.meta as any).env?.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const SALON_AVATAR_ID = '72860735-d02e-49af-9b5d-1020bc956ebc';
const SALON_IMAGE = '/0e55ac1a-f33c-4d3c-8a42-37c6a40bfef0.png';
const MIA_FACE = '/mia.png';
const VIDEO_SRC = '/shil.mp4';
const N8N_MIA_CHAT =
  (import.meta as any).env?.VITE_MIA_TEXT_WEBHOOK ||
  'https://rafa5555.app.n8n.cloud/webhook/salon-bot/v1/chat/completions';
const MIA_USAGE_KEY = 'rapo_mia_usage_v1';
const MIA_DAILY_LIMIT = 2;
const MIA_SESSION_MAX_SEC = 50;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getMiaUsageToday(): number {
  try {
    if (localStorage.getItem('rapo_owner') === '1') return 0;
    const raw = sessionStorage.getItem(MIA_USAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (parsed?.date !== todayKey()) return 0;
    return Number(parsed.count) || 0;
  } catch {
    return 0;
  }
}

function incrementMiaUsage() {
  try {
    if (localStorage.getItem('rapo_owner') === '1') return;
    const next = getMiaUsageToday() + 1;
    sessionStorage.setItem(MIA_USAGE_KEY, JSON.stringify({ date: todayKey(), count: next }));
  } catch {
    /* ignore */
  }
}

// ============================================================
//  Inner avatar view (must be inside <AvatarCall>)
// ============================================================
function MiaInnerView({ onEnd, onTimeUp }: { onEnd: () => void; onTimeUp: () => void }) {
  const session = useAvatarSession();
  const transcript = useTranscript({ interim: false }) as any[];
  const isActive = session.state === 'active';

  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (isActive) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isActive]);

  const [remaining, setRemaining] = useState(MIA_SESSION_MAX_SEC);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const hasTranscript = Array.isArray(transcript) && transcript.some(
    (e) => e && e.text && String(e.text).trim().length > 0
  );

  useEffect(() => {
    if (!isActive) {
      setCountdownStarted(false);
      setRemaining(MIA_SESSION_MAX_SEC);
      return;
    }
    if (!hasTranscript || countdownStarted) return;
    setCountdownStarted(true);
  }, [isActive, hasTranscript, countdownStarted]);

  useEffect(() => {
    if (!countdownStarted) return;
    const t = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(t);
          onTimeUp();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [countdownStarted, onTimeUp]);

  const progressText = (() => {
    if (elapsed < 3) return 'מתחילה את השיחה...';
    if (elapsed < 8) return 'מתחברת אלייך...';
    if (elapsed < 15) return 'כמעט שם...';
    if (elapsed < 25) return 'עוד רגע, מתעוררת...';
    return 'סבלנות קטנה...';
  })();

  return (
    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
      {!isActive && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 text-white z-10 pointer-events-none">
          <div className="w-10 h-10 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <span className="text-sm font-medium">{progressText}</span>
          <span className="text-[10px] text-white/50">{elapsed}s</span>
        </div>
      )}
      <AvatarVideo />

      {isActive && countdownStarted && (
        <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          ⏱ {remaining}s
        </div>
      )}

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
//  MIA CHAT PANEL — text-only chat via n8n (no avatar, no credits)
// ============================================================
type ChatMsg = { id: string; role: 'user' | 'bot'; text: string; ts: number };

function MiaChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'greet',
      role: 'bot',
      text: 'היי, אני מיה! איך אפשר לעזור? אפשר לקבוע תור או לשאול על מחירים.',
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(
    `mia-chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: 'user', text, ts: Date.now() },
    ]);
    setSending(true);
    try {
      const res = await fetch(N8N_MIA_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          session_id: sessionIdRef.current,
          source: 'mia-text-chat',
        }),
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        data?.reply ||
        data?.output ||
        data?.answer ||
        '...';
      setMessages((m) => [
        ...m,
        { id: `b-${Date.now()}`, role: 'bot', text: String(reply), ts: Date.now() },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `e-${Date.now()}`,
          role: 'bot',
          text: 'סליחה, רגע של בעיה. אפשר לנסות שוב.',
          ts: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="absolute inset-0 z-30 bg-[#0a0a1a] flex flex-col" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <img src={MIA_FACE} alt="מיה" className="w-9 h-9 rounded-full object-cover border-2 border-amber-400" />
          <div>
            <div className="text-white font-semibold text-sm">מיה</div>
            <div className="text-white/50 text-[11px]">צ'אט (בלי מיקרופון)</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/60 hover:text-white text-2xl leading-none px-2"
          aria-label="סגור"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`rounded-2xl px-3 py-2 max-w-[85%] text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-amber-400 text-[#2a1f10]' : 'bg-white/10 text-white'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex items-start">
            <div className="bg-white/10 text-white/70 rounded-2xl px-3 py-2 text-sm italic">
              מקלידה...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 p-3 border-t border-white/10 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          disabled={sending}
          placeholder="כתבו הודעה..."
          dir="rtl"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={send}
          disabled={sending || !input.trim()}
          className="rounded-lg bg-amber-400 text-[#2a1f10] font-semibold px-4 py-2 text-sm hover:bg-amber-300 transition-colors disabled:opacity-40"
        >
          שלח
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  ROOT — RealCustomerVideo section
// ============================================================
export function RealCustomerVideo() {
  const [callStarted, setCallStarted] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [limitMsg, setLimitMsg] = useState<string | null>(null);

  const startCall = () => {
    const used = getMiaUsageToday();
    if (used >= MIA_DAILY_LIMIT) {
      setLimitMsg('הגעת למקסימום שיחות יומיות. נסי בצ\'אט במקום.');
      setTimeout(() => setLimitMsg(null), 5000);
      return;
    }
    incrementMiaUsage();
    setCallStarted(true);
  };

  const startChat = () => {
    setChatStarted(true);
  };

  const handleTimeUp = () => {
    console.log('[mia] session time up');
    setCallStarted(false);
  };
  const [awake, setAwake] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Prewarm Render server when Mia section scrolls into view
  // (cheap GET to /prewarm, no Runway session created)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAwake(true);
            // Fire-and-forget prewarm
            fetch(`${BOT_SERVER_URL}/prewarm`, {
              method: 'GET',
              cache: 'no-store',
            }).catch(() => {});
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
          {/* LEFT — video when idle, instruction card when Mia is active */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black min-h-[400px] md:min-h-[520px]">
            {!callStarted ? (
              <>
                <video
                  src={VIDEO_SRC}
                  poster={SALON_IMAGE}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                  dir="rtl"
                >
                  דוגמה אמיתית
                </div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#0f0a08] to-[#1a1410] p-6 md:p-8 flex flex-col" dir="rtl">
                {/* Top badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE DEMO
                  </span>
                  <span className="text-amber-400/70 text-[10px] font-semibold uppercase tracking-widest">
                    מיה · Mia
                  </span>
                </div>

                {/* Hero */}
                <div className="mb-5">
                  <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    הכירו את מיה
                  </h3>
                  <p className="text-amber-300/90 text-base md:text-lg font-semibold mt-1">
                    המזכירה הדיגיטלית
                  </p>
                </div>

                {/* Time-limit warning card */}
                <div className="bg-amber-500/15 border border-amber-400/30 rounded-xl p-3 mb-4 flex items-start gap-3">
                  <div className="text-2xl shrink-0">⏱</div>
                  <div className="flex-1">
                    <div className="text-amber-200 text-sm font-bold">מוגבלת ל-30 שניות</div>
                    <div className="text-amber-100/70 text-[11px] mt-0.5">
                      (שומר לרפאל כסף 😉) אל תבזבזו על צ'יטצ'אט
                    </div>
                  </div>
                </div>

                {/* What you can do */}
                <div className="space-y-3 mb-4 text-white/90 text-sm">
                  <div className="flex items-start gap-2.5">
                    <span className="text-amber-400 text-base shrink-0 leading-tight">💬</span>
                    <div>
                      <div className="font-semibold">אפשר לשאול אותה</div>
                      <div className="text-white/60 text-[12px]">מחירים, שעות, שירותים</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-amber-400 text-base shrink-0 leading-tight">📅</span>
                    <div>
                      <div className="font-semibold">או לקבוע תור</div>
                      <div className="text-white/60 text-[12px]">תגידו שם + אימייל + מתי + שירות</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-amber-400 text-base shrink-0 leading-tight">✉️</span>
                    <div>
                      <div className="font-semibold">תקבלו מייל אמיתי</div>
                      <div className="text-white/60 text-[12px]">בסיום השיחה, אישור לאימייל שלכם</div>
                    </div>
                  </div>
                </div>

                {/* Services pill row */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="bg-white/5 border border-white/10 text-white/80 text-[10px] px-2 py-1 rounded-full">💇 תספורות</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 text-[10px] px-2 py-1 rounded-full">🎨 צבע</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 text-[10px] px-2 py-1 rounded-full">💅 מניקור</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 text-[10px] px-2 py-1 rounded-full">✨ ג'ל</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 text-[10px] px-2 py-1 rounded-full">50–600 ₪</span>
                  </div>

                  {/* English helper */}
                  <p className="text-white/40 text-[10px] leading-relaxed" dir="ltr">
                    🇬🇧 30-sec limit. Try booking: say your name, email, time and any hair or nail service. You'll get a real email.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — salon image with Mia at bottom */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[400px] md:min-h-[520px] bg-[#1a1a2a]">
            <img
              src={SALON_IMAGE}
              alt="קליניקת יופי"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />

            <div className="absolute top-5 right-5 text-white z-10" dir="rtl">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <div className="text-base font-bold drop-shadow-lg">סלון יופי "אלגנט"</div>
                <div className="text-white/90 text-[11px] drop-shadow-lg">
                  תל אביב • פתוח 9:00–20:00
                </div>
              </div>
            </div>

            {/* Daily limit toast */}
            {limitMsg && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-amber-500/95 text-[#2a1f10] text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl max-w-xs text-center" dir="rtl">
                {limitMsg}
              </div>
            )}

            {!callStarted && (
              <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-2 px-4">
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
                  <button
                    type="button"
                    onClick={startCall}
                    className="relative group shrink-0"
                    aria-label="דברי עם מיה"
                  >
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

                    <span className="absolute -top-1 -right-1 inline-flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  </button>

                  <div className="flex flex-col gap-2 items-stretch">
                    <button
                      type="button"
                      onClick={startCall}
                      className="bg-amber-400 hover:bg-amber-300 text-[#2a1f10] text-sm font-bold px-4 py-2.5 rounded-full shadow-xl transition-colors"
                      dir="rtl"
                    >
                      🎤 לדבר איתי
                    </button>
                    <button
                      type="button"
                      onClick={startChat}
                      className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm transition-colors border border-white/20"
                      dir="rtl"
                    >
                      💬 או לכתוב לי בצ'אט
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chat mode overlay */}
            {chatStarted && !callStarted && (
              <MiaChatPanel onClose={() => setChatStarted(false)} />
            )}

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
                    <MiaInnerView onEnd={() => setCallStarted(false)} onTimeUp={handleTimeUp} />
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
