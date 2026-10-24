import { useEffect, useState, type ReactNode } from 'react';
import { useT } from '@/components/refael/i18n';
import { WHATSAPP_URL } from '@/config/avatars';
import SiteHeader, { type SectionLink } from './SiteHeader';
import SiteFooter from './SiteFooter';
import { WhatsAppGlyph } from './icons';

/** WhatsApp is the main conversion, so it stays one tap away once the hero is gone. */
function FloatingWhatsApp({ message }: { message?: string }) {
  const { pick } = useT();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const href = message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={pick('דברו איתנו בוואטסאפ', 'Talk to us on WhatsApp', 'คุยกับเราทาง WhatsApp')}
      className={`fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-[#06210f] font-bold shadow-[0_14px_34px_-10px_rgba(37,211,102,0.7)] px-4 py-3 sm:px-5 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <WhatsAppGlyph className="w-6 h-6" />
      <span className="hidden sm:inline text-[0.92rem]">WhatsApp</span>
    </a>
  );
}

/**
 * Every page renders inside this: shared header (with the page's own section
 * links), shared site-map footer, and the floating WhatsApp action.
 */
export default function SiteLayout({
  sections,
  children,
  whatsappMessage,
  className = '',
}: {
  sections?: SectionLink[];
  children: ReactNode;
  whatsappMessage?: string;
  className?: string;
}) {
  const { language, isHebrew, isThai } = useT();
  return (
    <div
      key={language}
      lang={language}
      dir={isHebrew ? 'rtl' : 'ltr'}
      className={`min-h-screen flex flex-col bg-paper text-ink ${isHebrew ? 'font-hebrew' : isThai ? 'font-body-th' : 'font-english'} ${className}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-full"
      >
        {isHebrew ? 'דלגו לתוכן' : isThai ? 'ข้ามไปยังเนื้อหา' : 'Skip to content'}
      </a>
      <SiteHeader sections={sections} />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingWhatsApp message={whatsappMessage} />
    </div>
  );
}
