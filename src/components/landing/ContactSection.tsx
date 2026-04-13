import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Send } from 'lucide-react';

const ContactSection = () => {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBusiness: ${form.business}\n\n${form.message}`
    );
    window.open(`mailto:dsbeauty01@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-[1rem]';

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'hsl(222 47% 11%)' }}
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-hebrew text-[3rem] sm:text-[3.5rem] font-black text-white mb-1 text-right mx-auto max-w-xl" dir="rtl">מוכנים? בואו נדבר.</h2>
          <p className="text-[1.8rem] font-semibold text-white/60 mb-2 text-left mx-auto max-w-xl">Ready? Let's Talk.</p>
          <p className="font-hebrew text-[1.1rem] text-white/40 text-right mx-auto max-w-xl" dir="rtl">ייעוץ ראשוני חינם.</p>
          <p className="text-[1rem] text-white/30 text-left mx-auto max-w-xl">Free consultation.</p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-hebrew text-[0.95rem] text-white/60 mb-1 text-right" dir="rtl">שם</label>
              <label className="block text-[0.85rem] text-white/40 mb-2 text-left">Name</label>
              <input type="text" placeholder="Your name / השם שלך" required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block font-hebrew text-[0.95rem] text-white/60 mb-1 text-right" dir="rtl">אימייל</label>
              <label className="block text-[0.85rem] text-white/40 mb-2 text-left">Email</label>
              <input type="email" placeholder="your@email.com" required className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block font-hebrew text-[0.95rem] text-white/60 mb-1 text-right" dir="rtl">סוג עסק</label>
              <label className="block text-[0.85rem] text-white/40 mb-2 text-left">Business type</label>
              <select className={inputClass} value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })}>
                <option value="">בחר / Select</option>
                <option value="Salon">מספרה / Salon</option>
                <option value="Clinic">קליניקה / Clinic</option>
                <option value="Restaurant">מסעדה / Restaurant</option>
                <option value="E-commerce">חנות / E-commerce</option>
                <option value="Real Estate">נדל"ן / Real Estate</option>
                <option value="Consultant">יועץ / Consultant</option>
                <option value="Other">אחר / Other</option>
              </select>
            </div>
            <div>
              <label className="block font-hebrew text-[0.95rem] text-white/60 mb-1 text-right" dir="rtl">הודעה</label>
              <label className="block text-[0.85rem] text-white/40 mb-2 text-left">Message</label>
              <textarea placeholder="Tell me about your business..." rows={4} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <Button type="submit" size="lg" className="w-full gradient-coral text-white font-bold h-14 rounded-xl hover:opacity-90 transition-all text-[1.1rem]">
              {sent ? 'Opening email...' : (
                <><span className="font-hebrew">שלח</span> <Send className="mx-2 h-5 w-5" /> <span>Send</span></>
              )}
            </Button>
          </form>

          <div className="flex flex-col gap-5 justify-center">
            <a
              href="https://m.me/refael.silanikove"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-4 rounded-xl transition-all text-[1.1rem]"
            >
              <MessageCircle className="h-6 w-6" />
              <div>
                <span className="font-hebrew block text-right" dir="rtl">שלחו הודעה במסנג׳ר</span>
                <span className="block text-left text-white/80 text-[0.95rem]">Chat on Messenger</span>
              </div>
            </a>
            <a
              href="mailto:dsbeauty01@gmail.com"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-4 rounded-xl transition-all border border-white/10 text-[1.1rem]"
            >
              <Mail className="h-6 w-6" />
              <div>
                <span className="font-hebrew block text-right" dir="rtl">שלחו מייל</span>
                <span className="block text-left text-white/80 text-[0.95rem]">Email me directly</span>
              </div>
            </a>
            <div className="text-center lg:text-left">
              <p className="font-hebrew text-[1rem] text-white/40 text-right" dir="rtl">אני בן אדם, לא בוט (באירוניה)</p>
              <p className="text-[0.9rem] text-white/30 text-left">I'm a human, not a bot (ironically)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
