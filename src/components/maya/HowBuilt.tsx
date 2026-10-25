import { useT } from '@/components/refael/i18n';
import Price from '@/components/site/Price';
import FadeUp from '@/components/refael/FadeUp';
import { Check } from 'lucide-react';

const MILESTONES: { weeks: string; he: string; en: string; th: string }[] = [
  { weeks: '1–2', he: 'עיצוב הדמות (מראה, לבוש, קול, כולל אופציית קול משובט) ובניית מוח הידע מחומרי העסק', en: 'Designing the figure (look, wardrobe, voice, incl. cloned-voice option) and building the knowledge brain from your material', th: 'ออกแบบตัวละคร (หน้าตา ชุด เสียง รวมถึงตัวเลือกโคลนเสียง) และสร้างคลังความรู้จากข้อมูลธุรกิจของคุณ' },
  { weeks: '3–4', he: 'חיבור הידיים: יומן, מייל, CRM, וואטסאפ · תרחישי שיחה · גבולות ברזל', en: 'Wiring the hands: calendar, email, CRM, WhatsApp · conversation flows · iron limits', th: 'เชื่อมต่อระบบ: ปฏิทิน อีเมล CRM WhatsApp · ออกแบบบทสนทนา · กำหนดขอบเขตที่เข้มงวด' },
  { weeks: '5–6', he: 'מנוע הנוכחות: מחוות, כיול הצבעה לחלל, מסך/עמדה, מצב המשיכה', en: 'The presence engine: gestures, pointing calibration, screen/kiosk, the pull mode', th: 'ระบบการแสดงตัว: ท่าทาง การปรับเทียบให้ชี้ทิศทางตรงกับพื้นที่จริง จอหรือตู้คีออสก์ และโหมดดึงดูดลูกค้า' },
  { weeks: '7', he: 'פיילוט חי בעסק + כיוונון על שיחות אמיתיות', en: 'A live pilot on-site + tuning on real conversations', th: 'ทดลองใช้งานจริงที่ธุรกิจของคุณ พร้อมปรับจูนจากบทสนทนาจริง' },
  { weeks: '8', he: 'דשבורד, הדרכת צוות, מסירה + חודש ליווי', en: 'Dashboard, team training, handover + a month of support', th: 'แดชบอร์ด อบรมทีมงาน ส่งมอบงาน พร้อมดูแลต่ออีก 1 เดือน' },
];

