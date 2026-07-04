import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DirectorMessage from "@/components/sections/DirectorMessage";
import KidsHighlight from "@/components/sections/KidsHighlight";
import ServicesPreview from "@/components/sections/ServicesPreview";
import DoctorsPreview from "@/components/sections/DoctorsPreview";
import BookingCTA from "@/components/sections/BookingCTA";
import ReviewsPreview from "@/components/sections/ReviewsPreview";
import LatestNews from "@/components/sections/LatestNews";
import Technologies from "@/components/sections/Technologies";
import PromotionsPreview from "@/components/sections/PromotionsPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <DirectorMessage />
      <KidsHighlight />
      <ServicesPreview />
      <DoctorsPreview />
      <BookingCTA />
      <ReviewsPreview />
      <LatestNews />
      <Technologies />
      <PromotionsPreview />
    </>
  );
}
