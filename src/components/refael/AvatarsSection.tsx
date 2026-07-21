import { useState } from 'react';
import { useT } from './i18n';
import FadeUp from './FadeUp';
import StatusBadge from './StatusBadge';
import { AVATARS, WHATSAPP_URL, type AvatarConfig } from '@/config/avatars';
import { useAvatarStatus } from '@/hooks/useAvatarStatus';

type Card = {
  key: keyof typeof AVATARS;
  name: { he: string; en: string; th: string };
  role: { he: string; en: string; th: string };
  body: { he: string; en: string; th: string };
  /** keeps the face in frame when the clip is cropped into the card */
  focus?: string;
};

const CARDS: Card[] = [
  {
    key: 'nova_v2',
    name: { he: 'מיה — מארחת הלובי', en: 'Maya — The Lobby Host', th: 'มายา พนักงานต้อนรับประจำล็อบบี้' },
    role: { he: 'פוטוריאליסטית · עברית · גוף מלא', en: 'Photoreal · Hebrew · Full body', th: 'สมจริงระดับภาพถ่าย · ฮีบรู · เต็มตัว' },
    body: {
      he: 'מקבלת אורחים בעברית, עונה על שאלות, מנופפת, מהנהנת ומצביעה לכיוון הנכון — כל תנועה נורית על ידי ה-AI בעצמו תוך כדי שיחה.',
      en: 'Greets guests in Hebrew, answers questions, waves, nods, and points the right way — every gesture fired by the AI itself, mid-conversation.',
      th: 'ต้อนรับผู้มาเยือนเป็นภาษาฮีบรู ตอบคำถาม โบกมือ พยักหน้า และชี้บอกทางได้ถูกต้อง ทุกท่าทางสั่งงานโดย AI เองระหว่างการสนทนา',
    },
    focus: 'object-top',
  },
  {
    key: 'nova_dance',
    name: { he: 'נובה — מורת הריקוד', en: 'Nova — The Dance Teacher', th: 'โนวา ครูสอนเต้น' },
    role: { he: 'אנימציה בסגנון פיקסאר · אנגלית · לאפליקציות ילדים', en: 'Pixar-style animation · English · For kids\' apps', th: 'แอนิเมชันสไตล์พิกซาร์ · อังกฤษ · สำหรับแอปเด็ก' },
    body: {
      he: 'דמות מונפשת שמלמדת ילדים לרקוד באנגלית: ידיים למעלה, מחיאות כפיים, פריז — והיא גם מדגימה בעצמה.',
      en: 'An animated character that teaches kids to dance in English: hands up, clap-clap, freeze — and she demonstrates the moves herself.',
      th: 'ตัวละครแอนิเมชันที่สอนเด็ก ๆ เต้นเป็นภาษาอังกฤษ ยกมือขึ้น ปรบมือ หยุดนิ่ง และเธอทำให้ดูเป็นตัวอย่างด้วยตัวเอง',
    },
  },
  {
    key: 'nova_close',
    name: { he: 'נובה מקרוב', en: 'Nova, up close', th: 'โนวา ระยะใกล้' },
    role: { he: 'קלוז-אפ · איכות שפתיים מקסימלית', en: 'Close-up · Maximum lip quality', th: 'ระยะใกล้ · ริมฝีปากคมชัดที่สุด' },
    body: {
      he: 'אותה נובה, מצולמת חזה-ומעלה: הפנים גדולות פי שלושה, והשפתיים מסונכרנות ברמה של אפליקציות שיחה מהשורה הראשונה. לשיחות ארוכות — ולמעבר בין קלוז-אפ להדגמה בגוף מלא.',
      en: 'The same Nova, framed chest-up: the face is three times bigger, and the lip-sync reaches top conversation-app quality. Built for longer talks — and for cutting between close-up and full-body demonstration.',
      th: 'โนวาคนเดิม ถ่ายในระยะครึ่งตัว ใบหน้าใหญ่ขึ้นสามเท่า และการขยับริมฝีปากคมชัดระดับแอปสนทนาชั้นนำ เหมาะกับการพูดคุยที่ยาวขึ้น และการสลับระหว่างภาพระยะใกล้กับการสาธิตแบบเต็มตัว',
    },
  },
];

