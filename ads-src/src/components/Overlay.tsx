import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, F } from '../theme';
import type { Caption } from '../types';
import { GradText, Pill, T, ease, pop, useSpec } from './common';

/** Kinetic captions: word groups spring in one after another and stay until the block ends. */
export const Captions: React.FC = () => {
  const spec = useSpec();
  const f = useCurrentFrame();
  const cap = spec.captions.find((c) => f >= c.from && f < c.to);
  // scrim behind captions whenever a phone shot is on screen
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {cap && <CaptionBlock cap={cap} f={f} />}
    </AbsoluteFill>
  );
};

const CaptionBlock: React.FC<{ cap: Caption; f: number }> = ({ cap, f }) => {
  const out = ease(f, cap.to - 5, cap.to);
  const size = cap.size ?? 76;
  return (
    <div
      dir="rtl"
      style={{
        position: 'absolute',
        top: 322,
        left: 110,
        right: 110,
        minHeight: 200,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        columnGap: size * 0.26,
        rowGap: 0,
        fontFamily: F.rubik,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.16,
        color: '#fff',
        letterSpacing: -0.5,
        textAlign: 'center',
        opacity: 1 - out,
        transform: `translateY(${-out * 20}px)`,
      }}
    >
      {cap.groups.map((g, i) => {
        // the very first group of the ad is fully visible on frame 0 (thumb-stop)
        const p = g.at <= 0 ? 1 : pop(f, g.at, { damping: 13, stiffness: 220 });
        if (f < g.at) return null;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `translateY(${(1 - p) * 34}px) scale(${0.9 + 0.1 * p})`,
              opacity: Math.min(1, p * 1.4),
              textShadow: g.hl ? 'none' : '0 4px 24px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.5)',
              filter: g.hl ? 'drop-shadow(0 4px 18px rgba(0,0,0,0.6))' : undefined,
            }}
          >
            {g.hl ? <GradText><T>{g.text}</T></GradText> : <T>{g.text}</T>}
          </span>
        );
      })}
    </div>
  );
};

/** Dark top scrim so captions read over a zoomed phone. */
export const Scrim: React.FC<{ strength?: number }> = ({ strength = 1 }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(180deg, rgba(8,11,18,${0.97 * strength}) 0%, rgba(8,11,18,${0.95 * strength}) 19%, rgba(8,11,18,${0.6 * strength}) 23%, rgba(8,11,18,0) 30%)`,
      pointerEvents: 'none',
    }}
  />
);

/** "המחשה" micro-label on scripted demo scenes. */
export const IllusLabel: React.FC = () => {
  const spec = useSpec();
  const f = useCurrentFrame();
  const on = spec.illus.some(([a, b]) => f >= a && f < b);
  if (!on) return null;
  return (
    <div style={{ position: 'absolute', top: 274, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <Pill style={{ fontSize: 22, fontWeight: 500, padding: '7px 14px 8px', color: 'rgba(232,238,247,0.85)', background: 'rgba(8,11,18,0.6)' }}>
        המחשה
      </Pill>
    </div>
  );
};

/** Offer strip shown from ~11 s in the long versions. */
export const OfferStrip: React.FC = () => {
  const spec = useSpec();
  const f = useCurrentFrame();
  if (!spec.offerStrip) return null;
  const [a, b] = spec.offerStrip;
  if (f < a || f >= b) return null;
  const p = pop(f, a, { damping: 14 });
  const o = 1 - ease(f, b - 6, b);
  return (
    <div style={{ position: 'absolute', top: 326, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: o }}>
      <span
        dir="rtl"
        style={{
          transform: `translateY(${(1 - p) * 40}px)`,
          opacity: Math.min(1, p * 1.5),
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          fontFamily: F.rubik,
          fontWeight: 700,
          fontSize: 34,
          color: '#fff',
          background: 'rgba(8,11,18,0.88)',
          borderRadius: 999,
          padding: '16px 30px 18px',
          boxShadow: '0 0 0 2px rgba(0,184,217,0.6), 0 20px 50px -10px rgba(0,0,0,0.7)',
        }}
      >
        <span>הדגמה חיה בחינם</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <GradText><T>₪99 לחודש / שעת שיחה</T></GradText>
      </span>
    </div>
  );
};
