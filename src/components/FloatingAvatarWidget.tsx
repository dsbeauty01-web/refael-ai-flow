import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AvatarProvider,
  AvatarVideo,
  AudioRenderer,
  ControlBar,
  useAvatarSession,
  useTranscript,
} from '@runwayml/avatars-react';
import { useLocalParticipant } from '@livekit/components-react';
import '@runwayml/avatars-react/styles.css';

const BOT_SERVER_URL = import.meta.env.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const AVATAR_ID = 'ec39dc74-e835-4dfd-8809-04495f398c99';
const N8N_FALLBACK_URL = 'https://rafa5555.app.n8n.cloud/webhook/sales-bot/v1/chat/completions';
const FACE_SRC = '/consultant-face.jpg';
const SESSION_KEY = 'rapo_session_id';

const QUICK_REPLIES = [
  'כמה זה עולה?',
  'אני רוצה הצעת מחיר',
  'מה הבוט יכול לעשות?',
];

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = (crypto.randomUUID?.() ?? `rapo-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

type ChatRole = 'user' | 'bot';
interface ChatMsg { id: string; role: ChatRole; text: string; ts: number; }

function fmt(ts: number) {
  return new Date(ts).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

/** Chat panel — ALWAYS interactive. Uses avatar when active, n8n otherwise. */
function ChatPanel({ sessionId }: { sessionId: string }) {
  const session = useAvatarSession();
  const { localParticipant } = useLocalParticipant();
  const transcript = useTranscript({ interim: false });
  const localIdentity = localParticipant?.identity;

  const [local, setLocal] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [userSent, setUserSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isActive = session.state === 'active';

  // Merge transcript + locally posted messages (n8n fallback or pending user).
  const messages: ChatMsg[] = useMemo(() => {
    const fromTranscript: ChatMsg[] = transcript
      .filter((e) => e.text && e.text.trim().length > 0)
      .map((e) => ({
        id: `t-${e.id}`,
        role: e.participantIdentity === localIdentity ? 'user' : 'bot',
        text: e.text,
        ts: Date.now(),
      }));
    const dedupedLocal = local.filter(
      (m) => !fromTranscript.some((t) => t.role === m.role && t.text.trim() === m.text.trim()),
    );
    return [...fromTranscript, ...dedupedLocal].sort((a, b) => a.ts - b.ts);
  }, [transcript, local, localIdentity]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setUserSent(true);
    setInput('');
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: 'user', text: trimmed, ts: Date.now() };
    setLocal((p) => [...p, userMsg]);

    try {
      if (isActive && localParticipant) {
        // Send into the live Runway session — avatar will reply with voice + transcript.
        await localParticipant.sendText(trimmed, { topic: 'lk.chat' });
      } else {
        // Fallback: n8n webhook directly.
        const res = await fetch(N8N_FALLBACK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, sessionId, source: 'text-fallback' }),
        });
        const data = await res.json().catch(() => ({}));
        const reply =
          (typeof data?.answer === 'string' && data.answer) ||
          (typeof data?.output === 'string' && data.output) ||
          (typeof data?.message === 'string' && data.message) ||
          'מצטער, לא הצלחתי לענות כרגע.';
        setLocal((p) => [
          ...p,
          { id: `b-${Date.now()}`, role: 'bot', text: reply, ts: Date.now() + 1 },
        ]);
      }
    } catch (err) {
      console.error('[chat] send failed:', err);
      setLocal((p) => [
        ...p,
        {
          id: `e-${Date.now()}`,
          role: 'bot',
          text: 'שגיאה בשליחה. נסה שוב.',
          ts: Date.now() + 1,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#0a0a1a]" dir="rtl">
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-2">
        {messages.length === 0 && (
          <div className="text-center text-white/40 text-xs pt-4">
            {isActive ? 'מיקה מתחילה לדבר...' : 'כתוב הודעה כדי להתחיל'}
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

      {!userSent && (
        <div className="flex flex-row-reverse flex-wrap gap-2 px-3 py-2 border-t border-white/10">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={sending}
              className="rounded-full px-3 py-1.5 text-xs text-white bg-[#0a0a1a] border border-cyan-400/60 hover:bg-cyan-400/10 transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 px-3 py-2 border-t border-white/10 bg-[#0a0a1a]"
      >
        <button
          type="submit"
          disabled={sending || !input.trim()}
          aria-label="שלח"
          className="shrink-0 w-9 h-9 rounded-full bg-cyan-500 text-[#0a0a1a] flex items-center justify-center hover:bg-cyan-400 transition-colors disabled:opacity-50"
        >
          {sending ? (
            <span className="w-4 h-4 border-2 border-[#0a0a1a]/30 border-t-[#0a0a1a] rounded-full animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M20 12 4 4l3 8-3 8 16-8z" transform="scale(-1,1) translate(-24,0)" />
            </svg>
          )}
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          placeholder="כתוב הודעה..."
          dir="rtl"
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
        />
      </form>
    </div>
  );
}

/** Header with status + close. */
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
        {isConnecting && (
          <span className="text-[10px] text-cyan-300/80">מתחבר...</span>
        )}
        {failed && (
          <span className="text-[10px] text-amber-300/90 bg-amber-500/10 border border-amber-400/30 rounded-full px-2 py-0.5">
            (טקסט בלבד)
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

/** Video area with overlay. Mic only when active. */
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
          <div className="px-3 py-2 text-[11px] text-white/40 text-center">המיקרופון יופעל כשהאבטר יתחבר</div>
        )}
      </div>
    </>
  );
}

export function FloatingAvatarWidget() {
  const [open, setOpen] = useState(false);
  const sessionId = useMemo(() => getSessionId(), []);

  // AvatarProvider mounts at the root level so the session auto-starts on page load
  // and persists across opening/closing the panel.
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
