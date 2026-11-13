// v2: punchy cuts for the paid test. Face talking with sound in the first second,
// 1 to 1.5 s cuts, punch-in zooms, slides, kinetic 2-4 word beats, synthesized 120 BPM beat.
const { SRC, a, page } = require('./lib');

const BG = '0x0B0E14';
const WHITE = '0xFFFFFF';
const BIZ = {
  dental: '450:800:90:66', beauty: '380:676:134:284', salon: '450:800:90:56', gym: '450:800:74:160', restaurant: '450:800:90:160',
};
const SLIDES = ['right', 'left', 'up', 'right', 'left'];
let slideI = 0;
const bizZ = (k, opts = {}) => ({
  file: `${SRC}/biz-${k}.mp4`, ss: opts.ss || 0, crop: BIZ[k], w: 1080, h: 1920,
  vf: `unsharp=5:5:0.45,eq=brightness=${opts.dim ?? -0.14}`, zoom: [1.0, 1.15], slide: opts.slide ?? SLIDES[slideI++ % 5], slideDur: 0.18,
});
// speaking clip (720x1366, white background). wide = head to waist, close = head and shoulders
const talk = (s, e, close = false, slide = null) => (close
  ? { file: `${SRC}/speak-he.mp4`, segs: [[s, e]], crop: '405:720:158:0', w: 1080, h: 1920, y: 150, zoom: [1.04, 1.16], slide, slideDur: 0.16 }
  : { file: `${SRC}/speak-he.mp4`, segs: [[s, e]], crop: '480:854:120:0', w: 1080, h: 1920, y: 150, zoom: [1.0, 1.12], slide, slideDur: 0.16 });
const headCircle = (s, e, x, y, size) => ({ file: `${SRC}/speak-he.mp4`, segs: [[s, e]], crop: '250:250:240:20', w: size, h: size, x, y });
const face = (size, x, y) => ({ file: `${SRC}/face.mp4`, loop: true, ss: 0, w: size, h: size, x, y });
const sheet = (x, y, slide = 'up') => ({
  file: `${SRC}/tools-explainer.mp4`, segs: [[22.9, 24.8]], crop: '574:330:620:138',
  post: 'drawbox=x=22:y=187:w=532:h=39:color=0xFBFDFA@1:t=fill', w: 960, h: 552, x, y, slide, slideDur: 0.22,
});

const CSS2 = `
.k{font-family:'Suez One','Assistant',serif;font-size:128px;line-height:1.08;color:#fff;text-shadow:0 6px 0 rgba(0,0,0,.35),0 14px 40px rgba(0,0,0,.55)}
.en .k{font-family:'Inter';font-weight:800;letter-spacing:-2px}
.k .w{display:inline-block;margin:0 .12em}
.sh{font-family:'Assistant';font-weight:800}
.say{font-family:'Assistant';font-weight:800;font-size:74px;line-height:1.12;background:rgba(9,11,18,.88);color:#fff;border-radius:30px;padding:14px 34px 22px;display:inline-block;max-width:940px}
.say .w{display:inline-block;margin:0 .1em}
@keyframes lit{0%{opacity:.28;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}100%{opacity:1;transform:scale(1)}}
.hl{background:linear-gradient(90deg,#22D3EE,#A78BFA);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none;filter:drop-shadow(0 8px 24px rgba(0,0,0,.6))}
@keyframes slam{0%{opacity:0;transform:scale(1.9)}60%{opacity:1;transform:scale(.94)}100%{opacity:1;transform:scale(1)}}
@keyframes popw{0%{opacity:0;transform:translateY(30px) scale(.6)}70%{opacity:1;transform:translateY(0) scale(1.08)}100%{opacity:1;transform:none}}
@keyframes punch{from{transform:scale(1)}to{transform:scale(1.12)}}
@keyframes shoot{from{transform:scaleX(0)}to{transform:scaleX(1)}}
`;
const sh = (t) => t.replace(/₪/g, '<span class="sh">₪</span>');

