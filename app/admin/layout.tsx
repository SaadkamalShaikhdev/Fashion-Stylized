// app/admin/layout.tsx
"use client"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, Package, ShoppingBag,
  ChevronRight, Menu, X, ExternalLink, Loader2
} from "lucide-react"

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  {label: "Settings", href: "/admin/settings", icon: ExternalLink}
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signIn")
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/")
  }, [status, session])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-(--muted-foreground)" />
      </div>
    )
  }

  if (!session || session.user?.role !== "admin") return null

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* logo */}
      <div className="p-6 border-b border-(--border)">
        <p className="text-xs uppercase tracking-widest text-(--muted-foreground) mb-1">Admin Panel</p>
        <p className="text-xl font-cormorant-garamond">Fashion Stylized</p>
      </div>

      {/* nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map(link => {
          const isActive = pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider transition-colors ${
                isActive
                  ? "bg-(--primary) text-(--primary-foreground)"
                  : "text-(--muted-foreground) hover:text-foreground hover:bg-white/5"
              }`}>
              <link.icon className="w-4 h-4" />
              {link.label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* footer */}
      <div className="p-4 border-t border-(--border)">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider text-(--muted-foreground) hover:text-foreground transition-colors">
          <ExternalLink className="w-4 h-4" />
          Back to Store
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-background">

      {/* desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-(--border) bg-(--card) fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-64 bg-(--card) border-r border-(--border) z-50 lg:hidden">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-(--muted-foreground) hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-(--border) bg-(--card) sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <p className="font-cormorant-garamond text-xl">Admin Panel</p>
          <div className="w-5" />
        </header>

        {/* page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}