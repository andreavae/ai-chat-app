import { useEffect, useState } from "react";
import API from "../services/api";

const Sidebar = ({ onSelect }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);

    useEffect(() => {
        API.get("/chat").then((res) => setConversations(res.data));
    }, []);

    return (
        <div className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-lg mb-4">Chats</h2>

            {conversations.map((c) => (
                <div
                    key={c._id}
                    onClick={() => onSelect(c._id)}
                    className="cursor-pointer p-2 hover:bg-gray-700 rounded"
                >
                    Chat {c._id.slice(-4)}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;