// src/components/SalonAvatarWidget.tsx
//
// Two-mode dialog for Maya (salon receptionist).
//
//   MODE A: TEXT chat. Always works. Posts directly to n8n.
//           Independent of Render server. No Runway dependency.
//
//   MODE B: VOICE. Runway avatar via @runwayml/avatars-react.
//           Uses the Render server. May be slow on cold start.
//           If it fails or disconnects, fall back to MODE A.
//
// Critical design choices (locked in based on past pain):
//  - Text mode is the DEFAULT. Voice is opt-in only.
//  - No <form>. Enter + onClick only (so the modal never reloads the page).
//  - Avatar is NEVER auto-connected. User clicks the green voice button.
//  - SessionId stored in localStorage for memory across visits.
//  - Errors in voice never crash the dialog; we just bounce back to text.

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AvatarCall, AvatarVideo, ControlBar } from '@runwayml/avatars-react';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const BOT_SERVER_URL = 'https://bot-vibk.onrender.com';
const VOICE_CONNECT_URL = `${BOT_SERVER_URL}/salon-session`;
const TEXT_CHAT_WEBHOOK =
  'https://rafa5555.app.n8n.cloud/webhook/salon-bot/v1/chat/completions';
const AVATAR_ID = '72860735-d02e-49af-9b5d-1020bc956ebc';
const SESSION_KEY = 'salon_session_id';
const ACCENT = '#d4a574';

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Msg = { role: 'user' | 'bot'; text: string };
type Mode = 'text' | 'voice';

