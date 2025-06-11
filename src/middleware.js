
import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt/jwt";

export async function middleware(req) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await verifyToken(token);

    if (!decoded) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.user_id);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}


export const config = {
    matcher: [
        "/api/protected/:path*",
    ],
};
