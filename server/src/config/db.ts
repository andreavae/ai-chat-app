import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    console.log("Trying to connect to MongoDB with URI:", mongoUri);

    if (!mongoUri) {
        console.error("❌ MONGO_URI is not defined in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};