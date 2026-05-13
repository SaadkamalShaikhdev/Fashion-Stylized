import { NextRequest,NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import Order from "@/models/Order"

export async function DELETE() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })

  await connectToDatabase()
  await User.findByIdAndDelete(session.user.id)
  await Order.updateMany({ userId: session.user.id }, { userId: null })
  return NextResponse.json({ success: true })
}