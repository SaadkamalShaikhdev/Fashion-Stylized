import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic"
// ── GET ──
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id")
    const trending = searchParams.get("trending")
    const limit = parseInt(searchParams.get("limit") || "0") // 0 means no limit

    // single product
    if (id) {
      const product = await Product.findById(id)
      if (!product) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: product }, { status: 200 })
    }

  // build query
const query: Record<string, unknown> = {}
if (trending === "true") query.isTrending = true

// build query chain
let productQuery = Product.find(query).sort({ createdAt: -1 })
if (limit > 0) productQuery = productQuery.limit(limit)

const products = await productQuery.lean()

    return NextResponse.json({ success: true, data: products }, { status: 200 })

  } catch (error) {
    console.error("GET products error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// ── POST ──
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 }) // ✅ 403 not 404
    }

    await connectToDatabase()

    const { title, description, price, images, keyFeatures, category, isTrending, colors , stock} = await request.json()

    if (!title || !description || !price || !category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    

    if (images.length === 0) {
      return NextResponse.json({ success: false, error: "At least one image is required" }, { status: 400 })
    }

    const newProduct = new Product({
      title,
      description,
      price,
      images: images,
      keyFeatures,
      category,
      colors: colors || [],
      isTrending: isTrending || false,
      stock: stock || 5,
    })

    const savedProduct = await newProduct.save()

    return NextResponse.json({ success: true, data: savedProduct }, { status: 201 })

  } catch (error) {
    console.error("POST product error:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}

// ── PUT ──
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    await connectToDatabase()

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const { title, description, price, images, keyFeatures, category, isTrending, colors, stock, expire, token, signature } = await request.json()

    if (!title || !description || !price || !category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // base update fields
    const updateData: Record<string, unknown> = {
      title,
      description,
      price,
      keyFeatures,
      category,
      isTrending,
      images,
      colors: colors || [],
      stock: stock || 5,
    }

    // ✅ fix — if new images provided upload and save URLs
    if (images && images.length > 0) {
     
      if (images.length > 0) {
        updateData.images = images // ✅ now actually saved to DB
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 })

  } catch (error) {
    console.error("PUT product error:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

// ── DELETE ──
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    await connectToDatabase()

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 })

  } catch (error) {
    console.error("DELETE product error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}