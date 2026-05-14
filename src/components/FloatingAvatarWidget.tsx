import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AvatarCall,
  AvatarVideo,
  ControlBar,
  AudioRenderer,
  useTranscript,
} from '@runwayml/avatars-react';
import { useLocalParticipant } from '@livekit/components-react';
import '@runwayml/avatars-react/styles.css';

const BOT_SERVER_URL = import.meta.env.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const FACE_SRC = '/consultant-face.jpg';

const QUICK_REPLIES = [
  'כמה זה עולה? 💰',
  'אני רוצה הצעת מחיר 📋',
  'מה הבוט יכול לעשות?',
];

type ChatRole = 'user' | 'bot';
interface ChatMsg {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

function ChatPanel() {
  const transcript = useTranscript({ interim: false });
  const { localParticipant } = useLocalParticipant();
  const localIdentity = localParticipant?.identity;

  const [pending, setPending] = useState<ChatMsg[]>([]);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState('');
  const [userSent, setUserSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Merge transcript entries + locally-sent (typed/quick-reply) messages.
  const messages: ChatMsg[] = useMemo(() => {
    const fromTranscript: ChatMsg[] = transcript
      .filter((e) => e.text && e.text.trim().length > 0)
      .map((e) => ({
        id: `t-${e.id}`,
        role: e.participantIdentity === localIdentity ? 'user' : 'bot',
        text: e.text,
        ts: Date.now(),
      }));
    // Drop pending user messages that the transcript already echoed back.
    const filteredPending = pending.filter(
      (p) => !fromTranscript.some((m) => m.role === 'user' && m.text === p.text),
    );
    return [...fromTranscript, ...filteredPending];
  }, [transcript, pending, localIdentity]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending || !localParticipant) return;
    setSending(true);
    setUserSent(true);
    const msg: ChatMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
      ts: Date.now(),
    };
    setPending((p) => [...p, msg]);
    setInput('');
    try {
      await localParticipant.sendText(trimmed, { topic: 'lk.chat' });
    } catch (err) {
      console.error('sendText failed:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#0a0a1a]" dir="rtl">
      {/* Message history */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 max-h-[200px] overflow-y-auto px-3 py-2 space-y-2"
      >
        {messages.length === 0 && (
          <div className="text-center text-white/40 text-xs pt-4">
            התחל שיחה או בחר שאלה מהירה
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`rounded-xl px-3 py-2 max-w-[80%] text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-cyan-500 text-[#0a0a1a]'
                  : 'bg-white/10 text-white'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-white/40 mt-0.5 px-1">
              {formatTime(m.ts)}
            </span>
          </div>
        ))}
      </div>

      {/* Quick replies — only before first user message */}
      {!userSent && (
        <div className="flex flex-row-reverse flex-wrap gap-2 px-3 py-2 border-t border-white/10">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={sending}
              className="rounded-full px-3 py-1.5 text-xs text-white bg-[#0a0a1a] border border-cyan-400/60 hover:bg-cyan-400/10 transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
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
            // RTL "send" arrow — pointing right→left
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

export function FloatingAvatarWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3 bg-transparent border-0 p-0 cursor-pointer"
          dir="rtl"
          aria-label="דבר עם היועץ"
        >
          <span className="hidden sm:inline-block bg-[#0a0a1a]/90 text-white text-sm font-medium px-3 py-2 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap">
            דבר איתי עכשיו 👋
          </span>
          <span
            className="relative w-[72px] h-[72px] rounded-full shadow-xl animate-pulse-ring-cyan"
            style={{ border: '3px solid #00e5ff' }}
          >
            <img
              src={FACE_SRC}
              alt="יועץ AI"
              className="w-full h-full rounded-full object-cover"
            />
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
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a1a] shrink-0">
              <span className="font-semibold text-white">יועץ AI</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-2xl leading-none px-2"
                aria-label="סגור"
              >
                ×
              </button>
            </div>

            <AvatarCall
              avatarId="default"
              connect={async () => {
                const res = await fetch(`${BOT_SERVER_URL}/session`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ avatarId: 'default' }),
                });
                if (!res.ok) throw new Error(`Session fetch failed: ${res.status}`);
                return await res.json();
              }}
              audio
              video={false}
              onEnd={() => setOpen(false)}
              onError={(e) => console.error('Avatar error:', e)}
              className="flex-1 min-h-0 flex flex-col"
            >
              {/* Video — ~40% of modal */}
              <div className="relative bg-black h-[220px] shrink-0 flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${FACE_SRC})` }}
                />
                <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 text-white pointer-events-none">
                  <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                  <span className="text-xs">מתחבר...</span>
                </div>
                <AvatarVideo />
                <AudioRenderer />
              </div>

              {/* Chat */}
              <ChatPanel />

              {/* Bottom controls — mic + end call only */}
              <div className="border-t border-white/10 bg-[#0a0a1a] shrink-0">
                <ControlBar showCamera={false} showScreenShare={false} />
              </div>
            </AvatarCall>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAvatarWidget;