// kinetic lines: words pop one by one. lines: [[text, hl?], ...]
function kin(lines, { top = 560, t0 = 0.05, step = 0.16, size = null, anim = 'popw', box = false } = {}) {
  let k = 0;
  const body = lines.map(([txt, hl]) => `<div>${txt.split(' ').map((w) => `<span class="w ${hl ? 'hl' : ''}" ${a(anim, t0 + step * k++, anim === 'slam' ? 0.32 : 0.26)}>${sh(w)}</span>`).join(' ')}</div>`).join('');
  return `<div class="abs cx" style="top:${top}px;padding:0 50px"><div class="k" style="${size ? `font-size:${size}px;` : ''}${box ? 'background:rgba(9,11,18,.88);border-radius:40px;padding:6px 40px 26px;' : ''}">${body}</div></div>`;
}
// her words, popping at her pace: words with times
function say(words, { top = 1170 } = {}) {
  return `<div class="abs cx" style="top:${top}px;padding:0 60px"><div class="say">${words.map(([w, t]) => `<span class="w" ${a('lit', t, 0.2)}>${w}</span>`).join(' ')}</div></div>`;
}
const tag = (txt, top = 236) => `<div class="abs cx" style="top:${top}px"><div class="tag" style="font-size:28px">${txt}</div></div>`;
const shade = (o = 0.35) => `<div class="abs" style="inset:0;background:rgba(8,10,16,${o})"></div>`;
const demoTag = (L) => `<div class="abs" style="top:236px;${L === 'he' ? 'right' : 'left'}:60px"><div class="tag" style="font-size:26px">${L === 'he' ? 'סרטון הדגמה' : 'Demo clip'}</div></div>`;
const illus = (L) => `<div class="abs" style="top:1372px;${L === 'he' ? 'left' : 'right'}:56px"><div class="tag" style="font-size:26px;opacity:.85">${L === 'he' ? 'המחשה' : 'Illustration'}</div></div>`;

const S = (name, dur, bg, layers, body, css = '', tick = '', L = 'he') => ({ name, dur, bg, layers, html: page(L, body, CSS2 + css, tick) });

// spoken lines (src seconds in speak-he.mp4 / talk-he.mp4)
const V = {
  hello: [0.0, 0.95, [['שלום,', 0.05]]],
  greet: [8.45, 10.41, [['אני', 0.05], ['מקבלת', 0.35], ['את', 0.8], ['האורחים', 1.0], ['שלכם,', 1.45]]],
  answer: [10.96, 11.92, [['עונה', 0.05], ['על', 0.4], ['שאלות,', 0.55]]],
  book: [12.35, 15.23, [['ומזמנת', 0.05], ['פגישות', 0.6], ['ישירות', 1.2], ['ליומן', 1.8], ['שלכם.', 2.25]]],
  want: [17.92, 18.98, [['רוצים', 0.05], ['אחת', 0.5], ['כזאת?', 0.75]]],
};
// a talking scene: plays line `k` from offset `from` for `dur` seconds
function talkScene(name, k, { dur = null, from = 0, close = false, slide = null, L = 'he' } = {}) {
  const [s, e, words] = V[k];
  const d = dur ?? +(e - s + 0.05).toFixed(2);
  const ws = words.filter(([, t]) => t >= from - 0.01 && t < from + d).map(([w, t]) => [w, Math.max(0, t - from)]);
  const prev = words.filter(([, t]) => t < from - 0.01).map(([w]) => [w, -1]);
  const all = [...prev.map(([w]) => [w, 0]), ...ws];
  return { scene: S(name, d, WHITE, [talk(s + from, s + from + d, close, slide)], demoTag(L) + say(all)), voice: [s + from, s + from + d] };
}

// ------------------------------------------------------------ the notification + end card
function notif(top = 330) {
  return `<div class="abs cx" style="top:${top}px"><div style="width:940px;background:rgba(250,250,252,.98);color:#111827;border-radius:38px;padding:30px 34px;box-shadow:0 30px 80px rgba(0,0,0,.5)" ${a('down', 0.12, 0.32)}>
      <div style="display:flex;align-items:center;gap:16px;font-size:28px;color:#6B7280;font-weight:700">
        <span style="width:54px;height:54px;border-radius:14px;background:#22C55E;display:flex;align-items:center;justify-content:center"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg></span>
        <span>הודעה חדשה</span><span style="margin-inline-start:auto">עכשיו</span></div>
      <div style="font-size:50px;font-weight:800;margin-top:16px">ליד חדש מהאתר</div>
      <div style="font-size:40px;font-weight:600;margin-top:8px;color:#374151">שם: דנה · טלפון: <span class="ltr">05X-XXXXXXX</span></div>
      <div style="font-size:40px;font-weight:600;margin-top:4px;color:#374151">רוצה לקבוע תור לבדיקה</div>
      <div style="margin-top:14px"><span class="tag" style="font-size:24px;background:#EEF0F4;color:#6B7280">דוגמה להמחשה</span></div>
    </div></div>`;
}

