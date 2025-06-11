import UserModel from "../mongoose/models/UserModel";
import { connectDB } from "../mongoose/mongoose";


export async function checkAdminAccess(req) {

    const userEmail = req.headers.get("x-user-email");

    if (!userEmail) {
        return {
            success: false,
            response: new Response(
                JSON.stringify({ message: "Missing user info" }),
                { status: 401 }
            ),
        };
    }

    await connectDB();

    const user = await UserModel.findOne({ user_email: userEmail });

    if (!user || user.user_role !== "admin") {
        return {
            success: false,
            response: new Response(
                JSON.stringify({ message: "Forbidden - Admins only" }),
                { status: 403 }
            ),
        };
    }

    return { success: true, user };
}
