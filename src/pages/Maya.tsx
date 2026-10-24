import FlagshipHero from '@/components/maya/FlagshipHero';
import WowList from '@/components/maya/WowList';
import HowBuilt from '@/components/maya/HowBuilt';
import TheStar from '@/components/maya/TheStar';
import TechStory from '@/components/maya/TechStory';
import FlagshipCTA from '@/components/maya/FlagshipCTA';
import SiteLayout from '@/components/site/SiteLayout';
import { RelatedProducts } from '@/components/site/blocks';
import { useSeo, serviceLd, breadcrumbLd } from '@/components/site/Seo';
import { useT } from '@/components/refael/i18n';
import { routeMeta, urlFor } from '@/config/site';

const PATH = '/live-avatar';
const SECTIONS = [
  { href: '#what', he: 'מה היא עושה', en: 'What she does', th: 'เธอทำอะไร' },
  { href: '#build', he: 'איך זה נבנה', en: "How it's built", th: 'สร้างอย่างไร' },
  { href: '#star', he: 'הכוכבת', en: 'The Star', th: 'The Star' },
  { href: '#tech', he: 'הטכנולוגיה', en: 'The tech', th: 'เทคโนโลยี' },
];

/**
 * /live-avatar — the flagship: Maya as a full-body live avatar for a lobby,
 * museum or showroom. (Was /maya, which collided with the static maya.html funnel
 * page on direct loads; /maya now redirects here.)
 */
const Maya = () => {
  const { language, tr } = useT();
  const meta = routeMeta(PATH)!;
  useSeo({
    path: PATH,
    jsonLd: [
      serviceLd(meta.title![language], meta.description![language], urlFor(PATH, language), language),
      breadcrumbLd([{ name: 'Refael.ai', path: '/' }, { name: tr({ he: 'אווטארית חיה ללובי', en: 'Live avatar', th: 'อวตารสด' }), path: PATH }], language),
    ],
  });
  return (
    <SiteLayout sections={SECTIONS}>
      <FlagshipHero />
      <WowList />
      <HowBuilt />
      <TheStar />
      <TechStory />
      <FlagshipCTA />
      <RelatedProducts current={PATH} />
    </SiteLayout>
  );
};

export default Maya;
