import { useT } from '@/components/refael/i18n';
import Price, { SHOW_PRICES } from '@/components/site/Price';
import FadeUp from '@/components/refael/FadeUp';
import {
  Sparkles, Mic2, Eye, Heart, Clapperboard, Hand, Briefcase, Users, BarChart3, Check,
} from 'lucide-react';

const SPECIAL: { icon: JSX.Element; he: string; en: string; th: string; bodyHe: string; bodyEn: string; bodyTh: string }[] = [
  {
    icon: <Mic2 className="w-5 h-5" />,
    he: 'קול משובט', en: 'A cloned voice', th: 'เสียงโคลนเฉพาะตัว',
    bodyHe: 'שחקנית ישראלית מוקלטת, הקול בבעלות העסק. אין עוד אחד כזה בעולם.',
    bodyEn: 'A recorded Israeli actress, the voice owned by the business. There is no other like it in the world.',
    bodyTh: 'บันทึกเสียงจากนักแสดงหญิงชาวอิสราเอล เสียงเป็นกรรมสิทธิ์ของธุรกิจ ไม่มีเสียงไหนในโลกเหมือน',
  },
  {
    icon: <Eye className="w-5 h-5" />,
    he: 'רואה באמת', en: 'She really sees', th: 'มองเห็นได้จริง',
    bodyHe: 'מזהה אתכם מתקרבים ונכנסת לקבל אתכם · קוראת תג/QR ומברכת בשם · רואה מוצר ביד שלכם ומדברת עליו.',
    bodyEn: 'Recognises you approaching and steps in to receive you · reads a badge/QR and greets you by name · sees a product in your hand and talks about it.',
    bodyTh: 'รู้ว่าคุณกำลังเดินเข้ามาและก้าวออกมาต้อนรับ · อ่านป้ายชื่อหรือ QR แล้วทักทายด้วยชื่อ · เห็นสินค้าในมือคุณแล้วพูดถึงสินค้านั้นได้',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    he: 'זוכרת את הקבועים', en: 'She remembers the regulars', th: 'จำลูกค้าประจำได้',
    bodyHe: '"דנה! חזרת! איך היה הטיפול?" — הרגע ששווה את כל התקציב.',
    bodyEn: '"Dana! You\'re back! How was the treatment?" — the moment worth the whole budget.',
    bodyTh: '"คุณดาน่า! กลับมาแล้ว! ทรีตเมนต์ครั้งก่อนเป็นยังไงบ้างคะ?" ช่วงเวลาที่คุ้มค่ากับงบทั้งหมด',
  },
  {
    icon: <Clapperboard className="w-5 h-5" />,
    he: 'פנים חיות', en: 'A living face', th: 'ใบหน้าที่มีชีวิต',
    bodyHe: 'מנוע כפול: שפתיים מדויקות בקלוז-אפ, גוף מלא בתנועה, מצב מראה שמגיב להבעות שלכם, חיתוכי מצלמה כמו שידור.',
    bodyEn: 'A dual engine: precise lips in close-up, full body in motion, mirror mode reacting to your expressions, camera cuts like a broadcast.',
    bodyTh: 'เอนจินคู่: ริมฝีปากแม่นยำในภาพระยะใกล้ ร่างกายเคลื่อนไหวได้เต็มตัว โหมดกระจกที่ตอบสนองต่อสีหน้าของคุณ และตัดมุมกล้องเหมือนรายการถ่ายทอดสด',
  },
  {
    icon: <Hand className="w-5 h-5" />,
    he: 'ידיים מלאות + יוזמת', en: 'Full hands + initiative', th: 'ลงมือทำครบ + ริเริ่มเอง',
    bodyHe: 'כל מה שמאיה עושה, ועוד: מתקשרת ללקוח שלא הגיע, עוקבת אחרי ליד, שולחת ברכת יום הולדת.',
    bodyEn: 'Everything Maya does, and more: calls a customer who didn\'t show, follows up a lead, sends a birthday greeting.',
    bodyTh: 'ทำได้ทุกอย่างที่มายาทำ และมากกว่านั้น: โทรหาลูกค้าที่ไม่มาตามนัด ติดตามลีด ส่งคำอวยพรวันเกิด',
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    he: 'עובדת בכמה משרות', en: 'She works several jobs', th: 'ทำได้หลายตำแหน่ง',
    bodyHe: 'בוקר: קבלה · צהריים: מציגת מוצרים (עם כיתוב חי על המוצר) · ערב אירועים: מנחה שמריצה חידון ומשחק Freeze עם קהל · לילה: מושכת עוברי אורח מהחלון.',
    bodyEn: 'Morning: reception · midday: product presenter (with a live caption on the product) · evenings: an event host running a quiz and a Freeze game with the crowd · night: pulling passers-by in from the window.',
    bodyTh: 'เช้า: ต้อนรับ · กลางวัน: นำเสนอสินค้า (พร้อมคำบรรยายสดบนสินค้า) · ค่ำที่มีอีเวนต์: พิธีกรจัดควิซและเกม Freeze กับผู้ชม · กลางคืน: ชวนคนที่เดินผ่านหน้าร้านให้แวะเข้ามา',
  },
  {
    icon: <Users className="w-5 h-5" />,
    he: 'דו-שיח (אופציה)', en: 'A duet (optional)', th: 'บทสนทนาคู่ (ตัวเลือกเสริม)',
    bodyHe: 'דמות שנייה שהיא מדברת איתה — קבלה + מומחית. תיאטרון, לא מסך.',
    bodyEn: 'A second character she talks with — reception + expert. Theatre, not a screen.',
    bodyTh: 'ตัวละครที่สองที่เธอพูดคุยด้วย ฝ่ายต้อนรับ + ผู้เชี่ยวชาญ เหมือนดูละครเวที ไม่ใช่แค่หน้าจอ',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    he: 'דוח מלא למנהל', en: 'A full manager report', th: 'รายงานฉบับเต็มสำหรับผู้จัดการ',
    bodyHe: 'שיחות, המרות, מגמות, מה שאלו ואין תשובה.',
    bodyEn: 'Conversations, conversions, trends, what got asked with no answer.',
    bodyTh: 'บทสนทนา อัตราการเปลี่ยนเป็นลูกค้า แนวโน้ม และคำถามที่ยังไม่มีคำตอบ',
  },
];

