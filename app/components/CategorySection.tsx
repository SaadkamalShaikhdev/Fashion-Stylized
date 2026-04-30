"use client"
import React from 'react'
import { Image } from '@imagekit/next'
import { Clock, ChevronRight, Wallet, Glasses } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const categories = [
  {
    title: "Wallets",
    subtitle: "Timeless Craft",
    icon: Wallet,
    src: "/photo-1696432192353-2846460149d1.jpg",
    href: "/products?category=wallets"
  },
  {
    title: "Glasses",
    subtitle: "Refined Vision",
    icon: Glasses,
    src: "/glass.jpg",
    href: "/products?category=glasses"
  },
  {
    title: "Watches",
    subtitle: "Timeless Precision",
    icon: Clock,
    src: "/home.jpg",
    href: "/products?category=watches"
  },
]

const CategorySection = () => {
  return (
    <section className='py-24 px-6 lg:px-12 max-w-[1600px] mx-auto'>

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className='mb-16'>
        <h2 className='text-5xl lg:text-6xl mb-4 font-cormorant-garamond'>Categories</h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className='h-[1px] bg-(--primary)'
        />
      </motion.div>

      {/* cards grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: index * 0.15, // stagger each card
              ease: "easeOut"
            }}>

            <Link href={category.href}>
              <div className='group cursor-pointer relative overflow-hidden bg-card aspect-[3/4]'>

                {/* image with zoom */}
                <div className='absolute inset-0'>
                  <Image
                    urlEndpoint='https://ik.imagekit.io/fashionstylized'
                    alt={category.title}
                    fill={true}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                    src={category.src}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
                </div>

                {/* card content */}
                <div className='absolute bottom-0 left-0 right-0 p-8'>

                  {/* icon — slides up slightly on hover */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}>
                    <category.icon className='w-12 h-12 text-(--primary) mb-4' />
                  </motion.div>

                  <h3 className='text-4xl mb-2 font-cormorant-garamond text-white'>
                    {category.title}
                  </h3>
                  <p className='text-white/60 tracking-wide uppercase text-sm'>
                    {category.subtitle}
                  </p>

                  {/* shop now — appears on hover */}
                 <div className='mt-4 flex items-center gap-2 text-(--primary) opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
  <span className='text-sm uppercase tracking-wider'>Shop Now</span>
  <ChevronRight className='w-4 h-4' />
</div>

                </div>

                {/* border reveal on hover */}
                <div className='absolute inset-0 border border-transparent group-hover:border-white/20 transition-colors duration-500 pointer-events-none' />

              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CategorySection