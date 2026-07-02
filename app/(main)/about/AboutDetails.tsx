// app/(main)/about/page.tsx
"use client"
import { motion } from "framer-motion"
import { Image } from "@imagekit/next"
import { ChevronRight, Award, Truck, RefreshCw, Shield } from "lucide-react"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Every product is carefully selected and quality checked before reaching you."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "We deliver across Pakistan within 3-7 business days with reliable couriers."
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "Not satisfied? Return within 7 days for a full refund, no questions asked."
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    desc: "Your data is safe with us. We use industry-standard encryption and security."
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full">
            <Image
              urlEndpoint="https://ik.imagekit.io/fashionstylized"
              alt="About Fashion Stylized"
              fill={true}
              sizes="100vw"
              className="w-full h-full object-cover opacity-40"
              src="photo-1748943214874-e93ea54971ec.jpg"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Our Story
          </motion.p>
          <h1 className="text-6xl lg:text-7xl font-cormorant-garamond mb-4 text-white">
            About Us
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px bg-(--primary) mx-auto"
          />
        </motion.div>
      </section>

      {/* ── Story ── */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">Who We Are</p>
            <h2 className="text-5xl font-cormorant-garamond mb-6 leading-tight">
              Crafted for the <span className="text-(--primary)">Exceptional</span>
            </h2>
            <div className="h-px w-24 bg-(--primary) mb-6" />
            <div className="space-y-4 text-(--muted-foreground) text-sm leading-relaxed">
              <p>
                Fashion Stylized was born from a passion for premium accessories and a belief that everyone deserves to wear something truly exceptional. Based in Karachi, Pakistan, we curate the finest watches, glasses, and wallets for the modern individual.
              </p>
              <p>
                We understand that accessories are more than just objects — they are expressions of personality, craftsmanship, and style. That's why every product in our collection is carefully selected to meet the highest standards of quality and design.
              </p>
              <p>
                From Swiss-inspired timepieces to Italian leather wallets and designer eyewear, we bring the world's finest accessories to your doorstep across Pakistan.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] bg-(--secondary) overflow-hidden">
            <Image
              urlEndpoint="https://ik.imagekit.io/fashionstylized"
              alt="Our Story"
              fill={true}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover"
              src="photo-1748943214874-e93ea54971ec.jpg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-(--card) py-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "40+", label: "Products" },
              { number: "200+", label: "Happy Customers" },
              { number: "3", label: "Categories" },
              { number: "5★", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center">
                <p className="text-4xl lg:text-5xl font-cormorant-garamond text-(--primary) mb-2">
                  {stat.number}
                </p>
                <p className="text-xs uppercase tracking-widest text-(--muted-foreground)">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">Why Choose Us</p>
          <h2 className="text-5xl font-cormorant-garamond mb-4">Our Values</h2>
          <div className="h-px w-24 bg-(--primary) mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 border border-(--border) hover:border-(--primary) transition-colors group">
              <div className="w-14 h-14 bg-(--primary)/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-(--primary)/20 transition-colors">
                <value.icon className="w-6 h-6 text-(--primary)" />
              </div>
              <h3 className="text-xl font-cormorant-garamond mb-3">{value.title}</h3>
              <p className="text-sm text-(--muted-foreground) leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-(--card) py-20 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[600px] mx-auto text-center">
          <h2 className="text-5xl font-cormorant-garamond mb-4">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-(--muted-foreground) text-sm mb-8">
            Explore our curated collection of premium accessories and find your perfect piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 bg-(--primary) text-(--primary-foreground) uppercase tracking-widest text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                Shop Now
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 border border-(--primary) text-(--primary) uppercase tracking-widest text-sm hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors">
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}