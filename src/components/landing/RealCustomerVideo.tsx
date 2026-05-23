import { useState } from 'react';
import {
  AvatarCall,
  AvatarVideo,
  ControlBar,
  useAvatarSession,
} from '@runwayml/avatars-react';
import '@runwayml/avatars-react/styles.css';

// ============================================================
//  CONFIG — Mia (salon receptionist demo)
// ============================================================
const BOT_SERVER_URL =
  (import.meta as any).env?.VITE_BOT_SERVER_URL || 'https://bot-vibk.onrender.com';
const SALON_AVATAR_ID = '72860735-d02e-49af-9b5d-1020bc956ebc';
const SALON_IMAGE = '/0e55ac1a-f33c-4d3c-8a42-37c6a40bfef0.png';

// ============================================================
//  Inner avatar view (must be inside <AvatarCall>)
// ============================================================
function MiaInnerView({ onEnd }: { onEnd: () => void }) {
  const session = useAvatarSession();
  const isActive = session.state === 'active';

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
      {!isActive && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 text-white z-10 pointer-events-none">
          <div className="w-10 h-10 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <span className="text-sm">מתחברים למיה...</span>
          <span className="text-xs text-white/60">(עד 50 שניות בפעם הראשונה)</span>
        </div>
      )}
      <AvatarVideo />

      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm">
        <ControlBar />
        <div className="px-3 pb-2 text-center">
          <button
            type="button"
            onClick={onEnd}
            className="text-white/70 hover:text-white text-xs underline"
          >
            סיים שיחה
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  ROOT — RealCustomerVideo section
// ============================================================
export function RealCustomerVideo() {
  const [callStarted, setCallStarted] = useState(false);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-[#0a0a1a] to-[#13131f]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            דמו חי
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight" dir="rtl">
            ככה זה נראה אצל לקוח אמיתי
          </h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto" dir="rtl">
            דברי עם מיה, המזכירה הדיגיטלית של מספרה. תזמיני תור, תשאלי על מחירים, תראי איך זה עובד.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* LEFT — beauty clinic image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[400px] md:min-h-[520px]">
            <img
              src={SALON_IMAGE}
              alt="קליניקת יופי"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                // fallback if image is missing
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 left-6 text-white" dir="rtl">
              <div className="text-2xl font-bold mb-1">סלון יופי "אלגנט"</div>
              <div className="text-white/80 text-sm">תל אביב • פתוח 9:00–20:00</div>
            </div>
          </div>

          {/* RIGHT — cream card with Mia */}
          <div
            className="rounded-2xl shadow-2xl bg-gradient-to-br from-[#f5ebd9] to-[#e8d9bf] p-6 md:p-8 flex flex-col min-h-[400px] md:min-h-[520px]"
            dir="rtl"
          >
            {!callStarted ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </span>
                  <span className="text-[#5a4a2a] text-sm font-medium">דמו זמין עכשיו</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-[#2a1f10] mb-3 leading-tight">
                  מיה — מזכירה דיגיטלית
                </h3>

                <p className="text-[#5a4a2a] text-base leading-relaxed mb-6">
                  היא עונה ללקוחות 24/7, מקבעת תורים ביומן, יודעת את כל מחירי הטיפולים, ולא לוקחת חופש. נסי לדבר איתה — לחצי על הכפתור.
                </p>

                <ul className="space-y-2 mb-8 text-[#3a2a14] text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-700">✓</span>
                    קובעת תורים אוטומטית בגוגל קלנדר
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-700">✓</span>
                    מכירה את התפריט והמחירים
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-700">✓</span>
                    זמינה גם ב-2 בלילה
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => setCallStarted(true)}
                  className="mt-auto w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 text-lg shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
                >
                  🎤 דברי עם מיה עכשיו
                </button>
                <div className="text-center text-[#5a4a2a]/70 text-xs mt-2">
                  השיחה בקול. ודאי שהמיקרופון מאופשר.
                </div>
              </>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                    <span className="text-[#2a1f10] font-semibold">מיה</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCallStarted(false)}
                    className="text-[#5a4a2a] hover:text-[#2a1f10] text-2xl leading-none"
                    aria-label="סגור"
                  >
                    ×
                  </button>
                </div>

                <div className="flex-1 min-h-0">
                  <AvatarCall
                    avatarId={SALON_AVATAR_ID}
                    connectUrl={`${BOT_SERVER_URL}/salon-session`}
                    onEnd={() => setCallStarted(false)}
                  >
                    <MiaInnerView onEnd={() => setCallStarted(false)} />
                  </AvatarCall>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealCustomerVideo;
