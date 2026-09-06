import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { fbTrack } from '@/lib/fpixel';


export type CartItem = {
  id: string;
  title: string;
  price: number
  image: string
  quantity: number
  category: string
  color?: string
}

type CartStore = {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: CartItem) => void
  removeItem: (id: string, color?: string) => void
  updateQuantity: (id: string, quantity: number, color?: string) => void
  clearCart: () => void
  isInCart: (id: string, color?: string) => boolean
}

function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function calculateItemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

function matchesCartItem(item: CartItem, id: string, color?: string) {
  return item.id === id && (color === undefined || item.color === color)
}

// Fire-and-forget TikTok pixel call — safe to call from a client store
// Fire-and-forget pixel calls — safe to call from a client store
function trackAddToCart(item: CartItem) {
  if (typeof window === "undefined") return
  const w = window as any

  if (w.ttq) {
    w.ttq.track("AddToCart", {
      contents: [
        {
          content_id: item.id,
          content_type: "product",
          content_name: item.title,
        },
      ],
      value: item.price * item.quantity,
      currency: "PKR",
    })
  }

  fbTrack('AddToCart', {
    content_ids: [item.id],
    content_name: item.title,
    content_type: 'product',
    value: item.price * item.quantity,
    currency: 'PKR',
  })
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (item) => {
        const quantity = Math.max(1, Math.floor(item.quantity))
        const existing = get().items.find(i => i.id === item.id && i.color === item.color)
        let updatedItems: CartItem[]

        if (existing) {
          updatedItems = get().items.map(i =>
            i.id === item.id && i.color === item.color ? { ...i, quantity: i.quantity + quantity } : i
          )
        } else {
          updatedItems = [...get().items, { ...item, quantity }]
        }

        set({
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        })

        // Fire pixel event after cart state updates
        trackAddToCart(item)
      },

      removeItem: (id, color) => {
        const updatedItems = get().items.filter(i => !matchesCartItem(i, id, color))
        set({
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        })
      },

      updateQuantity: (id, quantity, color) => {
        if (quantity <= 0) {
          const updatedItems = get().items.filter(i => !matchesCartItem(i, id, color))
          set({
            items: updatedItems,
            total: calculateTotal(updatedItems),
            itemCount: calculateItemCount(updatedItems),
          })
          return
        }

        const updatedItems = get().items.map(i =>
          matchesCartItem(i, id, color) ? { ...i, quantity } : i
        )
        set({
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        })
      },

      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),

      isInCart: (id, color) => get().items.some(i => matchesCartItem(i, id, color)),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)