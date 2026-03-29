import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Missing fields" });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        res.status(201).json({ _id: user._id, email: user.email, token });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};