import React from 'react';
import './Skills.css';

// Categories and emoji placeholders (replace emoji with SVGs later if you want)
const categories = [
  { title: 'Languages', items: [{name:'Python', emoji:'🐍'}, {name:'C', emoji:'🔣'}, {name:'JavaScript', emoji:'🟨'}] },
  { title: 'Frontend', items: [{name:'React', emoji:'⚛️'}] },
  { title: 'Backend', items: [{name:'Node.js', emoji:'🟢'}, {name:'Express', emoji:'🚂'}, {name:'MongoDB', emoji:'🍃'}] },
  { title: 'Tools', items: [{name:'VS Code', emoji:'💻'}, {name:'GitHub', emoji:'🐙'}] }
];

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <div className="section-inner">
        <h2>Technical Skills</h2>

        <div className="skills-grid">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-category reveal">
              <h3>{cat.title}</h3>
              <div className="skill-icons">
                {cat.items.map(item => (
                  <div key={item.name} className="skill-badge" title={item.name}>
                    <div className="skill-emoji" aria-hidden>{item.emoji}</div>
                    <div className="skill-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
