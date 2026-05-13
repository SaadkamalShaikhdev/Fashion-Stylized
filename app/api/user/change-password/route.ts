
import { NextRequest,NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })

  const { currentPassword, newPassword } = await request.json()
  await connectToDatabase()

  const user = await User.findById(session.user.id)
  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 400 })

  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()
  return NextResponse.json({ success: true })
}