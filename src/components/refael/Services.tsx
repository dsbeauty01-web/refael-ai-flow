import { useT } from './i18n';
import FadeUp from './FadeUp';
import { WHATSAPP_URL } from '@/config/avatars';

/**
 * The rest of what Refael builds. Written to provoke "wait — you can do that?"
 * rather than to list capabilities: each card leads with a moment the visitor
 * recognises from their own week, and only then names the technology.
 */
const SERVICES = [
  {
    icon: '🧍',
    he: {
      t: 'אווטאר חי',
      hook: 'מישהו נכנס ללובי ב-19:00. אין אף אחד בדלפק.',
      b: 'דמות בגודל מלא מקבלת אותו בשמו, עונה על שאלות, ומזמנת פגישה — בזמן שאתם בבית.',
      cta: 'המחירים למעלה',
    },
    en: {
      t: 'Live avatar',
      hook: 'Someone walks into the lobby at 7pm. Nobody is at the desk.',
      b: 'A full-size figure greets them, answers questions and books the meeting — while you are at home.',
      cta: 'Prices above',
    },
    th: {
      t: 'อวตารเสมือนจริง',
      hook: 'มีคนเดินเข้าล็อบบี้ตอนหนึ่งทุ่ม แต่ไม่มีใครอยู่ที่เคาน์เตอร์',
      b: 'ตัวละครขนาดเท่าคนจริงต้อนรับเขา ตอบคำถาม และนัดหมายให้ ในขณะที่คุณอยู่บ้าน',
      cta: 'ดูราคาด้านบน',
    },
    href: '#pricing',
  },
  {
    icon: '💬',
    he: {
      t: 'בוט וואטסאפ ומסנג׳ר',
      hook: 'לקוח שולח הודעה ב-2 לפנות בוקר.',
      b: 'הוא מקבל תשובה אמיתית מיד — ואתם מקבלים ליד מסודר בבוקר, עם כל מה שהוא סיפר.',
      cta: 'לשמוע איך',
    },
    en: {
      t: 'WhatsApp & Messenger bots',
      hook: 'A customer messages you at 2am.',
      b: 'They get a real answer immediately — and you get a tidy lead in the morning with everything they said.',
      cta: 'Hear how',
    },
    th: {
      t: 'บอท WhatsApp และ Messenger',
      hook: 'ลูกค้าส่งข้อความหาคุณตอนตีสอง',
      b: 'เขาได้รับคำตอบจริงทันที ส่วนคุณได้ลีดที่จัดระเบียบไว้ในตอนเช้า พร้อมทุกอย่างที่เขาบอก',
      cta: 'ฟังว่าทำได้อย่างไร',
    },
    href: WHATSAPP_URL,
  },
  {
    icon: '⚙️',
    he: {
      t: 'אוטומציות ואינטגרציות',
      hook: 'יש משהו שאתם עושים ידנית כל יום.',
      b: 'n8n, חיבורי CRM, RAG על המסמכים שלכם, עמדות קיוסק. אם זה חוזר על עצמו — אפשר להפוך אותו לאוטומטי.',
      cta: 'לספר לי מה חוזר',
    },
    en: {
      t: 'Automations & integrations',
      hook: 'There is something you do by hand every single day.',
      b: 'n8n, CRM connections, RAG over your own documents, kiosk deployments. If it repeats, it can be automated.',
      cta: 'Tell me what repeats',
    },
    th: {
      t: 'ระบบอัตโนมัติและการเชื่อมต่อ',
      hook: 'มีบางอย่างที่คุณต้องทำเองด้วยมือทุกวัน',
      b: 'n8n การเชื่อมต่อ CRM, RAG บนเอกสารของคุณเอง และการติดตั้งจุดบริการ ถ้ามันเกิดซ้ำ ๆ ก็ทำให้อัตโนมัติได้',
      cta: 'บอกฉันว่าอะไรที่ทำซ้ำ',
    },
    href: WHATSAPP_URL,
  },
];

export default function Services() {
  const { tr, pick, fontDisplay } = useT();

  return (
    <section id="services" className="py-24 sm:py-32 px-5 bg-paper">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink max-w-[820px]`}>
            {pick('האווטאר הוא רק ההתחלה.', 'The avatar is only the beginning.', 'อวตารเป็นเพียงจุดเริ่มต้น')}
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted-foreground max-w-[680px] leading-[1.7]">
            {pick(
              'רוב מה שאני בונה לעסקים אף אחד לא רואה — זה פשוט קורה, בשקט, בזמן שהם עסוקים במשהו אחר.',
              'Most of what I build for businesses is never seen — it just happens, quietly, while they are busy with something else.',
              'สิ่งที่ผมสร้างให้ธุรกิจส่วนใหญ่ไม่มีใครมองเห็น มันเพียงทำงานอย่างเงียบ ๆ ในขณะที่พวกเขายุ่งอยู่กับเรื่องอื่น'
            )}
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const v = tr(s);
            const external = s.href.startsWith('http');
            return (
              <FadeUp key={i}>
                <div className="surface p-7 h-full flex flex-col hover:border-live-a/40 transition-all duration-300">
                  <span className="text-[1.7rem] leading-none" aria-hidden>{s.icon}</span>
                  <h3 className="mt-4 text-[1.15rem] font-bold text-ink">{v.t}</h3>
                  <p className="mt-3 text-[1rem] text-ink/85 leading-[1.6] font-medium">{v.hook}</p>
                  <p className="mt-2.5 text-[0.95rem] text-muted-foreground leading-[1.7] flex-1">{v.b}</p>
                  <a
                    href={s.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-6 text-[0.9rem] font-semibold text-live-gradient hover:opacity-80 transition-opacity"
                  >
                    {v.cta} →
                  </a>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp className="mt-10">
          <div className="surface p-7 sm:p-8 flex flex-wrap items-center justify-between gap-5">
            <p className="text-[1.05rem] text-ink max-w-[620px] leading-[1.6]">
              {pick(
                'לא בטוחים מה מתאים לכם? חצי שעה איתי, בלי תשלום ובלי התחייבות — ותדעו בדיוק מה שווה לבנות ומה לא.',
                "Not sure what fits you? Half an hour with me, free and with no commitment — and you'll know exactly what is worth building and what isn't.",
                'ไม่แน่ใจว่าแบบไหนเหมาะกับคุณ ครึ่งชั่วโมงกับผม ฟรีและไม่มีข้อผูกมัด แล้วคุณจะรู้ว่าอะไรควรสร้างและอะไรไม่ควร'
              )}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-live-gradient text-white font-semibold px-7 py-3.5 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition-all whitespace-nowrap"
            >
              {pick('לקבוע חצי שעה', 'Book the half hour', 'จองครึ่งชั่วโมง')}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