function endCard2(L) {
  const he = L === 'he';
  const css = `.bgx{position:absolute;inset:0;background:radial-gradient(1200px 900px at 50% 30%,#1A1F35 0%,#0B0E14 60%);-webkit-mask:radial-gradient(circle 140px at 540px 430px,transparent 139px,#000 140.5px)}
  .ring{position:absolute;left:392px;top:282px;width:296px;height:296px;border-radius:50%;padding:7px;background:linear-gradient(135deg,#00B8D9,#7C5CF0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor}
  .h{font-family:'Assistant';font-size:${he ? 70 : 64}px;font-weight:800;line-height:1.12}
  .en .h{font-family:'Inter'}
  .price{font-size:${he ? 72 : 60}px;font-weight:800;padding:12px 44px 20px;border-radius:999px;color:#fff;font-family:'Assistant'}
  .url{font-family:'Inter';font-weight:700;font-size:48px;color:#E6F7FB;border-bottom:4px solid #22D3EE;padding-bottom:6px}`;
  const body = `<div class="bgx"></div><div class="ring"></div>
  <div class="abs cx" style="top:615px;padding:0 60px"><div class="h" ${a('up', 0.0, 0.3)}>${he ? 'הדגמה חיה של 3 דקות<br>על האתר שלכם. <span class="gradtxt">בחינם.</span>' : 'A free 3-minute live demo<br><span class="gradtxt">on your own site.</span>'}</div></div>
  <div class="abs cx" style="top:820px"><div class="price grad" ${a('slam', 0.2, 0.32)}>${he ? '₪99 לחודש.' : '₪99 a month.'}</div></div>
  <div class="abs cx" style="top:960px"><div style="font-size:${he ? 56 : 48}px;font-weight:800;font-family:'Assistant'" ${a('popw', 0.4, 0.25)}>${he ? 'שעה של שיחות.' : 'An hour of conversations.'}</div></div>
  <div class="abs cx" style="top:1080px"><div style="font-size:34px;color:#AEB6C6;font-weight:600" ${a('fade', 0.5, 0.2)}>${he ? 'הקמה ₪0 · מבטלים בכל חודש' : 'Setup ₪0 · Cancel any month'}</div></div>
  <div class="abs cx" style="top:1175px"><div class="url ltr" ${a('up', 0.55, 0.25)}>refael-ai-flow.lovable.app</div></div>
  <div class="abs cx" style="top:1295px"><div class="ltr" style="font-family:'Inter';font-weight:800;font-size:38px">Refael<span class="gradtxt">.ai</span></div></div>`;
  return { scene: { name: `end2_${L}`, dur: 2.0, bg: BG, layers: [face(280, 400, 290)], html: page(L, body, CSS2 + css) } };
}

