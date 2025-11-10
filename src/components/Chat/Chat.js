// src/components/Chat/Chat.js
import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hey there, I’m SHA-L1K. Ask me about Shalik’s projects, skills, or get his contact info!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

 useEffect(() => {
  if (messages.length > 1) {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);


  // Send message to backend
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newUserMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const botReply =
        data?.reply || "⚠️ Hmm… SHA-L1K didn’t quite get that. Try again?";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "💀 Something went wrong, try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section className="chat-section" id="chat">
      <div className="chat-inner">
        <h2 className="chat-title">Let’s Chat with my AI 🤖</h2>
        <p className="chat-sub">
          Powered by <strong>Gemini</strong> — SHA-L1K can tell you about my
          projects, skills, or share my links.
        </p>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {msg.text.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          ))}
          {isLoading && (
            <div className="bot-message typing">SHA-L1K is thinking...</div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
