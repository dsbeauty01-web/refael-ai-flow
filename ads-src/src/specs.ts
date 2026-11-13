import { VO, FPS } from './theme';
import type { Caption, CaptionGroup, ChatEvent, PhoneScene, Scene, Spec } from './types';

/* ------------------------------------------------------------------ builder */
class B {
  spec: Spec;
  constructor(id: string, file: string, dur: number) {
    this.spec = { id, file, dur, scenes: [], captions: [], audio: [], voices: [], illus: [] };
    this.sfx(0, 'room', 0.05);
  }
  sfx(at: number, name: string, vol = 0.5) {
    this.spec.audio.push({ at, src: `sfx/${name}.wav`, vol });
  }
  voice(at: number, key: string) {
    this.spec.voices.push({ at, key });
    this.spec.audio.push({ at, src: `vo/${key}.wav`, vol: 1 });
  }
  cap(from: number, to: number, groups: [number, string, boolean?][], size?: number) {
    const g: CaptionGroup[] = groups.map(([at, text, hl]) => ({ at, text, hl }));
    this.spec.captions.push({ from, to, groups: g, size } as Caption);
  }
  typing(a: number, b: number) {
    for (let t = a, i = 0; t < b; t += 2 + (i % 3 === 0 ? 1 : 0), i++) this.sfx(t, `key${i % 6}`, 0.22);
  }
  scene(sc: Scene) {
    this.spec.scenes.push(sc);
    if (sc.from > 0) this.sfx(Math.max(0, sc.from - 3), sc.type === 'end' ? 'swoosh' : 'whoosh', 0.42);
    if (sc.type === 'phone') this.phoneSfx(sc);
    return sc;
  }
  /** UI sounds for a phone scene (all times in the scene are relative). */
  phoneSfx(sc: PhoneScene) {
    const o = sc.from;
    if (sc.lock?.unlockAt != null) this.sfx(o + sc.lock.unlockAt - 2, 'swoosh', 0.5);
    for (const n of sc.lock?.notifs ?? []) this.sfx(o + Math.max(1, n.at), 'ping', 0.42);
    if (sc.lock?.lead) this.sfx(o + sc.lock.lead.at, 'ding', 0.55);
    const st = sc.site;
    if (!st) return;
    const popAt = st.popAt ?? st.openAt;
    if (popAt >= 0) this.sfx(o + popAt, 'pop', 0.55);
    for (const e of st.events as ChatEvent[]) {
      if (e.at < 0) continue;
      if (e.kind === 'visitor') {
        if (e.typeDur) this.typing(o + e.at - e.typeDur, o + e.at - 2);
        this.sfx(o + e.at, 'send', 0.3);
      } else this.sfx(o + e.at, 'pop', 0.2);
    }
    if (st.banner) this.sfx(o + st.banner.at, 'ding', 0.55);
  }
  done() {
    return this.spec;
  }
}

/* ------------------------------------------------------------------ shared bits */
const LEAD_DANA: [string, string][] = [
  ['שם', 'דנה'],
  ['טלפון', '052-555-0147'],
  ['מתעניינת ב', 'הסרת שיער בלייזר'],
];
const LEAD_RON: [string, string][] = [
  ['שם', 'רון'],
  ['טלפון', '054-555-0192'],
  ['רוצה', 'תספורת, מחר ב־17:00'],
];
const LEAD_ORIT: [string, string][] = [
  ['שם', 'אורית'],
  ['טלפון', '050-555-0163'],
  ['רוצה', 'שיעור ניסיון'],
];
const Q_PRICE = 'כמה עולה הסרת שיער בלייזר?';
const A_PRICE = '₪450 לטיפול. לשמור לך שיחת ייעוץ?';
const Q_NIGHT = 'אפשר שיעור ניסיון מחר? אורית, 050-555-0163';
const NOTIFS = [
  { at: 0, title: 'צ׳אט האתר', body: 'היי, אפשר לקבוע שיעור ניסיון?', time: '23:41' },
  { at: 14, title: 'צ׳אט האתר', body: 'כמה עולה מנוי חודשי?', time: '00:18' },
  { at: 28, title: 'צ׳אט האתר', body: 'אתם פתוחים בשישי?', time: '01:02' },
  { at: 42, title: 'צ׳אט האתר', body: 'שלום? יש פה מישהו?', time: '01:36' },
];
const vf = (k: string) => Math.round(VO[k].dur * FPS);