// ------------------------------------------------------------ reels
function R1() {
  slideI = 0;
  const statCss = `.big{font-family:'Assistant';font-weight:800;line-height:1}`;
  return [
    talkScene('v1_hello', 'hello', { dur: 1.0, close: true }),
    { scene: S('v1_s1', 1.5, BG, [], `<div class="abs cx" style="top:300px"><div class="tag" style="font-size:40px;padding:10px 28px">לפי מקרה בוחן של ספק</div></div>` + `<div class="abs cx" style="top:520px"><div class="big ltr" style="font-size:230px;color:#AAB2C3" ${a('slam', 0.05, 0.3)}>7.75%</div></div>` + kin([['פתחו שיחה']], { top: 800, t0: 0.4, size: 104 }), statCss) },
    { scene: S('v1_s2', 1.5, BG, [], `<div class="abs cx" style="top:300px"><div class="tag" style="font-size:40px;padding:10px 28px">לפי מקרה בוחן של ספק</div></div>` + `<div class="abs cx" style="top:500px"><div class="big ltr gradtxt" style="font-size:250px;animation:slam .32s cubic-bezier(.2,.8,.2,1) .05s both, punch 1.5s linear .37s both">26.58%</div></div>` + kin([['עם אווטאר מדבר']], { top: 800, t0: 0.35, size: 100 }), statCss) },
    { scene: S('v1_s3', 1.0, BG, [bizZ('dental')], shade(0.1) + kin([['פנים חיות']], { top: 330 }) + illus('he')) },
    { scene: S('v1_s4', 1.0, BG, [bizZ('beauty')], shade(0.1) + kin([['בפינת האתר', true]], { top: 330 }) + illus('he')) },
    talkScene('v1_greet', 'greet', { dur: 2.0, close: true, slide: 'right' }),
    { scene: S('v1_s5', 1.0, BG, [bizZ('salon')], shade(0.1) + kin([['עונה בקול']], { top: 330 }) + illus('he')) },
    { scene: S('v1_s6', 1.0, BG, [bizZ('gym')], shade(0.1) + kin([['בעברית', true]], { top: 330 }) + illus('he')) },
    { scene: S('v1_s7', 1.5, BG, [bizZ('restaurant', { dim: -0.3 })], notif(300) + kin([['ליד לוואטסאפ']], { top: 900, t0: 0.5, size: 110, box: true }) + illus('he')), ding: 0.15 },
    talkScene('v1_want', 'want', { dur: 1.5, slide: 'left' }),
    endCard2('he'),
  ];
}

