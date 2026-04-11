import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';

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
    'w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm';

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-16" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-hebrew text-3xl sm:text-4xl font-bold text-center mb-2">מוכנים לאוטומציה?</h2>
        <p className="text-xl text-muted-foreground text-center mb-4">Ready to automate?</p>
        <p className="text-sm text-muted-foreground text-center mb-16 max-w-lg mx-auto">
          Free 15-minute consultation. I'll show you exactly what AI can do for your business.
        </p>

        <div
          className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              required
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select
              className={inputClass}
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
            >
              <option value="">Select business type</option>
              <option value="Salon/Spa">Salon / Spa</option>
              <option value="Clinic">Clinic</option>
              <option value="Restaurant">Restaurant</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              placeholder="Tell me about your business and what you'd like to automate..."
              rows={4}
              className={inputClass}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full gradient-gold text-primary-foreground font-semibold h-14 rounded-xl hover:opacity-90 transition-all"
            >
              {sent ? '✓ Opening email...' : 'Send Message'}
            </Button>
          </form>

          {/* Alt contact */}
          <div className="flex flex-col gap-5 justify-center">
            <a
              href="https://m.me/refael.silanikove"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[hsl(210_80%_55%)] hover:bg-[hsl(210_80%_50%)] text-white font-semibold px-6 py-4 rounded-xl transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on Messenger
            </a>
            <a
              href="mailto:dsbeauty01@gmail.com"
              className="flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold px-6 py-4 rounded-xl transition-all border border-border"
            >
              <Mail className="h-5 w-5" />
              Email me directly
            </a>
            <p className="text-xs text-muted-foreground text-center lg:text-left">
              Usually respond within 2 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
