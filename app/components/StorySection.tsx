"use client"

import { Image } from "@imagekit/next"
import { motion } from "framer-motion"
import React from "react"

const StorySection = () => {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-28 lg:px-12 lg:py-32"
      id="story"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Image
            urlEndpoint="https://ik.imagekit.io/fashionstylized"
            alt="Story Image"
            fill
            className="h-full w-full object-cover opacity-30"
            src="/products/product_1782589686270_ChatGPT_Image_Jun_28__2026__12_44_05_AM_YgpEamxEi.png"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-sm uppercase tracking-[0.3em] text-(--muted-foreground)"
          >
            Our Story
          </motion.p>

          {/* Heading 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="font-cormorant-garamond text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Fashion with
            </h2>
          </motion.div>

          {/* Heading 2 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="font-cormorant-garamond text-5xl leading-tight sm:text-6xl lg:text-7xl">
              <span className="text-(--primary)">Confidence</span>
            </h2>
          </motion.div>

          {/* Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-8 h-[1px] bg-(--primary)"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mb-10 text-base leading-relaxed tracking-wide text-(--muted-foreground) sm:text-lg"
          >
            Fashion Stylized was founded with a passion for bringing modern,
            stylish, and high-quality fashion to everyone. We carefully curate
            every product to ensure it reflects the latest trends while
            maintaining comfort and affordability. Our mission is to help every
            customer express their unique style with confidence through a
            seamless online shopping experience and exceptional service.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="mb-10 flex flex-wrap gap-x-8 gap-y-8 sm:gap-12"
          >
            {[
              { number: "30+", label: "Products" },
              { number: "200+", label: "Happy Customers" },
              { number: "Quality", label: "Guaranteed" },
            ].map((stat, i) => (
              <div key={i} className="min-w-fit">
                <p className="font-cormorant-garamond text-3xl text-(--primary)">
                  {stat.number}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-(--muted-foreground)">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer border border-(--primary) px-10 py-4 uppercase tracking-widest text-(--primary) transition-colors hover:bg-(--primary) hover:text-(--primary-foreground) sm:px-12"
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default StorySection