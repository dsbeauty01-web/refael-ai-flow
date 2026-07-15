import { useState } from 'react';
import { useT } from './i18n';
import FadeUp from './FadeUp';
import StatusBadge from './StatusBadge';
import { AVATARS, WHATSAPP_URL, type AvatarConfig } from '@/config/avatars';
import { useAvatarStatus } from '@/hooks/useAvatarStatus';

type Card = {
  key: keyof typeof AVATARS;
  name: { he: string; en: string };
  role: { he: string; en: string };
  body: { he: string; en: string };
};

const CARDS: Card[] = [
  {
    key: 'nova_v2',
    name: { he: 'מיה — מארחת הלובי', en: 'Maya — The Lobby Host' },
    role: { he: 'פוטוריאליסטית · עברית · גוף מלא', en: 'Photoreal · Hebrew · Full body' },
    body: {
      he: 'מקבלת אורחים בעברית, עונה על שאלות, מנופפת, מהנהנת ומצביעה לכיוון הנכון — כל תנועה נורית על ידי ה-AI בעצמו תוך כדי שיחה.',
      en: 'Greets guests in Hebrew, answers questions, waves, nods, and points the right way — every gesture fired by the AI itself, mid-conversation.',
    },
  },
  {
    key: 'nova_dance',
    name: { he: 'נובה — מורת הריקוד', en: 'Nova — The Dance Teacher' },
    role: { he: 'אנימציה בסגנון פיקסאר · אנגלית · לאפליקציות ילדים', en: 'Pixar-style animation · English · For kids\' apps' },
    body: {
      he: 'דמות מונפשת שמלמדת ילדים לרקוד באנגלית: ידיים למעלה, מחיאות כפיים, פריז — והיא גם מדגימה בעצמה.',
      en: 'An animated character that teaches kids to dance in English: hands up, clap-clap, freeze — and she demonstrates the moves herself.',
    },
  },
  {
    key: 'nova_close',
    name: { he: 'נובה מקרוב', en: 'Nova, up close' },
    role: { he: 'קלוז-אפ · איכות שפתיים מקסימלית', en: 'Close-up · Maximum lip quality' },
    body: {
      he: 'אותה נובה, מצולמת חזה-ומעלה: הפנים גדולות פי שלושה, והשפתיים מסונכרנות ברמה של אפליקציות שיחה מהשורה הראשונה. לשיחות ארוכות — ולמעבר בין קלוז-אפ להדגמה בגוף מלא.',
      en: 'The same Nova, framed chest-up: the face is three times bigger, and the lip-sync reaches top conversation-app quality. Built for longer talks — and for cutting between close-up and full-body demonstration.',
    },
  },
];

function Media({ status, cfg, name }: { status: 'checking' | 'live' | 'offline'; cfg: AvatarConfig; name: string }) {
  const [failed, setFailed] = useState(false);

  if (status === 'checking') {
    return (
      <div className="w-full h-full bg-surface relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
    );
  }

  if (failed) {
    return (
      <div className="w-full h-full bg-surface flex items-center justify-center">
        <span className="text-muted-foreground text-[1.25rem] font-display-en tracking-tight">{name}</span>
      </div>
    );
  }

  return (
    <video
      src={cfg.videoUrl}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover bg-surface"
    />
  );
}

function Row({ card, idx }: { card: Card; idx: number }) {
  const { isHebrew, pick } = useT();
  const cfg = AVATARS[card.key];
  const status = useAvatarStatus(cfg.podUrl);
  const reversed = idx % 2 === 1;

  return (
    <FadeUp>
      <article
        className={`grid gap-6 md:gap-10 md:grid-cols-2 items-center ${
          reversed ? 'md:[direction:ltr]' : ''
        }`}
      >
        <div
          className={`aspect-[4/3] rounded-2xl overflow-hidden border border-white/6 ${
            reversed ? 'md:order-2' : ''
          } ${status === 'live' ? 'border-live-gradient' : ''}`}
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <Media status={status} cfg={cfg} name={pick(card.name.he, card.name.en)} />
        </div>

        <div className={reversed ? 'md:order-1' : ''}>
          <StatusBadge status={status} />
          <h3 className={`mt-4 ${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]`}>
            {pick(card.name.he, card.name.en)}
          </h3>
          <p className="mt-2 text-[0.9rem] tracking-wide uppercase text-muted-foreground">
            {pick(card.role.he, card.role.en)}
          </p>
          <p className="mt-5 text-[1.05rem] text-foreground/80 leading-[1.7] max-w-[520px]">
            {pick(card.body.he, card.body.en)}
          </p>

          <div className="mt-7">
            {status === 'live' && cfg.kioskUrl ? (
              <a
                href={cfg.kioskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-live-gradient text-midnight font-semibold px-6 py-3 rounded-full text-[0.9rem] hover:brightness-110 transition"
              >
                {pick('פתחו שיחה חיה', 'Open live conversation')}
              </a>
            ) : (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border border-white/20 text-foreground px-6 py-3 rounded-full text-[0.9rem] hover:bg-white/5 transition"
              >
                {pick('לתאם שיחה חיה', 'Book a live session')}
              </a>
            )}
          </div>
        </div>
      </article>
    </FadeUp>
  );
}

export default function AvatarsSection() {
  const { isHebrew, pick } = useT();
  return (
    <section id="avatars" className="py-28 sm:py-36 px-5 bg-surface/40">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp>
          <h2 className={`${isHebrew ? 'font-display-he' : 'font-display-en'} text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1]`}>
            {pick('תכירו את השלושה', 'Meet the three')}
          </h2>
          <p className="mt-4 text-[1.1rem] text-muted-foreground max-w-[600px]">
            {pick(
              'אלה לא סרטוני תדמית. כשהם באוויר — אפשר לדבר איתם.',
              "These aren't showreels. When they're live, you can talk to them."
            )}
          </p>
        </FadeUp>

        <div className="mt-20 flex flex-col gap-24">
          {CARDS.map((c, i) => <Row key={c.key} card={c} idx={i} />)}
        </div>
      </div>
    </section>
  );
}