"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Menu, User, LogOut, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSession, signOut } from 'next-auth/react'
import { useCartStore } from '@/app/store/cartStore'

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const { itemCount } = useCartStore()

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className='sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-b-foreground/10'>
        <nav className='container mx-auto flex items-center justify-between py-4 px-6'>

          {/* left — logo + links */}
          <div className='flex items-center justify-center gap-20'>
            <div>
              <Link href="/"><Image src="/logo2.png" alt="Logo" width={100} height={40} /></Link>
            </div>
            <ul className='hidden gap-8 lg:flex'>
              <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/products/watches">Watches</Link></li>
              <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/products/wallets">Wallet</Link></li>
              <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/products/glasses">Glasses</Link></li>
              <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/products">Collection</Link></li>
              <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* right — cart + auth */}
          <div className='flex items-center gap-7'>

            {/* cart with badge */}
            <Link href="/cart" className='relative'>
              <ShoppingBag className='h-6 w-6 opacity-70 hover:opacity-100 transition-opacity' />
              {itemCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-(--primary) text-(--primary-foreground) text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold'>
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* ── NOT logged in → Sign In button ── */}
            {!session && (
              <Link
                className="hidden lg:block px-6 py-2 border border-(--primary) text-(--primary) hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors text-sm tracking-wider uppercase"
                href="/signIn">
                Sign In
              </Link>
            )}

            {/* ── Logged in → profile dropdown ── */}
            {session && (
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">

                  {/* avatar — show initial if no image */}
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-(--primary) text-(--primary-foreground) flex items-center justify-center text-sm font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                  )}

                  <span className="text-sm tracking-wider uppercase hidden xl:block">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-background border border-(--border) shadow-xl z-50">
                    
                    <div className="px-4 py-3 border-b border-(--border)">
                      <p className="text-sm font-medium truncate">{session.user?.name}</p>
                      <p className="text-xs text-(--muted-foreground) truncate">{session.user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-(--primary)/10 hover:text-(--primary) transition-colors">
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-(--primary)/10 hover:text-(--primary) transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                        My Orders
                      </Link>

                      {/* admin link — only show if admin */}
                      {session.user?.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-(--primary)/10 hover:text-(--primary) transition-colors border-t border-(--border)">
                          <User className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-(--border) py-1">
                      <button
                        onClick={() => { signOut({ callbackUrl: "/" }); setDropdownOpen(false) }}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full text-left">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className='block lg:hidden'>
              <Menu className='h-6 w-6 opacity-70 hover:opacity-100 transition-opacity cursor-pointer' />
            </button>

          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar