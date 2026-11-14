import { useEffect, useRef, useState } from 'react';
import { Check, Eye, Heart, MessageSquareText, Mic, ScanEye, Sparkles, Tag as TagIcon } from 'lucide-react';
import { useT } from '@/components/refael/i18n';
import SiteLayout from '@/components/site/SiteLayout';
import { FaqList, RelatedProducts } from '@/components/site/blocks';
import { reducedMotion, useAutoplay, useSound, SoundButton } from '@/components/site/autoplay';
import { WhatsAppGlyph, LineGlyph, SpeakerGlyph } from '@/components/site/icons';
import { useSeo, serviceLd, faqLd, breadcrumbLd, ORG_ID } from '@/components/site/Seo';
import { WHATSAPP_URL, LINE_URL } from '@/config/avatars';
import { routeMeta, urlFor, SITE_URL, type L10n } from '@/config/site';
import { money, CURRENCY, type Money } from '@/config/currency';
import { trackWhatsAppClick, trackLineClick } from '@/lib/analytics';
import {
  TAGS, SECTIONS, HERO_VIDEO, HERO_POSTER, HERO, PLATFORMS, GALLERY, COHOST, USE_CASES, PRICING, PRICES,
  FAQ_EYEBROW, FAQ_HEAD, FAQ, FINAL,
  type Tag, type LivePlan, type Platform,
} from '@/content/liveSelling';

const PATH = '/live-selling';


/** The display faces draw ₪ as a ש״ח ligature or lack it; set the sign in the body face. */
const sh = (text: string) =>
  text.split('₪').flatMap((part, i) => (i === 0 ? [part] : [<span key={i} className="font-hebrew">₪</span>, part]));

/* ------------------------------------------------------------------ honesty tag */

const TAG_STYLE: Record<Tag, string> = {
  real: 'bg-[#e5173f] text-white',
  test: 'bg-white/90 text-[#1d1814]',
  prerec: 'bg-black/70 text-white border border-white/25',
};

