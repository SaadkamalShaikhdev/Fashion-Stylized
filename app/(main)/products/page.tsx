import ProductPages from "./ProductPage"

export const metadata = {
  title: "Premium Fashion Accessories | Fashion Stylized",
  description:
    "Shop premium wallets, watches, and glasses at Fashion Stylized. Discover stylish accessories crafted with quality materials, modern designs, and exceptional attention to detail.",

  keywords: [
    "fashion accessories",
    "wallets",
    "watches",
    "glasses",
    "eyewear",
    "men accessories",
    "women accessories",
    "luxury watches",
    "premium wallets",
    "stylish glasses",
    "designer accessories",
    "Fashion Stylized",
  ],

  openGraph: {
    title: "Premium Fashion Accessories | Fashion Stylized",
    description:
      "Explore premium wallets, watches, and glasses designed for style, quality, and everyday elegance.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Premium Fashion Accessories | Fashion Stylized",
    description:
      "Discover premium wallets, watches, and glasses at Fashion Stylized.",
  },
};

export default function Page() {
  return <ProductPages />
}