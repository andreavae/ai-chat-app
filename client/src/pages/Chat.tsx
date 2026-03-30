import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/Chatbox";
import InputBox from "../components/InputBox";
import API from "../services/api";

const Chat = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [params] = useSearchParams();
    const navigate = useNavigate();

    // ✅ Salva il token dal URL
    useEffect(() => {
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
            // Pulisci l'URL dal token
            window.history.replaceState({}, document.title, "/chat");
        } else {
            // Se non c'è token, reindirizza al login
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                navigate("/");
            }
        }
    }, [params, navigate]);

    const loadConversation = async (id: string) => {
        const token = localStorage.getItem("token");
        const res = await API.get(`/chat/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data.messages);
        setConversationId(id);
    };

    const sendMessage = async (text: string) => {
        const token = localStorage.getItem("token");
        const res = await API.post("/chat", {
            message: text,
            conversationId,
        }, {
            headers: { Authorization: `Bearer ${token}` }
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