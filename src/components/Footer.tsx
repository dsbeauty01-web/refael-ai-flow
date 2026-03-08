import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, isHebrew } = useLanguage();

  const navItems = [
    { key: 'services', href: '#services' },
    { key: 'demos', href: '#demos' },
    { key: 'howItWorks', href: '#how-it-works' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <footer className="gradient-hero py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-lg font-bold text-primary-foreground">
              {isHebrew ? 'רפאל סלע' : 'Refael Sela'}
            </p>
            <p className="text-sm text-primary-foreground/60">{t('footer.tagline')}</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center">
          <p className="text-xs text-primary-foreground/40">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
