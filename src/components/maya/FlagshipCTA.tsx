import { useState } from 'react';
import { useT } from '@/components/refael/i18n';
import FadeUp from '@/components/refael/FadeUp';
import { N8N_LEAD_WEBHOOK, WHATSAPP_URL } from '@/config/avatars';

type State = 'idle' | 'submitting' | 'success' | 'error';

/** Submitted by English value so leads stay comparable in the inbox. */
const FIELDS = [
  { value: 'Clinic',   he: 'מרפאה',   en: 'Clinic' },
  { value: 'Office',   he: 'משרד',    en: 'Office' },
  { value: 'Store',    he: 'חנות',    en: 'Store' },
  { value: 'Museum',   he: 'מוזיאון', en: 'Museum' },
  { value: 'Other',    he: 'אחר',     en: 'Other' },
];

export default function FlagshipCTA() {
  const { pick, fontDisplay, language } = useT();
  const [state, setState] = useState<State>('idle');
  const [form, setForm] = useState({ name: '', company: '', field: '', phone: '', use: '' });

  function whatsappFallback() {
    const lines = [
      pick('היי רפאל, אני רוצה מאיה:', 'Hi Refael, I want a Maya:'),
      `${pick('שם', 'Name')}: ${form.name}`,
      `${pick('עסק', 'Business')}: ${form.company}`,
      `${pick('תחום', 'Field')}: ${form.field}`,
      `${pick('טלפון', 'Phone')}: ${form.phone}`,
      form.use ? `${pick('מה היא תעשה אצלי', 'What she\'ll do')}: ${form.use}` : '',
    ].filter(Boolean);
    return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.field) return;
    setState('submitting');
    try {
      const res = await fetch(N8N_LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, place: form.field, source: 'maya flagship', language }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('success');
      setForm({ name: '', company: '', field: '', phone: '', use: '' });
    } catch {
      // A dead webhook must never swallow a lead — hand them to WhatsApp with
      // everything already written out.
      setState('error');
      window.open(whatsappFallback(), '_blank', 'noopener,noreferrer');
    }
  }

  const inputCls =
    'w-full bg-paper/70 border border-ink/15 rounded-xl px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted-foreground/60 focus:border-live-a focus:outline-none transition-colors [color-scheme:dark]';

  return (
    <section id="contact" className="relative hero-bg py-24 sm:py-32 px-5">
      <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
      <div className="relative max-w-[720px] mx-auto text-center">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.1] text-ink`}>
            {pick('רוצים מאיה משלכם?', 'Want your own Maya?')}
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted-foreground">
            {pick('ספרו לנו על העסק — ומאיה עצמה תחזור אליכם. באמת.', 'Tell us about your business — and Maya herself will call you back. Really.')}
          </p>
        </FadeUp>

        <FadeUp className="w-full">
          <form onSubmit={onSubmit} className="surface p-6 sm:p-8 mt-10 space-y-4 text-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('שם', 'Name')} *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('עסק', 'Business')}</label>
                <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('תחום', 'Field')} *</label>
                <select required value={form.field} onChange={e => setForm(f => ({ ...f, field: e.target.value }))} className={`${inputCls} appearance-none`}>
                  <option value="" disabled>{pick('בחרו…', 'Select…')}</option>
                  {FIELDS.map(p => <option key={p.value} value={p.value}>{pick(p.he, p.en)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('טלפון', 'Phone')} *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">
                {pick('מה היא תעשה אצלכם?', 'What will she do for you?')}
              </label>
              <textarea
                rows={3}
                value={form.use}
                onChange={e => setForm(f => ({ ...f, use: e.target.value }))}
                placeholder={pick('למשל: מקבלת מטופלים בקליניקה, קובעת תורים, עונה על שאלות…', 'e.g. greets patients at the clinic, books appointments, answers questions…')}
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full bg-live-gradient text-white font-semibold py-3.5 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition disabled:opacity-60"
            >
              {state === 'submitting' ? pick('שולח…', 'Sending…') : pick('היא תחזור אליכם', 'She\'ll call you back')}
            </button>

            {state === 'success' && (
              <p className="text-[0.9rem] font-semibold text-live-gradient">{pick('קיבלנו! נחזור אליכם עוד היום.', 'Got it! We\'ll get back to you today.')}</p>
            )}
            {state === 'error' && (
              <div className="text-[0.9rem] text-muted-foreground">
                {pick('פתחנו לכם וואטסאפ עם הפרטים — רק תשלחו. אם לא נפתח:', 'We opened WhatsApp with your details — just hit send. If it didn\'t open:')}{' '}
                <a href={whatsappFallback()} target="_blank" rel="noopener noreferrer" className="text-live-gradient font-semibold underline">WhatsApp</a>
              </div>
            )}
          </form>
        </FadeUp>

        <FadeUp>
          <p className="mt-8 text-[0.82rem] text-muted-foreground tracking-wide">
            {pick(
              'נבנה בישראל · קוד פתוח · הדמות והידע בבעלות הלקוח · אפס נעילה לספק',
              'Built in Israel · open source · the figure and knowledge are the client\'s · zero vendor lock-in'
            )}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
