import { WHATSAPP_URL } from '@/config/avatars';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-5 text-center">
      <p className="text-[0.9rem] text-muted-foreground">
        Refael.ai · אווטארים חיים לעסקים · Live avatars for business ·{' '}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-live-a underline underline-offset-4">
          WhatsApp
        </a>
      </p>
    </footer>
  );
}