import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const WEBHOOK_URL = 'https://rafa5555.app.n8n.cloud/webhook/d7d9213b-b298-4172-bf81-cd3cf3708fd6/chat';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  videoUrl?: string | null;
}

function getSessionId(): string {
  const key = 'ai-chat-session-id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function normalizeResponse(data: unknown): { ai_reply_text?: string; video_url?: string; status?: string; video_job_id?: string } {
  if (Array.isArray(data)) return data[0] ?? {};
  if (typeof data === 'object' && data !== null) return data as Record<string, string>;
  return {};
}

const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(getSessionId);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const raw = await res.json();
      console.log('[AI Chat] Raw webhook response:', raw);

      const output = normalizeResponse(raw);
      const aiText = output.ai_reply_text || '';
      const videoUrl = output.video_url && output.video_url.trim() !== '' ? output.video_url : null;

      if (!aiText && !videoUrl) {
        setMessages(prev => [...prev, { role: 'assistant', text: 'No response received from the assistant.' }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: aiText || '(Video response)',
          videoUrl,
        }]);
      }
    } catch (err) {
      console.error('[AI Chat] Error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `⚠️ Something went wrong. Please try again. (${err instanceof Error ? err.message : 'Unknown error'})`,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(215,25%,8%)] text-[hsl(210,20%,95%)] flex flex-col">
      {/* Header */}
      <header className="border-b border-[hsl(215,20%,18%)] px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-[hsl(166,84%,32%)] flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">AI Video Assistant</h1>
          <p className="text-xs text-[hsl(215,15%,55%)]">Powered by AI • Ask me anything</p>
        </div>
        <span className="ml-auto w-2.5 h-2.5 rounded-full bg-[hsl(166,84%,32%)] animate-pulse" />
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-[hsl(215,15%,45%)]">
            <div className="w-20 h-20 rounded-full bg-[hsl(215,20%,14%)] border border-[hsl(215,20%,22%)] flex items-center justify-center">
              <Bot className="h-10 w-10 text-[hsl(166,84%,32%)]" />
            </div>
            <p className="text-center text-sm max-w-xs">Send a message to start chatting with the AI assistant. Text and video responses will appear here.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2.5 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1 ${
                msg.role === 'user'
                  ? 'bg-[hsl(215,20%,22%)]'
                  : 'bg-[hsl(166,84%,32%)]'
              }`}>
                {msg.role === 'user'
                  ? <User className="h-4 w-4 text-[hsl(215,15%,60%)]" />
                  : <Bot className="h-4 w-4 text-white" />
                }
              </div>

              {/* Bubble */}
              <div className={`rounded-2xl px-4 py-3 space-y-3 ${
                msg.role === 'user'
                  ? 'bg-[hsl(166,84%,32%)] text-white rounded-tr-sm'
                  : 'bg-[hsl(215,20%,14%)] border border-[hsl(215,20%,22%)] rounded-tl-sm'
              }`}>
                {msg.text && (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                )}
                {msg.videoUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[hsl(215,20%,22%)]">
                    <video
                      key={msg.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full max-w-lg"
                      style={{ minHeight: 200 }}
                    >
                      <source src={msg.videoUrl} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-2.5 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-[hsl(166,84%,32%)] shrink-0 flex items-center justify-center mt-1">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-[hsl(215,20%,14%)] border border-[hsl(215,20%,22%)] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[hsl(166,84%,32%)]" />
                <span className="text-sm text-[hsl(215,15%,55%)]">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[hsl(215,20%,18%)] px-4 py-3 shrink-0">
        <form
          onSubmit={e => { e.preventDefault(); sendMessage(); }}
          className="flex gap-2 max-w-3xl mx-auto"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 h-11 rounded-xl border border-[hsl(215,20%,22%)] bg-[hsl(215,20%,12%)] px-4 text-sm text-[hsl(210,20%,95%)] placeholder:text-[hsl(215,15%,40%)] focus:outline-none focus:ring-2 focus:ring-[hsl(166,84%,32%)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-11 w-11 rounded-xl bg-[hsl(166,84%,32%)] hover:bg-[hsl(166,84%,38%)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
