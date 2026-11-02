export function WhatsAppGlyph({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z" />
    </svg>
  );
}

export function LineGlyph({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2C6.48 2 2 5.93 2 10.74c0 4.33 3.84 7.95 9.03 8.64.35.08.83.24.95.54.11.28.07.71.04 1l-.15.91c-.05.28-.22 1.1.97.6 1.18-.5 6.38-3.76 8.71-6.44C23.23 14.04 22 12.52 22 10.74 22 5.93 17.52 2 12 2zm-3.39 11.26h-2.2a.53.53 0 0 1-.53-.53V8.78a.53.53 0 1 1 1.06 0v3.42h1.67a.53.53 0 0 1 0 1.06zm1.55-.53a.53.53 0 1 1-1.06 0V8.78a.53.53 0 1 1 1.06 0v3.95zm3.59 0a.53.53 0 0 1-.38.51.53.53 0 0 1-.56-.17l-2-2.72v2.38a.53.53 0 1 1-1.06 0V8.78a.53.53 0 0 1 .94-.34l2 2.72V8.78a.53.53 0 1 1 1.06 0v3.95zm3.07-2.89a.53.53 0 0 1 0 1.06h-1.67v.77h1.67a.53.53 0 0 1 0 1.06h-2.2a.53.53 0 0 1-.53-.53V8.78a.53.53 0 0 1 .53-.53h2.2a.53.53 0 0 1 0 1.06h-1.67v.53h1.67z" />
    </svg>
  );
}

export function SpeakerGlyph({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
  );
}
