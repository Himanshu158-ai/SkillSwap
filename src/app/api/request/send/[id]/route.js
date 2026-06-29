import { NextResponse } from "next/server";
import Request from "@/models/Request";
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;


        const requests = await Request.findOne({ receiverId: id, senderId: userId })
        if (requests) {
            return NextResponse.json({ success: true });
        }
        
        return NextResponse.json({ success: false });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch requests" }, { status: 500 });
    }
}