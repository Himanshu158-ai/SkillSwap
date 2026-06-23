import { connectDB } from "@/lib/db";
import Request from "@/models/Request";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        await connectDB();

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

        const requests = await Request.find({ receiverId: userId }).populate({ path: "senderId", select: "name email phone bio location canTeach wantsToLearn" }).select("-password");

        return NextResponse.json(
            { success: true, requests },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Internal server error!" },
            { status: 500 }
        );
    }
}