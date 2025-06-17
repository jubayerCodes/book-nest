import AuthorModel from "@/lib/mongoose/models/AuthorModel";
import { connectDB } from "@/lib/mongoose/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req) => {

    try {
        await connectDB()
        const authors = await AuthorModel.find()
        return NextResponse.json({ success: true, authors: authors }, { status: 201 });
    } catch (error) {
        console.error("Authors find error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}