import { signToken } from "@/lib/jwt/jwt"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json()

    const user = {
        user_id: body?.user_id,
        user_email: body?.user_email,
    }
    const token = await signToken({ ...user });

    return NextResponse.json({ token, success: true })
}