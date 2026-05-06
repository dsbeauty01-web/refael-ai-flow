import { MessageCircle } from 'lucide-react';

const MESSENGER_URL = 'https://www.facebook.com/refael.silanikove';

const FloatingMessenger = () => {
  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Messenger"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0084FF] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default FloatingMessenger;
