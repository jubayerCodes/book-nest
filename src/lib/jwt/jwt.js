import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

export const signToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        return null
    }
}