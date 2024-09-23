/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import User from "@/lib/models/user.model";
import { connect } from "@/lib/db";

export async function createUser(user: any) {
  try {
    // Step 1: Ensure the MongoDB connection is established
    await connect();
    console.log("Connected to MongoDB");

    // Step 2: Try to create the user
    const newUser = await User.create(user);
    console.log("New user created:", newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error in createUser:", error);  // Improved error logging
    throw new Error(`User creation failed: ${error}`);  // Throw the error to be caught by the calling function
  }
}
