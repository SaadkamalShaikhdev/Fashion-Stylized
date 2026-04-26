"use client"
import { useState, useRef } from 'react'
import { motion } from "framer-motion"
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiClient } from '@/lib/api-client'

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  // handle each OTP box input
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // numbers only

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // only last digit
    setOtp(newOtp)

    // auto move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pasted)) return
    const newOtp = [...otp]
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char
    })
    setOtp(newOtp)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleVerify = async () => {
    setError("")
    setSuccess("")

    const otpString = otp.join("")
    if (otpString.length < 6) {
      setError("Please enter the complete 6-digit OTP")
      return
    }

    if (!userId) {
      setError("Invalid verification link")
      return
    }

    setLoading(true)
    try {
      const data = await apiClient.verifyOTP({ userId, otp: otpString })

      if (!data.success) {
        setError(data.error ?? "Invalid OTP")
        return
      }

      setSuccess("Email verified successfully! Redirecting to login...")
      setTimeout(() => router.push("/signIn"), 2000)

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError("")
    setSuccess("")

    if (!userId) {
      setError("Invalid verification link")
      return
    }

    setResendLoading(true)
    try {
      const data = await apiClient.resendOTP({ userId })

      if (!data.success) {
        setError(data.error ?? "Failed to resend OTP")
        return
      }

      setSuccess("New OTP sent to your email!")
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-black text-white flex items-center justify-center p-6'>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="w-full max-w-md">

        {/* heading */}
        <motion.div variants={fadeUp} className='mb-10 text-center'>
          <h1 className='text-5xl mb-3 font-cormorant-garamond'>Verify Email</h1>
          <p className="text-white/60">Enter the 6-digit code sent to your email</p>
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

        {/* OTP boxes */}
        <motion.div variants={fadeUp} className='flex gap-3 justify-center mb-8'>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className='w-12 h-14 text-center text-xl font-bold bg-transparent border border-white/20 focus:border-white outline-none transition-colors text-white'
            />
          ))}
        </motion.div>

        {/* verify button */}
        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleVerify}
          disabled={loading}
          className='w-full font-bold cursor-pointer bg-white text-black py-4 uppercase tracking-widest hover:bg-white/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4'>
          {loading ? (
            <>
              <Loader2 className='w-4 h-4 animate-spin' />
              Verifying...
            </>
          ) : "Verify Email"}
        </motion.button>

        {/* resend */}
        <motion.div variants={fadeUp} className='text-center'>
          <p className='text-white/60 text-sm'>
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className='text-white hover:underline disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-1'>
              {resendLoading ? (
                <>
                  <Loader2 className='w-3 h-3 animate-spin' />
                  Sending...
                </>
              ) : "Resend OTP"}
            </button>
          </p>
        </motion.div>

      </motion.div>
    </motion.div>
  )
}

export default VerifyEmail