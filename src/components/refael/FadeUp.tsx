import { PropsWithChildren } from 'react';

/**
 * Used to hide every section at opacity 0 until a scroll observer fired, which meant
 * crawlers, link previews and anyone who didn't scroll saw a blank page below the
 * hero. Content is now visible on first paint; the wrapper stays so the ~30 call
 * sites keep their layout classes.
 */
export default function FadeUp({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>;
}
