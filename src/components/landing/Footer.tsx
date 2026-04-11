const Footer = () => (
  <footer className="border-t border-border py-10 px-4 text-center bg-card">
    <p className="text-sm text-muted-foreground mb-2">
      &copy; 2026 <span className="text-foreground font-semibold">Refael Sela</span>
    </p>
    <p className="text-xs text-muted-foreground mb-4">Based in Israel, Working worldwide</p>
    <div className="flex flex-wrap justify-center gap-3">
      {['n8n', 'D-ID', 'OpenAI', 'Pinecone'].map((t) => (
        <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
          {t}
        </span>
      ))}
    </div>
  </footer>
);

export default Footer;
