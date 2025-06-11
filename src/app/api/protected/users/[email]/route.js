import UserModel from "@/lib/mongoose/models/UserModel";
import { connectDB } from "@/lib/mongoose/mongoose"
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    await connectDB()

    const { email } = await params
    const user = await UserModel.findOne({ user_email: email })
    if (!user) {
        return NextResponse.json({ message: 'User not found', exist: false })
    }

    return NextResponse.json({ message: "User found", exist: true, user: user })
}