import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useT, LANGUAGES, LANGUAGE_LABELS } from '@/components/refael/i18n';
import { LEGAL, type LegalSlug } from '@/content/legal';
import Footer from '@/components/refael/Footer';

const SLUGS: LegalSlug[] = ['privacy', 'terms', 'accessibility'];

export default function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const { language, setLanguage, pick, fontDisplay, isHebrew } = useT();

  const key = (SLUGS.includes(slug as LegalSlug) ? slug : 'privacy') as LegalSlug;
  const doc = LEGAL[key][language];

  useEffect(() => {
    document.title = `${doc.title} · Refael.ai`;
    window.scrollTo(0, 0);
  }, [doc.title]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-ink/8">
        <div className="max-w-[820px] mx-auto flex items-center justify-between px-5 h-16">
          <Link to="/" className="text-[1.05rem] font-bold tracking-tight text-ink">
            Refael<span className="text-live-gradient">.ai</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 border border-ink/15 rounded-full p-0.5" role="group" aria-label="Language">
              {LANGUAGES.map(lng => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  aria-pressed={language === lng}
                  lang={lng}
                  className={`text-[0.75rem] font-medium rounded-full px-2.5 py-1 leading-none transition-colors ${
                    language === lng ? 'bg-ink text-white' : 'text-muted-foreground hover:text-ink'
                  }`}
                >
                  {LANGUAGE_LABELS[lng]}
                </button>
              ))}
            </div>
            <Link
              to="/"
              className="text-[0.85rem] text-muted-foreground hover:text-ink transition-colors"
            >
              {pick('חזרה לאתר', 'Back to site', 'กลับสู่เว็บไซต์')}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[820px] w-full mx-auto px-5 py-14">
        <h1 className={`${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.15] text-ink`}>
          {doc.title}
        </h1>
        <p className="mt-3 text-[0.85rem] text-muted-foreground">
          {pick('עודכן לאחרונה: ', 'Last updated: ', 'ปรับปรุงล่าสุด: ')}{doc.updated}
        </p>
        <p className="mt-7 text-[1.05rem] leading-[1.75] text-ink/85">{doc.intro}</p>

        <div className="mt-11 space-y-9">
          {doc.sections.map(s => (
            <section key={s.h}>
              <h2 className="text-[1.15rem] font-semibold text-ink">{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.p.map((para, i) => (
                  <p key={i} className="text-[0.98rem] leading-[1.8] text-ink/75">{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav className={`mt-16 pt-8 border-t border-ink/10 flex flex-wrap gap-x-6 gap-y-2 ${isHebrew ? 'justify-end' : ''}`}>
          {SLUGS.filter(s => s !== key).map(s => (
            <Link
              key={s}
              to={`/legal/${s}`}
              className="text-[0.9rem] text-muted-foreground hover:text-ink underline underline-offset-4 transition-colors"
            >
              {LEGAL[s][language].title}
            </Link>
          ))}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
