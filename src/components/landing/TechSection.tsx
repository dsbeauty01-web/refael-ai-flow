import { Brain, Search, Calendar, Table, User } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const techStack = [
  { icon: Brain, he: 'מוח AI', en: 'AI Brain', sub: 'n8n' },
  { icon: Search, he: 'חיפוש וקטורי', en: 'Vector Search', sub: 'Pinecone' },
  { icon: Calendar, he: 'יומן גוגל', en: 'Google Calendar', sub: 'Booking' },
  { icon: Table, he: 'גיליונות גוגל', en: 'Google Sheets', sub: 'Data' },
  { icon: User, he: 'אווטאר D-ID', en: 'D-ID Avatar', sub: 'Video' },
];

const TechSection = () => {
  const { ref, inView } = useInView();
  const { isHebrew } = useLanguage();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[0.85rem] font-semibold uppercase tracking-widest text-accent">
            {isHebrew ? 'מתחת למכסה' : 'Under The Hood'}
          </span>
          <h2 className={`text-[3.5rem] font-black mt-3 mb-1 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            {isHebrew ? 'מה מתחת למכסה' : 'What Powers These Bots'}
          </h2>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div dir={isHebrew ? 'rtl' : 'ltr'}>
            <h3 className={`text-[1.5rem] font-bold mb-3 ${isHebrew ? 'font-hebrew' : ''}`}>
              {isHebrew ? 'מה זה RAG?' : 'What is RAG?'}
            </h3>
            <p className={`text-[1.1rem] text-muted-foreground leading-relaxed mb-6 ${isHebrew ? 'font-hebrew' : ''}`}>
              {isHebrew
                ? 'טכנולוגיה שמאפשרת לבוט לחפש מידע אמיתי מהעסק שלך ולענות בדיוק.'
                : 'Technology that lets the bot search your real business data and answer with facts.'}
            </p>
            <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
              <p className={`text-[1.1rem] leading-relaxed ${isHebrew ? 'font-hebrew' : ''}`}>
                {isHebrew
                  ? 'דמיין בוט תמיכה שמכיר כל מוצר בקטלוג של 10,000 פריטים — ועונה תוך 5 שניות.'
                  : 'Imagine a support bot that knows every detail of your 10,000-item catalog — and answers in 5 seconds.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {techStack.map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border border-border card-float text-center">
                <div className="w-[40px] h-[40px] rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <t.icon className="h-[40px] w-[40px] text-primary" />
                </div>
                <p className={`text-[1rem] font-semibold ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? t.he : t.en}
                </p>
                <p className="text-[0.85rem] text-muted-foreground mt-1">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
