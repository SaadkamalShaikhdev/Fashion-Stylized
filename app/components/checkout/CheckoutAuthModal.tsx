// components/checkout/CheckoutAuthModal.tsx
"use client"
import { signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, X, ShoppingBag } from "lucide-react"
import { useState } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
   onSuccess: () => void
}

const CheckoutAuthModal = ({ isOpen, onClose,onSuccess }: Props) => {
  const [googleLoading, setGoogleLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showEmail, setShowEmail] = useState(false)

  const handleGoogle = async () => {
    setGoogleLoading(true)
    const result = await signIn("google", { redirect: false })
    if (result?.ok) {
      onSuccess() // ✅ redirect to checkout
    }
    setGoogleLoading(false)
  }

  const handleEmail = async () => {
    setError("")
    if (!email || !password) {
      setError("Email and password are required")
      return
    }
    setEmailLoading(true)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password")
      setEmailLoading(false)
      return
    }
    // session updates automatically — modal closes
    onClose()
    setEmailLoading(false)
     if (result?.ok) {
      onSuccess() // ✅ redirect to checkout
    }
    
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-background border border-(--border) p-8 shadow-2xl">

            {/* close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-(--muted-foreground) hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            {/* icon + heading */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-(--primary)/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-(--primary)" />
              </div>
              <h2 className="text-3xl font-cormorant-garamond mb-2">Sign in to checkout</h2>
              <p className="text-(--muted-foreground) text-sm">
                Quick sign in to complete your order
              </p>
            </div>

            {/* error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center mb-4">
                {error}
              </motion.p>
            )}

            <div className="space-y-3">

              {/* Google */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogle}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-4 border border-(--border) hover:border-(--primary) transition-colors disabled:opacity-60 uppercase text-sm tracking-wider">
                {googleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {googleLoading ? "Signing in..." : "Continue with Google"}
              </motion.button>

              {/* divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-(--border)" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-background text-(--muted-foreground) uppercase tracking-wider">
                    or
                  </span>
                </div>
              </div>

              {/* email toggle */}
              {!showEmail ? (
                <button
                  onClick={() => setShowEmail(true)}
                  className="w-full py-4 border border-(--border) hover:border-(--primary) transition-colors uppercase text-sm tracking-wider text-(--muted-foreground) hover:text-foreground">
                  Sign in with Email
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleEmail()}
                    className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmail}
                    disabled={emailLoading}
                    className="w-full py-3 bg-(--primary) text-(--primary-foreground) uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                    {emailLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Signing in...
                      </>
                    ) : "Sign In"}
                  </motion.button>
                </motion.div>
              )}

            </div>

            <p className="text-xs text-(--muted-foreground) text-center mt-6">
              No account?{" "}
              <a href="/signUp" target="_blank" className="text-(--primary) hover:underline">
                Create one free
              </a>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CheckoutAuthModal