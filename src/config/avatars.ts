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

/**
 * The clips on this site with sound: Maya actually talking, lip-synced — one per
 * language, so a visitor hears her in THEIR language. The whole pitch is
 * voice-to-voice, so the visitor has to be able to HEAR her.
 *
 * Voices: OpenAI gpt-4o-mini-tts — Hebrew "shimmer", English "coral" — lip-synced
 * onto her own moving footage via fal sync-lipsync/v2. Background is already pure
 * white, so they take the same .blend-white treatment as the silent gesture clips.
 *
 * Thai falls back to the Hebrew clip until fal has credit to render its own take
 * (the Thai "coral" audio is already generated and waiting).
 */
export const MAYA_SPEAKING: Record<'he' | 'en' | 'th', string> = {
  he: "/media/maya_speaking_he.mp4",
  en: "/media/maya_speaking_en.mp4",
  th: "/media/maya_speaking_he.mp4", // TODO: swap to /media/maya_speaking_th.mp4 once fal balance is topped up
};
export const MAYA_SPEAKING_POSTER = "/media/maya_speaking_poster.jpg";

/**
 * Word-for-word transcript of MAYA_SPEAKING. She speaks Hebrew; the en/th
 * entries are translations of the same delivery.
 *
 * This is not decoration — it is the accessibility remedy for the one clip on
 * the site that carries meaning in audio. Keep it in sync with the clip, and
 * keep it in the DOM even when hidden, so screen readers and search engines
 * both get the words.
 */
export const MAYA_SPEAKING_SCRIPT = {
  he: 'שלום, אני מאיה. אני אווטארית חיה בגוף מלא, ואני מדברת עברית אמיתית. אני מקבלת את האורחים שלכם, עונה על שאלות, ומזמנת פגישות ישירות ליומן שלכם. בלי תשלום לפי דקה. רוצים אחת כזאת? דברו עם רפאל.',
  en: "Hello, I'm Maya. I'm a live full-body avatar, and I speak real Hebrew. I greet your visitors, answer questions, and book meetings straight into your calendar. With no per-minute billing. Want one of your own? Talk to Refael.",
  th: 'สวัสดีค่ะ ฉันชื่อมายา ฉันเป็นอวตารเสมือนจริงแบบเต็มตัว และฉันพูดภาษาฮีบรูได้จริง ฉันต้อนรับผู้มาเยือนของคุณ ตอบคำถาม และนัดหมายลงในปฏิทินของคุณโดยตรง โดยไม่คิดค่าบริการรายนาที อยากมีสักคนไหม? คุยกับราฟาเอลได้เลย',
} as const;
export const MAYA_GESTURES = [
  { key: "wave",       src: "/media/maya_wave.mp4",       he: "נפנוף",        en: "Wave",    th: "โบกมือ" },
  { key: "welcome",    src: "/media/maya_welcome.mp4",    he: "ברוכים הבאים", en: "Welcome", th: "ต้อนรับ" },
  { key: "nod",        src: "/media/maya_nod.mp4",        he: "הנהון",        en: "Nod",     th: "พยักหน้า" },
  { key: "point_left", src: "/media/maya_point_left.mp4", he: "הצבעה",        en: "Point",   th: "ชี้บอกทาง" },
  { key: "goodbye",    src: "/media/maya_goodbye.mp4",    he: "להתראות",      en: "Goodbye", th: "ลาก่อน" },
] as const;

export const WHATSAPP_URL = "https://wa.me/972533217125";

/** Single source of truth for the business details shown in legal pages + footer. */
export const BUSINESS = {
  name: 'Refael Sela',
  nameHe: 'רפאל סלע',
  /** עוסק פטור — sole proprietor, not an incorporated company. */
  entityHe: 'עוסק פטור',
  entityEn: 'Sole proprietor (Osek Patur)',
  entityTh: 'ผู้ประกอบการรายบุคคล (Osek Patur)',
  email: 'dsbeauty01@gmail.com',
  phone: '+972-53-321-7125',
  site: 'refael.ai',
} as const;

// Existing n8n lead webhook (reused from previous project wiring)
export const N8N_LEAD_WEBHOOK = "https://rafa5555.app.n8n.cloud/webhook/lead-email";