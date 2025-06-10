import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opkciwj.mongodb.net/bookNestDB?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}