import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const links = [
  { he: 'פתרונות', en: 'Solutions', href: '#solutions' },
  { he: 'דמואים חיים', en: 'Live Demos', href: '#demos' },
  { he: 'למה אני', en: 'Why Me', href: '#why' },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, isHebrew } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-gradient">Refael.ai</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-base font-medium text-muted-foreground hover:text-foreground transition-colors ${isHebrew ? 'font-hebrew' : ''}`}
            >
              {isHebrew ? l.he : l.en}
            </a>
          ))}

          {/* Language toggle */}
          <div className="flex items-center gap-1 bg-secondary rounded-full p-1 border border-border">
            <button
              onClick={() => setLanguage('he')}
              className={`px-3 py-1 rounded-full text-[0.85rem] font-bold transition-all ${language === 'he' ? 'bg-primary text-white shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              HE
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-[0.85rem] font-bold transition-all ${language === 'en' ? 'bg-primary text-white shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              EN
            </button>
          </div>

          <Button
            size="sm"
            className="gradient-coral text-white font-bold rounded-full px-6 text-[1.1rem]"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className={isHebrew ? 'font-hebrew' : ''}>{isHebrew ? 'דברו איתי' : 'Contact Me'}</span>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/50 px-4 py-4 space-y-3">
          {/* Language toggle mobile */}
          <div className="flex items-center gap-1 bg-secondary rounded-full p-1 border border-border w-fit">
            <button
              onClick={() => setLanguage('he')}
              className={`px-3 py-1 rounded-full text-[0.85rem] font-bold transition-all ${language === 'he' ? 'bg-primary text-white shadow' : 'text-muted-foreground'}`}
            >
              HE
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-[0.85rem] font-bold transition-all ${language === 'en' ? 'bg-primary text-white shadow' : 'text-muted-foreground'}`}
            >
              EN
            </button>
          </div>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`block text-base font-medium text-muted-foreground hover:text-foreground ${isHebrew ? 'font-hebrew text-right' : 'text-left'}`}
              onClick={() => setOpen(false)}
            >
              {isHebrew ? l.he : l.en}
            </a>
          ))}
          <Button
            size="sm"
            className="gradient-coral text-white font-bold rounded-full px-6 w-full text-[1.1rem]"
            onClick={() => {
              setOpen(false);
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className={isHebrew ? 'font-hebrew' : ''}>{isHebrew ? 'דברו איתי' : 'Contact Me'}</span>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
