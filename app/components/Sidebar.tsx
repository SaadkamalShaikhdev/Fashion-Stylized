"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Watch, Glasses, Wallet, LayoutGrid, Mail, User, ShoppingBag, Settings, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/app/store/cartStore";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const navLinks = [
  { label: "Watches", href: "/products/watches", icon: Watch },
  { label: "Glasses", href: "/products/glasses", icon: Glasses },
  { label: "Wallets", href: "/products/wallets", icon: Wallet },
  { label: "Collection", href: "/products", icon: LayoutGrid },
  { label: "Contact", href: "/contact", icon: Mail },
]

const accountLinks = [
  { label: "My Profile", href: "/profile", icon: User },
  { label: "My Orders", href: "/orders", icon: ShoppingBag },
  { label: "Settings", href: "/settings", icon: Settings },
]

const MotionLink = motion(Link);

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { data: session } = useSession()
  const { itemCount } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-black text-white z-50 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}>

            {/* header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              {session ? (
                <div className="flex items-center gap-3">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-(--primary) text-(--primary-foreground) flex items-center justify-center text-sm font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-white/40 truncate max-w-[160px]">{session.user?.email}</p>
                  </div>
                </div>
              ) : (
                <h2 className="text-xl tracking-wider uppercase">Menu</h2>
              )}

              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 transition-colors rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* scrollable content */}
            <div className="flex-1 overflow-y-auto">

              {/* nav links */}
              <div className="p-6 space-y-1">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Shop</p>
                {navLinks.map((item, i) => (
                  <MotionLink
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-3 py-3 px-4 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider">{item.label}</span>
                  </MotionLink>
                ))}
              </div>

              {/* account links */}
              <div className="px-6 py-4 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Account</p>
                <div className="space-y-1">
                  {accountLinks.map((item, i) => (
                    <MotionLink
                      key={item.label}
                      href={session ? item.href : "/signIn"}
                      onClick={onClose}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-3 py-3 px-4 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded">
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm uppercase tracking-wider">{item.label}</span>
                    </MotionLink>
                  ))}

                  {/* cart link with badge */}
                  <MotionLink
                    href="/cart"
                    onClick={onClose}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex items-center gap-3 py-3 px-4 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider">Cart</span>
                    {itemCount > 0 && (
                      <span className="ml-auto bg-(--primary) text-(--primary-foreground) text-xs px-2 py-0.5 rounded-full font-bold">
                        {itemCount}
                      </span>
                    )}
                  </MotionLink>

                  {/* admin link */}
                  {session?.user?.role === "admin" && (
                    <MotionLink
                      href="/admin"
                      onClick={onClose}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-3 py-3 px-4 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm uppercase tracking-wider">Admin Panel</span>
                    </MotionLink>
                  )}
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="p-6 border-t border-white/10 space-y-3">
              {session ? (
                // logged in — show sign out
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); onClose() }}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors uppercase tracking-wider text-sm">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                // not logged in — show sign in + sign up
                <>
                  <Link
                    href="/signIn"
                    onClick={onClose}
                    className="block w-full py-3 text-center border border-(--primary) text-(--primary) hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors uppercase tracking-wider text-sm">
                    Sign In
                  </Link>
                  <Link
                    href="/signUp"
                    onClick={onClose}
                    className="block w-full py-3 text-center bg-(--primary) text-(--primary-foreground) hover:opacity-90 transition-opacity uppercase tracking-wider text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;