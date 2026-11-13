import React, { createContext, useContext } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, Easing } from 'remotion';
import { C, F, FPS } from '../theme';
import type { Spec } from '../types';

export const SpecCtx = createContext<Spec | null>(null);
export const useSpec = () => useContext(SpecCtx) as Spec;
// absolute frame offset of the current scene (Sequence)
export const FromCtx = createContext(0);
export const useFrom = () => useContext(FromCtx);

export const pop = (frame: number, at: number, cfg: { damping?: number; mass?: number; stiffness?: number } = {}) =>
  frame < at ? 0 : spring({ frame: frame - at, fps: FPS, config: { damping: cfg.damping ?? 14, mass: cfg.mass ?? 0.6, stiffness: cfg.stiffness ?? 180 } });

export const ease = (frame: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(frame, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1) });

/** Wraps numbers, prices, times, phones and Latin runs in LTR isolates so Hebrew lines order correctly. */
const LTR_RUN = /(≈?₪?\d(?:[\d,.:/\-]*\d)?|[A-Za-z][A-Za-z0-9.\-_/]*(?:[ ,]+[A-Za-z][A-Za-z0-9.\-_/]*)*)/g;
export const T: React.FC<{ children: string }> = ({ children }) => {
  const parts = children.split(LTR_RUN);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <bdi key={i} dir="ltr" style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}>
            {p}
          </bdi>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
};

export const GradText: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span
    style={{
      background: C.gradText,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      ...style,
    }}
  >
    {children}
  </span>
);

/** Brand background: navy paper, two slow live-gradient glows, faint grid. */
export const BrandBg: React.FC<{ night?: boolean }> = ({ night }) => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 70) * 40;
  const dy = Math.cos(f / 90) * 30;
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 70% 40% at ${22 + dx / 20}% ${24 + dy / 20}%, rgba(0,184,217,${night ? 0.14 : 0.22}), transparent 65%),
            radial-gradient(ellipse 65% 45% at ${85 - dx / 25}% ${78 - dy / 25}%, rgba(124,92,240,${night ? 0.16 : 0.22}), transparent 65%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(232,238,247,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,238,247,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000, transparent 80%)',
        }}
      />
    </AbsoluteFill>
  );
};

export const Pill: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span
    dir="rtl"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: F.rubik,
      fontWeight: 600,
      fontSize: 24,
      lineHeight: 1,
      color: C.ink,
      background: 'rgba(8,11,18,0.72)',
      border: '1.5px solid rgba(232,238,247,0.28)',
      borderRadius: 999,
      padding: '9px 16px 10px',
      backdropFilter: 'blur(6px)',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </span>
);

export const AiTag: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <Pill style={{ fontSize: 22 * scale, padding: `${7 * scale}px ${14 * scale}px ${8 * scale}px`, background: 'rgba(8,11,18,0.82)' }}>
    <span style={{ width: 9 * scale, height: 9 * scale, borderRadius: 9, background: C.grad }} />
    דמות AI
  </Pill>
);
