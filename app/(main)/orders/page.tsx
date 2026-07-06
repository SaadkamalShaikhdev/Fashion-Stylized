import OrdersContent from "./OrdersContent"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "My Orders | Fashion Stylized",
  description:
    "View and track all your orders at Fashion Stylized. Check order status, delivery updates, and order history.",
  openGraph: {
    title: "My Orders | Fashion Stylized",
    description:
      "View and track your orders at Fashion Stylized.",
    type: "website",
  },
}

export default function Page() {
  return <OrdersContent />
}