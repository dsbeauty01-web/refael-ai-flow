// Brand + layout constants for the Refael.ai Meta ad pack.
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const s = (sec: number) => Math.round(sec * FPS);

export const C = {
  paper: '#080B12',
  ink: '#E8EEF7',
  mist: '#141B29',
  muted: '#8B97AA',
  cyan: '#00B8D9',
  violet: '#7C5CF0',
  grad: 'linear-gradient(90deg, #00B8D9, #7C5CF0)',
  gradText: 'linear-gradient(90deg, #22CBEA, #9A80FF)',
  ring: 'conic-gradient(from 180deg, #00b8d9, #7c5cf0, #00b8d9)',
  green: '#25B865',
};

export const F = {
  rubik: '"Rubik", "Noto Sans Thai", sans-serif',
  assistant: '"Assistant", "Rubik", "Noto Sans Thai", sans-serif',
  suez: '"Suez One", "Rubik", serif',
  mono: '"JetBrains Mono", monospace',
};

// Safe band for load-bearing content (Reels: top 14%, bottom 35%; 4:5 centre crop y 285..1635)
export const SAFE = { top: 285, bottom: 1248 };

// Phone geometry in phone units
export const PH = { w: 760, h: 1600, r: 96, bezel: 16 };
export const SCR = { w: PH.w - PH.bezel * 2, h: PH.h - PH.bezel * 2 };

export type View = { S: number; top: number; cx: number };
export const VIEWS: Record<string, View> = {
  full: { S: 0.8, top: 560, cx: 540 },
  low: { S: 0.8, top: 600, cx: 540 },
  chat: { S: 1.12, top: -516, cx: 540 },
  lead: { S: 0.86, top: 470, cx: 540 },
};

// Voice lines: text as shown/sub-titled, trimmed wav duration, lip-sync clip duration (s)
export const VO: Record<string, { text: string; dur: number; clip: number }> = {
  A1: { text: 'היי! אפשר לעזור?', dur: 1.474, clip: 2.56 },
  A1L: { text: 'היי, אני העוזרת הדיגיטלית של הקליניקה. אפשר לעזור?', dur: 3.888, clip: 4.48 },
  A2: { text: '450 שקל לטיפול. לשמור לך שיחת ייעוץ?', dur: 3.919, clip: 4.48 },
  A3: { text: 'רשמתי, דנה. הקליניקה תחזור אלייך בבוקר.', dur: 3.293, clip: 3.84 },
  A4: { text: 'בשבת אנחנו סגורים. ביום ראשון יש תור פנוי בעשר. לשמור לך?', dur: 5.29, clip: 5.76 },
  B1: { text: 'היי, אני העוזרת החדשה שלכם באתר.', dur: 2.802, clip: 3.84 },
  B2: { text: 'כן, יש מחר בחמש. לשמור לך?', dur: 2.799, clip: 3.84 },
  C1: { text: 'בטח! יש מחר בשמונה בבוקר. לשמור לך מקום?', dur: 4.443, clip: 5.12 },
  C2: { text: 'Hi! I can help you in English too.', dur: 2.08, clip: 2.56 },
  E: { text: 'רוצים לראות אותי על האתר שלכם?', dur: 2.398, clip: 3.2 },
};
// The lip-sync clips carry 0.12 s of lead silence: start the clip this many frames before the audio.
export const LS_LEAD = 4;
export const IDLE_FRAMES = 138; // 4.6 s seamless idle loop