/* ================================================================== 1. 23:04 */
function c2304_15(): Spec {
  const b = new B('RA-2304-15s', 'RA_2304_15s_9x16_he', 450);
  b.scene({
    type: 'phone', from: 0, dur: 300, statusTime: '23:04', night: true,
    cam: [{ at: 0, v: 'full' }, { at: 64, v: 'chat' }],
    lock: { time: '23:04', day: 'יום שלישי', wall: 'night', unlockAt: 30 },
    site: {
      key: 'clinic', scrollAt: 40, popAt: 66, openAt: 72,
      events: [
        { kind: 'agent', at: 82, text: 'היי! אפשר לעזור?' },
        { kind: 'visitor', at: 150, text: Q_PRICE, typeDur: 24 },
        { kind: 'agent', at: 160, text: A_PRICE, typing: 8 },
        { kind: 'visitor', at: 282, text: 'דנה, 052-555-0147', typeDur: 18 },
        { kind: 'agent', at: 291, text: 'רשמתי! הקליניקה תחזור אלייך בבוקר.', typing: 5 },
      ],
    },
  });
  b.voice(80, 'A1');
  b.voice(158, 'A2');
  b.scene({ type: 'phone', from: 300, dur: 75, statusTime: '07:30', cam: [{ at: 0, v: 'lead' }], lock: { time: '07:30', day: 'יום רביעי', wall: 'morning', lead: { at: 10, rows: LEAD_DANA, time: '23:05' } } });
  b.scene({ type: 'end', from: 375, dur: 75 });
  b.voice(376, 'E');
  b.cap(0, 64, [[0, '23:04.', true], [0, 'מישהי בודקת'], [0, 'את האתר שלכם.']]);
  b.cap(68, 150, [[70, 'והאתר עונה לה.'], [80, 'בקול.', true]], 70);
  b.cap(150, 262, [[152, 'לפי המחירון'], [160, 'שלכם.', true]], 70);
  b.cap(262, 300, [[264, 'ושומרת'], [270, 'את הפרטים.', true]], 70);
  b.cap(300, 375, [[302, 'הליד מחכה לכם'], [312, 'בבוקר.', true]]);
  b.spec.illus = [[0, 375]];
  return b.done();
}

function c2304_7(): Spec {
  const b = new B('RA-2304-7s', 'RA_2304_7s_9x16_he', 210);
  b.scene({
    type: 'phone', from: 0, dur: 135, statusTime: '23:04', night: true,
    cam: [{ at: 0, v: 'full' }, { at: 34, v: 'chat' }],
    lock: { time: '23:04', day: 'יום שלישי', wall: 'night', unlockAt: 16 },
    site: {
      key: 'clinic', popAt: 36, openAt: 42,
      events: [
        { kind: 'agent', at: 50, text: 'היי! אפשר לעזור?' },
        { kind: 'visitor', at: 100, text: Q_PRICE, typeDur: 14 },
        { kind: 'agent', at: 112, text: A_PRICE, typing: 6 },
      ],
    },
  });
  b.voice(48, 'A1');
  b.scene({ type: 'end', from: 135, dur: 75 });
  b.voice(137, 'E');
  b.cap(0, 34, [[0, '23:04.', true], [0, 'מישהי בודקת'], [0, 'את האתר שלכם.']]);
  b.cap(38, 135, [[40, 'והאתר עונה לה.'], [50, 'בקול.', true]], 70);
  b.spec.illus = [[0, 135]];
  return b.done();
}

