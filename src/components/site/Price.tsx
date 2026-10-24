import type { ReactNode } from 'react';
import { SHOW_PRICES } from '@/config/site';

/**
 * Every price on the site goes through here. With SHOW_PRICES off (Refael's rule:
 * no public or monthly prices), the price renders `fallback` instead — or nothing.
 */
export default function Price({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return <>{SHOW_PRICES ? children : fallback}</>;
}

export { SHOW_PRICES };
