import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth"; // adjust to your actual auth config export
 // adjust to your actual db connect helper
import { reviewRateLimit } from "@/lib/ratelimit"; // after adding it, see rate-limit.additions.ts
import { recalculateProductRating } from "@/lib/review-helpers";
import Review from "@/models/Review";
import { connectToDatabase } from "@/lib/db";

const createReviewSchema = z.object({
  productId: z.string().min(1),
  name: z.string().trim().min(2).max(60).optional(), // required only for guests, checked below
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().max(100).optional(),
  comment: z.string().trim().min(5).max(1000),
  images: z.array(z.string().url()).max(4).optional(),
});

// GET /api/reviews?productId=...&page=1&limit=10
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(50, Number(searchParams.get("limit") || 10));

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const filter = { productId, status: "active" as const };

    const [reviews, total] = await Promise.all([
      Review.find(filter)
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
    console.error("GET /api/reviews error:", err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST /api/reviews — no login required
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    // --- rate limit by IP ---
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { success } = await reviewRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many reviews submitted. Please try again later." },
        { status: 429 }
      );
    }

    const session = await getServerSession(authOptions);
    const body = await req.json();
    const parsed = createReviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { productId, rating, title, comment, images } = parsed.data;

    // Name resolution: logged-in users get their session name, guests must supply one
    let name: string;
    let userId: string | undefined;

    if (session?.user) {
      name = session.user.name || "Anonymous";
      userId = (session.user as any).id;
    } else {
      if (!parsed.data.name) {
        return NextResponse.json(
          { error: "Name is required" },
          { status: 400 }
        );
      }
      name = parsed.data.name;
    }

    const review = await Review.create({
      productId,
      userId,
      name,
      rating,
      title,
      comment,
      images: images || [],
    });

    await recalculateProductRating(productId);

    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}