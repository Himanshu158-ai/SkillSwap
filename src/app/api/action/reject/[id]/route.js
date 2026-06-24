import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Request from "@/models/Request";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request, { params }) {
    try {
        await connectDB();
        const {id} = await params;
        if (!id) {
            return NextResponse.json({ success: false, message: "Request ID is required!" }, { status: 400 });
        }

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

        const request = await Request.findById(id);
        if (!request) {
            return NextResponse.json({ success: false, message: "Request not found!" }, { status: 404 });
        }

        if (request.receiverId.toString() !== userId) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        request.status = "rejected";
        await request.save();

        return NextResponse.json({ success: true, message: "Request rejected successfully!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Internal server error!" }, { status: 500 });
    }
}