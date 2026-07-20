import { useT } from './i18n';
import FadeUp from './FadeUp';

const ITEMS = [
  {
    he: { t: 'שיחה קולית אמיתית', b: 'האווטאר שומע ועונה בקול, כמו שיחת טלפון. לא הקלדה, לא הקראת טקסט מוכן.' },
    en: { t: 'A real voice conversation', b: 'The avatar hears you and answers out loud, like a phone call. No typing, no canned text-to-speech.' },
    th: { t: 'บทสนทนาด้วยเสียงจริง', b: 'อวตารได้ยินคุณและตอบด้วยเสียง เหมือนคุยโทรศัพท์ ไม่ต้องพิมพ์ ไม่ใช่เสียงอ่านข้อความสำเร็จรูป' },
  },
  {
    he: { t: 'גוף מלא, תנועות אמיתיות', b: 'מנופף לשלום, מהנהן, מצביע לכיוון. ה-AI מחליט לבד מתי — באמצע השיחה, לפי מה שנאמר.' },
    en: { t: 'Full body, real gestures', b: 'It waves, nods, points the way. The AI decides when — mid-conversation, based on what\'s being said.' },
    th: { t: 'เต็มตัว ท่าทางสมจริง', b: 'โบกมือ พยักหน้า ชี้บอกทาง โดย AI เลือกจังหวะเองระหว่างสนทนา ตามสิ่งที่กำลังพูดคุยกัน' },
  },
  {
    he: { t: 'עברית טבעית', b: 'מדבר עברית שוטפת ומבין מבטא ישראלי. גם אנגלית, באותה נשימה.' },
    en: { t: 'Natural Hebrew', b: 'Fluent Hebrew, understands Israeli accents. English too, in the same breath.' },
    th: { t: 'ภาษาที่เป็นธรรมชาติ', b: 'พูดฮีบรูได้คล่องและเข้าใจสำเนียงอิสราเอล รวมถึงภาษาอังกฤษในบทสนทนาเดียวกัน' },
  },
  {
    he: { t: 'המחיר לא זז', b: 'המערכת רצה על שרת ייעודי שלכם. מחיר חודשי קבוע — לא לפי דקות, לא לפי משתמשים.' },
    en: { t: "The price doesn't move", b: "It runs on your own dedicated server. Flat monthly cost — not per minute, not per user." },
    th: { t: 'ราคาคงที่ ไม่ผันผวน', b: 'ระบบทำงานบนเซิร์ฟเวอร์เฉพาะของคุณ คิดค่าบริการรายเดือนแบบคงที่ ไม่คิดตามนาที ไม่คิดตามจำนวนผู้ใช้' },
  },
];

export default function WhatItIs() {
  const { tr, pick, fontDisplay } = useT();
  return (
    <section id="what" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] max-w-[720px] text-ink`}>
            {pick('לא עוד סרטון מדבר', 'Not another talking video', 'ไม่ใช่แค่วิดีโอพูดได้')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {ITEMS.map((it, i) => {
            const v = tr(it);
            return (
              <FadeUp key={i}>
                <div className="surface p-7 h-full">
                  <span className="block w-8 h-1 rounded-full bg-live-gradient" aria-hidden />
                  <h3 className="mt-4 text-[1.2rem] font-bold text-ink">{v.t}</h3>
                  <p className="mt-2.5 text-[0.98rem] text-muted-foreground leading-[1.7]">{v.b}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}