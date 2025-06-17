import { checkAdminAccess } from "@/lib/auth/checkAdmin";
import AuthorModel from "@/lib/mongoose/models/AuthorModel";
import { connectDB } from "@/lib/mongoose/mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {

    const result = await checkAdminAccess(request);

    if (!result.success) {
        return result.response;
    }

    try {
        await connectDB()
        const body = await request.json();

        const { author_name, author_status, author_featured } = body;

        console.log({ author_name, author_status, author_featured });

        if (!author_name) {
            return NextResponse.json({ error: 'Author name is required' }, { status: 400 });
        }

        const existingAuthor = await AuthorModel.findOne({ author_name })

        if (existingAuthor) {
            return NextResponse.json({ message: 'Author already exists', author: existingAuthor, exist: true });
        }

        const newAuthor = await AuthorModel.create({ author_name, author_status, author_featured });

        return NextResponse.json({ success: true, author: newAuthor }, { status: 201 });
    } catch (error) {
        console.error("Author creation error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};