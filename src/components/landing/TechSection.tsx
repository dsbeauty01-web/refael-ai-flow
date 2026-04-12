import { Brain, Search, Calendar, Table, User } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const techStack = [
  { icon: Brain, label: 'AI Brain', sub: 'n8n' },
  { icon: Search, label: 'Vector Search', sub: 'Pinecone' },
  { icon: Calendar, label: 'Google Calendar', sub: 'Booking' },
  { icon: Table, label: 'Google Sheets', sub: 'Data' },
  { icon: User, label: 'D-ID Avatar', sub: 'Video' },
];

const TechSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Under The Hood</span>
          <h2 className="font-hebrew text-4xl sm:text-5xl font-black mt-3 mb-2">מה מתחת למכסה</h2>
          <p className="text-lg text-muted-foreground">What Powers These Bots</p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div dir="rtl">
            <h3 className="font-hebrew text-2xl font-bold mb-3">מה זה RAG?</h3>
            <p className="font-hebrew text-base text-muted-foreground leading-relaxed mb-2">
              טכנולוגיה שמאפשרת לבוט לחפש מידע אמיתי מהעסק שלך ולענות בדיוק.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-6" dir="ltr">
              Technology that lets the bot search your real business data and answer with facts.
            </p>
            <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
              <p className="font-hebrew text-base leading-relaxed mb-2">
                דמיין בוט תמיכה שמכיר כל מוצר בקטלוג של 10,000 פריטים — ועונה תוך 5 שניות.
              </p>
              <p className="text-sm text-muted-foreground" dir="ltr">
                Imagine a support bot that knows every detail of your 10,000-item catalog.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {techStack.map((t, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-5 border border-border card-lift text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <t.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-base font-semibold">{t.label}</p>
                <p className="text-sm text-muted-foreground">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
