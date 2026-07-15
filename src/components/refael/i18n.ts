import { useLanguage } from '@/contexts/LanguageContext';

export function useT() {
  const { isHebrew, language, setLanguage } = useLanguage();
  const pick = <T,>(he: T, en: T) => (isHebrew ? he : en);
  return { isHebrew, language, setLanguage, pick };
}

export const NAV_LINKS = [
  { href: '#what',     he: 'מה זה',      en: 'What it is' },
  { href: '#avatars',  he: 'האווטארים',  en: 'The avatars' },
  { href: '#pricing',  he: 'כמה זה עולה', en: 'Pricing' },
  { href: '#contact',  he: 'דברו איתנו', en: 'Contact' },
];