/** The true label every clip carries (see TAGS in content/liveSelling.ts). */
function HonestyTag({ tag, className = '' }: { tag: Tag; className?: string }) {
  const { tr } = useT();
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[0.72rem] font-bold leading-none ${TAG_STYLE[tag]} ${className}`}>
      {tag === 'real' && <span className="w-1.5 h-1.5 rounded-full bg-white motion-safe:animate-live-pulse" aria-hidden />}
      {tr(TAGS[tag])}
    </span>
  );
}

/** The buyer's question that each section answers, in their own words. */
function Eyebrow({ text }: { text: L10n }) {
  const { tr } = useT();
  return <p className="mb-3 text-[1.02rem] font-semibold text-live-a">{tr(text)}</p>;
}

/* ------------------------------------------------------------------ hero */

const STEP_ICONS = [MessageSquareText, ScanEye, Sparkles];

function HeroVideo() {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplay(ref, { prio: 2, threshold: 0.2 });
  const { muted, toggle } = useSound(ref);
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[36px] stage-glow pointer-events-none" aria-hidden />
      <div className="relative overflow-hidden rounded-[24px] border border-ink/15 bg-black aspect-[9/16] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
        <video
          ref={ref}
          src={tr(HERO_VIDEO)}
          poster={tr(HERO_POSTER)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={tr(HERO.videoLabel)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <SoundButton muted={muted} onClick={toggle} className="absolute bottom-3 inset-x-3" />
      </div>
    </div>
  );
}

/** "1. Viewer types red  2. Host reads the chat  3. Does it live", beside the video on desktop, under it on phones. */
function HeroSteps() {
  const { tr } = useT();
  return (
    <ol className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-4">
      {HERO.steps.map((s, i) => {
        const Icon = STEP_ICONS[i];
        return (
          <li key={i} className="flex flex-col items-start gap-2 rounded-2xl border border-ink/12 bg-paper/70 px-3 py-3 lg:flex-row lg:items-center lg:gap-3 lg:px-4">
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-live-gradient text-white font-mono-num text-[0.95rem] font-semibold">{i + 1}</span>
              <Icon className="w-5 h-5 text-live-a" aria-hidden />
            </span>
            <span className="text-[0.86rem] sm:text-[0.95rem] lg:text-[1.02rem] font-semibold leading-snug text-ink">{tr(s)}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ platform phones */

/**
 * A generic phone with a live-stream frame drawn in CSS (no platform logos, no copy of
 * any platform's UI). The platform name is a plain text badge. The honesty tag sits in
 * the frame header, and the chat under the clip is marked "Example".
 */
function SampleChat({ p }: { p: Platform }) {
  const { tr } = useT();
  const n = p.sample.length;
  const [k, setK] = useState(() => (reducedMotion() ? n : 1));
  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => setK(v => (v >= n + 1 ? 1 : v + 1)), 2200);
    return () => window.clearInterval(id);
  }, [n]);
  const shown = p.sample.slice(0, Math.min(k, n));
  return (
    <div className="relative bg-[#0b0e15] px-3 pt-2 pb-3" aria-hidden>
      <span className="absolute top-2 end-3 rounded bg-white/10 px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-white/70">
        {tr(PLATFORMS.example)}
      </span>
      <ul className="flex h-[88px] flex-col justify-end gap-1 overflow-hidden">
        {shown.map((c, i) => (
          <li key={`${k}-${i}`} className={`flex items-center gap-2 ${i === shown.length - 1 ? 'animate-chat-in' : ''}`}>
            <span className="w-5 h-5 shrink-0 rounded-full bg-gradient-to-br from-white/30 to-white/10" />
            <span className="rounded-xl bg-white/10 px-2.5 py-1 text-[0.78rem] leading-snug text-white/90">{tr(c)}</span>
          </li>
        ))}
      </ul>
      <div className="relative mt-2 flex items-center gap-2">
        <span className="flex-1 truncate rounded-full border border-white/15 px-3 py-1.5 text-[0.74rem] text-white/40">{tr(PLATFORMS.chatPlaceholder)}</span>
        <Eye className="w-4 h-4 shrink-0 text-white/50" />
        <span className="relative grid place-items-center w-8 h-8">
          <Heart className="w-5 h-5 text-[#ff4d79] fill-[#ff4d79]" />
          {[0, 0.9, 1.7].map(d => (
            <Heart
              key={d}
              className="absolute bottom-3 w-3.5 h-3.5 text-[#ff4d79] fill-[#ff4d79] opacity-0 animate-heart"
              style={{ animationDelay: `${d}s`, insetInlineStart: `${6 + d * 4}px` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function PlatformPhone({ p }: { p: Platform }) {
  const { tr, pick } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplay(ref, { prio: p.tag === 'real' ? 1 : 0, threshold: 0.5 });
  const { muted, toggle } = useSound(ref);
  return (
    <li className="min-w-0 flex flex-col">
      <div className="mx-auto w-full max-w-[256px] rounded-[38px] bg-[#1a1e28] p-[7px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[31px] bg-black">
          {/* stream header: honest tag, viewers icon (no count), platform name as text */}
          <div className="flex items-center gap-1.5 px-2.5 pt-3 pb-2 bg-black">
            <HonestyTag tag={p.tag} className="!px-1.5 !text-[0.66rem]" />
            <span className="flex-1" />
            <span dir="ltr" className="rounded-full border border-white/30 px-2 py-0.5 text-[0.72rem] font-bold text-white">{p.name}</span>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={!muted}
              aria-label={muted ? pick('הפעילו קול', 'Turn sound on', 'เปิดเสียง') : pick('השתיקו', 'Mute', 'ปิดเสียง')}
              className={`grid place-items-center w-8 h-8 shrink-0 rounded-full text-white transition-colors ${muted ? 'bg-white/15 hover:bg-white/25' : 'bg-live-a'}`}
            >
              <SpeakerGlyph className="w-4 h-4" />
            </button>
          </div>
          <div className="relative aspect-[9/16] bg-black">
            <video
              ref={ref}
              src={p.src}
              poster={p.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={tr(p.videoLabel)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <SampleChat p={p} />
        </div>
      </div>
      <div className="mt-5 px-1">
        <h3 className="flex flex-wrap items-baseline gap-x-2.5 text-[1.3rem] font-bold text-ink">
          <span dir="ltr">{p.name}</span>
          <span className="text-[0.8rem] font-medium text-ink/55">{tr(p.source)}</span>
        </h3>
        <ul className="mt-2.5 space-y-2 text-[0.96rem] leading-[1.5] text-ink/80">
          {p.lines.map((l, i) => (
            <li key={i} className="flex gap-2">
              <Check className="w-4 h-4 mt-1 shrink-0 text-live-a" aria-hidden />
              {sh(tr(l))}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ gallery */

function GalleryClip({ i, active, onEnded, onPick, liRef }: {
  i: number; active: boolean; onEnded: () => void; onPick: () => void; liRef: (el: HTMLLIElement | null) => void;
}) {
  const { tr, pick } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const c = GALLERY.clips[i];
  useAutoplay(ref, { enabled: active, threshold: 0.5 });
  const { muted, toggle } = useSound(ref);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.addEventListener('ended', onEnded);
    return () => v.removeEventListener('ended', onEnded);
  }, [onEnded]);
  // a clip that loses the turn goes quiet again
  useEffect(() => { if (!active && ref.current) ref.current.muted = true; }, [active]);
  // tap a waiting clip: it plays with sound; tap the playing clip: sound on/off
  const onClick = () => {
    if (active) { toggle(); return; }
    onPick();
    const v = ref.current;
    if (v && !reducedMotion()) { v.muted = false; v.currentTime = 0; }
  };
  return (
    <li ref={liRef} data-i={i} className="snap-start shrink-0 w-[44vw] max-w-[200px] md:w-auto md:max-w-none min-w-0">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active && !muted}
        aria-label={`${tr(c.label)}. ${tr(TAGS[c.tag])}. ${active && !muted ? pick('השתיקו', 'Mute', 'ปิดเสียง') : pick('הפעילו עם קול', 'Play with sound', 'เล่นพร้อมเสียง')}`}
        className={`relative block w-full overflow-hidden rounded-2xl aspect-[9/16] bg-black border-2 transition-colors ${active ? 'border-live-a' : 'border-ink/10 hover:border-ink/30'}`}
      >
        <video
          ref={ref}
          src={c.src}
          poster={c.poster}
          muted
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <HonestyTag tag={c.tag} className="absolute bottom-2 start-2" />
        <span
          className={`absolute bottom-2 end-2 grid place-items-center w-8 h-8 rounded-full bg-black/70 text-white transition-opacity ${active && !muted ? 'opacity-100' : 'opacity-70'}`}
          aria-hidden
        >
          <SpeakerGlyph className="w-4 h-4" />
        </span>
      </button>
      <p className="mt-2.5 text-[0.98rem] font-bold text-ink leading-snug">{sh(tr(c.label))}</p>
      <p className="mt-1 text-[0.84rem] leading-[1.45] text-ink/65">{sh(tr(c.line))}</p>
    </li>
  );
}

/** One clip plays at a time and hands over to the next clip that is on screen. */
function Gallery() {
  const n = GALLERY.clips.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const seen = useRef<number[]>(Array(n).fill(0));
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const pick = (i: number) => { activeRef.current = i; setActive(i); };

  const next = useRef(() => {
    const from = activeRef.current;
    for (let k = 1; k <= n; k++) {
      const j = (from + k) % n;
      if (seen.current[j] >= 0.5) { pick(j); return; }
    }
  }).current;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { seen.current[Number((e.target as HTMLElement).dataset.i)] = e.isIntersecting ? e.intersectionRatio : 0; });
      if (seen.current[activeRef.current] < 0.5) {
        const j = seen.current.findIndex(r => r >= 0.5);
        if (j >= 0) pick(j);
      }
    }, { threshold: [0, 0.5, 0.9] });
    items.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ul className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:gap-x-5 md:gap-y-8 md:overflow-visible">
      {GALLERY.clips.map((c, i) => (
        <GalleryClip key={c.id} i={i} active={i === active} onEnded={next} onPick={() => pick(i)} liRef={el => { items.current[i] = el; }} />
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ co-host */

const COHOST_ICONS = [MessageSquareText, TagIcon, Mic];

function CohostVideo() {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplay(ref, { prio: 1 });
  const { muted, toggle } = useSound(ref);
  return (
    <figure>
      <div className="relative overflow-hidden rounded-[22px] border border-ink/15 bg-black aspect-video shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
        <video
          ref={ref}
          src={COHOST.video}
          poster={COHOST.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={tr(COHOST.videoLabel)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <HonestyTag tag={COHOST.tag} className="absolute top-3 end-3" />
        <SoundButton muted={muted} onClick={toggle} className="absolute bottom-3 start-3" />
      </div>
      <figcaption className="mt-3 text-[0.82rem] text-muted-foreground">{sh(tr(COHOST.videoLabel))}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ pricing */

function PlanCard({ p, href, onClick, Icon, ctaColor }: {
  p: LivePlan; href: string; onClick: () => void; Icon: typeof WhatsAppGlyph; ctaColor: string;
}) {
  const { tr, language } = useT();
  const rec = !!p.recommended;
  const free = p.price !== null && p.price[language] === 0;
  return (
    <article
      className={`relative flex flex-col rounded-[22px] p-6 ${
        rec
          ? 'border-live-gradient bg-[#0f1626] shadow-[0_30px_70px_-40px_rgba(0,184,217,0.6)]'
          : free ? 'border border-dashed border-ink/25' : 'border border-ink/12 bg-mist/60'
      }`}
    >
      {rec && (
        <span className="absolute -top-3 start-6 rounded-full bg-live-gradient px-3 py-1 text-[0.75rem] font-semibold text-white">{tr(PRICING.recommended)}</span>
      )}
      <h3 className="text-[1.2rem] font-bold text-ink">{tr(p.name)}</h3>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="tabular-nums text-[2.5rem] font-bold leading-none tracking-tight text-ink">
          {p.price === null ? <span className="font-sans text-[1.9rem]">{tr(PRICING.quote)}</span> : sh(money(p.price, language))}
        </span>
        <span className="text-[0.95rem] text-muted-foreground">{sh(tr(p.unit))}</span>
      </p>
      <ul className="mt-5 pt-4 border-t border-ink/10 space-y-2 text-[0.94rem] leading-[1.5] text-ink/85">
        {p.includes.map((f, i) => (
          <li key={i} className="flex gap-2">
            <Check className="w-4 h-4 mt-1 shrink-0 text-live-a" aria-hidden />
            {tr(f)}
          </li>
        ))}
      </ul>
      <div className="flex-1" aria-hidden />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition ${
          free ? `${ctaColor} text-[#06210f] hover:brightness-105` : rec ? 'bg-ink text-paper hover:bg-white' : 'border border-ink/25 text-ink hover:bg-ink/5'
        }`}
      >
        <Icon className="w-4 h-4 shrink-0" />
        {tr(p.cta)}
      </a>
    </article>
  );
}

/* ------------------------------------------------------------------ page */

export default function LiveSelling() {
  const { language, pick, tr, fontDisplay, isThai } = useT();
  const waHref = (msg: L10n) => (isThai ? LINE_URL : `${WHATSAPP_URL}?text=${encodeURIComponent(tr(msg))}`);
  const ctaUrl = waHref(FINAL.message);
  const CtaIcon = isThai ? LineGlyph : WhatsAppGlyph;
  const ctaColor = isThai ? 'bg-[#06C755]' : 'bg-[#25D366]';
  const ctaShadow = isThai ? 'shadow-[0_14px_34px_-12px_rgba(6,199,85,0.75)]' : 'shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)]';
  const track = (where: string) => () => (isThai ? trackLineClick(where) : trackWhatsAppClick(where));
  const primaryBtn = `inline-flex min-h-[48px] items-center gap-2.5 rounded-full ${ctaColor} text-[#06210f] font-bold px-6 sm:px-7 py-3.5 text-[1rem] leading-snug ${ctaShadow} hover:brightness-105 transition`;

  const meta = routeMeta(PATH)!;
  const pageUrl = urlFor(PATH, language);
  const currency = CURRENCY[language];
  const offer = (name: string, description: string, m: Money, unitText?: string) => ({
    '@type': 'Offer',
    name: `Refael.ai ${name}`,
    description,
    price: String(m[language]),
    priceCurrency: currency,
    url: `${pageUrl}#pricing`,
    availability: 'https://schema.org/InStock',
    ...(unitText ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: String(m[language]), priceCurrency: currency, unitText } } : {}),
    seller: { '@id': ORG_ID },
  });
  const offers = [
    offer('Free test live', '10-minute test live with your product', PRICES.test),
    offer('AI live host, per live hour', 'One live hour with a ready-made AI host on YouTube, Facebook or TikTok', PRICES.hour, 'HOUR'),
    offer('AI live host, 10 live hours', `10 live hours, about ${money(PRICES.packPerHour, language)} an hour`, PRICES.pack),
  ];
  useSeo({
    path: PATH,
    image: `${SITE_URL}/og/live-selling-${language}.jpg`,
    jsonLd: [
      {
        ...serviceLd(meta.title![language], meta.description![language], pageUrl, language),
        hasOfferCatalog: { '@type': 'OfferCatalog', name: tr(PRICING.title), itemListElement: offers },
      },
      faqLd(FAQ.map(f => ({ q: tr(f.q), a: tr(f.a) }))),
      breadcrumbLd(
        [
          { name: 'Refael.ai', path: '/' },
          { name: pick('מנחה AI ללייב', 'AI live host', 'พิธีกร AI สำหรับไลฟ์'), path: PATH },
        ],
        language
      ),
    ],
  });

  const h2 = `${fontDisplay} text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.12] text-ink [text-wrap:balance]`;
  const toPricing = () => document.getElementById('pricing')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });

  return (
    <SiteLayout sections={SECTIONS} whatsappMessage={tr(FINAL.message)}>
      {/* HERO: does it really work live? The real live, with the 3 steps beside it */}
      <section className="relative hero-bg overflow-hidden px-4 sm:px-5 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
        <div className="relative max-w-[1200px] mx-auto grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          <div className="min-w-0">
            <h1 className={`${fontDisplay} text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.1] tracking-tight text-ink [text-wrap:balance]`}>{tr(HERO.h1)}</h1>
            <p className="mt-5 text-[1.12rem] sm:text-[1.25rem] leading-[1.6] text-ink/80 max-w-[34em]">{tr(HERO.lead)}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer" onClick={track('live_hero')} className={primaryBtn}>
                <CtaIcon className="w-5 h-5 shrink-0" />
                {tr(HERO.cta)}
              </a>
              <button
                type="button"
                onClick={toPricing}
                className="inline-flex min-h-[44px] items-center px-1 text-[0.98rem] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {tr(HERO.seePrices)}
              </button>
            </div>
            <p className="mt-3 text-[0.88rem] text-muted-foreground">{tr(HERO.ctaNote)}</p>
            {/* proof chips: plain text, no logos */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-[0.84rem] text-ink/60">{tr(HERO.proofLabel)}</span>
              <ul dir="ltr" className="flex flex-wrap gap-2">
                {HERO.proof.map(p => (
                  <li key={p} className="rounded-full border border-ink/20 bg-paper/60 px-3 py-1 text-[0.82rem] font-semibold text-ink/90">{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="min-w-0">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center lg:gap-6">
              <div className="w-full max-w-[300px] mx-auto lg:mx-0">
                <HeroVideo />
              </div>
              <HeroSteps />
            </div>
            <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.84rem] leading-[1.5] text-ink/70">
              <HonestyTag tag="real" />
              <span>{tr(HERO.videoCaption)}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* PLATFORMS: on my channel? One phone per platform */}
      <section id="platforms" className="px-4 sm:px-5 py-16 lg:py-20 bg-mist border-y border-ink/10 scroll-mt-16 overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <Eyebrow text={PLATFORMS.eyebrow} />
          <h2 className={h2}>{tr(PLATFORMS.title)}</h2>
          <p className="mt-3 text-[1.02rem] leading-[1.6] text-ink/70 max-w-[60ch]">{tr(PLATFORMS.sub)}</p>
          <ul className="mt-10 grid gap-12 md:grid-cols-3 md:gap-6 lg:gap-10">
            {PLATFORMS.items.map(p => <PlatformPhone key={p.id} p={p} />)}
          </ul>
        </div>
      </section>

      {/* CLIP GALLERY: can it sell my product? */}
      <section id="clips" className="px-4 sm:px-5 py-16 lg:py-20 bg-paper overflow-hidden scroll-mt-16">
        <div className="max-w-[1100px] mx-auto">
          <Eyebrow text={GALLERY.eyebrow} />
          <h2 className={h2}>{tr(GALLERY.title)}</h2>
          <p className="mt-3 text-[1.02rem] leading-[1.6] text-ink/70">{tr(GALLERY.sub)}</p>
          <Gallery />
        </div>
      </section>

      {/* CO-HOST: can I host with it? */}
      <section id="cohost" className="px-4 sm:px-5 py-16 lg:py-20 bg-mist scroll-mt-16">
        <div className="max-w-[1000px] mx-auto">
          <Eyebrow text={COHOST.eyebrow} />
          <h2 className={h2}>{tr(COHOST.title)}</h2>
          <p className="mt-3 text-[1.1rem] leading-[1.6] text-ink/75">{tr(COHOST.sub)}</p>
          <div className="mt-8">
            <CohostVideo />
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {COHOST.does.map((d, i) => {
              const Icon = COHOST_ICONS[i];
              return (
                <li key={i} className="rounded-2xl border border-ink/12 bg-paper/70 p-5">
                  <span className="flex items-center gap-2.5">
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-live-gradient text-white"><Icon className="w-[18px] h-[18px]" aria-hidden /></span>
                    <h3 className="text-[1.08rem] font-bold text-ink leading-snug">{tr(d.title)}</h3>
                  </span>
                  <p className="mt-3 text-[0.95rem] leading-[1.55] text-ink/75">{tr(d.body)}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-5 flex items-center gap-2.5 text-[0.9rem] text-ink/65">
            <HonestyTag tag="test" />
            {tr(COHOST.note)}
          </p>
        </div>
      </section>

      {/* USE CASES: one line each */}
      <section aria-labelledby="usecases-title" className="px-4 sm:px-5 py-12 bg-paper border-b border-ink/10">
        <div className="max-w-[1100px] mx-auto">
          <h2 id="usecases-title" className={`${fontDisplay} text-[clamp(1.4rem,3vw,2rem)] leading-[1.2] text-ink`}>{tr(USE_CASES.title)}</h2>
          <ul className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {USE_CASES.items.map((u, i) => (
              <li key={i} className="border-s-2 border-live-a/60 ps-4">
                <p className="text-[1.02rem] font-bold text-ink">{tr(u.name)}</p>
                <p className="mt-1 text-[0.9rem] leading-[1.5] text-ink/70">{tr(u.line)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRICING: what does it cost? */}
      <section id="pricing" className="px-4 sm:px-5 py-16 lg:py-20 bg-paper scroll-mt-16">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow text={PRICING.eyebrow} />
          <h2 className="sr-only">{tr(PRICING.title)}</h2>
          <p className={`${fontDisplay} text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] text-ink`}>{tr(PRICING.statement)}</p>
          <p className="mt-3 text-[1rem] leading-[1.6] text-ink/70 max-w-[60ch]">{tr(PRICING.why)}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
            {PRICING.plans.map(p => (
              <PlanCard
                key={p.id}
                p={p}
                href={p.id === 'test' ? ctaUrl : waHref(PRICING.planMessage(p.name.en))}
                onClick={track(`live_plan_${p.id}`)}
                Icon={CtaIcon}
                ctaColor={ctaColor}
              />
            ))}
          </div>
          <p className="mt-6 text-[0.85rem] text-muted-foreground">{tr(PRICING.note)}</p>
        </div>
      </section>

      {/* FAQ: what can't it do? */}
      <section id="faq" className="px-4 sm:px-5 py-16 lg:py-20 bg-mist scroll-mt-16">
        <div className="max-w-[820px] mx-auto">
          <Eyebrow text={FAQ_EYEBROW} />
          <h2 className={`${h2} mb-8`}>{tr(FAQ_HEAD)}</h2>
          <FaqList items={FAQ} />
        </div>
      </section>

      {/* FINAL CTA: try it */}
      <section className="relative px-4 sm:px-5 py-16 lg:py-20 hero-bg overflow-hidden">
        <div className="relative max-w-[720px] mx-auto text-center">
          <Eyebrow text={FINAL.eyebrow} />
          <h2 className={h2}>{tr(FINAL.title)}</h2>
          <p className="mt-4 text-[1.1rem] leading-[1.6] text-ink/80">{tr(FINAL.body)}</p>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" onClick={track('live_final')} className={`mt-8 ${primaryBtn}`}>
            <CtaIcon className="w-5 h-5 shrink-0" />
            {tr(HERO.cta)}
          </a>
        </div>
      </section>

      <RelatedProducts current={PATH} />
    </SiteLayout>
  );
}
