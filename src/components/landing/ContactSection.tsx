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
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-base';

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'hsl(222 47% 11%)' }}
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-hebrew text-4xl sm:text-5xl font-black text-white mb-2">מוכנים? בואו נדבר.</h2>
          <p className="text-lg text-white/60 mb-1">Ready? Let's Talk.</p>
          <p className="font-hebrew text-base text-white/40">ייעוץ ראשוני חינם.</p>
          <p className="text-sm text-white/30">Free consultation.</p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Name / שם" required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="Email / אימייל" required className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select className={inputClass} value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })}>
              <option value="">Business type / סוג עסק</option>
              <option value="Salon">מספרה / Salon</option>
              <option value="Clinic">קליניקה / Clinic</option>
              <option value="Restaurant">מסעדה / Restaurant</option>
              <option value="E-commerce">חנות / E-commerce</option>
              <option value="Real Estate">נדל"ן / Real Estate</option>
              <option value="Consultant">יועץ / Consultant</option>
              <option value="Other">אחר / Other</option>
            </select>
            <textarea placeholder="Tell me about your business... / ספרו לי על העסק שלכם..." rows={4} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit" size="lg" className="w-full gradient-coral text-white font-bold h-14 rounded-xl hover:opacity-90 transition-all text-base">
              {sent ? 'Opening email...' : (
                <>שלח <Send className="ml-2 h-5 w-5" /> Send</>
              )}
            </Button>
          </form>

          <div className="flex flex-col gap-5 justify-center">
            <a
              href="https://m.me/refael.silanikove"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-4 rounded-xl transition-all text-base"
            >
              <MessageCircle className="h-6 w-6" />
              Chat on Messenger
            </a>
            <a
              href="mailto:dsbeauty01@gmail.com"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-4 rounded-xl transition-all border border-white/10 text-base"
            >
              <Mail className="h-6 w-6" />
              Email me directly
            </a>
            <p className="text-base text-white/40 text-center lg:text-left">
              I'm a human, not a bot (ironically)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
