import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useT, LANGUAGES, LANGUAGE_LABELS } from '@/components/refael/i18n';

const LINKS = [
  { href: '#what',  he: 'מה היא עושה', en: 'What she does' },
  { href: '#build', he: 'איך זה נבנה', en: 'How it\'s built' },
  { href: '#star',  he: 'הכוכבת', en: 'The Star', star: true },
  { href: '#tech',  he: 'הטכנולוגיה', en: 'The tech' },
];

export default function MayaNav() {
  const { language, setLanguage, pick, isHebrew } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-paper/80 backdrop-blur-xl border-b border-ink/10' : 'bg-transparent'}`}>
      <div className="max-w-[1160px] mx-auto flex items-center justify-between px-5 h-16">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[1.1rem] font-bold tracking-tight text-ink">
            Refael<span className="text-live-gradient">.ai</span>
          </Link>
          <span className="hidden sm:inline text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-muted-foreground">{pick('מאיה · הדגל', 'Maya · Flagship')}</span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <button key={l.href} onClick={() => jump(l.href)} className="text-[0.9rem] text-muted-foreground hover:text-ink transition-colors">
              {pick(l.he, l.en)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 border border-ink/15 rounded-full p-0.5" role="group" aria-label="Language">
            {LANGUAGES.map(lng => (
              <button
                key={lng}
                onClick={() => setLanguage(lng)}
                aria-pressed={language === lng}
                lang={lng}
                className={`text-[0.75rem] font-medium rounded-full px-2.5 py-1 leading-none transition-colors ${language === lng ? 'bg-ink text-paper' : 'text-muted-foreground hover:text-ink'}`}
              >
                {LANGUAGE_LABELS[lng]}
              </button>
            ))}
          </div>
          <button onClick={() => jump('#contact')} className="hidden sm:inline-flex bg-ink text-paper text-[0.85rem] font-semibold px-4 py-1.5 rounded-full hover:bg-ink/85 transition-colors">
            {pick('רוצים אחת כזו?', 'Want one?')}
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
          {LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => jump(l.href)}
              className={`py-3 text-[0.95rem] ${l.star ? 'font-semibold text-live-gradient' : 'text-ink/90 hover:text-ink'} ${isHebrew ? 'text-right' : 'text-left'}`}
            >
              {pick(l.he, l.en)}
            </button>
          ))}
          <button
            onClick={() => jump('#contact')}
            className={`mt-2 bg-ink text-paper text-[0.95rem] font-semibold py-3 rounded-full ${isHebrew ? 'text-center' : 'text-center'}`}
          >
            {pick('רוצים אחת כזו?', 'Want one?')}
          </button>
        </nav>
      )}
    </header>
  );
}
