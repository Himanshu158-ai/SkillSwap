import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        const user = await User.findById(id).select("-password");
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server Error!" }, { status: 500 });
    }
}