interface Props {
  open: boolean;
  onClose: () => void;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const SalonAvatarWidget = ({ open, onClose }: Props) => {
  const { isHebrew } = useLanguage();
  const [mode, setMode] = useState<Mode>('text');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Stable session id (per browser, persists across visits)
  const sessionIdRef = useRef<string>('');
  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    sessionIdRef.current = id;
  }, []);

  // Greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'bot',
          text: isHebrew
            ? 'היי, אני מאיה! איך אפשר לעזור לך היום?'
            : "Hi, I'm Maya! How can I help you today?",
        },
      ]);
    }
  }, [open, isHebrew, messages.length]);

  // Auto-scroll to latest
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // ─── SEND TEXT (Mode A) ────────────────────────────────────────────────────
  const sendText = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setSending(true);

    try {
      const res = await fetch(TEXT_CHAT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          session_id: sessionIdRef.current,
          source: 'text-chat',
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) throw new Error(`webhook ${res.status}`);

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        data?.reply ||
        data?.output ||
        data?.answer ||
        '...';

      setMessages((m) => [...m, { role: 'bot', text: String(reply) }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: isHebrew
            ? 'סליחה, יש לי בעיה רגעית. אפשר לנסות שוב או לכתוב לרפאל ישירות במסנג׳ר.'
            : "Sorry, having a quick hiccup. Try again or message Refael on Messenger.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  // ─── VOICE CONNECT (Mode B) ────────────────────────────────────────────────
  // AvatarCall expects a connectUrl. The server returns {sessionId, serverUrl, token, roomName}.
  // The SDK handles the WebRTC connection itself.

  const startVoice = () => {
    setVoiceError(null);
    setMode('voice');
  };

  const stopVoice = () => {
    setMode('text');
    setVoiceError(null);
  };

  if (!open) return null;

  // ─── UI ────────────────────────────────────────────────────────────────────
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        dir={isHebrew ? 'rtl' : 'ltr'}
        className={isHebrew ? 'font-hebrew' : 'font-sans'}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#fdf6f0',
          border: '1px solid #eadbc8',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, #d4a574 0%, #c08a5c 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#fff',
                overflow: 'hidden',
                border: '2px solid #fff',
              }}
            >
              <img
                src="/maya-face.jpg"
                alt="Maya"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>
                {isHebrew ? 'מאיה' : 'Maya'}
              </div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>
                {isHebrew ? 'מזכירה דיגיטלית' : 'Digital Receptionist'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            ×
          </button>
        </div>

        {/* TOGGLE BAR */}
        <div
          style={{
            padding: '10px 14px',
            borderBottom: '1px solid #eadbc8',
            display: 'flex',
            gap: '8px',
            background: '#fff8f0',
          }}
        >
          {mode === 'text' ? (
            <button
              onClick={startVoice}
              style={{
                flex: 1,
                background: '#1f9d55',
                color: '#fff',
                border: 'none',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {isHebrew ? '🎤 דברו עם מאיה בקול' : '🎤 Talk to Maya by voice'}
            </button>
          ) : (
            <button
              onClick={stopVoice}
              style={{
                flex: 1,
                background: '#fff',
                color: '#3a2818',
                border: `1px solid ${ACCENT}`,
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {isHebrew ? '↩ חזרה לצ׳אט' : '↩ Back to chat'}
            </button>
          )}
        </div>

        {/* BODY */}
        {mode === 'text' ? (
          <>
            {/* MESSAGES */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minHeight: '300px',
                maxHeight: '50vh',
                background: '#fdf6f0',
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf:
                      m.role === 'user'
                        ? isHebrew
                          ? 'flex-start'
                          : 'flex-end'
                        : isHebrew
                        ? 'flex-end'
                        : 'flex-start',
                    maxWidth: '80%',
                    background: m.role === 'user' ? ACCENT : '#fff',
                    color: m.role === 'user' ? '#fff' : '#3a2818',
                    padding: '10px 14px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    lineHeight: 1.4,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {m.text}
                </div>
              ))}
              {sending && (
                <div
                  style={{
                    alignSelf: isHebrew ? 'flex-end' : 'flex-start',
                    background: '#fff',
                    color: '#8a6850',
                    padding: '10px 14px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontStyle: 'italic',
                  }}
                >
                  {isHebrew ? 'מקלידה...' : 'typing...'}
                </div>
              )}
            </div>

            {/* INPUT */}
            <div
              style={{
                padding: '12px',
                borderTop: '1px solid #eadbc8',
                background: '#fff',
                display: 'flex',
                gap: '8px',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendText();
                  }
                }}
                placeholder={
                  isHebrew ? 'כתבו הודעה...' : 'Type a message...'
                }
                dir={isHebrew ? 'rtl' : 'ltr'}
                disabled={sending}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #eadbc8',
                  background: '#fdf6f0',
                  fontSize: '14px',
                  outline: 'none',
                  color: '#3a2818',
                }}
              />
              <button
                onClick={sendText}
                disabled={sending || !input.trim()}
                style={{
                  background: ACCENT,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0 18px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: sending || !input.trim() ? 'default' : 'pointer',
                  opacity: sending || !input.trim() ? 0.5 : 1,
                }}
              >
                {isHebrew ? 'שלח' : 'Send'}
              </button>
            </div>
          </>
        ) : (
          // ─── VOICE MODE ────────────────────────────────────────────────────
          <div
            style={{
              padding: '20px 16px',
              minHeight: '300px',
              background: '#fdf6f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <p
              style={{
                fontSize: '13px',
                color: '#8a6850',
                textAlign: 'center',
                margin: 0,
              }}
            >
              {isHebrew
                ? 'מתחברת... ההתחברות הראשונה עשויה לקחת עד 50 שניות.'
                : 'Connecting... first connection may take up to 50 seconds.'}
            </p>

            <AvatarCall
              avatarId={AVATAR_ID}
              connectUrl={VOICE_CONNECT_URL}
              onEnd={() => stopVoice()}
              onError={(err: unknown) => {
                console.error('[Maya voice] error:', err);
                setVoiceError(String(err));
              }}
            >
              <div
                style={{
                  width: '220px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#000',
                }}
              >
                <AvatarVideo />
              </div>
              <ControlBar />
            </AvatarCall>

            {voiceError && (
              <div
                style={{
                  fontSize: '12px',
                  color: '#b04a6f',
                  textAlign: 'center',
                  padding: '8px 12px',
                  background: '#ffe4ec',
                  borderRadius: '8px',
                  maxWidth: '320px',
                }}
              >
                {isHebrew
                  ? 'בעיה בחיבור הקול. אפשר לחזור לצ׳אט.'
                  : 'Voice connection issue. Switch back to chat.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonAvatarWidget;
