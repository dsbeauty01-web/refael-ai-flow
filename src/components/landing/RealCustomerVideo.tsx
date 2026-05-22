import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// ============================================================
//  Maya = Runway's hosted embed widget (no custom React code).
//  Mika still uses the SDK via FloatingAvatarWidget on the main site.
// ============================================================

const MAYA_WIDGET_SCRIPT_SRC = 'https://cdn.dev.runwayml.com/prod/widget.js';
const MAYA_PUB_KEY =
  'pub_515b16e7eef6a6fa7ffc1bd9561ffaeccb38675116bed61c22a26bda6a5a8e67';

const RealCustomerVideo = () => {
  const { isHebrew } = useLanguage();

  // Load Runway widget script ONCE for the whole page
  useEffect(() => {
    const existing = document.querySelector(
      `script[src="${MAYA_WIDGET_SCRIPT_SRC}"]`,
    );
    if (existing) return;

    const s = document.createElement('script');
    s.src = MAYA_WIDGET_SCRIPT_SRC;
    s.async = true;
    s.setAttribute('data-pub-key', MAYA_PUB_KEY);
    document.body.appendChild(s);
  }, []);

  const t = isHebrew
    ? {
        sectionTitle: 'ככה זה נראה אצל לקוחות אמיתיים',
        cardTitle: 'מאיה — מזכירה דיגיטלית',
        cardSubtitle: 'דמו חי של בוט לקליניקת יופי',
        cardBody:
          'לחצו על הבועה למטה כדי לדבר עם מאיה. היא קובעת תורים, עונה על שאלות מחירים ושעות, ופועלת 24/7.',
        hint: '👀 הסתכלו בפינה הימנית למטה',
      }
    : {
        sectionTitle: 'Real customers, real results',
        cardTitle: 'Maya — Digital Receptionist',
        cardSubtitle: 'Live demo of a beauty clinic bot',
        cardBody:
          "Click the bubble below to talk with Maya. She books, answers price/hours questions, and runs 24/7.",
        hint: '👀 Look at the bottom-right corner',
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-5xl mx-auto">
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

          {/* RIGHT: Maya intro card — points users to the Runway widget */}
          <div
            className={`w-full ${isHebrew ? 'font-hebrew' : 'font-sans'}`}
            dir={isHebrew ? 'rtl' : 'ltr'}
            style={{
              background: '#fdf6f0',
              border: '1px solid #eadbc8',
              borderRadius: '24px',
              padding: '32px 24px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
              minHeight: '320px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                alignSelf: isHebrew ? 'flex-end' : 'flex-start',
                background: '#ffe4ec',
                color: '#b04a6f',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              {isHebrew ? '🟢 חי' : '🟢 LIVE'}
            </div>

            <h3
              style={{
                color: '#3a2818',
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '6px',
              }}
            >
              {t.cardTitle}
            </h3>
            <p
              style={{
                color: '#8a6850',
                fontSize: '14px',
                marginBottom: '14px',
              }}
            >
              {t.cardSubtitle}
            </p>

            <p
              style={{
                color: '#3a2818',
                fontSize: '15px',
                lineHeight: 1.5,
                marginBottom: '18px',
              }}
            >
              {t.cardBody}
            </p>

            <div
              style={{
                color: '#c08a5c',
                fontSize: '14px',
                fontWeight: 600,
                background: '#fff',
                border: '1px dashed #d4a574',
                padding: '10px 14px',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              {t.hint}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealCustomerVideo;
