import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Order from "@/models/Order"
import Product from "@/models/Product"
import User from "@/models/User"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Setting from "@/models/Setting"

export const dynamic = "force-dynamic"

export async function GET() {
try {
      const session = await getServerSession(authOptions)
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    const setting = await Setting.findOne()
    return NextResponse.json({ success: true, data: setting })

} catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch setting" }, { status: 500 })
}

}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (session?.user?.role !== "admin") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
        }

        // only change delivery fee for now
        await connectToDatabase()
        const { deliveryFee } = await request.json()
        const setting = await Setting.findOne()
        if (!setting) {
            return NextResponse.json({ success: false, error: "Setting not found" }, { status: 404 })
        }
        setting.deliveryFee = deliveryFee
        await setting.save()
        return NextResponse.json({ success: true, data: setting })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update setting" }, { status: 500 })
    }
}