import { ReactNode } from "react";
import TopBar from "@/components/TopBar";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <StickyHeader />
      <main className="pt-[calc(2.25rem+5rem)]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PageLayout;