function c2304_long(): Spec {
  const b = new B('RA-2304-38s', 'RA_2304_38s_9x16_he', 1140);
  b.scene({
    type: 'phone', from: 0, dur: 490, statusTime: '23:04', night: true,
    cam: [{ at: 0, v: 'full' }, { at: 64, v: 'chat' }],
    lock: { time: '23:04', day: 'יום שלישי', wall: 'night', unlockAt: 30 },
    site: {
      key: 'clinic', scrollAt: 40, popAt: 66, openAt: 72,
      events: [
        { kind: 'agent', at: 82, text: VO.A1L.text },
        { kind: 'visitor', at: 228, text: Q_PRICE, typeDur: 24 },
        { kind: 'agent', at: 238, text: A_PRICE, typing: 8 },
        { kind: 'visitor', at: 378, text: 'דנה, 052-555-0147', typeDur: 20 },
        { kind: 'agent', at: 388, text: VO.A3.text, typing: 6 },
      ],
    },
  });
  b.voice(80, 'A1L');
  b.voice(236, 'A2');
  b.voice(386, 'A3');
  b.scene({ type: 'phone', from: 490, dur: 90, statusTime: '07:30', cam: [{ at: 0, v: 'lead' }], lock: { time: '07:30', day: 'יום רביעי', wall: 'morning', lead: { at: 10, rows: LEAD_DANA, time: '23:06' } } });
  b.scene({
    type: 'phone', from: 580, dur: 185, statusTime: '21:40', night: true,
    cam: [{ at: 0, v: 'chat' }],
    site: {
      key: 'clinic', popAt: -40, openAt: -40,
      events: [
        { kind: 'agent', at: -40, text: 'היי! אפשר לעזור?' },
        { kind: 'visitor', at: 18, text: 'אתם פתוחים בשבת?', typeDur: 16 },
        { kind: 'agent', at: 28, text: VO.A4.text, typing: 8 },
      ],
    },
  });
  b.voice(606, 'A4');
  b.scene({ type: 'kinetic', from: 765, dur: 90, lines: [{ at: 2, text: 'עונה בקול.' }, { at: 14, text: 'בעברית.', hl: true }, { at: 26, text: '24/7.' }] });
  [767, 779, 791].forEach((t) => b.sfx(t, 'pop', 0.4));
  b.scene({ type: 'code', from: 855, dur: 105 });
  b.typing(859, 881);
  b.scene({ type: 'offer', from: 960, dur: 105 });
  [964, 978, 992, 1008].forEach((t) => b.sfx(t, 'pop', 0.4));
  b.scene({ type: 'end', from: 1065, dur: 75 });
  b.voice(1067, 'E');
  b.cap(0, 64, [[0, '23:04.', true], [0, 'מישהי בודקת'], [0, 'את האתר שלכם.']]);
  b.cap(68, 228, [[70, 'והאתר עונה לה.'], [80, 'בקול.', true]], 70);
  b.cap(228, 330, [[230, 'לפי המחירון'], [238, 'שלכם.', true]], 70);
  b.cap(490, 580, [[492, 'הליד מחכה לכם'], [502, 'בבוקר.', true]]);
  b.cap(580, 765, [[584, 'גם שאלות על'], [592, 'שעות פתיחה.', true]], 70);
  b.spec.offerStrip = [330, 490];
  b.spec.illus = [[0, 765]];
  return b.done();
}

/* ================================================================== 2. one line */
const studioEvents = (o: number): ChatEvent[] => [
  { kind: 'agent', at: o + 44, text: VO.B1.text },
  { kind: 'visitor', at: o + 150, text: 'יש תור לתספורת מחר?', typeDur: 20 },
  { kind: 'agent', at: o + 160, text: VO.B2.text, typing: 8 },
  { kind: 'visitor', at: o + 250, text: 'רון, 054-555-0192', typeDur: 16 },
];

function cline_15(): Spec {
  const b = new B('RA-line-15s', 'RA_line_15s_9x16_he', 450);
  b.scene({ type: 'editor', from: 0, dur: 78 });
  b.sfx(10, 'tap', 0.4);
  b.typing(14, 48);
  b.sfx(58, 'tap', 0.45);
  b.scene({
    type: 'phone', from: 78, dur: 297, statusTime: '10:12',
    cam: [{ at: 0, v: 'full' }, { at: 32, v: 'chat' }, { at: 254, v: 'full' }],
    site: { key: 'studio', loadAt: 4, popAt: 34, openAt: 40, events: studioEvents(0), banner: { at: 262, rows: LEAD_RON } },
  });
  b.voice(78 + 42, 'B1');
  b.voice(78 + 158, 'B2');
  b.scene({ type: 'end', from: 375, dur: 75 });
  b.voice(376, 'E');
  b.cap(0, 78, [[0, 'הדבקתם'], [0, 'שורה אחת.', true]]);
  b.cap(80, 206, [[82, 'ובפינת האתר'], [92, 'מופיעה עוזרת.', true]], 70);
  b.cap(206, 375, [[208, 'והאתר עונה ללקוחות.'], [222, 'בקול.', true]], 66);
  b.spec.illus = [[0, 375]];
  return b.done();
}

