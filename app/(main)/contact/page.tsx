// app/(main)/contact/page.tsx
"use client"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react"
import { useState } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // opens whatsapp with prefilled message
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    const text = `Hi, I'm ${form.name} (${form.email}).\n\n${form.message}`
    window.open(`https://wa.me/923182942654?text=${encodeURIComponent(text)}`, "_blank")
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-card/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] text-(--muted-foreground) mb-4">
            Get in Touch
          </motion.p>
          <h1 className="text-6xl lg:text-7xl font-cormorant-garamond mb-4">Contact Us</h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px bg-(--primary) mx-auto"
          />
        </motion.div>
      </section>

      {/* ── Main content ── */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Left — contact info ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8">

            <motion.div variants={fadeUp}>
              <h2 className="text-3xl font-cormorant-garamond mb-3">We'd love to hear from you</h2>
              <p className="text-(--muted-foreground) text-sm leading-relaxed">
                Have a question about our products or your order? Reach out through any of the channels below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* email */}
            <motion.a
              variants={fadeUp}
              href="mailto:allauddinkamaluddin@gmail.com"
              className="flex items-start gap-5 p-5 border border-(--border) hover:border-(--primary) transition-colors group cursor-pointer block">
              <div className="w-12 h-12 bg-(--primary)/10 flex items-center justify-center flex-shrink-0 group-hover:bg-(--primary)/20 transition-colors">
                <Mail className="w-5 h-5 text-(--primary)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-(--muted-foreground) mb-1">Email</p>
                <p className="text-sm font-medium group-hover:text-(--primary) transition-colors">
                  allauddinkamaluddin@gmail.com
                </p>
                <p className="text-xs text-(--muted-foreground) mt-1">We reply within 24 hours</p>
              </div>
            </motion.a>

            {/* whatsapp */}
            <motion.a
              variants={fadeUp}
              href="https://wa.me/923182942654"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-5 p-5 border border-(--border) hover:border-green-500/60 transition-colors group cursor-pointer block">
              <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-(--muted-foreground) mb-1">WhatsApp</p>
                <p className="text-sm font-medium group-hover:text-green-400 transition-colors">
                  0318 2942654
                </p>
                <p className="text-xs text-(--muted-foreground) mt-1">Chat with us directly</p>
              </div>
            </motion.a>

            {/* location */}
            <motion.a
              variants={fadeUp}
              href="https://maps.google.com/?q=Orangi+Town+Karachi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-5 p-5 border border-(--border) hover:border-(--primary) transition-colors group cursor-pointer block">
              <div className="w-12 h-12 bg-(--primary)/10 flex items-center justify-center flex-shrink-0 group-hover:bg-(--primary)/20 transition-colors">
                <MapPin className="w-5 h-5 text-(--primary)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-(--muted-foreground) mb-1">Location</p>
                <p className="text-sm font-medium group-hover:text-(--primary) transition-colors">
                  H No. 909, Sector 11e, MUhalla Orangi Town, Karachi
                </p>
                <p className="text-xs text-(--muted-foreground) mt-1">View on Google Maps</p>
              </div>
            </motion.a>

            {/* hours */}
            <motion.div
              variants={fadeUp}
              className="flex items-start gap-5 p-5 border border-(--border)">
              <div className="w-12 h-12 bg-(--primary)/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-(--primary)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-(--muted-foreground) mb-1">Business Hours</p>
                <p className="text-sm font-medium">Mon – Sat: 10am – 8pm</p>
                <p className="text-sm text-(--muted-foreground)">Sunday: Closed</p>
              </div>
            </motion.div>

          </motion.div>

          {/* ── Right — message form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-(--border) bg-(--card) p-8">

            <h2 className="text-3xl font-cormorant-garamond mb-2">Send a Message</h2>
            <p className="text-(--muted-foreground) text-sm mb-8">
              Fill the form and we'll send it directly to our WhatsApp.
            </p>

            <div className="space-y-5">

              {/* name */}
              <div>
                <label className="block text-sm uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
                />
              </div>

              {/* email */}
              <div>
                <label className="block text-sm uppercase tracking-wider mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground)"
                />
              </div>

              {/* message */}
              <div>
                <label className="block text-sm uppercase tracking-wider mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 bg-transparent border border-(--border) focus:border-(--primary) outline-none text-sm transition-colors placeholder:text-(--muted-foreground) resize-none"
                />
              </div>

              {/* submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!form.name || !form.email || !form.message || sent}
                className={`w-full py-4 uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed ${
                  sent
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : "bg-(--primary) text-(--primary-foreground) hover:opacity-90 disabled:opacity-50"
                }`}>
                {sent ? (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send via WhatsApp
                  </>
                )}
              </motion.button>

              <p className="text-xs text-(--muted-foreground) text-center">
                This will open WhatsApp with your message pre-filled
              </p>

            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}