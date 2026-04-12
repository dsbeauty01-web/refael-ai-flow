const SoundBars = ({ count = 5, height = 32, color = 'hsl(var(--primary))' }: { count?: number; height?: number; color?: string }) => (
  <div className="flex items-center gap-[3px]" style={{ height }}>
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="rounded-full"
        style={{
          width: 3,
          background: color,
          animation: `equalizer ${0.6 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
          height: height * 0.35,
        }}
      />
    ))}
  </div>
);

export default SoundBars;
