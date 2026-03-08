import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Bot, User } from 'lucide-react';

interface MockChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatIndex: number;
  title: string;
}

const MockChatModal = ({ open, onOpenChange, chatIndex, title }: MockChatModalProps) => {
  const { t } = useLanguage();

  const chats = t('mockChats') as unknown as Array<Array<{ role: string; text: string }>>;
  const chat = Array.isArray(chats) ? chats[chatIndex] : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Bot className="h-5 w-5 text-accent" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-3 py-4 px-1">
          {Array.isArray(chat) && chat.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'bot' && (
                <div className="w-7 h-7 rounded-full gradient-accent flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-3.5 w-3.5 text-accent-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'gradient-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                }`}
              >
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MockChatModal;
