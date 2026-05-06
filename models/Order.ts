import mongoose from "mongoose";

// ✅ snapshot of product at time of order
// never reference live product — prices change
export interface IOrderProduct {
  productId: mongoose.Types.ObjectId | string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface IOrder {
  userId?: mongoose.Types.ObjectId | string;
  name: string;
  email: string;
  products: IOrderProduct[];
  address: string;
  city: string;
  postalCode: string;
  mobileNumber: string;
  paymentMethod: "COD" | "online";
  isPaid: boolean;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderProductSchema = new mongoose.Schema<IOrderProduct>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  quantity: { type: Number, required: true, min: 1 },
})

const orderSchema = new mongoose.Schema<IOrder>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  products: { type: [orderProductSchema], required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  paymentMethod: { type: String, enum: ["COD", "online"], default: "COD" },
  isPaid: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  totalAmount: { type: Number, required: true },
}, { timestamps: true })

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;