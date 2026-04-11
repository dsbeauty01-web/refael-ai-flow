import { Button } from '@/components/ui/button';
import { ArrowDown, MessageCircle } from 'lucide-react';

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Animated gradient bg */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(43 72% 53% / 0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, hsl(210 80% 55% / 0.04) 0%, transparent 50%), hsl(240 14% 4%)',
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 className="font-hebrew text-6xl sm:text-7xl lg:text-8xl font-extrabold text-gradient-gold mb-4 leading-tight">
        רפאל סלע
      </h1>
      <p className="text-xl sm:text-2xl font-semibold text-foreground/90 mb-4">
        AI Automation for Small Businesses
      </p>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        I build AI assistants that talk, think, and take action for your business — 24/7
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="gradient-gold text-primary-foreground font-semibold text-base h-14 px-10 rounded-xl hover:opacity-90 transition-all shadow-lg"
          onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })}
        >
          See Live Demos
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-primary/30 text-primary hover:bg-primary/10 font-semibold text-base h-14 px-10 rounded-xl"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Get In Touch
        </Button>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ArrowDown className="h-5 w-5 text-muted-foreground" />
    </div>
  </section>
);

export default HeroSection;
