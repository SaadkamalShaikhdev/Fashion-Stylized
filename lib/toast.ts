// lib/toast.ts
import toast from "react-hot-toast"

export const showToast = {
  // ── cart ──
  addedToCart: () => toast.success("Added to cart"),
  removedFromCart: () => toast.success("Item removed"),
  promoApplied: (discount: number) => toast.success(`${discount}% discount applied`),
  promoInvalid: () => toast.error("Invalid promo code"),
  cartCleared: () => toast.success("Cart cleared"),

  // ── wishlist ──
  addedToWishlist: () => toast.success("Added to wishlist"),
  removedFromWishlist: () => toast.success("Removed from wishlist"),

  // ── auth ──
  loginSuccess: (name: string) => toast.success(`Welcome back, ${name.split(" ")[0]}!`),
  registerSuccess: () => toast.success("Account created successfully"),
  passwordChanged: () => toast.success("Password updated"),
  profileUpdated: () => toast.success("Profile updated"),
  loggedOut: () => toast.success("Signed out"),

  // ── orders ──
  orderPlaced: () => toast.success("Order placed successfully!"),

  // ── admin ──
  productCreated: () => toast.success("Product created"),
  productUpdated: () => toast.success("Product updated"),
  productDeleted: () => toast.success("Product deleted"),
  orderStatusUpdated: () => toast.success("Status updated"),

  // ── generic ──
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  loading: (msg: string) => toast.loading(msg),
  promise: <T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string; error: string }
  ) => toast.promise(promise, msgs),
}