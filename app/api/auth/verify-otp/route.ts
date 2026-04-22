import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import constants from "node:constants";


export async function POST(request: NextRequest){
    try {
        const {userId, otp} = await request.json();

        if (!userId || !otp) {
      return NextResponse.json({
        success: false,
        error: "userId and otp are required",
      }, { status: 400 });
    }
       await connectToDatabase();

    const user = await User.findById(userId);

 if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      }, { status: 404 });
    }

 if (user.isVerified) {
      return NextResponse.json({
        success: true,
        message: "Email already verified, please login",
      }, { status: 200 });
    }

     if (!user.otpExpiry || new Date() > user.otpExpiry) {
      return NextResponse.json({
        success: false,
        error: "OTP has expired, please request a new one",
      }, { status: 410 });
    }

       // check OTP match
    if (user.otp !== otp) {
      return NextResponse.json({
        success: false,
        error: "Invalid OTP",
      }, { status: 400 });
    }

    // Mark user as verified and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

     return NextResponse.json({
      success: true,
      message: "Email verified successfully, you can now login",
    }, { status: 200 });


    } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to verify OTP' }, { status: 500 });

}

}