import { ArrowDown, Calendar, Search, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SoundBars from './SoundBars';
import heroAvatar from '@/assets/hero-avatar.png';

const OrbitIcon = ({ icon: Icon, delay, color }: { icon: any; delay: number; color: string }) => (
  <div
    className="absolute top-1/2 left-1/2"
    style={{
      animation: `orbit ${8 + delay}s linear infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shadow-lg">
      <Icon className="h-6 w-6" style={{ color }} />
    </div>
  </div>
);

const ChatBubble = ({ text, className, delay = '0s' }: { text: string; className: string; delay?: string }) => (
  <div
    className={`absolute glass rounded-2xl px-6 py-4 text-base font-medium text-foreground shadow-xl max-w-[220px] ${className}`}
    style={{ animation: `bubble-bounce 3s ease-in-out ${delay} infinite` }}
  >
    {text}
  </div>
);

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute w-1.5 h-1.5 rounded-full animate-particle"
    style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.7), transparent)', ...style }}
  />
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
    {/* Noise texture overlay */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '128px 128px',
    }} />

    {/* Larger animated gradient blobs */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-[900px] h-[900px] rounded-full opacity-35 animate-blob"
        style={{ background: 'radial-gradient(circle, hsl(217 91% 60% / 0.5), transparent 70%)', top: '0%', left: '50%' }} />
      <div className="absolute w-[800px] h-[800px] rounded-full opacity-30 animate-blob"
        style={{ background: 'radial-gradient(circle, hsl(263 70% 58% / 0.45), transparent 70%)', top: '30%', left: '20%', animationDelay: '2s' }} />
      <div className="absolute w-[700px] h-[700px] rounded-full opacity-25 animate-blob"
        style={{ background: 'radial-gradient(circle, hsl(24 95% 53% / 0.4), transparent 70%)', top: '50%', left: '60%', animationDelay: '4s' }} />
    </div>

    {/* Floating particles */}
    {Array.from({ length: 12 }, (_, i) => (
      <Particle key={i} style={{ left: `${10 + (i * 7) % 80}%`, bottom: `${-5}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${5 + (i % 4)}s` }} />
    ))}

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: Text */}
      <div className="text-right" dir="rtl">
        <span className="inline-block gradient-coral text-white text-sm font-semibold px-5 py-2 rounded-full mb-6">
          FOR SMALL BUSINESSES
        </span>
        <h1 className="font-hebrew text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-4 leading-tight">
          הלקוחות שלך מחכים.
          <br />
          <span className="text-gradient">אף אחד לא עונה.</span>
        </h1>
        <p className="text-xl sm:text-2xl font-bold text-muted-foreground mb-5">
          Your customers are waiting. Nobody's answering.
        </p>
        <p className="font-hebrew text-base text-muted-foreground mb-2 leading-relaxed max-w-xl">
          אני בונה בוטים חכמים עם פנים אמיתיות שעונים ללקוחות, קובעים תורים, ומוכרים — גם ב-3 בלילה. מה שחברות גדולות משלמות עליו עשרות אלפים, אני בונה תוך ימים.
        </p>
        <p className="text-base text-muted-foreground mb-10 leading-relaxed max-w-xl" dir="ltr">
          I build AI bots with real talking faces that answer customers, book appointments, and sell — even at 3am. What big companies pay $10K+ for, I build in days.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            size="lg"
            className="gradient-coral text-white font-bold text-base h-14 px-10 rounded-full hover:opacity-90 transition-all shadow-lg glow-coral"
            onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ראו את הדמואים החיים
            <ArrowDown className="mr-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary font-bold text-base h-14 px-10 rounded-full"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MessageCircle className="ml-2 h-5 w-5" />
            בואו נדבר
          </Button>
        </div>
      </div>

      {/* Right: 3D Avatar Image */}
      <div className="relative flex items-center justify-center h-[500px] lg:h-[650px]">
        {/* Glow rings */}
        <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-primary/20 animate-pulse-ring" />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />

        {/* Sound bars - left */}
        <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2">
          <SoundBars count={5} height={80} color="hsl(217 91% 60% / 0.6)" />
        </div>
        {/* Sound bars - right */}
        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2">
          <SoundBars count={5} height={80} color="hsl(263 70% 58% / 0.6)" />
        </div>

        {/* 3D Avatar Image */}
        <div className="relative z-10">
          <div className="w-[350px] h-[350px] rounded-full overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-br from-primary/10 to-accent/10">
            <img
              src={heroAvatar}
              alt="AI Assistant"
              width={512}
              height={512}
              className="w-full h-full object-cover object-top scale-110"
            />
          </div>
          {/* Glow behind avatar */}
          <div className="absolute inset-0 rounded-full -z-10 blur-3xl opacity-40 bg-gradient-to-br from-primary/50 to-accent/50" />
        </div>

        {/* Orbiting icons */}
        <OrbitIcon icon={Calendar} delay={0} color="hsl(24 95% 53%)" />
        <OrbitIcon icon={Search} delay={2.5} color="hsl(217 91% 60%)" />
        <OrbitIcon icon={Mail} delay={5} color="hsl(263 70% 58%)" />

        {/* Floating chat bubbles */}
        <ChatBubble text="Do you have this in blue?" className="top-4 right-0 lg:right-[-30px]" delay="0s" />
        <ChatBubble text="Appointment booked for 3pm!" className="bottom-12 left-[-10px] lg:left-0" delay="1s" />
        <ChatBubble text="Here are 3 matching products..." className="top-24 left-4 lg:left-[-40px]" delay="2s" />
      </div>
    </div>
  </section>
);

export default HeroSection;
