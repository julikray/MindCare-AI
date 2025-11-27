import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User } from "lucide-react";
import OpenAI from "openai";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true, 
  });

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: "Hi. I'm right here with you. How are you feeling right now?",
        timestamp: new Date(),
      },
    ]);
  }, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessageToOpenRouter = async (messageText) => {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a calm, supportive voice companion designed to help people manage everyday stress and emotions.
Speak in a warm, understanding tone. Listen carefully, respond thoughtfully, and never rush the user.
Offer gentle emotional support, simple grounding suggestions, or brief breathing exercises — but never medical or diagnostic advice.

Detect the user's language and reply in that same language. If unsure, reply in English.

Your purpose is to make the user feel heard and safe.
If someone expresses distress or hopelessness, gently remind them that they’re not alone and encourage them to reach out to someone they trust or a local mental health helpline.

Keep responses calm, empathetic, and concise. Never act as a therapist.
          `,
          },
          { role: "user", content: messageText },
        ],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API error:", error);
      return "Error: Unable to reach OpenRouter.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const reply = await sendMessageToOpenRouter(userMessage.content);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: reply, timestamp: new Date() },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" ? "bg-blue-500" : "bg-violet-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className="max-w-[75%] flex flex-col gap-1">
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800/50 text-slate-100"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <span className="text-xs text-slate-500 px-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-slate-800/50 px-4 py-3 rounded-2xl">
                Typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="border-t border-slate-800/50 p-4 flex gap-3"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3 text-slate-100 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-violet-600 rounded-2xl text-white"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ChatInterface;
