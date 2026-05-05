const RealCustomerVideo = () => {
  return (
    <section style={{ background: '#0a0a14', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="font-hebrew text-center font-bold text-white mb-10"
          style={{ fontSize: '36px' }}
          dir="rtl"
        >
          ככה זה נראה אצל לקוחות אמיתיים
        </h2>
        <div className="mx-auto w-full" style={{ maxWidth: '600px' }}>
          <video
            src="https://dsbeauty01-web.github.io/refael-ai-flow/shil.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto"
            style={{ borderRadius: '16px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default RealCustomerVideo;