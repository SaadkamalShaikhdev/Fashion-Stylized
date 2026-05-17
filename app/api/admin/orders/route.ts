// app/api/admin/orders/route.ts
import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Order from "@/models/Order"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    await connectToDatabase()
    const orders = await Order.find().sort({ createdAt: -1 }).lean()

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
  }
}