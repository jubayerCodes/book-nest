import { checkAdminAccess } from "@/lib/auth/checkAdmin";
import UserModel from "@/lib/mongoose/models/UserModel";
import { connectDB } from "@/lib/mongoose/mongoose";

export const GET = async (req) => {


    const result = await checkAdminAccess(req);

    if (!result.success) {
        return result.response;
    }

    await connectDB()

    const users = await UserModel.find();
    return Response.json(users);
}