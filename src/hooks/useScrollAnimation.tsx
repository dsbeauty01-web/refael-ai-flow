import { useEffect, useRef } from 'react';

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up');
          el.style.opacity = '1';
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    el.style.opacity = '0';
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
