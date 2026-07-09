import type { IProduct } from '@/models/Product'

export interface ProductOffer {
  showOffer: boolean
  displayPrice: number
  originalPrice: number
  savings: number
  discountPercent: number
  label: string
}

const OFFER_CATEGORIES = ['Watches', 'Glasses', 'Wallets']
const OFFER_PERCENT = 12

export function getProductOffer(product: Partial<IProduct> | null | undefined): ProductOffer {
  const originalPrice = Number(product?.price ?? 0)

  if (!originalPrice || originalPrice <= 0) {
    return {
      showOffer: false,
      displayPrice: 0,
      originalPrice: 0,
      savings: 0,
      discountPercent: 0,
      label: ''
    }
  }

  const category = (product?.category ?? '').trim()
  const title = (product?.title ?? '').toLowerCase()
  const stock = Number(product?.stock ?? 0)
  const isTrending = Boolean(product?.isTrending)

  const qualifies =
    (isTrending && stock > 0 && stock <= 8) ||
    (OFFER_CATEGORIES.includes(category) && stock > 0 && stock <= 5) ||
    title.includes('limited') ||
    title.includes('special')

  if (!qualifies) {
    return {
      showOffer: false,
      displayPrice: originalPrice,
      originalPrice,
      savings: 0,
      discountPercent: 0,
      label: ''
    }
  }

  const regularPrice = Math.max(
    originalPrice + 250,
    Math.ceil((originalPrice * 1.25) / 50) * 50
  )

  return {
    showOffer: true,
    displayPrice: originalPrice,
    originalPrice: regularPrice,
    savings: regularPrice - originalPrice,
    discountPercent: Math.round(((regularPrice - originalPrice) / regularPrice) * 100),
    label: 'Limited offer'
  }
}
