import { Link, useLocation } from 'react-router-dom';
import { useT } from '@/components/refael/i18n';
import SiteLayout from '@/components/site/SiteLayout';
import { useSeo } from '@/components/site/Seo';
import { PRODUCTS } from '@/config/site';

export default function NotFound() {
  const { pathname } = useLocation();
  const { pick, tr, fontDisplay } = useT();
  useSeo({
    path: pathname,
    title: pick('העמוד לא נמצא | Refael.ai', 'Page not found | Refael.ai', 'ไม่พบหน้านี้ | Refael.ai'),
    noindex: true,
  });

  return (
    <SiteLayout>
      <section className="relative hero-bg overflow-hidden px-5 pt-36 pb-24">
        <div className="relative max-w-[900px] mx-auto">
          <p className="font-mono-num text-[0.95rem] text-live-a">404</p>
          <h1 className={`${fontDisplay} mt-3 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.1] text-ink`}>
            {pick('העמוד הזה לא קיים.', "This page doesn't exist.", 'ไม่มีหน้านี้')}
          </h1>
          <p className="mt-4 text-[1.1rem] text-ink/70 max-w-[46ch]">
            {pick(
              'אולי הקישור ישן. הנה כל מה שיש באתר:',
              'The link may be old. Here is everything on the site:',
              'ลิงก์อาจเก่าแล้ว นี่คือทุกหน้าบนเว็บไซต์:'
            )}
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            <li>
              <Link to="/" className="block rounded-2xl border border-ink/15 bg-mist px-5 py-4 font-semibold text-ink hover:border-ink/30 transition-colors">
                {pick('עמוד הבית', 'Home', 'หน้าแรก')}
              </Link>
            </li>
            {PRODUCTS.map(p => (
              <li key={p.path}>
                <Link to={p.path} className="block rounded-2xl border border-ink/15 bg-mist px-5 py-4 font-semibold text-ink hover:border-ink/30 transition-colors">
                  {tr(p.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
