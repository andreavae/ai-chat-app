import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport";
import User from "../models/User";
import bcrypt from "bcrypt";

const router = Router();

// ===== REGISTRAZIONE BASE =====
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.json({ _id: user._id, email: user.email, token });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// ===== LOGIN BASE =====
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.password) return res.status(400).json({ error: "Invalid credentials" });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.json({ _id: user._id, email: user.email, token });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// ===== GOOGLE OAUTH =====
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const token = jwt.sign({ id: (req.user as any)._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.redirect(`http://localhost:5173/chat?token=${token}`);
    }
);

// ===== FACEBOOK OAUTH =====
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    (req, res) => {
        const token = jwt.sign({ id: (req.user as any)._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.redirect(`http://localhost:5173/chat?token=${token}`);    }
);

export default router;