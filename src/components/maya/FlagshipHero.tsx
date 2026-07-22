import { useT } from '@/components/refael/i18n';
import { WHATSAPP_URL } from '@/config/avatars';
import MayaStage from './MayaStage';

/**
 * Flagship hero: the promise up top, Maya alive on the right. Two CTAs —
 * "talk to her now" (wakes the stage), and the lead grab.
 */
export default function FlagshipHero() {
  const { pick, fontDisplay } = useT();

  return (
    <section className="relative hero-bg overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20">
      <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden />
      <div className="relative max-w-[1160px] mx-auto px-5 grid gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase mb-7">
            {pick('REFAEL.AI · פרויקט הדגל', 'REFAEL.AI · THE FLAGSHIP')}
          </p>

          <h1 className={`${fontDisplay} text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.07] tracking-tight text-ink`}>
            {pick('הפקידה שהלקוחות שלך', 'The receptionist your')}
            <br />
            <span className="text-live-gradient">
              {pick('יצלמו בסטורי.', 'customers film for their story.')}
            </span>
          </h1>

          <p className="mt-6 text-[1.15rem] sm:text-[1.28rem] text-ink/85 max-w-[640px] leading-[1.55]">
            {pick(
              'מאיה — עובדת קבלה דיגיטלית בגודל מלא. רואה את הלקוח נכנס, מברכת אותו לפני שהוא מדבר, קובעת לו תור אמיתי ביומן, שולחת אישור למייל — ומצביעה לו איפה לחכות.',
              'Maya — a full-size digital receptionist. She sees the customer walk in, greets them before they speak, books a real appointment in the calendar, emails the confirmation — and points them to where to wait.'
            )}
          </p>

          <p className="mt-4 text-[1rem] text-muted-foreground max-w-[620px] leading-[1.7]">
            {pick('בעברית. בקול. בלי מונה לפי דקה.', 'In Hebrew. Out loud. With no per-minute meter.')}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 border border-ink/15 text-ink px-7 py-3.5 rounded-full text-[0.95rem] hover:bg-ink/5 transition-colors"
            >
              {pick('רוצים אחת כזו לעסק? השאירו פרטים', 'Want one for your business? Leave your details')}
              <span aria-hidden>←</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-ink px-4 py-3.5 rounded-full text-[0.95rem] transition-colors"
            >
              WhatsApp →
            </a>
          </div>

          <p className="mt-6 text-[0.82rem] text-muted-foreground">
            {pick(
              'הפעילו את הרמקולים ולחצו "דברו איתה עכשיו" — זו ההקלטה שלה, לא קריינות.',
              'Turn your sound on and press "Talk to her now" — that\'s her, not a voice-over.'
            )}
          </p>
        </div>

        <div className="lg:self-center">
          <MayaStage clip="/media/maya_welcome.mp4" />
        </div>
      </div>
    </section>
  );
}
