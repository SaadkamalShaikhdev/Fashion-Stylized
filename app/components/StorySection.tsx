"use client"
import { Image } from '@imagekit/next'
import { motion } from 'framer-motion'
import React from 'react'

const StorySection = () => {
  return (
    <section className='relative py-32 px-6 lg:px-12 overflow-hidden' id='story'>

      {/* background image — subtle zoom */}
      <div className='absolute inset-0'>
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className='w-full h-full'>
          <Image
            urlEndpoint='https://ik.imagekit.io/fashionstylized'
            alt="Story Image"
            fill={true}
            className='w-full h-full object-cover opacity-30'
            src="/products/product_1782589686270_ChatGPT_Image_Jun_28__2026__12_44_05_AM_YgpEamxEi.png"
          />
        </motion.div>
        <div className='absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent' />
      </div>

      {/* content */}
      <div className='relative z-10 max-w-[1600px] mx-auto'>
        <div className='max-w-2xl'>

      {/* small label */}
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-6"
>
  Our Story
</motion.p>

{/* heading line 1 */}
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
>
  <h2 className="text-6xl lg:text-7xl leading-tight font-cormorant-garamond">
    Fashion with
  </h2>
</motion.div>

{/* heading line 2 */}
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
  className="mb-8"
>
  <h2 className="text-6xl lg:text-7xl leading-tight font-cormorant-garamond">
    <span className="text-(--primary)">Confidence</span>
  </h2>
</motion.div>

{/* animated underline */}
<motion.div
  initial={{ width: 0 }}
  whileInView={{ width: 96 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
  className="h-[1px] bg-(--primary) mb-8"
/>

{/* description */}
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
  className="text-lg text-(--muted-foreground) mb-10 leading-relaxed tracking-wide"
>
  Fashion Stylized was founded with a passion for bringing modern,
  stylish, and high-quality fashion to everyone. We carefully curate
  every product to ensure it reflects the latest trends while maintaining
  comfort and affordability. Our mission is to help every customer express
  their unique style with confidence through a seamless online shopping
  experience and exceptional service.
</motion.p>

{/* stats row */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
  className="flex gap-12 mb-10"
>
  {[
    { number: "50+", label: "Products" },
    { number: "200+", label: "Happy Customers" },
    { number: "Quality", label: "Guaranteed" },
  ].map((stat, i) => (
    <div key={i}>
      <p className="text-3xl font-cormorant-garamond text-(--primary)">
        {stat.number}
      </p>
      <p className="text-xs uppercase tracking-widest text-(--muted-foreground) mt-1">
        {stat.label}
      </p>
    </div>
  ))}
</motion.div>

{/* button */}
<motion.button
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="border border-(--primary) text-(--primary) px-12 py-4 uppercase tracking-widest hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors cursor-pointer"
>
  Shop Now
</motion.button>

        </div>
      </div>
    </section>
  )
}

export default StorySection