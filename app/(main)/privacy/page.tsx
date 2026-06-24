// app/(main)/privacy/page.tsx
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Fashion Stylized",
  description: "Privacy policy for Fashion Stylized — how we collect, use and protect your data."
}

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16">

      {/* heading */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">Legal</p>
        <h1 className="text-5xl lg:text-6xl font-cormorant-garamond mb-4">Privacy Policy</h1>
        <div className="h-px w-24 bg-(--primary)" />
        <p className="text-(--muted-foreground) text-sm mt-4">Last updated: January 2026</p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed">

        {/* intro */}
        <section>
          <p className="text-(--muted-foreground)">
            Fashion Stylized ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store and protect your personal information when you use our website at fashionstylized.store. By using our website you agree to this policy.
          </p>
        </section>

        {/* 1. data we collect */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            1. Information We Collect
          </h2>
          <p className="text-(--muted-foreground) mb-4">
            We collect the following types of information:
          </p>

          <div className="space-y-4">

            <div className="p-4 border border-(--border) bg-(--card)">
              <p className="text-sm font-medium mb-2">Account Information</p>
              <p className="text-xs text-(--muted-foreground)">
                When you create an account we collect your full name and email address. If you sign in with Google we also receive your Google profile name, email and profile picture from Google OAuth.
              </p>
            </div>

            <div className="p-4 border border-(--border) bg-(--card)">
              <p className="text-sm font-medium mb-2">Order Information</p>
              <p className="text-xs text-(--muted-foreground)">
                When you place an order we collect your full name, email address, mobile phone number, shipping address (street, city, postal code) and payment method preference. We do not collect or store any credit card or bank information as we currently only support Cash on Delivery.
              </p>
            </div>

            <div className="p-4 border border-(--border) bg-(--card)">
              <p className="text-sm font-medium mb-2">Usage Data</p>
              <p className="text-xs text-(--muted-foreground)">
                We use Google Analytics to collect anonymized data about how visitors use our website including pages visited, time spent, device type, browser and approximate location by country. This data cannot be used to identify you personally.
              </p>
            </div>

            <div className="p-4 border border-(--border) bg-(--card)">
              <p className="text-sm font-medium mb-2">Locally Stored Data</p>
              <p className="text-xs text-(--muted-foreground)">
                Your shopping cart, wishlist preferences and buy now selections are stored in your browser's local storage. This data stays on your device and is not sent to our servers unless you complete a purchase.
              </p>
            </div>

          </div>
        </section>

        {/* 2. how we use */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            2. How We Use Your Information
          </h2>
          <div className="space-y-2 text-(--muted-foreground)">
            {[
              "To create and manage your account",
              "To process and fulfill your orders",
              "To send OTP verification emails via Resend for account security",
              "To send order confirmation and status update emails",
              "To respond to your inquiries via email or WhatsApp",
              "To improve our website and product offerings",
              "To detect and prevent fraudulent orders",
              "To comply with legal obligations",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-(--primary) mt-1.5 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. who we share with */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            3. Who We Share Your Information With
          </h2>
          <p className="text-(--muted-foreground) mb-4">
            We do not sell, trade or rent your personal information to third parties. We only share your data with the following trusted service providers who help us operate our website:
          </p>

          <div className="space-y-3">
            {[
              {
                name: "MongoDB Atlas",
                purpose: "Secure cloud database where your account and order data is stored",
                link: "https://www.mongodb.com/legal/privacy-policy"
              },
              {
                name: "Resend",
                purpose: "Email delivery service used to send OTP verification and order emails",
                link: "https://resend.com/legal/privacy-policy"
              },
              {
                name: "ImageKit",
                purpose: "Image hosting and optimization service for product images",
                link: "https://imagekit.io/privacy-policy"
              },
              {
                name: "Google OAuth",
                purpose: "Optional sign in with Google — governed by Google's Privacy Policy",
                link: "https://policies.google.com/privacy"
              },
              {
                name: "Google Analytics",
                purpose: "Anonymized website traffic analytics — no personally identifiable data",
                link: "https://policies.google.com/privacy"
              },
              {
                name: "Courier Services",
                purpose: "Your name, address and phone number are shared with our delivery partners to fulfill your order",
                link: null
              },
            ].map(service => (
              <div key={service.name} className="p-4 border border-(--border) bg-(--card) flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">{service.name}</p>
                  <p className="text-xs text-(--muted-foreground)">{service.purpose}</p>
                </div>
                {service.link && (
                  <a 
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-(--primary) hover:underline whitespace-nowrap">
                    Privacy Policy ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. mobile number */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            4. Mobile Phone Number
          </h2>
          <p className="text-(--muted-foreground)">
            We collect your mobile phone number during checkout solely for order delivery purposes. Our courier partners may contact you on this number to arrange delivery. We do not use your mobile number for marketing purposes or share it with any third party other than our delivery partners.
          </p>
        </section>

        {/* 5. data storage */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            5. Data Storage & Security
          </h2>
          <p className="text-(--muted-foreground) mb-3">
            Your data is stored securely on MongoDB Atlas servers. We implement the following security measures:
          </p>
          <div className="space-y-2 text-(--muted-foreground)">
            {[
              "Passwords are hashed using bcrypt before storage — we never store plain text passwords",
              "All data transmission is encrypted via HTTPS/TLS",
              "Authentication is secured with JWT tokens and NextAuth",
              "OTP codes expire after 10 minutes",
              "Rate limiting is applied to all authentication endpoints to prevent abuse",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-(--primary) mt-1.5 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. data retention */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            6. How Long We Keep Your Data
          </h2>
          <div className="space-y-3">
            {[
              { type: "Account data", period: "Until you delete your account" },
              { type: "Order data", period: "5 years for legal and tax compliance" },
              { type: "OTP codes", period: "10 minutes — automatically cleared after use" },
              { type: "Google Analytics data", period: "26 months — managed by Google" },
            ].map(item => (
              <div key={item.type} className="flex items-center justify-between p-3 border border-(--border) bg-(--card) gap-4 flex-wrap">
                <span className="text-sm">{item.type}</span>
                <span className="text-xs text-(--muted-foreground)">{item.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. your rights */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            7. Your Rights
          </h2>
          <p className="text-(--muted-foreground) mb-4">
            You have the following rights regarding your personal data:
          </p>
          <div className="space-y-2 text-(--muted-foreground)">
            {[
              "Access — you can view your account information in your profile page",
              "Update — you can update your name in your profile page",
              "Delete — you can permanently delete your account from your profile settings",
              "Portability — contact us to request a copy of your data",
              "Opt out — you can opt out of Google Analytics by using a browser extension",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-(--primary) mt-1.5 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. cookies */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            8. Cookies
          </h2>
          <p className="text-(--muted-foreground)">
            We use cookies for authentication and functionality. For full details on how we use cookies please read our{" "}
            <Link href="/cookies" className="text-(--primary) hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        {/* 9. children */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            9. Children's Privacy
          </h2>
          <p className="text-(--muted-foreground)">
            Our website is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information please contact us immediately.
          </p>
        </section>

        {/* 10. changes */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            10. Changes to This Policy
          </h2>
          <p className="text-(--muted-foreground)">
            We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* 11. contact */}
        <section>
          <h2 className="text-xl font-cormorant-garamond mb-4 text-foreground">
            11. Contact Us
          </h2>
          <p className="text-(--muted-foreground) mb-4">
            If you have any questions about this Privacy Policy or how we handle your data please contact us:
          </p>
          <div className="p-4 border border-(--border) bg-(--card) space-y-2 text-sm">
            <p><span className="text-(--muted-foreground)">Business:</span> Fashion Stylized</p>
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
            <p><span className="text-(--muted-foreground)">Location:</span> Orangi Town, Karachi, Pakistan</p>
          </div>
        </section>

      </div>
    </div>
  )
}