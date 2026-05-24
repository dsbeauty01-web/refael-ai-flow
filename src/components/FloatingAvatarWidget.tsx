import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AvatarCall,
  AvatarVideo,
  ControlBar,
  useAvatarSession,
  useTranscript,
} from '@runwayml/avatars-react';
import '@runwayml/avatars-react/styles.css';

// ============================================================
//  CONFIG
// ============================================================
const BOT_SERVER_URL =
  (import.meta as any).env?.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const AVATAR_ID = 'ec39dc74-e835-4dfd-8809-04495f398c99';

const N8N_LEAD_WEBHOOK = 'https://rafa5555.app.n8n.cloud/webhook/lead-email';
const N8N_TEXT_CHAT =
  (import.meta as any).env?.VITE_MIKA_TEXT_WEBHOOK ||
  'https://rafa5555.app.n8n.cloud/webhook/sales-bot/v1/chat/completions';

const FACE_SRC = '/consultant-face.jpg';
const SESSION_KEY = 'rapo_session_id';
const GREETED_KEY = 'rapo_greeted_v2';
const TEASE_DELAY_MS = 10_000;
const MAX_RECONNECT_ATTEMPTS = 3;

// ============================================================
//  HELPERS
// ============================================================
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      (typeof crypto !== 'undefined' && (crypto as any).randomUUID?.()) ||
      `rapo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function fmt(ts: number) {
  try {
    return new Date(ts).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

// Warm Render dyno so first session isn't 50s cold start
async function warmRenderServer() {
  try {
    await fetch(`${BOT_SERVER_URL}/prewarm`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    /* best effort */
  }
}

type ChatRole = 'user' | 'bot';
interface ChatMsg {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
}

// ============================================================
//  TEXT CHAT PANEL — n8n RAG brain (separate from voice transcript)
// ============================================================
function TextChatPanel({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'greet',
      role: 'bot',
      text: 'היי, אני מיקה. אפשר לכתוב לי או פשוט לדבר איתי — אני מקשיבה.',
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      const res = await fetch(N8N_TEXT_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          session_id: sessionId,
          source: 'text-chat-mika',
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
          text: 'סליחה, רגע קטן של בעיה. אפשר לנסות שוב או להשאיר פרטים בטופס.',
          ts: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#0a0a1a]" dir="rtl">
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`rounded-2xl px-3 py-2 max-w-[85%] text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-cyan-500 text-[#0a0a1a]' : 'bg-white/10 text-white'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-white/40 mt-0.5 px-1">{fmt(m.ts)}</span>
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

      <div className="flex gap-2 p-3 border-t border-white/10 bg-[#0a0a1a]">
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
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={send}
          disabled={sending || !input.trim()}
          className="rounded-lg bg-cyan-500 text-[#0a0a1a] font-semibold px-4 py-2 text-sm hover:bg-cyan-400 transition-colors disabled:opacity-40"
        >
          שלח
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  LEAD FORM (compact, sits at bottom)
// ============================================================
function LeadForm({ sessionId }: { sessionId: string }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submitLead = async () => {
    setErrorMsg(null);
    const n = name.trim();
    const c = contact.trim();
    if (!n || !c) {
      setErrorMsg('שם וטלפון/אימייל הם שדות חובה');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(N8N_LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: n,
          contact: c,
          sessionId,
          source: 'mika-widget-form',
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch (err) {
      console.error('[lead] send failed:', err);
      setErrorMsg('שליחה נכשלה. נסה שוב.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        className="flex flex-col bg-[#0a0a1a] items-center justify-center px-6 py-4 text-center border-t border-white/10"
        dir="rtl"
      >
        <div className="text-2xl mb-1">✅</div>
        <div className="text-white text-sm font-semibold mb-0.5">קיבלנו את הפרטים</div>
        <div className="text-white/60 text-xs">רפאל יחזור אלייך תוך שעתיים.</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-[#0a0a1a] px-3 py-2.5 gap-2 border-t border-white/10"
      dir="rtl"
    >
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={sending}
          placeholder="שם"
          dir="rtl"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          disabled={sending}
          placeholder="טלפון/אימייל"
          dir="ltr"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
      </div>

      {errorMsg && (
        <div className="text-amber-300 text-xs bg-amber-500/10 border border-amber-400/30 rounded-lg px-2 py-1">
          {errorMsg}
        </div>
      )}

      <button
        type="button"
        onClick={submitLead}
        disabled={sending}
        className="rounded-full bg-cyan-500 text-[#0a0a1a] font-semibold py-1.5 text-sm hover:bg-cyan-400 transition-colors disabled:opacity-50"
      >
        {sending ? 'שולח...' : 'השאר/י פרטים'}
      </button>
    </div>
  );
}

// ============================================================
//  VOICE PANE — avatar video + transcript (inside <AvatarCall>)
// ============================================================
function VoicePane() {
  const session = useAvatarSession();
  const transcript = useTranscript({ interim: false }) as any[];
  const isActive = session.state === 'active';
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages: ChatMsg[] = useMemo(() => {
    if (!Array.isArray(transcript)) return [];
    return transcript
      .filter((e) => e && e.text && String(e.text).trim().length > 0)
      .map((e: any, i: number) => {
        const isUser =
          e?.isUser === true ||
          e?.isLocal === true ||
          e?.role === 'user' ||
          e?.participantIdentity === 'local' ||
          e?.source === 'user';
        return {
          id: `t-${e?.id ?? i}`,
          role: (isUser ? 'user' : 'bot') as ChatRole,
          text: String(e.text),
          ts: typeof e?.timestamp === 'number' ? e.timestamp : Date.now() + i,
        };
      });
  }, [transcript]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <div className="flex flex-col">
      {/* Avatar video */}
      <div className="relative bg-black h-[280px] shrink-0 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${FACE_SRC})` }}
        />
        {!isActive && (
          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 text-white pointer-events-none z-10">
            <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-xs">מתחברת...</span>
            <span className="text-[10px] text-white/60">(עד 50 שניות בפעם הראשונה)</span>
          </div>
        )}
        <AvatarVideo />
      </div>

      {/* Voice controls */}
      <div className="border-t border-white/10 bg-[#0a0a1a] shrink-0">
        <ControlBar />
      </div>

      {/* Voice transcript — small, appears under controls */}
      {messages.length > 0 && (
        <div
          ref={scrollRef}
          className="bg-[#0a0a1a] border-t border-white/10 max-h-[120px] overflow-y-auto px-3 py-2 space-y-1.5"
          dir="rtl"
        >
          {messages.slice(-4).map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-2.5 py-1 text-[11px] leading-snug max-w-[85%] ${
                  m.role === 'user' ? 'bg-cyan-500/20 text-cyan-100' : 'bg-white/5 text-white/80'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
//  ROOT
// ============================================================
export function FloatingAvatarWidget() {
  const [open, setOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [showTease, setShowTease] = useState(false);
  const [reconnectKey, setReconnectKey] = useState(0);
  const reconnectAttemptsRef = useRef(0);
  const sessionId = useMemo(() => getSessionId(), []);

  // ── EFFECT 1: warm Render dyno IMMEDIATELY on mount (no delay)
  //   Cold start is ~50s — every second counts. Pinging on page load
  //   means by the time user clicks, server is awake or close to it.
  useEffect(() => {
    warmRenderServer();
    // Also re-ping every 4 min to keep dyno warm while user is on the page
    const interval = setInterval(() => warmRenderServer(), 4 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ── EFFECT 1b: close on ESC key (only acceptable close shortcut besides X)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── EFFECT 2: tease bubble for new visitors after 10s
  //   - Only first-time visitors (localStorage check)
  //   - Only if tab is still visible (skips bouncers)
  //   - Tease = pulse + speech bubble, NOT auto-open the modal
  useEffect(() => {
    const greeted = localStorage.getItem(GREETED_KEY);
    if (greeted) return;

    const t = setTimeout(() => {
      if (!document.hidden) {
        setShowTease(true);
        localStorage.setItem(GREETED_KEY, '1');
      }
    }, TEASE_DELAY_MS);

    return () => clearTimeout(t);
  }, []);

  // ── Reconnect logic for voice
  const handleVoiceEnd = () => {
    if (!voiceActive) return;
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      reconnectAttemptsRef.current = 0;
      setVoiceActive(false);
      return;
    }
    reconnectAttemptsRef.current += 1;
    setTimeout(() => setReconnectKey((k) => k + 1), 1500);
  };

  // Open widget + start voice immediately (one click, both running)
  const openAndStartVoice = () => {
    setShowTease(false);
    setOpen(true);
    setVoiceActive(true);
    reconnectAttemptsRef.current = 0;
  };

  const closeAll = () => {
    setOpen(false);
    setVoiceActive(false);
    reconnectAttemptsRef.current = 0;
  };

  return (
    <>
      {/* Floating button — visible when modal closed */}
      {!open && (
        <button
          type="button"
          onClick={openAndStartVoice}
          className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3 bg-transparent border-0 p-0 cursor-pointer"
          dir="rtl"
          aria-label="דבר עם מיקה"
        >
          {/* Tease speech bubble — only for new visitors after 10s */}
          {showTease && (
            <span
              className="hidden sm:inline-block bg-white text-[#2a1f10] text-sm font-semibold px-3 py-2 rounded-2xl shadow-xl relative"
              style={{ animation: 'rapoFadeInUp 0.5s ease-out' }}
            >
              היי! יש לך רגע? 👋
              <span
                className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"
                aria-hidden="true"
              />
            </span>
          )}

          {/* Default static tag — shows when not teasing */}
          {!showTease && (
            <span className="hidden sm:inline-block bg-[#0a0a1a]/90 text-white text-sm font-medium px-3 py-2 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap">
              דבר איתי עכשיו
            </span>
          )}

          {/* Avatar bubble */}
          <span
            className="relative w-[130px] h-[130px] rounded-full shadow-xl"
            style={{ border: '3px solid #00e5ff' }}
          >
            {/* Pulse rings — only when teasing */}
            {showTease && (
              <>
                <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
                <span
                  className="absolute inset-0 rounded-full bg-cyan-400/25 animate-ping"
                  style={{ animationDelay: '0.6s' }}
                />
              </>
            )}
            <img
              src={FACE_SRC}
              alt="מיקה"
              className="relative w-full h-full rounded-full object-cover"
            />
            <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0a0a1a]" />
          </span>
        </button>
      )}

      {/* Modal — bigger on desktop. Stable: no backdrop-click close, only X or ESC */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-end justify-end sm:p-5 pointer-events-none"
        >
          <div
            className="bg-[#0a0a1a] text-white w-full h-full sm:w-[460px] sm:h-[760px] sm:max-h-[92vh] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10 pointer-events-auto"
            dir="rtl"
            lang="he"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a1a] shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src={FACE_SRC}
                  alt="מיקה"
                  className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400"
                />
                <div>
                  <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                    מיקה
                    {voiceActive && (
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    )}
                  </div>
                  <div className="text-white/50 text-[11px]">העוזרת של רפאל</div>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAll}
                className="text-white/60 hover:text-white text-2xl leading-none px-2"
                aria-label="סגור"
              >
                ×
              </button>
            </div>

            {/* VOICE PANE — top, with AvatarCall wrapper */}
            {voiceActive && (
              <AvatarCall
                key={reconnectKey}
                avatarId={AVATAR_ID}
                connectUrl={`${BOT_SERVER_URL}/session`}
                onEnd={handleVoiceEnd}
              >
                <VoicePane />
              </AvatarCall>
            )}

            {/* TEXT CHAT — main scrollable area */}
            <TextChatPanel sessionId={sessionId} />

            {/* LEAD FORM — compact at bottom */}
            <LeadForm sessionId={sessionId} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes rapoFadeInUp {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default FloatingAvatarWidget;
