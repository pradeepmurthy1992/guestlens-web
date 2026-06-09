import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../features/landing/Hero";
import HowItWorks from "../features/landing/HowItWorks";
import Features from "../features/landing/Features";
import Timeline from "../features/landing/Timeline";
import Pricing from "../features/landing/Pricing";
import Faq from "../features/landing/Faq";
import FinalCTA from "../features/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <HowItWorks />

      <Features />

      <Timeline />

      <Pricing />

      <Faq />

      <FinalCTA />

      <Footer />
    </>
  );
}
