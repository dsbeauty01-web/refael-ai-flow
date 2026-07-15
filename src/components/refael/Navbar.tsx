import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useT, NAV_LINKS } from './i18n';

export default function Navbar() {
  const { isHebrew, language, setLanguage, pick } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => setLanguage(language === 'he' ? 'en' : 'he');

  const jump = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? 'bg-white/85 backdrop-blur-md border-b border-ink/8 shadow-[0_1px_12px_rgba(14,19,32,0.05)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1160px] mx-auto flex items-center justify-between px-5 h-16">
        <a href="#" className="text-[1.1rem] font-bold tracking-tight text-ink">
          Refael<span className="text-live-gradient">.ai</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => jump(l.href)}
              className="text-[0.9rem] text-muted-foreground hover:text-ink transition-colors"
            >
              {pick(l.he, l.en)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-[0.8rem] font-medium tracking-widest text-muted-foreground hover:text-ink border border-ink/15 rounded-full px-3 py-1 transition-colors"
            aria-label="Toggle language"
          >
            {language === 'he' ? 'EN' : 'עב'}
          </button>
          <button
            onClick={() => jump('#contact')}
            className="hidden sm:inline-flex bg-ink text-white text-[0.85rem] font-semibold px-4 py-1.5 rounded-full hover:bg-ink/85 transition-colors"
          >
            {pick('דברו איתנו', 'Talk to us')}
          </button>
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-ink/8 px-5 py-4 flex flex-col gap-1 shadow-lg">
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => jump(l.href)}
              className={`py-3 text-[0.95rem] text-ink/90 hover:text-ink ${isHebrew ? 'text-right' : 'text-left'}`}
            >
              {pick(l.he, l.en)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
