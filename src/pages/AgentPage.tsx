import { useEffect, useRef, useState } from 'react';
import { Check, Mic, SendHorizontal, Lock } from 'lucide-react';
import { useT } from '@/components/refael/i18n';
import SiteLayout from '@/components/site/SiteLayout';
import { FaqList, RelatedProducts } from '@/components/site/blocks';
import { WhatsAppGlyph, LineGlyph, SpeakerGlyph } from '@/components/site/icons';
import { useSeo, serviceLd, faqLd, breadcrumbLd, ORG_ID } from '@/components/site/Seo';
import { WHATSAPP_URL, LINE_URL } from '@/config/avatars';
import { routeMeta, urlFor, SITE_URL, type L10n } from '@/config/site';
import { trackWhatsAppClick, trackLineClick } from '@/lib/analytics';
import {
  SESSION_VIDEO, SESSION_POSTER, FACE_VIDEO, FACE_POSTER, HERO, MOCK, PROOF, HOW, BENEFITS,
  PRICING, COMPARE, CUSTOM, FAQ_HEAD, FAQ, FINAL, SECTIONS,
} from '@/content/agentPage';

const PATH = '/customer-service';

const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const shekel = (n: number) => `₪${n.toLocaleString('en-US')}`;

/** The display faces draw ₪ as a ש״ח ligature or lack it; set the sign in the body face. */
const sh = (text: string) =>
  text.split('₪').flatMap((part, i) => (i === 0 ? [part] : [<span key={i} className="font-hebrew">₪</span>, part]));

/* ------------------------------------------------------------------ hero mock */

type Frame = { shown: number; typing: 'agent' | 'visitor' | null; lead: boolean; wait: number };

/**
 * The scripted conversation, one frame per beat. `wait` is how long the frame
 * holds before the next one. The greeting lands ~3.5 s after the loop starts,
 * like the real widget.
 */
const SCRIPT: Frame[] = [
  { shown: 0, typing: null, lead: false, wait: 900 },
  { shown: 0, typing: 'agent', lead: false, wait: 2600 },
  { shown: 1, typing: null, lead: false, wait: 1500 },
  { shown: 1, typing: 'visitor', lead: false, wait: 1500 },
  { shown: 2, typing: null, lead: false, wait: 500 },
  { shown: 2, typing: 'agent', lead: false, wait: 1700 },
  { shown: 3, typing: null, lead: false, wait: 2000 },
  { shown: 3, typing: 'visitor', lead: false, wait: 1400 },
  { shown: 4, typing: null, lead: false, wait: 500 },
  { shown: 4, typing: 'agent', lead: false, wait: 1300 },
  { shown: 5, typing: null, lead: false, wait: 900 },
  { shown: 5, typing: null, lead: true, wait: 5200 },
];
const FINAL_FRAME: Frame = { shown: 5, typing: null, lead: true, wait: 0 };

function useScript(rootRef: React.RefObject<HTMLElement>) {
  const [step, setStep] = useState(0);
  const [still] = useState(reducedMotion);
  const stepRef = useRef(0);

  useEffect(() => {
    if (still) return;
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const next = (stepRef.current + 1) % SCRIPT.length;
        stepRef.current = next;
        setStep(next);
        schedule();
      }, SCRIPT[stepRef.current].wait);
    };
    // paused while the hero is off-screen, resumes where it stopped
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) schedule();
      else window.clearTimeout(timer);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [still, rootRef]);

  return still ? FINAL_FRAME : SCRIPT[step];
}

function TypingDots({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-hidden>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-white/80' : 'bg-[#8a7c74]'} motion-safe:animate-bounce`}
          style={{ animationDelay: `${i * 140}ms`, animationDuration: '1s' }}
        />
      ))}
    </span>
  );
}

