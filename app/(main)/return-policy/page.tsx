// app/(main)/return-policy/page.tsx
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Return Policy | Fashion Stylized",
  description: "Return and refund policy for Fashion Stylized."
}

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16">

      {/* heading */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">Legal</p>
        <h1 className="text-5xl lg:text-6xl font-cormorant-garamond mb-4">Return Policy</h1>
        <div className="h-px w-24 bg-(--primary)" />
        <p className="text-(--muted-foreground) text-sm mt-4">Last updated: January 2026</p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed">

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">1. Eligibility</h2>
          <p className="text-(--muted-foreground) mb-3">
            We accept returns within <strong>7 days</strong> of delivery. To be eligible for a return, the item must meet the following conditions:
          </p>
          <div className="space-y-2 text-(--muted-foreground)">
            {[
              "Item is unused and in its original condition",
              "Item is in its original packaging with all tags attached",
              "Item is not damaged, altered, or worn",
              "Proof of purchase (order confirmation) is available",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-(--primary) mt-1.5 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">2. Non-Returnable Items</h2>
          <p className="text-(--muted-foreground) mb-3">
            The following items are not eligible for returns:
          </p>
          <div className="space-y-2 text-(--muted-foreground)">
            {[
              "Items purchased on sale or during clearance events",
              "Items that have been used, worn, or altered",
              "Items without original packaging or tags",
              "Gift cards",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-(--primary) mt-1.5 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">3. How to Initiate a Return</h2>
          <p className="text-(--muted-foreground) mb-3">
            To start a return, please contact us via one of the following methods:
          </p>
          <div className="p-4 border border-(--border) bg-(--card) space-y-2 text-sm">
            <p>
              <span className="text-(--muted-foreground)">Email: </span>
              <a href="mailto:allauddinkamaluddin@gmail.com" className="text-(--primary) hover:underline">
                allauddinkamaluddin@gmail.com
              </a>
            </p>
            <p>
              <span className="text-(--muted-foreground)">WhatsApp: </span>
              <a href="https://wa.me/923182942654" target="_blank" rel="noopener noreferrer" className="text-(--primary) hover:underline">
                0318 2942654
              </a>
            </p>
          </div>
          <p className="text-(--muted-foreground) mt-4">
            Please provide your order number and reason for the return. Our team will guide you through the return process and provide you with instructions for shipping the item back.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">4. Return Shipping</h2>
          <p className="text-(--muted-foreground)">
            Return shipping costs are the responsibility of the customer unless the return is due to a defective or incorrect item sent by us. We recommend using a trackable shipping service to ensure your return is received safely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">5. Refunds</h2>
          <p className="text-(--muted-foreground) mb-3">
            Once we receive and inspect your returned item, we will process your refund within 5-7 business days. Refunds will be issued via the original payment method:
          </p>
          <div className="space-y-2 text-(--muted-foreground)">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-(--primary) mt-1.5 shrink-0" />
              <p><strong>COD Orders:</strong> Refunds will be processed via bank transfer or JazzCash/EasyPaisa. Please provide your account details when initiating the return.</p>
            </div>
          </div>
          <p className="text-(--muted-foreground) mt-3">
            Please note that the original shipping fee of Rs. 300 is non-refundable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">6. Exchanges</h2>
          <p className="text-(--muted-foreground)">
            We currently do not offer direct exchanges. If you would like a different item, please initiate a return for the original item and place a new order for the desired item.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">7. Damaged or Defective Items</h2>
          <p className="text-(--muted-foreground)">
            If you receive a damaged or defective item, please contact us within 48 hours of delivery with photos of the item and packaging. We will arrange a free return and send a replacement or issue a full refund including shipping charges.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">8. Late or Missing Refunds</h2>
          <p className="text-(--muted-foreground)">
            If you have not received your refund within the stated timeframe, please check with your bank or payment provider first. If the issue persists, contact us at{" "}
            <a href="mailto:allauddinkamaluddin@gmail.com" className="text-(--primary) hover:underline">
              allauddinkamaluddin@gmail.com
            </a>{" "}
            and we will look into it immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">9. Contact</h2>
          <p className="text-(--muted-foreground)">
            For any questions about our return policy, contact us at{" "}
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
