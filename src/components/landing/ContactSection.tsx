import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection = () => {
  const { ref, inView } = useInView();
  const { isHebrew } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nBusiness: ${form.business}\n\n${form.message}`);
    window.open(`mailto:dsbeauty01@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
  };

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-[1rem]';

  const businessOptions = isHebrew
    ? [{ v: '', l: 'בחר סוג עסק' }, { v: 'Salon', l: 'מספרה' }, { v: 'Clinic', l: 'קליניקה' }, { v: 'Restaurant', l: 'מסעדה' }, { v: 'E-commerce', l: 'חנות' }, { v: 'Real Estate', l: 'נדל"ן' }, { v: 'Consultant', l: 'יועץ' }, { v: 'Other', l: 'אחר' }]
    : [{ v: '', l: 'Select business type' }, { v: 'Salon', l: 'Salon' }, { v: 'Clinic', l: 'Clinic' }, { v: 'Restaurant', l: 'Restaurant' }, { v: 'E-commerce', l: 'E-commerce' }, { v: 'Real Estate', l: 'Real Estate' }, { v: 'Consultant', l: 'Consultant' }, { v: 'Other', l: 'Other' }];

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-section-deep overflow-hidden" ref={ref}>
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-25 bg-coral/40 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-[3rem] sm:text-[4rem] font-black text-white mb-2 tracking-tight ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            {isHebrew ? 'מוכנים? בואו נדבר.' : "Ready? Let's Talk."}
          </h2>
          <p className={`text-[1.15rem] text-white/60 ${isHebrew ? 'font-hebrew' : ''}`}>
            {isHebrew ? 'ייעוץ ראשוני חינם.' : 'Free consultation.'}
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <form onSubmit={handleSubmit} className="space-y-4 glass rounded-3xl p-6" dir={isHebrew ? 'rtl' : 'ltr'}>
            <input type="text" placeholder={isHebrew ? 'השם שלך' : 'Your name'} required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder={isHebrew ? 'אימייל' : 'Email'} required className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select className={inputClass} value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })}>
              {businessOptions.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
            <textarea placeholder={isHebrew ? 'ספרו לי על העסק שלכם...' : 'Tell me about your business...'} rows={4} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit" size="lg" className="w-full gradient-coral text-white font-bold h-14 rounded-xl hover:opacity-95 hover:scale-[1.02] transition-all text-[1.1rem] shadow-xl glow-coral animate-pulse-glow">
              {sent
                ? (isHebrew ? 'פותח מייל...' : 'Opening email...')
                : (<><span className={isHebrew ? 'font-hebrew' : ''}>{isHebrew ? 'שלח' : 'Send'}</span> <Send className="mx-2 h-5 w-5" /></>)}
            </Button>
          </form>

          <div className="flex flex-col gap-5 justify-center">
            <a href="https://m.me/refael.silanikove" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 gradient-blue hover:opacity-95 hover:scale-[1.02] text-white font-bold px-6 py-4 rounded-xl transition-all text-[1.1rem] shadow-xl glow-blue">
              <MessageCircle className="h-6 w-6" />
              <span className={isHebrew ? 'font-hebrew' : ''}>{isHebrew ? 'שלחו הודעה במסנג׳ר' : 'Chat on Messenger'}</span>
            </a>
            <a href="mailto:dsbeauty01@gmail.com"
              className="flex items-center gap-3 glass hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-[1.1rem]">
              <Mail className="h-6 w-6" />
              <span className={isHebrew ? 'font-hebrew' : ''}>{isHebrew ? 'שלחו מייל' : 'Email me directly'}</span>
            </a>
            <p className={`text-[1rem] text-white/50 text-center lg:text-left ${isHebrew ? 'font-hebrew' : ''}`}>
              {isHebrew ? 'אני בן אדם, לא בוט (באירוניה)' : "I'm a human, not a bot (ironically)"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
