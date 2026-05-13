// app/(main)/profile/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
export const dynamic = "force-dynamic"
import {
  User, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle,
  CheckCircle2, Heart, Package, Trash2, ChevronRight,
  ShoppingBag, LogOut
} from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { Image } from "@imagekit/next"
import Link from "next/link"
import { useWishlistStore } from "@/app/store/wishlistStore"
import { useCartStore } from "@/app/store/cartStore"
import { IOrder } from "@/models/Order"

type Order = {
  _id: string
  status: string
  totalAmount: number
  products: { title: string; image: string; quantity: number }[]
  createdAt: string
}

 type WishlistProduct = {
  _id: string
  title: string
  price: number
  images: string[]
  category: string
}

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
  processing: "text-blue-400 border-blue-500/40 bg-blue-500/10",
  shipped: "text-purple-400 border-purple-500/40 bg-purple-500/10",
  delivered: "text-green-400 border-green-500/40 bg-green-500/10",
  cancelled: "text-red-400 border-red-500/40 bg-red-500/10",
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const { addItem } = useCartStore()
  const { items: wishlistItems, setItems: setWishlistItems, removeItem: removeWishlistItem } = useWishlistStore()

  // account info
  const [name, setName] = useState("")
  const [nameLoading, setNameLoading] = useState(false)
  const [nameSuccess, setNameSuccess] = useState(false)
  const [nameError, setNameError] = useState("")

  // password
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // orders
  const [orders, setOrders] = useState<IOrder[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  // wishlist
  const [wishlistLoading, setWishlistLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  // delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn")
    }
  }, [status])

  // fill name from session
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name)
    }
  }, [session])

  // fetch orders
  useEffect(() => {
    async function getOrders() {
      try {
        const res = await apiClient.getOrders()
        if (res.success) setOrders(res.data?.slice(0, 3) || [])
      } catch { } finally {
        setOrdersLoading(false)
      }
    }
    if (status === "authenticated") getOrders()
  }, [status])

  // fetch wishlist
  useEffect(() => {
    async function getWishlist() {
      try {
        const res = await apiClient.getWishlist()
        if (res.success) {
          setWishlistItems(res.data.map((p: WishlistProduct) => ({
            id: p._id.toString(),
            title: p.title,
            price: p.price,
            image: p.images?.[0] || "",
            category: p.category,
          })))
        }
      } catch { } finally {
        setWishlistLoading(false)
      }
    }
    if (status === "authenticated") getWishlist()
  }, [status])

  const handleUpdateName = async () => {
    if (!name.trim()) {
      setNameError("Name cannot be empty")
      return
    }
    setNameLoading(true)
    setNameError("")
    try {
      const res = await apiClient.updateProfile({ name })
      if (res.success) {
        await update({ name }) // ✅ update session
        setNameSuccess(true)
        setTimeout(() => setNameSuccess(false), 3000)
      } else {
        setNameError(res.error || "Failed to update name")
      }
    } catch {
      setNameError("Something went wrong")
    } finally {
      setNameLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setPasswordError("")
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required")
      return
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setPasswordLoading(true)
    try {
      const res = await apiClient.changePassword({ currentPassword, newPassword })
      if (res.success) {
        setPasswordSuccess(true)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setShowPasswordForm(false)
        setTimeout(() => setPasswordSuccess(false), 3000)
      } else {
        setPasswordError(res.error || "Failed to change password")
      }
    } catch {
      setPasswordError("Something went wrong")
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleRemoveWishlist = async (productId: string) => {
    setRemovingId(productId)
    try {
      const res = await apiClient.toggleWishlist(productId)
      if (res.success) removeWishlistItem(productId)
    } catch { } finally {
      setRemovingId(null)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    try {
      const res = await apiClient.deleteAccount()
      if (res.success) {
        await signOut({ callbackUrl: "/" })
      }
    } catch { } finally {
      setDeleteLoading(false)
    }
  }

  const isGoogleUser = session?.user?.image?.includes("googleusercontent")

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-(--muted-foreground)" />
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-12">

      {/* ── heading ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10">
        <h1 className="text-5xl lg:text-6xl font-cormorant-garamond mb-2">My Profile</h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-(--primary)"
        />
      </motion.div>

      <div className="space-y-8">

        {/* ── Section 1: Account Info ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-(--border) bg-(--card) p-6">

          <h2 className="text-xl uppercase tracking-wider mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-(--primary)" />
            Account Info
          </h2>

          {/* avatar + name */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-(--border)">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-(--primary) text-(--primary-foreground) flex items-center justify-center text-2xl font-cormorant-garamond">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-cormorant-garamond text-2xl">{session.user?.name}</p>
              <p className="text-sm text-(--muted-foreground)">{session.user?.email}</p>
              {isGoogleUser && (
                <span className="text-xs uppercase tracking-wider text-(--muted-foreground) border border-(--border) px-2 py-0.5 mt-1 inline-block">
                  Google Account
                </span>
              )}
            </div>
          </div>

          {/* name field */}
          <div className="space-y-4">
           {/* name field */}
<div>
  <label className="block text-sm uppercase tracking-wider mb-2">Full Name</label>
  {/* ✅ stack vertically under 400px */}
  <div className="flex flex-col [@media(min-width:400px)]:flex-row gap-3">
    <input
      value={name}
      onChange={e => { setName(e.target.value); setNameError("") }}
      className="flex-1 px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors"
      placeholder="Your name"
    />
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleUpdateName}
      disabled={nameLoading || name === session.user?.name}
      className="w-full [@media(min-width:400px)]:w-auto px-6 py-3 bg-(--primary) text-(--primary-foreground) uppercase text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
      {nameLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
    </motion.button>
  </div>
</div>

            {/* email — read only */}
            <div>
              <label className="block text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email
              </label>
              <input
                value={session.user?.email || ""}
                readOnly
                className="w-full px-4 py-3 bg-transparent border border-(--border) outline-none text-sm text-(--muted-foreground) cursor-not-allowed"
              />
              <p className="text-xs text-(--muted-foreground) mt-1">Email cannot be changed</p>
            </div>

            {/* password — only for credentials users */}
            {!isGoogleUser && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Password
                  </label>
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="text-xs text-(--primary) hover:underline uppercase tracking-wider">
                    {showPasswordForm ? "Cancel" : "Change"}
                  </button>
                </div>

                {passwordSuccess && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-xs flex items-center gap-1 mb-2">
                    <CheckCircle2 className="w-3 h-3" /> Password changed successfully
                  </motion.p>
                )}

                <AnimatePresence>
                  {showPasswordForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 overflow-hidden">

                      {passwordError && (
                        <div className="flex items-center gap-2 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {passwordError}
                        </div>
                      )}

                      {/* current password */}
                      <div className="relative">
                        <input
                          type={showCurrent ? "text" : "password"}
                          value={currentPassword}
                          onChange={e => setCurrentPassword(e.target.value)}
                          placeholder="Current password"
                          className="w-full px-4 py-3 pr-10 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--muted-foreground)">
                          {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* new password */}
                      <div className="relative">
                        <input
                          type={showNew ? "text" : "password"}
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="New password"
                          className="w-full px-4 py-3 pr-10 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--muted-foreground)">
                          {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* confirm password */}
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
                      />

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleChangePassword}
                        disabled={passwordLoading}
                        className="w-full py-3 bg-(--primary) text-(--primary-foreground) uppercase tracking-wider text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                        {passwordLoading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Changing...</>
                        ) : "Change Password"}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Section 2: Wishlist ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-(--border) bg-(--card) p-6">

          <h2 className="text-xl uppercase tracking-wider mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-(--primary)" />
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="text-xs bg-(--primary) text-(--primary-foreground) px-2 py-0.5 rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </h2>

          {wishlistLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-white/10 mb-2" />
                  <div className="h-4 bg-white/10 mb-1 w-3/4" />
                  <div className="h-3 bg-white/10 w-1/2" />
                </div>
              ))}
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <Heart className="w-12 h-12 opacity-20 text-(--muted-foreground)" />
              <p className="text-lg font-cormorant-garamond">No items in wishlist</p>
              <p className="text-sm text-(--muted-foreground)">
                Save items you love by clicking the heart on product pages
              </p>
              <Link href="/products">
                <button className="mt-2 px-6 py-2 border border-(--primary) text-(--primary) uppercase text-xs tracking-wider hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors">
                  Browse Products
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence>
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative">

                    <Link href={`/products/${item.id}`}>
                      <div className="relative aspect-square bg-(--secondary) overflow-hidden mb-3">
                        <Image
                          urlEndpoint="https://ik.imagekit.io/fashionstylized"
                          alt={item.title}
                          fill={true}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={item.image || "home.jpg"}
                        />
                      </div>
                    </Link>

                    <p className="text-xs text-(--muted-foreground) uppercase tracking-wider">{item.category}</p>
                    <h3 className="text-sm font-cormorant-garamond line-clamp-1 mb-1">{item.title}</h3>
                    <p className="text-sm text-(--primary) mb-3">Rs. {item.price.toLocaleString()}</p>

                    <div className="flex gap-2">
                      {/* add to cart */}
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addItem({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          image: item.image,
                          category: item.category,
                          quantity: 1
                        })}
                        className="flex-1 py-2 bg-(--primary) text-(--primary-foreground) uppercase text-xs tracking-wider flex items-center justify-center gap-1 hover:opacity-90 transition-opacity">
                        <ShoppingBag className="w-3 h-3" />
                        Add
                      </motion.button>

                      {/* remove from wishlist */}
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleRemoveWishlist(item.id)}
                        disabled={removingId === item.id}
                        className="px-3 py-2 border border-(--border) hover:border-red-500/40 hover:text-red-400 transition-colors disabled:opacity-50">
                        {removingId === item.id
                          ? <Loader2 className="w-3 h-3 animate-spin" />
                          : <Trash2 className="w-3 h-3" />
                        }
                      </motion.button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* ── Section 3: Recent Orders ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-(--border) bg-(--card) p-6">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl uppercase tracking-wider flex items-center gap-2">
              <Package className="w-5 h-5 text-(--primary)" />
              Recent Orders
            </h2>
            <Link href="/orders" className="text-xs text-(--primary) hover:underline uppercase tracking-wider flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {ordersLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-white/10 animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <Package className="w-12 h-12 opacity-20 text-(--muted-foreground)" />
              <p className="text-lg font-cormorant-garamond">No orders yet</p>
              <Link href="/products">
                <button className="mt-2 px-6 py-2 border border-(--primary) text-(--primary) uppercase text-xs tracking-wider hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order, index) => (
                <motion.div
                  key={(order._id?.toString() || "12").toUpperCase()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}>
                  <Link href={`/orders/${order._id}`}>
                    <div className="flex items-center justify-between p-4 border border-(--border) hover:border-(--primary) transition-colors group">

                      {/* left — images + info */}
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {order.products.slice(0, 3).map((p, i) => (
                            <div key={i} className="relative w-10 h-10 border-2 border-(--card) bg-(--secondary)">
                              <Image
                                urlEndpoint="https://ik.imagekit.io/fashionstylized"
                                alt={p.title}
                                fill={true}
                                className="w-full h-full object-cover"
                                src={p.image || "home.jpg"}
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-sm font-mono">#{(order._id?.toString().slice(-8) || "12").toUpperCase()}</p>
                          <p className="text-xs text-(--muted-foreground)">
                            {new Date(order.createdAt || new Date()).toLocaleDateString("en-PK", {
  day: "numeric", month: "short", year: "numeric"
})}
                          </p>
                        </div>
                      </div>

                      {/* right — status + total */}
                      <div className="flex items-center gap-3">
                        <span className={`text-xs uppercase tracking-wider px-2 py-0.5 border hidden sm:block ${statusColors[order.status] || statusColors.pending}`}>
                          {order.status}
                        </span>
                        <p className="text-sm text-(--primary) font-cormorant-garamond">
                          Rs. {order.totalAmount.toLocaleString()}
                        </p>
                        <ChevronRight className="w-4 h-4 text-(--muted-foreground) group-hover:text-(--primary) group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Section 4: Danger Zone ── */}
        <motion.div
        id="dangerzone"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border border-red-500/20 bg-(--card) p-6 scroll-mt-24">

          <h2 className="text-xl uppercase tracking-wider mb-6 text-red-400 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            {/* sign out */}
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Sign Out</p>
              <p className="text-xs text-(--muted-foreground)">Sign out of your account on this device</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-6 py-3 border border-(--border) hover:border-(--primary) uppercase text-xs tracking-wider transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </motion.button>
          </div>

          <div className="border-t border-red-500/20 mt-6 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            {/* delete account */}
            <div className="flex-1">
              <p className="text-sm font-medium text-red-400 mb-1">Delete Account</p>
              <p className="text-xs text-(--muted-foreground)">
                Permanently delete your account and all data. This cannot be undone.
              </p>
            </div>

            {!showDeleteConfirm ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-6 py-3 border border-red-500/40 text-red-400 hover:bg-red-500/10 uppercase text-xs tracking-wider transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-3 border border-(--border) uppercase text-xs tracking-wider hover:border-(--primary) transition-colors">
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white uppercase text-xs tracking-wider hover:bg-red-600 transition-colors disabled:opacity-60">
                  {deleteLoading
                    ? <Loader2 className="w-3 h-3 animate-spin" />
                    : <Trash2 className="w-3 h-3" />
                  }
                  Confirm Delete
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  )
}