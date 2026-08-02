"use client"
import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  // lightbox state — holds the image set being viewed + current index within it
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

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

  function openLightbox(images: string[], index: number) {
    setLightbox({ images, index })
  }

  function closeLightbox() {
    setLightbox(null)
  }

  function nextImage(e?: React.MouseEvent) {
    e?.stopPropagation()
    setLightbox(prev =>
      prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : prev
    )
  }

  function prevImage(e?: React.MouseEvent) {
    e?.stopPropagation()
    setLightbox(prev =>
      prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : prev
    )
  }

  // keyboard navigation while lightbox is open
  useEffect(() => {
    if (!lightbox) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightbox])

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
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-(--foreground)">{review.name}</p>
                      <span className="text-xs text-(--muted-foreground)">
                        {new Date(review.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex gap-0.5 mt-2">
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
                  </div>

                  {review.images && review.images.length > 0 && (
                    <button
                      type="button"
                      onClick={() => openLightbox(review.images!, 0)}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-(--border) hover:border-(--primary) transition-colors">
                      <img
                        src={review.images[0]}
                        alt={`${review.name}'s review`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      {review.images.length > 1 && (
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                          +{review.images.length - 1}
                        </span>
                      )}
                    </button>
                  )}
                </div>

                {review.title && (
                  <p className="text-sm font-medium text-(--foreground) line-clamp-1">{review.title}</p>
                )}

                <p className="text-sm text-(--muted-foreground) leading-relaxed line-clamp-4">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 sm:p-10">

            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            {lightbox.images.length > 1 && (
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            <motion.div
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="max-w-3xl max-h-[85vh] w-full flex flex-col items-center gap-4">
              <img
                src={lightbox.images[lightbox.index]}
                alt=""
                className="max-w-full max-h-[75vh] object-contain"
              />
              {lightbox.images.length > 1 && (
                <p className="text-xs text-white/60 uppercase tracking-wider">
                  {lightbox.index + 1} / {lightbox.images.length}
                </p>
              )}
            </motion.div>

            {lightbox.images.length > 1 && (
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                <ChevronRight className="w-7 h-7" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}