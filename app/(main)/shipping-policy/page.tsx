// app/(main)/shipping-policy/page.tsx
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shipping Policy | Fashion Stylized",
  description: "Shipping policy for Fashion Stylized — delivery times, fees and coverage across Pakistan."
}

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16">

      {/* heading */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">Legal</p>
        <h1 className="text-5xl lg:text-6xl font-cormorant-garamond mb-4">Shipping Policy</h1>
        <div className="h-px w-24 bg-(--primary)" />
        <p className="text-(--muted-foreground) text-sm mt-4">Last updated: January 2026</p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed">

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">1. Coverage</h2>
          <p className="text-(--muted-foreground)">
            We deliver across Pakistan. At this time we do not offer international shipping.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">2. Shipping Fee</h2>
          <p className="text-(--muted-foreground)">
            A flat shipping fee of Rs. 300 is applied to all orders. Free shipping may be offered during special promotions at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">3. Processing Time</h2>
          <p className="text-(--muted-foreground)">
            Orders are processed within 1-2 business days. You will receive an order confirmation email once your order has been placed. Orders placed on weekends or public holidays will be processed on the next business day.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">4. Delivery Time</h2>
          <p className="text-(--muted-foreground) mb-4">
            Delivery times vary by location:
          </p>
          <div className="space-y-3">
            {[
              { area: "Karachi", time: "2-4 business days" },
              { area: "Major Cities (Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar)", time: "3-5 business days" },
              { area: "Other Cities & Towns", time: "5-7 business days" },
              { area: "Remote / Rural Areas", time: "7-10 business days" },
            ].map(item => (
              <div key={item.area} className="flex items-center justify-between p-3 border border-(--border) bg-(--card) gap-4 flex-wrap">
                <span className="text-sm font-medium">{item.area}</span>
                <span className="text-xs text-(--muted-foreground)">{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">5. Order Tracking</h2>
          <p className="text-(--muted-foreground)">
            Once your order has been dispatched you will receive a confirmation with details about your shipment. If you have an account, you can track your order status from the <Link href="/orders" className="text-(--primary) hover:underline">My Orders</Link> page. For guest orders, please contact us via WhatsApp or email with your order number to get a delivery update.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">6. Cash on Delivery (COD)</h2>
          <p className="text-(--muted-foreground)">
            We currently offer Cash on Delivery as the primary payment method. Please keep the exact amount ready at the time of delivery to ensure a smooth transaction. Our courier may not carry change for large denominations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">7. Failed Deliveries</h2>
          <p className="text-(--muted-foreground)">
            If a delivery attempt fails due to incorrect address, unavailability, or refusal, the courier may attempt redelivery. If redelivery is not possible, the order will be returned to us and a refund will be processed in accordance with our <Link href="/return-policy" className="text-(--primary) hover:underline">Return Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">8. Delays</h2>
          <p className="text-(--muted-foreground)">
            We are not liable for delays caused by courier services, natural disasters, public holidays, or circumstances beyond our control. If your order is significantly delayed please contact us and we will do our best to assist you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">9. Contact</h2>
          <p className="text-(--muted-foreground)">
            For any shipping-related questions, contact us at{" "}
            <a href="mailto:allauddinkamaluddin@gmail.com" className="text-(--primary) hover:underline">
              allauddinkamaluddin@gmail.com
            </a>{" "}
            or via WhatsApp at 0318 2942654.
          </p>
        </section>

      </div>
    </div>
  )
}
