import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const links = [
  { he: 'פתרונות', en: 'Solutions', href: '#solutions' },
  { he: 'דמואים חיים', en: 'Live Demos', href: '#demos' },
  { he: 'למה אני', en: 'Why Me', href: '#why' },
];

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-gradient">Refael.ai</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex flex-col items-center leading-tight"
            >
              <span className="font-hebrew text-base font-medium text-foreground">{l.he}</span>
              <span className="text-[0.85rem] text-muted-foreground">{l.en}</span>
            </a>
          ))}
          <Button
            size="sm"
            className="gradient-coral text-white font-bold rounded-full px-6 text-[1.1rem]"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="font-hebrew">דברו איתי</span>
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block"
              onClick={() => setOpen(false)}
            >
              <span className="font-hebrew text-base font-medium text-foreground block text-right">{l.he}</span>
              <span className="text-[0.85rem] text-muted-foreground block text-left">{l.en}</span>
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
            <span className="font-hebrew">דברו איתי</span>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
