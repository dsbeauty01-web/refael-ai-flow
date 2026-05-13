import { useState } from 'react';
import { AvatarCall } from '@runwayml/avatars-react';
import '@runwayml/avatars-react/styles.css';

const BOT_SERVER_URL = import.meta.env.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
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
          aria-label="דבר עם היועצת"
        >
          <span className="hidden sm:inline-block bg-[#0a0a1a]/90 text-white text-sm font-medium px-3 py-2 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap">
            דבר עם היועצת
          </span>
          <span
            className="relative w-[70px] h-[70px] rounded-full flex items-center justify-center shadow-xl animate-pulse-ring-cyan"
            style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #0099ff 100%)' }}
          >
            <VideoIcon className="w-8 h-8 text-white" />
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
              <span className="font-semibold text-white">יועצת AI</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-2xl leading-none px-2"
                aria-label="סגור"
              >
                ×
              </button>
            </div>

            <div className="flex-1 relative bg-black flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
                <div className="w-10 h-10 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                <span className="text-sm">מתחברת...</span>
              </div>
              <AvatarCall
                avatarId="default"
                connectUrl={`${BOT_SERVER_URL}/connect`}
                audio
                video
                onEnd={() => setOpen(false)}
                onError={(e) => console.error('Avatar error:', e)}
                className="relative w-full h-full z-10"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAvatarWidget;