import StickyHeader from "@/components/StickyHeader";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import EquivalencesSection from "@/components/EquivalencesSection";
import DirectorQuote from "@/components/DirectorQuote";
import PartnersSection from "@/components/PartnersSection";
import WhyCanadaSection from "@/components/WhyCanadaSection";
import TimelineSection from "@/components/TimelineSection";
import DesoDetailsSection from "@/components/DesoDetailsSection";
import PolesSection from "@/components/PolesSection";
import PhotoGallery from "@/components/PhotoGallery";
import EventsSection from "@/components/EventsSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <StickyHeader />
      <HeroSection />
      <StatsSection />
      <EquivalencesSection />
      <DirectorQuote />
      <PartnersSection />
      <WhyCanadaSection />
      <TimelineSection />
      <DesoDetailsSection />
      <PolesSection />
      <PhotoGallery />
      <EventsSection />
      <BlogSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
