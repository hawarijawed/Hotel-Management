import { useDebugValue } from "react";
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (res, req) => {
    try {
        //Svix instance with clerk
        const webHooks = new Webhook(process.env.CLERK_WEBHOOKS)

        //Getting headers
        const headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        };

        //Verifying headers
        await webHooks.verify(JSON.stringify(req.body), headers);

        //Gettin data from req body
        const {data, type} = req.body;

        const userData = {
            _id: data._id,
            email: data.email_addresses[0].email_addresse,
            username: data.first_name+" "+data.last_name,
            image: data.image_url,
        }

        //Switch case for different events
        switch (type) {
            case "user.created":
                await User.create(userData);
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }

        res.json({success:true, message:"Webhook received"})
    } catch (error) {
        console.log("Error: ",error.message)
        res.json({success:false, message:error.message});
    }
}

export default clerkWebHooks;