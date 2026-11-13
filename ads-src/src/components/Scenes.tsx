import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { C, F } from '../theme';
import { Face } from './Face';
import { GradText, Pill, T, ease, pop } from './common';
import { SITES } from './Phone';

const enter = (f: number, at = 0) => pop(f, at, { damping: 14, stiffness: 190 });
const rise = (p: number, d = 40): React.CSSProperties => ({ transform: `translateY(${(1 - p) * d}px) scale(${0.94 + 0.06 * p})`, opacity: Math.min(1, p * 1.4) });

/* ---------------------------------------------------------------- generic site editor (no real platform UI) */
export const CODE_LINE = '<script src="https://…/widget.js" defer></script>';
export const Editor: React.FC<{ short?: boolean }> = ({ short }) => {
  const f = useCurrentFrame();
  const k = short ? 0.7 : 1;
  const tClick = Math.round(10 * k);
  const tType0 = Math.round(14 * k);
  const tType1 = Math.round(48 * k);
  const tSave = Math.round(58 * k);
  const n = Math.round(interpolate(f, [tType0, tType1], [0, CODE_LINE.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const p = 1;
  // cursor path: from bottom right to code box, then to save button
  const cx = interpolate(f, [0, tClick, tType1, tSave], [900, 640, 640, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cy = interpolate(f, [0, tClick, tType1, tSave], [1260, 905, 905, 1075], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const press = (a: number) => (f >= a && f < a + 5 ? 0.85 : 1);
  const saved = f >= tSave + 2;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 60, right: 60, top: 560, height: 640, borderRadius: 34, background: '#f7f8fa', boxShadow: '0 60px 120px -30px rgba(0,0,0,0.85), 0 0 0 2px rgba(255,255,255,0.08)', overflow: 'hidden', ...rise(p, 60) }}>
        <div dir="ltr" style={{ height: 64, background: '#e9ecf1', display: 'flex', alignItems: 'center', gap: 12, padding: '0 26px', fontFamily: F.rubik, fontSize: 24, color: '#5b6372' }}>
          {['#f26b5e', '#f5bf4f', '#5fc454'].map((c) => <span key={c} style={{ width: 16, height: 16, borderRadius: 16, background: c }} />)}
          <span style={{ marginLeft: 20 }} dir="rtl">עורך האתר · הגדרות</span>
        </div>
        <div dir="rtl" style={{ display: 'flex', height: 576 }}>
          <div style={{ width: 230, background: '#eef0f4', padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: 18, fontFamily: F.assistant, fontSize: 28, color: '#6b7280', fontWeight: 600 }}>
            <span>עמודים</span>
            <span>עיצוב</span>
            <span style={{ color: '#111827' }}>הגדרות</span>
            <span style={{ marginInlineStart: 14, color: '#2563eb', fontWeight: 800 }}>קוד מותאם</span>
            <span>דומיין</span>
          </div>
          <div style={{ flex: 1, padding: '34px 38px', fontFamily: F.assistant, color: '#111827' }}>
            <div style={{ fontFamily: F.rubik, fontSize: 40, fontWeight: 800 }}>קוד מותאם אישית</div>
            <div style={{ marginTop: 8, fontSize: 26, color: '#6b7280', fontWeight: 600 }}>קוד שנטען בכל עמודי האתר</div>
            <div
              dir="ltr"
              style={{
                marginTop: 26,
                height: 190,
                borderRadius: 18,
                background: '#0f1420',
                padding: '22px 24px',
                fontFamily: F.mono,
                fontSize: 25,
                lineHeight: 1.45,
                color: '#cfe3ff',
                boxShadow: f >= tClick ? '0 0 0 4px rgba(37,99,235,0.45)' : 'none',
                wordBreak: 'break-all',
                textAlign: 'left',
              }}
            >
              <span style={{ color: '#6b7a90' }}>{'<!-- head -->'}</span>
              <br />
              <Code s={CODE_LINE.slice(0, n)} />
              {f >= tClick && f < tSave && <span style={{ display: 'inline-block', width: 3, height: 28, background: '#7dd3fc', verticalAlign: 'middle', opacity: f % 14 < 8 ? 1 : 0 }} />}
            </div>
            <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ borderRadius: 14, background: saved ? '#16a34a' : '#2563eb', color: '#fff', fontFamily: F.rubik, fontSize: 28, fontWeight: 700, padding: '14px 34px', transform: `scale(${press(tSave)})` }}>
                {saved ? 'נשמר' : 'שמירה'}
              </span>
              {saved && <span style={{ fontSize: 26, color: '#16a34a', fontWeight: 700, ...rise(pop(f, tSave + 2), 12) }}>האתר עודכן</span>}
            </div>
          </div>
        </div>
      </div>
      <svg width="54" height="64" viewBox="0 0 27 32" style={{ position: 'absolute', left: cx, top: cy, transform: `scale(${press(tClick) * press(tSave)})`, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
        <path d="M2 2 L2 26 L8.5 20 L13 30 L17 28 L12.5 18.5 L21 18.5 Z" fill="#fff" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};
const Code: React.FC<{ s: string }> = ({ s }) => {
  // light syntax colouring
  const parts = s.split(/(".*?"|"[^"]*$)/);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.startsWith('"') ? '#fbbf77' : '#9ecbff' }}>
          {p}
        </span>
      ))}
    </>
  );
};

