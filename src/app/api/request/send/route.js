import { connectDB } from "@/lib/db";
import Request from "@/models/Request";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { senderId, receiverId } = await request.json();

        if (!receiverId || !senderId) {
            return NextResponse.json(
                { success: false, message: "Sender ID and Receiver ID is required!" },
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
                { success: false, message: "Request already sent!" },
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