import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C, F, VO, FPS } from '../theme';
import { Face } from './Face';
import { GradText, Pill, T, ease, pop, useFrom, useSpec } from './common';
import ENV from '../a2env.json';

const enter = (f: number, at = 0) => (f < at ? 0 : pop(f, at, { damping: 14, stiffness: 190 }));
const rise = (p: number, d = 40): React.CSSProperties => ({ transform: `translateY(${(1 - p) * d}px) scale(${0.94 + 0.06 * p})`, opacity: Math.min(1, p * 1.4) });

export const Q_PRICE = 'כמה עולה הסרת שיער בלייזר?';
export const A_PRICE = '₪450 לטיפול. לשמור לך שיחת ייעוץ?';

/* ---------------------------------------------------------------- hook: the same answer, three ways */
export const Triptych: React.FC<{ answerAt: number; dimAt: number }> = ({ answerAt, dimAt }) => {
  const f = useCurrentFrame();
  const from = useFrom();
  const spec = useSpec();
  const v = spec.voices.find((x) => x.key === 'A2');
  const a0 = v ? v.at - from : answerAt;
  const len = Math.round(VO.A2.dur * FPS);
  const prog = interpolate(f, [a0, a0 + len - 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dim = ease(f, dimAt, dimAt + 12);
  const top = 540;
  const h = 222;
  const gap = 14;
  const tile = (i: number, node: React.ReactNode, label: string, hero = false) => {
    const p = i === 0 || f >= 0 ? 1 : 0;
    const d = hero ? 0 : dim;
    return (
      <div
        dir="rtl"
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          top: top + i * (h + gap),
          height: h,
          borderRadius: 34,
          padding: hero ? 3 : 0,
          background: hero ? C.grad : 'transparent',
          boxShadow: hero ? `0 0 ${50 + 40 * dim}px -10px rgba(0,184,217,${0.35 + 0.35 * dim})` : 'none',
          opacity: (1 - 0.72 * d) * p,
          transform: `scale(${hero ? 1 + 0.03 * dim : 1 - 0.03 * d})`,
          filter: d > 0 ? `saturate(${1 - 0.8 * d})` : undefined,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: hero ? 31 : 34, overflow: 'hidden', background: i === 1 ? '#151c2b' : '#fbf7f3', border: hero ? 'none' : '2px solid rgba(232,238,247,0.14)' }}>
          {node}
          <div style={{ position: 'absolute', top: 14, right: 20 }}>
            <Pill style={{ fontSize: 22, padding: '7px 14px 8px', background: i === 1 ? 'rgba(255,255,255,0.08)' : 'rgba(59,48,43,0.08)', color: i === 1 ? C.ink : '#3b302b', border: 'none' }}>
              {label}
            </Pill>
          </div>
        </div>
      </div>
    );
  };
  const qBubble = (dark = false) => (
    <div style={{ alignSelf: 'flex-end', borderRadius: 24, borderBottomLeftRadius: 8, background: dark ? '#2b3446' : '#c98f7a', color: '#fff', fontFamily: F.assistant, fontWeight: 700, fontSize: 30, padding: '10px 20px 12px' }}>
      {Q_PRICE}
    </div>
  );
  // 1. text chat: the answer types out over the same time span
  const shown = Math.round(prog * A_PRICE.length);
  const chat = (
    <div style={{ position: 'absolute', inset: 0, padding: '18px 26px 20px', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'flex-end' }}>
      {qBubble()}
      <div style={{ alignSelf: 'flex-start', minHeight: 58, borderRadius: 24, borderBottomRightRadius: 8, background: '#efe6de', color: '#3b302b', fontFamily: F.assistant, fontWeight: 700, fontSize: 32, padding: '10px 22px 12px', opacity: f >= a0 ? 1 : 0.0 }}>
        <T>{A_PRICE.slice(0, shown) || ' '}</T>
      </div>
    </div>
  );
  // 2. voice only: waveform from the real answer audio
  const bars = 44;
  const voice = (
    <div style={{ position: 'absolute', inset: 0, padding: '18px 26px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 0 }}>{qBubble(true)}</div>
      <div dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: 5, height: 100, padding: '0 10px' }}>
        <svg width="46" height="46" viewBox="0 0 24 24" style={{ marginRight: 12, flexShrink: 0 }}>
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill={C.ink} />
          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke={C.cyan} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
        {Array.from({ length: bars }).map((_, i) => {
          const k = f - a0 - (bars - 1 - i);
          const amp = k >= 0 && k < ENV.length ? (ENV as number[])[k] : 0;
          const hgt = 6 + amp * 84;
          return <span key={i} style={{ width: 9, height: hgt, borderRadius: 6, background: amp > 0.02 ? C.grad : 'rgba(232,238,247,0.25)' }} />;
        })}
      </div>
    </div>
  );
  // 3. the talking face
  const face = (
    <div dir="ltr" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 26, padding: '0 26px 0 34px' }}>
      <div style={{ flexShrink: 0, marginTop: -10 }}>
        <Face size={164} tagScale={0.85} />
      </div>
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, paddingTop: 40, alignItems: 'flex-start' }}>{qBubble()}</div>
    </div>
  );
  return (
    <AbsoluteFill>
      {tile(0, chat, 'צ׳אט טקסט')}
      {tile(1, voice, 'רק קול')}
      {tile(2, face, 'פנים מדברות', true)}
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- research beats */
export const Research: React.FC<{ long?: boolean }> = ({ long }) => {
  const f = useCurrentFrame();
  const a = enter(f, 0);
  const b = enter(f, long ? 75 : 22);
  const bar = (pct: number, at: number) => ease(f, at, at + 18) * pct;
  const bAt = long ? 80 : 26;
  const rows: [string, number, boolean][] = [
    ['ראש רובוט עם פנים', 54, true],
    ['רמקול קולי', 23, false],
    ['אף אחד', 23, false],
  ];
  return (
    <AbsoluteFill dir="rtl" style={{ fontFamily: F.rubik }}>
      <div style={{ position: 'absolute', left: 100, right: 100, top: 470, borderRadius: 34, background: C.mist, border: '2px solid rgba(232,238,247,0.12)', padding: '26px 34px 22px', ...rise(a) }}>
        <div style={{ fontSize: 26, fontWeight: 600, color: C.cyan }}>
          <T>מחקר 2025 · 80 משתתפים</T>
        </div>
        <div style={{ marginTop: 8, fontSize: 44, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
          מול אווטאר מדבר, אנשים ענו <GradText>בפירוט רב יותר</GradText> מאשר מול צ׳אט טקסט.
        </div>
        <div dir="ltr" style={{ marginTop: 12, fontSize: 20, color: 'rgba(139,151,170,0.95)', textAlign: 'right' }}>
          Krajcovic, Demcak, Kuric · arXiv 2508.02376 · 2025
        </div>
      </div>
      <div style={{ position: 'absolute', left: 100, right: 100, top: 812, borderRadius: 34, background: C.mist, border: '2px solid rgba(232,238,247,0.12)', padding: '24px 34px 20px', ...rise(b) }}>
        <div style={{ fontSize: 26, fontWeight: 600, color: C.cyan }}>
          <T>מחקר 2023 · 31 משתתפים</T>
        </div>
        <div style={{ marginTop: 6, fontSize: 36, fontWeight: 800, color: '#fff' }}>על מי תסמכו יותר במצב חירום?</div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rows.map(([k, pct, hl], i) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 27, fontWeight: 600, color: hl ? '#fff' : C.muted }}>
              <span style={{ width: 230 }}>{k}</span>
              <span style={{ flex: 1, height: 22, borderRadius: 12, background: 'rgba(232,238,247,0.08)', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: `${bar(pct, bAt + i * 5) / 0.6}%`, borderRadius: 12, background: hl ? C.grad : 'rgba(232,238,247,0.35)' }} />
              </span>
              <span dir="ltr" style={{ width: 70, textAlign: 'left', fontWeight: 800 }}>{Math.round(bar(pct, bAt + i * 5))}%</span>
            </div>
          ))}
        </div>
        <div dir="ltr" style={{ marginTop: 12, fontSize: 20, color: 'rgba(139,151,170,0.95)', textAlign: 'right' }}>
          Robb et al. · Frontiers in Robotics and AI · 2023
        </div>
      </div>
      <div style={{ position: 'absolute', top: 1196, left: 0, right: 0, textAlign: 'center', fontSize: 24, fontWeight: 500, color: C.muted, ...rise(enter(f, long ? 100 : 34), 10) }}>
        מחקרים קטנים. התוצאות ראשוניות.
      </div>
    </AbsoluteFill>
  );
};
