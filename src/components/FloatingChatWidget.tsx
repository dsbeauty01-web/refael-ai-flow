import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full h-full sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[650px] sm:rounded-2xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-border bg-primary text-primary-foreground">
            <span className="font-semibold text-sm">AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
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
    </>
  );
};

export default FloatingChatWidget;
