import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { recalculateProductRating } from "@/lib/review-helpers";
import Review from "@/models/Review";

const updateStatusSchema = z.object({
  status: z.enum(["active", "hidden"]),
});

type RouteContext = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "admin") {
    return null;
  }
  return session;
}

// PUT /api/admin/reviews/[id] — toggle visibility, e.g. { status: "hidden" }
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();

    const { id } = await context.params;

    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const review = await Review.findByIdAndUpdate(
      id,
      { status: parsed.data.status },
      { new: true }
    );

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await recalculateProductRating(review.productId);

    return NextResponse.json({ review });
  } catch (err) {
    console.error("PUT /api/admin/reviews/[id] error:", err);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE /api/admin/reviews/[id] — permanently remove a fake/spam review
export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();

    const { id } = await context.params;

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const productId = review.productId;
    await review.deleteOne();
    await recalculateProductRating(productId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/reviews/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}