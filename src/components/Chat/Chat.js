import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // 🧠 Auto-scroll when new messages appear
  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 🪄 Auto-focus input after sending messages
  useEffect(() => {
    if (!loading && chatStarted) {
      inputRef.current?.focus();
    }
  }, [messages, loading, chatStarted]);

  // ✨ Start chat — SHA-L1K introduction
  const startChat = () => {
    setChatStarted(true);
    setMessages([
      {
        from: "bot",
        text: "Hey there! 👋 I’m SHA-L1K — the AI assistant built by Shalik S. Ask me about his projects, skills, or anything tech-related!",
      },
    ]);
  };

  // 📨 Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input;
    setInput("");
    setLoading(true);
    setBotTyping(true); // show typing animation

    try {
      const res = await fetch("https://portfolio-3lyj.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();

      // ⏳ Simulate natural typing delay for realism
      setTimeout(() => {
        setBotTyping(false);
        if (res.ok && data.reply) {
          setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              from: "bot",
              text:
                "⚠️ Hmm... I ran into a small hiccup connecting to my brain. Try again soon!",
            },
          ]);
        }
      }, 1200); // 1.2s delay for realism
    } catch (err) {
      console.error("Chat error:", err);
      setBotTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "⚠️ Something went wrong connecting to my backend. Try again later!",
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

        {!chatStarted ? (
          <div className="chat-start">
            <p>💬 SHA-L1K is online — ready to chat when you are.</p>
            <button onClick={startChat} className="start-chat-btn">
              Start Chat
            </button>
          </div>
        ) : (
          <>
            <div className="chat-box">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.from}`}>
                  <p>{msg.text}</p>
                </div>
              ))}

              {/* 🟣 Typing indicator */}
              {botTyping && (
                <div className="chat-message bot typing">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              )}

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
                ref={inputRef}
                autoFocus
              />
              <button onClick={sendMessage} disabled={loading}>
                {loading ? "..." : "Send"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Chat;
