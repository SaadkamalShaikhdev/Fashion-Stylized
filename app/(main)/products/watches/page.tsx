import WatchDetails from "./WatchDetails"

export const metadata = {
  title: "Premium Watches in Pakistan | Fashion Stylized",
  description:
    "Shop premium watches in Pakistan at Fashion Stylized. Discover stylish watches for men and women with modern designs, quality craftsmanship, and timeless elegance.",

  keywords: [
    "watches in Pakistan",
    "men watches Pakistan",
    "women watches Pakistan",
    "luxury watches Pakistan",
    "fashion watches Pakistan",
    "premium watches",
    "stylish watches",
    "wrist watches",
    "online watches Pakistan",
    "Fashion Stylized watches",
  ],

  openGraph: {
    title: "Premium Watches in Pakistan | Fashion Stylized",
    description:
      "Explore premium watches for men and women in Pakistan. Find stylish and elegant timepieces at Fashion Stylized.",
    type: "website",
    locale: "en_PK",
  },
};

export default function Page() {
  return <WatchDetails />
}