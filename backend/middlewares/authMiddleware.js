import { use } from "react";
import User from "../models/User.js";

//To check if the user is authenticated
export const protect = async (req, res, next) => {
  try {
    // Ensure req.auth exists (from Clerk middleware)
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const userId = req.auth().userId;

    // Look up user in DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found in database" });
    }

    // Attach user to req
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};