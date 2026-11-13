import React from 'react';
import { Loop, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { C, IDLE_FRAMES, LS_LEAD, VO, FPS } from '../theme';
import { AiTag, useFrom, useSpec } from './common';

/**
 * The talking face. Idle = lip-synced silence loop; each voice line = its own LatentSync clip,
 * placed at the voice's absolute frame. `size` is in the parent's px units.
 */
export const Face: React.FC<{ size: number; tag?: boolean; tagScale?: number; ring?: number; only?: string[] }> = ({
  size,
  tag = true,
  tagScale = 1,
  ring = 6,
  only,
}) => {
  const spec = useSpec();
  const from = useFrom();
  const f = useCurrentFrame();
  const abs = f + from;
  const lines = spec.voices.filter((v) => !only || only.includes(v.key));
  const active = lines.find((v) => abs >= v.at - LS_LEAD && abs < v.at - LS_LEAD + Math.round(VO[v.key].clip * FPS));
  const speaking = !!lines.find((v) => abs >= v.at && abs < v.at + Math.round(VO[v.key].dur * FPS));
  const glow = speaking ? 0.55 + 0.25 * Math.sin(abs / 3) : 0.25;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div
        style={{
          position: 'absolute',
          inset: -ring,
          borderRadius: '50%',
          background: C.ring,
          boxShadow: `0 0 ${size * 0.35}px rgba(0,184,217,${glow}), 0 ${size * 0.12}px ${size * 0.3}px rgba(0,0,0,0.45)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `${Math.max(3, size * 0.022)}px solid #fff`,
          background: '#eadfd6',
        }}
      >
        <Loop durationInFrames={IDLE_FRAMES}>
          <OffthreadVideo src={staticFile('face/IDLE.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Loop>
        {lines.map((v, i) => {
          const start = v.at - LS_LEAD - from;
          const len = Math.round(VO[v.key].clip * FPS);
          if (abs < v.at - LS_LEAD || abs >= v.at - LS_LEAD + len) return null;
          const op = interpolate(f, [start, start + 3, start + len - 4, start + len], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <Sequence key={i} from={start} durationInFrames={len} layout="none">
              <OffthreadVideo
                src={staticFile(`face/${v.key}.mp4`)}
                muted
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: op }}
              />
            </Sequence>
          );
        })}
      </div>
      <span
        style={{
          position: 'absolute',
          bottom: size * 0.04,
          right: size * 0.06,
          width: size * 0.13,
          height: size * 0.13,
          borderRadius: '50%',
          background: '#3fbf63',
          border: `${Math.max(3, size * 0.022)}px solid #fff`,
        }}
      />
      {tag && (
        <div style={{ position: 'absolute', left: '50%', bottom: -size * 0.12, transform: 'translateX(-50%)' }}>
          <AiTag scale={tagScale} />
        </div>
      )}
      {active ? null : null}
    </div>
  );
};
