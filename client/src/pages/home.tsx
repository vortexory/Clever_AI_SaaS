import { Suspense, lazy } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";

// Lazy load other sections for better performance
const FeaturesSection = lazy(() => import("@/components/home/features-section"));
const ChatbotDemo = lazy(() => import("@/components/home/chatbot-demo"));
const IntegrationSection = lazy(() => import("@/components/home/integration-section"));
const ComparisonSection = lazy(() => import("@/components/home/comparison-section"));
const PricingSection = lazy(() => import("@/components/home/pricing-section"));
const FAQSection = lazy(() => import("@/components/home/faq-section"));
const ContactSection = lazy(() => import("@/components/home/contact-section"));
const CTASection = lazy(() => import("@/components/home/cta-section"));

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <FeaturesSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <ChatbotDemo />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <IntegrationSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <ComparisonSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <PricingSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <FAQSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <ContactSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
