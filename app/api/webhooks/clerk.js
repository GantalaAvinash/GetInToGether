import connectToDatabase from "@/lib/mongodb";
   import User from "@/models/User";
   import { Webhook } from "svix";

   const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

   export default async function handler(req, res) {
       if (req.method === "POST") {
           const payload = req.body;
           const headers = req.headers;

           const wh = new Webhook(webhookSecret);
           let evt;

           try {
               evt = wh.verify(JSON.stringify(payload), headers);
           } catch (err) {
               console.error(err);
               return res.status(400).send("Invalid signature");
           }

           if (evt.type === "user.created" || evt.type === "user.updated") {
               try {
                   await connectToDatabase();
                   const { id, email } = evt.data;
                   await User.findOneAndUpdate(
                       { clerkId: id },
                       { clerkId: id, email },
                       { upsert: true }
                   );
                   return res.status(200).send("User saved");
               } catch (err) {
                   console.error(err);
                   return res.status(500).send("Error saving user");
               }
           }
       } else {
           return res.status(405).send("Method not allowed");
       }
   }