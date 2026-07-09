"use client"

import React from 'react'
import Link from 'next/link'
import { Image } from '@imagekit/next'
import { Eye, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { IProduct } from '@/models/Product'
import { useCartStore } from '@/app/store/cartStore'
import { getProductOffer } from '@/lib/product-offers'
import { showToast } from "@/lib/toast"


interface ProductCardProps {
  item: IProduct
  index?: number
  className?: string
}

const ProductCard = ({ item, index = 0, className = '' }: ProductCardProps) => {
  const { addItem } = useCartStore()
  const offer = getProductOffer(item)
  const href = item._id ? `/products/${item._id.toString()}` : '/products'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: item._id?.toString() || '',
      title: item.title,
      price: item.price,
      image: item.images?.[0] || '/home.jpg',
      category: item.category,
      quantity: 1,
    })
    showToast.addedToCart()
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={`group cursor-pointer ${className}`.trim()}
    >
      <Link href={href}>
        <div className="relative overflow-hidden aspect-3/4 mb-6 bg-secondary">
          <Image
            urlEndpoint="https://ik.imagekit.io/fashionstylized"
            alt={item.title}
            fill={true}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={item.images?.[0] || '/home.jpg'}
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex flex-col items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={item.stock === 0}
              className="bg-(--primary) text-(--primary-foreground) px-8 py-3 uppercase tracking-wider text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 uppercase tracking-wider text-sm flex items-center gap-2 border border-white/20"
            >
              <Eye className="w-4 h-4" />
              View Details
            </motion.button>
          </div>

          {item.stock === 0 && (
            <div className="absolute top-4 left-4 bg-black/80 text-white text-xs uppercase tracking-wider px-3 py-1">
              Out of Stock
            </div>
          )}

          {item.isTrending && item.stock > 0 && (
            <div className="absolute top-4 right-4 bg-(--primary) text-(--primary-foreground) text-xs uppercase tracking-wider px-3 py-1">
              Trending
            </div>
          )}

          {offer.showOffer && (
            <div className="absolute top-4 left-4 bg-amber-500/95 text-black text-xs uppercase tracking-wider px-3 py-1">
              Limited offer
            </div>
          )}
        </div>
      </Link>

      <Link href={href}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.2 }}
          className="space-y-2 mb-4"
        >
          <p className="text-xs uppercase tracking-widest text-(--muted-foreground)">
            {(item as any).subcategory || item.category}
          </p>
          <h3 className="text-2xl font-cormorant-garamond group-hover:text-(--primary) transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {offer.showOffer ? (
              <>
                <p className="text-(--primary) tracking-wider">
                  Rs {offer.displayPrice.toLocaleString()}
                </p>
                <p className="text-sm text-(--muted-foreground) line-through">
                  Rs {offer.originalPrice.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-(--primary) tracking-wider">
                Rs {item.price.toLocaleString()}
              </p>
            )}
          </div>
        </motion.div>
      </Link>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleAddToCart}
        disabled={item.stock === 0}
        className="sm:hidden w-full py-3 border border-(--primary) text-(--primary) uppercase text-xs tracking-wider hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" />
        {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </motion.button>
    </motion.div>
  )
}

export default ProductCard
