import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET(){
    try {
        const cookieStore = await cookies();

        cookieStore.delete("token");

        return NextResponse.json(
            {
                success: true,
                message: "Logout successful"
            }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }

}