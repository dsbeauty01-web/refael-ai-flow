import { useT } from './i18n';
import FadeUp from './FadeUp';

export default function TechTrust() {
  const { pick, tr, fontDisplay } = useT();

  const points = [
    {
      he: { t: 'קוד פתוח', b: 'שקיפות מלאה, בלי תלות בספק זר ובלי מונה.' },
      en: { t: 'Open source', b: 'Full transparency, no dependence on a foreign vendor, no meter.' },
      th: { t: 'โอเพนซอร์ส', b: 'โปร่งใสเต็มที่ ไม่ต้องพึ่งผู้ให้บริการต่างชาติ และไม่มีมิเตอร์' },
    },
    {
      he: { t: 'שרתי GPU ייעודיים', b: 'המכונה עובדת בשבילכם בלבד — לא תור משותף.' },
      en: { t: 'Dedicated GPU servers', b: 'The machine works for you alone — not a shared queue.' },
      th: { t: 'เซิร์ฟเวอร์ GPU เฉพาะ', b: 'เครื่องทำงานให้คุณเท่านั้น ไม่ใช่คิวที่ใช้ร่วมกัน' },
    },
    {
      he: { t: 'מתעדכן כל חודש', b: 'כשיוצא מנוע טוב יותר — הלקוחות שלנו מקבלים אותו ראשונים.' },
      en: { t: 'Updated monthly', b: 'When a better engine ships, our clients get it first.' },
      th: { t: 'อัปเดตทุกเดือน', b: 'เมื่อมีเอนจินที่ดีกว่าออกมา ลูกค้าของเราได้ใช้ก่อนใคร' },
    },
  ];

  return (
    <section id="tech" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2rem,4.5vw,3rem)] leading-[1.12] text-ink max-w-[720px]`}>
            {pick('מה יש מתחת למכסה', "What's under the hood", 'ภายใต้ฝากระโปรงมีอะไร')}
          </h2>
          <p className="mt-6 text-[1.05rem] text-ink/80 leading-[1.8] max-w-[760px]">
            {pick(
              'אנחנו מריצים את המנועים הפתוחים המתקדמים בעולם — אותה משפחת טכנולוגיה שמאחורי המעבדות הגדולות — על שרתי GPU ייעודיים.',
              'We run the most advanced open engines available — the same family of technology behind the big labs — on dedicated GPU servers.',
              'เราใช้เอนจินโอเพนซอร์สที่ก้าวหน้าที่สุดเท่าที่มี ซึ่งเป็นเทคโนโลยีตระกูลเดียวกับที่อยู่เบื้องหลังห้องแล็บใหญ่ ๆ บนเซิร์ฟเวอร์ GPU เฉพาะ'
            )}
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {points.map((p, i) => {
            const v = tr(p);
            return (
              <FadeUp key={i}>
                <div className="surface p-7 h-full">
                  <span className="block w-8 h-1 rounded-full bg-live-gradient" aria-hidden />
                  <h3 className="mt-4 text-[1.1rem] font-bold text-ink">{v.t}</h3>
                  <p className="mt-2.5 text-[0.95rem] text-muted-foreground leading-[1.7]">{v.b}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