function mock(grey) {
  return `<div class="abs" style="left:70px;top:250px;width:940px;height:1150px;border-radius:36px;background:#fff;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45);${grey ? 'filter:grayscale(1)' : '-webkit-mask:radial-gradient(circle 150px at 760px 960px,transparent 149px,#000 150.5px)'}">
    <div style="height:70px;background:#EEF0F4;display:flex;align-items:center;gap:12px;padding:0 26px;direction:ltr"><span style="width:16px;height:16px;border-radius:50%;background:#F87171"></span><span style="width:16px;height:16px;border-radius:50%;background:#FBBF24"></span><span style="width:16px;height:16px;border-radius:50%;background:#34D399"></span>
      <div style="margin-left:20px;flex:1;height:40px;border-radius:20px;background:#fff;color:#8A93A3;font:600 24px Inter;display:flex;align-items:center;padding:0 20px">www.your-business.co.il</div></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:26px 40px;color:#1F2937"><div style="font-weight:800;font-size:40px">העסק שלכם</div><div style="display:flex;gap:26px;font-size:26px;color:#6B7280;font-weight:600"><span>שירותים</span><span>מחירים</span><span>צור קשר</span></div></div>
    <div style="margin:0 40px;height:380px;border-radius:26px;background:linear-gradient(135deg,#DBEAFE,#E9D5FF 60%,#FCE7F3);position:relative"><div style="position:absolute;right:44px;top:70px;color:#1F2937;font-weight:800;font-size:58px;line-height:1.1">ברוכים הבאים<br>לאתר שלנו</div>
      <div style="position:absolute;right:44px;top:300px;padding:12px 30px;border-radius:999px;background:#4F46E5;color:#fff;font-weight:700;font-size:26px">לקביעת תור</div></div>
    <div style="display:flex;gap:22px;margin:34px 40px">${[0, 1, 2].map(() => `<div style="flex:1;height:200px;border-radius:22px;background:#F3F4F6"></div>`).join('')}</div>
    <div style="margin:0 40px;display:flex;flex-direction:column;gap:16px">${[620, 540, 600].map((w) => `<div style="width:${w}px;height:22px;border-radius:11px;background:#EEF0F3"></div>`).join('')}</div></div>`;
}
function R2() {
  slideI = 1;
  // face pops into the corner of a plain site: hole centre (830,1210) on the page
  const pop = mock(false) + `
    <div class="abs" style="left:672px;top:1052px;width:316px;height:316px;border-radius:50%;padding:8px;background:linear-gradient(135deg,#00B8D9,#7C5CF0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;animation:pop .25s cubic-bezier(.2,.8,.2,1) .08s both"></div>
    <div class="abs" style="left:675px;top:1055px;width:310px;height:310px;border-radius:50%;background:#fff;animation:out .12s linear .1s forwards"></div>
    <div class="abs" style="left:250px;top:1120px;background:#fff;color:#111827;border-radius:28px 28px 6px 28px;padding:20px 30px;font-size:44px;font-weight:800;box-shadow:0 14px 40px rgba(0,0,0,.3)" ${a('pop', 0.2, 0.25)}>שלום!</div>`
    + kin([['פנים', true], ['במקום צ\'אט']], { top: 300, t0: 0.3, size: 112, box: true });
  const chat = mock(true) + `
    <div class="abs" style="left:780px;top:1150px;width:120px;height:120px;border-radius:50%;background:#9CA3AF;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,.25)"><svg width="60" height="60" viewBox="0 0 24 24" fill="#fff"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg></div>
    <div class="abs" style="left:420px;top:1040px;background:#F3F4F6;color:#4B5563;border-radius:20px;padding:16px 24px;font-size:30px;font-weight:600">היי, איך אפשר לעזור?</div>`;
  return [
    { scene: S('v2_pop', 1.3, BG, [headCircle(0, 1.3, 680, 1060, 300)], pop), voice: [0, 1.3] },
    { scene: S('v2_chat', 1.2, BG, [], `<div class="abs" style="inset:0;animation:punch 1.2s linear both;transform-origin:840px 1210px">${chat}</div>` + kin([['צ\'אט רגיל?']], { top: 300, size: 120, box: true })) },
    { scene: S('v2_bore', 1.0, BG, [], `<div class="abs" style="inset:0;transform:scale(1.35);transform-origin:840px 1210px;filter:brightness(.6)">${chat}</div>` + kin([['מחכה', false], ['שיקלידו...']], { top: 420, step: 0.2, size: 124 })) },
    talkScene('v2_greet', 'greet', { dur: 2.0, close: true, slide: 'up' }),
    { scene: S('v2_s1', 1.0, BG, [bizZ('dental')], shade(0.1) + kin([['מברכת לבד']], { top: 330 }) + illus('he')) },
    { scene: S('v2_s2', 1.0, BG, [bizZ('beauty')], shade(0.1) + kin([['בקול,'], ['בעברית', true]], { top: 300 }) + illus('he')) },
    talkScene('v2_book1', 'book', { dur: 1.5, from: 0, slide: 'right' }),
    talkScene('v2_book2', 'book', { dur: 1.45, from: 1.5, close: true }),
    { scene: S('v2_s3', 1.0, BG, [bizZ('salon')], shade(0.1) + kin([['שורת קוד'], ['אחת', true]], { top: 300 }) + illus('he')) },
    { scene: S('v2_s4', 1.55, BG, [bizZ('gym', { dim: -0.3 })], kin([['וורדפרס.'], ['ויקס.'], ['שופיפיי.', true]], { top: 380, step: 0.3, size: 120 }) + illus('he')) },
    endCard2('he'),
  ];
}

