import {create} from "zustand"

type BuyNowItem = {
  id: string
  title: string
  price: number
  image: string
  category: string
  quantity: number
}

type BuyNowStore = {
  item: BuyNowItem | null
  setItem: (item: BuyNowItem) => void
  clearItem: () => void
}


export const useBuyNowStore = create<BuyNowStore>((set) => ({
  item: null,
  setItem: (item) => set({ item }),
  clearItem: () => set({ item: null }),
}))