function cline_7(): Spec {
  const b = new B('RA-line-8s', 'RA_line_8s_9x16_he', 235);
  b.scene({ type: 'editor', from: 0, dur: 50, short: true });
  b.sfx(7, 'tap', 0.4);
  b.typing(10, 34);
  b.sfx(41, 'tap', 0.45);
  b.scene({
    type: 'phone', from: 50, dur: 110, statusTime: '10:12',
    cam: [{ at: 0, v: 'full' }, { at: 24, v: 'chat' }],
    site: { key: 'studio', loadAt: 2, popAt: 22, openAt: 28, events: [{ kind: 'agent', at: 30, text: VO.B1.text }] },
  });
  b.voice(50 + 28, 'B1');
  b.scene({ type: 'end', from: 160, dur: 75 });
  b.voice(162, 'E');
  b.cap(0, 50, [[0, 'הדבקתם'], [0, 'שורה אחת.', true]]);
  b.cap(52, 160, [[54, 'והאתר'], [62, 'מתחיל לדבר.', true]], 70);
  b.spec.illus = [[0, 160]];
  return b.done();
}

function cline_long(): Spec {
  const b = new B('RA-line-31s', 'RA_line_31s_9x16_he', 915);
  b.scene({ type: 'editor', from: 0, dur: 78 });
  b.sfx(10, 'tap', 0.4);
  b.typing(14, 48);
  b.sfx(58, 'tap', 0.45);
  b.scene({
    type: 'phone', from: 78, dur: 297, statusTime: '10:12',
    cam: [{ at: 0, v: 'full' }, { at: 32, v: 'chat' }, { at: 254, v: 'full' }],
    site: { key: 'studio', loadAt: 4, popAt: 34, openAt: 40, events: studioEvents(0), banner: { at: 262, rows: LEAD_RON } },
  });
  b.voice(78 + 42, 'B1');
  b.voice(78 + 158, 'B2');
  b.scene({ type: 'badges', from: 375, dur: 120 });
  [385, 391, 397, 403, 409].forEach((t) => b.sfx(t, 'pop', 0.32));
  b.scene({ type: 'chars', from: 495, dur: 120 });
  [507, 513].forEach((t) => b.sfx(t, 'pop', 0.35));
  b.scene({ type: 'langs', from: 615, dur: 120 });
  b.voice(640, 'C2');
  b.scene({ type: 'offer', from: 735, dur: 105 });
  [739, 753, 767, 783].forEach((t) => b.sfx(t, 'pop', 0.4));
  b.scene({ type: 'end', from: 840, dur: 75 });
  b.voice(842, 'E');
  b.cap(0, 78, [[0, 'הדבקתם'], [0, 'שורה אחת.', true]]);
  b.cap(80, 206, [[82, 'ובפינת האתר'], [92, 'מופיעה עוזרת.', true]], 70);
  b.cap(206, 330, [[208, 'והאתר עונה ללקוחות.'], [222, 'בקול.', true]], 66);
  b.spec.offerStrip = [330, 375];
  b.spec.illus = [[0, 375], [615, 735]];
  return b.done();
}

/* ================================================================== 3. night shift */
const nightLock = (unread = NOTIFS) => ({ time: '01:47', day: 'שבת', wall: 'dark' as const, notifs: unread });
const nightChat = (from: number, dur: number, pullAt?: number): PhoneScene => ({
  type: 'phone', from, dur, statusTime: '02:13', night: true,
  cam: pullAt ? [{ at: 0, v: 'chat' }, { at: pullAt, v: 'full' }] : [{ at: 0, v: 'chat' }],
  site: {
    key: 'pilates', popAt: 2, openAt: 6,
    events: [
      { kind: 'visitor', at: 10, text: Q_NIGHT },
      { kind: 'agent', at: 20, text: VO.C1.text, typing: 6 },
    ],
    banner: pullAt ? { at: pullAt + 6, rows: LEAD_ORIT, time: '02:13' } : undefined,
  },
});

