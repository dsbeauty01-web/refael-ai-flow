// Scene definitions for the 5 Refael.ai ad reels. Every scene: {name, dur, bg, layers, html}.
const { SRC, a, page } = require('./lib');

const BG = '0x0B0E14';
const BIZ = {
  dental: '450:800:90:66',
  beauty: '380:676:134:284',
  salon: '450:800:90:56',
  gym: '450:800:74:160',
  restaurant: '450:800:90:160',
};
const biz = (k, vf = 'unsharp=5:5:0.45') => ({ file: `${SRC}/biz-${k}.mp4`, ss: 0, crop: BIZ[k], w: 1080, h: 1920, vf });
const face = (size, x, y) => ({ file: `${SRC}/face.mp4`, loop: true, ss: 0, w: size, h: size, x, y });
// Lead row card from tools-explainer (internal n8n test). The "Noa Katz" row is painted over with the card colour.
const sheet = (x, y) => ({
  file: `${SRC}/tools-explainer.mp4`, segs: [[22.5, 24.8]], crop: '574:330:620:138',
  post: 'drawbox=x=22:y=187:w=532:h=39:color=0xFBFDFA@1:t=fill', w: 960, h: 552, x, y,
});

const T = {
  he: {
    illus: 'המחשה',
    end1: 'הדגמה חיה של 3 דקות<br>על האתר שלכם.', end2: 'בחינם.', price: 'מ־₪99 לחודש', endSmall: 'שעה של שיחות · הקמה ₪0 · מבטלים בכל חודש',
  },
  en: {
    illus: 'Illustration',
    end1: 'A free 3-minute live demo', end2: 'on your own site.', price: 'From ₪99 a month', endSmall: 'An hour of conversations · Setup ₪0 · Cancel any month',
  },
};

const darkTop = `<div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(8,10,16,.70) 0%,rgba(8,10,16,.25) 32%,rgba(8,10,16,0) 55%,rgba(8,10,16,.35) 100%)"></div>`;
const illusTag = (L) => `<div class="abs" style="top:1372px;${L === 'he' ? 'left' : 'right'}:56px"><div class="tag" style="font-size:26px;opacity:.85">${T[L].illus}</div></div>`;
const cap = (txt, top, anim, size = 64) => `<div class="abs cx" style="top:${top}px;padding:0 70px"><div class="pill" style="font-size:${size}px;max-width:940px" ${anim}>${txt}</div></div>`;

// ---------------------------------------------------------------- end card
function endCard(L) {
  const t = T[L];
  const css = `
  .bgx{position:absolute;inset:0;background:radial-gradient(1200px 900px at 50% 30%,#1A1F35 0%,#0B0E14 60%);
    -webkit-mask:radial-gradient(circle 160px at 540px 470px,transparent 159px,#000 160.5px);mask:radial-gradient(circle 160px at 540px 470px,transparent 159px,#000 160.5px)}
  .ring{position:absolute;left:370px;top:300px;width:340px;height:340px;border-radius:50%;padding:7px;background:linear-gradient(135deg,#00B8D9,#7C5CF0);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
  .live{position:absolute;left:640px;top:570px;width:38px;height:38px;border-radius:50%;background:#22C55E;border:6px solid #0B0E14}
  .h{font-size:${L === 'he' ? 74 : 72}px;font-weight:800;line-height:1.12}
  .price{font-size:70px;font-weight:800;padding:14px 46px 20px;border-radius:999px;color:#fff}
  .url{font-family:'Inter';font-weight:700;font-size:48px;color:#E6F7FB;border-bottom:4px solid #22D3EE;padding-bottom:6px}`;
  const body = `<div class="bgx"></div><div class="ring"></div><div class="live"></div>
  <div class="abs cx" style="top:690px;padding:0 70px"><div class="h" ${a('up', 0.15)}>${t.end1}<br><span class="gradtxt">${t.end2}</span></div></div>
  <div class="abs cx" style="top:1010px"><div class="price grad" ${a('pop', 0.6, 0.55)}>${t.price}</div></div>
  <div class="abs cx" style="top:1150px;padding:0 60px"><div style="font-size:${L === 'he' ? 38 : 33}px;color:#C3CAD7;font-weight:600" ${a('fade', 0.9)}>${t.endSmall}</div></div>
  <div class="abs cx" style="top:1235px"><div class="url ltr" ${a('up', 1.1)}>refael-ai-flow.lovable.app</div></div>
  <div class="abs cx" style="top:1335px"><div class="ltr" style="font-family:'Inter';font-weight:800;font-size:38px;letter-spacing:.5px" ${a('fade', 1.3)}>Refael<span class="gradtxt">.ai</span></div></div>`;
  return { name: `end_${L}`, dur: 4.0, bg: BG, layers: [face(320, 380, 310)], html: page(L, body, css) };
}

