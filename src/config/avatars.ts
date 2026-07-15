export type AvatarConfig = {
  id: string;
  podUrl: string | null;   // RunPod HTTPS proxy base, e.g. "https://<POD_ID>-8080.proxy.runpod.net" — null = no pod assigned
  kioskUrl: string | null; // full URL of the live kiosk page for this avatar
  videoUrl: string;        // local fallback demo video, e.g. "/demos/maya.mp4"
};

export const AVATARS: Record<string, AvatarConfig> = {
  nova_v2:    { id: "nova_v2",    podUrl: null, kioskUrl: null, videoUrl: "/demos/maya.mp4" },
  nova_dance: { id: "nova_dance", podUrl: null, kioskUrl: null, videoUrl: "/demos/nova_dance.mp4" },
  nova_close: { id: "nova_close", podUrl: null, kioskUrl: null, videoUrl: "/demos/nova_close.mp4" },
};

// TODO: replace with real WhatsApp number
export const WHATSAPP_URL = "https://wa.me/972000000000";

// Existing n8n lead webhook (reused from previous project wiring)
export const N8N_LEAD_WEBHOOK = "https://rafa5555.app.n8n.cloud/webhook/lead-email";