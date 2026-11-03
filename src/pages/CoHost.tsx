import { useT } from '@/components/refael/i18n';
import SiteLayout from '@/components/site/SiteLayout';
import { SpeakingVideo, FaqList, RelatedProducts, playWithSound } from '@/components/site/blocks';
import { WhatsAppGlyph, LineGlyph, SpeakerGlyph } from '@/components/site/icons';
import { useSeo, serviceLd, faqLd, breadcrumbLd } from '@/components/site/Seo';
import { WHATSAPP_URL, LINE_URL } from '@/config/avatars';
import { routeMeta, urlFor, SITE_URL } from '@/config/site';
import {
  MEDIA, HERO, PROOF, PROOF_NOTE, LAYOUTS_HEAD, LAYOUTS, LAYOUT_PICK_NOTE,
  FEATURES_HEAD, FEATURES, STATUS_HEAD, STATUS_REAL, STATUS_SOON,
  STEPS_HEAD, STEPS, OFFER, FAQ_HEAD, FAQ,
} from '@/content/coHost';

const PATH = '/co-host';
const SECTIONS = [
  { href: '#layouts', he: 'הלייאוטים', en: 'Layouts', th: 'เลย์เอาต์' },
  { href: '#what', he: 'מה היא עושה', en: 'What she does', th: 'เธอทำอะไร' },
  { href: '#start', he: 'איך מתחילים', en: 'How to start', th: 'เริ่มต้นยังไง' },
  { href: '#faq', he: 'שאלות', en: 'FAQ', th: 'คำถาม' },
];

