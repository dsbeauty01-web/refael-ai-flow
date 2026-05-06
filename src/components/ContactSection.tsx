import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail, Phone, Send } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const MESSENGER_URL = 'https://www.facebook.com/refael.silanikove';

const ContactSection = () => {
  const { t, isHebrew } = useLanguage();
  const ref = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '' });

  const messengerUrl = MESSENGER_URL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isHebrew ? 'ההודעה נשלחה!' : 'Message sent!',
      description: isHebrew ? 'אחזור אליך בהקדם' : 'I\'ll get back to you soon',
    });
    setForm({ name: '', email: '', phone: '', business: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding bg-secondary/50" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{t('contact.title')}</h2>
        </div>
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-4">
          {t('contact.subtitle')}
        </p>
        <p className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
          {t('contact.description')}
        </p>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5 p-8 rounded-2xl bg-card border border-border">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t('contact.form.name')}</label>
                <Input
                  placeholder={t('contact.form.namePlaceholder')}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t('contact.form.email')}</label>
                <Input
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t('contact.form.phone')}</label>
                <Input
                  placeholder={t('contact.form.phonePlaceholder')}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t('contact.form.business')}</label>
                <Input
                  placeholder={t('contact.form.businessPlaceholder')}
                  value={form.business}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t('contact.form.message')}</label>
              <Textarea
                placeholder={t('contact.form.messagePlaceholder')}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                required
                className="rounded-xl"
              />
            </div>
            <Button type="submit" className="w-full gradient-accent text-accent-foreground font-bold h-14 rounded-xl text-base hover:opacity-90 transition-opacity">
              <Send className="h-5 w-5" />
              {t('contact.form.send')}
            </Button>
          </form>

          {/* Contact options */}
          <div className="lg:col-span-2 space-y-5">
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shrink-0">
                <MessageCircle className="h-7 w-7 text-accent-foreground" />
              </div>
              <div>
                <p className="font-bold text-primary text-lg">{t('contact.whatsapp')}</p>
                <p className="text-sm text-muted-foreground">{t('contact.whatsappSub')}</p>
              </div>
            </a>

            <a
              href="mailto:dsbeauty01@gmail.com"
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                <Mail className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-primary text-lg">{t('contact.email')}</p>
                <p className="text-sm text-muted-foreground">{t('contact.emailSub')}</p>
              </div>
            </a>

            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shrink-0">
                <Phone className="h-7 w-7 text-accent-foreground" />
              </div>
              <div>
                <p className="font-bold text-primary text-lg">{t('contact.booking')}</p>
                <p className="text-sm text-muted-foreground">{t('contact.bookingSub')}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
