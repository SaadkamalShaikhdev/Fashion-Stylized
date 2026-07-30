import Review from "@/models/Review";
import Product from "@/models/Product";
import { Types } from "mongoose";

/**
 * Recomputes avgRating & reviewCount on the Product document
 * from all currently "active" reviews for that product.
 * Call this after any review create / hide / unhide / delete.
 */
export async function recalculateProductRating(productId: string | Types.ObjectId) {
  const stats = await Review.aggregate([
    {
      $match: {
        productId: new Types.ObjectId(productId),
        status: "active",
      },
    },
    {
      $group: {
        _id: "$productId",
        avgRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const avgRating = stats.length ? Math.round(stats[0].avgRating * 10) / 10 : 0;
  const reviewCount = stats.length ? stats[0].reviewCount : 0;

  await Product.findByIdAndUpdate(productId, { avgRating, reviewCount });
}