import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useT, LANGUAGES, LANGUAGE_LABELS } from '@/components/refael/i18n';
import { PRODUCTS, LANGUAGE_NAMES, type L10n } from '@/config/site';
import { WHATSAPP_URL } from '@/config/avatars';
import { WhatsAppGlyph } from './icons';

export type SectionLink = { href: string } & L10n;

/**
 * The one header every page uses. `sections` are the in-page anchors of the
 * current page (shown on desktop next to the Products menu); on other pages
 * they would be meaningless, so each page passes its own.
 */
export default function SiteHeader({ sections = [] }: { sections?: SectionLink[] }) {
  const { language, setLanguage, pick, tr, isHebrew } = useT();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false); // mobile sheet
  const [products, setProducts] = useState(false); // desktop panel
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menus on navigation, Escape, or a click outside the panel
  useEffect(() => { setMenu(false); setProducts(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setProducts(false); } };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setProducts(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  const closeAll = () => { setMenu(false); setProducts(false); };

  const jump = (href: string) => {
    setMenu(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const solid = scrolled || menu;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-paper/85 backdrop-blur-xl border-b border-ink/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center gap-6 px-5 h-16">
        <Link to="/" onClick={closeAll} className="text-[1.12rem] font-bold tracking-tight text-ink shrink-0" aria-label="Refael.ai">
          Refael<span className="text-live-gradient">.ai</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 flex-1" aria-label={pick('ניווט ראשי', 'Main', 'เมนูหลัก')}>
          <div className="relative" ref={panelRef}>
            <button
              type="button"
              onClick={() => setProducts(v => !v)}
              aria-expanded={products}
              aria-controls="products-panel"
              className={`flex items-center gap-1.5 text-[0.92rem] font-semibold transition-colors ${products ? 'text-ink' : 'text-ink/80 hover:text-ink'}`}
            >
              {pick('מוצרים', 'Products', 'ผลิตภัณฑ์')}
              <ChevronDown className={`w-4 h-4 transition-transform ${products ? 'rotate-180' : ''}`} />
            </button>
            {products && (
              <div
                id="products-panel"
                className="absolute top-[calc(100%+14px)] start-[-12px] w-[640px] rounded-2xl border border-ink/15 bg-[#0d1320]/95 backdrop-blur-xl p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] grid grid-cols-2 gap-1"
              >
                {PRODUCTS.map(p => (
                  <Link
                    key={p.path}
                    to={p.path}
                    onClick={closeAll}
                    className={`group flex gap-3.5 rounded-xl p-3 transition-colors hover:bg-ink/[0.06] ${pathname === p.path ? 'bg-ink/[0.05]' : ''}`}
                  >
                    <img src={tr(p.image)} alt="" loading="lazy" className="w-14 h-14 rounded-lg object-cover object-top shrink-0 bg-ink/10" />
                    <span>
                      <span className="block text-[0.95rem] font-semibold text-ink">{tr(p.name)}</span>
                      <span className="block text-[0.82rem] leading-[1.45] text-muted-foreground mt-0.5">{tr(p.blurb)}</span>
                    </span>
                  </Link>
                ))}
                <Link to="/#products" onClick={closeAll} className="flex items-center justify-center rounded-xl p-3 text-[0.88rem] text-ink/70 hover:text-ink hover:bg-ink/[0.06] transition-colors">
                  {pick('כל המוצרים בעמוד הבית', 'All products on the homepage', 'ผลิตภัณฑ์ทั้งหมดในหน้าแรก')}
                </Link>
              </div>
            )}
          </div>
          {sections.map(s => (
            <button
              key={s.href}
              type="button"
              onClick={() => jump(s.href)}
              className="text-[0.9rem] text-muted-foreground hover:text-ink transition-colors"
            >
              {tr(s)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 ms-auto">
          <div className="hidden sm:flex items-center gap-0.5 border border-ink/15 rounded-full p-0.5" role="group" aria-label={pick('שפה', 'Language', 'ภาษา')}>
            {LANGUAGES.map(lng => (
              <button
                key={lng}
                type="button"
                onClick={() => setLanguage(lng)}
                aria-pressed={language === lng}
                lang={lng}
                title={LANGUAGE_NAMES[lng]}
                className={`text-[0.75rem] font-medium rounded-full px-2.5 py-1 leading-none transition-colors ${
                  language === lng ? 'bg-ink text-paper' : 'text-muted-foreground hover:text-ink'
                }`}
              >
                {LANGUAGE_LABELS[lng]}
              </button>
            ))}
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-live-gradient text-white text-[0.85rem] font-semibold px-4 py-2 rounded-full hover:brightness-110 transition"
          >
            <WhatsAppGlyph className="w-4 h-4" />
            {pick('דברו איתנו', 'Talk to us', 'คุยกับเรา')}
          </a>
          <button
            type="button"
            className="lg:hidden p-2 -me-2 text-ink"
            onClick={() => setMenu(v => !v)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? pick('סגירת תפריט', 'Close menu', 'ปิดเมนู') : pick('פתיחת תפריט', 'Open menu', 'เปิดเมนู')}
          >
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menu && (
        <div id="mobile-menu" className="lg:hidden h-[calc(100dvh-4rem)] overflow-y-auto bg-paper border-t border-ink/10 px-5 pt-4 pb-10">
          <p className="text-[0.8rem] text-muted-foreground mb-2">{pick('מוצרים', 'Products', 'ผลิตภัณฑ์')}</p>
          <ul className="space-y-1">
            {PRODUCTS.map(p => (
              <li key={p.path}>
                <Link to={p.path} onClick={closeAll} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-ink/[0.05]">
                  <img src={tr(p.image)} alt="" loading="lazy" className="w-11 h-11 rounded-lg object-cover object-top bg-ink/10 shrink-0" />
                  <span className="text-[1rem] font-semibold text-ink">{tr(p.name)}</span>
                </Link>
              </li>
            ))}
          </ul>

          {sections.length > 0 && (
            <>
              <p className="text-[0.8rem] text-muted-foreground mt-6 mb-2">{pick('בעמוד הזה', 'On this page', 'ในหน้านี้')}</p>
              <ul className="space-y-0.5">
                {sections.map(s => (
                  <li key={s.href}>
                    <button
                      type="button"
                      onClick={() => jump(s.href)}
                      className={`w-full py-2.5 text-[0.98rem] text-ink/85 hover:text-ink ${isHebrew ? 'text-right' : 'text-left'}`}
                    >
                      {tr(s)}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="text-[0.8rem] text-muted-foreground mt-6 mb-2">{pick('שפה', 'Language', 'ภาษา')}</p>
          <div className="flex gap-2" role="group">
            {LANGUAGES.map(lng => (
              <button
                key={lng}
                type="button"
                onClick={() => setLanguage(lng)}
                aria-pressed={language === lng}
                lang={lng}
                className={`flex-1 rounded-full py-2.5 text-[0.92rem] border transition-colors ${
                  language === lng ? 'bg-ink text-paper border-ink' : 'border-ink/20 text-ink/80'
                }`}
              >
                {LANGUAGE_NAMES[lng]}
              </button>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex items-center justify-center gap-2 bg-live-gradient text-white text-[1rem] font-semibold py-3.5 rounded-full"
          >
            <WhatsAppGlyph className="w-5 h-5" />
            {pick('דברו איתנו בוואטסאפ', 'Talk to us on WhatsApp', 'คุยกับเราทาง WhatsApp')}
          </a>
        </div>
      )}
    </header>
  );
}
