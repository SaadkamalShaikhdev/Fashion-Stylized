"use client"
import { apiClient } from '@/lib/api-client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, AlertCircle, CheckCircle2, Truck } from 'lucide-react'
import AdminReviewsTable from '@/app/components/AdminReviewsTable'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

const Setting = () => {
  const [deliveryFee, setDeliveryFee] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("0")

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await apiClient.getAdminSetting()
      if (res.success) {
        setDeliveryFee(res.data.deliveryFee)
        setInputValue(res.data.deliveryFee.toString())
      } else {
        setError(res.error || "Failed to fetch settings")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess("")
      const newFee = parseFloat(inputValue)
      if (isNaN(newFee) || newFee < 0) {
        setError("Please enter a valid delivery fee")
        setLoading(false)
        return
      }
      const res = await apiClient.updateAdminSetting({ deliveryFee: newFee })
      if (res.success) {
        setDeliveryFee(newFee)
        setSuccess("Delivery fee updated successfully")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError(res.error || "Failed to update settings")
      }
    } catch {
      setError("Something went wrong while updating")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-3xl space-y-6">

      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-cormorant-garamond">Settings</h1>
        <p className="text-sm text-(--muted-foreground) mt-1">
          Manage store-wide configuration
        </p>
      </motion.div>

      {/* ── Delivery Fee ── */}
      <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6 max-w-md">
        <h2 className="text-sm uppercase tracking-wider text-(--muted-foreground) mb-6 flex items-center gap-2">
          <Truck className="w-4 h-4 text-(--primary)" />
          Delivery Fee
        </h2>

        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 text-sm mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/40 text-green-400 px-4 py-3 text-sm mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm uppercase tracking-wider mb-2">
              Delivery Fee (Rs.)
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter delivery fee"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={updateSettings}
            disabled={loading}
            className="w-full py-3 bg-(--primary) text-(--primary-foreground) uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Settings"
            )}
          </motion.button>

          <p className="text-xs text-(--muted-foreground) uppercase tracking-wider">
            Current Delivery Fee: Rs. {deliveryFee.toFixed(2)}
          </p>
        </div>
      </motion.div>

      {/* ── Reviews moderation ── */}
      <AdminReviewsTable />

    </motion.div>
  )
}

export default Setting