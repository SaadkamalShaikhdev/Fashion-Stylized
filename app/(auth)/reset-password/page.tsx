"use client"
import { useState } from 'react'
import Image from "next/image"
import { Lock, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from 'next/navigation'
import { apiClient } from '@/lib/api-client'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required")
      return
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!userId) {
      setError("Invalid reset link. Please start again.")
      return
    }

    setLoading(true)
    try {
      const data = await apiClient.resetPassword({ userId, newPassword })

      if (!data.success) {
        setError(data.error ?? "Something went wrong")
        return
      }

      setSuccess("Password reset successfully! Redirecting to login...")
      setTimeout(() => router.push("/signIn"), 2000)

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-black text-white flex'>

      {/* left image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className='hidden lg:block lg:w-1/2 relative bg-black'>
        <Image src="/home.jpg" className='w-full h-full object-cover opacity-50' alt='home' fill={true} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-12">
          <div>
            <h2 className='font-cormorant-garamond text-6xl text-white mb-4'>
              New <br /> <span className='text-[#d4af37]'>Password</span>
            </h2>
            <p className='text-white/80 max-w-md tracking-wide'>
              Choose a strong password to secure your account
            </p>
          </div>
        </div>
      </motion.div>

      {/* right form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12'>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="w-full max-w-md">

          <motion.div variants={fadeUp} className='mb-10'>
            <h1 className='text-5xl mb-3 font-cormorant-garamond'>Reset Password</h1>
            <p className="text-white/60">Enter your new password below</p>
          </motion.div>

          {/* error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 mb-6 text-sm'>
              <AlertCircle className='w-4 h-4 shrink-0' />
              <span>{error}</span>
            </motion.div>
          )}

          {/* success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 bg-green-500/10 border border-green-500/40 text-green-400 px-4 py-3 mb-6 text-sm'>
              <CheckCircle2 className='w-4 h-4 shrink-0' />
              <span>{success}</span>
            </motion.div>
          )}

          <div className='space-y-6'>

            {/* new password */}
            <motion.div variants={fadeUp}>
              <label className='block text-sm uppercase tracking-wider mb-2'>New Password</label>
              <div className='relative'>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className='w-full pl-12 pr-12 py-4 bg-transparent border border-white/20 focus:border-white outline-none transition-colors text-white placeholder:text-white/30'
                  placeholder='Enter new password'
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors'>
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>

              {/* password strength indicator */}
              {newPassword && (
                <div className='mt-2 flex gap-1'>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 transition-colors ${
                        i < getStrength(newPassword)
                          ? getStrengthColor(getStrength(newPassword))
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              )}
              {newPassword && (
                <p className={`text-xs mt-1 ${getStrengthTextColor(getStrength(newPassword))}`}>
                  {getStrengthLabel(getStrength(newPassword))}
                </p>
              )}
            </motion.div>

            {/* confirm password */}
            <motion.div variants={fadeUp}>
              <label className='block text-sm uppercase tracking-wider mb-2'>Confirm Password</label>
              <div className='relative'>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  type={showConfirm ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-4 bg-transparent border outline-none transition-colors text-white placeholder:text-white/30 ${
                    confirmPassword && confirmPassword !== newPassword
                      ? 'border-red-500/60'
                      : 'border-white/20 focus:border-white'
                  }`}
                  placeholder='Confirm new password'
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors'>
                  {showConfirm ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {/* inline mismatch hint */}
              {confirmPassword && confirmPassword !== newPassword && (
                <p className='text-red-400 text-xs mt-1'>Passwords do not match</p>
              )}
            </motion.div>

            {/* submit */}
            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={loading}
              className='w-full font-bold cursor-pointer bg-white text-black py-4 uppercase tracking-widest hover:bg-white/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
              {loading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Resetting...
                </>
              ) : "Reset Password"}
            </motion.button>

            <motion.div variants={fadeUp} className='text-center'>
              <p className='text-white/60 text-sm'>
                Remember your password?{" "}
                <a href="/signIn" className='text-white hover:underline'>Sign in</a>
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// password strength helpers
function getStrength(password: string): number {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

function getStrengthColor(strength: number): string {
  if (strength === 1) return 'bg-red-500'
  if (strength === 2) return 'bg-yellow-500'
  if (strength === 3) return 'bg-blue-500'
  if (strength === 4) return 'bg-green-500'
  return 'bg-white/10'
}

function getStrengthTextColor(strength: number): string {
  if (strength === 1) return 'text-red-400'
  if (strength === 2) return 'text-yellow-400'
  if (strength === 3) return 'text-blue-400'
  if (strength === 4) return 'text-green-400'
  return 'text-white/40'
}

function getStrengthLabel(strength: number): string {
  if (strength === 1) return 'Weak'
  if (strength === 2) return 'Fair'
  if (strength === 3) return 'Good'
  if (strength === 4) return 'Strong'
  return ''
}

export default ResetPassword