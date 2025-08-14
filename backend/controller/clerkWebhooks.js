import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        const webHooks = new Webhook(process.env.CLERK_WEBHOOKS);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        const payload = req.body; // Should be raw Buffer if middleware is set
        const event = await webHooks.verify(payload, headers);
        const { data, type } = event;

        //console.log(data);
        
        //--------Old one -------------//
        // const userData = {
        //     email: data.email_addresses[0].email_address,
        //     username: data.first_name + " " + data.last_name,
        //     image: data.image_url,
        // };


        //----------New One -----------//
        const userData = {
            _id: data.id,
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            email: data.email_addresses?.[0]?.email_address || "defaultmail@gmail.com",
            image: data.image_url || null,
        }
        console.log(userData);
        
        switch (type) {
            case "user.created":
                await User.create({ ...userData, _id: data.id });
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
            default:
                console.log(`Unhandled event type: ${type}`);
                break;
        }

        res.json({ success: true, message: "Webhook received" });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebHooks;
