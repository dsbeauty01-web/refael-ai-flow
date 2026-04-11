const Footer = () => (
  <footer className="border-t border-border py-10 px-4 text-center">
    <p className="text-sm text-muted-foreground mb-3">
      Built by <span className="text-foreground font-semibold">Refael Sela</span> | Powered by AI
    </p>
    <div className="flex flex-wrap justify-center gap-3 mb-4">
      {['n8n', 'D-ID', 'OpenAI', 'Pinecone'].map((t) => (
        <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
          {t}
        </span>
      ))}
    </div>
    <p className="text-xs text-muted-foreground/50">© 2026 Refael Sela. All rights reserved.</p>
  </footer>
);

export default Footer;
