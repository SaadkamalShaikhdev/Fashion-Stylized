"use client"
import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { apiClient } from '@/lib/api-client'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  const handleSubmit = async () => {
    setError(""); // clear previous error

    // frontend validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      

      const data = await apiClient.registerUser({ email, password, name });

      if (!data.success) {
  const errorMsg = Array.isArray(data.error) 
    ? data.error[0] 
    : data.error ?? "Something went wrong";
  setError(errorMsg);
  return;
}

      // redirect to verify page with userId
      router.push(`/verify-email?userId=${data.userId}`);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google");
    setGoogleLoading(false);
  };

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
            <h2 className='font-cormorant-garamond text-6xl text-white mb-4'>Timeless <br /> <span className='text-[#d4af37]'>Elegance</span></h2>
            <p className='text-white/80 max-w-md tracking-wide'>Curated accessories for the discerning individual</p>
          </div>
        </div>
      </motion.div>

      {/* right form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12'>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } }
          }}
          className="w-full max-w-md">

          <motion.div variants={fadeUp} className='mb-10'>
            <h1 className='text-5xl mb-3 font-cormorant-garamond'>Create Account</h1>
            <p className="text-white/60">Join us and explore premium accessories</p>
          </motion.div>

          {/* ── ERROR BOX ── */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 mb-6 text-sm'>
              <AlertCircle className='w-4 h-4 shrink-0' />
              <span>{error}</span>
            </motion.div>
          )}

          <div className='space-y-6'>
            {/* Full Name */}
            <motion.div variants={fadeUp}>
              <label className='block text-sm uppercase tracking-wider mb-2'>Full Name</label>
              <div className='relative'>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className='w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 focus:border-white outline-none transition-colors text-white placeholder:text-white/30'
                  placeholder='John Doe'
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <label className='block text-sm uppercase tracking-wider mb-2'>Email</label>
              <div className='relative'>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className='w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 focus:border-white outline-none transition-colors text-white placeholder:text-white/30'
                  placeholder='your@email.com'
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <label className='block text-sm uppercase tracking-wider mb-2'>Password</label>
              <div className='relative'>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className='w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 focus:border-white outline-none transition-colors text-white placeholder:text-white/30'
                  placeholder='Enter your password'
                />
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={fadeUp}>
              <label className='block text-sm uppercase tracking-wider mb-2'>Confirm Password</label>
              <div className='relative'>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className='w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 focus:border-white outline-none transition-colors text-white placeholder:text-white/30'
                  placeholder='Confirm your password'
                />
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSubmit()}
              disabled={loading}
              className='w-full font-bold cursor-pointer bg-white text-black py-4 uppercase tracking-widest hover:bg-white/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
              {loading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Creating account...
                </>
              ) : "Create Account"}
            </motion.button>

            <motion.div className='flex flex-col gap-6' variants={fadeUp}>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-white/10'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-4 bg-black text-white/40 uppercase tracking-wider'>Or continue with</span>
                </div>
              </div>

              {/* Google button */}
              <button
                onClick={handleGoogle}
                disabled={googleLoading}
                className='py-3 border cursor-pointer border-white/20 hover:border-white transition-colors text-white text-sm uppercase tracking-wider w-full disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
                {googleLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Connecting...
                  </>
                ) : "Google"}
              </button>

              <p className='text-center text-white/60 text-sm'>
                Already have an account? <Link href="/signIn" className='text-white hover:underline'>Sign in</Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SignUp