import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BestSellers } from "@/components/home/BestSellers";
import { InstagramFeed } from "@/components/InstagramFeed";
import { ContactCta } from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestSellers />
      <InstagramFeed />
      <ContactCta />
    </>
  );
}
