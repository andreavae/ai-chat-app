import Message from "./Message";

type MessageType = {
    text: string;
    isUser: boolean;
};

type Props = {
    messages: MessageType[];
};

const ChatBox = ({ messages }: Props) => {
    return (
        <div className="flex flex-col gap-2 p-4 h-[80vh] overflow-y-auto">
            {messages.map((msg, index) => (
                <Message key={index} text={msg.text} isUser={msg.isUser} />
            ))}
        </div>
    );
};

export default ChatBox;