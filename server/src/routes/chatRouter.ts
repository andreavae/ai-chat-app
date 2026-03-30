import { Router } from "express";
import { askAI } from "../services/aiService";

const router = Router();

router.post("/", async (req, res) => {
    const { message, history } = req.body;

    const reply = await askAI(message, history);

    res.json({ reply });
});

export default router;