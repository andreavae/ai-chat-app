import { useEffect, useState } from "react";
import API from "../services/api";

const Sidebar = ({ onSelect, onNewChat, refreshTrigger, currentId }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);

    useEffect(() => {
        API.get("/chat").then((res) => setConversations(res.data));
    }, [refreshTrigger]);

    return (
        <div className="w-64 bg-gray-900 text-white p-4 flex flex-col h-full border-r border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold mb-6 tracking-wide">AI Chat App</h2>

            <button 
                onClick={onNewChat}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg mb-6 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Nuova Chat
            </button>

            <div className="overflow-y-auto flex-1 space-y-2 pr-1 custom-scrollbar">
                {conversations.map((c) => (
                    <div
                        key={c._id}
                        onClick={() => onSelect(c._id)}
                        className={`cursor-pointer p-3 rounded-lg transition-all duration-200 border border-transparent ${
                            currentId === c._id 
                                ? "bg-gray-800 border-gray-700 shadow-sm" 
                                : "hover:bg-gray-800/80 text-gray-300 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                            <span className="truncate">Chat {c._id.slice(-4)}</span>
                        </div>
                    </div>
                ))}
                
                {conversations.length === 0 && (
                    <div className="text-center text-gray-500 mt-10 text-sm">
                        Nessuna chat trovata.<br/>Scrivi un messaggio per iniziare!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;