/* ---------------------------------------------------------------- price comparison (no competitor names) */
export const Compare: React.FC = () => {
  const f = useCurrentFrame();
  const a = f < 1 ? 0.35 : enter(f, 0);
  const b = enter(f, 44);
  const vs = enter(f, 28);
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', left: 110, right: 110, top: 520, borderRadius: 40, background: C.mist, border: '2px solid rgba(232,238,247,0.12)', padding: '34px 44px 30px', ...rise(a) }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: C.muted }}>חצי משרה בשכר מינימום</div>
        <div style={{ marginTop: 6, fontSize: 96, fontWeight: 800, color: 'rgba(232,238,247,0.86)', letterSpacing: -1 }}>
          <T>≈₪3,200</T> <span style={{ fontSize: 46, fontWeight: 600 }}>בחודש</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 30, fontWeight: 500, color: C.muted }}>ובלילה היא ישנה.</div>
        <div style={{ marginTop: 16, fontSize: 21, fontWeight: 400, color: 'rgba(139,151,170,0.85)' }}>
          <T>לפי שכר המינימום מ־1.4.2026 (ביטוח לאומי)</T>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 868, left: 0, right: 0, display: 'flex', justifyContent: 'center', ...rise(vs, 10) }}>
        <span style={{ fontSize: 34, fontWeight: 800, color: C.ink, background: C.paper, border: '2px solid rgba(232,238,247,0.2)', borderRadius: 999, padding: '8px 26px 10px' }}>או</span>
      </div>
      <div style={{ position: 'absolute', left: 110, right: 110, top: 948, borderRadius: 40, padding: 3, background: C.grad, boxShadow: '0 0 80px -10px rgba(0,184,217,0.45)', ...rise(b) }}>
        <div style={{ borderRadius: 37, background: '#0d1220', padding: '30px 40px 30px', display: 'flex', alignItems: 'center', gap: 30 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 42, fontWeight: 700, color: C.ink }}>עוזרת AI באתר</div>
            <div style={{ marginTop: 4, fontSize: 96, fontWeight: 800, letterSpacing: -1 }}>
              <GradText><T>₪99</T></GradText> <span style={{ fontSize: 40, fontWeight: 600, color: C.ink }}>לחודש / שעת שיחה</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 30, fontWeight: 500, color: C.muted }}>
              <T>עונה 24/7. משלמים לפי זמן שיחה.</T>
            </div>
          </div>
          <Face size={150} tagScale={0.8} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- big kinetic type */
