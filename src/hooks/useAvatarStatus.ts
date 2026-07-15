import { useEffect, useState } from "react";

export type AvatarStatus = "checking" | "live" | "offline";

export function useAvatarStatus(podUrl: string | null, intervalMs = 60000): AvatarStatus {
  const [status, setStatus] = useState<AvatarStatus>(podUrl ? "checking" : "offline");

  useEffect(() => {
    if (!podUrl) { setStatus("offline"); return; }
    let cancelled = false;

    async function check() {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3000);
        const res = await fetch(`${podUrl}/health`, { signal: ctrl.signal, cache: "no-store" });
        clearTimeout(t);
        if (!cancelled) setStatus(res.ok ? "live" : "offline");
      } catch {
        if (!cancelled) setStatus("offline");
      }
    }

    check();
    const id = setInterval(check, intervalMs);
    return () => { cancelled = true; clearInterval(id); };
  }, [podUrl, intervalMs]);

  return status;
}