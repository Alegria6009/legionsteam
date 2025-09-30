import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "";
MONGODB_URI = (MONGODB_URI || "").trim();

if (MONGODB_URI && /\/\s*$/.test(MONGODB_URI)) {
    MONGODB_URI = MONGODB_URI.replace(/\/+$/, "") + "/marketplace?retryWrites=true&w=majority";
}

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI (or MONGO_URI) environment variable in .env");
}

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
    if (cached.conn) {
        console.log("MongoDB: using cached connection");
        return cached.conn;
    }
    if (!cached.promise) {
        console.log("MongoDB: connecting to", MONGODB_URI.split('@').pop().slice(0, 60) + '...');
        cached.promise = mongoose.connect(MONGODB_URI, {}).then((m) => {
            console.log("MongoDB: connected");
            return m;
        }).catch(err => {
            console.error("MongoDB: connection error", err);
            throw err;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;