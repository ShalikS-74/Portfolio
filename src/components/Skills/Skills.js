import React from 'react';
import './Skills.css';

// Categories and emoji placeholders (replace emoji with SVGs later if you want)
const categories = [
  { title: 'Languages', items: [{name:'Python', icon:'devicon-python-plain'}, {name:'C', icon:'devicon-c-plain'}, {name:'JavaScript', icon:'devicon-javascript-plain'}] },
  { title: 'Frontend', items: [{name:'React', icon:'devicon-react-original'}] },
  { title: 'Backend', items: [{name:'Node.js', icon:'devicon-nodejs-plain'}, {name:'Express', icon:'devicon-express-original'}, {name:'MongoDB', icon:'devicon-mongodb-plain'}] },
  { title: 'Tools', items: [{name:'VS Code', icon:'devicon-vscode-plain'}, {name:'GitHub', icon:'devicon-github-original'}] }
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
                    <i className={`${item.icon} skill-icon`}></i>
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
