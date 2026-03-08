import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AIFlowSection from '@/components/AIFlowSection';
import ServicesSection from '@/components/ServicesSection';
import DemoBots from '@/components/DemoBots';
import HowItWorks from '@/components/HowItWorks';
import WhyWorkWithMe from '@/components/WhyWorkWithMe';
import Industries from '@/components/Industries';
import Testimonials from '@/components/Testimonials';
import Portfolio from '@/components/Portfolio';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingWhatsApp />
      <Header />
      <HeroSection />
      <AIFlowSection />
      <ServicesSection />
      <DemoBots />
      <HowItWorks />
      <WhyWorkWithMe />
      <Industries />
      <Testimonials />
      <Portfolio />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
