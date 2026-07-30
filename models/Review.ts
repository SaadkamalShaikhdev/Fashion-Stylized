import mongoose, { Schema, models, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  productId: Types.ObjectId;
  userId?: Types.ObjectId; // set only if the reviewer was logged in
  name: string; // pulled from session if logged in, otherwise typed by guest
  rating: number; // 1-5
  title?: string;
  comment: string;
  images?: string[]; // uploaded via ImageKit, same pattern as Product images
  status: "active" | "hidden"; // no approval queue — admin can hide/delete if fake
  createdAt: Date;
  updatedAt: Date;

}

const ReviewSchema = new Schema<IReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 4,
        message: "A review can have at most 4 images",
      },
    },
    status: {
      type: String,
      enum: ["active", "hidden"],
      default: "active",
      index: true,
    },
    
  },
  { timestamps: true }
);

// Fast lookups for "reviews for this product that are visible publicly"
ReviewSchema.index({ productId: 1, status: 1, createdAt: -1 });

const Review = models.Review || model<IReview>("Review", ReviewSchema);

export default Review;