// ---------------------------------------------------------------- reel 1: research (he)
function reel1() {
  const css = `.num{display:flex;flex-direction:column;align-items:center}.num .v{font-weight:800;line-height:1}.num .l{font-size:36px;color:#C9D0DC;font-weight:700;margin-top:10px}
  .arrow{font-size:90px;color:#7C8AA5;font-weight:800;margin-bottom:70px}`;
  const hook = `<div class="abs" style="inset:0;background:rgba(8,10,16,.45)"></div>
  <div class="abs cx" style="top:250px"><div class="tag" style="font-size:34px" ${a('fade', 0)}>לפי מקרה בוחן של ספק</div></div>
  <div class="abs cx" style="top:345px;padding:0 70px"><div style="font-size:78px;font-weight:800;line-height:1.12" ${a('up', 0.05)}>כמה מבקרים באתר<br>מתחילים שיחה?</div></div>
  <div class="abs cx" style="top:640px;gap:34px;align-items:flex-end">
    <div class="num" ${a('up', 0.5)}><div class="v ltr" style="font-size:104px;color:#AAB2C3">7.75%</div><div class="l">לפני</div></div>
    <div class="arrow" ${a('fade', 1.0)}>←</div>
    <div class="num" ${a('pop', 1.15, 0.6)}><div class="v ltr gradtxt" id="cnt" style="font-size:156px">26.58%</div><div class="l">אחרי שהוסיפו אווטאר מדבר</div></div>
  </div>
  <div class="abs cx" style="top:1040px;padding:0 80px"><div style="font-size:56px;font-weight:700" ${a('up', 2.4)}>ככה זה נראה באתר שלכם:</div></div>`;
  const tick = `var e=document.getElementById('cnt');var p=Math.min(Math.max((t-1.15)/1.1,0),1);p=1-Math.pow(1-p,3);var v=7.75+(26.58-7.75)*p;e.textContent=v.toFixed(2)+'%';return e.textContent`;
  const fullBlur = { file: `${SRC}/biz-dental.mp4`, ss: 0, w: 1080, h: 1920, vf: 'boxblur=22:2,eq=brightness=-0.18:saturation=0.75' };
  return [
    { name: 'r1_hook', dur: 4.2, bg: BG, layers: [fullBlur], html: page('he', hook, css, tick) },
    { name: 'r1_c1', dur: 3.0, bg: BG, layers: [biz('dental')], html: page('he', darkTop + cap('פנים חיות בפינת האתר', 260, a('up', 0.1)) + illusTag('he')) },
    { name: 'r1_c2', dur: 3.0, bg: BG, layers: [biz('beauty')], html: page('he', darkTop + cap('מברכות כל מבקר<br>ועונות בקול, בעברית', 260, a('up', 0.1)) + illusTag('he')) },
    { name: 'r1_c3', dur: 3.0, bg: BG, layers: [biz('restaurant')], html: page('he', darkTop + cap('ושולחות לכם את הליד<br>לוואטסאפ', 260, a('up', 0.1)) + illusTag('he')) },
  ];
}

