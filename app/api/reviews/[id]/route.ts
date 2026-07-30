import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { recalculateProductRating } from "@/lib/review-helpers";
import Review from "@/models/Review";

const updateReviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5).optional(),
  title: z.string().trim().max(100).optional(),
  comment: z.string().trim().min(5).max(1000).optional(),
  images: z.array(z.string().url()).max(4).optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

// PUT /api/reviews/[id] — logged-in owner only (guests can't edit, only delete-and-repost)
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Login required to edit a review" }, { status: 401 });
    }

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (String(review.userId) !== String((session.user as any).id)) {
      return NextResponse.json({ error: "You can only edit your own review" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateReviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    Object.assign(review, parsed.data);
    await review.save();

    await recalculateProductRating(review.productId);

    return NextResponse.json({ review });
  } catch (err) {
    console.error("PUT /api/reviews/[id] error:", err);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE /api/reviews/[id] — logged-in owner only
export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Login required to delete a review" }, { status: 401 });
    }

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (String(review.userId) !== String((session.user as any).id)) {
      return NextResponse.json({ error: "You can only delete your own review" }, { status: 403 });
    }

    const productId = review.productId;
    await review.deleteOne();
    await recalculateProductRating(productId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/reviews/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}