function cnight_15(): Spec {
  const b = new B('RA-night-15s', 'RA_night_15s_9x16_he', 450);
  b.scene({ type: 'phone', from: 0, dur: 80, statusTime: '01:47', night: true, cam: [{ at: 0, v: 'full' }], lock: nightLock() });
  b.scene({ type: 'compare', from: 80, dur: 145 });
  [84, 114, 132].forEach((t) => b.sfx(t, 'pop', 0.45));
  b.scene(nightChat(225, 150, 118));
  b.voice(243, 'C1');
  b.scene({ type: 'end', from: 375, dur: 75 });
  b.voice(377, 'E');
  b.cap(0, 80, [[0, 'מישהו עונה'], [0, 'ללקוחות שלכם'], [0, 'בלילה?', true]]);
  b.cap(82, 225, [[84, 'כמה זה עולה?']], 70);
  b.cap(225, 343, [[227, 'שבת, 02:13.', true], [238, 'והיא עונה.']], 70);
  b.cap(343, 375, [[345, 'הליד כבר אצלכם.', true]], 70);
  b.spec.illus = [[0, 80], [225, 375]];
  return b.done();
}

function cnight_7(): Spec {
  const b = new B('RA-night-7s', 'RA_night_7s_9x16_he', 210);
  const n3 = NOTIFS.slice(0, 3).map((n, i) => ({ ...n, at: i * 10 }));
  b.scene({ type: 'phone', from: 0, dur: 54, statusTime: '01:47', night: true, cam: [{ at: 0, v: 'full' }], lock: nightLock(n3) });
  b.scene(nightChat(54, 96));
  b.voice(64, 'C1');
  b.scene({ type: 'end', from: 150, dur: 60 });
  b.cap(0, 54, [[0, 'מישהו עונה'], [0, 'ללקוחות שלכם'], [0, 'בלילה?', true]]);
  b.cap(54, 150, [[56, 'שבת, 02:13.', true], [66, 'והיא עונה.']], 70);
  b.spec.illus = [[0, 150]];
  return b.done();
}

function cnight_long(): Spec {
  const b = new B('RA-night-31s', 'RA_night_31s_9x16_he', 925);
  b.scene({ type: 'phone', from: 0, dur: 80, statusTime: '01:47', night: true, cam: [{ at: 0, v: 'full' }], lock: nightLock() });
  b.scene({ type: 'compare', from: 80, dur: 145 });
  [84, 114, 132].forEach((t) => b.sfx(t, 'pop', 0.45));
  b.scene(nightChat(225, 190, 118));
  b.voice(243, 'C1');
  b.scene({ type: 'phone', from: 415, dur: 90, statusTime: '07:30', cam: [{ at: 0, v: 'lead' }], lock: { time: '07:30', day: 'שבת', wall: 'morning', lead: { at: 10, rows: LEAD_ORIT, time: '02:13' } } });
  b.scene({ type: 'multi', from: 505, dur: 120 });
  [515, 524, 533].forEach((t) => b.sfx(t, 'pop', 0.35));
  b.scene({ type: 'langs', from: 625, dur: 120 });
  b.voice(650, 'C2');
  b.scene({ type: 'offer', from: 745, dur: 105 });
  [749, 763, 777, 793].forEach((t) => b.sfx(t, 'pop', 0.4));
  b.scene({ type: 'end', from: 850, dur: 75 });
  b.voice(852, 'E');
  b.cap(0, 80, [[0, 'מישהו עונה'], [0, 'ללקוחות שלכם'], [0, 'בלילה?', true]]);
  b.cap(82, 225, [[84, 'כמה זה עולה?']], 70);
  b.cap(225, 330, [[227, 'שבת, 02:13.', true], [238, 'והיא עונה.']], 70);
  b.cap(415, 505, [[417, 'הליד מחכה לכם'], [427, 'בבוקר.', true]]);
  b.spec.offerStrip = [330, 415];
  b.spec.illus = [[0, 80], [225, 505], [505, 625]];
  return b.done();
}


