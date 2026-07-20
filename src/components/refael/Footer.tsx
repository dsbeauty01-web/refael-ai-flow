import { Link } from 'react-router-dom';
import { WHATSAPP_URL, BUSINESS } from '@/config/avatars';
import { useT } from './i18n';
import { LEGAL, type LegalSlug } from '@/content/legal';

const SLUGS: LegalSlug[] = ['privacy', 'terms', 'accessibility'];

export default function Footer() {
  const { language, pick } = useT();

  return (
    <footer className="bg-ink pt-12 pb-9 px-5">
      <div className="max-w-[1160px] mx-auto text-center">
        <p className="text-[0.95rem] text-white/80">
          {pick(
            'Refael.ai · אווטארים חיים לעסקים',
            'Refael.ai · Live avatars for business',
            'Refael.ai · อวตารเสมือนจริงสำหรับธุรกิจ'
          )}
        </p>

        <nav className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {SLUGS.map(s => (
            <Link
              key={s}
              to={`/legal/${s}`}
              className="text-[0.85rem] text-white/55 hover:text-white underline underline-offset-4 transition-colors"
            >
              {LEGAL[s][language].title}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.85rem] text-white/55 hover:text-white underline underline-offset-4 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-[0.85rem] text-white/55 hover:text-white underline underline-offset-4 transition-colors"
          >
            {BUSINESS.email}
          </a>
        </nav>

        <p className="mt-7 text-[0.78rem] text-white/35">
          {pick(
            `© ${new Date().getFullYear()} ${BUSINESS.nameHe} · ${BUSINESS.entityHe}`,
            `© ${new Date().getFullYear()} ${BUSINESS.name} · ${BUSINESS.entityEn}`,
            `© ${new Date().getFullYear()} ${BUSINESS.name} · ${BUSINESS.entityTh}`
          )}
        </p>
      </div>
    </footer>
  );
}
