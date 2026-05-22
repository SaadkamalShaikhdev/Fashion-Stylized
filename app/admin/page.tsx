// app/admin/page.tsx
"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ShoppingBag, Package, Users, TrendingUp,
  Clock, AlertTriangle, RefreshCw, Loader2,
  ArrowRight
} from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { apiClient } from "@/lib/api-client"
import Link from "next/link"
import { Image } from "@imagekit/next"

type Stats = {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalUsers: number
  pendingOrders: number
}

type DashboardData = {
  stats: Stats
  ordersPerDay: { date: string; orders: number; revenue: number }[]
  ordersByStatus: { name: string; value: number }[]
  topCategories: { name: string; orders: number; revenue: number }[]
  lowStock: any[]
  recentOrders: any[]
}

const statusColors: Record<string, string> = {
  pending: "#F59E0B",
  processing: "#3B82F6",
  shipped: "#8B5CF6",
  delivered: "#10B981",
  cancelled: "#EF4444",
}

const PIE_COLORS = ["#F59E0B", "#3B82F6", "#8B5CF6", "#10B981", "#EF4444"]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

// custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-white/10 p-3 text-xs space-y-1 shadow-xl">
        <p className="text-white/60 uppercase tracking-wider mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.name === "revenue"
              ? `Rs. ${entry.value.toLocaleString()}`
              : entry.value
            }
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      setError("")

      const res = await apiClient.getAdminStats()
      if (res.success) {
        setData(res.data)
      } else {
        setError(res.error || "Failed to fetch stats")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {/* stat cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-white/10 animate-pulse" />
          ))}
        </div>
        {/* charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-72 bg-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <AlertTriangle className="w-12 h-12 text-red-400" />
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => fetchStats()}
          className="px-6 py-3 border border-(--border) hover:border-(--primary) uppercase text-sm tracking-wider transition-colors">
          Try Again
        </button>
      </div>
    )
  }

  const { stats, ordersPerDay, ordersByStatus, topCategories, lowStock, recentOrders } = data

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6">

      {/* ── heading ── */}
      <motion.div variants={fadeUp} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-cormorant-garamond">Dashboard</h1>
          <p className="text-sm text-(--muted-foreground) mt-1">
            Welcome back — here's what's happening
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => fetchStats(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 border border-(--border) hover:border-(--primary) text-sm uppercase tracking-wider transition-colors disabled:opacity-60">
          {refreshing
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <RefreshCw className="w-4 h-4" />
          }
          Refresh
        </motion.button>
      </motion.div>

      {/* ── stat cards ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Orders",
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            href: "/admin/orders"
          },
          {
            label: "Revenue (30d)",
            value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: "text-(--primary)",
            bg: "bg-(--primary)/10",
            href: "/admin/orders"
          },
          {
            label: "Products",
            value: stats.totalProducts,
            icon: Package,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            href: "/admin/products"
          },
          {
            label: "Users",
            value: stats.totalUsers,
            icon: Users,
            color: "text-green-400",
            bg: "bg-green-500/10",
            href: null
          },
          {
            label: "Pending",
            value: stats.pendingOrders,
            icon: Clock,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            href: "/admin/orders"
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -2 }}
            className="border border-(--border) bg-(--card) p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              {card.href && (
                <Link href={card.href}>
                  <ArrowRight className="w-4 h-4 text-(--muted-foreground) hover:text-(--primary) transition-colors" />
                </Link>
              )}
            </div>
            <p className={`text-2xl font-cormorant-garamond ${card.color}`}>
              {card.value}
            </p>
            <p className="text-xs text-(--muted-foreground) uppercase tracking-wider mt-1">
              {card.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── charts row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* orders per day bar chart */}
        <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
          <h2 className="text-sm uppercase tracking-wider mb-6 text-(--muted-foreground)">
            Orders — Last 7 Days
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ordersPerDay} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="orders"
                fill="var(--color-primary, #F59E0B)"
                radius={[2, 2, 0, 0]}
                name="orders"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* revenue line chart */}
        <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
          <h2 className="text-sm uppercase tracking-wider mb-6 text-(--muted-foreground)">
            Revenue — Last 7 Days
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ordersPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-primary, #F59E0B)"
                strokeWidth={2}
                dot={{ fill: "var(--color-primary, #F59E0B)", r: 4 }}
                activeDot={{ r: 6 }}
                name="revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ── charts row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* orders by status pie chart */}
        <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
          <h2 className="text-sm uppercase tracking-wider mb-6 text-(--muted-foreground)">
            Orders by Status
          </h2>
          {ordersByStatus.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-(--muted-foreground) text-sm">
              No data yet
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={ordersByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    paddingAngle={3}>
                    {ordersByStatus.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={statusColors[entry.name] || PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-background)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: 11
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* legend */}
              <div className="space-y-2 flex-1">
                {ordersByStatus.map((entry, i) => (
                  <div key={entry.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: statusColors[entry.name] || PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      <span className="text-xs uppercase tracking-wider text-(--muted-foreground) capitalize">
                        {entry.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* top categories bar chart */}
        <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
          <h2 className="text-sm uppercase tracking-wider mb-6 text-(--muted-foreground)">
            Top Categories
          </h2>
          {topCategories.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-(--muted-foreground) text-sm">
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={topCategories} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="orders"
                  fill="var(--color-primary, #F59E0B)"
                  radius={[0, 2, 2, 0]}
                  name="orders"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* ── bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* recent orders */}
        <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm uppercase tracking-wider text-(--muted-foreground)">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs text-(--primary) hover:underline uppercase tracking-wider flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-(--muted-foreground) text-sm text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map(order => (
                <Link key={order._id} href={`/admin/orders/${order._id}`}>
                  <div className="flex items-center justify-between p-3 border border-(--border) hover:border-(--primary) transition-colors group">
                    <div>
                      <p className="text-xs font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm mt-0.5">{order.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-(--primary) font-cormorant-garamond text-base">
                        Rs. {order.totalAmount?.toLocaleString()}
                      </span>
                      <span
                        className="text-xs uppercase px-2 py-0.5 border"
                        style={{
                          color: statusColors[order.status],
                          borderColor: `${statusColors[order.status]}40`,
                          background: `${statusColors[order.status]}10`
                        }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* low stock */}
        <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm uppercase tracking-wider text-(--muted-foreground) flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Low Stock
            </h2>
            <Link
              href="/admin/products"
              className="text-xs text-(--primary) hover:underline uppercase tracking-wider flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {lowStock.length === 0 ? (
            <p className="text-green-400 text-sm text-center py-8 flex items-center justify-center gap-2">
              ✓ All products well stocked
            </p>
          ) : (
            <div className="space-y-3">
              {lowStock.map(product => (
                <Link key={product._id} href={`/admin/products/${product._id}`}>
                  <div className="flex items-center gap-3 p-3 border border-(--border) hover:border-(--primary) transition-colors group">
                    {/* image */}
                    <div className="relative w-10 h-10 flex-shrink-0 bg-(--secondary)">
                      {product.images?.[0] && (
                        <Image
                          urlEndpoint="https://ik.imagekit.io/fashionstylized"
                          alt={product.title}
                          fill={true}
                          sizes="40px"
                          className="w-full h-full object-cover"
                          src={product.images[0]}
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-1">{product.title}</p>
                      <p className="text-xs text-(--muted-foreground) uppercase tracking-wider">
                        {product.category}
                      </p>
                    </div>

                    <span className={`text-xs px-2 py-1 border flex-shrink-0 ${
                      product.stock === 0
                        ? "text-red-400 border-red-500/40 bg-red-500/10"
                        : "text-yellow-400 border-yellow-500/40 bg-yellow-500/10"
                    }`}>
                      {product.stock === 0 ? "Out of Stock" : `${product.stock} left`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>

    </motion.div>
  )
}