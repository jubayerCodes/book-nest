import { checkAdminAccess } from "@/lib/auth/checkAdmin";
import CategoryModel from "@/lib/mongoose/models/CategoryModel";
import { connectDB } from "@/lib/mongoose/mongoose";
import { NextResponse } from "next/server";



export const GET = async (req) => {
    const result = await checkAdminAccess(req);

    if (!result.success) {
        return result.response;
    }

    try {
        const categories = await CategoryModel.find()
        return NextResponse.json({ success: true, categories: categories }, { status: 201 });
    } catch (error) {
        console.error("Category find error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export const POST = async (request) => {

    const result = await checkAdminAccess(request);

    if (!result.success) {
        return result.response;
    }

    try {
        await connectDB()
        const body = await request.json();

        const { cat_name, cat_status, cat_featured } = body;

        if (!cat_name) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        const existingCategory = await CategoryModel.findOne({ cat_name })

        if (existingCategory) {
            return NextResponse.json({ message: 'Category already exists', category: existingCategory, exist: true });
        }

        const newCategory = await CategoryModel.create({ cat_name, cat_status, cat_featured });

        return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
    } catch (error) {
        console.error("Category creation error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};