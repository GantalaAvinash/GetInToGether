/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

console.log("MongoDB URL:", MONGODB_URL); // Ensure the environment variable is correctly printed

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "getintogether",
        bufferCommands: false,
        connectTimeoutMS: 30000,
      });

    cached.conn = await cached.promise;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", (error as Error).message);  // Log specific error message
    throw new Error("Failed to connect to MongoDB: " + (error as Error).message);  // Throw error to propagate up
  }

  return cached.conn;
};
