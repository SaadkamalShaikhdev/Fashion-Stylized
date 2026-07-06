import CollectionPages from "./CollectionDetails"

export const metadata = {
  title: "Shop All Collections | Fashion Stylized",
  description:
    "Browse all collections at Fashion Stylized — premium wallets, watches, and glasses in Pakistan. Filter by category to find your perfect accessory.",

  keywords: [
    "collections",
    "shop all",
    "wallets in Pakistan",
    "watches in Pakistan",
    "glasses in Pakistan",
    "fashion accessories Pakistan",
    "men accessories",
    "women accessories",
    "online shopping Pakistan",
    "Fashion Stylized",
  ],

  openGraph: {
    title: "Shop All Collections | Fashion Stylized",
    description:
      "Browse all collections of premium wallets, watches, and glasses at Fashion Stylized.",
    type: "website",
    locale: "en_PK",
  },
};

export default function Page() {
  return <CollectionPages />
}