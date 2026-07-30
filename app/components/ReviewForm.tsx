"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Loader2, AlertCircle, CheckCircle2, ImagePlus, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { apiClient } from "@/lib/api-client"

type Props = {
  productId: string
  onSubmitted?: () => void
}

export default function ReviewForm({ productId, onSubmitted }: Props) {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user

  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    if (images.length + files.length > 2) {
      setError("You can upload up to 2 images")
      return
    }

    setUploading(true)
    setError("")
    try {
      const authRes = await fetch("/api/imagekit/auth")
      const auth = await authRes.json()

      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileName", file.name)
        formData.append("publicKey", auth.publicKey)
        formData.append("signature", auth.signature)
        formData.append("expire", auth.expire)
        formData.append("token", auth.token)

        const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
          method: "POST",
          body: formData,
        })
        const uploadData = await uploadRes.json()
        if (uploadData.url) uploaded.push(uploadData.url)
      }

      setImages(prev => [...prev, ...uploaded])
    } catch {
      setError("Image upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  function removeImage(url: string) {
    setImages(prev => prev.filter(img => img !== url))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (rating < 1) {
      setError("Please select a star rating")
      return
    }
    if (!isLoggedIn && !name.trim()) {
      setError("Please enter your name")
      return
    }
    if (comment.trim().length < 5) {
      setError("Please write a slightly longer review")
      return
    }

    setSubmitting(true)
    try {
      const res = await apiClient.createReview({
        productId,
        name: isLoggedIn ? undefined : name.trim(),
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
        images,
      })

      if (!res.success) {
        setError(res.error || "Something went wrong. Please try again.")
        return
      }

      setSuccess(true)
      setName("")
      setRating(0)
      setTitle("")
      setComment("")
      setImages([])
      onSubmitted?.()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-(--border) bg-(--card) p-8 text-center">
        <CheckCircle2 className="w-8 h-8 text-(--primary) mx-auto mb-3" />
        <p className="text-(--foreground) font-cormorant-garamond text-xl">Thanks for your review!</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-3 text-xs uppercase tracking-wider text-(--muted-foreground) hover:text-(--primary) transition-colors">
          Write another review
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-(--border) bg-(--card) p-6 sm:p-8 space-y-5">

      <h3 className="text-2xl font-cormorant-garamond">Write a Review</h3>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Only shown for guests */}
      {!isLoggedIn && (
        <div>
          <label className="block text-sm uppercase tracking-wider mb-2">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={60}
            placeholder="e.g. Ahmed"
            className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
          />
        </div>
      )}

      <div>
        <label className="block text-sm uppercase tracking-wider mb-2">
          Rating <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(n => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={"Rate " + n + " star" + (n === 1 ? "" : "s")}
                className="p-0.5">
                <Star
                size={26}
                className={
                  n <= (hoverRating || rating)
                    ? "fill-(--primary) text-(--primary)"
                    : "text-(--muted-foreground)"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wider mb-2">Title (optional)</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={100}
          placeholder="Sum it up in a few words"
          className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wider mb-2">
          Your Review <span className="text-red-400">*</span>
        </label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="What did you like or dislike?"
          className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground) resize-none"
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wider mb-2">Photos (optional, up to 2)</label>
        <div className="flex flex-wrap gap-3">
          {images.map(url => (
            <div key={url} className="relative w-16 h-16 shrink-0 border border-(--border)">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                aria-label="Remove image"
                className="absolute -top-2 -right-2 bg-(--destructive) text-(--destructive-foreground) rounded-full w-7 h-7 flex items-center justify-center">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {images.length < 2 && (
            <label className="w-16 h-16 shrink-0 border border-dashed border-(--border) hover:border-(--primary) transition-colors flex items-center justify-center cursor-pointer">
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin text-(--muted-foreground)" />
              ) : (
                <ImagePlus className="w-5 h-5 text-(--muted-foreground)" />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={submitting || uploading}
        className="w-full py-4 bg-(--primary) text-(--primary-foreground) uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </motion.button>
    </motion.form>
  )
}