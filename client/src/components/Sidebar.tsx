import { useEffect, useState } from "react";
import API from "../services/api";

const Sidebar = ({ onSelect, onNewChat, onDeleteChat, refreshTrigger, currentId }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);

    useEffect(() => {
        API.get("/chat").then((res) => setConversations(res.data));
    }, [refreshTrigger]);

    const confirmDelete = (e: any, id: string) => {
        e.stopPropagation();
        setChatToDelete(id);
    };

    const executeDelete = () => {
        if (chatToDelete && onDeleteChat) {
            onDeleteChat(chatToDelete);
        }
        setChatToDelete(null);
    };

    return (
        <div className="w-64 bg-gray-900 text-white p-4 flex flex-col h-full border-r border-gray-800 shadow-xl relative">
            <h2 className="text-xl font-bold mb-6 tracking-wide">AI Chat App</h2>

            <button 
                onClick={onNewChat}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg mb-6 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                New Chat
            </button>

            <div className="overflow-y-auto flex-1 space-y-2 pr-1 custom-scrollbar">
                {conversations.map((c) => (
                    <div
                        key={c._id}
                        onClick={() => onSelect(c._id)}
                        className={`group cursor-pointer p-3 rounded-lg transition-all duration-200 border border-transparent flex items-center justify-between ${
                            currentId === c._id 
                                ? "bg-gray-800 border-gray-700 shadow-sm" 
                                : "hover:bg-gray-800/80 text-gray-300 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                            <span className="truncate">Chat {c._id.slice(-4)}</span>
                        </div>
                        <button 
                            onClick={(e) => confirmDelete(e, c._id)}
                            className={`p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded transition-all ${currentId === c._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            title="Delete chat"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                ))}
                
                {conversations.length === 0 && (
                    <div className="text-center text-gray-500 mt-10 text-sm">
                        No chats found.<br/>Send a message to start!
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {chatToDelete && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-gray-800 text-white rounded-xl shadow-2xl p-6 max-w-sm w-full border border-gray-700">
                        <h3 className="text-xl font-bold mb-2">Conferma Eliminazione</h3>
                        <p className="text-gray-300 mb-6 text-sm">Sei sicuro di voler eliminare questa conversazione? Questa operazione è irreversibile.</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setChatToDelete(null)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Annulla
                            </button>
                            <button 
                                onClick={executeDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors shadow-md flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                Elimina
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;