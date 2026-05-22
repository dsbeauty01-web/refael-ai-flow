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

// Two webhooks:
//  - LEAD = simple lead capture (form fallback)
//  - TEXT_CHAT = full Mika brain (n8n RAG agent) for text messages
const N8N_LEAD_WEBHOOK = 'https://rafa5555.app.n8n.cloud/webhook/lead-email';
const N8N_TEXT_CHAT =
  (import.meta as any).env?.VITE_MIKA_TEXT_WEBHOOK ||
  'https://rafa5555.app.n8n.cloud/webhook/sales-bot/v1/chat/completions';

const FACE_SRC = '/consultant-face.jpg';
const SESSION_KEY = 'rapo_session_id';
const VISITED_KEY = 'rapo_visited_v1';            // first-time vs returning
const AUTO_GREET_DELAY_MS = 12_000;               // 12s after page load → auto-greet
const WARM_START_DELAY_MS = 3_000;                // 3s after page load → start warming Render
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

// Best-effort: keep the Render free-tier server warm so first connect isn't 50s.
async function warmRenderServer() {
  try {
    await fetch(`${BOT_SERVER_URL}/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    /* swallow — best effort */
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
//  TEXT CHAT PANEL — talks directly to n8n (separate brain from voice)
// ============================================================
function TextChatPanel({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'greet',
      role: 'bot',
      text: 'היי, אני מיקה. אפשר לכתוב לי או ללחוץ על הכפתור הירוק לדבר איתי בקול.',
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
    const userMsg: ChatMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      ts: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
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
        {
          id: `b-${Date.now()}`,
          role: 'bot',
          text: String(reply),
          ts: Date.now(),
        },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: `e-${Date.now()}`,
          role: 'bot',
          text: 'סליחה, רגע קטן של בעיה. אפשר לנסות שוב או להשאיר פרטים בטופס למטה.',
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
                m.role === 'user'
                  ? 'bg-cyan-500 text-[#0a0a1a]'
                  : 'bg-white/10 text-white'
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
//  TRANSCRIPT PANEL (only inside <AvatarCall>) — for VOICE mode
// ============================================================
function TranscriptPanel() {
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
    <div className="flex flex-col flex-1 min-h-0 bg-[#0a0a1a]" dir="rtl">
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-2">
        {messages.length === 0 && (
          <div className="text-center text-white/40 text-xs pt-4">
            {isActive ? 'מיקה מקשיבה — דבר/י איתה דרך המיקרופון 🎤' : 'מתחבר...'}
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`rounded-xl px-3 py-2 max-w-[80%] text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-cyan-500 text-[#0a0a1a]' : 'bg-white/10 text-white'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-white/40 mt-0.5 px-1">{fmt(m.ts)}</span>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-white/10 text-center text-[11px] text-white/40">
        💬 השיחה הקולית מוצגת כאן כטקסט.
      </div>
    </div>
  );
}

// ============================================================
//  LEAD FORM (collapsed by default in voice/text view; full when standalone)
// ============================================================
function LeadForm({ sessionId, compact = false }: { sessionId: string; compact?: boolean }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [businessText, setBusinessText] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submitLead = async () => {
    setErrorMsg(null);
    const n = name.trim();
    const c = contact.trim();
    const b = businessText.trim();
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
          business: b,
          sessionId,
          source: compact ? 'text-mode-form' : 'text-fallback',
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch (err) {
      console.error('[lead] send failed:', err);
      setErrorMsg('שליחה נכשלה. נסה שוב או צור קשר ישירות בוואטסאפ.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        className="flex flex-col bg-[#0a0a1a] items-center justify-center px-6 py-6 text-center"
        dir="rtl"
      >
        <div className="text-3xl mb-2">✅</div>
        <div className="text-white text-sm font-semibold mb-0.5">קיבלנו את הפרטים</div>
        <div className="text-white/60 text-xs">רפאל יחזור אלייך תוך שעתיים.</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-[#0a0a1a] px-4 py-3 gap-2 border-t border-white/10"
      dir="rtl"
    >
      {!compact && (
        <>
          <div className="text-white text-sm font-semibold">השאר/י פרטים — רפאל יחזור אלייך</div>
          <div className="text-white/50 text-xs">
            או לחצ/י על הכפתור הירוק כדי לדבר עם מיקה.
          </div>
        </>
      )}

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={sending}
          placeholder="שם"
          dir="rtl"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          disabled={sending}
          placeholder="טלפון/אימייל"
          dir="ltr"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
      </div>

      {!compact && (
        <textarea
          value={businessText}
          onChange={(e) => setBusinessText(e.target.value)}
          disabled={sending}
          rows={2}
          placeholder="איזה עסק? (לא חובה)"
          dir="rtl"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50 resize-none"
        />
      )}

      {errorMsg && (
        <div className="text-amber-300 text-xs bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
          {errorMsg}
        </div>
      )}

      <button
        type="button"
        onClick={submitLead}
        disabled={sending}
        className="rounded-full bg-cyan-500 text-[#0a0a1a] font-semibold py-2 text-sm hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <span className="w-4 h-4 border-2 border-[#0a0a1a]/30 border-t-[#0a0a1a] rounded-full animate-spin" />
            שולח...
          </>
        ) : (
          'שלח/י פרטים'
        )}
      </button>
    </div>
  );
}

// ============================================================
//  AVATAR VIEW (inside <AvatarCall>)
// ============================================================
function AvatarView({ onClose, onSessionEnd }: { onClose: () => void; onSessionEnd: () => void }) {
  const session = useAvatarSession();
  const isActive = session.state === 'active';
  const state = session.state;

  // Detect unexpected disconnect; signal parent to retry
  useEffect(() => {
    if (state === 'disconnected' || state === 'failed' || state === 'ended') {
      onSessionEnd();
    }
  }, [state, onSessionEnd]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a1a] shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">מיקה</span>
          {isActive && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
          {!isActive && <span className="text-[10px] text-cyan-300/80">מתחבר...</span>}
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

      {/* Video — bigger now (320px) and shows full face uncropped */}
      <div className="relative bg-black h-[320px] shrink-0 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${FACE_SRC})` }}
        />
        {!isActive && (
          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 text-white pointer-events-none z-10">
            <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-xs">מתחבר...</span>
          </div>
        )}
        <AvatarVideo />
      </div>

      <div className="border-t border-white/10 bg-[#0a0a1a] shrink-0">
        <ControlBar />
      </div>

      <TranscriptPanel />
    </div>
  );
}

// ============================================================
//  ROOT
// ============================================================
type Mode = 'text' | 'voice';

export function FloatingAvatarWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('text');
  const [autoOpened, setAutoOpened] = useState(false);
  const [reconnectKey, setReconnectKey] = useState(0); // bump to force re-mount of AvatarCall
  const reconnectAttemptsRef = useRef(0);
  const sessionId = useMemo(() => getSessionId(), []);

  // ── EFFECT 1: warm Render server quickly so first session is fast
  useEffect(() => {
    const t = setTimeout(() => {
      warmRenderServer();
    }, WARM_START_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // ── EFFECT 2: auto-greet first-time visitors after delay
  useEffect(() => {
    const visited = localStorage.getItem(VISITED_KEY);
    if (visited) return; // returning visitor — don't auto-open

    const t = setTimeout(() => {
      if (!document.hidden) {
        setOpen(true);
        setAutoOpened(true);
        localStorage.setItem(VISITED_KEY, '1');
      }
    }, AUTO_GREET_DELAY_MS);

    return () => clearTimeout(t);
  }, []);

  // ── Reconnect logic: when voice session ends unexpectedly while widget is open,
  //    bump reconnectKey to remount <AvatarCall>. Cap at MAX_RECONNECT_ATTEMPTS.
  const handleVoiceSessionEnd = () => {
    if (mode !== 'voice' || !open) return;
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      // Give up silently and fall back to text mode
      reconnectAttemptsRef.current = 0;
      setMode('text');
      return;
    }
    reconnectAttemptsRef.current += 1;
    setTimeout(() => setReconnectKey((k) => k + 1), 1500);
  };

  // Reset reconnect counter whenever mode changes back to text
  useEffect(() => {
    if (mode === 'text') reconnectAttemptsRef.current = 0;
  }, [mode]);

  const startVoice = () => {
    reconnectAttemptsRef.current = 0;
    setMode('voice');
  };

  const stopVoice = () => {
    setMode('text');
    reconnectAttemptsRef.current = 0;
  };

  return (
    <>
      {/* Floating button (only when closed) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3 bg-transparent border-0 p-0 cursor-pointer"
          dir="rtl"
          aria-label="דבר עם מיקה"
        >
          <span className="hidden sm:inline-block bg-[#0a0a1a]/90 text-white text-sm font-medium px-3 py-2 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap">
            דבר איתי עכשיו
          </span>
          <span
            className="relative w-[72px] h-[72px] rounded-full shadow-xl"
            style={{ border: '3px solid #00e5ff' }}
          >
            <img
              src={FACE_SRC}
              alt="מיקה"
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0a0a1a]" />
          </span>
        </button>
      )}

      {/* Modal — bigger panel: 460px wide × 720px tall on desktop */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-end justify-end sm:p-5"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#0a0a1a] text-white w-full h-full sm:w-[460px] sm:h-[720px] sm:max-h-[90vh] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            lang="he"
          >
            {/* Voice mode */}
            {mode === 'voice' && (
              <AvatarCall
                key={reconnectKey}
                avatarId={AVATAR_ID}
                connectUrl={`${BOT_SERVER_URL}/session`}
                onEnd={() => handleVoiceSessionEnd()}
              >
                <AvatarView
                  onClose={() => {
                    setOpen(false);
                    setMode('text');
                  }}
                  onSessionEnd={handleVoiceSessionEnd}
                />
              </AvatarCall>
            )}

            {/* Text mode (default) */}
            {mode === 'text' && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a1a] shrink-0">
                  <div className="flex items-center gap-2">
                    <img
                      src={FACE_SRC}
                      alt="מיקה"
                      className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400"
                    />
                    <div>
                      <div className="text-white font-semibold text-sm">מיקה</div>
                      <div className="text-white/50 text-[11px]">העוזרת של רפאל</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-white/60 hover:text-white text-2xl leading-none px-2"
                    aria-label="סגור"
                  >
                    ×
                  </button>
                </div>

                {/* Voice CTA */}
                <div className="px-4 py-3 bg-[#0a0a1a] border-b border-white/10 shrink-0">
                  <button
                    type="button"
                    onClick={startVoice}
                    className="w-full rounded-full bg-green-500 text-[#0a0a1a] font-semibold py-2.5 text-sm hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                  >
                    🎤 דבר/י עם מיקה בקול
                  </button>
                </div>

                {/* TEXT CHAT — main area */}
                <TextChatPanel sessionId={sessionId} />

                {/* Compact lead form at the bottom */}
                <LeadForm sessionId={sessionId} compact />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAvatarWidget;
