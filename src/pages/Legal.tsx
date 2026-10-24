import { Link, useParams } from 'react-router-dom';
import { useT } from '@/components/refael/i18n';
import { LEGAL, type LegalSlug } from '@/content/legal';
import SiteLayout from '@/components/site/SiteLayout';
import { useSeo, breadcrumbLd } from '@/components/site/Seo';

const SLUGS: LegalSlug[] = ['privacy', 'terms', 'accessibility'];

export default function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const { language, pick, fontDisplay } = useT();

  const key = (SLUGS.includes(slug as LegalSlug) ? slug : 'privacy') as LegalSlug;
  const doc = LEGAL[key][language];
  const path = `/legal/${key}`;

  useSeo({
    path,
    title: `${doc.title} | Refael.ai`,
    description: doc.intro.slice(0, 155),
    jsonLd: [breadcrumbLd([{ name: 'Refael.ai', path: '/' }, { name: doc.title, path }], language)],
  });

  return (
    <SiteLayout>
      <article className="max-w-[820px] w-full mx-auto px-5 pt-32 pb-20">
        <nav aria-label={pick('פירורי לחם', 'Breadcrumb', 'เส้นทาง')} className="text-[0.88rem] text-muted-foreground">
          <Link to="/" className="hover:text-ink transition-colors">Refael.ai</Link>
          <span className="mx-2 opacity-50" aria-hidden>/</span>
          <span aria-current="page" className="text-ink/80">{doc.title}</span>
        </nav>
        <h1 className={`${fontDisplay} mt-5 text-[clamp(2rem,4.5vw,3rem)] leading-[1.15] text-ink`}>{doc.title}</h1>
        <p className="mt-3 text-[0.88rem] text-muted-foreground">
          {pick('עודכן לאחרונה: ', 'Last updated: ', 'ปรับปรุงล่าสุด: ')}{doc.updated}
        </p>
        <p className="mt-8 text-[1.06rem] leading-[1.8] text-ink/85">{doc.intro}</p>

        <div className="mt-12 space-y-10">
          {doc.sections.map(s => (
            <section key={s.h}>
              <h2 className="text-[1.2rem] font-semibold text-ink">{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.p.map((para, i) => (
                  <p key={i} className="text-[1rem] leading-[1.85] text-ink/70">{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav className="mt-16 pt-8 border-t border-ink/10 flex flex-wrap gap-x-6 gap-y-2" aria-label={pick('מסמכים נוספים', 'Other documents', 'เอกสารอื่น')}>
          {SLUGS.filter(s => s !== key).map(s => (
            <Link key={s} to={`/legal/${s}`} className="text-[0.95rem] text-ink/60 hover:text-ink underline underline-offset-4 transition-colors">
              {LEGAL[s][language].title}
            </Link>
          ))}
        </nav>
      </article>
    </SiteLayout>
  );
}
