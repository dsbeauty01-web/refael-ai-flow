import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-[9999] w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          style={{ bottom: 20, right: 20, animation: 'pulse-ring 2s ease-in-out infinite' }}
        >
          <MessageCircle size={30} fill="white" stroke="white" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed z-[9999] bottom-0 right-0 w-full h-full md:w-[400px] md:h-[650px] md:bottom-5 md:right-5 flex flex-col overflow-hidden"
          style={{
            borderRadius: window.innerWidth >= 768 ? 20 : 0,
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            animation: 'slide-up-panel 0.3s ease-out',
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground" style={{ borderRadius: window.innerWidth >= 768 ? '20px 20px 0 0' : 0 }}>
            <span className="font-semibold text-sm tracking-wide">Ava — AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity">
              <X size={20} />
            </button>
          </div>
          <iframe
            src="https://dsbeauty01-web.github.io/assitant_love/"
            width="100%"
            height="100%"
            style={{ border: 'none', flex: 1, background: '#fff' }}
            allow="camera;microphone;autoplay"
          />
        </div>
      )}

      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.5); }
          70% { box-shadow: 0 0 0 12px hsl(var(--primary) / 0); }
          100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0); }
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
