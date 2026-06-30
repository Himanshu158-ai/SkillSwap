import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();

        const { name, email, password } = await request.json();

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const response = NextResponse.json({
            success: true,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

        const token = generateToken(newUser._id);

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}