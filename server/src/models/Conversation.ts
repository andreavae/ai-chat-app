import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
    role: "user" | "assistant";
    content: string;
}

export interface IConversation extends Document {
    userId: string;
    messages: IMessage[];
}

const messageSchema = new Schema<IMessage>({
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
});

const conversationSchema = new Schema<IConversation>({
    userId: { type: String, required: true },
    messages: [messageSchema],
});

export default mongoose.model<IConversation>("Conversation", conversationSchema);