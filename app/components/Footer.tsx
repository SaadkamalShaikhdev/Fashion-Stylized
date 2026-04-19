"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
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
        <Image src="/logo1.png" alt="Fashion Stylized" width={100} height={40}/>
        <p className="text-sm text-(--muted-foreground) leading-relaxed">
          Premium accessories for the modern individual.
        </p>
      </div>

      {/* Shop */}
      <div>
        <h4 className="uppercase tracking-wider mb-4 text-sm">Shop</h4>
        <ul className="space-y-3 text-sm text-(--muted-foreground)">
          {["Watches", "Glasses", "Wallets", "Collections"].map((item) => (
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
            { label: "Craftsmanship", href: "/craftsmanship" },
            { label: "Sustainability", href: "/sustainability" },
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
          <button className="bg-(--primary) text-(--primary-foreground) px-4 py-3 ml-2 text-sm flex items-center hover:bg-(--primary)/90 transition-all hover:scale-105 cursor-pointer">
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