function Media({ status, cfg, name, focus }: { status: 'checking' | 'live' | 'offline'; cfg: AvatarConfig; name: string; focus?: string }) {
  const [failed, setFailed] = useState(false);

  if (status === 'checking') {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
    );
  }

  if (failed) {
    return cfg.posterUrl ? (
      <img src={cfg.posterUrl} alt={name} className={`w-full h-full object-cover ${focus ?? ''}`} />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-midnight/50 text-[1.25rem] font-display-en tracking-tight">{name}</span>
      </div>
    );
  }

  return (
    <video
      src={cfg.videoUrl}
      poster={cfg.posterUrl}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover bg-white ${focus ?? ''}`}
      aria-label={name}
    />
  );
}

function Row({ card, idx }: { card: Card; idx: number }) {
  const { isHebrew, pick, fontDisplay } = useT();
  const cfg = AVATARS[card.key];
  const status = useAvatarStatus(cfg.podUrl);
  const reversed = idx % 2 === 1;

  return (
    <FadeUp>
      <article className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
        <div
          className={`relative aspect-[4/3] stage overflow-hidden ${
            reversed ? 'md:order-2' : ''
          } ${status === 'live' ? 'border-live-gradient' : ''}`}
        >
          <Media status={status} cfg={cfg} name={pick(card.name.he, card.name.en, card.name.th)} focus={card.focus} />
        </div>

        <div className={reversed ? 'md:order-1' : ''}>
          <StatusBadge status={status} />
          <h3 className={`mt-4 ${fontDisplay} text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.15] text-ink`}>
            {pick(card.name.he, card.name.en, card.name.th)}
          </h3>
          <p className="mt-2 text-[0.85rem] tracking-[0.12em] uppercase text-muted-foreground">
            {pick(card.role.he, card.role.en, card.role.th)}
          </p>
          <p className="mt-5 text-[1.02rem] text-ink/75 leading-[1.7] max-w-[520px]">
            {pick(card.body.he, card.body.en, card.body.th)}
          </p>

          <div className="mt-7">
            {status === 'live' && cfg.kioskUrl ? (
              <a
                href={cfg.kioskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-live-gradient text-white font-semibold px-6 py-3 rounded-full text-[0.9rem] shadow-[0_10px_28px_-10px_rgba(0,184,217,0.55)] hover:brightness-110 transition"
              >
                {pick('פתחו שיחה חיה', 'Open live conversation', 'เริ่มสนทนาสด')}
              </a>
            ) : (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border border-ink/15 text-ink px-6 py-3 rounded-full text-[0.9rem] hover:bg-ink/5 transition"
              >
                {pick('לתאם שיחה חיה', 'Book a live session', 'นัดชมการสาธิตสด')}
              </a>
            )}
          </div>
        </div>
      </article>
    </FadeUp>
  );
}

export default function AvatarsSection() {
  const { isHebrew, pick, fontDisplay } = useT();
  return (
    <section id="avatars" className="py-24 sm:py-32 px-5 bg-paper">
      <div className="max-w-[1160px] mx-auto">
        <FadeUp>
          <h2 className={`${fontDisplay} text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] text-ink`}>
            {pick('תכירו את השלושה', 'Meet the three', 'พบกับทั้งสาม')}
          </h2>
          <p className="mt-4 text-[1.1rem] text-muted-foreground max-w-[600px]">
            {pick(
              'אלה לא סרטוני תדמית. כשהם באוויר — אפשר לדבר איתם.',
              "These aren't showreels. When they're live, you can talk to them.",
              'นี่ไม่ใช่วิดีโอโปรโมต เมื่อพวกเขาออนไลน์ คุณคุยกับพวกเขาได้จริง'
            )}
          </p>
        </FadeUp>

        <div className="mt-16 flex flex-col gap-20">
          {CARDS.map((c, i) => <Row key={c.key} card={c} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
