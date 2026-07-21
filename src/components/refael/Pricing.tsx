import { useT } from './i18n';
import FadeUp from './FadeUp';
import { WHATSAPP_URL } from '@/config/avatars';

/**
 * Three products, not one avatar. The middle tier is the one meant to sell —
 * it carries the salary comparison, which is the only number on this page a
 * business owner already has an opinion about.
 */
type Tier = {
  key: string;
  badge?: { he: string; en: string; th: string };
  title: { he: string; en: string; th: string };
  setup: string;
  monthly: string;
  pitch: { he: string; en: string; th: string };
  bullets: { he: string[]; en: string[]; th: string[] };
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    key: 'web',
    title: { he: 'אווטאר לאתר', en: 'Website avatar', th: 'อวตารสำหรับเว็บไซต์' },
    setup: '₪2,900',
    monthly: '₪290',
    pitch: {
      he: 'הדמות שלכם חיה באתר ומדברת עם כל מי שנכנס.',
      en: 'Your character, live on your site, talking to everyone who lands.',
      th: 'ตัวละครของคุณ ทำงานสดบนเว็บไซต์ และพูดคุยกับทุกคนที่เข้ามา',
    },
    bullets: {
      he: [
        'דמות מותאמת — מתמונה אחת',
        'שיחה קולית בעברית באתר שלכם',
        'ידע העסק (עד 20 עמודים)',
        'עד 300 דקות שיחה בחודש',
        'עדכוני ידע רבעוניים',
      ],
      en: [
        'Custom character — from a single photo',
        'Hebrew voice conversation on your site',
        'Your business knowledge (up to 20 pages)',
        'Up to 300 conversation minutes / month',
        'Quarterly knowledge updates',
      ],
      th: [
        'ตัวละครเฉพาะของคุณ จากรูปเพียงรูปเดียว',
        'สนทนาด้วยเสียงภาษาฮีบรูบนเว็บไซต์ของคุณ',
        'ฐานความรู้ธุรกิจของคุณ (สูงสุด 20 หน้า)',
        'สนทนาได้สูงสุด 300 นาทีต่อเดือน',
        'อัปเดตฐานความรู้ทุกไตรมาส',
      ],
    },
  },
  {
    key: 'business',
    badge: { he: 'הכי משתלם', en: 'Best value', th: 'คุ้มค่าที่สุด' },
    title: { he: 'עמדת עסק', en: 'Business station', th: 'สถานีสำหรับธุรกิจ' },
    setup: '₪6,900',
    monthly: '₪690',
    pitch: {
      he: 'לא רק עונה — מבצעת. מזמנת פגישות ביומן האמיתי שלכם.',
      en: "Not just answering — acting. She books real meetings in your real calendar.",
      th: 'ไม่ใช่แค่ตอบ แต่ลงมือทำ เธอนัดหมายลงในปฏิทินจริงของคุณ',
    },
    bullets: {
      he: [
        'כל מה שיש באווטאר לאתר, ובנוסף:',
        'ידיים — זימון פגישות אמיתי (יומן + מייל + רישום)',
        'חיבורי n8n: CRM, וואטסאפ, גיליונות',
        'בנק מחוות מותאם לעסק',
        'אנליטיקס שיחות חודשי',
        'עד 1,000 דקות בחודש',
      ],
      en: [
        'Everything in the website avatar, plus:',
        'Hands — real booking (calendar + email + records)',
        'n8n connections: CRM, WhatsApp, Sheets',
        'A gesture bank tailored to your business',
        'Monthly conversation analytics',
        'Up to 1,000 minutes / month',
      ],
      th: [
        'ทุกอย่างในแพ็กเกจเว็บไซต์ และเพิ่มเติม:',
        'มือที่ลงมือทำ นัดหมายจริง (ปฏิทิน + อีเมล + บันทึก)',
        'เชื่อมต่อ n8n: CRM, WhatsApp, Sheets',
        'คลังท่าทางที่ออกแบบเฉพาะธุรกิจของคุณ',
        'รายงานวิเคราะห์บทสนทนารายเดือน',
        'สูงสุด 1,000 นาทีต่อเดือน',
      ],
    },
    featured: true,
  },
  {
    key: 'physical',
    title: { he: 'התקנה פיזית', en: 'Physical installation', th: 'การติดตั้งหน้างานจริง' },
    setup: '₪14,900',
    monthly: '₪990',
    pitch: {
      he: 'מסך בגודל מלא בלובי, במוזיאון או באולם התצוגה.',
      en: 'A full-size screen standing in your lobby, museum or showroom.',
      th: 'จอขนาดเท่าคนจริง ตั้งอยู่ในล็อบบี้ พิพิธภัณฑ์ หรือโชว์รูมของคุณ',
    },
    bullets: {
      he: [
        'מסך או הולוגרמה בגודל מלא',
        'דמות בהתאמה מלאה — כולל דמויות היסטוריות',
        'כיול מחוות למרחב (מצביעה על הדלת האמיתית)',
        'אינטגרציה עם חומרת התצוגה',
        'SLA ותמיכה',
      ],
      en: [
        'Full-size screen or hologram',
        'Fully bespoke character — historical figures included',
        'Gestures calibrated to the room (she points at the real door)',
        'Integration with your display hardware',
        'SLA and support',
      ],
      th: [
        'จอหรือโฮโลแกรมขนาดเท่าคนจริง',
        'ตัวละครออกแบบเฉพาะ รวมถึงบุคคลในประวัติศาสตร์',
        'ปรับท่าทางให้เข้ากับพื้นที่จริง (ชี้ไปที่ประตูจริง)',
        'เชื่อมต่อกับอุปกรณ์แสดงผลของคุณ',
        'SLA และการสนับสนุน',
      ],
    },
  },
];

