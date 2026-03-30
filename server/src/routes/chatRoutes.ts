import { Router } from "express";
import { sendMessage } from "../controllers/chatController";

const router = Router();

router.post("/", sendMessage);

// recupera tutte le conversazioni
router.get("/", async (req, res) => {
    const conversations = await (await import("../models/Conversation")).default.find();
    res.json(conversations);
});

// recupera singola conversazione
router.get("/:id", async (req, res) => {
    const conversation = await (await import("../models/Conversation")).default.findById(req.params.id);
    res.json(conversation);
});

export default router;