// components/admin/ImageUpload.tsx
"use client"
import { useState, useRef } from "react"

import { upload, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitUploadNetworkError, ImageKitServerError, Image } from "@imagekit/next"
import { Upload, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  images: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
}

const ImageUpload = ({ images, onChange, maxImages = 4 }: Props) => {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // ✅ new SDK authenticator
  const authenticator = async () => {
    const response = await fetch("/api/imagekit/auth")
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Auth failed: ${errorText}`)
    }
     const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
  }

  const uploadFile = async (file: File): Promise<string> => {
    const authParams = await authenticator()

    const uploadResponse = await upload({
      ...authParams,
      file,
      fileName: `product_${Date.now()}_${file.name}`,
      folder: "/products",
      onProgress: (event) => {
        setProgress(Math.round((event.loaded / event.total) * 100))
      },
    })

    if (!uploadResponse.url) throw new Error("Upload failed — no URL returned")
    return uploadResponse.url
  }

  const handleFiles = async (files: FileList) => {
    setUploadError("")
    setProgress(0)

    const remaining = maxImages - images.length
    if (remaining <= 0) {
      setUploadError(`Maximum ${maxImages} images allowed`)
      return
    }

    const filesToUpload = Array.from(files).slice(0, remaining)
    const validFiles = filesToUpload.filter(f => f.type.startsWith("image/"))

    if (validFiles.length === 0) {
      setUploadError("Please select valid image files")
      return
    }

    setUploading(true)
    try {
      // upload one by one to show accurate progress
      const uploadedUrls: string[] = []
      for (const file of validFiles) {
        const url = await uploadFile(file)
        uploadedUrls.push(url)
      }
      onChange([...images, ...uploadedUrls])
    } catch (error) {
      // ✅ handle specific ImageKit errors
      if (error instanceof ImageKitAbortError) {
        setUploadError("Upload was cancelled")
      } else if (error instanceof ImageKitInvalidRequestError) {
        setUploadError("Invalid request — check file type or size")
      } else if (error instanceof ImageKitUploadNetworkError) {
        setUploadError("Network error — check your connection")
      } else if (error instanceof ImageKitServerError) {
        setUploadError("ImageKit server error — try again")
      } else {
        setUploadError("Upload failed. Please try again.")
      }
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm uppercase tracking-wider">
        Product Images <span className="text-red-400">*</span>
        <span className="text-(--muted-foreground) normal-case tracking-normal ml-2">
          ({images.length}/{maxImages})
        </span>
      </label>

      {/* image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <AnimatePresence>
            {images.map((url, index) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-square bg-(--secondary) overflow-hidden group">
                <Image
                  src={url} urlEndpoint='https://ik.imagekit.io/fashionstylized'
              fill={true}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <span className="absolute top-2 left-2 bg-(--primary) text-(--primary-foreground) text-xs px-2 py-0.5 uppercase tracking-wider">
                    Main
                  </span>
                )}
                <button
                  onClick={() => removeImage(index)}
                  aria-label={"Remove image " + (index + 1)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* upload zone */}
      {images.length < maxImages && (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className={`border-2 border-dashed transition-colors p-8 flex flex-col items-center justify-center gap-3 text-center ${
            uploading
              ? "border-(--border) cursor-not-allowed"
              : "border-(--border) hover:border-(--primary) cursor-pointer"
          }`}>

          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-(--primary) animate-spin" />
              <p className="text-sm text-(--muted-foreground)">Uploading...</p>
              {/* ✅ progress bar */}
              <div className="w-full max-w-xs bg-white/10 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-(--primary)"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <p className="text-xs text-(--muted-foreground)">{progress}%</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-(--primary)/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-(--primary)" />
              </div>
              <div>
                <p className="text-sm font-medium">Click to upload or drag & drop</p>
                <p className="text-xs text-(--muted-foreground) mt-1">
                  PNG, JPG, WEBP up to 10MB — {maxImages - images.length} slot{maxImages - images.length !== 1 ? "s" : ""} remaining
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {uploadError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs">
          {uploadError}
        </motion.p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => e.target.files && handleFiles(e.target.files)}
      />
    </div>
  )
}

export default ImageUpload