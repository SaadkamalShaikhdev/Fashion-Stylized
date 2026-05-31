import { Metadata } from "next"
import ProductDetail from "./ProductDetail"

type Props = {
  params: Promise<{ id: string }>
}

// ✅ dynamic metadata from DB
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  try {
    // fetch product directly — no apiClient on server, use fetch
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/products?id=${id}`,
      { cache: "no-store" }
    )
    const data = await res.json()
    const product = data.data

    if (!product) {
      return {
        title: "Product Not Found | Fashion Stylized",
      }
    }

    return {
      title: `${product.title} | Fashion Stylized`,
      description: product.description?.slice(0, 160),
      keywords: `${product.title}, ${product.category}, premium accessories, Fashion Stylized`,
      openGraph: {
        title: product.title,
        description: product.description?.slice(0, 160),
        images: product.images?.[0] ? [{ url: product.images[0] }] : [],
        type: "website",
      },
    }
  } catch {
    return {
      title: "Product | Fashion Stylized",
      description: "Premium accessories at Fashion Stylized",
    }
  }
}

export default function ProductPage() {
  return <ProductDetail />
}