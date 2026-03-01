import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import DirectorQuote from "@/components/DirectorQuote";
import PartnersSection from "@/components/PartnersSection";
import WhyCanadaSection from "@/components/WhyCanadaSection";
import TimelineSection from "@/components/TimelineSection";
import DesoDetailsSection from "@/components/DesoDetailsSection";
import LeadMagnet from "@/components/LeadMagnet";
import EventsSection from "@/components/EventsSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <HeroSection />
      <StatsSection />
      <DirectorQuote />
      <PartnersSection />
      <WhyCanadaSection />
      <TimelineSection />
      <DesoDetailsSection />
      <LeadMagnet />
      <EventsSection />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
