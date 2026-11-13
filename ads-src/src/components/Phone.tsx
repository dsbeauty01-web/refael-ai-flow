import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing, staticFile, Img } from 'remotion';
import { C, F, PH, SCR, VIEWS, View } from '../theme';
import type { CamKey, ChatEvent, LeadCard, Notif, PhoneScene, SiteKey } from '../types';
import { Face } from './Face';
import { T, ease, pop } from './common';
import { Scrim } from './Overlay';

/* ---------------------------------------------------------------- camera */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const camAt = (cam: CamKey[], f: number, len = 16): View => {
  let cur = VIEWS[cam[0].v];
  for (let i = 1; i < cam.length; i++) {
    const k = cam[i];
    if (f < k.at) break;
    const t = interpolate(f, [k.at, k.at + len], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.15, 1) });
    const nxt = VIEWS[k.v];
    cur = { S: lerp(cur.S, nxt.S, t), top: lerp(cur.top, nxt.top, t), cx: lerp(cur.cx, nxt.cx, t) };
  }
  return cur;
};

/* ---------------------------------------------------------------- sites (fictional, illustration) */
export const SITES: Record<SiteKey, {
  brand: string; url: string; sub: string; headline: string; book: string; agent: string;
  bg: string; ink: string; accent: string; soft: string; bubble: string; blob: string; hint: string;
}> = {
  clinic: {
    brand: 'קליניקת הדר', url: 'hadar-clinic.co.il', sub: 'קליניקה לטיפולי לייזר ואסתטיקה', headline: 'עור חלק, בלי לחץ.', book: 'קביעת תור',
    agent: 'העוזרת של הקליניקה', bg: '#fbf7f3', ink: '#3b302b', accent: '#c98f7a', soft: '#ece3da', bubble: '#f3ece6',
    blob: 'radial-gradient(ellipse at 30% 30%, #f6dccf, #e9c2ae 55%, #dcae98)', hint: 'דברו או כתבו…',
  },
  studio: {
    brand: 'סטודיו גלים', url: 'galim-studio.co.il', sub: 'עיצוב שיער וצבע', headline: 'השיער שתמיד רציתם.', book: 'לקביעת תור',
    agent: 'העוזרת של הסטודיו', bg: '#f6f4f1', ink: '#23262b', accent: '#2f6f6a', soft: '#e6e2dc', bubble: '#ebe8e3',
    blob: 'radial-gradient(ellipse at 35% 30%, #d9e8e4, #a9c9c2 55%, #7fa9a1)', hint: 'דברו או כתבו…',
  },
  pilates: {
    brand: 'סטודיו תנועה', url: 'studio-tnua.co.il', sub: 'פילאטיס מכשירים וקבוצות קטנות', headline: 'גוף חזק. ראש שקט.', book: 'שיעור ניסיון',
    agent: 'העוזרת של הסטודיו', bg: '#f3f5f0', ink: '#1f2a24', accent: '#5f8a68', soft: '#e1e6dc', bubble: '#e8ece3',
    blob: 'radial-gradient(ellipse at 30% 30%, #e3ecd9, #c2d3b4 55%, #9fb98f)', hint: 'דברו או כתבו…',
  },
};

/* ---------------------------------------------------------------- bits */
const StatusBar: React.FC<{ time: string; dark?: boolean }> = ({ time, dark }) => (
  <div dir="ltr" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 92, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 58px 0', fontFamily: F.rubik, fontWeight: 600, fontSize: 30, color: dark ? '#fff' : '#111', zIndex: 5 }}>
    <span>{time}</span>
    <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <svg width="34" height="22" viewBox="0 0 34 22"><g fill={dark ? '#fff' : '#111'}><rect x="0" y="14" width="6" height="8" rx="1.5"/><rect x="9" y="10" width="6" height="12" rx="1.5"/><rect x="18" y="5" width="6" height="17" rx="1.5"/><rect x="27" y="0" width="6" height="22" rx="1.5"/></g></svg>
      <svg width="48" height="24" viewBox="0 0 48 24"><rect x="1" y="1" width="40" height="22" rx="6" fill="none" stroke={dark ? '#fff' : '#111'} strokeOpacity=".5" strokeWidth="2"/><rect x="4" y="4" width="30" height="16" rx="3.5" fill={dark ? '#fff' : '#111'}/><rect x="43" y="8" width="3" height="8" rx="1.5" fill={dark ? '#fff' : '#111'} opacity=".5"/></svg>
    </span>
  </div>
);