export default function TheStar() {
  const { pick, fontDisplay } = useT();

  const included = [
    pick('צילום אולפן מלא (כולל החלפות לבוש = גרסאות עונתיות)', 'A full studio shoot (incl. wardrobe changes = seasonal versions)', 'ถ่ายทำในสตูดิโอเต็มรูปแบบ (รวมการเปลี่ยนชุด = เวอร์ชันตามฤดูกาล)'),
    pick('שיבוט קול', 'Voice cloning', 'โคลนเสียง'),
    pick('מוח ידע', 'Knowledge brain', 'คลังความรู้'),
    pick('כל החיבורים (יומן / CRM / וואטסאפ)', 'All connections (calendar / CRM / WhatsApp)', 'การเชื่อมต่อทั้งหมด (ปฏิทิน / CRM / WhatsApp)'),
    pick('מסך / הולובוקס / מקרן', 'Screen / holobox / projector', 'จอ / โฮโลบ็อกซ์ / โปรเจกเตอร์'),
    pick('כיול לחלל', 'Calibration to the space', 'ปรับเทียบให้เข้ากับพื้นที่จริง'),
    pick('3 חודשי בנייה עם אבני דרך', '3 months of build with milestones', 'พัฒนา 3 เดือน พร้อมเป้าหมายในแต่ละช่วง'),
    pick('חודשיים ליווי', 'Two months of support', 'ดูแลต่อเนื่อง 2 เดือน'),
  ];

  return (
    <section id="star" className="relative py-24 sm:py-32 px-5 bg-mist overflow-hidden">
      {/* a warmer premium wash, to set the top tier apart from the flagship cyan */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        background: 'radial-gradient(ellipse 60% 50% at 80% 0%, rgba(240,190,90,0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 100%, rgba(124,92,240,0.10), transparent 60%)',
      }} />
      <div className="relative max-w-[1080px] mx-auto">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(240,190,90,0.35)] bg-[rgba(240,190,90,0.08)] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#f0be5a]" />
            <span className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#f0be5a]">{pick('הדרגה מעל הדגל', 'One tier above the flagship', 'สูงกว่าเรือธงอีกหนึ่งระดับ')}</span>
          </div>
          <h2 className={`${fontDisplay} text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] text-ink`}>
            {pick('הכוכבת', 'The Star', 'เดอะสตาร์')}
            <span className="block text-[1.15rem] sm:text-[1.4rem] font-normal text-muted-foreground mt-2 tracking-wide" style={{ fontFamily: 'inherit' }}>
              {SHOW_PRICES ? pick('The Digital Actress · ₪59,900 · 3 חודשים', 'The Digital Actress · ₪59,900 · 3 months', 'The Digital Actress · ₪59,900 · 3 เดือน') : pick('The Digital Actress · 3 חודשי בנייה', 'The Digital Actress · a 3-month build', 'The Digital Actress · พัฒนา 3 เดือน')}
            </span>
          </h2>
          <p className="mt-5 text-[1.15rem] text-ink/85 max-w-[680px] leading-[1.6]">
            {pick('לא פקידה — שחקנית דיגיטלית. עובדת אחת, צוות שלם.', 'Not a receptionist — a digital actress. One employee, a whole team.', 'ไม่ใช่แค่พนักงานต้อนรับ แต่เป็นนักแสดงดิจิทัล พนักงานคนเดียว ทำงานได้เท่าทั้งทีม')}
          </p>
        </FadeUp>

        {/* Who she is */}
        <FadeUp>
          <div className="mt-10 surface p-6 sm:p-8 max-w-[820px]">
            <p className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-muted-foreground mb-3">{pick('מי היא', 'Who she is', 'เธอคือใคร')}</p>
            <p className="text-[1.05rem] text-ink/80 leading-[1.8]">
              {pick(
                'דמות בגודל מלא שצולמה באולפן עם שחקנית מקצועית — 80–120 קליפים מדויקים: נכנסת לפריים כשאתם מתקרבים, יושבת, נשענת, מחזיקה מוצרים, מושיטה, צוחקת, חושבת, חוגגת, רוקדת. לא "מחוות" — רפרטואר.',
                'A full-size figure shot in a studio with a professional actress — 80–120 precise clips: she enters the frame as you approach, sits, leans, holds products, reaches out, laughs, thinks, celebrates, dances. Not "gestures" — a repertoire.', 'ตัวละครขนาดเท่าคนจริงที่ถ่ายทำในสตูดิโอกับนักแสดงมืออาชีพ 80–120 คลิปที่แม่นยำ: เดินเข้าเฟรมเมื่อคุณเข้าใกล้ นั่ง เอนตัว ถือสินค้า ยื่นมือ หัวเราะ ครุ่นคิด ฉลอง และเต้น ไม่ใช่แค่ "ท่าทาง" แต่เป็นคลังการแสดงทั้งชุด'
              )}
            </p>
          </div>
        </FadeUp>

        {/* What makes her special */}
        <div className="mt-14">
          <FadeUp>
            <p className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-muted-foreground mb-5">{pick('מה מיוחד בה', 'What makes her special', 'อะไรทำให้เธอพิเศษ')}</p>
          </FadeUp>
          <div className="grid gap-5 sm:grid-cols-2">
            {SPECIAL.map((s, i) => (
              <FadeUp key={i} className="h-full">
                <div className="surface h-full p-6">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-flex w-10 h-10 rounded-xl bg-[rgba(240,190,90,0.12)] items-center justify-center text-[#f0be5a]">{s.icon}</span>
                    <h3 className="text-[1.1rem] font-bold text-ink">{pick(s.he, s.en, s.th)}</h3>
                  </div>
                  <p className="text-[0.95rem] text-ink/70 leading-[1.65]">{pick(s.bodyHe, s.bodyEn, s.bodyTh)}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* What's included + price */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
          <FadeUp className="w-full">
            <div className="surface p-6 sm:p-7">
              <p className="text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-muted-foreground mb-4">{pick('מה כלול', 'What\'s included', 'สิ่งที่รวมอยู่')}</p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {included.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[0.95rem] text-ink/80">
                    <Check className="w-4 h-4 text-[#f0be5a] mt-1 shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="surface p-7" style={{ boxShadow: '0 0 0 1px rgba(240,190,90,0.25), 0 24px 48px -28px rgba(0,0,0,0.8)' }}>
              <p className="text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-[#f0be5a]">{pick('הכוכבת', 'The Star', 'เดอะสตาร์')}</p>
              <Price fallback={<p className="mt-3 text-[1.35rem] font-semibold text-ink">{pick('הצעת מחיר אחרי שיחה קצרה', 'Quoted after a short call', 'เสนอราคาหลังพูดคุยกันสั้นๆ')}</p>}><div className="mt-3 flex items-baseline gap-2">
                <span className={`${fontDisplay} text-[2.6rem] text-ink`}>₪59,900</span>
              </div></Price>
              <p className="text-[0.9rem] text-muted-foreground">{pick('חד-פעמי · 3 חודשי בנייה', 'One-off · 3-month build', 'ชำระครั้งเดียว · พัฒนา 3 เดือน')}</p>
              <div className="mt-5 pt-5 border-t border-ink/10">
                <Price fallback={null}><div className="flex items-baseline gap-2">
                  <span className={`${fontDisplay} text-[1.7rem] text-ink`}>₪1,490</span>
                  <span className="text-[0.9rem] text-muted-foreground">{pick('לחודש', '/ month', '/ เดือน')}</span>
                </div></Price>
                <p className="text-[0.85rem] text-muted-foreground mt-1">{pick('תשתית ותחזוקה', 'Infrastructure and maintenance', 'โครงสร้างระบบและการดูแลรักษา')}</p>
              </div>
              <a href="#contact" className="mt-6 block text-center text-white font-semibold py-3 rounded-full text-[0.95rem] transition hover:brightness-110" style={{ background: 'linear-gradient(90deg, #e0a83c, #7c5cf0)', boxShadow: '0 10px 28px -10px rgba(224,168,60,0.55)' }}>
                {pick('לדבר על הכוכבת', 'Talk about The Star', 'คุยเรื่องเดอะสตาร์')}
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Bottom line */}
        <FadeUp>
          <div className="mt-12 surface p-6 sm:p-8 text-center max-w-[760px] mx-auto">
            <p className="text-[1.1rem] sm:text-[1.25rem] text-ink leading-[1.6]">
              {pick('הדגל ', 'The flagship ', 'เรือธง ')}<Price><span className="text-muted-foreground">(₪29,900)</span></Price>{pick(' = הפקידה המושלמת.', ' = the perfect receptionist.', ' = พนักงานต้อนรับที่สมบูรณ์แบบ')}
              <br />
              <span className="font-bold">{pick('הכוכבת = הדמות שמגיעה עליה כתבה.', 'The Star = the figure that gets written about.', 'เดอะสตาร์ = ตัวละครที่สื่อต้องเขียนถึง')}</span>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
