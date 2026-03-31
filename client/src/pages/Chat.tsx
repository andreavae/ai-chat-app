import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import InputBox from "../components/InputBox";
import API from "../services/api";

const Chat = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);

    const loadConversation = async (id: string) => {
        const res = await API.get(`/chat/${id}`);
        setMessages(res.data.messages);
        setConversationId(id);
    };

    const sendMessage = async (text: string) => {
        const res = await API.post("/chat", {
            message: text,
            conversationId,
        });

        setMessages(res.data.messages);
        setConversationId(res.data.conversationId);
    };

    return (
        <div className="flex h-screen">
            <Sidebar onSelect={loadConversation} />

            <div className="flex flex-col flex-1">
                <ChatBox
                    messages={messages.map((m) => ({
                        text: m.content,
                        isUser: m.role === "user",
                    }))}
                />
                <InputBox onSend={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;