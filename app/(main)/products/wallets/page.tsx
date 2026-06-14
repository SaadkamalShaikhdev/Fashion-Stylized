import WalletDetails from "./WalletDetails"

export const metadata = {
  title: "Premium Wallets for Men & Women | Fashion Stylized",
  description:
    "Explore premium wallets for men and women at Fashion Stylized. Discover stylish, durable, and modern wallets crafted with quality materials for everyday use.",

  keywords: [
    "wallets",
    "men wallets",
    "women wallets",
    "leather wallets",
    "premium wallets",
    "fashion wallets",
    "designer wallets",
    "card holder wallets",
    "stylish wallets",
    "Fashion Stylized wallets",
  ],

  openGraph: {
    title: "Premium Wallets for Men & Women | Fashion Stylized",
    description:
      "Shop premium wallets designed for style, functionality, and durability. Find the perfect wallet for every occasion.",
    type: "website",
  },
};

export default function Page() {
  return <WalletDetails />
}