import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useT } from '@/components/refael/i18n';
import SiteLayout from '@/components/site/SiteLayout';
import { SpeakingVideo, FaqList, RelatedProducts, playWithSound } from '@/components/site/blocks';
import { WhatsAppGlyph, SpeakerGlyph } from '@/components/site/icons';
import { useSeo, serviceLd, faqLd, breadcrumbLd } from '@/components/site/Seo';
import { WHATSAPP_URL } from '@/config/avatars';
import { routeMeta, urlFor, SITE_URL } from '@/config/site';
import { LANDINGS } from '@/content/landings';
import { PROOF, OFFER, HERO, FAQ_HEAD } from '@/content/liveSelling';
import NotFound from './NotFound';

const SECTIONS = [
  { href: '#about', he: 'על הפתרון', en: 'Overview', th: 'ภาพรวม' },
  { href: '#faq', he: 'שאלות', en: 'FAQ', th: 'คำถาม' },
];

/** Keyword landing pages (/ai-avatar, /brand-character), driven by content/landings.ts. */
export default function Landing() {
  const { pathname } = useLocation();
  const page = LANDINGS[pathname.replace(/\/+$/, '')];
  const { language, pick, tr, fontDisplay } = useT();
  const meta = routeMeta(page?.path ?? pathname);
  const media = page?.media[language];
  const wa = `${WHATSAPP_URL}?text=${encodeURIComponent(tr(OFFER.message))}`;

  useSeo({
    path: page?.path ?? pathname,
    jsonLd: page && meta?.title && meta.description
      ? [
          serviceLd(meta.title[language], meta.description[language], urlFor(page.path, language), language),
          faqLd(page.faq.map(f => ({ q: tr(f.q), a: tr(f.a) }))),
          breadcrumbLd([{ name: 'Refael.ai', path: '/' }, { name: tr(page.crumb), path: page.path }], language),
        ]
      : [],
  });

  if (!page || !media) return <NotFound />;

  return (
    <SiteLayout sections={SECTIONS} whatsappMessage={tr(OFFER.message)}>
      <section className="relative hero-bg overflow-hidden px-5 pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
        <div className="relative max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <nav aria-label={pick('פירורי לחם', 'Breadcrumb', 'เส้นทาง')} className="text-[0.88rem] text-muted-foreground">
              <Link to="/" className="hover:text-ink transition-colors">Refael.ai</Link>
              <span className="mx-2 opacity-50" aria-hidden>/</span>
              <span aria-current="page" className="text-ink/80">{tr(page.crumb)}</span>
            </nav>
            <h1 className={`${fontDisplay} mt-5 text-[clamp(2.3rem,5.6vw,4.2rem)] leading-[1.08] tracking-tight text-ink max-w-[16ch]`}>
              {tr(page.h1)}
            </h1>
            <p className="mt-6 text-[1.15rem] sm:text-[1.25rem] leading-[1.6] text-ink/85 max-w-[34em]">{tr(page.lead)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] text-[#06210f] font-bold px-7 py-3.5 text-[1rem] shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)] hover:brightness-105 transition"
              >
                <WhatsAppGlyph className="w-5 h-5" />
                {tr(HERO.cta)}
              </a>
              <button
                type="button"
                onClick={() => playWithSound('landing-video')}
                className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3.5 text-[0.98rem] font-semibold text-ink hover:bg-ink/5 transition"
              >
                <SpeakerGlyph className="w-4 h-4" />
                {tr(HERO.hear)}
              </button>
            </div>
            <dl className="mt-11 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 max-w-[560px]">
              {PROOF.map(p => (
                <div key={p.n} className="bg-paper/90 px-4 py-4">
                  <dt className="sr-only">{tr(p.label)}</dt>
                  <dd>
                    <span className="block font-mono-num text-[1.6rem] font-semibold text-ink leading-none">{p.n}</span>
                    <span className="block mt-2 text-[0.8rem] leading-[1.4] text-muted-foreground">{tr(p.label)}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <SpeakingVideo
            id="landing-video"
            src={media.src}
            poster={media.poster}
            ratio={media.ratio}
            live={page.live && language === 'en'}
            className={`w-full mx-auto ${media.ratio === '9/16' ? 'max-w-[340px]' : 'max-w-[440px]'}`}
          />
        </div>
      </section>

      <section id="about" className="px-5 py-24 bg-mist scroll-mt-16">
        <div className="max-w-[1100px] mx-auto space-y-16">
          {page.blocks.map((b, i) => (
            <div key={i} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 border-t border-ink/15 pt-8">
              <h2 className={`${fontDisplay} text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.2] text-ink`}>{tr(b.h)}</h2>
              <div className="space-y-4">
                {b.p?.map((para, j) => (
                  <p key={j} className="text-[1.08rem] leading-[1.8] text-ink/75 max-w-[62ch]">{tr(para)}</p>
                ))}
                {b.bullets && (
                  <ul className="space-y-3.5">
                    {b.bullets.map((li, j) => (
                      <li key={j} className="flex gap-3 text-[1.05rem] leading-[1.6] text-ink/80">
                        <Check className="w-5 h-5 mt-0.5 text-live-a shrink-0" aria-hidden />
                        {tr(li)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-24 hero-bg overflow-hidden">
        <div className="relative max-w-[820px] mx-auto text-center">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.8vw,3.3rem)] leading-[1.1] text-ink`}>{tr(OFFER.title)}</h2>
          <p className="mt-5 text-[1.1rem] leading-[1.7] text-ink/80">{tr(OFFER.body)}</p>
          <p className="mt-2 text-[1.02rem] font-semibold text-live-a">{tr(OFFER.promise)}</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#25D366] text-[#06210f] font-bold px-9 py-4 text-[1.1rem] shadow-[0_18px_44px_-14px_rgba(37,211,102,0.8)] hover:brightness-105 transition"
          >
            <WhatsAppGlyph className="w-6 h-6" />
            {tr(OFFER.button)}
          </a>
        </div>
      </section>

      <section id="faq" className="px-5 py-24 bg-paper scroll-mt-16">
        <div className="max-w-[860px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink mb-10`}>{tr(FAQ_HEAD)}</h2>
          <FaqList items={page.faq} />
        </div>
      </section>

      <RelatedProducts current={page.path} />
    </SiteLayout>
  );
}
