import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SalonAvatarWidget from '@/components/SalonAvatarWidget';

const RealCustomerVideo = () => {
  const { isHebrew } = useLanguage();
  const [open, setOpen] = useState(false);

  const t = isHebrew
    ? {
        sectionTitle: 'ככה זה נראה אצל לקוחות אמיתיים',
        live: '🟢 חי',
        title: 'מאיה — מזכירה דיגיטלית',
        subtitle: 'סלון יופי וציפורניים',
        description: 'קובעת תורים, בודקת יומן, עונה 24/7.',
        bullets: ['קביעת תורים', 'עברית ואנגלית', 'קול וטקסט'],
        cta: '💬 דברו עם מאיה',
      }
    : {
        sectionTitle: "Real customers, real results",
        live: '🟢 LIVE',
        title: 'Maya — Digital Receptionist',
        subtitle: 'Beauty & Nail Salon',
        description: 'Books, checks calendar, replies 24/7.',
        bullets: ['Booking', 'Hebrew & English', 'Voice & text'],
        cta: '💬 Talk to Maya',
      };

  return (
    <section style={{ background: '#0a0a14', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-center font-bold text-white mb-10 ${isHebrew ? 'font-hebrew' : 'font-sans'}`}
          style={{ fontSize: '36px' }}
          dir={isHebrew ? 'rtl' : 'ltr'}
        >
          {t.sectionTitle}
        </h2>

        {/* 2-COLUMN GRID: video left, Maya card right (desktop). Stacked on mobile. */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-5xl mx-auto"
        >
          {/* LEFT: existing video */}
          <div className="w-full">
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

          {/* RIGHT: Maya card */}
          <div
            className="w-full relative"
            style={{
              background: '#fdf6f0',
              border: '1px solid #eadbc8',
              borderRadius: '24px',
              padding: '32px 24px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            }}
            dir={isHebrew ? 'rtl' : 'ltr'}
          >
            {/* LIVE badge */}
            <div
              className="absolute top-4"
              style={{
                [isHebrew ? 'left' : 'right']: '16px',
                background: '#ffe4ec',
                color: '#b04a6f',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {t.live}
            </div>

            {/* Avatar circle */}
            <div className="flex justify-center mb-4">
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  border: '3px solid #d4a574',
                  overflow: 'hidden',
                  boxShadow: '0 0 0 6px rgba(212,165,116,0.15)',
                  animation: 'mayaPulse 2.4s ease-in-out infinite',
                  background: '#fff',
                }}
              >
                <img
                  src="/maya-face.jpg"
                  alt="Maya"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Title + subtitle */}
            <h3
              className={`text-center font-bold ${isHebrew ? 'font-hebrew' : 'font-sans'}`}
              style={{ color: '#3a2818', fontSize: '22px', marginBottom: '4px' }}
            >
              {t.title}
            </h3>
            <p
              className={`text-center ${isHebrew ? 'font-hebrew' : 'font-sans'}`}
              style={{ color: '#8a6850', fontSize: '14px', marginBottom: '12px' }}
            >
              {t.subtitle}
            </p>

            {/* Description */}
            <p
              className={`text-center ${isHebrew ? 'font-hebrew' : 'font-sans'}`}
              style={{ color: '#5a3f2b', fontSize: '15px', marginBottom: '16px' }}
            >
              {t.description}
            </p>

            {/* 3 bullets */}
            <ul
              className={isHebrew ? 'font-hebrew' : 'font-sans'}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 20px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {t.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    color: '#3a2818',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: '#d4a574', fontWeight: 700 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => setOpen(true)}
              className={`w-full ${isHebrew ? 'font-hebrew' : 'font-sans'}`}
              style={{
                background: 'linear-gradient(135deg, #d4a574 0%, #c08a5c 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                padding: '14px 20px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(212,165,116,0.45)',
                transition: 'transform 0.15s ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {t.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SalonAvatarWidget open={open} onClose={() => setOpen(false)} />

      {/* Inline pulse animation */}
      <style>{`
        @keyframes mayaPulse {
          0%, 100% { box-shadow: 0 0 0 6px rgba(212,165,116,0.15); }
          50%      { box-shadow: 0 0 0 10px rgba(212,165,116,0.25); }
        }
      `}</style>
    </section>
  );
};

export default RealCustomerVideo;
