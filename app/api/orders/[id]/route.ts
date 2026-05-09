// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized"
      }, { status: 401 });
    }

    const order = await Order.findById(params.id).lean();

    if (!order) {
      return NextResponse.json({
        success: false,
        error: "Order not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: order
    }, { status: 200 });

  } catch (error) {
    console.error("GET order error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch order"
    }, { status: 500 });
  }
}