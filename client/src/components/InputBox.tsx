import { useState } from "react";

type Props = {
    onSend: (text: string) => void;
};

const InputBox = ({ onSend }: Props) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    return (
        <div className="flex p-4 border-t">
            <input
                className="flex-1 border rounded px-3 py-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
            />
            <button
                onClick={handleSend}
                className="ml-2 bg-blue-500 text-white px-4 rounded"
            >
                Send
            </button>
        </div>
    );
};

export default InputBox;