/* ================================================================== 4. face vs chat vs voice */
const PRICE_CARD = { title: 'הסרת שיער בלייזר', price: '₪450', note: 'לטיפול', cta: 'לשמור שיחת ייעוץ' };
const faceHook = (b: B) => {
  b.scene({ type: 'triptych', from: 0, dur: 210, answerAt: 66, dimAt: 190 });
  b.voice(66, 'A2');
  b.sfx(188, 'swoosh', 0.35);
  b.cap(0, 210, [[0, 'אותה תשובה.'], [0, 'שלוש דרכים.', true], [0, 'במה הייתם בוחרים?']], 64);
};

function cface_15(): Spec {
  const b = new B('RA-face-15s', 'RA_face_15s_9x16_he', 450);
  faceHook(b);
  b.scene({
    type: 'phone', from: 210, dur: 60, statusTime: '23:04', night: true,
    cam: [{ at: 0, v: 'chat' }],
    site: {
      key: 'clinic', popAt: -40, openAt: -40,
      events: [
        { kind: 'visitor', at: -40, text: Q_PRICE },
        { kind: 'agent', at: -30, text: A_PRICE },
        { kind: 'visitor', at: 18, text: 'דנה, 052-555-0147', typeDur: 14 },
        { kind: 'agent', at: 32, text: 'רשמתי! הקליניקה תחזור אלייך בבוקר.', typing: 6 },
      ],
    },
  });
  b.scene({ type: 'research', from: 270, dur: 90 });
  [271, 293].forEach((t) => b.sfx(t, 'pop', 0.4));
  b.scene({ type: 'end', from: 360, dur: 90 });
  b.voice(362, 'E');
  b.cap(212, 270, [[212, 'ככה היא נראית'], [220, 'באתר שלכם.', true]], 70);
  b.cap(272, 360, [[272, 'מה מצאו המחקרים?']], 66);
  b.spec.illus = [[0, 270]];
  return b.done();
}

function cface_long(): Spec {
  const b = new B('RA-face-32s', 'RA_face_32s_9x16_he', 975);
  faceHook(b);
  b.scene({
    type: 'phone', from: 210, dur: 260, statusTime: '23:04', night: true,
    cam: [{ at: 0, v: 'chat' }, { at: 200, v: 'full' }],
    site: {
      key: 'clinic', popAt: -40, openAt: -40,
      events: [
        { kind: 'agent', at: -40, text: 'היי! אפשר לעזור?' },
        { kind: 'visitor', at: 16, text: Q_PRICE, typeDur: 16 },
        { kind: 'agent', at: 26, text: 'הנה המחיר:', typing: 6, card: PRICE_CARD },
        { kind: 'visitor', at: 136, text: 'דנה, 052-555-0147', typeDur: 16 },
        { kind: 'agent', at: 146, text: VO.A3.text, typing: 6 },
      ],
      banner: { at: 206, rows: LEAD_DANA, time: '23:06' },
    },
  });
  b.voice(234, 'A2');
  b.voice(354, 'A3');
  b.scene({ type: 'research', from: 470, dur: 210, long: true });
  [471, 545].forEach((t) => b.sfx(t, 'pop', 0.4));
  b.scene({ type: 'chars', from: 680, dur: 105 });
  [692, 698].forEach((t) => b.sfx(t, 'pop', 0.35));
  b.scene({ type: 'offer', from: 785, dur: 105 });
  [789, 803, 817, 833].forEach((t) => b.sfx(t, 'pop', 0.4));
  b.scene({ type: 'end', from: 890, dur: 85 });
  b.voice(892, 'E');
  b.cap(212, 300, [[214, 'עונה בקול'], [224, 'ומציגה מחיר.', true]], 70);
  b.cap(300, 345, [[302, 'ושומרת את הליד.', true]], 70);
  b.cap(472, 680, [[472, 'מה מצאו המחקרים?']], 66);
  b.spec.offerStrip = [345, 470];
  b.spec.illus = [[0, 470], [680, 785]];
  return b.done();
}

export const SPECS: Spec[] = [c2304_15(), c2304_7(), c2304_long(), cline_15(), cline_7(), cline_long(), cnight_15(), cnight_7(), cnight_long(), cface_15(), cface_long()];
