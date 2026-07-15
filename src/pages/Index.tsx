import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/refael/Navbar';
import Hero from '@/components/refael/Hero';
import WhatItIs from '@/components/refael/WhatItIs';
import AvatarsSection from '@/components/refael/AvatarsSection';
import TheMath from '@/components/refael/TheMath';
import UseCases from '@/components/refael/UseCases';
import Pricing from '@/components/refael/Pricing';
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
        <WhatItIs />
        <AvatarsSection />
        <TheMath />
        <UseCases />
        <Pricing />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
