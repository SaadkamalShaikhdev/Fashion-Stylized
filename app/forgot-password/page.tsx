"use client"
import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Mail, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    if (!email) {
      setError("Email is required")
      return
    }

    setLoading(true)
    try {
      const data = await apiClient.forgotPassword({ email })

      // always show success even if email not found (security)
      setSuccess("If this email exists you will receive an OTP shortly")

      // if userId returned redirect to verify reset otp page
      if (data.userId) {
        setTimeout(() => {
          router.push(`/verify-reset-otp?userId=${data.userId}`)
        }, 2000)
      }

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
      className='min-h-[calc(100vh-75px)] bg-black text-white flex'>

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
              Forgot Your <br /> <span className='text-[#d4af37]'>Password?</span>
            </h2>
            <p className='text-white/80 max-w-md tracking-wide'>
              No worries, we'll send you a verification code
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
            <p className="text-white/60">Enter your email and we'll send you a code</p>
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
            {/* email input */}
            <motion.div variants={fadeUp}>
              <label className='block text-sm uppercase tracking-wider mb-2'>Email</label>
              <div className='relative'>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  type="email"
                  className='w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 focus:border-white outline-none transition-colors text-white placeholder:text-white/30'
                  placeholder='your@email.com'
                />
              </div>
            </motion.div>

            {/* submit button */}
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
                  Sending OTP...
                </>
              ) : "Send OTP"}
            </motion.button>

            {/* back to login */}
            <motion.div variants={fadeUp} className='text-center'>
              <p className='text-white/60 text-sm'>
                Remember your password?{" "}
                <Link href="/signIn" className='text-white hover:underline'>
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ForgotPassword