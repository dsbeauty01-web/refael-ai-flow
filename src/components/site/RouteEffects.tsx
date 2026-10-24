import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage, LANGUAGES, type Language } from '@/contexts/LanguageContext';
import { DEFAULT_LANGUAGE } from '@/config/site';

/**
 * Router-level housekeeping, mounted once inside <BrowserRouter>:
 * 1. New page -> scroll to top; "/#faq" style links -> scroll to that section,
 *    waiting for lazy-loaded pages to render it.
 * 2. Keep ?lang= and the chosen language in step, so every page has one URL
 *    per language (shareable, and what hreflang/canonical point at).
 */
export default function RouteEffects() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  // scroll
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    let tries = 0;
    const id = window.setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || ++tries > 30) {
        window.clearInterval(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [pathname, hash]);

  // URL -> language (links such as /live-selling?lang=th)
  useEffect(() => {
    const q = new URLSearchParams(search).get('lang') as Language | null;
    if (q && LANGUAGES.includes(q) && q !== language) setLanguage(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // language -> URL. Runs on every navigation (incl. same-page links that drop the
  // query), so a non-Hebrew page always carries its ?lang and survives a reload or a
  // share. If the visitor switched language, the state wins; if a link brought a
  // different ?lang, the effect above adopts it first and this run waits for it.
  // ?lang=he is the default, so it is stripped (canonical URLs carry no ?lang for he).
  const prevLang = useRef(language);
  useEffect(() => {
    const switched = prevLang.current !== language;
    prevLang.current = language;
    const params = new URLSearchParams(search);
    const current = params.get('lang') as Language | null;
    if (!switched && current && LANGUAGES.includes(current) && current !== language) return;
    const wanted = language === DEFAULT_LANGUAGE ? null : language;
    if (current === wanted) return;
    if (wanted) params.set('lang', wanted);
    else params.delete('lang');
    const qs = params.toString();
    navigate({ pathname, search: qs ? `?${qs}` : '', hash }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, pathname, search, hash]);

  return null;
}
