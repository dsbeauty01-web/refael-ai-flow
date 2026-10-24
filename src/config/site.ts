import routesJson from './routes.json';
import type { Language } from '@/contexts/LanguageContext';

export type L10n = { he: string; en: string; th: string };

export type RouteMeta = {
  path: string;
  priority: number;
  changefreq?: string;
  title?: L10n;
  description?: L10n;
};

export const SITE_URL: string = routesJson.siteUrl;
export const ROUTES: RouteMeta[] = routesJson.routes as RouteMeta[];
export const DEFAULT_LANGUAGE: Language = 'he';

/**
 * Public pricing switch.
 * Refael's rule: no public or monthly prices on the site or in posts. Every price
 * on the site renders through <Price>, so flipping this one flag brings them back.
 */
export const SHOW_PRICES = false;

/** Absolute URL for a path in a language. Hebrew is the default, so it carries no ?lang. */
export function urlFor(path: string, lang: Language): string {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '');
  return `${SITE_URL}${clean}${lang === DEFAULT_LANGUAGE ? '' : `?lang=${lang}`}`;
}

export function routeMeta(path: string): RouteMeta | undefined {
  return ROUTES.find(r => r.path === path);
}

/** 1200x630 social cards (public/og/, rendered by scripts/og-cards). One per language. */
export const OG_IMAGE: Record<Language, string> = {
  he: `${SITE_URL}/maya/og.jpg`,
  en: `${SITE_URL}/site/maya-boutique.jpg`,
  th: `${SITE_URL}/site/thai-host-boutique.jpg`,
};

export type Product = {
  path: string;
  name: L10n;
  blurb: L10n;
  /** card image per language (Thai shows the Thai host, Hebrew the original live) */
  image: L10n;
  alt: L10n;
};

/**
 * The five things Refael sells, in the order a visitor should meet them.
 * Used by the header menu, the homepage product grid and the footer site map.
 */
export const PRODUCTS: Product[] = [
  {
    path: '/live-selling',
    name: { he: 'מנחה AI ללייב מכירות', en: 'AI host for live selling', th: 'พิธีกร AI สำหรับไลฟ์ขายของ' },
    blurb: {
      he: 'עולה לשידור, מציגה את המוצרים ועונה לכל צופה בשם, בקול, תוך שניות.',
      en: 'Goes live, presents your products and answers every viewer by name, out loud, in seconds.',
      th: 'ขึ้นไลฟ์ นำเสนอสินค้า และตอบผู้ชมทุกคนด้วยชื่อ ด้วยเสียง ในไม่กี่วินาที',
    },
    image: { he: '/maya/maya-live-poster.jpg', en: '/media/maya_speaking_poster.jpg', th: '/site/thai-host-live.jpg' },
    alt: {
      he: 'מיה בשידור חי עונה לצופה בשם',
      en: 'Maya presenting to a live audience',
      th: 'พิธีกร AI กำลังไลฟ์ขายผ้าทอ',
    },
  },
  {
    path: '/live-avatar',
    name: { he: 'אווטארית חיה ללובי', en: 'Live avatar for your lobby', th: 'อวตารสดสำหรับล็อบบี้' },
    blurb: {
      he: 'דמות בגודל מלא שמקבלת אורחים, עונה על שאלות ומזמנת פגישות ליומן.',
      en: 'A full-size figure that greets visitors, answers questions and books meetings.',
      th: 'ตัวละครขนาดเท่าคนจริง ต้อนรับแขก ตอบคำถาม และนัดหมายให้',
    },
    image: { he: '/media/maya_poster.jpg', en: '/media/maya_poster.jpg', th: '/media/maya_poster.jpg' },
    alt: { he: 'מאיה בגוף מלא', en: 'Maya, full body', th: 'มายาแบบเต็มตัว' },
  },
  {
    path: '/ai-avatar',
    name: { he: 'אווטאר AI לעסקים', en: 'AI avatar for business', th: 'อวตาร AI สำหรับธุรกิจ' },
    blurb: {
      he: 'דמות עם פנים, קול ואופי שמציגה מוצרים בלייב, בסרטונים ובמסך בחנות.',
      en: 'A character with a face, a voice and a personality, for live streams, videos and in-store screens.',
      th: 'ตัวละครที่มีใบหน้า เสียง และบุคลิก สำหรับไลฟ์ วิดีโอ และจอในร้าน',
    },
    image: { he: '/site/maya-boutique.jpg', en: '/site/maya-boutique.jpg', th: '/site/maya-boutique.jpg' },
    alt: { he: 'מיה מציגה תכשיטים ובדים', en: 'Maya presenting jewellery and textiles', th: 'มายานำเสนอเครื่องประดับและผ้า' },
  },
  {
    path: '/brand-character',
    name: { he: 'דמות AI למותג', en: 'AI brand character', th: 'ตัวละคร AI สำหรับแบรนด์' },
    blurb: {
      he: 'קמע שמדבר: מציג מוצרים ועונה לילדים ולהורים בשם. נובה היא הדוגמה.',
      en: 'A mascot that talks: presents products and answers kids and parents by name. Nova is the example.',
      th: 'มาสคอตที่พูดได้ นำเสนอสินค้าและตอบเด็กกับผู้ปกครองด้วยชื่อ โนวาคือตัวอย่าง',
    },
    image: { he: '/media/nova_close_poster.jpg', en: '/media/nova_close_poster.jpg', th: '/media/nova_close_poster.jpg' },
    alt: { he: 'נובה, דמות AI לילדים', en: 'Nova, an AI character for kids', th: 'โนวา ตัวละคร AI สำหรับเด็ก' },
  },
  {
    path: '/voices',
    name: { he: 'סוכני קול', en: 'Voice agents', th: 'เอเจนต์เสียง' },
    blurb: {
      he: 'פקידת קבלה, מספר סיפורים ומנחי שידור. לחצו ודברו איתם עכשיו.',
      en: 'A receptionist, a storyteller and live hosts. Click and talk to them now.',
      th: 'พนักงานต้อนรับ นักเล่าเรื่อง และพิธีกรไลฟ์ กดแล้วคุยได้ทันที',
    },
    image: { he: '/voices/host-female.webp', en: '/voices/host-female.webp', th: '/voices/host-female.webp' },
    alt: { he: 'המארחת, סוכנת קול', en: 'The Host, a voice agent', th: 'พิธีกร เอเจนต์เสียง' },
  },
];

export const LANGUAGE_NAMES: L10n = { he: 'עברית', en: 'English', th: 'ไทย' };
