import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type BuyNowItem = {
  id: string
  title: string
  price: number
  image: string
  category: string
  quantity: number
  color?: string
}

type BuyNowStore = {
  item: BuyNowItem | null
  setItem: (item: BuyNowItem) => void
  clearItem: () => void
}

export const useBuyNowStore = create<BuyNowStore>()(
  persist(
    (set) => ({
      item: null,
      setItem: (item) => set({ item }),
      clearItem: () => set({ item: null }),
    }),
    {
      name: "buynow-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)