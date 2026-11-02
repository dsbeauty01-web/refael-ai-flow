import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ------------------------------------------------------------------ */
/*  Maya floating chat widget                                          */
/*  - Shows a pulsing Maya avatar bubble in the corner                 */
/*  - Opens a chat panel where visitors can talk to Maya               */
/*  - Sends messages to an n8n webhook for RAG-powered answers         */
/*  - Captures leads (name + contact) on the 3rd message               */
/*  - Fires GA4 + FB Pixel events for analytics                       */
/* ------------------------------------------------------------------ */

// TODO: Replace with the real n8n chat webhook URL once it's built
const CHAT_WEBHOOK = import.meta.env.VITE_MAYA_CHAT_WEBHOOK || '';

const MAYA_AVATAR = '/maya/nova-he.jpg';

const COPY = {
  he: {
    greeting: 'היי! אני מאיה, העוזרת הדיגיטלית של Refael.ai 👋\nאיך אני יכולה לעזור?',
    placeholder: 'כתבו הודעה...',
    nameAsk: 'אשמח להכיר! איך קוראים לך ואיך אפשר ליצור איתך קשר? (טלפון / אימייל)',
    offline: 'מאיה לא זמינה כרגע. שלחו הודעה בוואטסאפ ונחזור אליכם!',
    send: 'שלח',
    poweredBy: 'Refael.ai',
  },
  en: {
    greeting: "Hi! I'm Maya, the AI assistant for Refael.ai 👋\nHow can I help?",
    placeholder: 'Type a message...',
    nameAsk: "I'd love to know you! What's your name and how can we reach you? (phone / email)",
    offline: "Maya is offline right now. Send us a WhatsApp and we'll get back to you!",
    send: 'Send',
    poweredBy: 'Refael.ai',
  },
  th: {
    greeting: 'สวัสดีครับ! ผมมายา ผู้ช่วย AI ของ Refael.ai 👋\nช่วยอะไรได้บ้างครับ?',
    placeholder: 'พิมพ์ข้อความ...',
    nameAsk: 'ยินดีที่ได้รู้จักครับ! ชื่ออะไร และติดต่อยังไงดีครับ? (เบอร์โทร / อีเมล)',
    offline: 'มายาออฟไลน์อยู่ครับ ส่งข้อความทาง WhatsApp แล้วเราจะติดต่อกลับครับ!',
    send: 'ส่ง',
    poweredBy: 'Refael.ai',
  },
} as const;

type Message = { role: 'maya' | 'user'; text: string };

function fireEvent(name: string, data?: Record<string, string>) {
  if (typeof window.gtag === 'function') window.gtag('event', name, data);
  if (typeof window.fbq === 'function') window.fbq('trackCustom', name, data);
}

export default function MayaChatWidget() {
  const { language } = useLanguage();
  const t = COPY[language] || COPY.en;

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  // Show greeting when first opened
  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ role: 'maya', text: t.greeting }]);
      fireEvent('maya_chat_open', { language });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    setMsgs(prev => [...prev, { role: 'user', text }]);

    fireEvent('maya_chat_message', { message_number: String(newCount), language });

    // After 2 user messages, ask for contact info (lead capture)
    if (newCount === 2 && !leadCaptured) {
      setMsgs(prev => [...prev, { role: 'maya', text: t.nameAsk }]);
      return;
    }

    // If this is the lead-capture response (3rd message), log it
    if (newCount === 3 && !leadCaptured) {
      setLeadCaptured(true);
      fireEvent('maya_lead_captured', { language, info: text.slice(0, 100) });
    }

    // Send to n8n webhook if configured
    if (!CHAT_WEBHOOK) {
      // Fallback: smart canned responses while webhook isn't wired
      setTimeout(() => {
        setMsgs(prev => [...prev, { role: 'maya', text: getSmartReply(text, language) }]);
      }, 800);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(CHAT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          sessionId: getSessionId(),
          userMsgCount: newCount,
          url: window.location.href,
        }),
      });
      const data = await res.json();
      setMsgs(prev => [...prev, { role: 'maya', text: data.reply || data.text || t.offline }]);
    } catch {
      setMsgs(prev => [...prev, { role: 'maya', text: t.offline }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, userMsgCount, leadCaptured, language, t]);

  return (
    <>
      {/* Floating avatar bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Maya"
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            <img
              src={MAYA_AVATAR}
              alt="Maya"
              className="w-16 h-16 rounded-full object-cover border-2 border-electric shadow-lg
                         group-hover:scale-110 transition-transform duration-200"
            />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-electric animate-ping opacity-30" />
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-paper" />
          </div>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-2rem)]
                      bg-paper border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          dir={language === 'he' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-electric/20 to-purple-600/20 border-b border-white/10">
            <img src={MAYA_AVATAR} alt="Maya" className="w-10 h-10 rounded-full object-cover border border-electric" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">Maya</p>
              <p className="text-xs text-green-400">● Online</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'maya' && (
                  <img src={MAYA_AVATAR} alt="" className="w-7 h-7 rounded-full object-cover mt-1 mx-1 shrink-0" />
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-electric text-white rounded-br-sm'
                      : 'bg-white/10 text-white/90 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <img src={MAYA_AVATAR} alt="" className="w-7 h-7 rounded-full object-cover mt-1 mx-1 shrink-0" />
                <div className="bg-white/10 rounded-2xl px-4 py-2.5 rounded-bl-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-electric" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
            className="flex items-center gap-2 px-3 py-2.5 border-t border-white/10"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white
                         placeholder:text-white/40 outline-none focus:border-electric transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full bg-electric flex items-center justify-center
                         text-white disabled:opacity-40 hover:bg-electric/80 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-[10px] text-white/30 py-1">
            Powered by {t.poweredBy}
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem('maya_sid');
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('maya_sid', id); }
    return id;
  } catch { return 'anon'; }
}

function getSmartReply(input: string, lang: string): string {
  const lower = input.toLowerCase();
  const replies: Record<string, Record<string, string>> = {
    he: {
      price: 'המחירים שלנו מותאמים לכל עסק. רוצה שנדבר על מה שאתה צריך? שלח לי פרטים בוואטסאפ 📱',
      how: 'אני עובדת עם AI מתקדם, זיכרון RAG ומערכות אוטומציה. רוצה לראות דמו? 🎬',
      default: 'מעניין! ספר לי עוד על העסק שלך ואני אגיד מה אפשר לעשות בשבילך 🚀',
    },
    en: {
      price: "Pricing is custom-fit for each business. Want to chat about your needs? Drop me a WhatsApp 📱",
      how: "I work with advanced AI, RAG memory and automation. Want to see a demo? 🎬",
      default: "Interesting! Tell me more about your business and I'll show you what we can do 🚀",
    },
    th: {
      price: 'ราคาปรับตามแต่ละธุรกิจครับ อยากคุยเรื่องที่ต้องการไหมครับ? ส่ง LINE มาได้เลย 📱',
      how: 'ผมทำงานกับ AI ขั้นสูง, ระบบจำ RAG และออโตเมชัน อยากดูเดโมไหมครับ? 🎬',
      default: 'น่าสนใจครับ! เล่าเรื่องธุรกิจให้ฟังหน่อย แล้วผมจะบอกว่าช่วยอะไรได้บ้างครับ 🚀',
    },
  };
  const r = replies[lang] || replies.en;
  if (/price|cost|מחיר|כמה|ราคา|เท่าไ/.test(lower)) return r.price;
  if (/how|work|איך|עובד|ยังไง|ทำงาน/.test(lower)) return r.how;
  return r.default;
}
