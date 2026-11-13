import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import type { Scene, Spec } from './types';
import { BrandBg, FromCtx, SpecCtx } from './components/common';
import { PhoneShot } from './components/Phone';
import { Badges, Chars, CodeBeat, Compare, Editor, End, Kinetic, Langs, Multi, Offer } from './components/Scenes';
import { Captions, IllusLabel, OfferStrip } from './components/Overlay';
import { ease } from './components/common';

const SceneView: React.FC<{ sc: Scene }> = ({ sc }) => {
  const f = useCurrentFrame();
  // every scene punches in: quick fade + 1.04 -> 1 settle
  const inP = ease(f, 0, 7);
  const body = (() => {
    switch (sc.type) {
      case 'phone':
        return <PhoneShot sc={sc} />;
      case 'editor':
        return <Editor short={sc.short} />;
      case 'compare':
        return <Compare />;
      case 'kinetic':
        return <Kinetic lines={sc.lines} sub={sc.sub} />;
      case 'code':
        return <CodeBeat />;
      case 'offer':
        return <Offer />;
      case 'badges':
        return <Badges />;
      case 'chars':
        return <Chars />;
      case 'multi':
        return <Multi />;
      case 'langs':
        return <Langs />;
      case 'end':
        return <End />;
    }
  })();
  const night = sc.type === 'phone' && sc.night;
  // brand scenes keep moving: slow push-in over the whole scene
  const push = sc.type === 'phone' ? 1 : 1 + 0.035 * (f / Math.max(1, sc.dur));
  return (
    <AbsoluteFill>
      <BrandBg night={night} />
      <AbsoluteFill style={{ opacity: sc.from === 0 ? 1 : inP, transform: `scale(${(sc.from === 0 ? 1 : 1.04 - 0.04 * inP) * push})`, transformOrigin: '50% 40%' }}>{body}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AdVideo: React.FC<{ spec: Spec }> = ({ spec }) => (
  <SpecCtx.Provider value={spec}>
    <AbsoluteFill style={{ background: '#080B12' }}>
      {spec.scenes.map((sc, i) => (
        <Sequence key={i} from={sc.from} durationInFrames={sc.dur}>
          <FromCtx.Provider value={sc.from}>
            <SceneView sc={sc} />
          </FromCtx.Provider>
        </Sequence>
      ))}
      <Captions />
      <OfferStrip />
      <IllusLabel />
      {spec.audio.map((a, i) => (
        <Sequence key={`a${i}`} from={a.at} layout="none">
          <Audio src={staticFile(a.src)} volume={a.vol} />
        </Sequence>
      ))}
    </AbsoluteFill>
  </SpecCtx.Provider>
);
