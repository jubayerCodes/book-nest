import UserModel from "@/lib/mongoose/models/UserModel";
import { connectDB } from "@/lib/mongoose/mongoose"
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {

    const { id } = await params

    const { user_role } = await req.json();
    
    await connectDB()

    const user = await UserModel.findByIdAndUpdate(
        id,
        { user_role },
        { new: true }
    );

    if (!user) {
        return NextResponse.json({ message: 'User not found', success: false });
    }

    return NextResponse.json({ message: "User updated", success: true, user });
}