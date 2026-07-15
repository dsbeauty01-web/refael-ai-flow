import type { AvatarStatus } from '@/hooks/useAvatarStatus';
import { useT } from './i18n';

export default function StatusBadge({ status }: { status: AvatarStatus }) {
  const { pick } = useT();
  if (status === 'checking') {
    return (
      <span className="inline-flex items-center gap-2 text-[0.72rem] tracking-widest uppercase text-muted-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-offline" />
        {pick('בודק זמינות…', 'Checking availability…')}
      </span>
    );
  }
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-2 text-[0.72rem] tracking-widest uppercase text-foreground">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-live-gradient animate-live-pulse" />
          <span className="relative rounded-full w-2 h-2 bg-live-gradient" />
        </span>
        <span className="text-live-gradient font-semibold">{pick('חי עכשיו', 'Live now')}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-[0.72rem] tracking-widest uppercase text-muted-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-offline" />
      {pick('דמו מוקלט · האווטאר החי זמין בתיאום', 'Recorded demo · live avatar available on request')}
    </span>
  );
}