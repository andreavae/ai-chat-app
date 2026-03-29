import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
    res.send("API running");
});

// auth routes
app.use("/api/auth", authRoutes);

export default app;