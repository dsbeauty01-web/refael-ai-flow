import { useT } from './i18n';
import FadeUp from './FadeUp';

const STEPS = [
  {
    n: '01',
    title: { he: 'בוחרים דמות', en: 'Pick a character', th: 'เลือกตัวละคร' },
    body: {
      he: 'מתמונה אחת. כל מראה, כל לבוש, כל שפה. בלי צילומים ובלי אולפן.',
      en: 'From a single photo. Any look, any outfit, any language. No shoot, no studio.',
      th: 'จากรูปเพียงรูปเดียว ทุกรูปลักษณ์ ทุกการแต่งกาย ทุกภาษา ไม่ต้องถ่ายทำ ไม่ต้องมีสตูดิโอ',
    },
  },
  {
    n: '02',
    title: { he: 'מלבישים לה מוח', en: 'Give her a mind', th: 'ใส่สมองให้เธอ' },
    body: {
      he: 'הידע שלכם, האישיות שלכם, החוקים שלכם. היא יודעת רק מה שאישרתם.',
      en: 'Your knowledge, your personality, your rules. She knows only what you approved.',
      th: 'ความรู้ของคุณ บุคลิกของคุณ กฎของคุณ เธอรู้เฉพาะสิ่งที่คุณอนุมัติเท่านั้น',
    },
  },
  {
    n: '03',
    title: { he: 'מחברים ידיים', en: 'Connect her hands', th: 'ต่อมือให้เธอ' },
    body: {
      he: 'יומן, מייל, CRM, וואטסאפ. היא לא רק עונה — היא מבצעת.',
      en: "Calendar, email, CRM, WhatsApp. She doesn't just answer — she acts.",
      th: 'ปฏิทิน อีเมล CRM WhatsApp เธอไม่ได้แค่ตอบ แต่ลงมือทำจริง',
    },
  },
];

export default function HowItWorks() {
  const { pick, fontDisplay } = useT();

  return (
    <section id="how" className="py-24 sm:py-32 px-5 bg-paper">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink max-w-[760px]`}>
            {pick('שלושה שלבים, לא פרויקט של שנה.', 'Three steps, not a year-long project.', 'สามขั้นตอน ไม่ใช่โปรเจกต์ข้ามปี')}
          </h2>
        </FadeUp>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map(s => (
            <FadeUp key={s.n}>
              <li className="surface p-8 h-full list-none">
                <span className="font-mono-num text-[0.95rem] text-live-gradient font-semibold">{s.n}</span>
                <h3 className={`mt-4 ${fontDisplay} text-[1.5rem] leading-[1.2] text-ink`}>
                  {pick(s.title.he, s.title.en, s.title.th)}
                </h3>
                <p className="mt-3 text-[0.98rem] text-ink/75 leading-[1.7]">
                  {pick(s.body.he, s.body.en, s.body.th)}
                </p>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
