import { useT } from './i18n';
import FadeUp from './FadeUp';

/** Each card closes on the money line — the reason this room needs her. */
const CASES = [
  {
    icon: '🏢',
    he: { t: 'לובי משרדים', b: 'מקבלת אורחים, מכוונת לקומה הנכונה, ומודיעה שהגעתם.', roi: 'רושם שאי אפשר לשכוח.' },
    en: { t: 'Office lobby', b: 'Greets visitors, points them to the right floor, announces their arrival.', roi: 'An impression nobody forgets.' },
    th: { t: 'ล็อบบี้สำนักงาน', b: 'ต้อนรับผู้มาเยือน บอกทางไปยังชั้นที่ถูกต้อง และแจ้งว่าคุณมาถึงแล้ว', roi: 'ความประทับใจที่ไม่มีใครลืม' },
  },
  {
    icon: '🏥',
    he: { t: 'קליניקות', b: 'מזמנת תורים מסביב לשעון, בלי להחזיק פקידה על הטלפון.', roi: 'תור שלא נקבע = כסף שהלך.' },
    en: { t: 'Clinics', b: 'Books appointments around the clock, without keeping someone on the phone.', roi: 'An appointment not booked is money gone.' },
    th: { t: 'คลินิก', b: 'นัดหมายได้ตลอดเวลา โดยไม่ต้องมีพนักงานคอยรับสาย', roi: 'นัดที่ไม่ได้จอง คือเงินที่หายไป' },
  },
  {
    icon: '🏛️',
    he: { t: 'מוזיאונים', b: 'דמות היסטורית שעונה על כל שאלה, בגובה העיניים.', roi: 'התערוכה שמדברת.' },
    en: { t: 'Museums', b: 'A historical figure that answers any question, at eye level.', roi: 'The exhibit that talks back.' },
    th: { t: 'พิพิธภัณฑ์', b: 'บุคคลในประวัติศาสตร์ที่ตอบทุกคำถามได้ ในระดับสายตา', roi: 'นิทรรศการที่พูดโต้ตอบได้' },
  },
  {
    icon: '🛍️',
    he: { t: 'אולמות תצוגה', b: 'מציגה מוצרים, עונה על שאלות ומפנה לנציג כשצריך.', roi: 'מוכרת שלא מתעייפת.' },
    en: { t: 'Showrooms', b: 'Presents products, answers questions, hands over to a rep when needed.', roi: 'A salesperson who never tires.' },
    th: { t: 'โชว์รูม', b: 'นำเสนอสินค้า ตอบคำถาม และส่งต่อให้พนักงานเมื่อจำเป็น', roi: 'พนักงานขายที่ไม่มีวันเหนื่อย' },
  },
  {
    icon: '👧',
    he: { t: 'אפליקציות חינוך', b: 'מורה בגוף מלא שרואה את הילד ומגיבה אליו בזמן אמת.', roi: 'הקסם שאין לאף מתחרה.' },
    en: { t: 'Education apps', b: 'A full-body teacher that sees the child and reacts in real time.', roi: 'Magic no competitor has.' },
    th: { t: 'แอปการศึกษา', b: 'ครูแบบเต็มตัวที่มองเห็นเด็กและตอบสนองแบบเรียลไทม์', roi: 'ความมหัศจรรย์ที่คู่แข่งไม่มี' },
  },
  {
    icon: '🎪',
    he: { t: 'כנסים ואירועים', b: 'הולוגרמה שמקבלת את האורחים בשמם.', roi: 'הדבר שכולם מצלמים.' },
    en: { t: 'Conferences & events', b: 'A hologram that greets guests by name.', roi: 'The thing everyone films.' },
    th: { t: 'งานประชุมและอีเวนต์', b: 'โฮโลแกรมที่ทักทายแขกด้วยชื่อของพวกเขา', roi: 'สิ่งที่ทุกคนหยิบมือถือขึ้นมาถ่าย' },
  },
];

export default function UseCases() {
  const { tr, pick, fontDisplay } = useT();
  return (
    <section id="uses" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink`}>
            {pick('איפה היא עומדת', 'Where she stands', 'เธอยืนอยู่ตรงไหนได้บ้าง')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => {
            const v = tr(c);
            return (
              <FadeUp key={i}>
                <div className="surface p-6 h-full flex flex-col hover:-translate-y-1 hover:border-live-a/40 transition-all duration-300">
                  <span className="text-[1.6rem] leading-none" aria-hidden>{c.icon}</span>
                  <h3 className="mt-4 text-[1.1rem] font-bold text-ink">{v.t}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground leading-[1.65] flex-1">{v.b}</p>
                  <p className="mt-4 pt-4 border-t border-ink/10 text-[0.92rem] text-live-gradient font-semibold">
                    {v.roi}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
