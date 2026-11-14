import type { Language } from '@/contexts/LanguageContext';

/**
 * Prices follow the visitor's language: Hebrew pays in shekels, English in US dollars, Thai in baht.
 * Every price is a Money triple, one decided number per language (never converted at runtime),
 * and is printed through money() so the sign and the number format stay the same site wide.
 */
export type Currency = 'ILS' | 'USD' | 'THB';
export type Money = Record<Language, number>;

export const CURRENCY: Record<Language, Currency> = { he: 'ILS', en: 'USD', th: 'THB' };

const SIGN: Record<Currency, string> = { ILS: '₪', USD: '$', THB: '฿' };

/** One amount in the language's currency: ₪99, $29, ฿990, $0.79, ₪2.50, ฿14,900. */
export function money(m: Money, lang: Language): string {
  const n = m[lang];
  const cents = Number.isInteger(n) ? 0 : 2;
  return `${SIGN[CURRENCY[lang]]}${n.toLocaleString('en-US', { minimumFractionDigits: cents, maximumFractionDigits: cents })}`;
}

/** Build a { he, en, th } string where each language gets its own formatted price. */
export function perLang(fn: (lang: Language) => string): Record<Language, string> {
  return { he: fn('he'), en: fn('en'), th: fn('th') };
}
