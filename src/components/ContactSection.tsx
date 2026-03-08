import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = '97253327125';

const ContactSection = () => {
  const { t, isHebrew } = useLanguage();
  const ref = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isHebrew ? 'שלום רפאל, אני מעוניין לשמוע על שירותי האוטומציה שלך' : 'Hi Refael, I\'m interested in your automation services'
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isHebrew ? 'ההודעה נשלחה!' : 'Message sent!',
      description: isHebrew ? 'אחזור אליך בהקדם' : 'I\'ll get back to you soon',
    });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.name')}</label>
              <Input
                placeholder={t('contact.form.namePlaceholder')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.email')}</label>
              <Input
                type="email"
                placeholder={t('contact.form.emailPlaceholder')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.message')}</label>
              <Textarea
                placeholder={t('contact.form.messagePlaceholder')}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">
              {t('contact.form.send')}
            </Button>
          </form>

          {/* Contact options */}
          <div className="space-y-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-bold text-primary">{t('contact.whatsapp')}</p>
                <p className="text-sm text-muted-foreground">{isHebrew ? 'מענה מהיר בוואטסאפ' : 'Quick response on WhatsApp'}</p>
              </div>
            </a>

            <a
              href="mailto:dsbeauty01@gmail.com"
              className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-primary">{t('contact.email')}</p>
                <p className="text-sm text-muted-foreground">dsbeauty01@gmail.com</p>
              </div>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                <Phone className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-bold text-primary">{t('contact.booking')}</p>
                <p className="text-sm text-muted-foreground">{isHebrew ? 'תיאום שיחה חינם' : 'Free consultation call'}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
