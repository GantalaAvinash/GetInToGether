import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser } from "@/lib/actions/user.action";
import { json } from "stream/consumers";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook received: ID ${id}, Data: ${JSON.stringify(evt.data)}`);

  const userData = JSON.stringify(evt.data);
  console.log(`User data: ${userData}`);

  

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;
    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username || "",
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    console.log("Creating user with data:", user);

    try {
      const newUser = await createUser(user);
      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
        return NextResponse.json({ message: "New user created", user: newUser });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error saving user", { status: 500 });
    }
  }

  console.log(`Unhandled event type: ${eventType}`);
  return new Response("Webhook received", { status: 200 });
}
