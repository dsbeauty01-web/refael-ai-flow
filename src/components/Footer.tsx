import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const MESSENGER_URL = 'https://www.facebook.com/refael.silanikove';

const Footer = () => {
  const { t, isHebrew } = useLanguage();

  const messengerUrl = MESSENGER_URL;

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

  return (
    <footer className="gradient-hero">
      {/* CTA banner */}
      <div className="border-b border-primary-foreground/10 py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-2xl font-bold text-primary-foreground mb-6">{t('footer.cta')}</p>
          <Button
            className="gradient-accent text-accent-foreground font-semibold h-14 px-10 rounded-xl text-base hover:opacity-90 transition-opacity"
            asChild
          >
            <a href={messengerUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              {t('contact.whatsapp')}
            </a>
          </Button>
        </div>
      </div>

      {/* Footer nav */}
      <div className="py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-xl font-bold text-primary-foreground mb-1">
                {isHebrew ? 'רפאל סלע' : 'Refael Sela'}
              </p>
              <p className="text-sm text-primary-foreground/50">{t('footer.tagline')}</p>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
            </nav>
          </div>

          <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center">
            <p className="text-xs text-primary-foreground/35">{t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
