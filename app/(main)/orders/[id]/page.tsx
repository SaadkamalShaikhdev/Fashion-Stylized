import OrderDetailContent from "./OrderDetailContent"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Order Details | Fashion Stylized",
  description:
    "View your order details, status, and shipping information at Fashion Stylized.",
  openGraph: {
    title: "Order Details | Fashion Stylized",
    description:
      "View your order details at Fashion Stylized.",
    type: "website",
  },
}

export default function Page() {
  return <OrderDetailContent />
}