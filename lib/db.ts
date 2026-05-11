import mongoose from 'mongoose';
require("node:dns/promises").setServers(["8.8.8.8", "8.8.4.4"]);
const MONGODB_URI:string = process.env.MONGODB_URI!;

if(!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

let cached =global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(()=>mongoose.connection)
    }
    try {
        cached.conn = await cached.promise;

    } catch (error) {
        cached.promise = null;
        console.log(error);
    }
    return cached.conn;
}