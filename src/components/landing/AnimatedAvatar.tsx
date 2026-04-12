const AnimatedAvatar = ({ size = 250, className = '' }: { size?: number; className?: string }) => {
  const s = size;
  const eyeSize = s * 0.09;
  const pupilSize = eyeSize * 0.5;

  return (
    <div className={`relative ${className}`} style={{ width: s, height: s }}>
      {/* Head */}
      <div
        className="absolute inset-0 rounded-full shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #fdd8b5 0%, #f5c5a3 40%, #f0b08a 100%)',
        }}
      />
      {/* Inner face highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: s * 0.85,
          height: s * 0.85,
          top: s * 0.05,
          left: s * 0.075,
          background: 'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.35) 0%, transparent 60%)',
        }}
      />

      {/* Left cheek */}
      <div
        className="absolute rounded-full"
        style={{
          width: s * 0.18,
          height: s * 0.12,
          top: s * 0.52,
          left: s * 0.12,
          background: 'radial-gradient(ellipse, rgba(255,130,130,0.45) 0%, transparent 70%)',
        }}
      />
      {/* Right cheek */}
      <div
        className="absolute rounded-full"
        style={{
          width: s * 0.18,
          height: s * 0.12,
          top: s * 0.52,
          right: s * 0.12,
          background: 'radial-gradient(ellipse, rgba(255,130,130,0.45) 0%, transparent 70%)',
        }}
      />

      {/* Left eye */}
      <div className="absolute avatar-eye" style={{ width: eyeSize * 2.2, height: eyeSize * 2, top: s * 0.35, left: s * 0.25 }}>
        <div className="w-full h-full rounded-full bg-white shadow-inner flex items-center justify-center">
          <div className="rounded-full bg-[#2d1b0e] relative" style={{ width: pupilSize * 2, height: pupilSize * 2 }}>
            <div className="absolute rounded-full bg-white" style={{ width: pupilSize * 0.6, height: pupilSize * 0.6, top: '15%', left: '55%' }} />
          </div>
        </div>
      </div>
      {/* Right eye */}
      <div className="absolute avatar-eye" style={{ width: eyeSize * 2.2, height: eyeSize * 2, top: s * 0.35, right: s * 0.25 }}>
        <div className="w-full h-full rounded-full bg-white shadow-inner flex items-center justify-center">
          <div className="rounded-full bg-[#2d1b0e] relative" style={{ width: pupilSize * 2, height: pupilSize * 2 }}>
            <div className="absolute rounded-full bg-white" style={{ width: pupilSize * 0.6, height: pupilSize * 0.6, top: '15%', left: '55%' }} />
          </div>
        </div>
      </div>

      {/* Eyebrows */}
      <div
        className="absolute rounded-full"
        style={{ width: s * 0.14, height: s * 0.025, top: s * 0.3, left: s * 0.24, background: '#8b6b4a', transform: 'rotate(-5deg)' }}
      />
      <div
        className="absolute rounded-full"
        style={{ width: s * 0.14, height: s * 0.025, top: s * 0.3, right: s * 0.24, background: '#8b6b4a', transform: 'rotate(5deg)' }}
      />

      {/* Nose */}
      <div
        className="absolute rounded-full"
        style={{
          width: s * 0.06,
          height: s * 0.04,
          top: s * 0.48,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(200,150,120,0.5) 0%, transparent 70%)',
        }}
      />

      {/* Mouth - animated speaking */}
      <div
        className="absolute avatar-mouth"
        style={{
          width: s * 0.18,
          left: '50%',
          top: s * 0.6,
          transform: 'translateX(-50%)',
          height: s * 0.09,
        }}
      >
        <div
          className="w-full h-full rounded-[50%] overflow-hidden"
          style={{ background: '#c0463a' }}
        >
          {/* Teeth */}
          <div
            className="absolute w-full"
            style={{ height: '35%', top: 0, background: 'rgba(255,255,255,0.9)', borderRadius: '0 0 40% 40%' }}
          />
        </div>
      </div>

      {/* Sparkles */}
      {[
        { top: '5%', left: '10%', delay: '0s', size: 6 },
        { top: '15%', right: '5%', delay: '1s', size: 4 },
        { bottom: '10%', left: '5%', delay: '2s', size: 5 },
        { bottom: '20%', right: '10%', delay: '0.5s', size: 3 },
        { top: '0%', left: '50%', delay: '1.5s', size: 4 },
      ].map((sp, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-sparkle"
          style={{
            ...sp,
            width: sp.size,
            height: sp.size,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,200,100,0.6))',
            animationDelay: sp.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedAvatar;
