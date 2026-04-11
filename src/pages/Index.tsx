import HeroSection from '@/components/portfolio/HeroSection';
import ProductCards from '@/components/portfolio/ProductCards';
import LiveDemos from '@/components/portfolio/LiveDemos';
import TechDiagram from '@/components/portfolio/TechDiagram';
import StatsSection from '@/components/portfolio/StatsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <ProductCards />
    <LiveDemos />
    <TechDiagram />
    <StatsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
