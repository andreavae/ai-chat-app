import { Router } from "express";
import { sendMessage } from "../controllers/chatController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Proteggi tutte le rotte chat con l'autenticazione
router.use(authMiddleware);

router.post("/", sendMessage);

// recupera tutte le conversazioni dell'utente loggato
router.get("/", async (req, res) => {
    const userId = (req as any).user.id;
    const Conversation = (await import("../models/Conversation")).default;
    const conversations = await Conversation.find({ userId }).sort({ _id: -1 }); // più recenti in alto
    res.json(conversations);
});

// recupera singola conversazione verificando che sia dell'utente loggato
router.get("/:id", async (req, res) => {
    const userId = (req as any).user.id;
    const Conversation = (await import("../models/Conversation")).default;
    const conversation = await Conversation.findOne({ _id: req.params.id, userId });
    
    if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
    }
    
    res.json(conversation);
});

export default router;