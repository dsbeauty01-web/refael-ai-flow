import { useState } from 'react';
import { useT } from './i18n';
import FadeUp from './FadeUp';

/**
 * Deliberately conservative maths — an inflated number here would undo the
 * credibility the rest of the page is trying to build.
 *
 *   calls/day × 30 → calls/month
 *   each handled call costs ~4 staffed minutes
 *   a receptionist at ₪8,000/month over ~180 working hours ≈ ₪44/hour ≈ ₪0.74/min
 *
 * Every assumption is printed under the slider so nobody has to trust us.
 */
const MINUTES_PER_CALL = 4;
const STAFF_COST_PER_MINUTE = 0.74;
const STATION_MONTHLY = 690;

export default function RoiCalculator() {
  const { pick, fontDisplay } = useT();
  const [callsPerDay, setCallsPerDay] = useState(20);

  const callsPerMonth = callsPerDay * 30;
  const staffCost = Math.round(callsPerMonth * MINUTES_PER_CALL * STAFF_COST_PER_MINUTE);
  const saving = staffCost - STATION_MONTHLY;
  const worthIt = saving > 0;

  const ils = (n: number) => '₪' + Math.abs(n).toLocaleString('en-US');

  return (
    <section id="roi" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.12] text-ink max-w-[760px]`}>
            {pick('כמה זה חוסך לכם בפועל?', 'What does it actually save you?', 'จริง ๆ แล้วช่วยคุณประหยัดเท่าไร')}
          </h2>
        </FadeUp>

        <FadeUp className="mt-10">
          <div className="surface p-8 sm:p-10 max-w-[860px]">
            <label htmlFor="roi-calls" className="block text-[1rem] text-ink font-semibold">
              {pick('כמה פניות אתם מקבלים ביום?', 'How many enquiries do you get a day?', 'คุณได้รับการติดต่อกี่ครั้งต่อวัน')}
            </label>

            <div className="mt-6 flex items-center gap-4">
              <input
                id="roi-calls"
                type="range"
                min={1}
                max={120}
                value={callsPerDay}
                onChange={e => setCallsPerDay(+e.target.value)}
                className="roi-slider flex-1"
                aria-valuetext={`${callsPerDay}`}
              />
              <span className="font-mono-num text-[1.6rem] text-ink w-[3.5ch] text-center">{callsPerDay}</span>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-[0.78rem] tracking-[0.12em] uppercase text-muted-foreground font-semibold">
                  {pick('עלות בכוח אדם', 'Cost in staff time', 'ต้นทุนเวลาพนักงาน')}
                </p>
                <p className="mt-2 font-mono-num text-[1.75rem] text-ink">{ils(staffCost)}</p>
              </div>
              <div>
                <p className="text-[0.78rem] tracking-[0.12em] uppercase text-muted-foreground font-semibold">
                  {pick('עמדת עסק', 'Business station', 'สถานีสำหรับธุรกิจ')}
                </p>
                <p className="mt-2 font-mono-num text-[1.75rem] text-ink">{ils(STATION_MONTHLY)}</p>
              </div>
              <div>
                <p className="text-[0.78rem] tracking-[0.12em] uppercase text-muted-foreground font-semibold">
                  {worthIt
                    ? pick('חיסכון חודשי', 'Monthly saving', 'ประหยัดต่อเดือน')
                    : pick('הפרש חודשי', 'Monthly difference', 'ส่วนต่างต่อเดือน')}
                </p>
                <p className={`mt-2 font-mono-num text-[1.75rem] ${worthIt ? 'text-live-gradient font-semibold' : 'text-muted-foreground'}`}>
                  {worthIt ? ils(saving) : '—'}
                </p>
              </div>
            </div>

            <p className="mt-8 text-[0.9rem] text-ink/75 leading-[1.7]">
              {worthIt
                ? pick(
                    `בנפח הזה מאיה מחזירה את עצמה ומשאירה לכם ${ils(saving)} בחודש.`,
                    `At this volume Maya pays for herself and leaves you ${ils(saving)} a month.`,
                    `ที่ปริมาณเท่านี้ มายาคืนทุนตัวเองและเหลือให้คุณ ${ils(saving)} ต่อเดือน`
                  )
                : pick(
                    'בנפח הזה עוד לא בטוח שזה משתלם לכם — ונגיד לכם את זה גם בשיחה. אווטאר לאתר ב-₪290 כנראה מתאים יותר.',
                    "At this volume it may not pay off yet — and we'll say so on the call. The ₪290 website avatar is probably the better fit.",
                    'ที่ปริมาณเท่านี้อาจยังไม่คุ้ม และเราจะบอกคุณตรง ๆ ตอนคุยกัน แพ็กเกจเว็บไซต์ 290 ₪ น่าจะเหมาะกว่า'
                  )}
            </p>

            <p className="mt-5 text-[0.82rem] text-muted-foreground leading-[1.7]">
              {pick(
                `ההנחות: ${MINUTES_PER_CALL} דקות עבודה לפנייה · ₪8,000 לחודש לפקידה על ~180 שעות עבודה (₪${STAFF_COST_PER_MINUTE} לדקה) · 30 ימים בחודש. זו הערכה, לא הצעת מחיר.`,
                `Assumptions: ${MINUTES_PER_CALL} staffed minutes per enquiry · ₪8,000/month receptionist over ~180 working hours (₪${STAFF_COST_PER_MINUTE}/min) · 30 days a month. An estimate, not a quote.`,
                `สมมติฐาน: ${MINUTES_PER_CALL} นาทีต่อการติดต่อหนึ่งครั้ง · พนักงานต้อนรับ 8,000 ₪ ต่อเดือน ทำงานราว 180 ชั่วโมง (${STAFF_COST_PER_MINUTE} ₪ ต่อนาที) · 30 วันต่อเดือน นี่คือการประมาณการ ไม่ใช่ใบเสนอราคา`
              )}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
