import { useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

const WEBHOOK_URL = 'https://rafa5555.app.n8n.cloud/webhook/d7d9213b-b298-4172-bf81-cd3cf3708fd6/chat';

const AIStoreDemo = () => {
  const ref = useScrollAnimation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [replyText, setReplyText] = useState('Send a message to start talking with the AI avatar.');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ chatInput: text, sessionId }),
      });
      const data = await res.json();
      const output = Array.isArray(data) ? data[0] : data;

      const aiText = output.ai_reply_text || 'No response received.';
      setReplyText(aiText);
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);

      if (output.video_url && typeof output.video_url === 'string' && output.video_url.trim() !== '') {
        setVideoUrl(output.video_url);
      }
    } catch {
      const errMsg = 'Something went wrong. Please try again.';
      setReplyText(errMsg);
      setMessages(prev => [...prev, { role: 'ai', text: errMsg }]);
    } finally {
      setLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 150);
    }
  };

  return (
    <section id="store-demo" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            AI Avatar Chat
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
            Type a message and get a real-time AI video response.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Avatar Video + Reply */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
            <div className="aspect-video bg-secondary flex items-center justify-center">
              {videoUrl ? (
                <video
                  key={videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ borderRadius: 0 }}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center">
                    <Bot className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <span className="text-sm">Avatar will appear here</span>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-border min-h-[80px]">
              <p className="text-sm text-foreground leading-relaxed">{replyText}</p>
            </div>
          </div>

          {/* Right: Chat */}
          <div className="rounded-2xl border border-border bg-card flex flex-col h-[480px]">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                <Bot className="h-4 w-4 text-accent-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">AI Assistant</p>
              <span className="ml-auto w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center pt-8">
                  Send a message to start the conversation.
                </p>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {msg.role === 'ai' && (
                      <div className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center shrink-0">
                        <Bot className="h-3 w-3 text-accent-foreground" />
                      </div>
                    )}
                    <div className={`text-sm px-3 py-2 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-accent/15 text-foreground rounded-br-sm'
                        : 'bg-secondary text-foreground rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <User className="h-3 w-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center">
                      <Bot className="h-3 w-3 text-accent-foreground" />
                    </div>
                    <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-border">
              <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-10 rounded-xl border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={loading || !input.trim()}
                  className="gradient-accent text-accent-foreground rounded-xl h-10 w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStoreDemo;