// ---------------------------------------------------------------- reel 2: instead of a boring chat (he)
function mockSite(after) {
  // generic business site, drawn. Face hole at (825,1215) r120 when `after`.
  const hole = after ? `-webkit-mask:radial-gradient(circle 120px at 735px 965px,transparent 119px,#000 120.5px);` : '';
  const g = after ? '' : 'filter:grayscale(1) brightness(.97);';
  return `
  <div class="abs" style="left:90px;top:250px;width:900px;height:1130px;border-radius:36px;background:#fff;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45);${hole}${g}">
    <div style="height:70px;background:#EEF0F4;display:flex;align-items:center;gap:12px;padding:0 26px;direction:ltr">
      <span style="width:16px;height:16px;border-radius:50%;background:#F87171"></span><span style="width:16px;height:16px;border-radius:50%;background:#FBBF24"></span><span style="width:16px;height:16px;border-radius:50%;background:#34D399"></span>
      <div style="margin-left:20px;flex:1;height:40px;border-radius:20px;background:#fff;color:#8A93A3;font:600 24px Inter;display:flex;align-items:center;padding:0 20px">www.your-business.co.il</div></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:26px 40px;color:#1F2937">
      <div style="font-weight:800;font-size:40px">העסק שלכם</div>
      <div style="display:flex;gap:26px;font-size:26px;color:#6B7280;font-weight:600"><span>שירותים</span><span>מחירים</span><span>צור קשר</span></div></div>
    <div style="margin:0 40px;height:400px;border-radius:26px;background:linear-gradient(135deg,#DBEAFE,#E9D5FF 60%,#FCE7F3);position:relative">
      <div style="position:absolute;right:44px;top:70px;color:#1F2937;font-weight:800;font-size:58px;line-height:1.1">ברוכים הבאים<br>לאתר שלנו</div>
      <div style="position:absolute;right:44px;top:230px;width:330px;height:22px;border-radius:11px;background:rgba(31,41,55,.18)"></div>
      <div style="position:absolute;right:44px;top:270px;width:250px;height:22px;border-radius:11px;background:rgba(31,41,55,.12)"></div>
      <div style="position:absolute;right:44px;top:320px;padding:12px 30px;border-radius:999px;background:#4F46E5;color:#fff;font-weight:700;font-size:26px">לקביעת תור</div></div>
    <div style="display:flex;gap:22px;margin:34px 40px">${[0, 1, 2].map(() => `<div style="flex:1;height:200px;border-radius:22px;background:#F3F4F6"></div>`).join('')}</div>
    <div style="margin:0 40px;display:flex;flex-direction:column;gap:16px">${[620, 540, 600].map((w) => `<div style="width:${w}px;height:22px;border-radius:11px;background:#EEF0F3"></div>`).join('')}</div>
  </div>`;
}
function reel2() {
  const before = mockSite(false) + `
  <div class="abs" style="left:770px;top:1160px;width:110px;height:110px;border-radius:50%;background:#9CA3AF;box-shadow:0 10px 30px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="#fff"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg></div>
  <div class="abs" style="left:400px;top:1050px;background:#F3F4F6;color:#4B5563;border-radius:20px;padding:16px 24px;font-size:28px;font-weight:600;box-shadow:0 6px 20px rgba(0,0,0,.12)">היי, איך אפשר לעזור?</div>
  ${cap('צ\'אט רגיל באתר:', 290, a('up', 0.1), 66)}
  ${cap('בועה קטנה שמחכה<br>שמישהו יקליד', 410, a('up', 1.3), 58)}`;
  const after = mockSite(true) + `
  <div class="abs" style="left:697px;top:1087px;width:256px;height:256px;border-radius:50%;padding:7px;background:linear-gradient(135deg,#00B8D9,#7C5CF0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor"></div>
  <div class="abs" style="left:890px;top:1290px;width:40px;height:40px;border-radius:50%;background:#22C55E;border:6px solid #fff"></div>
  <div class="abs" style="left:230px;top:1100px;width:440px;background:#fff;color:#111827;border-radius:28px 28px 6px 28px;padding:22px 28px;font-size:36px;font-weight:700;line-height:1.2;box-shadow:0 14px 40px rgba(0,0,0,.25)" ${a('pop', 0.9, 0.5)}>שלום! רוצים שאעזור לכם לקבוע תור?</div>
  ${cap('במקום זה: פנים חיות', 290, a('up', 0.1), 66)}
  ${cap('שמברכות כל מבקר בעצמן<br>ועונות בקול, בעברית', 410, a('up', 1.6), 56)}`;
  return [
    { name: 'r2_before', dur: 4.5, bg: BG, layers: [], html: page('he', before) },
    { name: 'r2_after', dur: 6.0, bg: BG, layers: [face(250, 700, 1090)], html: page('he', after) },
    { name: 'r2_any', dur: 3.5, bg: BG, layers: [biz('beauty')], html: page('he', darkTop + cap('שורת קוד אחת', 260, a('up', 0.1)) + cap('וורדפרס, ויקס, שופיפיי,<br>כל אתר', 380, a('up', 0.8), 54) + illusTag('he')) },
  ];
}

