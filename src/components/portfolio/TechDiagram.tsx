import { useInView } from '@/hooks/useInView';

const nodes = [
  { label: 'Customer', emoji: '👤' },
  { label: 'Talking Avatar', sub: 'D-ID', emoji: '🎭' },
  { label: 'AI Brain', sub: 'n8n', emoji: '🧠' },
  { label: 'Your Tools', emoji: '🔧' },
];

const tools = [
  'Google Calendar',
  'Google Sheets',
  'Pinecone Vector DB',
  'OpenAI GPT',
  'Gmail',
];

const TechDiagram = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-16" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">What Powers These Bots</h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          A look under the hood at the architecture
        </p>

        {/* Flow diagram */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {nodes.map((node, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center bg-card border border-border rounded-xl px-5 py-4 min-w-[120px] hover:glow-border transition-all">
                <span className="text-2xl mb-1">{node.emoji}</span>
                <span className="text-sm font-semibold text-foreground">{node.label}</span>
                {node.sub && <span className="text-xs text-muted-foreground">{node.sub}</span>}
              </div>
              {i < nodes.length - 1 && (
                <div className="hidden sm:block w-8 h-px bg-primary/40 mx-1 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tool badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tools.map((tool) => (
            <span key={tool} className="text-xs px-4 py-2 rounded-full bg-secondary border border-border text-secondary-foreground font-medium">
              {tool}
            </span>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          Every bot is custom-built with n8n workflows. The AI brain connects to your real business tools — calendar, inventory, CRM, email. No templates. No limitations.
        </p>
      </div>
    </section>
  );
};

export default TechDiagram;
