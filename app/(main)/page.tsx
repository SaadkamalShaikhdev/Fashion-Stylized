import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import NewArrival from "../components/NewArrival";
import StorySection from "../components/StorySection";

export const metadata = {
  title: "Fashion Stylized | Premium Wallets, Watches & Glasses in Pakistan",
  description:
    "Shop premium wallets, watches, and glasses in Pakistan at Fashion Stylized. Discover stylish accessories, modern designs, and quality craftsmanship.",
  openGraph: {
    title: "Fashion Stylized | Premium Wallets, Watches & Glasses in Pakistan",
    description:
      "Shop premium wallets, watches, and glasses in Pakistan at Fashion Stylized.",
    type: "website",
    locale: "en_PK",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <NewArrival />
      <StorySection />
    </>
  );
}
