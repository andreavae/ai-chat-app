import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import { askAI } from "../services/aiService";

export const sendMessage = async (req: Request, res: Response) => {
    const { message, conversationId } = req.body;
    const userId = (req as any).user?.id || "demo-user";

    try {
        let conversation;

        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
        }

        if (!conversation) {
            conversation = new Conversation({
                userId,
                messages: [],
            });
        }

        // aggiungi messaggio utente
        conversation.messages.push({
            role: "user",
            content: message,
        });

        // context ultimi 10 messaggi
        const history = conversation.messages.slice(-10);

        const reply = await askAI(
            message,
            history.map((m) => ({
                text: m.content,
                isUser: m.role === "user",
            }))
        );

        // aggiungi risposta AI
        conversation.messages.push({
            role: "assistant",
            content: reply,
        });

        await conversation.save();

        res.json({
            reply,
            conversationId: conversation._id,
            messages: conversation.messages,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Chat error" });
    }
};