export default function CoHost() {
  const { language, pick, tr, fontDisplay } = useT();
  const media = MEDIA[language];
  const isThai = language === 'th';
  const ctaUrl = isThai ? LINE_URL : `${WHATSAPP_URL}?text=${encodeURIComponent(tr(OFFER.message))}`;
  const CtaIcon = isThai ? LineGlyph : WhatsAppGlyph;
  const ctaColor = isThai ? 'bg-[#06C755]' : 'bg-[#25D366]';
  const ctaShadow = isThai ? 'shadow-[0_14px_34px_-12px_rgba(6,199,85,0.75)]' : 'shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)]';

  const meta = routeMeta(PATH)!;
  useSeo({
    path: PATH,
    image: `${SITE_URL}/og/site-${language}.jpg`,
    jsonLd: [
      serviceLd(meta.title![language], meta.description![language], urlFor(PATH, language), language),
      faqLd(FAQ.map(f => ({ q: tr(f.q), a: tr(f.a) }))),
      breadcrumbLd(
        [
          { name: 'Refael.ai', path: '/' },
          { name: pick('קו-הוסט AI', 'AI co-host', 'โค-โฮสต์ AI'), path: PATH },
        ],
        language
      ),
    ],
  });

  return (
    <SiteLayout sections={SECTIONS} whatsappMessage={tr(OFFER.message)}>
      {/* HERO */}
      <section className="relative hero-bg overflow-hidden px-5 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
        <div className="relative max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[1.05rem] text-muted-foreground">{tr(HERO.kicker)}</p>
            <h1 className={`${fontDisplay} mt-3 text-[clamp(2.6rem,6.4vw,4.9rem)] leading-[1.04] tracking-tight text-ink`}>
              {tr(HERO.h1a)} <span className="text-live-gradient">{tr(HERO.h1b)}</span>
            </h1>
            <p className="mt-6 text-[1.15rem] sm:text-[1.28rem] leading-[1.6] text-ink/85 max-w-[34em]">{tr(HERO.lead)}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2.5 rounded-full ${ctaColor} text-[#06210f] font-bold px-7 py-3.5 text-[1rem] ${ctaShadow} hover:brightness-105 transition`}
              >
                <CtaIcon className="w-5 h-5" />
                {tr(HERO.cta)}
              </a>
              <button
                type="button"
                onClick={() => playWithSound('ch-hero-video')}
                className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3.5 text-[0.98rem] font-semibold text-ink hover:bg-ink/5 transition"
              >
                <SpeakerGlyph className="w-4 h-4" />
                {tr(HERO.hear)}
              </button>
            </div>
            <p className="mt-3 text-[0.88rem] text-muted-foreground">{tr(HERO.ctaNote)}</p>

            <dl className="mt-11 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 max-w-[560px]">
              {PROOF.map(p => (
                <div key={p.n} className="bg-paper/90 px-4 py-4">
                  <dt className="sr-only">{tr(p.label)}</dt>
                  <dd>
                    <span className="block font-mono-num text-[1.5rem] font-semibold text-ink leading-none">{p.n}</span>
                    <span className="block mt-2 text-[0.78rem] leading-[1.4] text-muted-foreground">{tr(p.label)}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-[0.78rem] text-muted-foreground">{tr(PROOF_NOTE)}</p>
          </div>

          <SpeakingVideo
            id="ch-hero-video"
            src={media.src}
            poster={media.poster}
            ratio="9/16"
            live={false}
            className="w-full max-w-[360px] mx-auto"
          />
        </div>
      </section>

      {/* THE 3 LAYOUTS */}
      <section id="layouts" className="px-5 py-24 sm:py-28 bg-mist scroll-mt-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink`}>{tr(LAYOUTS_HEAD.title)}</h2>
          <p className="mt-3 text-[1.1rem] text-muted-foreground">{tr(LAYOUTS_HEAD.sub)}</p>

          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {LAYOUTS.map((l, i) => (
              <article key={i} className="rounded-2xl border border-ink/10 bg-paper overflow-hidden flex flex-col">
                <div className="relative bg-black" style={{ aspectRatio: '4/5' }}>
                  {l.media.kind === 'video' ? (
                    <video
                      src={l.media.src}
                      poster={l.media.poster}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="none"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img src={l.media.src} alt={tr(l.name)} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <span
                    className={`absolute top-3.5 start-3.5 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.7rem] font-bold leading-none ${
                      l.badge === 'now' ? 'bg-[#1aa35c] text-white' : 'bg-black/60 text-white'
                    }`}
                  >
                    {l.badge === 'now'
                      ? pick('זמין עכשיו', 'Available now', 'พร้อมใช้งานแล้ว')
                      : pick('בקרוב', 'Coming', 'เร็วๆ นี้')}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[1.2rem] font-bold text-ink leading-snug">{tr(l.name)}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.65] text-ink/70">{tr(l.body)}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-[0.95rem] text-muted-foreground">{tr(LAYOUT_PICK_NOTE)}</p>
        </div>
      </section>

      {/* 8 FEATURES */}
      <section id="what" className="px-5 py-24 sm:py-28 bg-paper scroll-mt-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink`}>{tr(FEATURES_HEAD.title)}</h2>
          <p className="mt-3 text-[1.1rem] text-muted-foreground">{tr(FEATURES_HEAD.sub)}</p>

          <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {FEATURES.map((f, i) => (
              <article key={i} className="border-t border-ink/15 pt-6">
                <h3 className="flex items-center gap-3 text-[1.2rem] font-bold text-ink">
                  <span className="text-[1.3rem]" aria-hidden>{f.icon}</span>
                  {tr(f.title)}
                </h3>
                <p className="mt-2.5 text-[1rem] leading-[1.7] text-ink/70 max-w-[48ch]">{tr(f.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REAL TODAY VS COMING */}
      <section className="px-5 py-24 bg-[linear-gradient(180deg,#1b1233,#0f0b1d)] border-y border-[#4c3480]/40">
        <div className="max-w-[1100px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.15] text-ink`}>{tr(STATUS_HEAD)}</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-[0.85rem] font-semibold tracking-[0.12em] uppercase text-[#7fe0a8]">
                {pick('אמיתי היום', 'Real today', 'จริงแล้ววันนี้')}
              </p>
              <ul className="mt-4 grid gap-3">
                {STATUS_REAL.map((s, i) => (
                  <li key={i} className="text-[1rem] leading-[1.6] text-[#e7e1f5]">✓ {tr(s)}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.85rem] font-semibold tracking-[0.12em] uppercase text-[#cbbdf0]">
                {pick('בדרך', 'Coming next', 'กำลังจะมา')}
              </p>
              <ul className="mt-4 grid gap-3">
                {STATUS_SOON.map((s, i) => (
                  <li key={i} className="text-[1rem] leading-[1.6] text-[#a695c9]">◦ {tr(s)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="start" className="px-5 py-24 bg-mist scroll-mt-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink`}>{tr(STEPS_HEAD)}</h2>
          <ol className="mt-12 grid gap-8 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={i} className="relative">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-live-gradient text-white font-mono-num text-[1.1rem] font-semibold">{i + 1}</span>
                <h3 className="mt-5 text-[1.2rem] font-bold text-ink leading-snug">{tr(s.t)}</h3>
                <p className="mt-2 text-[1rem] leading-[1.7] text-ink/70">{tr(s.b)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OFFER */}
      <section id="offer" className="relative px-5 py-24 hero-bg overflow-hidden">
        <div className="relative max-w-[820px] mx-auto text-center">
          <h2 className={`${fontDisplay} text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.1] text-ink`}>{tr(OFFER.title)}</h2>
          <p className="mt-5 text-[1.12rem] leading-[1.7] text-ink/80">{tr(OFFER.body)}</p>
          <p className="mt-2 text-[1.05rem] font-semibold text-live-a">{tr(OFFER.promise)}</p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-9 inline-flex items-center gap-3 rounded-full ${ctaColor} text-[#06210f] font-bold px-9 py-4 text-[1.1rem] ${isThai ? 'shadow-[0_18px_44px_-14px_rgba(6,199,85,0.8)]' : 'shadow-[0_18px_44px_-14px_rgba(37,211,102,0.8)]'} hover:brightness-105 transition`}
          >
            <CtaIcon className="w-6 h-6" />
            {tr(OFFER.button)}
          </a>
          <p className="mt-3 text-[0.9rem] text-muted-foreground">{tr(OFFER.sub)}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-24 bg-paper scroll-mt-16">
        <div className="max-w-[860px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink mb-10`}>{tr(FAQ_HEAD)}</h2>
          <FaqList items={FAQ} />
        </div>
      </section>

      <RelatedProducts current={PATH} />
    </SiteLayout>
  );
}
