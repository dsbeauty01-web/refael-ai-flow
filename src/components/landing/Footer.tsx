const Footer = () => (
  <footer className="border-t border-border py-10 px-4 text-center bg-card">
    <p className="font-hebrew text-[1rem] text-foreground font-semibold mb-0.5" dir="rtl">
      &copy; 2026 רפאל סלע
    </p>
    <p className="text-[0.9rem] text-muted-foreground mb-1">
      &copy; 2026 Refael Sela
    </p>
    <p className="font-hebrew text-[0.9rem] text-muted-foreground mb-0.5" dir="rtl">מישראל, עובד עם כל העולם</p>
    <p className="text-[0.85rem] text-muted-foreground mb-4">Based in Israel, Working worldwide</p>
    <div className="flex flex-wrap justify-center gap-3">
      {['n8n', 'D-ID', 'OpenAI', 'Pinecone'].map((t) => (
        <span key={t} className="text-[0.85rem] px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
          {t}
        </span>
      ))}
    </div>
  </footer>
);

export default Footer;
