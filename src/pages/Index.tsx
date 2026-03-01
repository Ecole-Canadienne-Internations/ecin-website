import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import DirectorQuote from "@/components/DirectorQuote";
import LeadMagnet from "@/components/LeadMagnet";
import EventsSection from "@/components/EventsSection";
import BlogSection from "@/components/BlogSection";
import TimelineSection from "@/components/TimelineSection";
import DesoDetailsSection from "@/components/DesoDetailsSection";
import PartnersSection from "@/components/PartnersSection";
import WhyCanadaSection from "@/components/WhyCanadaSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <HeroSection />
      <StatsSection />
      <DirectorQuote />
      <LeadMagnet />
      <EventsSection />
      <BlogSection />
      <TimelineSection />
      <DesoDetailsSection />
      <PartnersSection />
      <WhyCanadaSection />
      <Footer />
      <WhatsAppButton />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
