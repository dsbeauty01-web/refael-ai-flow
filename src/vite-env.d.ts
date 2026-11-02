/// <reference types="vite/client" />

// Analytics globals injected by index.html scripts
interface Window {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