const R3T = {
  he: { they: [['הם מוכרים'], ['פנים מדברות.']], we: [['אנחנו מספקים'], ['נציג שעובד.', true]], proof: 'מבדיקה פנימית (n8n)', chips: ['שומר ליד', 'קובע פגישה', 'שולח לינק'],
    cmpT: 'שנה ראשונה · 150 דק׳ בחודש · הכל כלול', note: 'מחירי מחירון כפי שפורסמו, אוק׳ 2026 · $1 = ₪3.08',
    e1: [['מנוע משלנו.'], ['GPU משלנו.', true]], e2: [['לא משווקים'], ['HeyGen או D-ID']], e3: [['הקמה ₪0.', true], ['קול עברי.']] },
  en: { they: [['They sell'], ['a talking face.']], we: [['We deliver'], ['a talking agent.', true]], proof: 'From an internal test (n8n)', chips: ['Saves the lead', 'Books the meeting', 'Sends the link'],
    cmpT: 'First year · 150 min a month · all-in', note: 'Published list prices, Oct 2026 · $1 = ₪3.08',
    e1: [['Our own engine.'], ['Our own GPUs.', true]], e2: [["We don't resell"], ['HeyGen or D-ID']], e3: [['Setup ₪0.', true], ['Hebrew voice.']] },
};
function R3(L) {
  slideI = 2;
  const t = R3T[L];
  const he = L === 'he';
  const chipCss = `.chip{display:inline-flex;align-items:center;gap:20px;background:#151A26;border:3px solid #2A3245;border-radius:999px;padding:14px 40px 18px;font-size:${he ? 64 : 54}px;font-weight:800;font-family:'Assistant'}`;
  const chips = t.chips.map((c, i) => `<div class="abs cx" style="top:${250 + i * 120}px"><div class="chip ${i === 2 ? '' : ''}" ${a('slam', 0.05 + i * 0.5, 0.28)}><span style="width:22px;height:22px;border-radius:50%;background:#22D3EE"></span>${c}</div></div>`).join('');
  // bars: honest scale, 900 px = ₪16,900, so HeyGen runs past the edge of the frame
  const rows = [['HeyGen', 23600], ['D-ID', 16900], ['Tavus', 10100], ['Refael.ai', 4680]];
  const k = 900 / 16900;
  const barCss = `.lbl{font-family:'Inter';font-weight:800;font-size:48px;display:flex;align-items:baseline;gap:22px}
   .bar{height:74px;border-radius:${he ? '37px 0 0 37px' : '0 37px 37px 0'};transform-origin:${he ? 'right' : 'left'} center}`;
  const bars = `<div class="abs cx" style="top:240px;padding:0 60px"><div style="font-size:38px;font-weight:700;color:#C9D0DC;font-family:'Assistant'">${t.cmpT}</div></div>`
    + rows.map(([n, v], i) => {
      const us = n === 'Refael.ai';
      const d = 0.1 + i * 0.18;
      return `<div class="abs" style="top:${340 + i * 200}px;${he ? 'right' : 'left'}:90px;width:1400px;direction:${he ? 'rtl' : 'ltr'}">
        <div class="lbl" ${a('fade', d, 0.15)}><span class="ltr" style="${us ? '' : 'color:#D5DAE3'}">${us ? 'Refael<span class="gradtxt">.ai</span>' : n}</span><span class="ltr ${us ? 'gradtxt' : ''}" style="${us ? 'font-size:72px' : 'color:#AEB6C6'}" data-v="${v}" data-d="${d}"></span></div>
        <div class="bar ${us ? 'grad' : ''}" style="margin-top:10px;width:${Math.round(v * k)}px;${us ? '' : 'background:#4B5468;'}animation:shoot ${n === 'HeyGen' ? 0.5 : 0.45}s cubic-bezier(.5,0,.2,1) ${d}s both"></div></div>`;
    }).join('')
    + `<div class="abs cx" style="top:1150px"><div style="font-size:44px;font-weight:800;font-family:'Assistant'" ${a('slam', 1.6, 0.3)}>${he ? 'מסלול Business: ₪390 לחודש' : 'Business plan: ₪390 a month'}</div></div>`
    + `<div class="abs cx" style="top:1290px"><div style="font-size:30px;color:#8D96A8;font-weight:600;font-family:'Assistant'">${t.note}</div></div>`;
  const barTick = `var o='';document.querySelectorAll('[data-v]').forEach(function(e){var v=+e.dataset.v,d=+e.dataset.d;var p=Math.min(Math.max((t-d)/0.5,0),1);var x=Math.round(v*p/10)*10;var s=(v===4680?'':'≈')+'₪'+x.toLocaleString('en-US');e.textContent=s;o+=s});return o`;
  const hookLines = L === 'he' ? null : [['Hi,', 0.05]];
  const hello = talkScene(`v3_greet_${L}`, 'greet', { dur: 2.0, close: true, L });
  if (L === 'en') {
    // English cut: same Hebrew line, caption translated
    hello.scene = S(`v3_greet_${L}`, 2.0, WHITE, [talk(8.45, 10.45, true)], demoTag(L) + `<div class="abs cx" style="top:1170px;padding:0 60px"><div class="say">${[['I', 0.05], ['welcome', 0.35], ['your', 0.8], ['visitors', 1.0]].map(([w, s]) => `<span class="w" ${a('lit', s, 0.2)}>${w}</span>`).join(' ')}</div></div>`
      + `<div class="abs cx" style="top:1300px"><div class="tag" style="font-size:26px">Speaking Hebrew</div></div>`, '', '', L);
  }
  const bookEn = L === 'en'
    ? { scene: S(`v3_book_${L}`, 2.9, WHITE, [talk(12.35, 15.25, false, 'left')], demoTag(L) + `<div class="abs cx" style="top:1170px;padding:0 60px"><div class="say">${[['and', 0.05], ['book', 0.6], ['meetings', 0.9], ['into', 1.5], ['your', 1.8], ['calendar.', 2.1]].map(([w, s]) => `<span class="w" ${a('lit', s, 0.2)}>${w}</span>`).join(' ')}</div></div>`, '', '', L), voice: [12.35, 15.25] }
    : talkScene(`v3_book_${L}`, 'book', { dur: 2.9, slide: 'left' });
  return [
    hello,
    { scene: S(`v3_they_${L}`, 1.3, BG, [bizZ('gym', { dim: -0.45 })], kin(t.they, { top: 520, size: he ? 124 : 110 }), '', '', L) },
    { scene: S(`v3_we_${L}`, 1.4, BG, [face(420, 330, 260)], `<div class="abs" style="inset:0;background:radial-gradient(900px 700px at 50% 25%,#1A1F35,#0B0E14 62%);-webkit-mask:radial-gradient(circle 210px at 540px 470px,transparent 209px,#000 210.5px)"></div>` + kin(t.we, { top: 760, size: he ? 120 : 104, anim: 'slam', step: 0.2 }), '', '', L) },
    { scene: S(`v3_tools_${L}`, 2.0, BG, [sheet(60, 700, 'up')], chips + `<div class="abs cx" style="top:640px"><div class="tag" style="font-size:28px">${t.proof}</div></div><div class="abs" style="left:60px;top:700px;width:960px;height:552px;border-radius:30px;box-shadow:0 0 0 60px #0B0E14"></div>`, chipCss, '', L) },
    bookEn,
    { scene: S(`v3_bars_${L}`, 3.4, BG, [], `<div class="abs" style="inset:0;overflow:hidden">${bars}</div>`, barCss, barTick, L) },
    { scene: S(`v3_e1_${L}`, 1.2, BG, [face(360, 360, 250)], `<div class="abs" style="inset:0;background:#0B0E14;-webkit-mask:radial-gradient(circle 180px at 540px 430px,transparent 179px,#000 180.5px)"></div>` + kin(t.e1, { top: 700, size: he ? 118 : 100 }), '', '', L) },
    { scene: S(`v3_e2_${L}`, 1.2, BG, [bizZ('dental', { dim: -0.45 })], kin(t.e2, { top: 560, size: he ? 112 : 100 }), '', '', L) },
    { scene: S(`v3_e3_${L}`, 1.4, BG, [bizZ('salon', { dim: -0.45 })], kin(t.e3, { top: 560, size: he ? 120 : 104, anim: 'slam', step: 0.35 }), '', '', L) },
    endCard2(L),
  ];
}

