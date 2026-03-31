import "dotenv/config"; // upload environment variables from .env file

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/db";
import session from "express-session";
import passport from "passport";
import chatRoutes from "./routes/chatRoutes";

connectDB();           // connection to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

app.use(session({
    secret: process.env.JWT_SECRET || "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("API running"));
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));