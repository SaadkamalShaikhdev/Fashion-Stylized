"use client"
import { apiClient } from '@/lib/api-client'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IProduct } from '@/models/Product'
import ProductCard from '@/app/components/ProductCard'

const filters = ["All", "Glasses", "Wallets"]

const NewArrival = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [filtered, setFiltered] = useState<IProduct[]>([])
  const [activeFilter, setActiveFilter] = useState("Glasses")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const res = await apiClient.getTrendingProducts()
        if (res.success) {
          const products = res.data || []
          setProducts(products)
          setFiltered(products.filter(p =>
            p.category.toLowerCase() === activeFilter.toLowerCase()
          ))
        } else {
          setError(res.error || "Failed to fetch products")
        }
      } catch (err) {
        setError("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])


  // filter logic
  const handleFilter = (filter: string) => {
    setActiveFilter(filter)
    if (filter === "All") {
      setFiltered(products)
    } else {
      setFiltered(products.filter(p =>
        p.category.toLowerCase() === filter.toLowerCase()
      ))
    }
  }
  

  // get image url — handles both images[] and imageUrl[]
  const getImage = (product: IProduct) => {
    if (product.images && product.images.length > 0) return product.images[0]
    return "/home.jpg" // fallback
  }

  return (
    <section className='py-24 px-6 lg:px-12 max-w-400 mx-auto'>

      {/* heading + filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className='mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8'>

        <div>
          <h2 className='text-5xl lg:text-6xl mb-4 font-cormorant-garamond'>New Arrivals</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className='h-px bg-(--primary)'
          />
        </div>

        {/* filter buttons */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => handleFilter(filter)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-3 uppercase text-sm tracking-wider border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-(--primary) text-(--primary-foreground) border-(--primary)"      // ✅ selected
                  : "border-(--border) hover:border-(--primary) text-(--muted-foreground) hover:text-foreground" // unselected
              }`}>
              {filter}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* loading skeleton */}
      {loading && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-3/4 bg-white/10 mb-6" />
              <div className="h-6 bg-white/10 mb-2 w-3/4" />
              <div className="h-4 bg-white/10 w-1/4" />
            </div>
          ))}
        </div>
      )}

      {/* error state */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <p className="text-red-400 text-lg">Failed to load products</p>
          <p className="text-(--muted-foreground) text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-3 border border-(--border) hover:border-(--primary) uppercase text-sm tracking-wider transition-colors">
            Try Again
          </button>
        </motion.div>
      )}

      {/* empty state after filter */}
      {!loading && !error && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <p className="text-2xl font-cormorant-garamond">No products found</p>
          <p className="text-(--muted-foreground) text-sm">Try a different category</p>
        </motion.div>
      )}

      {/* product grid */}
      {!loading && !error && (
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <AnimatePresence mode="popLayout">
{filtered.map((item, index) => (
  <ProductCard key={item._id?.toString()} item={item} index={index} />
))}
          </AnimatePresence>
        </motion.div>
      )}

    </section>
  )
}

export default NewArrival