function HeroMock() {
  const { tr } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useScript(ref);
  const faceRef = useRef<HTMLVideoElement>(null);

  // the face loop only plays while the mock is on screen (and never for reduced motion)
  useEffect(() => {
    const v = faceRef.current;
    if (!v || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const speaking = frame.typing === 'agent';
  const messages = MOCK.chat.slice(0, frame.shown);

  return (
    <figure className="relative">
      <div ref={ref} role="img" aria-label={tr(HERO.mockLabel)} className="relative">
        <div className="absolute -inset-8 rounded-[40px] stage-glow pointer-events-none" aria-hidden />

        {/* browser window: someone else's site, its own light palette */}
        <div className="relative overflow-hidden rounded-[18px] bg-[#fbf7f3] text-[#3b302b] shadow-[0_0_0_1px_rgba(232,238,247,0.14),0_0_70px_-14px_rgba(0,184,217,0.4),0_50px_90px_-40px_rgba(0,0,0,0.95)]">
          <div className="flex items-center gap-3 bg-[#ece6df] px-3.5 h-9 border-b border-[#dcd3ca]">
            <span className="flex gap-1.5 shrink-0" aria-hidden>
              <span className="w-2.5 h-2.5 rounded-full bg-[#f26b5e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5bf4f]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#5fc454]" />
            </span>
            <span dir="ltr" className="flex-1 min-w-0 flex items-center gap-1.5 rounded-md bg-[#fbf7f3] px-2.5 py-1 text-[0.72rem] text-[#6f625b] truncate">
              <Lock className="w-3 h-3 shrink-0" />
              {MOCK.url}
            </span>
          </div>

          <div className="relative h-[470px] sm:h-[500px]">
            {/* the clinic's own page */}
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="flex items-center gap-2 font-semibold text-[0.95rem]">
                <span className="w-6 h-6 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f1cdbd,#c98f7a)]" />
                {tr(MOCK.brand)}
              </span>
              <span className="hidden sm:flex gap-4 text-[0.78rem] text-[#7d6f67]">
                {MOCK.nav.map((n, i) => <span key={i}>{tr(n)}</span>)}
              </span>
            </div>
            <div className="px-5 pt-8 sm:pt-10 max-w-[62%] sm:max-w-[55%]">
              <p className="text-[0.75rem] text-[#a0705e] font-semibold">{tr(MOCK.sub)}</p>
              <p className="mt-2 text-[1.45rem] sm:text-[1.85rem] leading-[1.15] font-bold tracking-tight">{tr(MOCK.headline)}</p>
              <span className="mt-4 inline-block rounded-full bg-[#c98f7a] text-white text-[0.75rem] font-semibold px-4 py-1.5">{tr(MOCK.book)}</span>
              <div className="mt-6 space-y-2" aria-hidden>
                <span className="block h-2 w-[90%] rounded-full bg-[#ece3da]" />
                <span className="block h-2 w-[75%] rounded-full bg-[#ece3da]" />
                <span className="block h-2 w-[82%] rounded-full bg-[#ece3da]" />
              </div>
            </div>
            <div className="absolute top-16 end-[-40px] w-[48%] h-[210px] rounded-[28px] bg-[radial-gradient(ellipse_at_30%_30%,#f6dccf,#e9c2ae_55%,#dcae98)] opacity-80" aria-hidden />
            <div className="absolute bottom-6 start-5 hidden sm:flex gap-2" aria-hidden>
              {[0, 1].map(i => <span key={i} className="w-[92px] h-[64px] rounded-xl bg-[#f1e8df]" />)}
            </div>

            {/* the agent widget, bottom corner */}
            <div className="absolute bottom-3 end-3 flex flex-col items-end gap-2.5 w-[min(250px,calc(100%-24px))]">
              <div className="w-full rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(59,48,43,0.55)] border border-[#eadfd6] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#f0e8e1]">
                  <span className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                    <img src={FACE_POSTER} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.72rem] font-bold leading-tight truncate">{tr(MOCK.agentName)}</span>
                    <span className="flex items-center gap-1 text-[0.62rem] text-[#3f8f55] leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf63]" />
                      {tr(MOCK.online)}
                    </span>
                  </span>
                  <span className="ms-auto rounded bg-[#f3ece6] px-1.5 py-0.5 text-[0.58rem] font-bold text-[#8a7c74]">AI</span>
                </div>
                <div className="h-[196px] px-2.5 py-2 flex flex-col justify-end gap-1.5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_22%)]">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[86%] rounded-2xl px-2.5 py-1.5 text-[0.7rem] leading-[1.4] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 ${
                        m.agent
                          ? 'self-start bg-[#f3ece6] text-[#3b302b] rounded-es-md'
                          : 'self-end bg-[#c98f7a] text-white rounded-ee-md'
                      }`}
                    >
                      {m.agent ? tr(m.text) : <bdi>{tr(m.text)}</bdi>}
                    </div>
                  ))}
                  {frame.typing && (
                    <div className={`rounded-2xl px-3 py-1 ${frame.typing === 'agent' ? 'self-start bg-[#f3ece6]' : 'self-end bg-[#c98f7a]'}`}>
                      <TypingDots light={frame.typing === 'visitor'} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 border-t border-[#f0e8e1] text-[0.68rem] text-[#a0938b]">
                  <span className="flex-1 truncate">{tr(MOCK.inputHint)}</span>
                  <Mic className="w-3.5 h-3.5 text-[#c98f7a]" />
                  <SendHorizontal className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </div>
              </div>

              {/* the talking face */}
              <span className="relative w-[62px] h-[62px] shrink-0">
                <span
                  className={`absolute -inset-[3px] rounded-full bg-[conic-gradient(from_180deg,#00b8d9,#7c5cf0,#00b8d9)] transition-opacity duration-300 ${speaking ? 'opacity-100' : 'opacity-60'}`}
                  aria-hidden
                />
                <video
                  ref={faceRef}
                  src={FACE_VIDEO}
                  poster={FACE_POSTER}
                  muted
                  loop
                  playsInline
                  autoPlay={!reducedMotion()}
                  preload="metadata"
                  className="relative w-full h-full rounded-full object-cover border-2 border-white bg-[#eadfd6]"
                />
                <span className="absolute bottom-0.5 end-0.5 w-3.5 h-3.5 rounded-full bg-[#3fbf63] border-2 border-white" aria-hidden />
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp-style lead notification beside the browser (below it on small screens) */}
        <div
          className={`relative z-10 mt-[-28px] ms-3 w-[min(250px,calc(100%-24px))] lg:absolute lg:mt-0 lg:ms-0 lg:bottom-24 lg:start-[-44px] transition-all duration-500 ${
            frame.lead ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="rounded-2xl bg-[#0b141a] text-[#e9edef] border border-white/10 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.9)] p-3">
            <div className="flex items-center gap-2 text-[0.68rem] text-[#8696a0]">
              <span className="grid place-items-center w-5 h-5 rounded-md bg-[#25D366] text-[#06210f]">
                <WhatsAppGlyph className="w-3.5 h-3.5" />
              </span>
              {MOCK.lead.app}
              <span className="ms-auto font-mono-num">21:47</span>
            </div>
            <p className="mt-2 text-[0.82rem] font-bold">{tr(MOCK.lead.title)}</p>
            <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[0.74rem]">
              {MOCK.lead.rows.slice(0, 3).map((r, i) => (
                <div key={i} className="contents">
                  <dt className="text-[#8696a0]">{tr(r.k)}</dt>
                  <dd><bdi>{tr(r.v)}</bdi></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-[0.82rem] text-muted-foreground lg:text-center">
        {tr(HERO.caption)}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ 16:9 session video */

function SessionVideo({ label }: { label: string }) {
  const { pick } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => setMuted(v.muted);
    v.addEventListener('volumechange', sync);
    if (reducedMotion() || !('IntersectionObserver' in window)) return () => v.removeEventListener('volumechange', sync);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.35 });
    io.observe(v);
    return () => { io.disconnect(); v.removeEventListener('volumechange', sync); };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.muted) { v.muted = false; v.currentTime = 0; v.play().catch(() => {}); }
    else v.muted = true;
  };

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-ink/15 bg-black shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] aspect-video">
      <video
        ref={ref}
        src={SESSION_VIDEO}
        poster={SESSION_POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        className="absolute bottom-3 start-3 inline-flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md text-white text-[0.85rem] font-semibold px-4 py-2 hover:bg-black/85 transition-colors"
      >
        <SpeakerGlyph className="w-4 h-4" />
        {muted ? pick('הפעילו קול', 'Turn sound on', 'เปิดเสียง') : pick('השתיקו', 'Mute', 'ปิดเสียง')}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ cost comparison */

/** Small looping talking face; plays only while on screen, never for reduced motion. */
function LoopFace({ className = '' }: { className?: string }) {
  const { tr } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <span className={`relative inline-block rounded-full p-[3px] bg-[conic-gradient(from_180deg,#00b8d9,#7c5cf0,#00b8d9)] ${className}`}>
      <video
        ref={ref}
        src={FACE_VIDEO}
        poster={FACE_POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={tr(COMPARE.faceAlt)}
        className="block w-full h-full rounded-full object-cover bg-mist"
      />
    </span>
  );
}

function CostValue({ c }: { c: { t: L10n; note?: L10n } }) {
  const { tr } = useT();
  return (
    <>
      <span className="block text-[1.02rem] font-semibold text-ink/85">{tr(c.t)}</span>
      {c.note && <span className="mt-1 block text-[0.8rem] leading-[1.45] text-ink/50">{tr(c.note)}</span>}
    </>
  );
}

function OursValue({ c }: { c: { t: L10n; ok?: boolean } }) {
  const { tr } = useT();
  return (
    <span className="flex gap-2 text-[1.02rem] font-semibold text-ink">
      <Check className="w-5 h-5 mt-0.5 shrink-0 text-live-a" aria-hidden />
      {tr(c.t)}
    </span>
  );
}

function CostTable() {
  const { tr, fontDisplay } = useT();
  const L = COMPARE.layers;
  return (
    <>
      {/* desktop: one table, cost builds up row by row */}
      <div className="hidden lg:block mt-5 rounded-[24px] border border-ink/10 bg-paper overflow-hidden">
        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">{tr(COMPARE.scenario)}</caption>
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[22%]" />
            <col /><col /><col />
          </colgroup>
          <thead>
            <tr>
              <td className="p-5" />
              <th scope="col" className="p-5 pt-7 bg-live-a/[0.08] text-center">
                <LoopFace className="w-[92px] h-[92px]" />
                <span className="mt-3 block text-[1.15rem] font-bold text-ink">{COMPARE.oursName}</span>
              </th>
              {COMPARE.competitors.map(n => (
                <th key={n} scope="col" className="p-5 align-bottom text-start text-[1.05rem] font-bold text-ink/70">{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {L.map((row, i) => (
              <tr key={i} className="border-t border-ink/10">
                <th scope="row" className="p-5 text-start align-top">
                  <span className="block font-mono-num text-[0.8rem] text-live-a">+{i + 1}</span>
                  <span className="mt-1 block text-[0.98rem] font-semibold leading-snug text-ink/85">{tr(row.label)}</span>
                </th>
                <td className="p-5 align-top bg-live-a/[0.08]"><OursValue c={row.ours} /></td>
                {row.others.map((c, j) => (
                  <td key={j} className="p-5 align-top"><CostValue c={c} /></td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-ink/20">
              <th scope="row" className="p-5 text-start align-middle text-[1.15rem] font-bold text-ink">{tr(COMPARE.totalLabel)}</th>
              <td className="p-5 pb-7 align-top bg-live-a/[0.08]">
                <span className={`${fontDisplay} block text-[3.1rem] leading-none text-live-gradient`}>{sh(COMPARE.oursTotal)}</span>
                <span className="mt-2 block text-[0.82rem] text-ink/60">{tr(COMPARE.oursTotalNote)}</span>
                <span className="mt-1 block text-[0.95rem] font-semibold text-live-a">{tr(COMPARE.oursPerConv)}</span>
              </td>
              {COMPARE.otherTotals.map((t, j) => (
                <td key={j} className="p-5 align-top">
                  <span className="block font-mono-num text-[1.7rem] leading-none text-ink/45"><bdi dir="ltr">{t}</bdi></span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* mobile and tablet: stacked blocks, ours first */}
      <div className="lg:hidden mt-5 space-y-4">
        <article className="border-live-gradient rounded-[22px] bg-[#0f1626] p-5">
          <div className="flex items-center gap-4">
            <LoopFace className="w-[64px] h-[64px] shrink-0" />
            <h3 className="text-[1.2rem] font-bold text-ink">{COMPARE.oursName}</h3>
          </div>
          <dl className="mt-4 divide-y divide-ink/10">
            {L.map((row, i) => (
              <div key={i} className="py-3">
                <dt className="text-[0.85rem] text-ink/60">{tr(row.label)}</dt>
                <dd className="mt-1"><OursValue c={row.ours} /></dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 pt-4 border-t-2 border-ink/20">
            <p className="text-[0.95rem] font-bold text-ink">{tr(COMPARE.totalLabel)}</p>
            <p className={`${fontDisplay} mt-1 text-[2.8rem] leading-none text-live-gradient`}>{sh(COMPARE.oursTotal)}</p>
            <p className="mt-2 text-[0.82rem] text-ink/60">{tr(COMPARE.oursTotalNote)}</p>
            <p className="mt-1 text-[0.95rem] font-semibold text-live-a">{tr(COMPARE.oursPerConv)}</p>
          </div>
        </article>
        {COMPARE.competitors.map((n, j) => (
          <article key={n} className="rounded-[22px] border border-ink/10 bg-paper p-5">
            <h3 className="text-[1.1rem] font-bold text-ink/75">{n}</h3>
            <dl className="mt-3 divide-y divide-ink/10">
              {L.map((row, i) => (
                <div key={i} className="py-3">
                  <dt className="text-[0.85rem] text-ink/55">{tr(row.label)}</dt>
                  <dd className="mt-1"><CostValue c={row.others[j]} /></dd>
                </div>
              ))}
            </dl>
            <div className="mt-2 pt-3 border-t-2 border-ink/15 flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[0.9rem] font-semibold text-ink/70">{tr(COMPARE.totalLabel)}</span>
              <span dir="ltr" className="font-mono-num text-[1.5rem] text-ink/50">{COMPARE.otherTotals[j]}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ page */

export default function AgentPage() {
  const { language, pick, tr, fontDisplay, isThai } = useT();
  const ctaUrl = isThai ? LINE_URL : `${WHATSAPP_URL}?text=${encodeURIComponent(tr(FINAL.message))}`;
  const CtaIcon = isThai ? LineGlyph : WhatsAppGlyph;
  const ctaColor = isThai ? 'bg-[#06C755]' : 'bg-[#25D366]';
  const ctaShadow = isThai ? 'shadow-[0_14px_34px_-12px_rgba(6,199,85,0.75)]' : 'shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)]';
  const track = (where: string) => () => (isThai ? trackLineClick(where) : trackWhatsAppClick(where));

  const meta = routeMeta(PATH)!;
  const pageUrl = urlFor(PATH, language);
  const offers = PRICING.plans.map(p => ({
    '@type': 'Offer',
    name: `Refael.ai ${p.name.en}`,
    description: `${p.minutes} ${PRICING.minutesLabel.en}`,
    price: String(p.price),
    priceCurrency: 'ILS',
    url: `${pageUrl}#pricing`,
    availability: 'https://schema.org/InStock',
    priceSpecification: { '@type': 'UnitPriceSpecification', price: String(p.price), priceCurrency: 'ILS', unitText: 'MONTH' },
    seller: { '@id': ORG_ID },
  }));
  useSeo({
    path: PATH,
    jsonLd: [
      {
        ...serviceLd(meta.title![language], meta.description![language], pageUrl, language),
        hasOfferCatalog: { '@type': 'OfferCatalog', name: tr(PRICING.title), itemListElement: offers },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: pick('נציג AI חי לאתר', 'Live AI website agent', 'เจ้าหน้าที่ AI แบบสดสำหรับเว็บไซต์'),
        description: meta.description![language],
        image: `${SITE_URL}${FACE_POSTER}`,
        brand: { '@type': 'Brand', name: 'Refael.ai' },
        offers,
      },
      faqLd(FAQ.map(f => ({ q: tr(f.q), a: tr(f.a) }))),
      breadcrumbLd(
        [
          { name: 'Refael.ai', path: '/' },
          { name: pick('נציג שירות AI לאתר', 'AI website agent', 'เจ้าหน้าที่ AI สำหรับเว็บไซต์'), path: PATH },
        ],
        language
      ),
    ],
  });

  const h2 = `${fontDisplay} text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.12] text-ink`;
  const toPricing = () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <SiteLayout sections={SECTIONS} whatsappMessage={tr(FINAL.message)}>
      {/* HERO */}
      <section className="relative hero-bg overflow-hidden px-4 sm:px-5 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
        <div className="relative max-w-[1200px] mx-auto grid gap-14 lg:gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="min-w-0">
            <h1 className={`${fontDisplay} text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.1] tracking-tight text-ink`}>{tr(HERO.h1)}</h1>
            <p className="mt-6 text-[1.08rem] sm:text-[1.2rem] leading-[1.65] text-ink/80 max-w-[36em]">{tr(HERO.lead)}</p>

            <p className="mt-7 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-live-a/30 bg-live-a/[0.07] px-4 py-2.5">
              <span className={`${fontDisplay} text-[1.7rem] sm:text-[2rem] leading-none text-ink`}>{sh(tr(HERO.priceChip))}</span>
              <span className="text-[0.82rem] text-muted-foreground">{tr(HERO.priceChipNote)}</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track('agent_hero')}
                className={`inline-flex items-center gap-2.5 rounded-full ${ctaColor} text-[#06210f] font-bold px-6 sm:px-7 py-3.5 text-[1rem] leading-snug ${ctaShadow} hover:brightness-105 transition`}
              >
                <CtaIcon className="w-5 h-5 shrink-0" />
                {tr(HERO.cta)}
              </a>
              <button
                type="button"
                onClick={toPricing}
                className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3.5 text-[0.98rem] font-semibold text-ink hover:bg-ink/5 transition"
              >
                {tr(HERO.seePrices)}
              </button>
            </div>
            <p className="mt-3 text-[0.88rem] text-muted-foreground">{tr(HERO.ctaNote)}</p>

            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem] text-ink/75">
              {HERO.facts.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-live-a shrink-0" aria-hidden />
                  {tr(f)}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:ps-6">
            <HeroMock />
          </div>
        </div>
      </section>

      {/* PROOF: the real recording */}
      <section id="proof" className="px-4 sm:px-5 py-24 bg-mist">
        <div className="max-w-[1100px] mx-auto grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className={h2}>{tr(PROOF.title)}</h2>
            <p className="mt-4 text-[1.05rem] leading-[1.75] text-ink/75 max-w-[42ch]">{tr(PROOF.body)}</p>
          </div>
          <SessionVideo label={tr(PROOF.videoLabel)} />
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="px-4 sm:px-5 py-24 bg-paper">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={h2}>{tr(HOW.title)}</h2>
          <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {HOW.steps.map((s, i) => (
              <li key={i} className="border-t border-ink/15 pt-6">
                <span className="font-mono-num text-[0.95rem] text-live-a">0{i + 1}</span>
                <h3 className="mt-3 text-[1.25rem] font-bold text-ink leading-snug">{tr(s.t)}</h3>
                <p className="mt-2 text-[1rem] leading-[1.7] text-ink/70">{tr(s.b)}</p>
                {s.code && (
                  <code dir="ltr" className="mt-4 block w-full overflow-x-auto whitespace-nowrap rounded-lg bg-mist border border-ink/10 px-3 py-2 text-[0.8rem] font-mono-num text-live-a">
                    {s.code}
                  </code>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BENEFITS + FIT + LIMITS */}
      <section className="px-4 sm:px-5 py-24 bg-mist">
        <div className="max-w-[1200px] mx-auto grid gap-16 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <h2 className={h2}>{tr(BENEFITS.title)}</h2>
            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {BENEFITS.items.map((b, i) => (
                <div key={i} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                  <dt className="text-[1.08rem] font-bold text-ink">{tr(b.t)}</dt>
                  <dd className="text-[1rem] leading-[1.7] text-ink/70">{tr(b.b)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[0.95rem] leading-[1.7] text-ink/65 max-w-[68ch]">{tr(BENEFITS.study)}</p>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-[1.25rem] font-bold text-ink">{tr(BENEFITS.fitTitle)}</h3>
              <p className="mt-1 text-[0.95rem] text-muted-foreground">{tr(BENEFITS.fitNote)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {BENEFITS.fit.map((f, i) => (
                  <li key={i} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.92rem] text-ink/85">{tr(f)}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-ink/20 p-5">
              <h3 className="text-[1.1rem] font-bold text-ink">{tr(BENEFITS.limitsTitle)}</h3>
              <ul className="mt-3 space-y-2.5 text-[0.96rem] leading-[1.6] text-ink/70 list-disc ps-5">
                {BENEFITS.limits.map((l, i) => <li key={i}>{tr(l)}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-4 sm:px-5 py-24 bg-paper">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={h2}>{tr(PRICING.title)}</h2>
          <p className={`${fontDisplay} mt-8 text-[clamp(2rem,5.4vw,3.9rem)] leading-[1.1] text-live-gradient max-w-[18ch]`}>{sh(tr(PRICING.statement))}</p>
          <p className="mt-3 text-[0.9rem] text-muted-foreground">{tr(PRICING.statementNote)}</p>
          <p className="mt-6 text-[1.05rem] text-ink/75">{tr(PRICING.sub)}</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 md:items-stretch">
            {/* the free start */}
            <article className="flex flex-col rounded-[22px] p-6 border border-dashed border-ink/25">
              <h3 className="text-[1.2rem] font-bold text-ink">{tr(PRICING.free.name)}</h3>
              <p className="mt-5 font-mono-num text-[2.6rem] font-semibold leading-none text-ink">₪0</p>
              <ul className="mt-5 space-y-2 text-[0.95rem] leading-[1.55] text-ink/80">
                {PRICING.free.includes.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-live-a" aria-hidden />
                    {tr(f)}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.82rem] text-muted-foreground">{tr(PRICING.free.note)}</p>
              <div className="flex-1" aria-hidden />
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track('agent_free_card')}
                className={`mt-6 inline-flex self-start items-center gap-2 rounded-full ${ctaColor} text-[#06210f] font-bold px-5 py-2.5 text-[0.92rem] hover:brightness-105 transition`}
              >
                <CtaIcon className="w-4 h-4 shrink-0" />
                {tr(PRICING.free.cta)}
              </a>
            </article>

            {PRICING.plans.map(p => (
              <article
                key={p.id}
                className={`relative flex flex-col rounded-[22px] p-6 ${
                  p.recommended ? 'border-live-gradient bg-[#0f1626] shadow-[0_30px_70px_-40px_rgba(0,184,217,0.6)]' : 'border border-ink/12 bg-mist/60'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[1.2rem] font-bold text-ink">{tr(p.name)}</h3>
                  {p.recommended && (
                    <span className="rounded-full bg-live-gradient px-3 py-1 text-[0.75rem] font-semibold text-white">{tr(PRICING.recommended)}</span>
                  )}
                </div>
                <p className="mt-5 flex items-baseline gap-2">
                  <span dir="ltr" className="font-mono-num text-[2.6rem] font-semibold leading-none text-ink">{p.perDay}</span>
                  <span className="text-[0.95rem] text-muted-foreground">{tr(PRICING.perDayLabel)}</span>
                </p>
                <p className="mt-2 text-[1rem] text-ink/85">
                  <span dir="ltr" className="font-mono-num font-semibold">{p.perConv}</span> {tr(PRICING.perConvLabel)}
                </p>
                <div className="mt-5 pt-4 border-t border-ink/10">
                  <p className="text-[1.15rem] text-ink">
                    <span className="font-mono-num font-semibold">{shekel(p.price)}</span> {tr(PRICING.perMonth)}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-ink/80">
                    <span className="font-mono-num">{p.minutes}</span> {tr(PRICING.minutesLabel)}
                  </p>
                  <p className="mt-1 text-[0.9rem] text-ink/60">{tr(p.fit)}</p>
                  <p className="mt-3 text-[0.85rem] text-ink/55">
                    <span className="font-mono-num">{p.perMin}</span> {tr(PRICING.perMinLabel)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {PRICING.extras.map((x, i) => (
                <div key={i} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-[0.95rem] text-muted-foreground">{tr(x.k)}</dt>
                  <dd className="text-[1rem] text-ink">{tr(x.v)}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h3 className="text-[1.2rem] font-bold text-ink">{tr(PRICING.trialTitle)}</h3>
              <p className="mt-2 text-[1rem] leading-[1.7] text-ink/70">{tr(PRICING.trialBody)}</p>
              <p className="mt-5 text-[1.05rem] font-semibold text-live-a">{tr(PRICING.payback)}</p>
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track('agent_pricing')}
                className={`mt-6 inline-flex items-center gap-2.5 rounded-full ${ctaColor} text-[#06210f] font-bold px-6 py-3 text-[0.98rem] ${ctaShadow} hover:brightness-105 transition`}
              >
                <CtaIcon className="w-5 h-5 shrink-0" />
                {tr(PRICING.cta)}
              </a>
            </div>
          </div>
          {language !== 'he' && <p className="mt-8 text-[0.85rem] text-muted-foreground">{tr(PRICING.foreign)}</p>}
        </div>
      </section>

      {/* COMPARE: first-year cost, built up in layers */}
      <section id="compare" className="px-4 sm:px-5 py-24 bg-mist">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2.3rem,6.2vw,4.6rem)] leading-[1.06] text-ink max-w-[16ch]`}>{tr(COMPARE.hook)}</h2>
          <p className="mt-6 text-[1.1rem] sm:text-[1.2rem] leading-[1.65] text-ink/80 max-w-[52ch]">{tr(COMPARE.sub)}</p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={track('agent_compare')}
            className={`mt-8 inline-flex items-center gap-2.5 rounded-full ${ctaColor} text-[#06210f] font-bold px-6 py-3.5 text-[1rem] leading-snug ${ctaShadow} hover:brightness-105 transition`}
          >
            <CtaIcon className="w-5 h-5 shrink-0" />
            {tr(COMPARE.cta)}
          </a>

          <p className="mt-14 text-[1rem] font-semibold text-ink">{tr(COMPARE.scenario)}</p>
          <CostTable />

          <p className="mt-6 text-[0.95rem] text-ink/75">{tr(COMPARE.perHour)}</p>
          <p className="mt-2 text-[0.95rem] text-ink/75 max-w-[70ch]">{tr(COMPARE.honest)}</p>

          <div className="mt-8 text-[0.8rem] leading-[1.6] text-muted-foreground">
            <p className="font-semibold">{tr(COMPARE.sourcesTitle)}</p>
            <p className="mt-1">{tr(COMPARE.sourcesNote)}</p>
            <ul className="mt-2 space-y-1">
              {COMPARE.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink break-words">
                    {tr(s.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="px-4 sm:px-5 py-24 bg-paper">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={h2}>{tr(CUSTOM.title)}</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {CUSTOM.items.map((c, i) => (
              <li key={i}>
                <h3 className="text-[1.1rem] font-bold text-ink">{tr(c.t)}</h3>
                <p className="mt-1.5 text-[0.96rem] leading-[1.65] text-ink/70">{tr(c.b)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 sm:px-5 py-24 bg-mist">
        <div className="max-w-[860px] mx-auto">
          <h2 className={`${h2} mb-10`}>{tr(FAQ_HEAD)}</h2>
          <FaqList items={FAQ} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-4 sm:px-5 py-24 hero-bg overflow-hidden">
        <div className="relative max-w-[760px] mx-auto text-center">
          <h2 className={h2}>{tr(FINAL.title)}</h2>
          <p className="mt-5 text-[1.1rem] leading-[1.7] text-ink/80">{tr(FINAL.body)}</p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={track('agent_final')}
            className={`mt-9 inline-flex items-center gap-3 rounded-full ${ctaColor} text-[#06210f] font-bold px-7 sm:px-9 py-4 text-[1.05rem] leading-snug ${ctaShadow} hover:brightness-105 transition`}
          >
            <CtaIcon className="w-6 h-6 shrink-0" />
            {tr(HERO.cta)}
          </a>
        </div>
      </section>

      <RelatedProducts current={PATH} />
    </SiteLayout>
  );
}
