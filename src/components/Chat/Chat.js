import React from 'react';
import './Chat.css';

const Chat = () => {
  return (
    <section className="chat-section" id="chat">
      <div className="section-inner">
        <h2>Let’s Chat with my AI</h2>
        <p className="chat-sub">Ask about my projects, request my GitHub/LinkedIn, or drop a quick hello.</p>

        <div className="chat-actions">
          <a className="launch-ai" href="https://sha-l1k.shalik.dev" target="_blank" rel="noreferrer">Launch SHA-L1K</a>
          <div className="contact-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="icon-link">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="icon-link">LinkedIn</a>
            <a href="mailto:shaliksahul74@gmail.com" className="icon-link">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
