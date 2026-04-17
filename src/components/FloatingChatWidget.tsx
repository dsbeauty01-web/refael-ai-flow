import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Send } from 'lucide-react';

const AVATAR_URL = 'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-with-glasses_1142-40898.jpg';
const WEBHOOK_URL = 'https://rafa5555.app.n8n.cloud/webhook/sales-bot/v1/chat/completions';
const GREETING = 'היי! ברוכים הבאים לרפאל AI. אני אווה, אשמח לעזור!';

const QUICK_BUTTONS = [
  { label: 'מוצרים', message: 'ספרי לי על המוצרים שלכם' },
  { label: 'מחירים', message: 'מה המחירים?' },
  { label: 'דמו חי', message: 'אני רוצה לראות דמו חי' },
  { label: 'ייעוץ חינם', message: 'אני רוצה לקבוע ייעוץ חינם' },
];

type Message = { role: 'user' | 'bot'; content: string };

const FloatingChatWidget = () => {
  const [minimized, setMinimized] = useState(false);
  const [typedGreeting, setTypedGreeting] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Typing animation for greeting
  useEffect(() => {
    if (minimized) return;
    setTypedGreeting('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedGreeting(GREETING.slice(0, i));
      if (i >= GREETING.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [minimized]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    setMessages((m) => [...m, { role: 'user', content }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content }],
          stream: false,
        }),
      });
      const data = await res.json();
      const reply = data?.reply || data?.choices?.[0]?.message?.content || 'מצטערת, לא הצלחתי להגיב כרגע.';
      setMessages((m) => [...m, { role: 'bot', content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'bot', content: 'אופס, יש בעיית חיבור. נסו שוב בעוד רגע.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed z-[9999] bottom-5 right-5 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full text-white shadow-2xl hover:scale-105 transition-transform"
        style={{ background: '#0a0a0f', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
      >
        <span className="relative w-12 h-12 rounded-full overflow-hidden" style={{ animation: 'ava-glow 2s ease-in-out infinite' }}>
          <img src={AVATAR_URL} alt="Ava" className="w-full h-full object-cover" />
        </span>
        <span className="text-sm font-semibold">Chat with Ava</span>
        <style>{glowStyles}</style>
      </button>
    );
  }

  return (
    <div
      dir="rtl"
      className="fixed z-[9999] flex flex-col overflow-hidden bottom-0 right-0 w-full md:bottom-5 md:right-5 md:w-[380px]"
      style={{
        height: 'min(60vh, 500px)',
        background: '#0a0a0f',
        borderRadius: 'clamp(0px, calc((100vw - 767px) * 999), 24px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 shrink-0">
        <span className="text-white text-sm font-semibold tracking-wide">Ava — AI Assistant</span>
        <button onClick={() => setMinimized(true)} className="text-white/70 hover:text-white transition-colors" aria-label="Minimize">
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Avatar + greeting */}
      <div className="flex flex-col items-center pt-3 pb-2 px-4 shrink-0">
        <div className="relative w-[88px] h-[88px] rounded-full overflow-hidden" style={{ animation: 'ava-glow 2s ease-in-out infinite' }}>
          <img src={AVATAR_URL} alt="Ava" className="w-full h-full object-cover" />
        </div>
        <div className="mt-2 px-3 py-1.5 rounded-2xl bg-white/5 text-white text-xs text-center min-h-[2.25rem] max-w-full">
          {typedGreeting}
          <span className="inline-block w-[2px] h-3 bg-white/70 ml-0.5 animate-pulse" />
        </div>
      </div>

      {/* Quick buttons */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-2 shrink-0">
        {QUICK_BUTTONS.map((b) => (
          <button
            key={b.label}
            onClick={() => sendMessage(b.message)}
            disabled={loading}
            className="text-xs py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors disabled:opacity-50"
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 min-h-0">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-xs ${
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-white'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-2xl">...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        className="flex items-center gap-2 p-3 border-t border-white/10 shrink-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="כתבו הודעה..."
          className="flex-1 bg-white/5 text-white placeholder:text-white/40 text-sm rounded-full px-4 py-2 outline-none border border-white/10 focus:border-white/30"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
          aria-label="Send"
        >
          <Send size={16} className="rtl:-scale-x-100" />
        </button>
      </form>

      <style>{glowStyles}</style>
    </div>
  );
};

const glowStyles = `
  @keyframes ava-glow {
    0%, 100% { box-shadow: 0 0 0 3px hsl(var(--primary) / 0.5), 0 0 18px hsl(var(--primary) / 0.35); }
    50% { box-shadow: 0 0 0 6px hsl(var(--primary) / 0.3), 0 0 26px hsl(var(--primary) / 0.2); }
  }
`;

export default FloatingChatWidget;
