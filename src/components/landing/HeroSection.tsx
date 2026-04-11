import { ArrowDown, Calendar, Search, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SoundWave = () => (
  <div className="flex items-center gap-[3px] h-8">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="w-[3px] rounded-full bg-primary"
        style={{
          animation: `wave 1.2s ease-in-out ${i * 0.15}s infinite`,
          height: '12px',
        }}
      />
    ))}
  </div>
);

const OrbitIcon = ({ icon: Icon, delay, color }: { icon: any; delay: number; color: string }) => (
  <div
    className="absolute top-1/2 left-1/2"
    style={{
      animation: `orbit ${8 + delay}s linear infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center shadow-lg`}>
      <Icon className="h-5 w-5" style={{ color }} />
    </div>
  </div>
);

const ChatBubble = ({ text, className }: { text: string; className: string }) => (
  <div className={`absolute glass rounded-2xl px-4 py-2.5 text-xs font-medium text-foreground shadow-lg max-w-[180px] animate-float ${className}`}>
    {text}
  </div>
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
    {/* Animated gradient blobs */}
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 animate-blob"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent 70%)',
          top: '10%',
          left: '60%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 animate-blob"
        style={{
          background: 'radial-gradient(circle, hsl(263 70% 58% / 0.35), transparent 70%)',
          top: '40%',
          left: '30%',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 animate-blob"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 53% / 0.3), transparent 70%)',
          top: '60%',
          left: '70%',
          animationDelay: '4s',
        }}
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: Text */}
      <div className="text-right" dir="rtl">
        <span className="inline-block gradient-coral text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          FOR SMALL BUSINESSES
        </span>
        <h1 className="font-hebrew text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-3 leading-tight">
          הלקוחות שלך מחכים.
          <br />
          <span className="text-gradient">אף אחד לא עונה.</span>
        </h1>
        <p className="text-lg sm:text-xl font-medium text-muted-foreground mb-4">
          Your customers are waiting. Nobody's answering.
        </p>
        <p className="font-hebrew text-sm text-muted-foreground mb-2 leading-relaxed max-w-xl">
          אני בונה בוטים חכמים עם פנים אמיתיות שעונים ללקוחות, קובעים תורים, ומוכרים — גם ב-3 בלילה. מה שחברות גדולות משלמות עליו עשרות אלפים, אני בונה תוך ימים.
        </p>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-xl" dir="ltr">
          I build AI bots with real talking faces that answer customers, book appointments, and sell — even at 3am. What big companies pay $10K+ for, I build in days.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            size="lg"
            className="gradient-coral text-white font-semibold text-sm h-12 px-8 rounded-full hover:opacity-90 transition-all shadow-lg glow-coral"
            onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ראו את הדמואים החיים
            <ArrowDown className="mr-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary font-semibold text-sm h-12 px-8 rounded-full"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MessageCircle className="ml-2 h-4 w-4" />
            בואו נדבר
          </Button>
        </div>
      </div>

      {/* Right: Avatar illustration */}
      <div className="relative flex items-center justify-center h-[500px] lg:h-[550px]">
        {/* Outer glow ring */}
        <div className="absolute w-72 h-72 rounded-full border-2 border-primary/20 animate-pulse-ring" />
        <div className="absolute w-80 h-80 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />

        {/* Avatar circle */}
        <div className="relative w-56 h-56 rounded-full gradient-blue flex items-center justify-center shadow-2xl glow-blue">
          <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <SoundWave />
          </div>
        </div>

        {/* Orbiting icons */}
        <OrbitIcon icon={Calendar} delay={0} color="hsl(24 95% 53%)" />
        <OrbitIcon icon={Search} delay={2.5} color="hsl(217 91% 60%)" />
        <OrbitIcon icon={Mail} delay={5} color="hsl(263 70% 58%)" />

        {/* Floating chat bubbles */}
        <ChatBubble text="Do you have this in blue?" className="top-8 right-4 lg:right-0" />
        <ChatBubble
          text="Appointment booked for 3pm!"
          className="bottom-20 left-0 lg:left-4"
          style-delay="1s"
        />
        <ChatBubble
          text="Here are 3 matching products..."
          className="top-24 left-8 lg:left-0"
          style-delay="2s"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
