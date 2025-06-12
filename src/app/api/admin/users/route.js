import { checkAdminAccess } from "@/lib/auth/checkAdmin";
import UserModel from "@/lib/mongoose/models/UserModel";
import { connectDB } from "@/lib/mongoose/mongoose";

export const GET = async (req) => {

    const role = req.nextUrl.searchParams.get("role");

    const result = await checkAdminAccess(req);

    if (!result.success) {
        return result.response;
    }

    await connectDB()

    const users = await UserModel.find({ user_role: role });
    return Response.json(users);
}