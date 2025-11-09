import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="section-inner">
        <h2 className="about-title">About Me</h2>

        <p className="about-text">
          I build experiments at the intersection of AI and interactive experiences — web apps,
          chat assistants, and lightweight games. I focus on clean code, simple UX, and fast demos.
        </p>

        <h3 className="interests-title">Interests</h3>
        <div className="interests">
          <div className="chip">
            <span className="chip-emoji" aria-hidden>🎮</span>
            <span className="chip-label">Game Development</span>
          </div>
          <div className="chip">
            <span className="chip-emoji" aria-hidden>🤖</span>
            <span className="chip-label">Artificial Intelligence</span>
          </div>
          <div className="chip">
            <span className="chip-emoji" aria-hidden>🌐</span>
            <span className="chip-label">Web Applications</span>
          </div>
          <div className="chip">
            <span className="chip-emoji" aria-hidden>⚡</span>
            <span className="chip-label">Learning New Tech</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
