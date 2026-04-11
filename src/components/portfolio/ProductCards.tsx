import { useInView } from '@/hooks/useInView';
import { Brain, CalendarDays, Drama } from 'lucide-react';

const cards = [
  {
    icon: Brain,
    emoji: '🧠',
    title: 'Smart AI Assistant',
    desc: 'An AI brain connected to your business data. It knows your products, prices, policies — and answers customers instantly.',
    tags: ['Product Recommendations', 'FAQ', 'Inventory Lookup'],
    label: 'RAG + Knowledge Base',
  },
  {
    icon: CalendarDays,
    emoji: '🗓️',
    title: 'AI Receptionist',
    desc: 'A virtual receptionist that books appointments, checks availability, and collects customer details — automatically.',
    tags: ['Google Calendar', 'Voice Input', '24/7'],
    label: 'Appointment Booking',
  },
  {
    icon: Drama,
    emoji: '🎭',
    title: 'Talking Avatar',
    desc: 'A realistic AI face that speaks to your customers. Not a chatbot — a conversation.',
    tags: ['Voice Output', 'Lip-sync', 'Personalized Greetings'],
    label: 'D-ID Avatar',
  },
];

const ProductCards = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-16" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">What I Build</h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          Custom AI solutions that work like a real team member
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-card border border-border rounded-2xl p-6 hover:glow-border transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="text-4xl mb-4 block">{card.emoji}</span>
              <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-2">
                {card.label}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{card.desc}</p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
