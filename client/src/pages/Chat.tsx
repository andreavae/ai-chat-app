import { useState } from "react";
import InputBox from "../components/InputBox";
import API from "../services/api";
import ChatBox from "../components/Chatbox";

type MessageType = {
    text: string;
    isUser: boolean;
};

const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const sendMessage = async (text: string) => {
        const newMessages = [...messages, { text, isUser: true }];
        setMessages(newMessages);

        try {
            const res = await API.post("/chat", {
                message: text,
                history: newMessages, // 👈 context window
            });

            setMessages([
                ...newMessages,
                { text: res.data.reply, isUser: false },
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <ChatBox messages={messages} />
            <InputBox onSend={sendMessage} />
        </div>
    );
};

export default Chat;