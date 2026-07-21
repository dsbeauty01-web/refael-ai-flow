import { useT } from './i18n';
import FadeUp from './FadeUp';

/**
 * Claims here are about product SHAPE (framing, pricing model, where data
 * lives) rather than quality, because shape is checkable on the competitors'
 * own pricing pages — and a claim a prospect can verify in 30 seconds is the
 * only kind worth putting in a comparison table.
 */
type Cell = { v: 'yes' | 'no' | 'part'; label?: { he: string; en: string; th: string } };

type Row = {
  feature: { he: string; en: string; th: string };
  api: Cell;
  enterprise: Cell;
  us: Cell;
};

const ROWS: Row[] = [
  {
    feature: { he: 'גוף מלא + מחוות', en: 'Full body + gestures', th: 'เต็มตัวพร้อมท่าทาง' },
    api: { v: 'no', label: { he: 'חזה ומעלה', en: 'Chest-up', th: 'ครึ่งตัว' } },
    enterprise: { v: 'yes' },
    us: { v: 'yes' },
  },
  {
    feature: { he: 'עברית קול-לקול חיה', en: 'Live Hebrew voice-to-voice', th: 'สนทนาเสียงภาษาฮีบรูแบบสด' },
    api: { v: 'no' },
    enterprise: { v: 'no', label: { he: 'הקראת טקסט', en: 'Text-to-speech', th: 'อ่านข้อความ' } },
    us: { v: 'yes' },
  },
  {
    feature: { he: 'תמחור', en: 'Pricing', th: 'การคิดราคา' },
    api: { v: 'no', label: { he: 'לפי דקה, לנצח', en: 'Per minute, forever', th: 'ตามนาที ตลอดไป' } },
    enterprise: { v: 'no', label: { he: 'עשרות אלפי ₪ + חוזה', en: 'Tens of thousands + contract', th: 'หลักหมื่น ₪ พร้อมสัญญา' } },
    us: { v: 'yes', label: { he: 'חד-פעמי + מנוי קבוע', en: 'One-time + flat monthly', th: 'จ่ายครั้งเดียว + รายเดือนคงที่' } },
  },
  {
    feature: { he: 'איפה הנתונים שלכם', en: 'Where your data lives', th: 'ข้อมูลของคุณอยู่ที่ไหน' },
    api: { v: 'no', label: { he: 'בענן שלהם', en: 'Their cloud', th: 'คลาวด์ของเขา' } },
    enterprise: { v: 'no', label: { he: 'בענן שלהם', en: 'Their cloud', th: 'คลาวด์ของเขา' } },
    us: { v: 'yes', label: { he: 'בתשתית ייעודית לכם', en: 'Infrastructure dedicated to you', th: 'โครงสร้างพื้นฐานเฉพาะของคุณ' } },
  },
  {
    feature: { he: 'מבצעת פעולות (יומן/מייל/CRM)', en: 'Takes actions (calendar/email/CRM)', th: 'ลงมือทำได้ (ปฏิทิน/อีเมล/CRM)' },
    api: { v: 'no' },
    enterprise: { v: 'part', label: { he: 'חלקי', en: 'Partial', th: 'บางส่วน' } },
    us: { v: 'yes', label: { he: 'n8n מלא', en: 'Full n8n', th: 'n8n เต็มรูปแบบ' } },
  },
  {
    feature: { he: 'זמן הקמה', en: 'Time to launch', th: 'ระยะเวลาติดตั้ง' },
    api: { v: 'part', label: { he: '—', en: '—', th: '—' } },
    enterprise: { v: 'no', label: { he: 'חודשים', en: 'Months', th: 'หลายเดือน' } },
    us: { v: 'yes', label: { he: 'ימים', en: 'Days', th: 'ไม่กี่วัน' } },
  },
];

