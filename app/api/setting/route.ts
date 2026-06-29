import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Setting from "@/models/Setting"

export const dynamic = "force-dynamic"

export async function GET() {
try {
     
await connectToDatabase()
    const setting = await Setting.findOne()
    return NextResponse.json({ success: true, data: setting })

} catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch setting" }, { status: 500 })
}

}

