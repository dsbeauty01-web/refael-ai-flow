/**
 * Analytics utility: fires events to GA4 + Facebook Pixel.
 *
 * All CTA clicks, form submissions, and chat interactions go through
 * this module so we get consistent event names across both platforms.
 *
 * GA4 Measurement ID and Facebook Pixel ID are configured in index.html.
 * Until those placeholders are replaced with real IDs, events are silently
 * ignored (the global functions won't exist).
 */

/* ------------------------------------------------------------------ */
/*  Core helpers                                                       */
/* ------------------------------------------------------------------ */

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, params);
  }
}

/** Standard FB Pixel events (PageView, Lead, Contact, etc.) */
export function trackStandard(name: string, params?: Record<string, string | number>) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', name, params);
  }
}

/* ------------------------------------------------------------------ */
/*  CTA click events                                                   */
/* ------------------------------------------------------------------ */

export function trackWhatsAppClick(source: string) {
  trackEvent('whatsapp_click', { source, cta: 'whatsapp' });
  trackStandard('Contact', { content_name: 'WhatsApp', content_category: source });
}

export function trackLineClick(source: string) {
  trackEvent('line_click', { source, cta: 'line' });
  trackStandard('Contact', { content_name: 'LINE', content_category: source });
}

export function trackPhoneClick(source: string) {
  trackEvent('phone_click', { source, cta: 'phone' });
  trackStandard('Contact', { content_name: 'Phone', content_category: source });
}

export function trackDemoClick(source: string) {
  trackEvent('demo_click', { source });
}

/* ------------------------------------------------------------------ */
/*  Form events                                                        */
/* ------------------------------------------------------------------ */

export function trackLeadSubmit(source: string, language: string) {
  trackEvent('lead_submit', { source, language });
  trackStandard('Lead', { content_name: source, content_category: language });
}

export function trackLeadError(source: string) {
  trackEvent('lead_submit_error', { source });
}

/* ------------------------------------------------------------------ */
/*  Navigation / engagement events                                     */
/* ------------------------------------------------------------------ */

export function trackProductView(product: string) {
  trackEvent('product_view', { product });
  trackStandard('ViewContent', { content_name: product });
}

export function trackLanguageSwitch(from: string, to: string) {
  trackEvent('language_switch', { from, to });
}

export function trackVideoPlay(video: string) {
  trackEvent('video_play', { video });
}

/* ------------------------------------------------------------------ */
/*  UTM helpers                                                        */
/* ------------------------------------------------------------------ */

/**
 * Append UTM parameters to a URL.
 * Usage: utmLink('https://wa.me/...', { source: 'facebook', medium: 'social', campaign: 'thai-q4' })
 */
export function utmLink(
  base: string,
  utm: { source: string; medium: string; campaign: string; content?: string; term?: string },
): string {
  const url = new URL(base);
  url.searchParams.set('utm_source', utm.source);
  url.searchParams.set('utm_medium', utm.medium);
  url.searchParams.set('utm_campaign', utm.campaign);
  if (utm.content) url.searchParams.set('utm_content', utm.content);
  if (utm.term) url.searchParams.set('utm_term', utm.term);
  return url.toString();
}

/**
 * Read UTM params from the current page URL and store them in sessionStorage
 * so we can attach them to lead submissions (attribute the lead to the post).
 */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utm: Record<string, string> = {};
    let hasAny = false;
    for (const k of keys) {
      const v = params.get(k);
      if (v) { utm[k] = v; hasAny = true; }
    }
    if (hasAny) {
      sessionStorage.setItem('refael_utm', JSON.stringify(utm));
    }
  } catch { /* private browsing */ }
}

export function getStoredUtm(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem('refael_utm');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
