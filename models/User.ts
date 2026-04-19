import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password?: string | null; // Password can be null for users authenticated via Google
    role?: 'user' | 'admin';
    provider?: 'local' | 'google';      // Track auth provider
    googleId?: string;                  
    orders?: [string];
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date; 
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, unique: true, sparse: true },
    password: { type: String, required: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    orders: [{ type: String }]
}, { timestamps: true
})

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;