export default function HowBuilt() {
  const { pick, tr, fontDisplay } = useT();

  const included = [
    pick('העמדה המלאה (תוכנה)', 'The full station (software)', 'ระบบสถานีครบชุด (ซอฟต์แวร์)'),
    pick('דמות בבעלותכם', 'A figure you own', 'ตัวละครที่เป็นของคุณเอง'),
    pick('עד 1,500 דקות שיחה בחודש', 'Up to 1,500 conversation minutes a month', 'สนทนาได้สูงสุด 1,500 นาทีต่อเดือน'),
    pick('SLA והתאוששות אוטומטית', 'SLA and automatic recovery', 'SLA และระบบกู้คืนอัตโนมัติ'),
    pick('עדכוני מנועים שוטפים, אתם מקבלים אותם ראשונים', 'Ongoing engine upgrades, you get them first', 'อัปเกรดเอนจินอย่างต่อเนื่อง คุณได้ใช้ก่อนใคร'),
  ];

  return (
    <section id="build" className="relative hero-bg py-24 sm:py-32 px-5">
      <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
      <div className="relative max-w-[1080px] mx-auto">
        <FadeUp>
          <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            {pick('איך זה נבנה', 'How it\'s built', 'สร้างขึ้นอย่างไร')}
          </p>
          <h2 className={`${fontDisplay} mt-3 text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink`}>
            {pick('פרויקט הדגל, הכול, עד הקצה.', 'The flagship, everything, all the way.', 'โปรเจกต์เรือธง ครบทุกอย่าง จัดเต็มสุดทาง')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
          {/* Milestone table */}
          <FadeUp className="w-full">
            <div className="surface overflow-hidden">
              <div className="px-6 py-4 border-b border-ink/10 flex items-baseline justify-between gap-4">
                <span className="font-semibold text-ink">{pick('מסירה בשלבים · חודשיים', 'Staged delivery · two months', 'ส่งมอบเป็นระยะ · 2 เดือน')}</span>
                <span className="text-[0.85rem] text-muted-foreground">{pick('8 שבועות', '8 weeks', '8 สัปดาห์')}</span>
              </div>
              <ul>
                {MILESTONES.map((m, i) => (
                  <li key={i} className="px-6 py-4 flex gap-4 border-b border-ink/[0.06] last:border-0">
                    <span className="shrink-0 font-mono-num text-live-a font-semibold text-[0.95rem] w-12 text-center pt-0.5">{m.weeks}</span>
                    <span className="text-[0.98rem] text-ink/80 leading-[1.6]">{tr(m)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Price card */}
          <FadeUp>
            <div className="surface p-7 border-live-gradient">
              <p className="text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-live-a">{pick('פרויקט מלא', 'Full project', 'โปรเจกต์เต็มรูปแบบ')}</p>
              <Price fallback={<p className="mt-3 text-[1.35rem] font-semibold text-ink">{pick('הצעת מחיר אחרי שיחה קצרה', 'Quoted after a short call', 'เสนอราคาหลังพูดคุยกันสั้นๆ')}</p>}><div className="mt-3 flex items-baseline gap-2">
                <span className={`${fontDisplay} text-[2.6rem] text-ink`}>₪29,900</span>
              </div></Price>
              <p className="text-[0.9rem] text-muted-foreground">{pick('חד-פעמי · חודשיים · מסירה בשלבים', 'One-off · two months · staged delivery', 'ชำระครั้งเดียว · 2 เดือน · ส่งมอบเป็นระยะ')}</p>
              <div className="mt-5 pt-5 border-t border-ink/10">
                <Price fallback={null}><div className="flex items-baseline gap-2">
                  <span className={`${fontDisplay} text-[1.7rem] text-ink`}>₪990</span>
                  <span className="text-[0.9rem] text-muted-foreground">{pick('לחודש', '/ month', '/ เดือน')}</span>
                </div></Price>
                <p className="text-[0.85rem] text-muted-foreground mt-1">{pick('תשתית GPU ייעודית, תחזוקה, עדכוני ידע', 'Dedicated GPU infra, maintenance, knowledge updates', 'โครงสร้าง GPU เฉพาะ การดูแลระบบ และอัปเดตข้อมูลความรู้')}</p>
              </div>
              <a href="#contact" className="mt-6 block text-center bg-live-gradient text-white font-semibold py-3 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition">
                {pick('רוצים מאיה משלכם?', 'Want your own Maya?', 'อยากมีมายาเป็นของตัวเองไหม?')}
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Included */}
        <FadeUp>
          <div className="mt-8 surface p-6 sm:p-7">
            <p className="text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-muted-foreground mb-4">{pick('כלול בפרויקט', 'Included in the project', 'สิ่งที่รวมอยู่ในโปรเจกต์')}</p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {included.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.95rem] text-ink/80">
                  <Check className="w-4 h-4 text-live-a mt-1 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        {/* Smaller versions */}
        <FadeUp>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="surface-dark p-5">
              <p className="font-semibold text-ink">{pick('אווטאר לאתר', 'Website avatar', 'อวตารสำหรับเว็บไซต์')}</p>
              <Price><p className="text-[0.9rem] text-muted-foreground mt-1">₪2,900 + ₪290{pick(' לחודש', ' / mo', ' / เดือน')}</p></Price>
            </div>
            <div className="surface-dark p-5">
              <p className="font-semibold text-ink">{pick('עמדת עסק (מאיה של היום)', 'Business station (today\'s Maya)', 'สถานีสำหรับธุรกิจ (มายาเวอร์ชันปัจจุบัน)')}</p>
              <Price><p className="text-[0.9rem] text-muted-foreground mt-1">₪6,900 + ₪690{pick(' לחודש', ' / mo', ' / เดือน')}</p></Price>
            </div>
          </div>
          <p className="mt-4 text-center text-[0.85rem] text-muted-foreground">{pick('הדגל = הכול, עד הקצה.', 'The flagship = everything, all the way.', 'เรือธง = ครบทุกอย่าง จัดเต็มสุดทาง')}</p>
        </FadeUp>
      </div>
    </section>
  );
}
