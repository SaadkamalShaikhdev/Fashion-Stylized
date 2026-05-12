import { create } from "zustand"

type WishlistItem = {
  id: string
  title: string
  price: number
  image: string
  category: string
}

type WishlistStore = {
  items: WishlistItem[]
  loading: boolean
  setItems: (items: WishlistItem[]) => void
  addWishlistItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  loading: false,
  setItems: (items) => set({ items }),
  addWishlistItem: (item) => set(state => ({ items: [...state.items, item] })),
  removeItem: (id) => set(state => ({
    items: state.items.filter(i => i.id !== id)
  })),
  isInWishlist: (id) => get().items.some(i => i.id === id),
}))