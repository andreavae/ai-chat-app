type Props = {
    text: string;
    isUser: boolean;
};

const Message = ({ text, isUser }: Props) => {
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`px-4 py-3 rounded-2xl max-w-sm font-medium shadow-sm ${isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-700 text-white rounded-bl-none"
                    }`}
            >
                {text}
            </div>
        </div>
    );
};

export default Message;