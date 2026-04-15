import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AVATAR_URL = 'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-with-glasses_1142-40898.jpg';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (isOpen) return;

    const showTimeout = setTimeout(() => setShowBubble(true), 3000);
    const hideTimeout = setTimeout(() => setShowBubble(false), 8000);

    const interval = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000);
    }, 30000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <div className="fixed z-[9999]" style={{ bottom: 20, right: 20 }}>
          {/* Speech bubble */}
          <div
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap px-4 py-2 rounded-2xl bg-white text-foreground text-sm font-medium shadow-lg transition-all duration-500"
            style={{
              opacity: showBubble ? 1 : 0,
              transform: showBubble ? 'translateY(0)' : 'translateY(8px)',
              pointerEvents: 'none',
              direction: 'rtl',
            }}
          >
            היי! צריכים עזרה?
            <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
          </div>

          {/* Avatar trigger */}
          <button
            onClick={() => { setIsOpen(true); setShowBubble(false); }}
            className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            style={{ animation: 'avatar-glow 2s ease-in-out infinite' }}
          >
            <img src={AVATAR_URL} alt="AI Assistant" className="w-full h-full object-cover rounded-full" />
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed z-[9999] bottom-0 right-0 w-full h-full md:w-[400px] md:h-[650px] md:bottom-5 md:right-5 flex flex-col overflow-hidden bg-background"
          style={{
            borderRadius: 'clamp(0px, calc((100vw - 767px) * 999), 20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'slide-up-panel 0.3s ease-out',
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shrink-0"
            style={{ borderRadius: 'clamp(0px, calc((100vw - 767px) * 999), 20px) clamp(0px, calc((100vw - 767px) * 999), 20px) 0 0' }}
          >
            <div className="flex items-center gap-2">
              <img src={AVATAR_URL} alt="" className="w-7 h-7 rounded-full object-cover" />
              <span className="font-semibold text-sm tracking-wide">Ava — AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity">
              <X size={20} />
            </button>
          </div>
          <iframe
            src="https://dsbeauty01-web.github.io/assitant_love/"
            width="100%"
            height="100%"
            style={{ border: 'none', flex: 1 }}
            allow="camera;microphone;autoplay"
          />
        </div>
      )}

      <style>{`
        @keyframes avatar-glow {
          0%, 100% { box-shadow: 0 0 0 4px hsl(var(--primary) / 0.4), 0 0 20px hsl(var(--primary) / 0.2); }
          50% { box-shadow: 0 0 0 8px hsl(var(--primary) / 0.25), 0 0 30px hsl(var(--primary) / 0.15); }
        }
        @keyframes slide-up-panel {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default FloatingChatWidget;