// ---------------------------------------------------------------- reel 3: why us (he/en)
const R3 = {
  he: {
    h1: 'הם מוכרים פנים שמדברות.', h2: 'אנחנו מספקים נציג<br>שמדבר ועובד.',
    toolsTitle: 'והוא גם עושה את העבודה:',
    chips: ['שומר ליד: שם + טלפון', 'קובע פגישה ביומן', 'שולח לינק ללקוח'],
    proof: 'צילום מבדיקה פנימית: ליד נשמר דרך n8n',
    cmpTitle: 'שנה ראשונה, הכל כלול', cmpSub: '150 דקות בחודש · דמות מותאמת · אחסון הסוכן ומפתח',
    plan: 'מסלול Business: ₪390 לחודש', note: 'מחירי מחירון כפי שפורסמו, אוק׳ 2026 · $1 = ₪3.08',
    tech1: 'מנוע משלנו, על שרתי GPU שלנו', tech2: 'לא משווקים מחדש HeyGen או D-ID', tech3: 'המוח: סוכן AI ב־n8n, נבנה לכל עסק',
    chips2: ['קול עברי טבעי', 'הקמה ₪0', 'מבטלים בכל חודש'],
  },
  en: {
    h1: 'They sell a talking face.', h2: 'We deliver<br>a talking agent.',
    toolsTitle: 'And it does the work:',
    chips: ['Saves the lead: name + phone', 'Books the meeting', 'Sends the customer a link'],
    proof: 'From an internal test: lead saved via n8n',
    cmpTitle: 'First year, all-in', cmpSub: '150 minutes a month · custom character · agent hosting and a developer',
    plan: 'Business plan: ₪390 a month', note: 'Published list prices, Oct 2026 · $1 = ₪3.08',
    tech1: 'Our own engine, on our own GPUs', tech2: "We don't resell HeyGen or D-ID", tech3: 'The brain: an n8n AI agent built for your business',
    chips2: ['Natural Hebrew voice', 'Setup ₪0', 'Cancel any month'],
  },
};
function reel3(L) {
  const t = R3[L];
  const he = L === 'he';
  const hook = darkTop + `<div class="abs" style="inset:0;background:rgba(8,10,16,.25)"></div>
    ${cap(t.h1, 270, a('up', 0.05), he ? 66 : 60)}
    <div class="abs cx" style="top:420px;padding:0 60px"><div class="pill" style="font-size:${he ? 82 : 78}px;max-width:960px" ${a('pop', 1.0, 0.55)}><span class="gradtxt">${t.h2}</span></div></div>`;

  const chipCss = `.chip{display:flex;align-items:center;gap:22px;background:#151A26;border:2px solid #252C3D;border-radius:26px;padding:20px 30px;font-size:${he ? 50 : 44}px;font-weight:800;width:900px}
   .ck{width:56px;height:56px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center}`;
  const check = `<span class="ck grad"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>`;
  const tools = `
    <div class="abs cx" style="top:240px"><div style="font-size:${he ? 66 : 60}px;font-weight:800" ${a('up', 0.0)}>${t.toolsTitle}</div></div>
    ${t.chips.map((c, i) => `<div class="abs cx" style="top:${350 + i * 118}px"><div class="chip" ${a('up', 0.35 + i * 0.35)}>${check}<span>${c}</span></div></div>`).join('')}
    <div class="abs cx" style="top:735px"><div class="tag" style="font-size:30px" ${a('fade', 1.6)}>${t.proof}</div></div>
    <div class="abs" style="left:60px;top:800px;width:960px;height:552px;border-radius:30px;box-shadow:0 0 0 60px #0B0E14"></div>
    <div class="abs" style="left:40px;top:780px;width:1000px;height:592px;background:#0B0E14;animation:out .35s linear 1.6s forwards"></div>`;

  const rows = [['HeyGen', 23600], ['D-ID', 16900], ['Tavus', 10100], ['Refael.ai', 4680]];
  const cmpCss = `.row{position:absolute;left:90px;width:900px}.rl{display:flex;justify-content:space-between;align-items:baseline;font-weight:800;font-size:50px;margin-bottom:14px}
   .track{height:62px;border-radius:31px;background:#171C29;overflow:hidden}.bar{height:100%;border-radius:31px;transform-origin:${he ? 'right' : 'left'} center}
   .val{font-family:'Inter';font-weight:800}`;
  const cmp = `
    <div class="abs cx" style="top:235px"><div style="font-size:${he ? 80 : 74}px;font-weight:800" ${a('up', 0)}>${t.cmpTitle}</div></div>
    <div class="abs cx" style="top:345px;padding:0 90px"><div style="font-size:34px;color:#AEB6C6;font-weight:600;line-height:1.3" ${a('fade', 0.25)}>${t.cmpSub}</div></div>
    ${rows.map(([n, v], i) => {
      const us = n === 'Refael.ai';
      const d = 0.55 + i * 0.45;
      return `<div class="row" style="top:${470 + i * 178}px" ${a('fade', d - 0.1, 0.3)}>
        <div class="rl"><span class="ltr" style="${us ? '' : 'color:#D5DAE3'}">${us ? 'Refael<span class="gradtxt">.ai</span>' : n}</span><span class="val ltr ${us ? 'gradtxt' : ''}" style="${us ? 'font-size:62px' : 'color:#D5DAE3'}" data-v="${v}" data-d="${d}">${us ? '' : '≈'}₪${v.toLocaleString('en-US')}</span></div>
        <div class="track"><div class="bar ${us ? 'grad' : ''}" style="width:${(v / 23600) * 100}%;${us ? '' : 'background:#4B5468;'}animation:grow .9s cubic-bezier(.2,.8,.2,1) ${d}s both"></div></div></div>`;
    }).join('')}
    <div class="abs cx" style="top:1185px"><div class="tag" style="font-size:34px;background:rgba(124,92,240,.22);color:#E9E4FF" ${a('up', 2.6)}>${t.plan}</div></div>
    <div class="abs cx" style="top:1290px"><div style="font-size:30px;color:#8D96A8;font-weight:600" ${a('fade', 0.4)}>${t.note}</div></div>`;
  const cmpTick = `var o='';document.querySelectorAll('[data-v]').forEach(function(e){var v=+e.dataset.v,d=+e.dataset.d;var p=Math.min(Math.max((t-d)/0.9,0),1);p=1-Math.pow(1-p,3);var x=Math.round(v*p/10)*10;var s=(v===4680?'':'≈')+'₪'+x.toLocaleString('en-US');e.textContent=s;o+=s});return o`;

  const tech = `
    <div class="abs" style="inset:0;background:radial-gradient(1000px 800px at 50% 25%,#1A1F35 0%,#0B0E14 62%);-webkit-mask:radial-gradient(circle 150px at 540px 420px,transparent 149px,#000 150.5px)"></div>
    <div class="abs" style="left:383px;top:263px;width:314px;height:314px;border-radius:50%;padding:7px;background:linear-gradient(135deg,#00B8D9,#7C5CF0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor"></div>
    <div class="abs cx" style="top:630px;padding:0 60px"><div style="font-size:${he ? 64 : 50}px;font-weight:800;line-height:1.15" ${a('up', 0.1)}>${t.tech1}</div></div>
    <div class="abs cx" style="top:${he ? 725 : 730}px;padding:0 60px"><div style="font-size:42px;font-weight:700;color:#C9D0DC" ${a('up', 0.5)}>${t.tech2}</div></div>
    <div class="abs cx" style="top:800px;padding:0 60px"><div style="font-size:${he ? 42 : 38}px;font-weight:700;color:#C9D0DC" ${a('up', 0.9)}>${t.tech3}</div></div>
    <div class="abs cx" style="top:930px;flex-direction:column;align-items:center;gap:22px">
      ${t.chips2.map((c, i) => `<div class="pill ${i ? '' : 'grad'}" style="font-size:${he ? 54 : 48}px;${i ? 'background:#151A26;border:2px solid #2A3245' : ''}" ${a('pop', 1.4 + i * 0.35, 0.45)}>${c}</div>`).join('')}
    </div>`;
  return [
    { name: `r3_hook_${L}`, dur: 3.2, bg: BG, layers: [biz('gym', 'boxblur=8:1,eq=brightness=-0.22:saturation=0.8')], html: page(L, hook) },
    { name: `r3_tools_${L}`, dur: 5.5, bg: BG, layers: [sheet(60, 800)], html: page(L, tools, chipCss) },
    { name: `r3_cmp_${L}`, dur: 7.5, bg: BG, layers: [], html: page(L, cmp, cmpCss, cmpTick) },
    { name: `r3_tech_${L}`, dur: 4.5, bg: BG, layers: [face(300, 390, 270)], html: page(L, tech) },
  ];
}

