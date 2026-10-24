import { useState } from 'react';
import { useT } from '@/components/refael/i18n';
import SiteLayout from '@/components/site/SiteLayout';
import { SpeakingVideo, FaqList, RelatedProducts, playWithSound } from '@/components/site/blocks';
import { WhatsAppGlyph, SpeakerGlyph } from '@/components/site/icons';
import { useSeo, serviceLd, faqLd, breadcrumbLd } from '@/components/site/Seo';
import { WHATSAPP_URL } from '@/config/avatars';
import { routeMeta, urlFor, SITE_URL } from '@/config/site';
import {
  MEDIA, HERO, PROOF, FEATURES_HEAD, FEATURES, PRODUCT_CARD, WHERE_HEAD, WHERE,
  STEPS_HEAD, STEPS, OFFER, FAQ_HEAD, FAQ,
} from '@/content/liveSelling';

const PATH = '/live-selling';
const SECTIONS = [
  { href: '#what', he: 'מה היא עושה', en: 'What she does', th: 'เธอทำอะไร' },
  { href: '#start', he: 'איך מתחילים', en: 'How to start', th: 'เริ่มต้นยังไง' },
  { href: '#faq', he: 'שאלות', en: 'FAQ', th: 'คำถาม' },
];

export default function LiveSelling() {
  const { language, pick, tr, fontDisplay } = useT();
  const media = MEDIA[language];
  const wa = `${WHATSAPP_URL}?text=${encodeURIComponent(tr(OFFER.message))}`;
  const [novaLang, setNovaLang] = useState<'he' | 'en'>(language === 'he' ? 'he' : 'en');

  const meta = routeMeta(PATH)!;
  useSeo({
    path: PATH,
    image: `${SITE_URL}/og/live-selling-${language}.jpg`,
    jsonLd: [
      serviceLd(meta.title![language], meta.description![language], urlFor(PATH, language), language),
      faqLd(FAQ.map(f => ({ q: tr(f.q), a: tr(f.a) }))),
      breadcrumbLd(
        [
          { name: 'Refael.ai', path: '/' },
          { name: pick('מנחה AI ללייב מכירות', 'AI host for live selling', 'พิธีกร AI สำหรับไลฟ์ขายของ'), path: PATH },
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
                onClick={() => playWithSound('ls-hero-video')}
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
                    <span className="block font-mono-num text-[1.7rem] font-semibold text-ink leading-none">{p.n}</span>
                    <span className="block mt-2 text-[0.8rem] leading-[1.4] text-muted-foreground">{tr(p.label)}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <SpeakingVideo
            id="ls-hero-video"
            src={media.src}
            poster={media.poster}
            ratio={media.ratio}
            live={media.badge}
            className={`w-full mx-auto ${media.ratio === '9/16' ? 'max-w-[360px]' : 'max-w-[440px]'}`}
          />
        </div>
      </section>

      {/* WHAT SHE DOES */}
      <section id="what" className="px-5 py-24 sm:py-28 bg-mist scroll-mt-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink`}>{tr(FEATURES_HEAD.title)}</h2>
          <p className="mt-3 text-[1.1rem] text-muted-foreground">{tr(FEATURES_HEAD.sub)}</p>

          <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {FEATURES.map((f, i) => (
              <article key={i} className="border-t border-ink/15 pt-6">
                <h3 className="flex items-center gap-3 text-[1.25rem] font-bold text-ink">
                  <span className="text-[1.35rem]" aria-hidden>{f.icon}</span>
                  {tr(f.title)}
                </h3>
                <p className="mt-2.5 text-[1rem] leading-[1.7] text-ink/70 max-w-[48ch]">{tr(f.body)}</p>

                {f.chat && (
                  <div className="mt-5 grid gap-2.5 max-w-[440px]" aria-label={pick('דוגמה מהצ׳אט', 'Chat example', 'ตัวอย่างแชท')}>
                    {f.chat.map((m, j) => (
                      <div
                        key={j}
                        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-[1.45] ${
                          m.host
                            ? 'justify-self-end bg-[#1d2740] border border-live-a/30 text-ink rounded-ee-md'
                            : 'justify-self-start bg-[#f2efe9] text-[#1d1814] rounded-es-md'
                        }`}
                      >
                        <span className={`block text-[0.72rem] font-bold mb-0.5 ${m.host ? 'text-live-a' : 'text-[#5b534c]'}`}>{tr(m.who)}</span>
                        {tr(m.text)}
                      </div>
                    ))}
                  </div>
                )}

                {f.product && (
                  <div className="mt-5 flex items-center gap-4 max-w-[340px] rounded-2xl bg-white p-3 pe-5 text-[#1d1814]">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c8823f] to-[#8a4b1c] shrink-0" aria-hidden />
                    <div>
                      <span className="block text-[0.95rem] font-semibold">{tr(PRODUCT_CARD.name)}</span>
                      <span className="text-[1.3rem] font-black text-[#e11d48]">{tr(PRODUCT_CARD.price)}</span>
                      <s className="ms-2 text-[0.9rem] text-[#6b6b6b]">{tr(PRODUCT_CARD.was)}</s>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NOVA */}
      <section className="px-5 py-24 bg-[linear-gradient(180deg,#1b1233,#0f0b1d)] border-y border-[#4c3480]/40">
        <div className="max-w-[1100px] mx-auto grid gap-12 lg:grid-cols-[1fr_300px] lg:items-center">
          <div>
            <h2 className={`${fontDisplay} text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.15] text-ink`}>
              {pick('לא רק מיה. תכירו את נובה.', 'Not just Maya. Meet Nova.', 'ไม่ใช่แค่พิธีกร พบกับโนวา')}
            </h2>
            <p className="mt-4 text-[1.08rem] leading-[1.7] text-[#cbbdf0] max-w-[46ch]">
              {pick(
                'אותה טכנולוגיה, דמות אחרת. נובה מציגה ערכת ניסויים לילדים, עונה להורים בשם, ושולחת קישור. אפשר לבנות דמות כזאת לכל מותג, גם מקמע קיים.',
                'Same technology, a different character. Nova presents a kids’ science kit, answers parents by name and sends a link. We can build one for any brand, even from an existing mascot.',
                'เทคโนโลยีเดียวกัน ตัวละครต่างกัน โนวานำเสนอชุดทดลองวิทยาศาสตร์สำหรับเด็ก ตอบผู้ปกครองด้วยชื่อ และส่งลิงก์ให้ เราสร้างตัวละครแบบนี้ให้ทุกแบรนด์ได้ แม้แต่จากมาสคอตที่มีอยู่แล้ว'
              )}
            </p>
            <div className="mt-6 flex gap-2" role="group" aria-label={pick('שפת הסרטון', 'Clip language', 'ภาษาของคลิป')}>
              {(['he', 'en'] as const).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setNovaLang(l)}
                  aria-pressed={novaLang === l}
                  className={`rounded-full px-4 py-2 text-[0.9rem] font-semibold border transition-colors ${
                    novaLang === l ? 'bg-[#a78bfa] text-[#1d1430] border-[#a78bfa]' : 'border-[#6b52a8] text-[#d9ccff]'
                  }`}
                >
                  {l === 'he' ? pick('עברית', 'Hebrew', 'ภาษาฮีบรู') : pick('אנגלית', 'English', 'ภาษาอังกฤษ')}
                </button>
              ))}
            </div>
          </div>
          <SpeakingVideo
            id="ls-nova-video"
            src={`/maya/nova-${novaLang}.mp4`}
            poster={`/maya/nova-${novaLang}.jpg`}
            ratio="9/16"
            live={false}
            className="w-full max-w-[300px] mx-auto"
          />
        </div>
      </section>

      {/* WHERE */}
      <section className="px-5 py-24 bg-paper">
        <div className="max-w-[1200px] mx-auto">
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink`}>{tr(WHERE_HEAD.title)}</h2>
          <p className="mt-3 text-[1.1rem] text-muted-foreground">{tr(WHERE_HEAD.sub)}</p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHERE.map((w, i) => (
              <li key={i} className="rounded-2xl border border-ink/10 bg-mist px-5 py-5">
                <span className="text-[1.4rem]" aria-hidden>{w.icon}</span>
                <span className="mt-2 block text-[1.08rem] font-semibold text-ink">{tr(w.t)}</span>
                <span className="mt-1 block text-[0.95rem] text-ink/65 leading-[1.55]">{tr(w.b)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STEPS — a real sequence, so it is numbered */}
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
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#25D366] text-[#06210f] font-bold px-9 py-4 text-[1.1rem] shadow-[0_18px_44px_-14px_rgba(37,211,102,0.8)] hover:brightness-105 transition"
          >
            <WhatsAppGlyph className="w-6 h-6" />
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
