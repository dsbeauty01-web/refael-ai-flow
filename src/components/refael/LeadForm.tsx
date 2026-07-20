import { useState } from 'react';
import { useT } from './i18n';
import FadeUp from './FadeUp';
import { N8N_LEAD_WEBHOOK, WHATSAPP_URL } from '@/config/avatars';

type State = 'idle' | 'submitting' | 'success' | 'error';

const PLACES_HE = ['לובי', 'מוזיאון', 'אולם תצוגה', 'קליניקה', 'אפליקציה', 'אחר'];
const PLACES_EN = ['Lobby', 'Museum', 'Showroom', 'Clinic', 'App', 'Other'];

export default function LeadForm() {
  const { isHebrew, pick, fontDisplay } = useT();
  const [state, setState] = useState<State>('idle');
  const [form, setForm] = useState({ name: '', phone: '', company: '', place: '' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.place) return;
    setState('submitting');
    try {
      const res = await fetch(N8N_LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'refael.ai landing', language: isHebrew ? 'he' : 'en' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('success');
      setForm({ name: '', phone: '', company: '', place: '' });
    } catch {
      setState('error');
    }
  }

  const inputCls =
    'w-full bg-white border border-ink/12 rounded-xl px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted-foreground/60 focus:border-live-a focus:outline-none transition-colors';

  return (
    <section id="contact" className="py-24 sm:py-32 px-5 bg-mist">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink`}>
            {pick('בואו נבנה לכם אחד', "Let's build you one")}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] items-start">
          <FadeUp className="w-full">
            <form onSubmit={onSubmit} className="surface p-6 sm:p-8 space-y-4 max-w-[640px]">
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('שם', 'Name')} *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('טלפון', 'Phone')} *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">{pick('חברה', 'Company')}</label>
                <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-ink/70 mb-2">
                  {pick('איפה האווטאר יעבוד?', 'Where will the avatar work?')} *
                </label>
                <select
                  required
                  value={form.place}
                  onChange={e => setForm(f => ({ ...f, place: e.target.value }))}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="" disabled>{pick('בחרו…', 'Select…')}</option>
                  {(isHebrew ? PLACES_HE : PLACES_EN).map((p, i) => (
                    <option key={p} value={isHebrew ? PLACES_HE[i] : PLACES_EN[i]}>{p}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={state === 'submitting'}
                className="w-full bg-live-gradient text-white font-semibold py-3.5 rounded-full text-[0.95rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition disabled:opacity-60"
              >
                {state === 'submitting' ? pick('שולח…', 'Sending…') : pick('דברו איתנו', 'Talk to us')}
              </button>

              {state === 'success' && (
                <p className="text-[0.9rem] font-semibold text-live-gradient">{pick('קיבלנו! נחזור אליכם עוד היום.', "Got it! We'll get back to you today.")}</p>
              )}
              {state === 'error' && (
                <div className="text-[0.9rem] text-muted-foreground">
                  {pick('משהו השתבש. אפשר גם פשוט בוואטסאפ:', 'Something went wrong. WhatsApp works too:')}{' '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-live-gradient font-semibold underline">WhatsApp</a>
                </div>
              )}
            </form>
          </FadeUp>

          <FadeUp>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-ink text-white px-8 py-5 rounded-full text-[1rem] font-semibold hover:bg-ink/85 transition"
            >
              WhatsApp →
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