const ChatGlyph: React.FC<{ size: number }> = ({ size }) => (
  <span style={{ display: 'grid', placeItems: 'center', width: size, height: size, borderRadius: size * 0.24, background: 'linear-gradient(180deg,#3ad07a,#1fa855)' }}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24"><path d="M4 5.5C4 4.1 5.1 3 6.5 3h11C18.9 3 20 4.1 20 5.5v8c0 1.4-1.1 2.5-2.5 2.5H11l-4.6 3.6c-.4.3-.9 0-.9-.4V16h0C4.7 16 4 15.3 4 14.5z" fill="#fff"/></svg>
  </span>
);

export const LeadCardView: React.FC<{ card: LeadCard; frame: number; title?: string; dark?: boolean }> = ({ card, frame, title = 'ליד חדש מהאתר', dark }) => {
  const p = pop(frame, card.at, { damping: 15 });
  return (
    <div
      dir="rtl"
      style={{
        transform: `translateY(${(1 - p) * -120}px) scale(${0.94 + 0.06 * p})`,
        opacity: Math.min(1, p * 1.6),
        borderRadius: 40,
        background: dark ? 'rgba(30,34,44,0.92)' : 'rgba(250,250,252,0.86)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.55)',
        padding: '26px 30px 28px',
        color: dark ? '#f2f4f7' : '#14171c',
        fontFamily: F.assistant,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: dark ? '#aab3c0' : '#6b7280', fontWeight: 600 }}>
        <ChatGlyph size={46} />
        <span>WhatsApp</span>
        <span style={{ marginInlineStart: 'auto' }}>{card.time ?? 'עכשיו'}</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 42, fontWeight: 800 }}>{title}</div>
      <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18, rowGap: 6, fontSize: 36 }}>
        {card.rows.map(([k, v], i) => (
          <React.Fragment key={i}>
            <span style={{ color: dark ? '#aab3c0' : '#6b7280' }}>{k}</span>
            <span style={{ fontWeight: 700 }}><T>{v}</T></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- lock screen */
const WALL = {
  night: 'radial-gradient(ellipse 90% 60% at 30% 20%, #23305a, transparent 70%), radial-gradient(ellipse 80% 60% at 80% 90%, #3b2363, transparent 70%), #0a0d18',
  dark: 'radial-gradient(ellipse 90% 60% at 50% 10%, #1b2236, transparent 70%), #07090f',
  morning: 'radial-gradient(ellipse 90% 60% at 70% 12%, #f0a070, transparent 70%), radial-gradient(ellipse 90% 70% at 20% 90%, #5d86d6, transparent 70%), #a8727e',
};

const Lock: React.FC<{ lock: NonNullable<PhoneScene['lock']>; frame: number }> = ({ lock, frame }) => {
  const notifs = lock.notifs ?? [];
  const shown = notifs.filter((n) => frame >= n.at);
  return (
    <div style={{ position: 'absolute', inset: 0, background: WALL[lock.wall] }}>
      <StatusBar time="" dark />
      <div dir="rtl" style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', color: '#fff', fontFamily: F.rubik, textShadow: '0 4px 30px rgba(0,0,0,0.25)' }}>
        <div style={{ fontSize: 36, fontWeight: 500, opacity: 0.9 }}>{lock.day}</div>
        <div dir="ltr" style={{ fontSize: 210, fontWeight: 600, lineHeight: 1.05, letterSpacing: -4 }}>{lock.time}</div>
      </div>
      <div style={{ position: 'absolute', top: 470, left: 30, right: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {lock.lead && <LeadCardView card={lock.lead} frame={frame} dark={lock.wall !== 'morning'} />}
        {shown
          .slice()
          .reverse()
          .map((n, i) => (
            <NotifCard key={n.at} n={n} frame={frame} />
          ))}
      </div>
      <div style={{ position: 'absolute', bottom: 22, left: '50%', width: 260, height: 10, marginLeft: -130, borderRadius: 10, background: 'rgba(255,255,255,0.75)' }} />
    </div>
  );
};

const NotifCard: React.FC<{ n: Notif; frame: number }> = ({ n, frame }) => {
  const p = n.at <= 0 ? 1 : pop(frame, n.at, { damping: 16 });
  return (
    <div
      dir="rtl"
      style={{
        transform: `translateY(${(1 - p) * -60}px) scale(${0.92 + 0.08 * p})`,
        opacity: Math.min(1, p * 1.5),
        borderRadius: 34,
        background: 'rgba(40,44,58,0.82)',
        padding: '20px 26px 22px',
        color: '#f2f4f7',
        fontFamily: F.assistant,
        boxShadow: '0 18px 40px -16px rgba(0,0,0,0.6)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: '#aab3c0', fontWeight: 600 }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 38, height: 38, borderRadius: 10, background: '#55627a', color: '#fff' }}>
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 5.5C4 4.1 5.1 3 6.5 3h11C18.9 3 20 4.1 20 5.5v8c0 1.4-1.1 2.5-2.5 2.5H11l-4.6 3.6c-.4.3-.9 0-.9-.4V16h0C4.7 16 4 15.3 4 14.5z" fill="#fff"/></svg>
        </span>
        <span>{n.title}</span>
        <span style={{ marginInlineStart: 'auto' }} dir="ltr">{n.time}</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 32, fontWeight: 600 }}>
        <T>{n.body}</T>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- website with the widget */
const Dots: React.FC<{ frame: number; color: string }> = ({ frame, color }) => (
  <span style={{ display: 'inline-flex', gap: 8, padding: '4px 2px' }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ width: 13, height: 13, borderRadius: 13, background: color, opacity: 0.35 + 0.65 * Math.max(0, Math.sin((frame - i * 4) / 3.2)) }} />
    ))}
  </span>
);

const Site: React.FC<{ site: NonNullable<PhoneScene['site']>; frame: number; statusTime: string }> = ({ site, frame, statusTime }) => {
  const S = SITES[site.key];
  const load = site.loadAt != null ? ease(frame, site.loadAt, site.loadAt + 16) : 1;
  const scroll = site.scrollAt != null ? ease(frame, site.scrollAt, site.scrollAt + 26) * 60 : 0;
  const popAt = site.popAt ?? site.openAt;
  const faceP = pop(frame, popAt, { damping: 11, stiffness: 200 });
  const open = pop(frame, site.openAt, { damping: 16 });

  // chat state
  const bubbles: { agent: boolean; text: string; at: number }[] = [];
  let typingAgent = false;
  let input = '';
  for (const e of site.events) {
    if (e.kind === 'agent') {
      const ty = e.typing ?? 0;
      if (frame >= e.at) bubbles.push({ agent: true, text: e.text, at: e.at });
      else if (ty && frame >= e.at - ty) typingAgent = true;
    } else {
      const td = e.typeDur ?? 0;
      if (frame >= e.at) bubbles.push({ agent: false, text: e.text, at: e.at });
      else if (td && frame >= e.at - td) {
        const n = Math.ceil(((frame - (e.at - td)) / td) * e.text.length);
        input = e.text.slice(0, n);
      }
    }
  }
  const cardOpen = frame >= site.openAt;

  return (
    <div style={{ position: 'absolute', inset: 0, background: S.bg, color: S.ink, fontFamily: F.assistant, overflow: 'hidden' }}>
      <StatusBar time={statusTime} />
      {/* url bar */}
      <div style={{ position: 'absolute', top: 92, left: 28, right: 28, height: 70, borderRadius: 22, background: '#ffffffcc', boxShadow: 'inset 0 0 0 1.5px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: F.rubik, fontSize: 27, color: '#555' }} dir="ltr">
        <svg width="20" height="24" viewBox="0 0 20 24"><rect x="2" y="10" width="16" height="13" rx="3" fill="#666"/><path d="M5 10V7a5 5 0 0 1 10 0v3" stroke="#666" strokeWidth="2.5" fill="none"/></svg>
        {S.url}
        {load < 1 && <div style={{ position: 'absolute', left: 0, bottom: 0, height: 5, borderRadius: 5, width: `${load * 100}%`, background: '#3b82f6' }} />}
      </div>
      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, bottom: 0, opacity: load, transform: `translateY(${-scroll + (1 - load) * 30}px)` }}>
        {/* header */}
        <div dir="rtl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '30px 40px 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: F.suez, fontSize: 40 }}>
            <span style={{ width: 46, height: 46, borderRadius: 46, background: S.blob }} />
            {S.brand}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 40, height: 5, borderRadius: 4, background: S.ink, opacity: 0.8 }} />)}
          </span>
        </div>
        {/* hero */}
        <div style={{ position: 'absolute', top: 150, left: -60, width: 380, height: 420, borderRadius: 60, background: S.blob, opacity: 0.85 }} />
        <div dir="rtl" style={{ position: 'relative', padding: '90px 44px 0', width: 470, marginInlineStart: 0 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: S.accent }}>{S.sub}</div>
          <div style={{ marginTop: 14, fontFamily: F.rubik, fontWeight: 800, fontSize: 66, lineHeight: 1.08, letterSpacing: -1 }}>{S.headline}</div>
          <span style={{ display: 'inline-block', marginTop: 30, borderRadius: 999, background: S.accent, color: '#fff', fontSize: 30, fontWeight: 700, padding: '16px 34px' }}>{S.book}</span>
          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[92, 78, 85, 60].map((w, i) => <span key={i} style={{ height: 14, width: `${w}%`, borderRadius: 10, background: S.soft }} />)}
          </div>
        </div>
        <div style={{ position: 'absolute', top: 820, left: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ height: 230, borderRadius: 30, background: i % 2 ? S.soft : '#ffffff', boxShadow: '0 10px 30px -18px rgba(0,0,0,0.25)' }} />
          ))}
        </div>
      </div>

      {/* widget: chat card above, face in the bottom corner */}
      {cardOpen && (
        <div
          dir="rtl"
          style={{
            position: 'absolute',
            left: 26,
            right: 26,
            bottom: 248,
            transformOrigin: '12% 100%',
            transform: `scale(${0.6 + 0.4 * open})`,
            opacity: Math.min(1, open * 1.4),
            borderRadius: 40,
            background: '#fff',
            boxShadow: '0 40px 80px -30px rgba(40,30,25,0.55), 0 0 0 1.5px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 26px', borderBottom: `1.5px solid ${S.bubble}` }}>
            <span style={{ display: 'block', width: 58, height: 58, borderRadius: 58, overflow: 'hidden', background: S.soft }}>
              <Img src={staticFile('img/face.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            <span>
              <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1 }}>{S.agent}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, color: '#3f8f55', fontWeight: 600 }}>
                <span style={{ width: 12, height: 12, borderRadius: 12, background: '#3fbf63' }} />
                מחוברת
              </div>
            </span>
            <span style={{ marginInlineStart: 'auto', borderRadius: 10, background: S.bubble, padding: '6px 12px', fontSize: 22, fontWeight: 800, color: '#7a6d66' }} dir="ltr">AI</span>
          </div>
          <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'flex-end' }}>
            {bubbles.slice(-3).map((b) => {
              const p = pop(frame, b.at, { damping: 15 });
              return (
                <div
                  key={b.at}
                  style={{
                    alignSelf: b.agent ? 'flex-start' : 'flex-end',
                    maxWidth: '86%',
                    borderRadius: 30,
                    borderBottomRightRadius: b.agent ? 10 : 30,
                    borderBottomLeftRadius: b.agent ? 30 : 10,
                    background: b.agent ? S.bubble : S.accent,
                    color: b.agent ? S.ink : '#fff',
                    padding: '16px 24px 18px',
                    fontSize: 34,
                    fontWeight: 600,
                    lineHeight: 1.32,
                    transform: `translateY(${(1 - p) * 26}px) scale(${0.9 + 0.1 * p})`,
                    transformOrigin: b.agent ? '100% 100%' : '0% 100%',
                    opacity: Math.min(1, p * 1.5),
                  }}
                >
                  <T>{b.text}</T>
                </div>
              );
            })}
            {typingAgent && (
              <div style={{ alignSelf: 'flex-start', borderRadius: 30, background: S.bubble, padding: '16px 24px' }}>
                <Dots frame={frame} color={S.ink} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 28px', borderTop: `1.5px solid ${S.bubble}`, fontSize: 28, color: input ? S.ink : '#9a8f88', fontWeight: input ? 600 : 500 }}>
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {input ? <T>{input}</T> : S.hint}
              {input && <span style={{ display: 'inline-block', width: 3, height: 32, marginInlineStart: 3, background: S.accent, verticalAlign: 'middle', opacity: frame % 16 < 9 ? 1 : 0 }} />}
            </span>
            <svg width="30" height="30" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill={S.accent}/><path d="M6 11a6 6 0 0 0 12 0M12 17v4" stroke={S.accent} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            <svg width="30" height="30" viewBox="0 0 24 24" style={{ transform: 'scaleX(-1)' }}><path d="M3 11.5 21 3l-6.5 18-3-7.5z" fill={input ? S.accent : '#b9aea7'}/></svg>
          </div>
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          left: 40,
          bottom: 30,
          transform: `scale(${faceP})`,
          transformOrigin: '50% 100%',
          opacity: frame >= popAt ? 1 : 0,
        }}
      >
        <Face size={200} tagScale={1.05} />
      </div>
      {site.banner && frame >= site.banner.at - 2 && (
        <div style={{ position: 'absolute', top: 104, left: 20, right: 20, zIndex: 10 }}>
          <LeadCardView card={site.banner} frame={frame} title={site.banner.title} dark />
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------- the phone */
export const PhoneShot: React.FC<{ sc: PhoneScene }> = ({ sc }) => {
  const frame = useCurrentFrame();
  const v = camAt(sc.cam, frame);
  const unlock = sc.lock?.unlockAt != null ? ease(frame, sc.lock.unlockAt, sc.lock.unlockAt + 12) : 0;
  const x = v.cx - (PH.w * v.S) / 2;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: PH.w,
          height: PH.h,
          transformOrigin: '0 0',
          transform: `translate(${x}px, ${v.top}px) scale(${v.S})`,
        }}
      >
        <div style={{ position: 'absolute', inset: -40, borderRadius: PH.r + 40, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,184,217,0.25), rgba(124,92,240,0.15) 50%, transparent 72%)', filter: 'blur(30px)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: PH.r,
            background: 'linear-gradient(145deg, #2a2f3a, #0b0d12 40%, #1a1d25)',
            boxShadow: '0 60px 120px -30px rgba(0,0,0,0.85), inset 0 0 0 2px rgba(255,255,255,0.12)',
          }}
        />
        <div style={{ position: 'absolute', left: PH.bezel, top: PH.bezel, width: SCR.w, height: SCR.h, borderRadius: PH.r - 14, overflow: 'hidden', background: '#000' }}>
          {sc.site && <Site site={sc.site} frame={frame} statusTime={sc.statusTime} />}
          {sc.lock && unlock < 1 && (
            <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-unlock * 105}%)` }}>
              <Lock lock={sc.lock} frame={frame} />
            </div>
          )}
          <div style={{ position: 'absolute', top: 22, left: '50%', width: 210, height: 58, marginLeft: -105, borderRadius: 40, background: '#000', zIndex: 20 }} />
        </div>
      </div>
      <Scrim strength={interpolate(v.top, [-516, 470, 560], [1, 0.3, 0.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
    </AbsoluteFill>
  );
};
