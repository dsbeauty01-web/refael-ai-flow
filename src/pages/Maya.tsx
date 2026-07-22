import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/refael/Footer';
import MayaNav from '@/components/maya/MayaNav';
import FlagshipHero from '@/components/maya/FlagshipHero';
import WowList from '@/components/maya/WowList';
import HowBuilt from '@/components/maya/HowBuilt';
import TheStar from '@/components/maya/TheStar';
import TechStory from '@/components/maya/TechStory';
import FlagshipCTA from '@/components/maya/FlagshipCTA';

/**
 * /maya — the flagship product page. A deeper, single-product pitch for the full
 * ₪29,900 build, kept separate from the home funnel so both stand on their own.
 */
const Maya = () => {
  const { language, isHebrew } = useLanguage();
  return (
    <div
      key={language}
      className={`min-h-screen bg-paper text-ink ${isHebrew ? 'font-hebrew' : 'font-english'}`}
      dir={isHebrew ? 'rtl' : 'ltr'}
    >
      <MayaNav />
      <main>
        <FlagshipHero />
        <WowList />
        <HowBuilt />
        <TheStar />
        <TechStory />
        <FlagshipCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Maya;
