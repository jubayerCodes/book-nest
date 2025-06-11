import { jwtVerify, SignJWT } from "jose";


const SECRET = process.env.JWT_SECRET

export const signToken = async (payload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(SECRET);
};

export const verifyToken = async (token) => {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch (error) {
        return null;
    }
};