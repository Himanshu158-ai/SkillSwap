import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PATCH(request) {

    try {
        await connectDB();
        const {
            phone,
            bio,
            location,
            canTeach,
            wantsToLearn
        } = await request.json();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const user = await User.findOneAndUpdate({ _id: userId }, { phone, bio, location, canTeach, wantsToLearn, isProfileSetup: true }, { new: true }).select("-password");
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server Error!" }, { status: 500 });
    }
}