export default function Pricing() {
  const { pick, tr, fontDisplay } = useT();

  return (
    <section id="pricing" className="py-24 sm:py-32 px-5 bg-paper">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] max-w-[820px] text-ink`}>
            {pick('שלושה מוצרים. מחיר אחד לכל אחד.', 'Three products. One price each.', 'สามผลิตภัณฑ์ ราคาชัดเจนของแต่ละแบบ')}
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[640px] leading-[1.7]">
            {pick(
              'הקמה חד-פעמית ומנוי חודשי קבוע. בלי מונה, בלי תשלום לפי דקה, בלי הפתעות בסוף החודש.',
              'A one-time setup and a flat monthly fee. No meter, no per-minute billing, no surprise at the end of the month.',
              'ค่าติดตั้งครั้งเดียวและค่าบริการรายเดือนคงที่ ไม่มีมิเตอร์ ไม่คิดตามนาที ไม่มีบิลเซอร์ไพรส์ปลายเดือน'
            )}
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 items-start">
          {TIERS.map(t => (
            <FadeUp key={t.key}>
              <div
                className={`surface h-full flex flex-col p-8 relative ${
                  t.featured ? 'border-live-gradient lg:-mt-4 lg:pb-10' : ''
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 start-8 bg-live-gradient text-white text-[0.7rem] font-bold tracking-wide px-3 py-1 rounded-full">
                    {pick(t.badge.he, t.badge.en, t.badge.th)}
                  </span>
                )}

                <p className="text-[0.8rem] tracking-[0.14em] uppercase text-muted-foreground font-semibold">
                  {pick(t.title.he, t.title.en, t.title.th)}
                </p>

                <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                  <span className="font-mono-num text-[clamp(2rem,4vw,2.75rem)] text-ink leading-none">{t.setup}</span>
                  <span className="text-[0.9rem] text-muted-foreground">
                    {pick('הקמה', 'setup', 'ค่าติดตั้ง')}
                  </span>
                </div>
                <p className="mt-2 text-[1rem] text-ink/80">
                  <span className="font-mono-num text-live-gradient font-semibold">{t.monthly}</span>{' '}
                  <span className="text-muted-foreground text-[0.92rem]">{pick('לחודש', 'per month', 'ต่อเดือน')}</span>
                </p>

                <p className="mt-5 text-[0.95rem] text-ink/75 leading-[1.65]">
                  {pick(t.pitch.he, t.pitch.en, t.pitch.th)}
                </p>

                <ul className="mt-6 space-y-3 text-[0.92rem] text-ink/75 flex-1">
                  {tr(t.bullets).map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-[0.5rem] w-1.5 h-1.5 rounded-full bg-live-gradient flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {t.featured && (
                  <div className="mt-7 rounded-2xl bg-live-a/10 border border-live-a/25 p-4">
                    <p className="text-[0.9rem] text-ink leading-[1.65]">
                      {pick(
                        'פקידת קבלה עולה ₪7,000–9,000 בחודש. מאיה עולה ₪690 — והיא לא חולה, לא מתעייפת, ועונה גם ב-23:00.',
                        'A receptionist costs ₪7,000–9,000 a month. Maya costs ₪690 — and she never calls in sick, never tires, and still answers at 11pm.',
                        'พนักงานต้อนรับมีค่าใช้จ่าย 7,000–9,000 ₪ ต่อเดือน ส่วนมายาอยู่ที่ 690 ₪ และเธอไม่ลาป่วย ไม่เหนื่อย และยังตอบตอนห้าทุ่ม'
                      )}
                    </p>
                  </div>
                )}

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex justify-center rounded-full px-6 py-3 text-[0.92rem] font-semibold transition ${
                    t.featured
                      ? 'bg-live-gradient text-white hover:brightness-110'
                      : 'border border-ink/20 text-ink hover:bg-ink/5'
                  }`}
                >
                  {pick('לדבר על זה', "Let's talk", 'คุยกันก่อน')}
                </a>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-8">
          <p className="text-[0.88rem] text-muted-foreground max-w-[760px] leading-[1.7]">
            {pick(
              'המכסות החודשיות מגנות על שני הצדדים — עמדה שנעשית ויראלית לא אמורה להפיל אתכם בחשבון. חריגה: ₪0.5 לדקה. התקנה פיזית מתומחרת לפי פרויקט, החל מהמחיר שלמעלה.',
              'The monthly caps protect both sides — a kiosk that goes viral should not blow up your bill. Overage: ₪0.5/minute. Physical installations are quoted per project, starting from the price above.',
              'โควตารายเดือนคุ้มครองทั้งสองฝ่าย จุดบริการที่คนแห่มาใช้ไม่ควรทำให้บิลของคุณพุ่ง ส่วนเกิน: 0.5 ₪ ต่อนาที การติดตั้งหน้างานจริงคิดราคาตามโปรเจกต์ โดยเริ่มต้นจากราคาข้างต้น'
            )}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
