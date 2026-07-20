import { useT } from './i18n';
import FadeUp from './FadeUp';

export default function Pricing() {
  const { isHebrew, pick, fontDisplay } = useT();

  const cards = [
    {
      title: pick('הקמת אווטאר', 'Avatar setup', 'ค่าติดตั้งอวตาร'),
      price: '₪9,500',
      period: pick('חד-פעמי', 'one-time', 'ครั้งเดียว'),
      bullets: pick(
        [
          'עיצוב הדמות או דיגיטציה של דמות קיימת',
          'בניית אישיות וידע',
          'בנק תנועות מותאם',
          'התקנה ופריסה מלאה',
        ],
        [
          'Character design or digitizing an existing figure',
          'Personality & knowledge build',
          'Custom gesture bank',
          'Full deployment',
        ],
        [
          'ออกแบบตัวละคร หรือแปลงบุคคลที่มีอยู่ให้เป็นดิจิทัล',
          'สร้างบุคลิกและฐานความรู้',
          'คลังท่าทางเฉพาะของคุณ',
          'ติดตั้งและใช้งานจริงครบวงจร',
        ]
      ),
    },
    {
      title: pick('מנוי חודשי', 'Monthly', 'ค่าบริการรายเดือน'),
      price: '₪1,490',
      period: pick('לחודש', 'per month', 'ต่อเดือน'),
      bullets: pick(
        [
          'שרת GPU ייעודי',
          'ניטור ותחזוקה',
          'עדכוני ידע ושיפורים שוטפים',
        ],
        [
          'Dedicated GPU server',
          'Monitoring & upkeep',
          'Ongoing knowledge updates & improvements',
        ],
        [
          'เซิร์ฟเวอร์ GPU เฉพาะของคุณ',
          'เฝ้าระวังระบบและดูแลรักษา',
          'อัปเดตฐานความรู้และพัฒนาต่อเนื่อง',
        ]
      ),
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 px-5 bg-paper">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] max-w-[820px] text-ink`}>
            {pick('הקמה חד-פעמית. מנוי חודשי. זהו.', 'One setup fee. One monthly fee. That\'s it.', 'จ่ายค่าติดตั้งครั้งเดียว แล้วจ่ายรายเดือน เท่านั้น')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-[900px]">
          {cards.map((c, i) => (
            <FadeUp key={i}>
              <div className={`surface p-8 h-full flex flex-col ${i === 1 ? 'border-live-gradient' : ''}`}>
                <p className="text-[0.8rem] tracking-[0.14em] uppercase text-muted-foreground font-semibold">{c.title}</p>
                <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono-num text-[clamp(2.25rem,5vw,3.25rem)] text-ink leading-none">{c.price}</span>
                  <span className="text-[0.95rem] text-muted-foreground">{c.period}</span>
                </div>
                <ul className="mt-8 space-y-3 text-[0.95rem] text-ink/80">
                  {c.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-live-gradient flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-8">
          <p className="text-[0.9rem] text-muted-foreground max-w-[720px]">
            {pick(
              'לשם השוואה: פתרון Enterprise מקביל בחו״ל מתחיל בכ-$2,000 לחודש — עוד לפני ההקמה.',
              'For scale: a comparable enterprise solution abroad starts around $2,000/month — before setup.',
              'เทียบให้เห็นภาพ: โซลูชันระดับองค์กรที่ใกล้เคียงกันในต่างประเทศเริ่มต้นราว 2,000 ดอลลาร์ต่อเดือน ยังไม่รวมค่าติดตั้ง'
            )}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}