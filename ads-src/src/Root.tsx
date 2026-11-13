import React from 'react';
import { Composition } from 'remotion';
import './fonts';
import { AdVideo } from './Video';
import { SPECS } from './specs';
import { FPS, W, H } from './theme';

export const Root: React.FC = () => (
  <>
    {SPECS.map((spec) => (
      <Composition
        key={spec.id}
        id={spec.id}
        component={AdVideo as any}
        durationInFrames={spec.dur}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{ spec }}
      />
    ))}
  </>
);
