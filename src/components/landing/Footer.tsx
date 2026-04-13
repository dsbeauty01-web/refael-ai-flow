import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { isHebrew } = useLanguage();

  return (
    <footer className="border-t border-border py-10 px-4 text-center bg-card">
      <p className={`text-[1rem] text-foreground font-semibold mb-1 ${isHebrew ? 'font-hebrew' : ''}`}>
        &copy; 2026 {isHebrew ? 'רפאל סלע' : 'Refael Sela'}
      </p>
      <p className={`text-[0.9rem] text-muted-foreground mb-4 ${isHebrew ? 'font-hebrew' : ''}`}>
        {isHebrew ? 'מישראל, עובד עם כל העולם' : 'Based in Israel, Working worldwide'}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {['n8n', 'D-ID', 'OpenAI', 'Pinecone'].map((t) => (
          <span key={t} className="text-[0.85rem] px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground">{t}</span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
