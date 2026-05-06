import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);

    const {
      name,
      email,
      products,
      address,
      city,
      postalCode,
      mobileNumber,
      paymentMethod,
    } = await request.json();

    // validate required fields
    if (!name || !email || !products || !address || !city || !mobileNumber) {
      return NextResponse.json({
        success: false,
        error: "All fields are required"
      }, { status: 400 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Cart is empty"
      }, { status: 400 });
    }

    // ✅ calculate total on server — never trust client
    const totalAmount = products.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity, 0
    );

    const newOrder = new Order({
      userId: session?.user?.id || null,
      name,
      email,
      products,
      address,
      city,
      postalCode,
      mobileNumber,
      paymentMethod: paymentMethod || "COD",
      isPaid: false,
      status: "pending",
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: savedOrder._id,
    }, { status: 201 });

  } catch (error) {
    console.error("POST order error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to place order"
    }, { status: 500 });
  }
}