const R4T = {
  he: { labels: ['מרפאה', 'קוסמטיקה', 'מספרה', 'כושר', 'מסעדה'], same: [['אותו נציג.'], ['כל אתר.', true]], code: [['שורת קוד'], ['אחת.', true]], price: [['₪99 לחודש.', true], ['שעה של שיחות.']] },
  en: { labels: ['Dental', 'Beauty', 'Salon', 'Gym', 'Restaurant'], same: [['Same agent.'], ['Any site.', true]], code: [['One line'], ['of code.', true]], price: [['₪99 a month.', true], ['An hour of talk.']] },
};
function R4(L) {
  slideI = 0;
  const t = R4T[L];
  const he = L === 'he';
  const order = ['dental', 'beauty', 'salon', 'gym', 'restaurant'];
  const hello = he ? talkScene('v4_hello', 'hello', { dur: 1.0, close: true })
    : { scene: S('v4_hello_en', 1.0, WHITE, [talk(0, 1.0, true)], demoTag(L) + `<div class="abs cx" style="top:1170px"><div class="say"><span class="w" ${a('popw', 0.05, 0.18)}>Hi!</span></div></div><div class="abs cx" style="top:1300px"><div class="tag" style="font-size:26px">Speaking Hebrew</div></div>`, '', '', L), voice: [0, 1.0] };
  const greet = he ? talkScene('v4_greet', 'greet', { dur: 2.0, close: true, slide: 'right' })
    : { scene: S('v4_greet_en', 2.0, WHITE, [talk(8.45, 10.45, true, 'right')], demoTag(L) + `<div class="abs cx" style="top:1170px;padding:0 60px"><div class="say">${[['I', 0.05], ['welcome', 0.35], ['your', 0.8], ['visitors', 1.0]].map(([w, s]) => `<span class="w" ${a('lit', s, 0.2)}>${w}</span>`).join(' ')}</div></div>`, '', '', L), voice: [8.45, 10.45] };
  return [
    hello,
    ...order.map((k, i) => ({ scene: S(`v4_${k}_${L}`, 1.2, BG, [bizZ(k)], shade(0.08) + `<div class="abs cx" style="top:340px"><div class="pill grad" style="font-family:${he ? "'Suez One'" : "'Inter'"};font-weight:800;font-size:${he ? 120 : 104}px;padding:10px 60px 26px;border-radius:44px" ${a('slam', 0.04, 0.28)}>${t.labels[i]}</div></div>` + illus(L), '', '', L) })),
    greet,
    { scene: S(`v4_same_${L}`, 1.2, BG, [bizZ('dental', { dim: -0.45 })], kin(t.same, { top: 560, size: he ? 124 : 110 }), '', '', L) },
    { scene: S(`v4_code_${L}`, 1.3, BG, [bizZ('beauty', { dim: -0.45 })], kin(t.code, { top: 560, size: he ? 124 : 110 }), '', '', L) },
    { scene: S(`v4_price_${L}`, 1.5, BG, [], kin(t.price, { top: 600, size: he ? 124 : 104, anim: 'slam', step: 0.35 }), '', '', L) },
    endCard2(L),
  ];
}

