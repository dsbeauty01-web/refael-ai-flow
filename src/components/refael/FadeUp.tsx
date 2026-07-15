import { useInView } from '@/hooks/useInView';
import { PropsWithChildren } from 'react';

export default function FadeUp({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const { ref, inView } = useInView(0.12);
  return (
    <div ref={ref} className={`fade-up-init ${inView ? 'fade-up-in' : ''} ${className}`}>
      {children}
    </div>
  );
}