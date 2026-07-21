import { useState } from 'react';
import { useT } from './i18n';
import FadeUp from './FadeUp';

/**
 * Answers stay inside the honesty rails: the demo runs on wake-on-visit, so it
 * never claims 24/7; no uptime SLA number is quoted until a real client station
 * has run for a month.
 */
const QA = [
  {
    q: { he: 'זה יציב?', en: 'Is it stable?', th: 'ระบบเสถียรไหม' },
    a: {
      he: 'הדמו באתר רץ לפי דרישה — אנחנו מעירים אותו כשמבקשים. ללקוחות יש עמדה ייעודית עם התאוששות אוטומטית: אם משהו נופל, המסך מציג מסך המתנה מעוצב ומתאושש לבד. אף פעם לא הודעת שגיאה מול לקוח שלכם.',
      en: "The demo on this site runs on demand — we wake it when you ask. Clients get a dedicated station with automatic recovery: if something falls over, the screen shows a designed waiting state and recovers by itself. Never an error message in front of your customer.",
      th: 'การสาธิตบนเว็บนี้ทำงานตามคำขอ เราจะปลุกระบบเมื่อคุณกดขอ ส่วนลูกค้าจะได้สถานีเฉพาะที่กู้คืนอัตโนมัติ หากมีอะไรล่ม หน้าจอจะแสดงสถานะรอที่ออกแบบไว้และกลับมาเองได้ ไม่มีข้อความแสดงข้อผิดพลาดต่อหน้าลูกค้าของคุณ',
    },
  },
  {
    q: { he: 'מה עם פרטיות?', en: 'What about privacy?', th: 'เรื่องความเป็นส่วนตัวล่ะ' },
    a: {
      he: 'בניגוד לספקים זרים, השיחות רצות על תשתית ייעודית. הידע שלכם לא מאמן אף מודל. למוסדות — אפשרות התקנה מלאה אצלכם (on-prem).',
      en: 'Unlike foreign vendors, conversations run on dedicated infrastructure. Your knowledge never trains anyone\'s model. For institutions, a full on-premise installation is possible.',
      th: 'ต่างจากผู้ให้บริการต่างประเทศ บทสนทนาทำงานบนโครงสร้างพื้นฐานเฉพาะ ความรู้ของคุณไม่ถูกใช้ฝึกโมเดลใด ๆ สำหรับหน่วยงาน สามารถติดตั้งภายในองค์กรได้เต็มรูปแบบ',
    },
  },
  {
    q: { he: 'העברית באמת טובה?', en: 'Is the Hebrew actually good?', th: 'ภาษาฮีบรูดีจริงไหม' },
    a: {
      he: 'קול-לקול אמיתי, לא הקראת טקסט. אפשר להתפרץ לה באמצע משפט והיא עוצרת ומקשיבה — בדיוק כמו בן אדם. אל תאמינו לנו: לחצו על "שמעו אותה מדברת" למעלה.',
      en: 'True voice-to-voice, not text being read aloud. You can interrupt her mid-sentence and she stops and listens — exactly like a person. Don\'t take our word for it: press "Hear her speak" at the top.',
      th: 'สนทนาด้วยเสียงจริง ไม่ใช่การอ่านข้อความ คุณพูดแทรกกลางประโยคได้ และเธอจะหยุดฟัง เหมือนคนจริง ๆ ไม่ต้องเชื่อเรา กดปุ่ม "ฟังเธอพูด" ด้านบนได้เลย',
    },
  },
  {
    q: { he: 'למה לא פשוט HeyGen?', en: 'Why not just use HeyGen?', th: 'ทำไมไม่ใช้ HeyGen ไปเลย' },
    a: {
      he: 'כי שם תשלמו לפי דקה לנצח, ותקבלו חצי גוף. מסך שרץ כל היום בלובי הופך תמחור לפי דקה לחשבון בלתי אפשרי — ואי אפשר להראות דמות שמצביעה על הדלת אם רואים אותה רק מהחזה ומעלה.',
      en: 'Because there you pay per minute forever, and you get chest-up. A screen running all day in a lobby turns per-minute pricing into an impossible bill — and you cannot show a figure pointing at the door if she is only visible from the chest up.',
      th: 'เพราะที่นั่นคุณจ่ายตามนาทีไปตลอด และได้เห็นแค่ครึ่งตัว จอที่เปิดทั้งวันในล็อบบี้ทำให้การคิดเงินตามนาทีกลายเป็นบิลที่เป็นไปไม่ได้ และคุณไม่สามารถแสดงตัวละครที่ชี้ไปยังประตูได้ หากมองเห็นเพียงครึ่งตัว',
    },
  },
  {
    q: { he: 'מה קורה אם תיעלמו מחר?', en: 'What if you disappear tomorrow?', th: 'ถ้าพรุ่งนี้คุณหายไปล่ะ' },
    a: {
      he: 'המנועים שאנחנו מריצים הם קוד פתוח, והנכסים שלכם — הדמות, הידע, ההקלטות — עוברים אליכם. אין נעילה לספק.',
      en: 'The engines we run are open source, and your assets — the character, the knowledge, the recordings — transfer to you. There is no vendor lock-in.',
      th: 'เอนจินที่เราใช้เป็นโอเพนซอร์ส และทรัพย์สินของคุณ ทั้งตัวละคร ฐานความรู้ และไฟล์บันทึก จะโอนให้คุณ ไม่มีการผูกมัดกับผู้ให้บริการ',
    },
  },
  {
    q: { he: 'כמה זמן לוקחת ההקמה?', en: 'How long does setup take?', th: 'ติดตั้งใช้เวลานานแค่ไหน' },
    a: {
      he: 'אווטאר לאתר: עד שבוע. עמדת עסק: 2–3 שבועות. התקנה פיזית: לפי הפרויקט והחומרה.',
      en: 'Website avatar: up to a week. Business station: 2–3 weeks. Physical installation: depends on the project and the hardware.',
      th: 'อวตารสำหรับเว็บไซต์: ไม่เกินหนึ่งสัปดาห์ สถานีสำหรับธุรกิจ: 2–3 สัปดาห์ การติดตั้งหน้างานจริง: ขึ้นอยู่กับโปรเจกต์และอุปกรณ์',
    },
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Faq() {
  const { pick, fontDisplay } = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[860px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink`}>
            {pick('שאלות שנשאלות באמת', 'Questions people actually ask', 'คำถามที่คนถามจริง ๆ')}
          </h2>
        </FadeUp>

        <div className="mt-12 flex flex-col gap-3">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={i}>
                <div className="surface overflow-hidden">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="w-full flex items-center justify-between gap-4 p-6 text-start hover:bg-ink/[0.03] transition-colors"
                    >
                      <span className="text-[1.05rem] font-semibold text-ink">
                        {pick(item.q.he, item.q.en, item.q.th)}
                      </span>
                      <span className="text-muted-foreground"><Chevron open={isOpen} /></span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!isOpen}
                    className="px-6 pb-6 -mt-1"
                  >
                    <p className="text-[0.98rem] text-ink/75 leading-[1.75]">
                      {pick(item.a.he, item.a.en, item.a.th)}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
