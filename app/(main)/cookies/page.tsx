// app/(main)/cookies/page.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Fashion Stylized",
  description: "Cookie policy for Fashion Stylized"
}

export default function CookiesPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16">

      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">Legal</p>
        <h1 className="text-5xl lg:text-6xl font-cormorant-garamond mb-4">Cookie Policy</h1>
        <div className="h-px w-24 bg-(--primary)" />
        <p className="text-(--muted-foreground) text-sm mt-4">Last updated: January 2026</p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed">

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">What Are Cookies</h2>
          <p className="text-(--muted-foreground)">
            Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">How We Use Cookies</h2>
          <p className="text-(--muted-foreground) mb-4">We use the following types of cookies:</p>

          <div className="space-y-4">
            {[
              {
                name: "Essential Cookies",
                desc: "Required for the website to function properly. These include session cookies for authentication (NextAuth) and cannot be disabled.",
                examples: "Authentication session, CSRF protection"
              },
              {
                name: "Functional Cookies",
                desc: "Remember your preferences and choices to provide a personalized experience.",
                examples: "Cart items, wishlist, buy now item, promo codes"
              },
              {
                name: "Analytics Cookies",
                desc: "Help us understand how visitors interact with our website so we can improve it.",
                examples: "Page views, session duration, traffic sources"
              },
            ].map(cookie => (
              <div key={cookie.name} className="p-4 border border-(--border) bg-(--card)">
                <p className="text-sm font-medium mb-1">{cookie.name}</p>
                <p className="text-(--muted-foreground) text-xs mb-2">{cookie.desc}</p>
                <p className="text-xs text-(--muted-foreground)">
                  <span className="uppercase tracking-wider">Examples:</span> {cookie.examples}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">Local Storage</h2>
          <p className="text-(--muted-foreground)">
            In addition to cookies, we use your browser's local storage to save your cart items, wishlist, and preferences. This data stays on your device and is not sent to our servers unless you place an order.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">Third Party Cookies</h2>
          <p className="text-(--muted-foreground)">
            We use Google OAuth for sign-in which may set its own cookies. These are governed by Google's Privacy Policy. We also use ImageKit for image delivery which may use its own tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">Managing Cookies</h2>
          <p className="text-(--muted-foreground) mb-3">
            You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, and be notified when new cookies are set.
          </p>
          <p className="text-(--muted-foreground)">
            Please note that disabling essential cookies will affect the functionality of our website — you may not be able to sign in or complete purchases.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-cormorant-garamond mb-3 text-foreground">Contact</h2>
          <p className="text-(--muted-foreground)">
            Questions about our cookie policy? Contact us at{" "}
            <a href="mailto:allauddinkamaluddin@gmail.com" className="text-(--primary) hover:underline">
              allauddinkamaluddin@gmail.com
            </a>
          </p>
        </section>

      </div>
    </div>
  )
}