import { useT } from './i18n';
import FadeUp from './FadeUp';

const ITEMS = [
  {
    he: { t: 'שיחה קולית אמיתית', b: 'האווטאר שומע ועונה בקול, כמו שיחת טלפון. לא הקלדה, לא הקראת טקסט מוכן.' },
    en: { t: 'A real voice conversation', b: 'The avatar hears you and answers out loud, like a phone call. No typing, no canned text-to-speech.' },
  },
  {
    he: { t: 'גוף מלא, תנועות אמיתיות', b: 'מנופף לשלום, מהנהן, מצביע לכיוון. ה-AI מחליט לבד מתי — באמצע השיחה, לפי מה שנאמר.' },
    en: { t: 'Full body, real gestures', b: 'It waves, nods, points the way. The AI decides when — mid-conversation, based on what\'s being said.' },
  },
  {
    he: { t: 'עברית טבעית', b: 'מדבר עברית שוטפת ומבין מבטא ישראלי. גם אנגלית, באותה נשימה.' },
    en: { t: 'Natural Hebrew', b: 'Fluent Hebrew, understands Israeli accents. English too, in the same breath.' },
  },
  {
    he: { t: 'המחיר לא זז', b: 'המערכת רצה על שרת ייעודי שלכם. מחיר חודשי קבוע — לא לפי דקות, לא לפי משתמשים.' },
    en: { t: "The price doesn't move", b: "It runs on your own dedicated server. Flat monthly cost — not per minute, not per user." },
  },
];

export default function WhatItIs() {
  const { isHebrew, pick } = useT();
  return (
    <section id="what" className="py-28 sm:py-36 px-5">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp>
          <h2 className={`${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] max-w-[720px]`}>
            {pick('לא עוד סרטון מדבר', 'Not another talking video')}
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {ITEMS.map((it, i) => {
            const v = isHebrew ? it.he : it.en;
            return (
              <FadeUp key={i}>
                <div>
                  <h3 className="text-[1.25rem] font-semibold text-foreground">{v.t}</h3>
                  <p className="mt-3 text-[1rem] text-muted-foreground leading-[1.7]">{v.b}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}