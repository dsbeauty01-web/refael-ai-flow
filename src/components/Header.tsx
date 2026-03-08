import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { t, language, setLanguage, isHebrew } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: 'services', href: '#services' },
    { key: 'demos', href: '#demos' },
    { key: 'howItWorks', href: '#how-it-works' },
    { key: 'whyMe', href: '#why-me' },
    { key: 'industries', href: '#industries' },
    { key: 'testimonials', href: '#testimonials' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="text-xl font-bold text-primary">
          {isHebrew ? 'רפאל סלע' : 'Refael Sela'}
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.href)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
            className="gap-1.5"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">{language === 'he' ? 'EN' : 'עב'}</span>
          </Button>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-card border-b border-border px-4 py-4 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.href)}
              className="block w-full text-start px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
