import { useT } from './i18n';
import FadeUp from './FadeUp';
import { BUSINESS, WHATSAPP_URL } from '@/config/avatars';

export default function About() {
  const { pick, fontDisplay } = useT();

  return (
    <section id="about" className="py-24 sm:py-32 px-5 bg-paper">
      <div className="max-w-[860px] mx-auto">
        <FadeUp>
          <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
            {pick('מי בונה את זה', 'Who builds this', 'ใครเป็นคนสร้าง')}
          </p>
          <h2 className={`mt-5 ${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.12] text-ink`}>
            {pick('רפאל סלע', 'Refael Sela', 'ราฟาเอล เซลา')}
          </h2>
          <p className="mt-6 text-[1.08rem] text-ink/80 leading-[1.8]">
            {pick(
              'בונה אוטומציות ובוטים לעסקים ישראליים מאז 2025. את מערך האווטארים בניתי בעצמי, מנוע-מנוע, על אותה ארכיטקטורה שהענקים מוכרים — כי האמנתי שעסק ישראלי לא צריך לשלם דולרים לדקה כדי שתהיה לו פקידה דיגיטלית שמדברת עברית.',
              "Building automations and bots for Israeli businesses since 2025. I built the avatar stack myself, engine by engine, on the same architecture the giants sell — because I believed an Israeli business shouldn't have to pay dollars per minute to have a digital receptionist that speaks Hebrew.",
              'สร้างระบบอัตโนมัติและบอทให้ธุรกิจอิสราเอลตั้งแต่ปี 2025 ผมสร้างระบบอวตารนี้ด้วยตัวเอง ทีละเอนจิน บนสถาปัตยกรรมเดียวกับที่บริษัทยักษ์ใหญ่ขาย เพราะผมเชื่อว่าธุรกิจอิสราเอลไม่ควรต้องจ่ายเป็นดอลลาร์ต่อนาที เพียงเพื่อให้มีพนักงานต้อนรับดิจิทัลที่พูดภาษาฮีบรูได้'
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.92rem] text-muted-foreground">
            <span>{pick(BUSINESS.entityHe, BUSINESS.entityEn, BUSINESS.entityTh)}</span>
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-ink transition-colors">{BUSINESS.email}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              {BUSINESS.phone}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