// ---------------------------------------------------------------- reel 4: any business (he/en)
const R4 = {
  he: { head: 'נציג חי עם פנים,<br>לכל עסק', labels: { dental: 'מרפאה', beauty: 'קוסמטיקה', salon: 'מספרה', gym: 'כושר', restaurant: 'מסעדה' } },
  en: { head: 'A live agent with a face,<br>for any business', labels: { dental: 'Dental', beauty: 'Beauty', salon: 'Salon', gym: 'Gym', restaurant: 'Restaurant' } },
};
function reel4(L) {
  const t = R4[L];
  const order = ['dental', 'beauty', 'salon', 'gym', 'restaurant'];
  return order.map((k, i) => {
    const head = `<div class="abs cx" style="top:250px;padding:0 60px"><div class="pill" style="font-size:${L === 'he' ? 58 : 52}px" ${i === 0 ? a('up', 0.05) : ''}>${t.head}</div></div>`;
    const label = `<div class="abs cx" style="top:470px"><div class="pill grad" style="font-size:${L === 'he' ? 104 : 96}px;padding:14px 56px 24px;border-radius:40px" ${a('pop', i === 0 ? 0.6 : 0.05, 0.4)}>${t.labels[k]}</div></div>`;
    return { name: `r4_${k}_${L}`, dur: i === 0 ? 3.0 : 2.5, bg: BG, layers: [biz(k)], html: page(L, darkTop + head + label + illusTag(L)) };
  });
}

