import { WHATSAPP_URL } from '@/config/avatars';

export default function Footer() {
  return (
    <footer className="bg-ink py-10 px-5 text-center">
      <p className="text-[0.9rem] text-white/60">
        Refael.ai · אווטארים חיים לעסקים · Live avatars for business ·{' '}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-live-a underline underline-offset-4 transition-colors">
          WhatsApp
        </a>
      </p>
    </footer>
  );
}
