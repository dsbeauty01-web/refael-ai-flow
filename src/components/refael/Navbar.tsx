import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useT, NAV_LINKS, LANGUAGES, LANGUAGE_LABELS } from './i18n';

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

  const jump = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? 'bg-paper/80 backdrop-blur-xl border-b border-ink/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1160px] mx-auto flex items-center justify-between px-5 h-16">
        <a href="#" className="text-[1.1rem] font-bold tracking-tight text-ink">
          Refael<span className="text-live-gradient">.ai</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          <Link
            to="/maya"
            className="text-[0.9rem] font-semibold text-live-gradient hover:brightness-110 transition"
          >
            {pick('מאיה · הדגל', 'Maya · Flagship', 'มายา · เรือธง')}
          </Link>
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => jump(l.href)}
              className="text-[0.9rem] text-muted-foreground hover:text-ink transition-colors"
            >
              {pick(l.he, l.en, l.th)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-0.5 border border-ink/15 rounded-full p-0.5"
            role="group"
            aria-label="Language"
          >
            {LANGUAGES.map(lng => (
              <button
                key={lng}
                onClick={() => setLanguage(lng)}
                aria-pressed={language === lng}
                lang={lng}
                className={`text-[0.75rem] font-medium rounded-full px-2.5 py-1 leading-none transition-colors ${
                  language === lng
                    ? 'bg-ink text-paper'
                    : 'text-muted-foreground hover:text-ink'
                }`}
              >
                {LANGUAGE_LABELS[lng]}
              </button>
            ))}
          </div>
          <button
            onClick={() => jump('#contact')}
            className="hidden sm:inline-flex bg-ink text-paper text-[0.85rem] font-semibold px-4 py-1.5 rounded-full hover:bg-ink/85 transition-colors"
          >
            {pick('דברו איתנו', 'Talk to us', 'ติดต่อเรา')}
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
        <nav className="md:hidden bg-paper border-t border-ink/10 px-5 py-4 flex flex-col gap-1 shadow-lg">
          <Link
            to="/maya"
            onClick={() => setOpen(false)}
            className={`py-3 text-[0.95rem] font-semibold text-live-gradient ${isHebrew ? 'text-right' : 'text-left'}`}
          >
            {pick('מאיה · הדגל', 'Maya · Flagship', 'มายา · เรือธง')}
          </Link>
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => jump(l.href)}
              className={`py-3 text-[0.95rem] text-ink/90 hover:text-ink ${isHebrew ? 'text-right' : 'text-left'}`}
            >
              {pick(l.he, l.en, l.th)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
