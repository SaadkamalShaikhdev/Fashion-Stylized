import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ success: false, error: "Product ID required" }, { status: 400 })
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // ✅ toggle — if exists remove, if not add
    const exists = user.wishlist?.includes(productId)

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (id: string) => id.toString() !== productId
      )
    } else {
      user.wishlist = [...(user.wishlist || []), productId]
    }

    await user.save()

    return NextResponse.json({
      success: true,
      action: exists ? "removed" : "added",
      wishlist: user.wishlist
    }, { status: 200 })

  } catch (error) {
    console.error("Wishlist toggle error:", error)
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectToDatabase()
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // populate product details
    const user = await User.findById(session.user.id)
      .populate("wishlist")
      .lean()

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: user.wishlist || []
    }, { status: 200 })

  } catch (error) {
    console.error("Get wishlist error:", error)
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
  }
}