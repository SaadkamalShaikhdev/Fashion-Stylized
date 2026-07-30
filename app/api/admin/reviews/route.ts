import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Review from "@/models/Review";

// GET /api/admin/reviews?status=active&rating=5&page=1&limit=20
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // "active" | "hidden" | null (= all)
    const rating = searchParams.get("rating");
    const productId = searchParams.get("productId");
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Number(searchParams.get("limit") || 20));

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (rating) filter.rating = Number(rating);
    if (productId) filter.productId = productId;

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("productId", "title images")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Review.countDocuments(filter),
    ]);

    return NextResponse.json({
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET /api/admin/reviews error:", err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}