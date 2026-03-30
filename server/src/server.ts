import dotenv from "dotenv";
dotenv.config(); // upload environment variables from .env file

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/db";
import session from "express-session";
import passport from "passport";
import chatRoutes from "./routes/chatRouter";

connectDB();           // connection to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(session({
    secret: process.env.JWT_SECRET || "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/chat", chatRoutes);