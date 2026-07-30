"use client"
import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Star, Trash2, EyeOff, Eye, Loader2, AlertTriangle, MessageSquare } from "lucide-react"
import { Image } from "@imagekit/next"
import { apiClient } from "@/lib/api-client"

interface AdminReview {
  _id: string
  name: string
  rating: number
  title?: string
  comment: string
  status: "active" | "hidden"
  createdAt: string
  productId: { _id: string; title: string; images?: string[] } | null
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<AdminReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [actioningId, setActioningId] = useState<string | null>(null)

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    setError("")
    const res = await apiClient.getAdminReviews({ status: statusFilter || undefined })
    if (res.success) {
      setReviews(res.data.reviews)
    } else {
      setError(res.error || "Failed to fetch reviews")
    }
    setLoading(false)
  }, [statusFilter])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  async function toggleStatus(review: AdminReview) {
    setActioningId(review._id)
    const newStatus = review.status === "active" ? "hidden" : "active"
    await apiClient.setReviewStatus(review._id, newStatus)
    await fetchReviews()
    setActioningId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm("Permanently delete this review? This can't be undone.")) return
    setActioningId(id)
    await apiClient.deleteAdminReview(id)
    await fetchReviews()
    setActioningId(null)
  }

  return (
    <motion.div variants={fadeUp} className="border border-(--border) bg-(--card) p-6">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <h2 className="text-sm uppercase tracking-wider text-(--muted-foreground) flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-(--primary)" />
          Reviews
        </h2>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 bg-(--secondary) border border-(--border) focus:border-(--primary) outline-none text-xs uppercase tracking-wider transition-colors cursor-pointer">
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-(--muted-foreground)" />
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-10">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={fetchReviews}
            className="px-4 py-2 border border-(--border) hover:border-(--primary) text-xs uppercase tracking-wider transition-colors">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <p className="text-(--muted-foreground) text-sm text-center py-10">
          No reviews {statusFilter ? `with status "${statusFilter}"` : "yet"}.
        </p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="space-y-3">
          {reviews.map(review => (
            <div
              key={review._id}
              className="flex items-center gap-4 p-3 border border-(--border) hover:border-(--primary)/40 transition-colors">

              {/* product thumbnail */}
              <div className="relative w-12 h-12 flex-shrink-0 bg-(--secondary)">
                {review.productId?.images?.[0] && (
                  <Image
                    urlEndpoint="https://ik.imagekit.io/fashionstylized"
                    alt={review.productId.title}
                    fill={true}
                    sizes="48px"
                    className="w-full h-full object-cover"
                    src={review.productId.images[0]}
                  />
                )}
              </div>

              {/* content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-(--foreground) line-clamp-1">
                    {review.productId?.title || "Deleted product"}
                  </span>
                  <span className="text-xs text-(--muted-foreground)">— {review.name}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star
                        key={n}
                        size={11}
                        className={
                          n <= review.rating
                            ? "fill-(--primary) text-(--primary)"
                            : "text-(--muted-foreground)"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-(--muted-foreground) line-clamp-1 mt-0.5">
                  {review.title ? `${review.title} — ` : ""}{review.comment}
                </p>
              </div>

              {/* status */}
              <span
                className={`text-xs uppercase px-2 py-0.5 border flex-shrink-0 ${
                  review.status === "active"
                    ? "text-green-400 border-green-500/40 bg-green-500/10"
                    : "text-(--muted-foreground) border-(--border) bg-white/5"
                }`}>
                {review.status}
              </span>

              {/* actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleStatus(review)}
                  disabled={actioningId === review._id}
                  title={review.status === "active" ? "Hide review" : "Unhide review"}
                  className="w-8 h-8 border border-(--border) hover:border-(--primary) transition-colors flex items-center justify-center disabled:opacity-50">
                  {actioningId === review._id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : review.status === "active" ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  disabled={actioningId === review._id}
                  title="Delete review"
                  className="w-8 h-8 border border-(--destructive)/40 text-(--destructive) hover:bg-(--destructive)/10 transition-colors flex items-center justify-center disabled:opacity-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}