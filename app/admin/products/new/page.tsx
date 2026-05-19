// app/admin/products/new/page.tsx
import ProductForm from "@/app/components/admin/ProductForm"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cormorant-garamond">Add Product</h1>
        <p className="text-sm text-(--muted-foreground) mt-1">
          Fill in the details to add a new product
        </p>
      </div>
      <ProductForm mode="create" />
    </div>
  )
}