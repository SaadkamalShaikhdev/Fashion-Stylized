// app/(main)/terms/page.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Fashion Stylized",
  description: "Terms and conditions for Fashion Stylized"
}

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16">

      {/* heading */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">Legal</p>
        <h1 className="text-5xl lg:text-6xl font-cormorant-garamond mb-4">Terms & Conditions</h1>
        <div className="h-px w-24 bg-(--primary)" />
        <p className="text-(--muted-foreground) text-sm mt-4">Last updated: January 2026</p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed">

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">1. Acceptance of Terms</h2>
          <p className="text-(--muted-foreground)">
            By accessing and using Fashion Stylized ("we", "our", "us"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services. We reserve the right to update these terms at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">2. Products & Pricing</h2>
          <p className="text-(--muted-foreground)">
            All products listed on our website are subject to availability. We reserve the right to discontinue any product at any time. Prices are listed in Pakistani Rupees (PKR) and are subject to change without notice. We make every effort to display product colors and descriptions accurately, however we cannot guarantee that your device's display accurately reflects the actual product.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">3. Orders & Payment</h2>
          <p className="text-(--muted-foreground) mb-3">
            By placing an order, you confirm that all information provided is accurate and complete. We currently accept Cash on Delivery (COD) as the primary payment method. We reserve the right to refuse or cancel any order at our discretion.
          </p>
          <p className="text-(--muted-foreground)">
            Orders are processed within 1-2 business days. You will receive a confirmation once your order has been placed. We are not responsible for delays caused by circumstances beyond our control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">4. Shipping & Delivery</h2>
          <p className="text-(--muted-foreground)">
            We deliver across Pakistan. Delivery times vary by location and are typically 3-7 business days. A shipping fee of Rs. 500 is applied to all orders. We are not liable for delays caused by courier services or circumstances beyond our control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">5. Returns & Refunds</h2>
          <p className="text-(--muted-foreground) mb-3">
            We accept returns within 7 days of delivery provided the item is unused, in its original packaging, and in the same condition as received. To initiate a return, contact us via WhatsApp or email.
          </p>
          <p className="text-(--muted-foreground)">
            Refunds are processed within 5-7 business days after we receive and inspect the returned item. Shipping charges are non-refundable. Items purchased on sale are not eligible for returns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">6. Intellectual Property</h2>
          <p className="text-(--muted-foreground)">
            All content on this website including text, graphics, logos, images, and software is the property of Fashion Stylized and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">7. Limitation of Liability</h2>
          <p className="text-(--muted-foreground)">
            Fashion Stylized shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">8. Contact</h2>
          <p className="text-(--muted-foreground)">
            For any questions regarding these terms, contact us at{" "}
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