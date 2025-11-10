import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey there! 👋 I’m SHA-L1K — your AI assistant built by Shalik S. Ask me about his projects, skills, or anything tech!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 🧠 Auto-scroll when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📨 Send user message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 🔗 Your deployed backend URL on Vercel
      const res = await fetch("https://portfolio-3lyj.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages(prev => [...prev, { from: "bot", text: data.reply }]);
      } else {
        throw new Error(data.error || "Unexpected response");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text:
            "⚠️ Oops! I ran into an issue connecting to my brain (backend). Try again in a bit!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section id="chat" className="chat-section">
      <div className="chat-container">
        <h2 className="chat-title">Let's Chat with my AI 🤖</h2>
        <p className="chat-subtitle">
          Ask SHA-L1K about Shalik’s projects, skills, or connect with his work!
        </p>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.from}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Chat;