function R5() {
  slideI = 3;
  return [
    talkScene('v5_hello', 'hello', { dur: 1.0, close: true }),
    talkScene('v5_greet', 'greet', { dur: 2.0, close: true, slide: 'right' }),
    talkScene('v5_answer', 'answer', { dur: 1.0, slide: 'left' }),
    talkScene('v5_book1', 'book', { dur: 1.5, from: 0, close: true, slide: 'up' }),
    talkScene('v5_book2', 'book', { dur: 1.45, from: 1.5 }),
    { scene: S('v5_lead', 1.5, BG, [bizZ('dental', { dim: -0.3 })], notif(300) + kin([['ליד חדש!', true]], { top: 920, t0: 0.45, size: 124, box: true }) + illus('he')), ding: 0.15 },
    { scene: S('v5_wa', 1.2, BG, [bizZ('restaurant', { dim: -0.45 })], kin([['שם + טלפון'], ['ישר לוואטסאפ', true]], { top: 520, size: 116 })) },
    { scene: S('v5_sheet', 1.4, BG, [sheet(60, 640, 'right')], kin([['וגם בגיליון']], { top: 300, size: 110 }) + `<div class="abs cx" style="top:560px"><div class="tag" style="font-size:28px">מבדיקה פנימית (n8n)</div></div><div class="abs" style="left:60px;top:640px;width:960px;height:552px;border-radius:30px;box-shadow:0 0 0 60px #0B0E14"></div>`) },
    talkScene('v5_want', 'want', { dur: 1.0, close: true }),
    endCard2('he'),
  ];
}

const REELS2 = {
  'reel-1-research-he-v2': R1,
  'reel-2-chat-he-v2': R2,
  'reel-3-why-us-he-v2': () => R3('he'),
  'reel-4-any-business-he-v2': () => R4('he'),
  'reel-5-watch-it-work-he-v2': R5,
  'reel-3-why-us-en-v2': () => R3('en'),
  'reel-4-any-business-en-v2': () => R4('en'),
};
module.exports = { REELS2 };
