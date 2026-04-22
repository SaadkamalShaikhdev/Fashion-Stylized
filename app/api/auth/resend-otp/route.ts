import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { sendOTPEmail } from "@/lib/resend"

export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                error: "userId are required",
            }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json({ success: false, error: "Already verified" }, { status: 400 });
        }

        // generate fresh OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendOTPEmail({
            email: user.email,
            username: user.username,
            otp,
        });

        return NextResponse.json({
            success: true,
            message: "New OTP sent to your email",
        }, { status: 200 });

    } catch (error) {
        console.error("Resend OTP error:", error);
        return NextResponse.json({ success: false, error: 'Failed to resend OTP' }, { status: 500 });

    }
}