import { MessageCircle } from 'lucide-react';

const AvaFloatingButton = () => {
  return (
    <a
      href="https://dsbeauty01-web.github.io/assitant_love/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="דברו עם אווה"
      className="group fixed bottom-5 right-5 z-[9999] flex items-center gap-3"
    >
      <span className="pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-foreground text-background text-sm font-medium px-3 py-2 rounded-full shadow-lg whitespace-nowrap font-hebrew">
        דברו עם אווה
      </span>
      <span
        className="flex items-center justify-center w-16 h-16 rounded-full text-white shadow-xl hover:scale-110 active:scale-95 transition-transform duration-300"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--coral)) 0%, hsl(24 95% 53%) 100%)',
          boxShadow: '0 10px 30px hsl(var(--coral) / 0.45)',
        }}
      >
        <MessageCircle className="w-7 h-7" strokeWidth={2.2} />
      </span>
    </a>
  );
};

export default AvaFloatingButton;
