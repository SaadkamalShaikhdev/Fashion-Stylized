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
    src: "main-wallet",
    href: "/products?category=wallets"
  },
  {
    title: "Glasses",
    subtitle: "Refined Vision",
    icon: Glasses,
    src: "main-glass",
    href: "/products?category=glasses"
  },
]

const CategorySection = () => {
  return (
    <section className='py-16 sm:py-24 px-6 lg:px-12 max-w-[1600px] mx-auto'>

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className='mb-10 sm:mb-16'>
        <h2 className='text-4xl sm:text-5xl lg:text-6xl mb-4 font-cormorant-garamond'>Categories</h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className='h-[1px] bg-(--primary)'
        />
      </motion.div>

      {/* cards grid — 2 cols always */}
      <div className='grid grid-cols-2 gap-4 sm:gap-8'>
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: "easeOut"
            }}>

            <Link href={category.href}>
              {/* ✅ shorter aspect ratio on mobile, taller on desktop */}
              <div className='group cursor-pointer relative overflow-hidden bg-card aspect-[3/4] sm:aspect-[3/4] max-h-[280px] sm:max-h-[450px] w-full'>

                {/* image with zoom */}
                <div className='absolute inset-0'>
                  <Image
                    urlEndpoint='https://ik.imagekit.io/fashionstylized'
                    alt={category.title}
                    fill={true}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                    src={category.src}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
                </div>

                {/* ✅ smaller padding + smaller text on mobile */}
                <div className='absolute bottom-0 left-0 right-0 p-3 sm:p-8'>

                  {/* icon — smaller on mobile */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}>
                    <category.icon className='w-6 h-6 sm:w-12 sm:h-12 text-(--primary) mb-2 sm:mb-4' />
                  </motion.div>

                  <h3 className='text-xl sm:text-4xl mb-1 sm:mb-2 font-cormorant-garamond text-white'>
                    {category.title}
                  </h3>
                  <p className='text-white/60 tracking-wide uppercase text-[10px] sm:text-sm line-clamp-1'>
                    {category.subtitle}
                  </p>

                  {/* shop now — always visible on mobile, hover on desktop */}
                  <div className='mt-2 sm:mt-4 flex items-center gap-1 sm:gap-2 text-(--primary) opacity-100 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300'>
                    <span className='text-[10px] sm:text-sm uppercase tracking-wider'>Shop Now</span>
                    <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4' />
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