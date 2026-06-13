import CartPage from "./CartPage"

export const metadata = {
  title: "Cart | Fashion Stylized",
  description: "View and manage items in your shopping cart at Fashion Stylized.",
  openGraph: {
    title: "Cart | Fashion Stylized",
    description: "View and manage items in your shopping cart at Fashion Stylized.",
    type: "website",
  },
}

export default function Page() {
  return <CartPage />
}