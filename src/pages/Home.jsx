import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../sections/Hero";
import HowItWorks from "../sections/HowItWorks";
import Features from "../sections/Features";
import Pricing from "../sections/Pricing";
import Faq from "../sections/Faq";
import FinalCTA from "../sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
