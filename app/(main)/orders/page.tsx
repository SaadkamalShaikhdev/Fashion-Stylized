// app/(main)/orders/page.tsx
"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, ChevronRight, Loader2, AlertCircle, ShoppingBag, Search } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Image } from "@imagekit/next"

type OrderProduct = {
  productId: string
  title: string
  price: number
  image: string
  category: string
  quantity: number
}

type Order = {
  _id: string
  name: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  totalAmount: number
  products: OrderProduct[]
  paymentMethod: string
  city: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  pending: "border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
  processing: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  shipped: "border-purple-500/40 text-purple-400 bg-purple-500/10",
  delivered: "border-green-500/40 text-green-400 bg-green-500/10",
  cancelled: "border-red-500/40 text-red-400 bg-red-500/10",
}

const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filtered, setFiltered] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn")
    }
  }, [status])

  useEffect(() => {
    async function getOrders() {
      try {
        setLoading(true)
        const res = await apiClient.getOrders()
        if (res.success) {
          setOrders(res.data || [])
          setFiltered(res.data || [])
        } else {
          setError(res.error || "Failed to fetch orders")
        }
      } catch {
        setError("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      getOrders()
    }
  }, [status])

  // filter + search
  useEffect(() => {
    let result = [...orders]

    if (activeFilter !== "All") {
      result = result.filter(o => o.status.toLowerCase() === activeFilter.toLowerCase())
    }

    if (search.trim()) {
      result = result.filter(o =>
        o._id.toLowerCase().includes(search.toLowerCase()) ||
        o.products.some(p => p.title.toLowerCase().includes(search.toLowerCase()))
      )
    }

    setFiltered(result)
  }, [orders, activeFilter, search])

  // loading
  if (loading || status === "loading") {
    return (
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        <div className="h-12 bg-white/10 w-48 mb-10 animate-pulse" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10">
        <h1 className="text-5xl lg:text-6xl font-cormorant-garamond mb-2">My Orders</h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-(--primary)"
        />
      </motion.div>

      {/* error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 mb-8 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* filters + search */}
      {orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-(--border)">

          {/* filter pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-1.5 uppercase text-xs tracking-wider border transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-(--primary) text-(--primary-foreground) border-(--primary)"
                    : "border-(--border) text-(--muted-foreground) hover:border-(--primary)"
                }`}>
                {filter}
              </motion.button>
            ))}
          </div>

          {/* search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted-foreground)" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
            />
          </div>
        </motion.div>
      )}

      {/* empty state */}
      {!loading && orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
          <ShoppingBag className="w-20 h-20 opacity-20 text-(--muted-foreground)" />
          <h2 className="text-3xl font-cormorant-garamond">No orders yet</h2>
          <p className="text-(--muted-foreground) text-sm max-w-sm">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 px-10 py-4 bg-(--primary) text-(--primary-foreground) uppercase tracking-widest text-sm hover:opacity-90 transition-opacity">
              Start Shopping
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* no results after filter */}
      {!loading && orders.length > 0 && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <p className="text-2xl font-cormorant-garamond">No orders found</p>
          <p className="text-(--muted-foreground) text-sm">Try a different filter or search term</p>
          <button
            onClick={() => { setActiveFilter("All"); setSearch("") }}
            className="mt-4 px-6 py-2 border border-(--primary) text-(--primary) uppercase text-sm tracking-wider hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors">
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* orders list */}
      <AnimatePresence>
        {filtered.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="mb-4">

            <Link href={`/orders/${order._id}`}>
              <div className="border border-(--border) bg-(--card) p-4 sm:p-6 hover:border-(--primary) transition-colors duration-300 group">

                {/* top row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-(--muted-foreground) uppercase tracking-widest mb-1">
                      Order ID
                    </p>
                    <p className="text-sm font-mono text-foreground">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* status badge */}
                    <span className={`text-xs uppercase tracking-wider px-3 py-1 border ${statusColors[order.status] || statusColors.pending}`}>
                      {order.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-(--muted-foreground) group-hover:text-(--primary) group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* product images preview */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-3">
                    {order.products.slice(0, 4).map((product, i) => (
                      <div
                        key={i}
                        className="relative w-12 h-12 border-2 border-(--card) bg-(--secondary) flex-shrink-0"
                        style={{ zIndex: order.products.length - i }}>
                        <Image
                          urlEndpoint="https://ik.imagekit.io/fashionstylized"
                          alt={product.title}
                          fill={true}
                          className="w-full h-full object-cover"
                          src={product.image || "home.jpg"}
                        />
                      </div>
                    ))}
                    {order.products.length > 4 && (
                      <div className="w-12 h-12 border-2 border-(--card) bg-(--secondary) flex items-center justify-center text-xs text-(--muted-foreground)">
                        +{order.products.length - 4}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-1">
                      {order.products.map(p => p.title).join(", ")}
                    </p>
                    <p className="text-xs text-(--muted-foreground) mt-0.5">
                      {order.products.length} {order.products.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                {/* bottom row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-(--border)">
                  <div className="flex flex-wrap gap-4 text-xs text-(--muted-foreground)">
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      {order.paymentMethod}
                    </span>
                    <span>{order.city}</span>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </div>

                  <p className="text-lg text-(--primary) font-cormorant-garamond">
                    Rs. {order.totalAmount.toLocaleString()}
                  </p>
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* results count */}
      {filtered.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-(--muted-foreground) uppercase tracking-wider text-center mt-6">
          Showing {filtered.length} of {orders.length} orders
        </motion.p>
      )}

    </div>
  )
}