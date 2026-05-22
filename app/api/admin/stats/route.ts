// app/api/admin/stats/route.ts
import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Order from "@/models/Order"
import Product from "@/models/Product"
import User from "@/models/User"
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

    const now = new Date()
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // ── stat cards ──
    const [
      totalOrders,
      totalProducts,
      totalUsers,
      pendingOrders,
      allOrders
    ] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.find({ createdAt: { $gte: last30Days } }).lean()
    ])

    const totalRevenue = allOrders.reduce(
      (sum, o) => sum + (o.totalAmount || 0), 0
    )

    // ── orders + revenue per day last 7 days ──
    const ordersPerDay = await Order.aggregate([
      { $match: { createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          orders: { $sum: 1 },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // ── fill missing days with 0 ──
    const filledDays = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      const found = ordersPerDay.find(d => d._id === dateStr)
      filledDays.push({
        date: date.toLocaleDateString("en-PK", { weekday: "short", day: "numeric" }),
        orders: found?.orders || 0,
        revenue: found?.revenue || 0,
      })
    }

    // ── orders by status ──
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ])

    // ── top categories ──
    const topCategories = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.category",
          count: { $sum: "$products.quantity" },
          revenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
        }
      },
      { $sort: { count: -1 } }
    ])

    // ── low stock products ──
    const lowStock = await Product.find({ stock: { $lte: 5 } })
      .select("title category stock images")
      .sort({ stock: 1 })
      .limit(5)
      .lean()

    // ── recent orders ──
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalOrders,
          totalRevenue,
          totalProducts,
          totalUsers,
          pendingOrders,
        },
        ordersPerDay: filledDays,
        ordersByStatus: ordersByStatus.map(s => ({
          name: s._id,
          value: s.count
        })),
        topCategories: topCategories.map(c => ({
          name: c._id || "unknown",
          orders: c.count,
          revenue: c.revenue
        })),
        lowStock,
        recentOrders,
      }
    })

  } catch (error) {
    console.error("Admin stats error:", error)
    return NextResponse.json({
      success: false,
      error: "Something went wrong"
    }, { status: 500 })
  }
}