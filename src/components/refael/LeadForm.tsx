import { useState } from 'react';
import { useT } from './i18n';
import FadeUp from './FadeUp';
import { N8N_LEAD_WEBHOOK, WHATSAPP_URL } from '@/config/avatars';

type State = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Options are submitted by their English value so leads stay comparable in the
 * inbox regardless of which language the visitor filled the form in.
 */
const PLACES = [
  { value: 'Lobby',    he: 'לובי',        en: 'Lobby',    th: 'ล็อบบี้' },
  { value: 'Museum',   he: 'מוזיאון',     en: 'Museum',   th: 'พิพิธภัณฑ์' },
  { value: 'Showroom', he: 'אולם תצוגה',  en: 'Showroom', th: 'โชว์รูม' },
  { value: 'Clinic',   he: 'קליניקה',     en: 'Clinic',   th: 'คลินิก' },
  { value: 'App',      he: 'אפליקציה',    en: 'App',      th: 'แอปพลิเคชัน' },
  { value: 'Other',    he: 'אחר',         en: 'Other',    th: 'อื่น ๆ' },
];

export default function LeadForm() {
  const { language, pick, fontDisplay } = useT();
  const [state, setState] = useState<State>('idle');
  const [form, setForm] = useState({ name: '', phone: '', company: '', place: '' });

  /** Everything the visitor typed, as a WhatsApp message — the lifeboat below. */
  function whatsappFallback() {
    const lines = [
      pick('היי רפאל, מילאתי את הטופס באתר:', 'Hi Refael, I filled in the form on your site:', 'สวัสดีค่ะราฟาเอล ฉันกรอกฟอร์มบนเว็บไซต์ของคุณแล้ว:'),
      `${pick('שם', 'Name', 'ชื่อ')}: ${form.name}`,
      `${pick('טלפון', 'Phone', 'โทร')}: ${form.phone}`,
      form.company ? `${pick('חברה', 'Company', 'บริษัท')}: ${form.company}` : '',
      `${pick('מיקום', 'Location', 'สถานที่')}: ${form.place}`,
    ].filter(Boolean);
    return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.place) return;
    setState('submitting');
    try {
      const res = await fetch(N8N_LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'refael.ai landing', language }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('success');
      setForm({ name: '', phone: '', company: '', place: '' });
    } catch {
      // A dead webhook must never swallow a lead. Hand the visitor to WhatsApp
      // with everything they typed already written out, so the worst case is
      // one extra tap instead of an enquiry that silently vanishes.
      setState('error');
      window.open(whatsappFallback(), '_blank', 'noopener,noreferrer');
    }
  }

  const inputCls =
    'w-full bg-paper/70 border border-ink/15 rounded-xl px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted-foreground/60 focus:border-live-a focus:outline-none transition-colors [color-scheme:dark]';

  return (
    <section id="contact" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink`}>
            {pick('בואו נבנה לכם אחד', "Let's build you one", 'มาสร้างอวตารของคุณกัน')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] items-start">
          <FadeUp className="w-full">
            <form onSubmit={onSubmit} className="surface p-6 sm:p-8 space-y-4 max-w-[640px]">
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('שם', 'Name', 'ชื่อ')} *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('טלפון', 'Phone', 'เบอร์โทรศัพท์')} *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('חברה', 'Company', 'บริษัท')}</label>
                <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">
                  {pick('איפה האווטאר יעבוד?', 'Where will the avatar work?', 'อวตารจะทำงานที่ไหน?')} *
                </label>
                <select
                  required
                  value={form.place}
                  onChange={e => setForm(f => ({ ...f, place: e.target.value }))}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="" disabled>{pick('בחרו…', 'Select…', 'เลือก…')}</option>
                  {PLACES.map(p => (
                    <option key={p.value} value={p.value}>{pick(p.he, p.en, p.th)}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={state === 'submitting'}
                className="w-full bg-live-gradient text-white font-semibold py-3.5 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition disabled:opacity-60"
              >
                {state === 'submitting' ? pick('שולח…', 'Sending…', 'กำลังส่ง…') : pick('דברו איתנו', 'Talk to us', 'ติดต่อเรา')}
              </button>

              {state === 'success' && (
                <p className="text-[0.9rem] font-semibold text-live-gradient">{pick('קיבלנו! נחזור אליכם עוד היום.', "Got it! We'll get back to you today.", 'ได้รับข้อมูลแล้ว เราจะติดต่อกลับภายในวันนี้')}</p>
              )}
              {state === 'error' && (
                <div className="text-[0.9rem] text-muted-foreground">
                  {pick(
                    'פתחנו לכם וואטסאפ עם הפרטים — רק תשלחו. אם לא נפתח:',
                    "We opened WhatsApp with your details — just hit send. If it didn't open:",
                    'เราเปิด WhatsApp พร้อมข้อมูลของคุณแล้ว กดส่งได้เลย หากไม่เปิดขึ้นมา:'
                  )}{' '}
                  <a href={whatsappFallback()} target="_blank" rel="noopener noreferrer" className="text-live-gradient font-semibold underline">WhatsApp</a>
                </div>
              )}
            </form>
          </FadeUp>

          <FadeUp>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-ink text-paper px-8 py-5 rounded-full text-[1rem] font-semibold hover:bg-ink/85 transition"
            >
              WhatsApp →
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
