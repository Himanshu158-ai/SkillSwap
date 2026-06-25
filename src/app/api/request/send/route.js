import { connectDB } from "@/lib/db";
import Request from "@/models/Request";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request) {
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

        const { receiverId } = await request.json();
        const senderId = userId;

        if (!receiverId) {
            return NextResponse.json(
                { success: false, message: "Receiver ID is required!" },
                { status: 400 }
            );
        }

        if (senderId === receiverId) {
            return NextResponse.json(
                { success: false, message: "You cannot send request to yourself!" },
                { status: 400 }
            );
        }

        const existingRequest = await Request.findOne({
            $or: [
                { senderId, receiverId },
                {
                    senderId: receiverId,
                    receiverId: senderId,
                },
            ],
        });

        if (existingRequest) {
            return NextResponse.json(
                { success: false, message: "Request is already in your inbox!" },
                { status: 400 }
            );
        }

        const newRequest = new Request({
            senderId,
            receiverId,
        });

        await newRequest.save();

        return NextResponse.json(
            { success: true, message: "Request sent successfully!" },
            { status: 201 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Internal server error!" },
            { status: 500 }
        );
    }
}


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

        console.log(userId);

        const requests = await Request.find({ senderId: userId }).populate("receiverId", "name email phone bio location canTeach wantsToLearn").select("-password");

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