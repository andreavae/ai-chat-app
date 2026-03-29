import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String },
    provider: { type: String, default: "local" },
    providerId: { type: String }
});

export default mongoose.model("User", userSchema);