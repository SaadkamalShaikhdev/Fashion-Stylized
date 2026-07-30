"use client"
import Link from 'next/link'
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/fashionstylizedstore?igsh=bWR5dXdwdmlhMjk4',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/194wk4H5JX/?mibextid=wwXIfr',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H8v3h3v7h3v-7h2.5l.5-3H14V8z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@fashionstylized.store?_r=1&_t=ZS-97cfBHxovnJ',
    icon: (
      <svg fill="#ffffff" viewBox="0 0 32 32" className="h-4 w-4"  version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>tiktok</title> <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path> </g></svg>
    ),
  },
]

const Footer = () => {
  return (
    <motion.footer  initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }} className="border-t border-foreground/10 py-16 px-6 lg:px-12">
  <div className="container mx-auto">
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      
      {/* Brand */}
      <div className='flex flex-col gap-4'>
        <Link href="/" className="font-cormorant-garamond text-xl flex flex-col font-bold tracking-wider uppercase ">
              Fashion<span>Sylized</span>
              </Link>
        <p className="text-sm text-(--muted-foreground) leading-relaxed">
          Premium accessories for the modern individual.
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) text-(--muted-foreground) transition-all hover:border-(--primary) hover:text-(--primary)"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Shop */}
      <div>
        <h4 className="uppercase tracking-wider mb-4 text-sm">Shop</h4>
        <ul className="space-y-3 text-sm text-(--muted-foreground)">
          {["Glasses", "Wallets", "Collections"].map((item) => (
            <li key={item}>
              <Link href={`/products?category=${item.toLowerCase()}`} className="hover:text-(--primary) transition-colors">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="uppercase tracking-wider mb-4 text-sm">Company</h4>
        <ul className="space-y-3 text-sm text-(--muted-foreground)">
          {[
            { label: "About Us", href: "/about" },
            { label: "Shipping Policy", href: "/shipping-policy" },
            { label: "Return Policy", href: "/return-policy" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="hover:text-(--primary) transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="uppercase tracking-wider mb-4 text-sm">Newsletter</h4>
        <p className="text-sm text-(--muted-foreground) mb-4">
          Subscribe for exclusive offers and updates.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-(--secondary) px-4 py-3 text-sm outline-none border border-border focus:border-(--primary) transition-colors"
          />
          <button aria-label="Subscribe to newsletter" className="bg-(--primary) text-(--primary-foreground) px-4 py-3 ml-2 text-sm flex items-center hover:bg-(--primary)/90 transition-all hover:scale-105 cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-(--muted-foreground)">
      <p>© 2026 Fashion Stylized. All rights reserved.</p>
      <div className="flex gap-6">
        {[
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Cookies", href: "/cookies" },
          { label: "Shipping", href: "/shipping-policy" },
          { label: "Returns", href: "/return-policy" },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="hover:text-(--primary) transition-colors">
            {item.label}
          </Link>
        ))}
      </div>
    </div>

  </div>
</motion.footer>
  )
}

export default Footer