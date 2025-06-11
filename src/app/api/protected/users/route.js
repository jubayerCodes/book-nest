import UserModel from "@/lib/mongoose/models/UserModel";
import { connectDB } from "@/lib/mongoose/mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connectDB()
    const users = await UserModel.find();
    return Response.json(users);
}

export const POST = async (request) => {

    try {
        await connectDB()
        const body = await request.json();

        const { user_name, user_img, user_email, user_id, user_role } = body;

        if (!user_email || !user_id) {
            return NextResponse.json({ error: 'Email and UID are required' }, { status: 400 });
        }


        const existingUser = await UserModel.findOne({ user_email });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists', user: existingUser, exist: true });
        }


        const newUser = await UserModel.create({ user_name, user_img, user_email, user_id, user_role });

        return NextResponse.json({ success: true, user: newUser }, { status: 201 });
    } catch (error) {
        console.error("User creation error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};