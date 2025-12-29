import React from 'react';
import './Projects.css';

const projects = [
  {
    id: 'red-block',
    title: 'Red Block Game',
    desc: 'A fast mini-game built with vanilla JS and Canvas — reflex-based gameplay, mobile-friendly controls.',
    tech: 'JavaScript • HTML5 Canvas • CSS',
    code: 'https://github.com/yourusername/red-block',
    demo: 'https://play.shalik.dev/red-block' // example external link
  },
  {
    id: 'shal-l1k',
    title: 'SHA-L1K (AI Assistant)',
    desc: 'Personal assistant using React + Python backend — automates simple tasks and demonstrates API workflows.',
    tech: 'React • Python • OpenAI (demo integrations)',
    code: 'https://github.com/yourusername/sha-l1k',
    demo: 'https://sha-l1k.shalik.dev' // placeholder
  },
  {
    id: 'safevision',
    title: 'SafeVision',
    desc: 'A prototype safety detection app built using Flask for real-time hazard detection.',
    tech: 'Python • Flask',
    code: 'https://github.com/yourusername/safevision',
    demo: '#'
  }
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="section-inner">
        <h2>Featured Projects</h2>

        <div className="projects-grid">
          {projects.map(p => (
            <article key={p.id} className="project-card reveal" style={{ '--delay': '0.06s' }}>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-meta">
                  <div className="tech">{p.tech}</div>
                  <div className="links">
                    <a className="btn-view" href={p.code} target="_blank" rel="noreferrer">
                      <span className="icon"></span> GitHub
                    </a>
                    <button className="btn-readmore">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
