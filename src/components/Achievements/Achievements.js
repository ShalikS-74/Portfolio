import React from 'react';
import './Achievements.css';

const items = [
  'Coming Soon'
];

const Achievements = () => {
  return (
    <section className="achievements" id="achievements">
      <div className="section-inner">
        <h2>Achievements</h2>
        <ul>
          {items.map((a, i) => (
            <li key={i} className="reveal" style={{ '--delay': `${0.06 * i}s` }}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achievements;
