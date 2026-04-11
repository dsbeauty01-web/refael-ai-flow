import { useInView } from '@/hooks/useInView';
import { useEffect, useState } from 'react';

const stats = [
  { value: '24/7', label: 'Always on, never misses a lead', isNum: false },
  { value: '30', suffix: 's', label: 'Average response time', isNum: true },
  { value: '0', prefix: '₪', label: 'No extra staff costs', isNum: true },
  { value: '10', suffix: 'x', label: 'More leads captured', isNum: true },
];

const AnimatedNumber = ({ target, prefix, suffix, inView }: { target: string; prefix?: string; suffix?: string; inView: boolean }) => {
  const [val, setVal] = useState(0);
  const num = parseInt(target);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = num;
    const duration = 1200;
    const step = Math.max(1, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setVal(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, num]);

  return <span>{prefix}{val}{suffix}</span>;
};

const StatsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-16" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Results That Matter</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center bg-card border border-border rounded-2xl p-6 transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-gradient-gold mb-2">
                {s.isNum ? (
                  <AnimatedNumber target={s.value} prefix={s.prefix} suffix={s.suffix} inView={inView} />
                ) : (
                  s.value
                )}
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
