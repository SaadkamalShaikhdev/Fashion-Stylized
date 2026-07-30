"use client"
import { useEffect, useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, PenLine, X } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import ReviewForm from "./ReviewForm"

interface Review {
  _id: string
  name: string
  rating: number
  title?: string
  comment: string
  images?: string[]
  createdAt: string
}

type Props = {
  productId: string
  avgRating?: number
  reviewCount?: number
}

export default function ReviewList({ productId, avgRating = 0, reviewCount = 0 }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    const res = await apiClient.getReviews(productId, 1, 20)
    if (res.success) {
      setReviews(res.data.reviews)
    }
    setLoading(false)
  }, [productId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 336 // card width + gap
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-(--border) pt-8 sm:pt-10">

      {/* header row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-cormorant-garamond mb-2">Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(n => (
                <Star
                  key={n}
                  size={16}
                  className={
                    n <= Math.round(avgRating)
                      ? "fill-(--primary) text-(--primary)"
                      : "text-(--muted-foreground)"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-(--muted-foreground)">
              {avgRating.toFixed(1)} · {reviewCount} review{reviewCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-5 py-2.5 border border-(--primary) text-(--primary) uppercase text-xs tracking-widest hover:bg-(--primary) hover:text-black transition-colors">
            {showForm ? <X className="w-3.5 h-3.5" /> : <PenLine className="w-3.5 h-3.5" />}
            {showForm ? "Close" : "Write a Review"}
          </motion.button>

          {reviews.length > 1 && (
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll reviews left"
                className="w-11 h-11 border border-(--border) hover:border-(--primary) transition-colors flex items-center justify-center">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll reviews right"
                className="w-11 h-11 border border-(--border) hover:border-(--primary) transition-colors flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* review form */}
      {showForm && (
        <div className="mb-8 max-w-xl">
          <ReviewForm
            productId={productId}
            onSubmitted={() => {
              setShowForm(false)
              fetchReviews()
            }}
          />
        </div>
      )}

      {/* loading state */}
      {loading && (
        <div className="flex gap-4 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-80 shrink-0 h-48 bg-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {/* empty state */}
      {!loading && reviews.length === 0 && (
        <p className="text-(--muted-foreground) text-sm py-6">
          No reviews yet. Be the first to review this product.
        </p>
      )}

      {/* horizontal scrolling carousel */}
      {!loading && reviews.length > 0 && (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {reviews.map(review => (
              <div
                key={review._id}
                className="w-80 shrink-0 snap-start border border-(--border) bg-(--card) p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star
                        key={n}
                        size={13}
                        className={
                          n <= review.rating
                            ? "fill-(--primary) text-(--primary)"
                            : "text-(--muted-foreground)"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-(--muted-foreground)">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {review.title && (
                  <p className="text-sm font-medium text-(--foreground) line-clamp-1">{review.title}</p>
                )}

                <p className="text-sm text-(--muted-foreground) leading-relaxed line-clamp-4">
                  {review.comment}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 pt-1">
                    {review.images.slice(0, 3).map(url => (
                      <img key={url} src={url} alt="" className="w-12 h-12 object-cover border border-(--border)" />
                    ))}
                  </div>
                )}

                <p className="text-xs uppercase tracking-wider text-(--primary)">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  )
}