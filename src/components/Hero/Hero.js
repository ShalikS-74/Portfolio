import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleExplore = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" role="region" aria-label="Intro">
      <div className="hero-inner">
        <h1 className="hero-title">
          Hey, I’m <span>Shalik S</span>.
        </h1>

        <p className="hero-subtitle">
          AI/ML Enthusiast · Game Dev Explorer · Full-Stack Learner
        </p>

        <div className="hero-actions">
          <button
            className="explore-btn"
            onClick={handleExplore}
            aria-label="Explore portfolio"
          >
            Explore Portfolio
          </button>
        </div>
      </div>

      <div className="hero-bg" aria-hidden />
    </section>
  );
};

export default Hero;
