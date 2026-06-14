import WatchDetails from "./WatchDetails"

export const metadata = {
  title: "Premium Luxury Watches for Men & Women | Fashion Stylized",
  description:
    "Discover premium luxury watches for men and women at Fashion Stylized. Explore stylish, elegant, and modern timepieces designed for every occasion with exceptional quality and craftsmanship.",

  keywords: [
    "luxury watches",
    "premium watches",
    "men watches",
    "women watches",
    "fashion watches",
    "stylish watches",
    "designer watches",
    "wrist watches",
    "modern watches",
    "Fashion Stylized watches",
  ],

  openGraph: {
    title: "Premium Luxury Watches for Men & Women | Fashion Stylized",
    description:
      "Shop premium luxury watches for men and women. Find elegant, stylish, and modern timepieces crafted for every lifestyle.",
    type: "website",
    locale: "en_US",
    siteName: "Fashion Stylized",
  },

  twitter: {
    card: "summary_large_image",
    title: "Premium Luxury Watches for Men & Women | Fashion Stylized",
    description:
      "Explore stylish luxury watches designed for every occasion.",
  },

  alternates: {
    canonical: "https://fashionstylized.store/watch",
  },
};

export default function Page() {
  return <WatchDetails />
}