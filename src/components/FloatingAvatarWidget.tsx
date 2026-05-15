import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AvatarProvider,
  AvatarVideo,
  AudioRenderer,
  ControlBar,
  useAvatarSession,
  useTranscript,
} from '@runwayml/avatars-react';
import '@runwayml/avatars-react/styles.css';

// ============================================================
//  CONFIG
// ============================================================
const BOT_SERVER_URL = import.meta.env.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const AVATAR_ID = 'ec39dc74-e835-4dfd-8809-04495f398c99';

// DUMB lead webhook (no AI). In n8n: Webhook -> Gmail Send. No AI agent in this flow.
// Body: { name, contact, business, sessionId, source, submittedAt }
const N8N_LEAD_WEBHOOK = 'https://rafa5555.app.n8n.cloud/webhook/lead-email';

const FACE_SRC = '/consultant-face.jpg';
const SESSION_KEY = 'rapo_session_id';

// ============================================================
//  HELPERS
// ============================================================
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? `rapo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function fmt(ts: number) {
  return new Date(ts).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

type ChatRole = 'user' | 'bot';
interface ChatMsg { id: string; role: ChatRole; text: string; ts: number; }

// ============================================================
//  CHAT PANEL
//  - Avatar ACTIVE: show live transcript of the voice conversation.
//  - Avatar NOT ACTIVE (loading / failed): show a clean lead-capture form
//    that posts straight to a dumb n8n webhook -> Gmail. No AI in that path.
// ============================================================
function ChatPanel({ sessionId }: { sessionId: string }) {
  const session = useAvatarSession();
  const transcript = useTranscript({ interim: false });
  const isActive = session.state === 'active';

  // Lead-form state (used only when avatar is not active)
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [businessText, setBusinessText] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice transcript -> chat bubbles. SDK shapes vary, so be defensive.
  const messages: ChatMsg[] = useMemo(() => {
    return (transcript as any[])
      .filter((e) => e?.text && String(e.text).trim().length > 0)
      .map((e, i) => {
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
          source: 'text-fallback',
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

  // ----------------- AVATAR ACTIVE -----------------
  if (isActive) {
    return (
      <div className="flex flex-col flex-1 min-h-0 bg-[#0a0a1a]" dir="rtl">
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-2">
          {messages.length === 0 && (
            <div className="text-center text-white/40 text-xs pt-4">
              מיקה מקשיבה — דבר/י איתה דרך המיקרופון 🎤
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
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

  // ----------------- LEAD FORM (avatar not ready) -----------------
  if (sent) {
    return (
      <div className="flex flex-col flex-1 min-h-0 bg-[#0a0a1a] items-center justify-center px-6 text-center" dir="rtl">
        <div className="text-4xl mb-3">✅</div>
        <div className="text-white text-base font-semibold mb-1">קיבלנו את הפרטים</div>
        <div className="text-white/60 text-sm">רפאל יחזור אלייך תוך שעתיים.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#0a0a1a] px-4 py-3 gap-3 overflow-y-auto" dir="rtl">
      <div className="text-white text-sm font-semibold">
        השאר/י פרטים — רפאל יחזור אלייך
      </div>
      <div className="text-white/50 text-xs -mt-2">
        או חכה/י שמיקה תתחבר ותדבר/י איתה בקול.
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-white/70 text-xs">שם</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={sending}
          placeholder="השם שלך"
          dir="rtl"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-white/70 text-xs">טלפון או אימייל</span>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          disabled={sending}
          placeholder="050-1234567 או name@example.com"
          dir="ltr"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-white/70 text-xs">איזה עסק יש לך? (לא חובה)</span>
        <textarea
          value={businessText}
          onChange={(e) => setBusinessText(e.target.value)}
          disabled={sending}
          rows={2}
          placeholder="לדוגמה: חנות תיקים אונליין"
          dir="rtl"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50 resize-none"
        />
      </label>

      {errorMsg && (
        <div className="text-amber-300 text-xs bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
          {errorMsg}
        </div>
      )}

      <button
        type="button"
        onClick={submitLead}
        disabled={sending}
        className="rounded-full bg-cyan-500 text-[#0a0a1a] font-semibold py-2.5 text-sm hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <span className="w-4 h-4 border-2 border-[#0a0a1a]/30 border-t-[#0a0a1a] rounded-full animate-spin" />
            שולח...
          </>
        ) : (
          'שלח/י'
        )}
      </button>
    </div>
  );
}

// ============================================================
//  HEADER
// ============================================================
function PanelHeader({ onClose }: { onClose: () => void }) {
  const session = useAvatarSession();
  const isActive = session.state === 'active';
  const isConnecting = session.state === 'connecting' || session.state === 'idle';
  const failed = session.state === 'error' || session.state === 'ended';

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a1a] shrink-0">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white">מיקה</span>
        {isActive && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
        {isConnecting && <span className="text-[10px] text-cyan-300/80">מתחבר...</span>}
        {failed && (
          <span className="text-[10px] text-amber-300/90 bg-amber-500/10 border border-amber-400/30 rounded-full px-2 py-0.5">
            (טופס בלבד)
          </span>
        )}
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
  );
}

// ============================================================
//  VIDEO AREA
// ============================================================
function VideoArea() {
  const session = useAvatarSession();
  const isActive = session.state === 'active';
  const showOverlay = !isActive;

  return (
    <>
      <div className="relative bg-black h-[220px] shrink-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${FACE_SRC})` }} />
        {showOverlay && (
          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 text-white pointer-events-none z-10">
            <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-xs">
              {session.state === 'error' || session.state === 'ended' ? 'אבטר לא זמין' : 'מתחבר...'}
            </span>
          </div>
        )}
        <AvatarVideo />
        <AudioRenderer />
      </div>
      <div className="border-t border-white/10 bg-[#0a0a1a] shrink-0">
        {isActive ? (
          <ControlBar showCamera={false} showScreenShare={false} />
        ) : (
          <div className="px-3 py-2 text-[11px] text-white/40 text-center">
            המיקרופון יופעל כשהאבטר יתחבר
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================
//  ROOT
// ============================================================
export function FloatingAvatarWidget() {
  const [open, setOpen] = useState(false);
  const sessionId = useMemo(() => getSessionId(), []);

  return (
    <AvatarProvider
      avatarId={AVATAR_ID}
      audio
      video={false}
      onError={(e) => console.error('[avatar] error:', e)}
      connect={async () => {
        const res = await fetch(`${BOT_SERVER_URL}/session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarId: AVATAR_ID, sessionId }),
        });
        if (!res.ok) throw new Error(`Session fetch failed: ${res.status}`);
        return await res.json();
      }}
    >
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
            className="relative w-[72px] h-[72px] rounded-full shadow-xl animate-pulse-ring-cyan"
            style={{ border: '3px solid #00e5ff' }}
          >
            <img src={FACE_SRC} alt="מיקה" className="w-full h-full rounded-full object-cover" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0a0a1a]" />
          </span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-end justify-end sm:p-5"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#0a0a1a] text-white w-full h-full sm:w-[380px] sm:h-[600px] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            lang="he"
          >
            <PanelHeader onClose={() => setOpen(false)} />
            <VideoArea />
            <ChatPanel sessionId={sessionId} />
          </div>
        </div>
      )}
    </AvatarProvider>
  );
}

export default FloatingAvatarWidget;
