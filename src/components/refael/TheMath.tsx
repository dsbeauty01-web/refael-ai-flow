import { useT } from './i18n';
import FadeUp from './FadeUp';

const ROWS = [
  {
    label: 'HeyGen / Tavus / Anam',
    he: ['חצי גוף בלבד', 'תשלום לפי דקות', '$30–90 למשתמש בחודש'],
    en: ['Chest-up only', 'Per-minute billing', '$30–90 per user / month'],
    highlight: false,
  },
  {
    label: 'DeepBrain / UneeQ',
    he: ['גוף מלא, אבל הקראת טקסט בלבד', 'מכירה ארגונית', '$2,000–5,000 בחודש'],
    en: ['Full body, but text-to-speech only', 'Enterprise sales cycle', '$2,000–5,000 / month'],
    highlight: false,
  },
  {
    label: 'Refael.ai',
    he: ['גוף מלא', 'קול-מול-קול אמיתי', 'מחיר חודשי קבוע'],
    en: ['Full body', 'True voice-to-voice', 'Flat monthly cost'],
    highlight: true,
  },
];

export default function TheMath() {
  const { isHebrew, pick } = useT();
  return (
    <section id="pricing-context" className="py-24 sm:py-32 px-5 bg-ink text-white">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] max-w-[800px]`}>
            {pick('אותה טכנולוגיה. סדר גודל אחר של מחיר.', 'Same technology. A different order of magnitude.')}
          </h2>
        </FadeUp>

        <FadeUp className="mt-14">
          {/* Desktop table */}
          <div className="hidden md:block surface-dark overflow-hidden">
            <table className="w-full">
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className={`border-b border-white/8 last:border-0 ${row.highlight ? 'bg-white/[0.06]' : ''}`}>
                    <td className="p-6 align-top w-[28%] font-semibold text-[1rem]">
                      {row.highlight ? <span className="text-live-gradient">{row.label}</span> : row.label}
                    </td>
                    {(isHebrew ? row.he : row.en).map((cell, i) => (
                      <td key={i} className={`p-6 align-top text-[0.95rem] ${i === 2 ? 'font-mono-num text-white' : 'text-white/60'} ${row.highlight && i === 2 ? 'text-live-gradient font-semibold' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-4">
            {ROWS.map((row) => (
              <div key={row.label} className={`surface-dark p-5 ${row.highlight ? 'border-live-gradient' : ''}`}>
                <p className="font-semibold text-[1rem]">
                  {row.highlight ? <span className="text-live-gradient">{row.label}</span> : row.label}
                </p>
                <ul className="mt-3 space-y-2 text-[0.95rem]">
                  {(isHebrew ? row.he : row.en).map((cell, i) => (
                    <li
                      key={i}
                      className={`${i === 2 ? 'font-mono-num text-white' : 'text-white/60'} ${row.highlight && i === 2 ? 'text-live-gradient font-semibold' : ''}`}
                    >
                      {cell}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="mt-10">
          <p className="text-[1rem] text-white/60 max-w-[720px] leading-[1.7]">
            {pick(
              'נכון להיום, אף אחד בישראל לא מריץ שיחה קולית אמיתית מתחת לאווטאר בגוף מלא. אנחנו כן — ובמחיר קבוע.',
              'Right now, nobody in Israel runs a true voice conversation under a full-body avatar. We do — at a flat cost.'
            )}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
