"use client"
import { apiClient } from '@/lib/api-client'
import { Image } from '@imagekit/next'
import { Funnel, Eye, ShoppingBag, AlertCircle,Search,X ,LayoutGrid,TrendingUp} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IProduct } from '@/models/Product'
import ProductCard from '@/app/components/ProductCard'

// const subcategories = ["All", "Round", "Square", "SunGlasses"]
const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
]

const trendingFilters = [
  { label: "All", value: "all", icon: LayoutGrid },
  { label: "Trending", value: "trending", icon: TrendingUp },
]

const GlassDetails = () => {
  const [glasses, setGlasses] = useState<IProduct[]>([])
  const [filtered, setFiltered] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTrending, setActiveTrending] = useState("all") // ✅ new
    const [search, setSearch] = useState("")
  
  const [activeSort, setActiveSort] = useState("default")

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const res = await apiClient.getProductsByCategory("glasses")
        if (res.success) {
          setGlasses(res.data || [])
          setFiltered(res.data || [])
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

  useEffect(() => {
     let result = [...glasses]
 
      // ✅ trending filter
    if (activeTrending === "trending") {
      result = result.filter(p => p.isTrending)
    }

     // search
     if (search.trim()) {
       result = result.filter(p =>
         p.title.toLowerCase().includes(search.toLowerCase())
       )
     }
 
     // sort
     if (activeSort === "asc") result.sort((a, b) => a.price - b.price)
     if (activeSort === "desc") result.sort((a, b) => b.price - a.price)
 
     setFiltered(result)
   }, [glasses, search, activeSort, activeTrending])

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full">
            <Image
              urlEndpoint='https://ik.imagekit.io/fashionstylized'
              alt="Glasses bg"
              fill={true}
              className='w-full h-full object-cover opacity-40'
              src="main-glass"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative z-10 text-center px-6'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">
            Our Collection
          </motion.p>
          <h2 className='text-6xl lg:text-7xl mb-4 font-cormorant-garamond'>
            Eyewear
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px bg-(--primary) mx-auto mb-4"
          />
          <p className="text-lg text-(--muted-foreground) max-w-2xl mx-auto tracking-wide">
            Refined vision for the modern individual
          </p>
        </motion.div>
      </section>

      {/* ── Filters ── */}
      <section className="max-w-400 mx-auto px-6 lg:px-12 py-12">
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 pb-6 border-b border-(--border) gap-4">
   
   {/* left — search + trending capsules */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">

            {/* search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted-foreground)" />
              <input
                type="text"
                placeholder="Search glasses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--muted-foreground) hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* ✅ trending capsule pills */}
            <div className="flex items-center gap-2">
              {trendingFilters.map(filter => (
                <motion.button
                  key={filter.value}
                  onClick={() => setActiveTrending(filter.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-all duration-300 ${
                    activeTrending === filter.value
                      ? "bg-(--primary) text-(--primary-foreground) border-(--primary)"
                      : "border-(--border) text-(--muted-foreground) hover:border-(--primary) hover:text-foreground bg-transparent"
                  }`}>
                  <filter.icon className="w-3 h-3" />
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* right — sort + results count */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {!loading && !error && (
              <p className="text-xs uppercase tracking-widest text-(--muted-foreground)">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </p>
            )}
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className='bg-(--secondary) px-4 py-2.5 border border-(--border) focus:border-(--primary) outline-none text-sm uppercase tracking-wider cursor-pointer w-full sm:w-auto'>
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-3/4 bg-white/10 mb-4" />
                <div className="h-5 bg-white/10 mb-2 w-3/4" />
                <div className="h-4 bg-white/10 w-1/4" />
              </div>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-red-400 text-xl">Failed to load products</p>
            <p className="text-(--muted-foreground) text-sm">{error}</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.reload()}
              className="mt-2 px-8 py-3 border border-(--border) hover:border-(--primary) uppercase text-sm tracking-wider transition-colors">
              Try Again
            </motion.button>
          </motion.div>
        )}

        {/* empty state */}
               {!loading && !error && filtered.length === 0 && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="flex flex-col items-center justify-center py-32 gap-3 text-center">
                   <p className="text-3xl font-cormorant-garamond">
                    {search
                ? `No results for "${search}"`
                : activeTrending === "trending"
                ? "No trending glasses found"
                : "No glasses found"}
                   </p>
                   <p className="text-(--muted-foreground) text-sm">
                     {search ? "Try a different search term" : "Check back soon"}
                   </p>
                   {search && (
                     <motion.button
                       whileHover={{ scale: 1.03 }}
                       whileTap={{ scale: 0.97 }}
                       onClick={() => { setSearch(""); setActiveSort("default") }}
                       className="mt-4 px-8 py-3 border border-(--primary) text-(--primary) uppercase text-sm tracking-wider hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors">
                       Clear Search
                     </motion.button>
                   )}
                 </motion.div>
               )}

        {/* ── Product grid ── */}
        {!loading && !error && filtered.length > 0 && (
          <motion.div
            layout
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <AnimatePresence mode="popLayout">
             // replace your product card with this
{filtered.map((item, index) => (
  <ProductCard key={item._id?.toString()} item={item} index={index} />
))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  )
}

export default GlassDetails