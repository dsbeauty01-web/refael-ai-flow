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
        scrolled ? 'bg-midnight/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-5 h-14">
        <a href="#" className="text-[1.05rem] font-semibold tracking-tight text-foreground">Refael.ai</a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => jump(l.href)}
              className="text-[0.9rem] text-muted-foreground hover:text-foreground transition-colors"
            >
              {pick(l.he, l.en)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-[0.8rem] font-medium tracking-widest text-muted-foreground hover:text-foreground border border-white/10 rounded-full px-3 py-1"
            aria-label="Toggle language"
          >
            {language === 'he' ? 'EN' : 'עב'}
          </button>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-surface border-t border-white/5 px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => jump(l.href)}
              className={`py-3 text-[0.95rem] text-foreground/90 hover:text-foreground ${isHebrew ? 'text-right' : 'text-left'}`}
            >
              {pick(l.he, l.en)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}