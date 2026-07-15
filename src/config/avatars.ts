export type AvatarConfig = {
  id: string;
  podUrl: string | null;   // RunPod HTTPS proxy base, e.g. "https://<POD_ID>-8080.proxy.runpod.net" — null = no pod assigned
  kioskUrl: string | null; // full URL of the live kiosk page for this avatar
  videoUrl: string;        // local fallback demo video
  posterUrl?: string;      // still image shown while loading / if the video is missing
};

export const AVATARS: Record<string, AvatarConfig> = {
  nova_v2:    { id: "nova_v2",    podUrl: null, kioskUrl: null, videoUrl: "/media/maya_welcome.mp4", posterUrl: "/media/maya_poster.jpg" },
  nova_dance: { id: "nova_dance", podUrl: null, kioskUrl: null, videoUrl: "/demos/nova_dance.mp4",   posterUrl: "/mia.png" },
  nova_close: { id: "nova_close", podUrl: null, kioskUrl: null, videoUrl: "/media/nova_close.mp4",   posterUrl: "/media/nova_close_poster.jpg" },
};

// Maya's gesture bank — real clips from the production system, used by the interactive hero
export const MAYA_IDLE = "/media/maya_idle.mp4";
export const MAYA_POSTER = "/media/maya_poster.jpg";
export const MAYA_GESTURES = [
  { key: "wave",       src: "/media/maya_wave.mp4",       he: "נפנוף",        en: "Wave" },
  { key: "welcome",    src: "/media/maya_welcome.mp4",    he: "ברוכים הבאים", en: "Welcome" },
  { key: "nod",        src: "/media/maya_nod.mp4",        he: "הנהון",        en: "Nod" },
  { key: "point_left", src: "/media/maya_point_left.mp4", he: "הצבעה",        en: "Point" },
  { key: "goodbye",    src: "/media/maya_goodbye.mp4",    he: "להתראות",      en: "Goodbye" },
] as const;

// TODO: replace with real WhatsApp number
export const WHATSAPP_URL = "https://wa.me/972000000000";

// Existing n8n lead webhook (reused from previous project wiring)
export const N8N_LEAD_WEBHOOK = "https://rafa5555.app.n8n.cloud/webhook/lead-email";