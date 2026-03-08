export const translations = {
  he: {
    nav: {
      services: 'שירותים',
      demos: 'דמואים',
      howItWorks: 'איך זה עובד',
      whyMe: 'למה אני',
      industries: 'תעשיות',
      testimonials: 'המלצות',
      portfolio: 'פרויקטים',
      contact: 'צור קשר',
    },
    hero: {
      headline: 'אוטומציה חכמה לעסקים קטנים',
      subheadline: 'עם בינה מלאכותית',
      description: 'אני עוזר לעסקים קטנים לחסוך זמן, לענות ללקוחות מהר יותר ולסגור יותר עסקאות — באמצעות מערכות אוטומציה מבוססות AI.',
      cta1: 'שלח הודעה בוואטסאפ',
      cta2: 'נסו את הבוטים',
    },
    services: {
      title: 'השירותים שלי',
      subtitle: 'פתרונות אוטומציה מותאמים אישית לעסק שלך',
      items: [
        {
          title: 'בוט תמיכה בלקוחות',
          description: 'מענה אוטומטי 24/7 לשאלות נפוצות, טיפול בתלונות, ומתן מידע — כדי שהלקוחות שלך יקבלו מענה מיידי.',
          features: ['מענה מיידי 24/7', 'חיסכון בזמן צוות', 'שביעות רצון לקוחות גבוהה'],
        },
        {
          title: 'בוט סינון לידים',
          description: 'בוט שמזהה לידים רציניים, שואל שאלות מקדימות, ומעביר אליך רק את הלקוחות הרלוונטיים.',
          features: ['סינון אוטומטי', 'שאלות מותאמות', 'חיסכון בזמן מכירות'],
        },
        {
          title: 'סוכן קביעת פגישות',
          description: 'בוט שמתאם פגישות, שולח תזכורות, ומנהל את היומן שלך — בלי שתצטרך לעשות כלום.',
          features: ['תיאום אוטומטי', 'תזכורות ללקוח', 'סנכרון עם יומן'],
        },
        {
          title: 'אוטומציית הצעות מחיר ותשלומים',
          description: 'הפקת הצעות מחיר אוטומטיות, שליחת חשבוניות, ומעקב תשלומים — הכל אוטומטי.',
          features: ['הצעות מחיר מיידיות', 'מעקב תשלומים', 'חשבוניות אוטומטיות'],
        },
        {
          title: 'אוטומציית שיווק ותוכן',
          description: 'יצירת תוכן, פרסום ברשתות חברתיות, וניהול קמפיינים — באמצעות AI שעובד בשבילך.',
          features: ['תוכן אוטומטי', 'ניהול רשתות', 'קמפיינים חכמים'],
        },
      ],
    },
    demos: {
      title: 'נסו את הבוטים',
      subtitle: 'ראו איך הבוטים שלי עובדים בפועל',
      items: [
        {
          name: 'בוט תמיכה',
          description: 'ראו איך בוט תמיכה עונה ללקוח בזמן אמת',
          useCase: 'לקוח שואל על מדיניות החזרה בחנות אונליין',
          buttonText: 'פתח דמו',
        },
        {
          name: 'בוט סינון לידים',
          description: 'ראו איך בוט מסנן לידים ומזהה לקוחות פוטנציאליים',
          useCase: 'ליד חדש מתעניין בשירות ייעוץ',
          buttonText: 'פתח דמו',
        },
        {
          name: 'סוכן קביעת פגישות',
          description: 'ראו איך בוט מתאם פגישה עם לקוח',
          useCase: 'לקוח רוצה לקבוע תור למרפאה',
          buttonText: 'פתח דמו',
        },
        {
          name: 'בוט הצעות מחיר',
          description: 'ראו איך בוט מפיק הצעת מחיר אוטומטית',
          useCase: 'לקוח מבקש הצעת מחיר לשירות שיפוץ',
          buttonText: 'פתח דמו',
        },
      ],
    },
    mockChats: [
      [
        { role: 'bot', text: 'שלום! 👋 ברוכים הבאים לחנות שלנו. איך אפשר לעזור?' },
        { role: 'user', text: 'היי, קניתי מוצר לפני שבוע ואני רוצה להחזיר אותו' },
        { role: 'bot', text: 'בטח! מדיניות ההחזרה שלנו מאפשרת החזרה עד 14 יום מהרכישה. האם יש לך את מספר ההזמנה?' },
        { role: 'user', text: 'כן, ההזמנה מספר 4521' },
        { role: 'bot', text: 'מצאתי את ההזמנה שלך. אני רואה שהמוצר נרכש לפני 5 ימים — אתה בתוך חלון ההחזרה. אני שולח לך קישור להחזרה למייל עכשיו. 📧' },
        { role: 'user', text: 'תודה רבה!' },
        { role: 'bot', text: 'בשמחה! אם יש עוד משהו — אני כאן. 😊' },
      ],
      [
        { role: 'bot', text: 'שלום! 👋 תודה שפנית אלינו. אשמח לעזור לך למצוא את הפתרון הנכון. מה סוג העסק שלך?' },
        { role: 'user', text: 'יש לי סוכנות ביטוח קטנה' },
        { role: 'bot', text: 'מעולה! כמה עובדים יש בסוכנות?' },
        { role: 'user', text: 'שלושה סוכנים ומזכירה' },
        { role: 'bot', text: 'מובן. ומה האתגר העיקרי שלך כרגע? למשל: מענה ללקוחות, ניהול לידים, תיאום פגישות?' },
        { role: 'user', text: 'בעיקר ניהול לידים, אנחנו מפספסים הרבה פניות' },
        { role: 'bot', text: 'הבנתי. נראה שמערכת אוטומציה לסינון וניהול לידים יכולה לחסוך לך הרבה זמן ולקוחות. אני מעביר את הפרטים שלך לרפאל — הוא יחזור אליך תוך 24 שעות עם הצעה מותאמת! 📋' },
      ],
      [
        { role: 'bot', text: 'שלום! 👋 ברוכים הבאים למרפאת ד"ר כהן. איך אפשר לעזור?' },
        { role: 'user', text: 'הייתי רוצה לקבוע תור לבדיקה' },
        { role: 'bot', text: 'בשמחה! איזה סוג בדיקה? בדיקה כללית, בדיקת עיניים, או אחר?' },
        { role: 'user', text: 'בדיקה כללית' },
        { role: 'bot', text: 'מעולה. יש לנו תורים פנויים ביום שלישי ב-10:00, 14:00, או ביום חמישי ב-9:00. מה מתאים לך?' },
        { role: 'user', text: 'יום שלישי ב-14:00 בבקשה' },
        { role: 'bot', text: 'נקבע! ✅ תור לבדיקה כללית ביום שלישי ב-14:00. שלחתי לך אישור ותזכורת ב-SMS. נתראה!' },
      ],
      [
        { role: 'bot', text: 'שלום! 👋 אשמח לעזור לך לקבל הצעת מחיר. מה סוג השירות שאתה מחפש?' },
        { role: 'user', text: 'אני צריך שיפוץ למטבח' },
        { role: 'bot', text: 'מעולה! כמה גדול המטבח בערך? (קטן / בינוני / גדול)' },
        { role: 'user', text: 'בינוני, בערך 12 מ"ר' },
        { role: 'bot', text: 'מובן. האם אתה מעוניין גם בהחלפת ארונות, או רק ריצוף וצבע?' },
        { role: 'user', text: 'הכל — ארונות, ריצוף וצבע' },
        { role: 'bot', text: 'הנה הצעת מחיר ראשונית:\n\n🔧 שיפוץ מטבח בינוני (12 מ"ר)\n• ארונות מטבח: ₪15,000\n• ריצוף: ₪4,500\n• צביעה: ₪2,500\n• עבודה: ₪8,000\n\n💰 סה"כ משוער: ₪30,000\n\nלתיאום סיור חינם אצלך — השאר פרטים ונחזור אליך!' },
      ],
    ],
    howItWorks: {
      title: 'איך זה עובד?',
      subtitle: 'תהליך פשוט מהתחלה ועד השקה',
      steps: [
        {
          number: '01',
          title: 'מבין את העסק שלך',
          description: 'אני לומד את התהליכים, האתגרים והצרכים שלך — כדי לבנות פתרון שמתאים בדיוק לעסק.',
        },
        {
          number: '02',
          title: 'בונה את האוטומציה',
          description: 'מתכנן ובונה מערכת AI מותאמת אישית, כולל בדיקות ואופטימיזציה.',
        },
        {
          number: '03',
          title: 'משיק ומשפר',
          description: 'משיקים את המערכת, עוקבים אחרי ביצועים, ומשפרים בהתמדה.',
        },
      ],
    },
    whyMe: {
      title: 'למה לעבוד איתי?',
      subtitle: 'הגישה שלי לאוטומציה עסקית',
      points: [
        {
          title: 'אוטומציה מעשית',
          description: 'לא טכנולוגיה לשם טכנולוגיה — פתרונות שבאמת חוסכים זמן וכסף.',
        },
        {
          title: 'תהליכים מותאמים אישית',
          description: 'כל מערכת נבנית בהתאמה מלאה לצרכים של העסק שלך.',
        },
        {
          title: 'ביצוע מהיר',
          description: 'מהרעיון להשקה בזמן קצר — בלי סיבוכים ובלי עיכובים מיותרים.',
        },
        {
          title: 'מותאם לעסקים קטנים',
          description: 'אני מבין את האתגרים של עסקים קטנים ובונה פתרונות שמתאימים לתקציב ולקצב שלך.',
        },
        {
          title: 'מתמקד בתוצאות',
          description: 'ההצלחה שלי נמדדת בתוצאות שלך — יותר לידים, יותר מכירות, פחות זמן מבוזבז.',
        },
      ],
    },
    industries: {
      title: 'תעשיות שאני עובד איתן',
      subtitle: 'פתרונות AI לכל תחום',
      items: [
        {
          name: 'מסחר אלקטרוני',
          description: 'מענה אוטומטי ללקוחות, ניהול הזמנות, ומעקב משלוחים.',
        },
        {
          name: 'מרפאות',
          description: 'תיאום תורים, תזכורות, ומענה לשאלות נפוצות של מטופלים.',
        },
        {
          name: 'מספרות ומכוני יופי',
          description: 'קביעת תורים, ניהול לקוחות חוזרים, ושליחת עדכונים.',
        },
        {
          name: 'יועצים',
          description: 'סינון לידים, תיאום שיחות ייעוץ, ומעקב אחרי לקוחות.',
        },
        {
          name: 'סוכנויות',
          description: 'ניהול פניות, אוטומציית דוחות, ותקשורת עם לקוחות.',
        },
      ],
    },
    testimonials: {
      title: 'מה הלקוחות אומרים',
      subtitle: 'ביקורות מלקוחות מרוצים',
      items: [
        {
          name: 'דנה לוי',
          role: 'בעלת חנות אונליין',
          text: 'מאז שהתקנו את הבוט של רפאל, אנחנו עונים ל-80% מהפניות אוטומטית. חסכנו שעות עבודה כל יום.',
        },
        {
          name: 'יוסי כהן',
          role: 'מנהל מרפאה',
          text: 'מערכת התורים האוטומטית שינתה את הקליניקה שלנו. פחות ביטולים, יותר תורים מלאים, ומזכירה מרוצה.',
        },
        {
          name: 'מיכל אברהם',
          role: 'יועצת עסקית',
          text: 'הבוט מסנן לי את הלידים ומעביר רק את הרציניים. אני מתמקדת במה שחשוב — לתת ערך ללקוחות.',
        },
      ],
    },
    portfolio: {
      title: 'פרויקטים נבחרים',
      subtitle: 'דוגמאות מפרויקטים שביצעתי',
      items: [
        {
          title: 'בוט תמיכה לחנות אופנה',
          industry: 'מסחר אלקטרוני',
          description: 'בוט שעונה על שאלות לגבי מידות, משלוחים והחזרות — 24/7.',
          result: 'ירידה של 65% בפניות לשירות לקוחות',
        },
        {
          title: 'מערכת תורים למרפאת שיניים',
          industry: 'בריאות',
          description: 'מערכת קביעת תורים אוטומטית עם תזכורות SMS.',
          result: 'ירידה של 40% בביטולי תורים',
        },
        {
          title: 'סינון לידים לסוכנות ביטוח',
          industry: 'שירותים פיננסיים',
          description: 'בוט שמסנן ומדרג לידים לפני שהם מגיעים לסוכנים.',
          result: 'עלייה של 50% ביחס המרה',
        },
        {
          title: 'אוטומציית תוכן לסוכנות דיגיטל',
          industry: 'שיווק',
          description: 'מערכת יצירת תוכן ופרסום אוטומטי ברשתות חברתיות.',
          result: 'חיסכון של 15 שעות עבודה בשבוע',
        },
      ],
    },
    contact: {
      title: 'בואו נדבר',
      subtitle: 'מוכנים להתחיל? אני כאן בשבילכם',
      form: {
        name: 'שם מלא',
        email: 'אימייל',
        message: 'הודעה',
        send: 'שלח הודעה',
        namePlaceholder: 'השם שלך',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'ספר לי על העסק שלך ואיך אני יכול לעזור...',
      },
      whatsapp: 'שלח הודעה בוואטסאפ',
      email: 'שלח אימייל',
      booking: 'קבע שיחת ייעוץ',
    },
    footer: {
      rights: '© 2025 רפאל סלע. כל הזכויות שמורות.',
      tagline: 'אוטומציה חכמה לעסקים קטנים',
    },
  },
  en: {
    nav: {
      services: 'Services',
      demos: 'Demos',
      howItWorks: 'How It Works',
      whyMe: 'Why Me',
      industries: 'Industries',
      testimonials: 'Testimonials',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    hero: {
      headline: 'Smart Automation for Small Businesses',
      subheadline: 'Powered by AI',
      description: 'I help small businesses save time, respond to customers faster, and close more deals — using AI-powered automation systems.',
      cta1: 'Message on WhatsApp',
      cta2: 'Try Demo Bots',
    },
    services: {
      title: 'My Services',
      subtitle: 'Custom automation solutions tailored for your business',
      items: [
        {
          title: 'AI Customer Support Bot',
          description: 'Automatic 24/7 responses to common questions, complaint handling, and information — so your customers get instant answers.',
          features: ['Instant 24/7 responses', 'Save team time', 'Higher customer satisfaction'],
        },
        {
          title: 'AI Lead Qualification Bot',
          description: 'A bot that identifies serious leads, asks pre-qualifying questions, and passes only relevant prospects to you.',
          features: ['Automatic filtering', 'Custom questions', 'Save sales time'],
        },
        {
          title: 'AI Booking Agent',
          description: 'A bot that schedules meetings, sends reminders, and manages your calendar — without you lifting a finger.',
          features: ['Auto scheduling', 'Client reminders', 'Calendar sync'],
        },
        {
          title: 'AI Quote & Payment Automation',
          description: 'Automatic quote generation, invoice sending, and payment tracking — all hands-free.',
          features: ['Instant quotes', 'Payment tracking', 'Auto invoicing'],
        },
        {
          title: 'AI Marketing & Content Automation',
          description: 'Content creation, social media posting, and campaign management — with AI working for you.',
          features: ['Auto content', 'Social management', 'Smart campaigns'],
        },
      ],
    },
    demos: {
      title: 'Try the Bots',
      subtitle: 'See how my bots work in action',
      items: [
        {
          name: 'Support Bot',
          description: 'See how a support bot responds to a customer in real-time',
          useCase: 'Customer asks about return policy for an online store',
          buttonText: 'Open Demo',
        },
        {
          name: 'Lead Qualification Bot',
          description: 'See how a bot filters leads and identifies potential clients',
          useCase: 'New lead interested in consulting services',
          buttonText: 'Open Demo',
        },
        {
          name: 'Booking Agent',
          description: 'See how a bot schedules an appointment with a client',
          useCase: 'Client wants to book an appointment at a clinic',
          buttonText: 'Open Demo',
        },
        {
          name: 'Quote Generator Bot',
          description: 'See how a bot generates an automatic quote',
          useCase: 'Client requests a quote for renovation services',
          buttonText: 'Open Demo',
        },
      ],
    },
    mockChats: [
      [
        { role: 'bot', text: 'Hi! 👋 Welcome to our store. How can I help you?' },
        { role: 'user', text: 'Hey, I bought a product last week and want to return it' },
        { role: 'bot', text: 'Of course! Our return policy allows returns within 14 days of purchase. Do you have your order number?' },
        { role: 'user', text: 'Yes, order #4521' },
        { role: 'bot', text: 'Found your order. I see it was purchased 5 days ago — you\'re within the return window. I\'m sending you a return link via email now. 📧' },
        { role: 'user', text: 'Thanks a lot!' },
        { role: 'bot', text: 'You\'re welcome! If there\'s anything else — I\'m here. 😊' },
      ],
      [
        { role: 'bot', text: 'Hi! 👋 Thanks for reaching out. I\'d love to help you find the right solution. What type of business do you have?' },
        { role: 'user', text: 'I have a small insurance agency' },
        { role: 'bot', text: 'Great! How many employees does the agency have?' },
        { role: 'user', text: 'Three agents and a secretary' },
        { role: 'bot', text: 'Got it. What\'s your main challenge right now? For example: customer responses, lead management, scheduling?' },
        { role: 'user', text: 'Mainly lead management, we\'re missing a lot of inquiries' },
        { role: 'bot', text: 'I understand. It sounds like a lead filtering and management automation system could save you a lot of time and clients. I\'m forwarding your details to Refael — he\'ll get back to you within 24 hours with a tailored proposal! 📋' },
      ],
      [
        { role: 'bot', text: 'Hi! 👋 Welcome to Dr. Cohen\'s clinic. How can I help?' },
        { role: 'user', text: 'I\'d like to book an appointment for a checkup' },
        { role: 'bot', text: 'Happy to help! What type of checkup? General, eye exam, or other?' },
        { role: 'user', text: 'General checkup' },
        { role: 'bot', text: 'We have openings on Tuesday at 10:00, 14:00, or Thursday at 9:00. What works for you?' },
        { role: 'user', text: 'Tuesday at 14:00 please' },
        { role: 'bot', text: 'Booked! ✅ General checkup on Tuesday at 14:00. I\'ve sent you a confirmation and reminder via SMS. See you then!' },
      ],
      [
        { role: 'bot', text: 'Hi! 👋 I\'d love to help you get a quote. What type of service are you looking for?' },
        { role: 'user', text: 'I need a kitchen renovation' },
        { role: 'bot', text: 'Great! How large is the kitchen approximately? (small / medium / large)' },
        { role: 'user', text: 'Medium, about 12 sqm' },
        { role: 'bot', text: 'Got it. Are you also interested in new cabinets, or just tiling and painting?' },
        { role: 'user', text: 'Everything — cabinets, tiling, and painting' },
        { role: 'bot', text: 'Here\'s an initial quote:\n\n🔧 Medium Kitchen Renovation (12 sqm)\n• Kitchen cabinets: $5,000\n• Tiling: $1,500\n• Painting: $800\n• Labor: $2,700\n\n💰 Estimated total: $10,000\n\nTo schedule a free on-site visit — leave your details and we\'ll get back to you!' },
      ],
    ],
    howItWorks: {
      title: 'How It Works',
      subtitle: 'A simple process from start to launch',
      steps: [
        {
          number: '01',
          title: 'Understand Your Business',
          description: 'I learn your processes, challenges, and needs — to build a solution that fits your business perfectly.',
        },
        {
          number: '02',
          title: 'Build the Automation',
          description: 'Design and build a custom AI system, including testing and optimization.',
        },
        {
          number: '03',
          title: 'Launch & Improve',
          description: 'Launch the system, monitor performance, and continuously improve.',
        },
      ],
    },
    whyMe: {
      title: 'Why Work With Me?',
      subtitle: 'My approach to business automation',
      points: [
        {
          title: 'Practical Automation',
          description: 'Not technology for technology\'s sake — solutions that actually save time and money.',
        },
        {
          title: 'Custom Workflows',
          description: 'Every system is built to perfectly match your specific business needs.',
        },
        {
          title: 'Fast Execution',
          description: 'From idea to launch in record time — no complications or unnecessary delays.',
        },
        {
          title: 'Built for Small Business',
          description: 'I understand the challenges of small businesses and build solutions that fit your budget and pace.',
        },
        {
          title: 'Results-Focused',
          description: 'My success is measured by your results — more leads, more sales, less wasted time.',
        },
      ],
    },
    industries: {
      title: 'Industries I Work With',
      subtitle: 'AI solutions for every field',
      items: [
        {
          name: 'E-commerce',
          description: 'Automatic customer support, order management, and shipment tracking.',
        },
        {
          name: 'Clinics',
          description: 'Appointment scheduling, reminders, and answering common patient questions.',
        },
        {
          name: 'Salons & Beauty',
          description: 'Booking appointments, managing returning clients, and sending updates.',
        },
        {
          name: 'Consultants',
          description: 'Lead filtering, scheduling consultation calls, and client follow-ups.',
        },
        {
          name: 'Agencies',
          description: 'Managing inquiries, automating reports, and client communications.',
        },
      ],
    },
    testimonials: {
      title: 'What Clients Say',
      subtitle: 'Reviews from happy clients',
      items: [
        {
          name: 'Dana Levy',
          role: 'Online Store Owner',
          text: 'Since installing Refael\'s bot, we automatically handle 80% of inquiries. We save hours of work every day.',
        },
        {
          name: 'Yossi Cohen',
          role: 'Clinic Manager',
          text: 'The automated booking system transformed our clinic. Fewer cancellations, more full appointments, and a happy receptionist.',
        },
        {
          name: 'Michal Abraham',
          role: 'Business Consultant',
          text: 'The bot filters my leads and passes only the serious ones. I focus on what matters — delivering value to clients.',
        },
      ],
    },
    portfolio: {
      title: 'Selected Projects',
      subtitle: 'Examples of projects I\'ve delivered',
      items: [
        {
          title: 'Support Bot for Fashion Store',
          industry: 'E-commerce',
          description: 'A bot answering questions about sizes, shipping, and returns — 24/7.',
          result: '65% reduction in customer service inquiries',
        },
        {
          title: 'Booking System for Dental Clinic',
          industry: 'Healthcare',
          description: 'Automated appointment scheduling with SMS reminders.',
          result: '40% reduction in appointment cancellations',
        },
        {
          title: 'Lead Filtering for Insurance Agency',
          industry: 'Financial Services',
          description: 'A bot that filters and ranks leads before they reach agents.',
          result: '50% increase in conversion rate',
        },
        {
          title: 'Content Automation for Digital Agency',
          industry: 'Marketing',
          description: 'Automated content creation and social media posting system.',
          result: '15 hours of work saved per week',
        },
      ],
    },
    contact: {
      title: 'Let\'s Talk',
      subtitle: 'Ready to get started? I\'m here for you',
      form: {
        name: 'Full Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'Tell me about your business and how I can help...',
      },
      whatsapp: 'Message on WhatsApp',
      email: 'Send Email',
      booking: 'Book a Consultation',
    },
    footer: {
      rights: '© 2025 Refael Sela. All rights reserved.',
      tagline: 'Smart Automation for Small Businesses',
    },
  },
} as const;
