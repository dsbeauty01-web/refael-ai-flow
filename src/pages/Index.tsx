import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/refael/Navbar';
import Hero from '@/components/refael/Hero';
import AvatarsSection from '@/components/refael/AvatarsSection';
import WhatItIs from '@/components/refael/WhatItIs';
import HowItWorks from '@/components/refael/HowItWorks';
import UseCases from '@/components/refael/UseCases';
import Comparison from '@/components/refael/Comparison';
import TechTrust from '@/components/refael/TechTrust';
import Pricing from '@/components/refael/Pricing';
import RoiCalculator from '@/components/refael/RoiCalculator';
import Faq from '@/components/refael/Faq';
import About from '@/components/refael/About';
import LeadForm from '@/components/refael/LeadForm';
import Footer from '@/components/refael/Footer';

const Index = () => {
  const { language, isHebrew } = useLanguage();
  return (
    <div
      key={language}
      className={`min-h-screen bg-paper text-ink ${isHebrew ? 'font-hebrew' : 'font-english'}`}
      dir={isHebrew ? 'rtl' : 'ltr'}
    >
      <Navbar />
      <main>
        <Hero />
        <AvatarsSection />
        <WhatItIs />
        <HowItWorks />
        <UseCases />
        <Comparison />
        <TechTrust />
        <Pricing />
        <RoiCalculator />
        <Faq />
        <About />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
