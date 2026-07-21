import { useLanguage, LANGUAGES, type Language } from '@/contexts/LanguageContext';

/** Display label + html lang for the language switcher. */
export const LANGUAGE_LABELS: Record<Language, string> = {
  he: 'עב',
  en: 'EN',
  th: 'ไทย',
};

export { LANGUAGES };
export type { Language };

export function useT() {
  const { isHebrew, isThai, language, setLanguage } = useLanguage();

  /**
   * Pick the string for the active language.
   * Thai is optional: until a line is translated it falls back to English,
   * so the page never renders an empty slot mid-migration.
   */
  const pick = <T,>(he: T, en: T, th?: T): T => {
    if (isHebrew) return he;
    if (isThai) return th ?? en;
    return en;
  };

  /**
   * Same idea as pick(), for the per-item content objects the card sections use:
   * tr({ he, en, th }) returns the active language, falling back to English.
   */
  const tr = <T,>(o: { he: T; en: T; th?: T }): T => {
    if (isHebrew) return o.he;
    if (isThai) return o.th ?? o.en;
    return o.en;
  };

  // Hebrew and Thai each need their own display face; Latin uses the EN stack.
  const fontDisplay = isHebrew ? 'font-display-he' : isThai ? 'font-display-th' : 'font-display-en';
  const fontBody = isThai ? 'font-body-th' : '';

  return { isHebrew, isThai, language, setLanguage, pick, tr, fontDisplay, fontBody };
}

export const NAV_LINKS = [
  { href: '#avatars',    he: 'האווטארים',   en: 'The avatars', th: 'อวตาร' },
  { href: '#how',        he: 'איך זה עובד', en: 'How it works', th: 'ทำงานอย่างไร' },
  { href: '#difference', he: 'למה אנחנו',   en: 'Why us',      th: 'ทำไมต้องเรา' },
  { href: '#pricing',    he: 'כמה זה עולה', en: 'Pricing',     th: 'ราคา' },
  { href: '#faq',        he: 'שאלות',       en: 'FAQ',         th: 'คำถามที่พบบ่อย' },
  { href: '#contact',    he: 'דברו איתנו',  en: 'Contact',     th: 'ติดต่อเรา' },
];
