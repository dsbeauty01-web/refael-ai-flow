import { useState } from 'react';
import { AvatarCall, ControlBar } from '@runwayml/avatars-react';
import { useRoomContext } from '@livekit/components-react';
import '@runwayml/avatars-react/styles.css';

const BOT_SERVER_URL = import.meta.env.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const FACE_SRC = '/consultant-face.jpg';

const QUICK_REPLIES = [
  'כמה זה עולה? 💰',
  'אני רוצה הצעת מחיר 📋',
  'מה הבוט יכול לעשות?',
];

function QuickReplies() {
  const room = useRoomContext();
  const send = async (text: string) => {
    try {
      await room.localParticipant.sendText(text, { topic: 'lk.chat' });
    } catch (err) {
      console.error('sendText failed:', err);
    }
  };
  return (
    <div
      dir="rtl"
      className="flex flex-row-reverse flex-wrap gap-2 px-3 py-3 border-t border-white/10 bg-[#0a0a1a]"
    >
      {QUICK_REPLIES.map((q) => (
        <button
          key={q}
          onClick={() => send(q)}
          className="rounded-full px-3 py-1.5 text-xs sm:text-sm text-white bg-[#0a0a1a] border border-cyan-400/60 hover:bg-cyan-400/10 transition-colors whitespace-nowrap"
        >
          {q}
        </button>
      ))}
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
            className="bg-[#0a0a1a] text-white w-full h-full sm:w-[380px] sm:h-[520px] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            lang="he"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a1a]">
              <span className="font-semibold text-white">יועץ AI</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-2xl leading-none px-2"
                aria-label="סגור"
              >
                ×
              </button>
            </div>

            <div className="flex-1 relative bg-black flex items-center justify-center">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${FACE_SRC})` }}
              />
              <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 text-white">
                <div className="w-10 h-10 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                <span className="text-sm">מתחבר...</span>
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
                className="relative w-full h-full z-10"
              >
                <ControlBar showCamera={false} showScreenShare={false} />
                <QuickReplies />
              </AvatarCall>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAvatarWidget;