import type { Language } from '@/contexts/LanguageContext';
import { BUSINESS } from '@/config/avatars';

/**
 * Legal copy for the three routed documents, in all three shipped languages.
 *
 * NOT LEGAL ADVICE — these are standard small-business templates adapted to an
 * Israeli sole proprietor (עוסק פטור). Refael should have them reviewed before
 * relying on them commercially. Anything that depends on how the product
 * actually behaves (voice retention, analytics) is marked REVIEW in the repo
 * notes so it is confirmed rather than assumed.
 */

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };
export type LegalSlug = 'privacy' | 'terms' | 'accessibility';

export const LEGAL_UPDATED = { he: '20 ביולי 2026', en: '20 July 2026', th: '20 กรกฎาคม 2026' };

const C = {
  he: `${BUSINESS.nameHe} (${BUSINESS.entityHe}) · ${BUSINESS.email} · ${BUSINESS.phone}`,
  en: `${BUSINESS.name} (${BUSINESS.entityEn}) · ${BUSINESS.email} · ${BUSINESS.phone}`,
  th: `${BUSINESS.name} (${BUSINESS.entityTh}) · ${BUSINESS.email} · ${BUSINESS.phone}`,
};

export const LEGAL: Record<LegalSlug, Record<Language, LegalDoc>> = {
  /* ─────────────────────────── PRIVACY ─────────────────────────── */
  privacy: {
    he: {
      title: 'מדיניות פרטיות',
      updated: LEGAL_UPDATED.he,
      intro: `אתר Refael.ai מופעל על ידי ${BUSINESS.nameHe}, ${BUSINESS.entityHe}. מדיניות זו מסבירה איזה מידע נאסף באתר, למה, ומה הזכויות שלכם לגביו.`,
      sections: [
        { h: 'מי אחראי למידע', p: [`בעל האתר והאחראי על המידע: ${C.he}. לכל פנייה בנושא פרטיות ניתן לכתוב לכתובת הדוא"ל הזו.`] },
        { h: 'איזה מידע נאסף', p: [
          'מידע שאתם מוסרים מרצונכם בטופס יצירת הקשר: שם, טלפון, שם העסק ומיקום ההצבה המבוקש.',
          'מידע טכני שנאסף אוטומטית בעת הגלישה: כתובת IP, סוג הדפדפן והמכשיר, ודפים שנצפו — לצורך תפעול ואבטחת האתר.',
          'העדפת השפה שלכם נשמרת בדפדפן שלכם בלבד (localStorage), כדי שהאתר ייפתח בשפה שבחרתם. מידע זה אינו נשלח אלינו.',
        ]},
        { h: 'שיחות קוליות עם אווטאר', p: [
          'הדגמה חיה עם אווטאר מתבצעת בעמוד נפרד ודורשת את אישורכם לגישה למיקרופון. האישור ניתן על ידכם בדפדפן וניתן לביטול בכל רגע.',
          'הקול מעובד בזמן אמת לצורך ניהול השיחה בלבד. איננו מקליטים ואיננו שומרים את השיחה, והיא אינה משמשת לאימון מודלים. אין להזין בשיחת הדגמה מידע אישי רגיש.',
        ]},
        { h: 'למה המידע משמש', p: [
          'יצירת קשר חוזר בעקבות פנייה, מתן הצעת מחיר, ותיאום הדגמה.',
          'תפעול, אבטחה ושיפור של האתר.',
          'המידע אינו נמכר ואינו מועבר לצדדים שלישיים למטרות שיווק.',
        ]},
        { h: 'ספקי שירות', p: [
          'האתר מתארח בשירותי ענן, ופניות מטופס יצירת הקשר מועברות דרך שירות אוטומציה לצורך העברתן לתיבת הדוא"ל שלנו. ספקים אלה מעבדים את המידע עבורנו בלבד.',
          'חלק מהספקים ממוקמים מחוץ לישראל, ולכן ייתכן שהמידע יישמר בשרתים בחו"ל.',
        ]},
        { h: 'כמה זמן נשמר המידע', p: ['פניות נשמרות כל עוד הן נדרשות לניהול הקשר העסקי, ולא יותר מהנדרש על פי דין. ניתן לבקש מחיקה בכל עת.'] },
        { h: 'הזכויות שלכם', p: [
          'על פי חוק הגנת הפרטיות, התשמ"א-1981, אתם רשאים לעיין במידע שנאסף עליכם, לבקש את תיקונו או את מחיקתו.',
          `לממוש הזכויות פנו אל ${BUSINESS.email}. נשיב לפנייה בתוך זמן סביר.`,
        ]},
        { h: 'עוגיות', p: ['האתר אינו עושה שימוש בעוגיות פרסום או מעקב. נעשה שימוש באחסון מקומי בדפדפן לשמירת העדפת השפה בלבד.'] },
        { h: 'שינויים', p: ['מדיניות זו עשויה להתעדכן. תאריך העדכון האחרון מופיע בראש העמוד.'] },
      ],
    },
    en: {
      title: 'Privacy Policy',
      updated: LEGAL_UPDATED.en,
      intro: `Refael.ai is operated by ${BUSINESS.name}, an Israeli sole proprietor. This policy explains what information the site collects, why, and what rights you have over it.`,
      sections: [
        { h: 'Who controls your data', p: [`Site owner and data controller: ${C.en}. For any privacy request, write to that address.`] },
        { h: 'What we collect', p: [
          'Information you submit voluntarily through the contact form: name, phone number, business name, and intended deployment location.',
          'Technical information collected automatically while browsing: IP address, browser and device type, and pages viewed — used to operate and secure the site.',
          'Your language preference is stored in your own browser (localStorage) so the site opens in the language you chose. It is not transmitted to us.',
        ]},
        { h: 'Voice conversations with an avatar', p: [
          'Live avatar demos open in a separate page and require your explicit microphone permission. You grant it in your browser and can revoke it at any time.',
          'Audio is processed in real time solely to conduct the conversation. We do not record or store it, and it is never used to train models. Please do not share sensitive personal information during a demo conversation.',
        ]},
        { h: 'How the information is used', p: [
          'To respond to your enquiry, provide a quote, and schedule a demo.',
          'To operate, secure, and improve the site.',
          'We do not sell your information or pass it to third parties for marketing.',
        ]},
        { h: 'Service providers', p: [
          'The site is cloud-hosted, and contact-form submissions pass through an automation service that delivers them to our email inbox. These providers process the data solely on our behalf.',
          'Some providers are located outside Israel, so your information may be stored on servers abroad.',
        ]},
        { h: 'How long we keep it', p: ['Enquiries are retained for as long as needed to manage the business relationship, and no longer than the law requires. You may request deletion at any time.'] },
        { h: 'Your rights', p: [
          'Under the Israeli Privacy Protection Law, 5741-1981, you may review the information held about you and request its correction or deletion.',
          `To exercise these rights, contact ${BUSINESS.email}. We will respond within a reasonable time.`,
        ]},
        { h: 'Cookies', p: ['This site uses no advertising or tracking cookies. Browser local storage is used only to remember your language preference.'] },
        { h: 'Changes', p: ['This policy may be updated. The date of the most recent update appears at the top of this page.'] },
      ],
    },
    th: {
      title: 'นโยบายความเป็นส่วนตัว',
      updated: LEGAL_UPDATED.th,
      intro: `เว็บไซต์ Refael.ai ดำเนินการโดย ${BUSINESS.name} ผู้ประกอบการรายบุคคลในประเทศอิสราเอล นโยบายนี้อธิบายว่าเราเก็บข้อมูลใดบ้าง เพื่อวัตถุประสงค์ใด และคุณมีสิทธิอย่างไร`,
      sections: [
        { h: 'ผู้ควบคุมข้อมูล', p: [`เจ้าของเว็บไซต์และผู้ควบคุมข้อมูล: ${C.th} หากมีคำถามเกี่ยวกับความเป็นส่วนตัว กรุณาติดต่อทางอีเมลดังกล่าว`] },
        { h: 'ข้อมูลที่เราเก็บ', p: [
          'ข้อมูลที่คุณกรอกในแบบฟอร์มติดต่อโดยสมัครใจ ได้แก่ ชื่อ หมายเลขโทรศัพท์ ชื่อธุรกิจ และสถานที่ที่ต้องการติดตั้ง',
          'ข้อมูลทางเทคนิคที่เก็บโดยอัตโนมัติระหว่างการเข้าชม ได้แก่ หมายเลข IP ประเภทเบราว์เซอร์และอุปกรณ์ และหน้าที่เข้าชม เพื่อการดูแลและรักษาความปลอดภัยของเว็บไซต์',
          'การตั้งค่าภาษาของคุณถูกบันทึกไว้ในเบราว์เซอร์ของคุณเอง (localStorage) เพื่อให้เว็บไซต์เปิดในภาษาที่คุณเลือก ข้อมูลนี้ไม่ถูกส่งมายังเรา',
        ]},
        { h: 'การสนทนาด้วยเสียงกับอวตาร', p: [
          'การสาธิตอวตารแบบสดจะเปิดในหน้าต่างแยก และต้องได้รับอนุญาตให้เข้าถึงไมโครโฟนจากคุณ คุณสามารถเพิกถอนสิทธิ์นี้ได้ตลอดเวลาในเบราว์เซอร์',
          'เสียงจะถูกประมวลผลแบบเรียลไทม์เพื่อดำเนินการสนทนาเท่านั้น เราไม่บันทึกและไม่จัดเก็บเสียง และไม่นำไปใช้ฝึกโมเดลใด ๆ กรุณาอย่าเปิดเผยข้อมูลส่วนบุคคลที่ละเอียดอ่อนระหว่างการสาธิต',
        ]},
        { h: 'วัตถุประสงค์การใช้ข้อมูล', p: [
          'เพื่อติดต่อกลับ เสนอราคา และนัดหมายการสาธิต',
          'เพื่อดูแล รักษาความปลอดภัย และปรับปรุงเว็บไซต์',
          'เราไม่ขายข้อมูลของคุณ และไม่ส่งต่อให้บุคคลที่สามเพื่อการตลาด',
        ]},
        { h: 'ผู้ให้บริการภายนอก', p: [
          'เว็บไซต์นี้ใช้บริการโฮสติ้งบนคลาวด์ และข้อมูลจากแบบฟอร์มติดต่อจะถูกส่งผ่านบริการระบบอัตโนมัติไปยังอีเมลของเรา ผู้ให้บริการเหล่านี้ประมวลผลข้อมูลในนามของเราเท่านั้น',
          'ผู้ให้บริการบางรายตั้งอยู่นอกประเทศอิสราเอล ข้อมูลของคุณจึงอาจถูกจัดเก็บบนเซิร์ฟเวอร์ในต่างประเทศ',
        ]},
        { h: 'ระยะเวลาจัดเก็บ', p: ['เราเก็บข้อมูลการติดต่อไว้เท่าที่จำเป็นต่อการดำเนินความสัมพันธ์ทางธุรกิจ และไม่เกินกว่าที่กฎหมายกำหนด คุณสามารถขอให้ลบข้อมูลได้ตลอดเวลา'] },
        { h: 'สิทธิของคุณ', p: [
          'ตามกฎหมายคุ้มครองความเป็นส่วนตัวของอิสราเอล ค.ศ. 1981 คุณมีสิทธิเข้าถึงข้อมูลที่เราเก็บเกี่ยวกับคุณ และขอให้แก้ไขหรือลบได้',
          `หากต้องการใช้สิทธิ กรุณาติดต่อ ${BUSINESS.email} เราจะตอบกลับภายในระยะเวลาอันสมควร`,
        ]},
        { h: 'คุกกี้', p: ['เว็บไซต์นี้ไม่ใช้คุกกี้เพื่อการโฆษณาหรือติดตามพฤติกรรม เราใช้พื้นที่จัดเก็บในเบราว์เซอร์เพียงเพื่อจดจำภาษาที่คุณเลือกเท่านั้น'] },
        { h: 'การเปลี่ยนแปลง', p: ['นโยบายนี้อาจมีการปรับปรุง วันที่ปรับปรุงล่าสุดแสดงอยู่ด้านบนของหน้านี้'] },
      ],
    },
  },

  /* ──────────────────────────── TERMS ──────────────────────────── */
  terms: {
    he: {
      title: 'תנאי שימוש',
      updated: LEGAL_UPDATED.he,
      intro: `תנאים אלה חלים על השימוש באתר Refael.ai, המופעל על ידי ${BUSINESS.nameHe}, ${BUSINESS.entityHe}. גלישה באתר מהווה הסכמה לתנאים.`,
      sections: [
        { h: 'השירות', p: [
          'האתר מציג שירות של בניית אווטארים חיים המנהלים שיחה קולית, ומיועד להתקנה בלובי, מוזיאון, אולם תצוגה או אפליקציה.',
          'הסרטונים והדגמות באתר ממחישים את יכולות המערכת. היקף השירות בפועל ייקבע בהצעת מחיר ובהסכם פרטני.',
        ]},
        { h: 'הדגמות חיות', p: [
          'הדגמה חיה עשויה להיות זמינה לסירוגין ומסופקת כפי שהיא, ללא התחייבות לזמינות רציפה.',
          'אין להשתמש בהדגמה למטרות בלתי חוקיות, פוגעניות, או לניסיון לחלץ מידע מהמערכת.',
        ]},
        { h: 'מחירים', p: [
          'המחירים המוצגים באתר הם מחירי מוצא להמחשה, ואינם מהווים הצעה מחייבת.',
          `${BUSINESS.nameHe} רשום כ${BUSINESS.entityHe}; חשבוניות מונפקות בהתאם למעמד זה. מחיר מחייב יימסר בהצעת מחיר בכתב.`,
        ]},
        { h: 'קניין רוחני', p: [
          'כל התכנים באתר — לרבות טקסטים, עיצוב, סרטונים ודמויות האווטאר — הם קניינו של בעל האתר. אין להעתיק, לשכפל או לעשות בהם שימוש מסחרי ללא אישור בכתב.',
        ]},
        { h: 'אחריות', p: [
          'האתר ותכניו מסופקים כפי שהם. לא תחול אחריות לנזק ישיר או עקיף שייגרם משימוש באתר או מהסתמכות על תוכנו.',
          'תנאים אלה אינם גורעים מזכויות שאינן ניתנות להתניה על פי דין.',
        ]},
        { h: 'קישורים חיצוניים', p: ['האתר עשוי לכלול קישורים לשירותים חיצוניים, שאינם בשליטתנו ואינם באחריותנו.'] },
        { h: 'דין וסמכות שיפוט', p: ['על תנאים אלה יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים במחוז תל אביב.'] },
        { h: 'יצירת קשר', p: [C.he] },
      ],
    },
    en: {
      title: 'Terms of Use',
      updated: LEGAL_UPDATED.en,
      intro: `These terms govern use of the Refael.ai website, operated by ${BUSINESS.name}, an Israeli sole proprietor. Browsing the site constitutes acceptance of these terms.`,
      sections: [
        { h: 'The service', p: [
          'The site presents a service that builds live avatars capable of real voice conversation, intended for deployment in lobbies, museums, showrooms, or applications.',
          'Videos and demos on the site illustrate system capabilities. The actual scope of any engagement is defined in a written quote and individual agreement.',
        ]},
        { h: 'Live demos', p: [
          'Live demos may be intermittently available and are provided as is, with no guarantee of continuous uptime.',
          'You may not use a demo for unlawful or abusive purposes, or attempt to extract information from the underlying system.',
        ]},
        { h: 'Pricing', p: [
          'Prices shown on the site are indicative starting prices and do not constitute a binding offer.',
          `${BUSINESS.name} is registered as an Israeli Osek Patur; invoices are issued accordingly. Binding pricing is provided in a written quote.`,
        ]},
        { h: 'Intellectual property', p: [
          'All content on this site — including text, design, video, and the avatar characters — belongs to the site owner. It may not be copied, reproduced, or used commercially without written permission.',
        ]},
        { h: 'Liability', p: [
          'The site and its content are provided as is. No liability is accepted for direct or indirect damages arising from use of the site or reliance on its content.',
          'Nothing in these terms limits rights that cannot be waived under applicable law.',
        ]},
        { h: 'External links', p: ['The site may link to external services which are outside our control and for which we accept no responsibility.'] },
        { h: 'Governing law', p: ['These terms are governed by the laws of the State of Israel. The competent courts of the Tel Aviv district have exclusive jurisdiction.'] },
        { h: 'Contact', p: [C.en] },
      ],
    },
    th: {
      title: 'ข้อกำหนดการใช้งาน',
      updated: LEGAL_UPDATED.th,
      intro: `ข้อกำหนดนี้ใช้บังคับกับการใช้งานเว็บไซต์ Refael.ai ซึ่งดำเนินการโดย ${BUSINESS.name} ผู้ประกอบการรายบุคคลในประเทศอิสราเอล การเข้าชมเว็บไซต์ถือเป็นการยอมรับข้อกำหนดเหล่านี้`,
      sections: [
        { h: 'บริการของเรา', p: [
          'เว็บไซต์นี้นำเสนอบริการสร้างอวตารเสมือนจริงที่สนทนาด้วยเสียงได้ สำหรับติดตั้งในล็อบบี้ พิพิธภัณฑ์ โชว์รูม หรือแอปพลิเคชัน',
          'วิดีโอและการสาธิตบนเว็บไซต์เป็นเพียงตัวอย่างความสามารถของระบบ ขอบเขตงานจริงจะระบุไว้ในใบเสนอราคาและสัญญาเฉพาะราย',
        ]},
        { h: 'การสาธิตแบบสด', p: [
          'การสาธิตแบบสดอาจให้บริการเป็นช่วง ๆ และให้บริการตามสภาพที่เป็นอยู่ โดยไม่รับประกันความพร้อมใช้งานต่อเนื่อง',
          'ห้ามใช้การสาธิตเพื่อวัตถุประสงค์ที่ผิดกฎหมาย ก่อความเสียหาย หรือพยายามดึงข้อมูลจากระบบเบื้องหลัง',
        ]},
        { h: 'ราคา', p: [
          'ราคาที่แสดงบนเว็บไซต์เป็นราคาเริ่มต้นเพื่อการอ้างอิง และไม่ถือเป็นข้อเสนอที่ผูกพัน',
          `${BUSINESS.name} จดทะเบียนในสถานะ Osek Patur ของประเทศอิสราเอล และออกใบแจ้งหนี้ตามสถานะดังกล่าว ราคาที่ผูกพันจะระบุในใบเสนอราคาเป็นลายลักษณ์อักษร`,
        ]},
        { h: 'ทรัพย์สินทางปัญญา', p: [
          'เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงข้อความ การออกแบบ วิดีโอ และตัวละครอวตาร เป็นทรัพย์สินของเจ้าของเว็บไซต์ ห้ามคัดลอก ทำซ้ำ หรือใช้ในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร',
        ]},
        { h: 'ความรับผิด', p: [
          'เว็บไซต์และเนื้อหาให้บริการตามสภาพที่เป็นอยู่ เราไม่รับผิดต่อความเสียหายทั้งทางตรงและทางอ้อมที่เกิดจากการใช้งานหรือการเชื่อถือเนื้อหาบนเว็บไซต์',
          'ข้อกำหนดนี้ไม่จำกัดสิทธิที่ไม่อาจสละได้ตามกฎหมายที่ใช้บังคับ',
        ]},
        { h: 'ลิงก์ภายนอก', p: ['เว็บไซต์อาจมีลิงก์ไปยังบริการภายนอกซึ่งอยู่นอกเหนือการควบคุมและความรับผิดชอบของเรา'] },
        { h: 'กฎหมายที่ใช้บังคับ', p: ['ข้อกำหนดนี้อยู่ภายใต้กฎหมายของรัฐอิสราเอล และให้ศาลที่มีเขตอำนาจในเขตเทลอาวีฟเป็นศาลที่มีอำนาจพิจารณาแต่เพียงผู้เดียว'] },
        { h: 'ติดต่อเรา', p: [C.th] },
      ],
    },
  },

  /* ───────────────────────── ACCESSIBILITY ─────────────────────── */
  accessibility: {
    he: {
      title: 'הצהרת נגישות',
      updated: LEGAL_UPDATED.he,
      intro: 'אנו רואים חשיבות בכך שהאתר יהיה שמיש עבור כל אדם, לרבות אנשים עם מוגבלות, ופועלים לשפר את נגישותו באופן שוטף.',
      sections: [
        { h: 'רמת הנגישות', p: [
          'האתר נבנה מתוך כוונה לעמוד בהנחיות WCAG 2.1 ברמה AA, בהתאם לתקן הישראלי ת"י 5568 ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.',
        ]},
        { h: 'התאמות שבוצעו באתר', p: [
          'ניווט מלא באמצעות מקלדת, עם סימון ברור וגלוי של הרכיב שבמיקוד.',
          'שמירה על ניגודיות צבעים בין הטקסט לרקע.',
          'תמיכה בהעדפת המערכת להפחתת תנועה (prefers-reduced-motion): כאשר ההעדפה פעילה, אנימציות, הבהובים ואפקט ההקלדה מבוטלים ותוכן מוצג באופן מיידי.',
          'מבנה כותרות היררכי, טקסט חלופי לתמונות, ותוויות לשדות בטופס יצירת הקשר.',
          'האתר נתמך בשלוש שפות — עברית, אנגלית ותאית — עם כיווניות טקסט מותאמת.',
          'רוב סרטוני האווטאר באתר הם קטעי תנועה ללא פס קול. הסרטון שבו מאיה מדברת כולל דיבור, ולצידו מופיע תמלול מלא בעמוד הבית ("מה היא אומרת"), כך שאין צורך לשמוע כדי להבין את התוכן.',
        ]},
        { h: 'מגבלות ידועות', p: [
          'הדגמת שיחה חיה עם אווטאר מבוססת על קול, ובשלב זה אינה כוללת תמלול בזמן אמת. אנו בוחנים הוספת תמלול.',
          'ייתכנו רכיבים בודדים שטרם הונגשו במלואם. אם נתקלתם בקושי, נשמח שתעדכנו אותנו ונטפל בכך.',
        ]},
        { h: 'פניות בנושא נגישות', p: [
          `רכז הנגישות: ${BUSINESS.nameHe}. דוא"ל: ${BUSINESS.email} · טלפון: ${BUSINESS.phone}.`,
          'אם נתקלתם בבעיית נגישות באתר, נשמח לקבל פנייה הכוללת את תיאור הבעיה, העמוד שבו אירעה והדפדפן שבו השתמשתם. נשתדל להשיב ולתת מענה בהקדם האפשרי.',
        ]},
      ],
    },
    en: {
      title: 'Accessibility Statement',
      updated: LEGAL_UPDATED.en,
      intro: 'We believe this site should be usable by everyone, including people with disabilities, and we work to improve its accessibility on an ongoing basis.',
      sections: [
        { h: 'Standard', p: [
          'This site is built with the intent of meeting WCAG 2.1 Level AA, in line with Israeli Standard IS 5568 and the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 5773-2013.',
        ]},
        { h: 'What has been implemented', p: [
          'Full keyboard navigation, with a clearly visible focus indicator on the active element.',
          'Colour contrast maintained between text and background.',
          'Support for the reduced-motion system preference: when enabled, animations, pulsing, and the typing effect are disabled and content is shown immediately.',
          'Hierarchical heading structure, alternative text for images, and labels on all contact-form fields.',
          'The site is available in three languages — Hebrew, English, and Thai — with correct text direction for each.',
          'Most avatar videos on this site are silent motion clips. The one clip in which Maya speaks carries speech, and a full transcript sits beside it on the home page ("What she says"), so hearing it is never required to understand the content.',
        ]},
        { h: 'Known limitations', p: [
          'The live avatar conversation demo is voice-based and does not currently include real-time captioning. We are evaluating adding it.',
          'Individual components may not yet be fully accessible. If you encounter a difficulty, please tell us and we will address it.',
        ]},
        { h: 'Accessibility contact', p: [
          `Accessibility coordinator: ${BUSINESS.name}. Email: ${BUSINESS.email} · Phone: ${BUSINESS.phone}.`,
          'If you encounter an accessibility problem, please include a description of the issue, the page it occurred on, and the browser you were using. We will do our best to respond and resolve it promptly.',
        ]},
      ],
    },
    th: {
      title: 'คำแถลงการเข้าถึง',
      updated: LEGAL_UPDATED.th,
      intro: 'เราเชื่อว่าเว็บไซต์นี้ควรใช้งานได้สำหรับทุกคน รวมถึงผู้พิการ และเรามุ่งมั่นปรับปรุงการเข้าถึงอย่างต่อเนื่อง',
      sections: [
        { h: 'มาตรฐานที่ใช้', p: [
          'เว็บไซต์นี้จัดทำขึ้นโดยมุ่งให้เป็นไปตามแนวทาง WCAG 2.1 ระดับ AA ซึ่งสอดคล้องกับมาตรฐานอิสราเอล IS 5568 และกฎกระทรวงว่าด้วยความเท่าเทียมสำหรับผู้พิการ (การปรับปรุงการเข้าถึงบริการ) ค.ศ. 2013',
        ]},
        { h: 'สิ่งที่ได้ดำเนินการแล้ว', p: [
          'รองรับการใช้งานผ่านแป้นพิมพ์อย่างครบถ้วน พร้อมแสดงกรอบโฟกัสที่ชัดเจน',
          'รักษาค่าความต่างของสีระหว่างข้อความกับพื้นหลัง',
          'รองรับการตั้งค่าลดการเคลื่อนไหวของระบบ (prefers-reduced-motion) เมื่อเปิดใช้งาน ภาพเคลื่อนไหวและเอฟเฟกต์การพิมพ์จะถูกปิด และแสดงเนื้อหาทันที',
          'โครงสร้างหัวข้อเป็นลำดับชั้น มีข้อความทางเลือกสำหรับรูปภาพ และมีป้ายกำกับสำหรับทุกช่องในแบบฟอร์มติดต่อ',
          'เว็บไซต์รองรับสามภาษา ได้แก่ ฮีบรู อังกฤษ และไทย พร้อมทิศทางการอ่านที่ถูกต้องในแต่ละภาษา',
          'วิดีโออวตารส่วนใหญ่บนเว็บไซต์นี้เป็นคลิปเคลื่อนไหวที่ไม่มีเสียง ส่วนคลิปที่มายาพูดนั้นมีเสียงพูด และมีคำถอดความฉบับเต็มอยู่ข้าง ๆ บนหน้าแรก ("เธอพูดว่าอะไร") จึงไม่จำเป็นต้องได้ยินเสียงเพื่อเข้าใจเนื้อหา',
        ]},
        { h: 'ข้อจำกัดที่ทราบ', p: [
          'การสาธิตสนทนากับอวตารแบบสดใช้เสียงเป็นหลัก และยังไม่มีคำบรรยายแบบเรียลไทม์ในขณะนี้ เรากำลังพิจารณาเพิ่มฟีเจอร์ดังกล่าว',
          'อาจมีบางส่วนที่ยังเข้าถึงได้ไม่สมบูรณ์ หากคุณพบปัญหา กรุณาแจ้งให้เราทราบ เราจะดำเนินการแก้ไข',
        ]},
        { h: 'ติดต่อเรื่องการเข้าถึง', p: [
          `ผู้ประสานงานด้านการเข้าถึง: ${BUSINESS.name} อีเมล: ${BUSINESS.email} · โทรศัพท์: ${BUSINESS.phone}`,
          'หากคุณพบปัญหาด้านการเข้าถึง กรุณาแจ้งรายละเอียดของปัญหา หน้าที่พบปัญหา และเบราว์เซอร์ที่ใช้ เราจะพยายามตอบกลับและแก้ไขโดยเร็วที่สุด',
        ]},
      ],
    },
  },
};