function Mark({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  const { pick } = useT();
  const icon = cell.v === 'yes' ? '✓' : cell.v === 'no' ? '✕' : '~';
  const tone =
    cell.v === 'yes'
      ? highlight
        ? 'text-live-a'
        : 'text-ink/70'
      : cell.v === 'no'
        ? 'text-offline'
        : 'text-offline';

  return (
    <span className="inline-flex flex-col gap-1">
      <span className={`text-[1.05rem] font-bold ${tone}`} aria-hidden>{icon}</span>
      {cell.label && (
        <span className={`text-[0.85rem] ${highlight ? 'text-ink' : 'text-muted-foreground'}`}>
          {pick(cell.label.he, cell.label.en, cell.label.th)}
        </span>
      )}
      <span className="sr-only">
        {cell.v === 'yes' ? pick('כן', 'yes', 'ใช่') : cell.v === 'no' ? pick('לא', 'no', 'ไม่') : pick('חלקי', 'partial', 'บางส่วน')}
      </span>
    </span>
  );
}

export default function Comparison() {
  const { pick, fontDisplay } = useT();

  const heads = [
    { he: '', en: '', th: '' },
    { he: 'ספקי API\nHeyGen / D-ID', en: 'API vendors\nHeyGen / D-ID', th: 'ผู้ให้บริการ API\nHeyGen / D-ID' },
    { he: 'Enterprise\nDeepBrain', en: 'Enterprise\nDeepBrain', th: 'ระดับองค์กร\nDeepBrain' },
    { he: 'Refael.ai', en: 'Refael.ai', th: 'Refael.ai' },
  ];

  return (
    <section id="difference" className="py-24 sm:py-32 px-5 bg-paper">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] max-w-[820px] text-ink`}>
            {pick('אותה ארכיטקטורה. בלי המונה.', 'The same architecture. Without the meter.', 'สถาปัตยกรรมเดียวกัน แต่ไม่มีมิเตอร์')}
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[700px] leading-[1.7]">
            {pick(
              'החברות הגדולות מוכרות אווטארים בתשלום לפי דקה, חצי גוף, בלי עברית אמיתית. בנינו את אותה ארכיטקטורה — על תשתית משלנו, בקוד פתוח, בעברית. אתם משלמים על מוצר, לא על כל דקת שיחה.',
              'The big vendors sell avatars billed per minute, chest-up, without real Hebrew. We built the same architecture — on our own infrastructure, open source, in Hebrew. You pay for a product, not for every minute of conversation.',
              'ผู้ให้บริการรายใหญ่ขายอวตารแบบคิดเงินตามนาที เห็นแค่ครึ่งตัว และไม่มีภาษาฮีบรูที่แท้จริง เราสร้างสถาปัตยกรรมเดียวกัน บนโครงสร้างพื้นฐานของเราเอง ด้วยโอเพนซอร์ส และเป็นภาษาฮีบรู คุณจ่ายค่าผลิตภัณฑ์ ไม่ใช่ค่าทุกนาทีที่สนทนา'
            )}
          </p>
        </FadeUp>

        {/* Desktop table */}
        <FadeUp className="mt-14">
          <div className="hidden md:block surface overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-ink/10">
                  {heads.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={`p-5 text-start align-bottom text-[0.9rem] font-semibold whitespace-pre-line ${
                        i === 3 ? 'text-live-gradient' : 'text-muted-foreground'
                      }`}
                    >
                      {pick(h.he, h.en, h.th)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-ink/8 last:border-0">
                    <th scope="row" className="p-5 text-start align-top text-[0.95rem] font-semibold text-ink w-[26%]">
                      {pick(row.feature.he, row.feature.en, row.feature.th)}
                    </th>
                    <td className="p-5 align-top"><Mark cell={row.api} /></td>
                    <td className="p-5 align-top"><Mark cell={row.enterprise} /></td>
                    <td className="p-5 align-top bg-live-a/[0.06]"><Mark cell={row.us} highlight /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Mobile: one card per feature, so nothing scrolls sideways */}
        <div className="md:hidden mt-10 flex flex-col gap-4">
          {ROWS.map((row, i) => (
            <FadeUp key={i}>
              <div className="surface p-5">
                <p className="text-[0.95rem] font-semibold text-ink">
                  {pick(row.feature.he, row.feature.en, row.feature.th)}
                </p>
                <dl className="mt-4 space-y-2.5 text-[0.9rem]">
                  {([
                    [pick('ספקי API', 'API vendors', 'ผู้ให้บริการ API'), row.api, false],
                    [pick('Enterprise', 'Enterprise', 'ระดับองค์กร'), row.enterprise, false],
                    ['Refael.ai', row.us, true],
                  ] as const).map(([label, cell, hi], j) => (
                    <div key={j} className={`flex items-start justify-between gap-4 ${hi ? 'pt-2.5 border-t border-ink/10' : ''}`}>
                      <dt className={hi ? 'text-live-gradient font-semibold' : 'text-muted-foreground'}>{label}</dt>
                      <dd className="text-end"><Mark cell={cell} highlight={hi} /></dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-8">
          <p className="text-[0.82rem] text-muted-foreground max-w-[760px] leading-[1.7]">
            {pick(
              'ההשוואה מתייחסת למוצרי המדף הפומביים של אותם ספקים נכון ליולי 2026. ספקים משנים מוצר ומחיר — בדקו גם בעצמכם.',
              "The comparison refers to those vendors' public off-the-shelf products as of July 2026. Vendors change products and prices — check for yourself too.",
              'การเปรียบเทียบนี้อ้างอิงผลิตภัณฑ์สำเร็จรูปที่เปิดเผยต่อสาธารณะของผู้ให้บริการเหล่านั้น ณ เดือนกรกฎาคม 2026 ผู้ให้บริการมีการเปลี่ยนแปลงผลิตภัณฑ์และราคา ควรตรวจสอบด้วยตนเองด้วย'
            )}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
