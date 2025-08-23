// utils/db.js
import mongoose from "mongoose";

let isConnected = false; // Track the connection state globally

const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/HOTEL-BOOKING`);

        isConnected = db.connections[0].readyState === 1;

        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        throw error;
    }
};

export default connectDB;
