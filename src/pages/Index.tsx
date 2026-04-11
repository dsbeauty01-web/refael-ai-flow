import Nav from '@/components/landing/Nav';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionsSection from '@/components/landing/SolutionsSection';
import LiveDemos from '@/components/landing/LiveDemos';
import WhyMeSection from '@/components/landing/WhyMeSection';
import TechSection from '@/components/landing/TechSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

const Index = () => (
  <div className="min-h-screen bg-background">
    <Nav />
    <HeroSection />
    <ProblemSection />
    <SolutionsSection />
    <LiveDemos />
    <WhyMeSection />
    <TechSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
