import HeroSection from '../sections/HeroSection';
import PopularTemples from '../sections/PopularTemples';
import FeaturedTemples from '../sections/FeaturedTemples';
import PoojaBenefits from '../sections/PoojaBenefits';
import SpecialEvents from '../sections/SpecialEvents';
import ProcessFlow from '../sections/ProcessFlow';
import StatsSection from '../sections/StatsSection';
import BhajansSection from '../sections/BhajansSection';
import Testimonials from '../sections/Testimonials';
import BookingKiosk from '../sections/BookingKiosk';
import NewsEvents from '../sections/NewsEvents';
import TempleInfoBar from '../sections/TempleInfoBar';
import AboutTemple from '../sections/AboutTemple';
import TempleSevas from '../sections/TempleSevas';
import HorizontalScroller from '../sections/HorizontalScroller';
import TempleGallery from '../sections/TempleGallery';
import TempleGuidelines from '../sections/TempleGuidelines';
import ReachUs from '../sections/ReachUs';
import MajorCelebrations from '../sections/MajorCelebrations';
import FeaturedTracks from '../sections/FeaturedTracks';
import DeityFilter from '../sections/DeityFilter';
import DevotionalLibrary from '../sections/DevotionalLibrary';
import NewsletterCta from '../sections/NewsletterCta';
import ContactInfoSection from '../sections/ContactInfoSection';
import ContactFormSection from '../sections/ContactFormSection';
import MapSection from '../sections/MapSection';
import FeatureGridSection from '../sections/FeatureGridSection';
import JourneyProcessSection from '../sections/JourneyProcessSection';
import InfoImageSection from '../sections/InfoImageSection';
import PartnerFormSection from '../sections/PartnerFormSection';
import AboutIntroSection from '../sections/AboutIntroSection';
import ComplexStatsSection from '../sections/ComplexStatsSection';
import TrustSection from '../sections/TrustSection';
import BenefitBoxesSection from '../sections/BenefitBoxesSection';
import DarkCtaSection from '../sections/DarkCtaSection';
import FaqHeroSection from '../sections/FaqHeroSection';
import FaqContentSection from '../sections/FaqContentSection';
import PricingCardsSection from '../sections/PricingCardsSection';
import PricingGuidelinesSection from '../sections/PricingGuidelinesSection';
import LegalHeroSection from '../sections/LegalHeroSection';
import LegalContentSection from '../sections/LegalContentSection';
import TodayAtTemple from '../sections/TodayAtTemple';
import TempleListingHero from '../sections/TempleListingHero';
import TempleListingGrid from '../sections/TempleListingGrid';
import BhajanListingHero from '../sections/BhajanListingHero';
import EmptyStateSection from '../sections/EmptyStateSection';




// Registry maps section "type" from JSON to React component
const SECTION_REGISTRY = {
  HeroSection,
  PopularTemples,
  FeaturedTemples,
  PoojaBenefits,
  SpecialEvents,
  ProcessFlow,
  StatsSection,
  BhajansSection,
  TodayAtTemple,
  Testimonials,
  BookingKiosk,
  NewsEvents,
  TempleInfoBar,
  AboutTemple,
  TempleSevas,
  HorizontalScroller,
  TempleGallery,
  TempleGuidelines,
  ReachUs,
  MajorCelebrations,
  FeaturedTracks,
  DeityFilter,
  DevotionalLibrary,
  NewsletterCta,
  ContactInfoSection,
  ContactFormSection,
  MapSection,
  FeatureGridSection,
  JourneyProcessSection,
  InfoImageSection,
  PartnerFormSection,
  AboutIntroSection,
  ComplexStatsSection,
  TrustSection,
  BenefitBoxesSection,
  DarkCtaSection,
  FaqHeroSection,
  FaqContentSection,
  PricingCardsSection,
  PricingGuidelinesSection,
  LegalHeroSection,
  LegalContentSection,
  TempleListingHero,
  TempleListingGrid,
  BhajanListingHero,
  EmptyStateSection,
};




export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section) => {
        // Skip disabled sections
        if (section.enabled === false) return null;

        const Component = SECTION_REGISTRY[section.type];
        if (!Component) {
          console.warn(`[SectionRenderer] Unknown section type: "${section.type}"`);
          return null;
        }
        return <Component key={section.id} id={section.id} data={section.props} />;
      })}
    </>
  );
}
