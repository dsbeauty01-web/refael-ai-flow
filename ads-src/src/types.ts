export type CamKey = { at: number; v: 'full' | 'low' | 'chat' | 'lead' };

export type ChatEvent =
  | { kind: 'agent'; at: number; text: string; typing?: number }
  | { kind: 'visitor'; at: number; text: string; typeDur?: number };

export type Notif = { at: number; title: string; body: string; time: string };

export type LeadCard = { at: number; rows: [string, string][]; time?: string };

export type SiteKey = 'clinic' | 'studio' | 'pilates';

export type PhoneScene = {
  type: 'phone';
  from: number;
  dur: number;
  cam: CamKey[];
  statusTime: string;
  lock?: { time: string; day: string; wall: 'night' | 'morning' | 'dark'; unlockAt?: number; notifs?: Notif[]; lead?: LeadCard };
  site?: { key: SiteKey; openAt: number; popAt?: number; loadAt?: number; scrollAt?: number; events: ChatEvent[]; banner?: LeadCard & { title?: string } };
  night?: boolean;
};

export type Scene =
  | PhoneScene
  | { type: 'editor'; from: number; dur: number; short?: boolean }
  | { type: 'compare'; from: number; dur: number }
  | { type: 'kinetic'; from: number; dur: number; lines: { at: number; text: string; hl?: boolean; size?: number }[]; sub?: { at: number; text: string } }
  | { type: 'code'; from: number; dur: number }
  | { type: 'offer'; from: number; dur: number }
  | { type: 'badges'; from: number; dur: number }
  | { type: 'chars'; from: number; dur: number }
  | { type: 'multi'; from: number; dur: number }
  | { type: 'langs'; from: number; dur: number }
  | { type: 'end'; from: number; dur: number };

export type CaptionGroup = { at: number; text: string; hl?: boolean };
export type Caption = { from: number; to: number; groups: CaptionGroup[]; size?: number };

export type AudioEv = { at: number; src: string; vol: number };
export type VoiceEv = { at: number; key: string };

export type Spec = {
  id: string;
  file: string;
  dur: number;
  scenes: Scene[];
  captions: Caption[];
  audio: AudioEv[];
  voices: VoiceEv[];
  illus: [number, number][]; // frames where the "המחשה" label shows
  offerStrip?: [number, number];
  srtExtra?: { from: number; to: number; text: string }[];
};
