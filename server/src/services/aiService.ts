import axios from "axios";

export const askAI = async (message: string, history: any[]) => {
    try {
        const res = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    ...history.map((m) => ({
                        role: m.isUser ? "user" : "assistant",
                        content: m.text,
                    })),
                    { role: "user", content: message },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.data.choices[0].message.content;
    } catch (err) {
        console.error(err);
        return "Error contacting AI";
    }
};