// ---------------------------------------------------------------- reel 5: watch it work (he)
function reel5() {
  // talk-he cut: "שלום," (0-0.95) + "אני מקבלת את האורחים שלכם, עונה על שאלות, ומזמנת פגישות ישירות ליומן שלכם." (8.40-15.45)
  const talk = { file: `${SRC}/talk-he.mp4`, segs: [[0, 0.95], [8.40, 15.45]], w: 864, h: 1080, x: 108, y: 330 };
  const caps = [['שלום,', 0, 0.95], ['אני מקבלת את האורחים שלכם,', 1.0, 3.35], ['עונה על שאלות,', 3.4, 4.75], ['ומזמנת פגישות<br>ישירות ליומן שלכם.', 4.8, 8.2]];
  const talkHtml = `
    <div class="abs" style="left:108px;top:330px;width:864px;height:1080px;border-radius:40px;box-shadow:0 0 0 80px #0B0E14"></div>
    <div class="abs cx" style="top:228px"><div style="font-size:60px;font-weight:800" ${a('fade', 0)}>ככה זה נשמע באתר שלכם</div></div>
    <div class="abs" style="top:356px;right:136px"><div class="tag" style="font-size:28px">קליפ מוקלט · עם סאונד</div></div>
    ${caps.map(([c, s, e]) => `<div class="abs cx" style="top:1180px;padding:0 120px"><div class="pill" style="font-size:58px" ${a('fade', s, 0.12, e > 8 ? null : e - 0.05)}>${c}</div></div>`).join('')}`;
  const notifCss = `.nt{width:940px;background:rgba(250,250,252,.97);color:#111827;border-radius:38px;padding:30px 34px;box-shadow:0 30px 80px rgba(0,0,0,.45)}`;
  const notif = `<div class="abs" style="inset:0;background:rgba(8,10,16,.35)"></div>
    <div class="abs cx" style="top:280px"><div class="nt" ${a('down', 0.3, 0.55)}>
      <div style="display:flex;align-items:center;gap:16px;font-size:28px;color:#6B7280;font-weight:700">
        <span style="width:54px;height:54px;border-radius:14px;background:#22C55E;display:flex;align-items:center;justify-content:center"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg></span>
        <span>הודעה חדשה</span><span style="margin-inline-start:auto">עכשיו</span></div>
      <div style="font-size:48px;font-weight:800;margin-top:18px">ליד חדש מהאתר</div>
      <div style="font-size:40px;font-weight:600;margin-top:8px;color:#374151">שם: דנה · טלפון: <span class="ltr">05X-XXXXXXX</span></div>
      <div style="font-size:40px;font-weight:600;margin-top:4px;color:#374151">רוצה לקבוע תור לבדיקה</div>
      <div style="margin-top:16px"><span class="tag" style="font-size:24px;background:#EEF0F4;color:#6B7280">דוגמה להמחשה</span></div>
    </div></div>
    ${cap('השם והטלפון,<br>ישר לוואטסאפ שלכם', 790, a('up', 1.5), 64)}`;
  const sheetHtml = `
    <div class="abs cx" style="top:250px;padding:0 70px"><div style="font-size:66px;font-weight:800;line-height:1.15" ${a('up', 0)}>וגם שורה חדשה<br>בגיליון של העסק</div></div>
    <div class="abs cx" style="top:540px"><div class="tag" style="font-size:30px" ${a('fade', 0.4)}>צילום מבדיקה פנימית (n8n)</div></div>
    <div class="abs" style="left:60px;top:620px;width:960px;height:552px;border-radius:30px;box-shadow:0 0 0 60px #0B0E14"></div>`;
  return [
    { name: 'r5_talk', dur: 8.0, bg: BG, layers: [talk], html: page('he', talkHtml) },
    { name: 'r5_lead', dur: 4.5, bg: BG, layers: [biz('dental', 'unsharp=5:5:0.45')], html: page('he', notif, notifCss) },
    { name: 'r5_sheet', dur: 3.2, bg: BG, layers: [sheet(60, 620)], html: page('he', sheetHtml) },
  ];
}

const REELS = {
  'reel-1-research-he': () => [...reel1(), endCard('he')],
  'reel-2-chat-he': () => [...reel2(), endCard('he')],
  'reel-3-why-us-he': () => [...reel3('he'), endCard('he')],
  'reel-4-any-business-he': () => [...reel4('he'), endCard('he')],
  'reel-5-watch-it-work-he': () => [...reel5(), endCard('he')],
  'reel-3-why-us-en': () => [...reel3('en'), endCard('en')],
  'reel-4-any-business-en': () => [...reel4('en'), endCard('en')],
};
module.exports = { REELS };
