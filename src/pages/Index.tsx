import Hero from '@/components/refael/Hero';
import AvatarsSection from '@/components/refael/AvatarsSection';
import WhatItIs from '@/components/refael/WhatItIs';
import HowItWorks from '@/components/refael/HowItWorks';
import UseCases from '@/components/refael/UseCases';
import Comparison from '@/components/refael/Comparison';
import TechTrust from '@/components/refael/TechTrust';
import Pricing from '@/components/refael/Pricing';
import RoiCalculator from '@/components/refael/RoiCalculator';
import Services from '@/components/refael/Services';
import Faq from '@/components/refael/Faq';
import About from '@/components/refael/About';
import LeadForm from '@/components/refael/LeadForm';
import SiteLayout from '@/components/site/SiteLayout';
import ProductsGrid from '@/components/site/ProductsGrid';
import { useSeo } from '@/components/site/Seo';
import { SHOW_PRICES } from '@/config/site';

const SECTIONS = [
  { href: '#products', he: 'המוצרים', en: 'Products', th: 'ผลิตภัณฑ์' },
  { href: '#how', he: 'איך זה עובד', en: 'How it works', th: 'ทำงานอย่างไร' },
  { href: '#uses', he: 'איפה זה עובד', en: 'Where it works', th: 'ใช้งานที่ไหน' },
  { href: '#faq', he: 'שאלות', en: 'FAQ', th: 'คำถาม' },
];

const Index = () => {
  useSeo({ path: '/' });
  return (
    <SiteLayout sections={SECTIONS}>
      <Hero />
      <ProductsGrid />
      <AvatarsSection />
      <WhatItIs />
      <HowItWorks />
      <UseCases />
      <Comparison />
      <TechTrust />
      <Pricing />
      {SHOW_PRICES && <RoiCalculator />}
      <Services />
      <Faq />
      <About />
      <LeadForm />
    </SiteLayout>
  );
};

export default Index;
