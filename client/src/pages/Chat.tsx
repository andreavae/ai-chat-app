import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/Chatbox";
import InputBox from "../components/InputBox";
import API from "../services/api";

const Chat = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const loadConversation = async (id: string) => {
        const res = await API.get(`/chat/${id}`);
        setMessages(res.data.messages);
        setConversationId(id);
    };

    const startNewChat = () => {
        setMessages([]);
        setConversationId(null);
    };

    const sendMessage = async (text: string) => {
        const res = await API.post("/chat", {
            message: text,
            conversationId,
        });

        // Se era una nuova chat (id null), e ora il backend l'ha creata (res id esiste), diciamo alla sidebar di aggiornarsi
        if (!conversationId && res.data.conversationId) {
            setRefreshTrigger(prev => prev + 1);
        }

        setMessages(res.data.messages);
        setConversationId(res.data.conversationId);
    };

    return (
        <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden font-sans">
            <Sidebar 
                onSelect={loadConversation} 
                onNewChat={startNewChat}
                refreshTrigger={refreshTrigger}
                currentId={conversationId}
            />

            <div className="flex flex-col flex-1 relative bg-white shadow-[-10px_0px_20px_-10px_rgba(0,0,0,0.05)] z-10">
                {/* Header della chat */}
                <header className="bg-white/80 backdrop-blur-md border-b px-6 py-4 sticky top-0 z-20 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${conversationId ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                       <h1 className="text-xl font-semibold text-gray-800 truncate">
                         {conversationId ? `Conversazione: ${conversationId.slice(-4)}` : "Nuova Conversazione"}
                       </h1>
                   </div>
                   <div className="text-sm border py-1 px-3 rounded-full text-gray-500 bg-gray-50 font-medium">
                       Status: {conversationId ? 'Attiva' : 'Pronta'}
                   </div>
                </header>

                <div className="flex flex-col flex-1 overflow-hidden">
                    <ChatBox
                        messages={messages.map((m) => ({
                            text: m.content,
                            isUser: m.role === "user",
                        }))}
                    />
                </div>
                
                <div className="p-4 bg-white border-t">
                    <InputBox onSend={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default Chat;