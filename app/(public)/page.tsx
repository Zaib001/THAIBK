import Hero from "@/components/Hero";
import LiveLearnBelongA from "@/components/LiveLearnBelong";
import RelocationStory from "@/components/RelocationStory";
import FeatureParallax from "@/components/FeatureParallax";
import FAQ from "@/components/FAQ";
import ParallelScrollSection from "@/components/ParallelScrollSection";
import PartnerCarousel from "@/components/PartnerCarousel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveLearnBelongA />
      <FeatureParallax />
      <ParallelScrollSection/>
      <PartnerCarousel/>
      <FAQ />
    </>
  );
}