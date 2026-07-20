import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'he' | 'en' | 'th';

export const LANGUAGES: Language[] = ['he', 'en', 'th'];

/** Hebrew is the only RTL language we ship; Thai reads left-to-right. */
const RTL_LANGUAGES: Language[] = ['he'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  dir: 'rtl' | 'ltr';
  isHebrew: boolean;
  isThai: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

// Translation getter helper
function getNestedValue(obj: Record<string, any>, path: string): any {
  const keys = path.split('.');
  let current: any = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return path;
    current = current[key];
  }
  return current !== undefined ? current : path;
}

import { translations } from '@/lib/translations';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'he';
    const stored = window.localStorage.getItem('refael_lang') as Language | null;
    return stored && LANGUAGES.includes(stored) ? stored : 'he';
  });
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { window.localStorage.setItem('refael_lang', lang); } catch {}
  };

  const dir = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
  const isHebrew = language === 'he';
  const isThai = language === 'th';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  // The legacy dictionary only has he/en; fall back to en so a missing
  // language never renders `undefined` on the page.
  const t = (key: string): any => {
    const dict = translations[language as keyof typeof translations] ?? translations.en;
    return getNestedValue(dict, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isHebrew, isThai }}>
      {children}
    </LanguageContext.Provider>
  );
};