export const Kinetic: React.FC<{ lines: { at: number; text: string; hl?: boolean; size?: number }[]; sub?: { at: number; text: string } }> = ({ lines, sub }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik, alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 470, left: 90, right: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {lines.map((l, i) => {
          const p = enter(f, l.at);
          if (f < l.at) return <div key={i} style={{ height: (l.size ?? 132) * 1.12 }} />;
          return (
            <div key={i} style={{ fontSize: l.size ?? 132, fontWeight: 800, lineHeight: 1.12, letterSpacing: -2, color: '#fff', ...rise(p, 50) }}>
              {l.hl ? <GradText><T>{l.text}</T></GradText> : <T>{l.text}</T>}
            </div>
          );
        })}
        {sub && f >= sub.at && (
          <div style={{ marginTop: 26, fontSize: 40, fontWeight: 500, color: C.muted, textAlign: 'center', ...rise(enter(f, sub.at), 20) }}>
            <T>{sub.text}</T>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- one line of code beat */
export const CodeBeat: React.FC = () => {
  const f = useCurrentFrame();
  const a = enter(f, 0);
  const b = enter(f, 22);
  const c = enter(f, 44);
  const n = Math.round(interpolate(f, [4, 26], [0, CODE_LINE.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, textAlign: 'center', fontSize: 104, fontWeight: 800, color: '#fff', letterSpacing: -1.5, ...rise(a) }}>
        שורת קוד <GradText>אחת</GradText>
      </div>
      <div dir="ltr" style={{ position: 'absolute', top: 640, left: 80, right: 80, borderRadius: 26, background: '#0f1420', border: '2px solid rgba(124,92,240,0.5)', padding: '30px 30px', fontFamily: F.mono, fontSize: 26.5, lineHeight: 1.5, color: '#9ecbff', whiteSpace: 'nowrap', overflow: 'hidden', boxShadow: '0 0 70px -15px rgba(124,92,240,0.6)', ...rise(b) }}>
        <Code s={CODE_LINE.slice(0, n)} />
      </div>
      <div style={{ position: 'absolute', top: 900, left: 100, right: 100, textAlign: 'center', fontSize: 52, fontWeight: 600, color: C.ink, lineHeight: 1.3, ...rise(c) }}>
        את הדמות, הקול והידע
        <br />
        <GradText style={{ fontWeight: 800 }}>אנחנו מקימים בשבילכם.</GradText>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- offer stack */
export const Offer: React.FC = () => {
  const f = useCurrentFrame();
  const rows: [React.ReactNode, number][] = [
    [<><span style={{ color: C.muted, fontWeight: 600, fontSize: 50 }}>הקמה </span><T>₪0</T></>, 4],
    [<><GradText><T>₪99</T></GradText><span style={{ fontWeight: 600, fontSize: 50 }}> לחודש / שעת שיחה</span></>, 18],
    [<span style={{ fontSize: 64 }}>מבטלים בכל חודש.</span>, 32],
  ];
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', top: 470, left: 90, right: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34 }}>
        {rows.map(([node, at], i) => (
          <div key={i} style={{ fontSize: 120, fontWeight: 800, color: '#fff', letterSpacing: -1.5, lineHeight: 1.05, textAlign: 'center', ...rise(enter(f, at), 50) }}>
            {node}
          </div>
        ))}
        <div style={{ marginTop: 20, ...rise(enter(f, 48), 20) }}>
          <Pill style={{ fontSize: 38, padding: '18px 32px 20px', border: 'none', background: C.grad, color: '#fff', fontWeight: 800 }}>
            מתחילים בהדגמה חיה בחינם
          </Pill>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- works on any site (platform names as text only) */
export const Badges: React.FC = () => {
  const f = useCurrentFrame();
  const names = ['WordPress', 'Wix', 'Shopify', 'HTML', 'כל אתר אחר'];
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontSize: 92, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: -1, ...rise(enter(f, 0)) }}>
        עובד על <GradText>כל אתר</GradText>
      </div>
      <div style={{ position: 'absolute', top: 680, left: 120, right: 120, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 22 }}>
        {names.map((n, i) => (
          <span key={n} style={{ fontSize: 46, fontWeight: 700, color: C.ink, background: C.mist, border: '2px solid rgba(232,238,247,0.16)', borderRadius: 999, padding: '16px 34px 20px', ...rise(enter(f, 10 + i * 6), 30) }}>
            <T>{n}</T>
          </span>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 1010, left: 100, right: 100, textAlign: 'center', fontSize: 44, fontWeight: 500, color: C.muted, ...rise(enter(f, 46), 20) }}>
        מדביקים שורה אחת, והעוזרת באוויר.
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- characters & voice */
export const Chars: React.FC = () => {
  const f = useCurrentFrame();
  const imgs: [string, string][] = [
    ['img/style-3d.jpg', '50% 18%'],
    ['img/talk.jpg', '50% 10%'],
  ];
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', top: 450, left: 80, right: 80, textAlign: 'center', fontSize: 84, fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: -1, ...rise(enter(f, 0)) }}>
        דמות וקול <GradText>בסגנון שלכם</GradText>
      </div>
      <div style={{ position: 'absolute', top: 690, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
        <Circle src={imgs[0][0]} pos={imgs[0][1]} p={enter(f, 12)} size={190} />
        <div style={rise(enter(f, 6), 30)}>
          <Face size={250} tagScale={1} />
        </div>
        <Circle src={imgs[1][0]} pos={imgs[1][1]} p={enter(f, 18)} size={190} />
      </div>
      <div style={{ position: 'absolute', top: 1010, left: 100, right: 100, textAlign: 'center', fontSize: 46, fontWeight: 600, color: C.ink, lineHeight: 1.3, ...rise(enter(f, 30), 20) }}>
        אתם בוחרים מראה, קול ושם.
        <br />
        <span style={{ color: C.muted, fontWeight: 500 }}>
          <T>אנחנו מקימים. הקמה ₪0.</T>
        </span>
      </div>
    </AbsoluteFill>
  );
};
const Circle: React.FC<{ src: string; pos: string; p: number; size: number }> = ({ src, pos, p, size }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(232,238,247,0.35)', ...rise(p, 30) }}>
    <Img src={staticFile(src)} style={{ width: '100%', height: '160%', objectFit: 'cover', objectPosition: pos }} />
  </div>
);

/* ---------------------------------------------------------------- up to 3 visitors at once */
export const Multi: React.FC = () => {
  const f = useCurrentFrame();
  const chats: { q: string; a: string; site: keyof typeof SITES }[] = [
    { q: 'יש מקום מחר בבוקר?', a: 'יש בשמונה. לשמור?', site: 'pilates' },
    { q: 'כמה עולה שיעור ניסיון?', a: 'שולחת לך את המחירון.', site: 'pilates' },
    { q: 'יש חניה ליד?', a: 'כן, חניה חינם בבניין.', site: 'pilates' },
  ];
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', top: 440, left: 80, right: 80, textAlign: 'center', fontSize: 84, fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: -1, ...rise(enter(f, 0)) }}>
        <T>עד 3 מבקרים</T> <GradText>בו זמנית</GradText>
      </div>
      <div style={{ position: 'absolute', top: 650, left: 100, right: 100, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {chats.map((c, i) => {
          const p = enter(f, 10 + i * 9);
          const ans = f >= 30 + i * 9;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, borderRadius: 30, background: '#fff', padding: '18px 22px', ...rise(p, 40) }}>
              <span style={{ width: 84, height: 84, borderRadius: 84, overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 4px #7c5cf0' }}>
                <Img src={staticFile('img/idle0.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
              <div style={{ fontFamily: F.assistant, flex: 1 }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: '#6b7280' }}>{c.q}</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#1f2a24', opacity: ans ? 1 : 0.25 }}>{ans ? c.a : '…'}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- languages */
export const Langs: React.FC = () => {
  const f = useCurrentFrame();
  const bubbles: [string, string, number][] = [
    ['שלום! במה אפשר לעזור?', F.assistant, 14],
    ['Hi! How can I help?', F.rubik, 22],
    ['สวัสดีค่ะ ให้ช่วยอะไรคะ', '"Noto Sans Thai", sans-serif', 30],
  ];
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', top: 440, left: 80, right: 80, textAlign: 'center', fontSize: 80, fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: -1, ...rise(enter(f, 0)) }}>
        עברית, אנגלית <GradText>ותאית</GradText>
      </div>
      <div style={{ position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center', ...rise(enter(f, 4), 30) }}>
        <Face size={270} />
      </div>
      <div style={{ position: 'absolute', top: 980, left: 130, right: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {bubbles.map(([t, font, at], i) => (
          <span key={i} dir="auto" style={{ fontFamily: font, fontSize: 36, fontWeight: 600, color: '#1b1f27', background: '#fff', borderRadius: 26, padding: '12px 26px 14px', ...rise(enter(f, at), 20) }}>
            {t}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- end card */
export const End: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, display: 'flex', justifyContent: 'center', ...rise(enter(f, 0), 30) }}>
        <Face size={210} tagScale={0.95} />
      </div>
      <div style={{ position: 'absolute', top: 600, left: 90, right: 90, textAlign: 'center', fontSize: 70, fontWeight: 800, color: '#fff', lineHeight: 1.14, letterSpacing: -1, ...rise(enter(f, 3), 40) }}>
        <T>הדגמה חיה של 3 דקות</T>
        <br />
        על האתר שלכם. <GradText>בחינם.</GradText>
      </div>
      <div style={{ position: 'absolute', top: 800, left: 80, right: 80, textAlign: 'center', fontSize: 44, fontWeight: 600, color: C.ink, ...rise(enter(f, 9), 30) }}>
        <GradText style={{ fontWeight: 800 }}><T>₪99</T></GradText> <T>לחודש / שעת שיחה. הקמה ₪0.</T>
      </div>
      <div style={{ position: 'absolute', top: 905, left: 0, right: 0, display: 'flex', justifyContent: 'center', ...rise(enter(f, 14), 20) }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 40, fontWeight: 800, color: '#06210f', background: '#3fd27a', borderRadius: 999, padding: '20px 40px 22px', boxShadow: '0 16px 40px -12px rgba(63,210,122,0.6)' }}>
          שלחו לנו כתובת אתר
        </span>
      </div>
      <div style={{ position: 'absolute', top: 1062, left: 0, right: 0, textAlign: 'center', ...rise(enter(f, 18), 10) }}>
        <div dir="ltr" style={{ fontSize: 34, fontWeight: 500, color: C.muted }}>refael-ai-flow.lovable.app</div>
        <div dir="ltr" style={{ marginTop: 10, fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
          Refael<GradText>.ai</GradText>
        </div>
      </div>
    </AbsoluteFill>
  );
};
