import { Link, useLocation } from 'react-router-dom';
import { useT, LANGUAGES } from '@/components/refael/i18n';
import { PRODUCTS, LANGUAGE_NAMES } from '@/config/site';
import { WHATSAPP_URL, BUSINESS } from '@/config/avatars';
import { LEGAL, type LegalSlug } from '@/content/legal';
import { WhatsAppGlyph } from './icons';

const LEGAL_SLUGS: LegalSlug[] = ['privacy', 'terms', 'accessibility'];

/** The footer is the site map: every page, every language, every way to reach Refael. */
export default function SiteFooter() {
  const { language, pick, tr } = useT();
  const { pathname } = useLocation();

  const head = 'text-[0.82rem] font-semibold text-ink/90 mb-4';
  const link = 'text-[0.9rem] text-ink/60 hover:text-ink transition-colors';

  const explore = [
    { to: '/', label: pick('עמוד הבית', 'Home', 'หน้าแรก') },
    { to: '/#how', label: pick('איך זה עובד', 'How it works', 'ทำงานอย่างไร') },
    { to: '/#uses', label: pick('איפה זה עובד', 'Where it works', 'ใช้งานที่ไหน') },
    { to: '/#faq', label: pick('שאלות נפוצות', 'FAQ', 'คำถามที่พบบ่อย') },
    { to: '/#contact', label: pick('צרו קשר', 'Contact', 'ติดต่อเรา') },
  ];

  return (
    <footer className="bg-[#05070c] border-t border-ink/10 px-5 pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="text-[1.2rem] font-bold tracking-tight text-ink">
              Refael<span className="text-live-gradient">.ai</span>
            </Link>
            <p className="mt-4 text-[0.92rem] leading-[1.7] text-ink/60 max-w-[34ch]">
              {pick(
                'דמויות AI חיות שמדברות עם הלקוחות שלכם: בלייב, באתר ובלובי. בעברית, באנגלית ובתאית.',
                'Live AI characters that talk with your customers: on live streams, on your site and in your lobby. In Hebrew, English and Thai.',
                'ตัวละคร AI ที่คุยกับลูกค้าของคุณ ทั้งบนไลฟ์ บนเว็บไซต์ และในล็อบบี้ รองรับภาษาฮีบรู อังกฤษ และไทย'
              )}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-[0.88rem] font-semibold text-ink hover:bg-ink/5 transition-colors"
            >
              <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
              WhatsApp
            </a>
          </div>

          <nav aria-label={pick('מוצרים', 'Products', 'ผลิตภัณฑ์')}>
            <p className={head}>{pick('מוצרים', 'Products', 'ผลิตภัณฑ์')}</p>
            <ul className="space-y-2.5">
              {PRODUCTS.map(p => (
                <li key={p.path}><Link to={p.path} className={link}>{tr(p.name)}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label={pick('האתר', 'Site', 'เว็บไซต์')}>
            <p className={head}>{pick('האתר', 'Site', 'เว็บไซต์')}</p>
            <ul className="space-y-2.5">
              {explore.map(e => (
                <li key={e.to}><Link to={e.to} className={link}>{e.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label={pick('שפות', 'Languages', 'ภาษา')}>
            <p className={head}>{pick('שפות', 'Languages', 'ภาษา')}</p>
            <ul className="space-y-2.5">
              {LANGUAGES.map(l => (
                <li key={l}>
                  <Link
                    to={`${pathname}?lang=${l}`}
                    lang={l}
                    hrefLang={l}
                    aria-current={language === l ? 'true' : undefined}
                    className={`${link} ${language === l ? 'text-ink font-semibold' : ''}`}
                  >
                    {LANGUAGE_NAMES[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={pick('מידע משפטי', 'Legal', 'กฎหมาย')}>
            <p className={head}>{pick('מידע משפטי', 'Legal', 'ข้อมูลทางกฎหมาย')}</p>
            <ul className="space-y-2.5">
              {LEGAL_SLUGS.map(s => (
                <li key={s}><Link to={`/legal/${s}`} className={link}>{LEGAL[s][language].title}</Link></li>
              ))}
              <li><a href={`mailto:${BUSINESS.email}`} className={link}>{BUSINESS.email}</a></li>
            </ul>
          </nav>
        </div>

        <p className="mt-14 pt-6 border-t border-ink/10 text-[0.8rem] text-ink/60">
          {pick(
            `© ${new Date().getFullYear()} ${BUSINESS.nameHe}, ${BUSINESS.entityHe}`,
            `© ${new Date().getFullYear()} ${BUSINESS.name}, ${BUSINESS.entityEn}`,
            `© ${new Date().getFullYear()} ${BUSINESS.name}, ${BUSINESS.entityTh}`
          )}
        </p>
      </div>
    </footer>
  );
}
