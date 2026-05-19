// app/admin/orders/[id]/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft, Loader2, AlertCircle, CheckCircle2,
  MapPin, Phone, Mail, Package, ChevronDown
} from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { Image } from "@imagekit/next"
import Link from "next/link"

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
  email: string
  mobileNumber: string
  address: string
  city: string
  postalCode: string
  paymentMethod: string
  isPaid: boolean
  status: string
  totalAmount: number
  products: OrderProduct[]
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
  processing: "text-blue-400 border-blue-500/40 bg-blue-500/10",
  shipped: "text-purple-400 border-purple-500/40 bg-purple-500/10",
  delivered: "text-green-400 border-green-500/40 bg-green-500/10",
  cancelled: "text-red-400 border-red-500/40 bg-red-500/10",
}

const allStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function AdminOrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true)
        const res = await apiClient.adminGetOrderById(id?.toString() || "")
        if (res.success) {
          setOrder(res.data)
          setSelectedStatus(res.data.status)
        } else {
          setError(res.error || "Order not found")
        }
      } catch {
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const handleStatusUpdate = async () => {
    if (!order || selectedStatus === order.status) return
    setUpdating(true)
    try {
      const res = await apiClient.updateOrderStatus(order._id, selectedStatus)
      if (res.success) {
        setOrder(prev => prev ? { ...prev, status: selectedStatus } : prev)
        setUpdateSuccess(true)
        setTimeout(() => setUpdateSuccess(false), 3000)
      }
    } catch {
      console.error("Failed to update status")
    } finally {
      setUpdating(false)
    }
  }

  // loading
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-white/10 w-48 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-64 bg-white/10 animate-pulse" />
            <div className="h-48 bg-white/10 animate-pulse" />
          </div>
          <div className="h-96 bg-white/10 animate-pulse" />
        </div>
      </div>
    )
  }

  // error
  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <p className="text-red-400 text-xl font-cormorant-garamond">Order not found</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 border border-(--border) hover:border-(--primary) uppercase text-sm tracking-wider transition-colors">
          Go Back
        </button>
      </div>
    )
  }

  const subtotal = order.totalAmount - 500

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-6">

      {/* header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-(--muted-foreground) hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-cormorant-garamond">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-sm text-(--muted-foreground) mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-PK", {
                day: "numeric", month: "long", year: "numeric",
                hour: "2-digit", minute: "2-digit"
              })}
            </p>
          </div>
        </div>

        {/* current status badge */}
        <span className={`text-xs uppercase tracking-wider px-4 py-2 border ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left — main content ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* order items */}
          <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
            <h2 className="text-lg uppercase tracking-wider mb-6 flex items-center gap-2">
              <Package className="w-4 h-4 text-(--primary)" />
              Items Ordered ({order.products.length})
            </h2>

            <div className="space-y-4">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b border-(--border) last:border-0 last:pb-0">

                  {/* image */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-(--secondary)">
                    <Image
                      urlEndpoint="https://ik.imagekit.io/fashionstylized"
                      alt={item.title}
                      fill={true}
                      sizes="80px"
                      className="w-full h-full object-cover"
                      src={item.image || "home.jpg"}
                    />
                    <span className="absolute -top-2 -right-2 bg-(--primary) text-(--primary-foreground) text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>

                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-widest text-(--muted-foreground) mb-0.5">
                      {item.category}
                    </p>
                    <h3 className="font-cormorant-garamond text-lg line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 flex-wrap gap-2">
                      <p className="text-sm text-(--muted-foreground)">
                        Rs. {item.price.toLocaleString()} × {item.quantity}
                      </p>
                      <p className="text-sm text-(--primary) font-medium">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* order totals */}
            <div className="mt-6 pt-4 border-t border-(--border) space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-(--muted-foreground)">Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-(--muted-foreground)">Shipping</span>
                <span>Rs. 500</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-(--border)">
                <span className="uppercase tracking-wider text-sm">Total</span>
                <span className="text-xl text-(--primary) font-cormorant-garamond">
                  Rs. {order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* customer info */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* shipping address */}
            <div className="border border-(--border) bg-(--card) p-5">
              <h3 className="text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-(--primary)" />
                Shipping Address
              </h3>
              <div className="space-y-1 text-sm text-(--muted-foreground)">
                <p className="text-foreground font-medium">{order.name}</p>
                <p>{order.address}</p>
                <p>{order.city}{order.postalCode ? `, ${order.postalCode}` : ""}</p>
              </div>
            </div>

            {/* contact info */}
            <div className="border border-(--border) bg-(--card) p-5">
              <h3 className="text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-(--primary)" />
                Contact Info
              </h3>
              <div className="space-y-2 text-sm text-(--muted-foreground)">
                <p className="flex items-center gap-2">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span className="break-all">{order.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3 h-3 shrink-0" />
                  {order.mobileNumber}
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-(--border)">
                  <span className="text-xs uppercase tracking-wider">Payment:</span>
                  <span className="text-foreground">{order.paymentMethod}</span>
                  {order.isPaid ? (
                    <span className="text-xs text-green-400 border border-green-500/30 px-2 py-0.5">Paid</span>
                  ) : (
                    <span className="text-xs text-yellow-400 border border-yellow-500/30 px-2 py-0.5">Unpaid</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* order timeline */}
          <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
            <h2 className="text-lg uppercase tracking-wider mb-6">Order Timeline</h2>

            {/* desktop horizontal */}
            <div className="hidden sm:flex items-center">
              {allStatuses.filter(s => s !== "cancelled").map((step, i, arr) => {
                const stepIndex = arr.indexOf(order.status === "cancelled" ? "pending" : order.status)
                const isCancelled = order.status === "cancelled"
                const isPast = i <= stepIndex && !isCancelled
                const isCurrent = step === order.status

                return (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                        isCancelled
                          ? "border-(--border) text-(--muted-foreground)"
                          : isPast
                          ? "border-(--primary) bg-(--primary) text-(--primary-foreground)"
                          : "border-(--border) text-(--muted-foreground)"
                      }`}>
                        {!isCancelled && i < stepIndex ? "✓" : i + 1}
                      </div>
                      <p className={`text-xs uppercase tracking-wider mt-2 text-center ${
                        isCancelled
                          ? "text-(--muted-foreground)"
                          : isPast ? "text-(--primary)" : "text-(--muted-foreground)"
                      }`}>
                        {step}
                      </p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`h-px flex-1 mb-5 ${
                        !isCancelled && i < stepIndex ? "bg-(--primary)" : "bg-(--border)"
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* mobile vertical */}
            <div className="flex flex-col gap-3 sm:hidden">
              {allStatuses.filter(s => s !== "cancelled").map((step, i, arr) => {
                const stepIndex = arr.indexOf(order.status === "cancelled" ? "pending" : order.status)
                const isCancelled = order.status === "cancelled"
                const isPast = i <= stepIndex && !isCancelled

                return (
                  <div key={step} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isCancelled
                        ? "border-(--border) text-(--muted-foreground)"
                        : isPast
                        ? "border-(--primary) bg-(--primary) text-(--primary-foreground)"
                        : "border-(--border) text-(--muted-foreground)"
                    }`}>
                      {!isCancelled && i < stepIndex ? "✓" : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs uppercase tracking-wider ${
                        isCancelled ? "text-(--muted-foreground)" : isPast ? "text-(--primary)" : "text-(--muted-foreground)"
                      }`}>
                        {step}
                      </p>
                      {i < arr.length - 1 && (
                        <div className={`w-px h-4 ml-[14px] mt-1 ${
                          !isCancelled && i < stepIndex ? "bg-(--primary)" : "bg-(--border)"
                        }`} />
                      )}
                    </div>
                    {step === order.status && !isCancelled && (
                      <span className="text-xs uppercase tracking-wider text-(--primary) border border-(--primary) px-2 py-0.5">
                        Current
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* cancelled badge */}
            {order.status === "cancelled" && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center uppercase tracking-wider">
                This order has been cancelled
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Right — status update ── */}
        <motion.div variants={fadeUp} className="space-y-4">

          {/* update status card */}
          <div className="border border-(--border) bg-(--card) p-6 sticky top-24">
            <h2 className="text-lg uppercase tracking-wider mb-6">Update Status</h2>

            {/* success */}
            {updateSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-400 text-sm mb-4 p-3 bg-green-500/10 border border-green-500/30">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Status updated successfully
              </motion.div>
            )}

            {/* custom dropdown */}
            <div className="relative mb-4">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className={`w-full flex items-center justify-between px-4 py-3 border text-sm uppercase tracking-wider transition-colors ${statusColors[selectedStatus]}`}>
                {selectedStatus}
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown ? "rotate-180" : ""}`} />
              </button>

              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-background border border-(--border) z-20 shadow-xl">
                  {allStatuses.map(status => (
                    <button
                      key={status}
                      onClick={() => { setSelectedStatus(status); setOpenDropdown(false) }}
                      className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-white/5 transition-colors flex items-center justify-between ${
                        selectedStatus === status ? "text-(--primary)" : "text-(--muted-foreground)"
                      }`}>
                      {status}
                      {selectedStatus === status && <span>✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* save button */}
            <motion.button
              whileHover={{ scale: selectedStatus === order.status ? 1 : 1.02 }}
              whileTap={{ scale: selectedStatus === order.status ? 1 : 0.98 }}
              onClick={handleStatusUpdate}
              disabled={updating || selectedStatus === order.status}
              className="w-full py-3 bg-(--primary) text-(--primary-foreground) uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : selectedStatus === order.status
                ? "No Changes"
                : `Set to ${selectedStatus}`
              }
            </motion.button>

            {selectedStatus !== order.status && (
              <p className="text-xs text-(--muted-foreground) text-center mt-2">
                Changing from <span className="text-foreground">{order.status}</span> to <span className="text-(--primary)">{selectedStatus}</span>
              </p>
            )}
          </div>

          {/* order meta */}
          <div className="border border-(--border) bg-(--card) p-6 space-y-3">
            <h2 className="text-sm uppercase tracking-wider mb-4">Order Details</h2>
            {[
              { label: "Order ID", value: `#${order._id.slice(-8).toUpperCase()}` },
              { label: "Full ID", value: order._id, mono: true },
              { label: "Created", value: new Date(order.createdAt).toLocaleDateString("en-PK") },
              { label: "Updated", value: new Date(order.updatedAt).toLocaleDateString("en-PK") },
              { label: "Payment", value: order.paymentMethod },
              { label: "Paid", value: order.isPaid ? "Yes" : "No" },
            ].map(item => (
              <div key={item.label} className="flex justify-between gap-2 text-sm">
                <span className="text-(--muted-foreground) text-xs uppercase tracking-wider shrink-0">
                  {item.label}
                </span>
                <span className={`text-right break-all ${item.mono ? "font-mono text-xs" : ""}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* back button */}
          <Link href="/admin/orders">
            <button className="w-full py-3 border border-(--border) hover:border-(--primary) uppercase text-sm tracking-wider transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </button>
          </Link>

        </motion.div>
      </div>
    </motion.div>
  )
}