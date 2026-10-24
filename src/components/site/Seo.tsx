import { useEffect } from 'react';
import { useLanguage, LANGUAGES, type Language } from '@/contexts/LanguageContext';
import { SITE_URL, OG_IMAGE, routeMeta, urlFor, DEFAULT_LANGUAGE } from '@/config/site';
import { BUSINESS, WHATSAPP_URL } from '@/config/avatars';

type JsonLd = Record<string, unknown>;

type SeoInput = {
  /** route path, e.g. "/live-selling" — title/description come from routes.json */
  path: string;
  /** override the routes.json title (legal pages build theirs from content) */
  title?: string;
  description?: string;
  image?: string;
  /** page-specific structured data, added after Organization + WebSite */
  jsonLd?: JsonLd[];
  noindex?: boolean;
};

const OG_LOCALE: Record<Language, string> = { he: 'he_IL', en: 'en_US', th: 'th_TH' };

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const ORG_ID = `${SITE_URL}/#org`;

export function organizationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: 'Refael.ai',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/maya/og.jpg`,
    founder: { '@type': 'Person', name: BUSINESS.name },
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    areaServed: ['IL', 'TH', 'Worldwide'],
    availableLanguage: ['he', 'en', 'th'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: BUSINESS.phone,
      url: WHATSAPP_URL,
      availableLanguage: ['Hebrew', 'English', 'Thai'],
    },
  };
}

export function serviceLd(name: string, description: string, url: string, lang: Language): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    inLanguage: lang,
    provider: { '@id': ORG_ID },
    areaServed: ['IL', 'TH', 'Worldwide'],
  };
}

export function faqLd(items: { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[], lang: Language): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: urlFor(it.path, lang),
    })),
  };
}

/**
 * Per-page SEO for a client-rendered app: title, description, canonical, Open Graph,
 * Twitter, hreflang alternates for he/en/th and JSON-LD. Google renders JS, so these
 * are what it indexes; index.html carries Hebrew homepage defaults for everything else.
 */
export function useSeo({ path, title, description, image, jsonLd = [], noindex }: SeoInput) {
  const { language } = useLanguage();
  const meta = routeMeta(path);
  const t = title ?? meta?.title?.[language] ?? 'Refael.ai';
  const d = description ?? meta?.description?.[language] ?? '';
  const canonical = urlFor(path, language);
  const img = image ?? OG_IMAGE[language];
  const ldKey = JSON.stringify(jsonLd);

  useEffect(() => {
    document.title = t;
    setMeta('name', 'description', d);
    setMeta('name', 'robots', noindex ? 'noindex,follow' : 'index,follow');
    setLink('canonical', canonical);
    for (const l of LANGUAGES) setLink('alternate', urlFor(path, l), l);
    setLink('alternate', urlFor(path, DEFAULT_LANGUAGE), 'x-default');

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Refael.ai');
    setMeta('property', 'og:title', t);
    setMeta('property', 'og:description', d);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:locale', OG_LOCALE[language]);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', t);
    setMeta('name', 'twitter:description', d);
    setMeta('name', 'twitter:image', img);

    const all: JsonLd[] = [
      organizationLd(),
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Refael.ai', url: `${SITE_URL}/`, inLanguage: ['he', 'en', 'th'], publisher: { '@id': ORG_ID } },
      ...jsonLd,
    ];
    let el = document.getElementById('ld-page') as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = 'ld-page';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(all);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, d, canonical, img, language, path, noindex, ldKey]);
}
