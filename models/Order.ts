import mongoose from "mongoose";
import { IProduct } from "./Product";

export interface IOrder {
    name: string;
    email: string;
    products: [IProduct]
    address: string;
    mobileNumber: string;
    paymentMethod: string;
    isPaid: boolean;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date; 
}

const orderSchema = new mongoose.Schema<IOrder> ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    products: [{ type: Object, required: true }],
    address: {type: String, required: true},
    mobileNumber: {type: String, required: true},
    paymentMethod: {type: String, required: true},
    isPaid: {type: Boolean, default: false}
}, { timestamps: true
})

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;