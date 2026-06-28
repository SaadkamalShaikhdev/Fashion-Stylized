import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
    deliveryFee: number;
    // Add other settings fields as needed
}

const settingSchema: Schema<ISetting> = new Schema({
    deliveryFee: { type: Number, required: true },
    // Add other settings fields as needed
}, { timestamps: true });

const Setting = mongoose.models.Setting || mongoose.model<ISetting>('Setting', settingSchema);

export default Setting;