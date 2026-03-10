import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowDown, Bot, Zap, BarChart3, MessageSquare, ShoppingCart, Workflow, Brain, Send, TrendingUp, Users, Calendar, FileText, Filter, Video } from 'lucide-react';

const WHATSAPP_NUMBER = '97253327125';
const WHATSAPP_MESSAGE_HE = 'שלום רפאל, אני מעוניין לשמוע על שירותי האוטומציה שלך';
const WHATSAPP_MESSAGE_EN = 'Hi Refael, I\'m interested in your AI automation services';

const HeroSection = () => {
  const { t, isHebrew } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isHebrew ? WHATSAPP_MESSAGE_HE : WHATSAPP_MESSAGE_EN
  )}`;

  const stats = t('hero.stats') as unknown as Array<{ value: string; label: string }>;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[linear-gradient(160deg,hsl(215_30%_8%)_0%,hsl(211_52%_16%)_30%,hsl(200_45%_18%)_60%,hsl(215_35%_10%)_100%)]">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(166_84%_32%/0.12),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-5%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(211_60%_45%/0.10),transparent_65%)] blur-3xl" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(200_70%_40%/0.06),transparent_60%)] blur-2xl" />
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Diagonal line accent */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <line x1="60%" y1="0" x2="40%" y2="100%" stroke="white" strokeWidth="1" />
        <line x1="65%" y1="0" x2="45%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="70%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isHebrew ? 'direction-rtl' : ''}`}>
          
          {/* Left side - Text content */}
          <div className={`${isHebrew ? 'lg:order-2 text-right' : 'lg:order-1'}`}>
            {/* Badge */}
            <div className={`flex ${isHebrew ? 'justify-end' : 'justify-start'} mb-8 animate-fade-up`} style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-accent tracking-widest uppercase">
                  {t('hero.badge')}
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-[1.08] tracking-tight">
                {t('hero.headline')}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gradient leading-[1.08] tracking-tight mt-2">
                {t('hero.subheadline')}
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-primary-foreground/60 mb-10 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 ${isHebrew ? 'sm:flex-row-reverse' : ''} mb-12 animate-fade-up`} style={{ animationDelay: '0.35s' }}>
              <Button
                size="lg"
                className="gradient-accent text-accent-foreground font-semibold text-base h-14 px-10 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t('hero.cta1')}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5 font-semibold text-base h-14 px-10 rounded-xl"
                onClick={() => document.querySelector('#demos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.cta2')}
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats */}
            {Array.isArray(stats) && (
              <div className={`flex gap-8 sm:gap-12 animate-fade-up ${isHebrew ? 'flex-row-reverse' : ''}`} style={{ animationDelay: '0.45s' }}>
                {stats.map((stat, i) => (
                  <div key={i} className={isHebrew ? 'text-right' : ''}>
                    <div className="text-3xl sm:text-4xl font-extrabold text-accent">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-primary-foreground/45 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Product strip */}
            <div className="mt-10 animate-fade-up" style={{ animationDelay: '0.55s' }}>
              <div className={`flex flex-wrap gap-3 ${isHebrew ? 'flex-row-reverse' : ''}`}>
                {[
                  { icon: MessageCircle, label: isHebrew ? 'בוט WhatsApp AI' : 'WhatsApp AI Bot', color: 'hsl(142 70% 35%)' },
                  { icon: Video, label: isHebrew ? 'אווטאר מדבר AI' : 'AI Talking Avatar', color: 'hsl(270 60% 55%)' },
                  { icon: Filter, label: isHebrew ? 'סינון לידים AI' : 'AI Lead Filter', color: 'hsl(211 60% 50%)' },
                  { icon: Calendar, label: isHebrew ? 'סוכן תיאומים AI' : 'AI Booking Agent', color: 'hsl(330 60% 50%)' },
                  { icon: FileText, label: isHebrew ? 'הצעות מחיר AI' : 'AI Quote Generator', color: 'hsl(45 80% 50%)' },
                ].map((product, i) => (
                  <button
                    key={i}
                    onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary-foreground/[0.06] border border-primary-foreground/[0.08] hover:border-primary-foreground/20 hover:bg-primary-foreground/[0.1] transition-all duration-300 cursor-pointer"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${product.color.replace(')', ' / 0.15)')}` }}
                    >
                      <product.icon className="w-3.5 h-3.5" style={{ color: product.color }} />
                    </div>
                    <span className="text-xs font-semibold text-primary-foreground/70 group-hover:text-primary-foreground/90 transition-colors whitespace-nowrap">
                      {product.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Visual composition */}
          <div className={`${isHebrew ? 'lg:order-1' : 'lg:order-2'} relative hidden lg:block`}>
            <div className="relative w-full h-[560px]">
              
              {/* Central glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-accent/[0.06] blur-[80px]" />

              {/* Main dashboard card */}
              <div className="absolute top-[8%] left-[8%] right-[5%] bg-primary-foreground/[0.06] backdrop-blur-xl border border-primary-foreground/[0.08] rounded-2xl p-5 shadow-2xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(45_90%_55%/0.6)]" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="flex-1" />
                  <span className="text-[10px] text-primary-foreground/30 font-mono">automation-dashboard.ai</span>
                </div>
                
                {/* Mini chart bars */}
                <div className="flex items-end gap-1.5 h-16 mb-4">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 rounded-sm bg-accent/30 transition-all"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-primary-foreground/[0.04] rounded-lg p-3 border border-primary-foreground/[0.05]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Users className="w-3 h-3 text-accent/70" />
                      <span className="text-[10px] text-primary-foreground/40">Leads</span>
                    </div>
                    <span className="text-lg font-bold text-primary-foreground/80">2,847</span>
                  </div>
                  <div className="bg-primary-foreground/[0.04] rounded-lg p-3 border border-primary-foreground/[0.05]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3 h-3 text-accent/70" />
                      <span className="text-[10px] text-primary-foreground/40">Conv.</span>
                    </div>
                    <span className="text-lg font-bold text-primary-foreground/80">34%</span>
                  </div>
                  <div className="bg-primary-foreground/[0.04] rounded-lg p-3 border border-primary-foreground/[0.05]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3 h-3 text-accent/70" />
                      <span className="text-[10px] text-primary-foreground/40">Active</span>
                    </div>
                    <span className="text-lg font-bold text-primary-foreground/80">12</span>
                  </div>
                </div>
              </div>

              {/* Chat bubble card */}
              <div className="absolute bottom-[18%] left-[2%] w-[220px] bg-primary-foreground/[0.07] backdrop-blur-xl border border-primary-foreground/[0.08] rounded-2xl p-4 shadow-xl animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-primary-foreground/70">AI Assistant</div>
                    <div className="text-[9px] text-accent/60 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/80" /> Online
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-primary-foreground/[0.06] rounded-lg rounded-tl-sm px-3 py-2">
                    <p className="text-[10px] text-primary-foreground/55 leading-relaxed">How can I help you today? I can answer questions about our services.</p>
                  </div>
                  <div className="bg-accent/15 rounded-lg rounded-tr-sm px-3 py-2 ml-4">
                    <p className="text-[10px] text-primary-foreground/60 leading-relaxed">I need a quote for my store</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-2 bg-primary-foreground/[0.04] rounded-lg px-3 py-1.5 border border-primary-foreground/[0.05]">
                  <span className="text-[9px] text-primary-foreground/25 flex-1">Type a message...</span>
                  <Send className="w-3 h-3 text-accent/40" />
                </div>
              </div>

              {/* Workflow node card */}
              <div className="absolute bottom-[12%] right-[3%] w-[200px] bg-primary-foreground/[0.07] backdrop-blur-xl border border-primary-foreground/[0.08] rounded-2xl p-4 shadow-xl animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>
                <div className="text-[10px] font-semibold text-primary-foreground/50 uppercase tracking-wider mb-3">Workflow</div>
                <div className="space-y-2">
                  {[
                    { icon: MessageSquare, label: 'New Message', color: 'text-blue-400/70' },
                    { icon: Brain, label: 'AI Processing', color: 'text-accent/70' },
                    { icon: Calendar, label: 'Book Meeting', color: 'text-purple-400/70' },
                    { icon: FileText, label: 'Send Quote', color: 'text-amber-400/70' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-primary-foreground/[0.06] border border-primary-foreground/[0.06] flex items-center justify-center">
                        <step.icon className={`w-3 h-3 ${step.color}`} />
                      </div>
                      <span className="text-[10px] text-primary-foreground/50 font-medium">{step.label}</span>
                      {i < 3 && <Workflow className="w-2.5 h-2.5 text-primary-foreground/15 ml-auto" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating mini icons */}
              {[
                { Icon: ShoppingCart, top: '5%', right: '0%', delay: '0s', size: 'w-10 h-10' },
                { Icon: BarChart3, top: '55%', left: '0%', delay: '1.5s', size: 'w-9 h-9' },
                { Icon: Zap, bottom: '5%', left: '35%', delay: '3s', size: 'w-8 h-8' },
              ].map(({ Icon, delay, size, ...pos }, i) => (
                <div
                  key={i}
                  className={`absolute ${size} rounded-xl bg-primary-foreground/[0.05] backdrop-blur border border-primary-foreground/[0.06] flex items-center justify-center animate-[float_6s_ease-in-out_infinite]`}
                  style={{ ...pos, animationDelay: delay }}
                >
                  <Icon className="w-4 h-4 text-primary-foreground/30" />
                </div>
              ))}

              {/* Decorative connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="62%" x2="25%" y2="72%" stroke="hsl(166 84% 32% / 0.1)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="50%" y1="62%" x2="75%" y2="72%" stroke="hsl(166 84% 32% / 0.1)" strokeWidth="1" strokeDasharray="4 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
