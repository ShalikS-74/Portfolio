import React, { useState, useEffect, useRef } from 'react';
import './Experience.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('journey');
  const [visibleItems, setVisibleItems] = useState([]);

  const timelineEvents = [
    {
      id: 1,
      year: '2024',
      title: 'Advanced Portfolio Development',
      type: 'project',
      description: 'Built comprehensive portfolio with AI integration, game development, and modern web technologies.',
      achievements: ['Integrated Gemini AI chatbot', 'Converted Python game to web', 'Implemented responsive design'],
      skills: ['React', 'Google Gemini API', 'HTML5 Canvas', 'JavaScript'],
      icon: '🚀'
    },
    {
      id: 2,
      year: '2023-2024',
      title: 'AI/ML Exploration',
      type: 'learning',
      description: 'Deep dive into machine learning, natural language processing, and AI integration in web applications.',
      achievements: ['Built text classification models', 'Integrated AI APIs', 'Developed NLP applications'],
      skills: ['Python', 'TensorFlow', 'Google Gemini API', 'NLP'],
      icon: '🤖'
    },
    {
      id: 3,
      year: '2023',
      title: 'Full-Stack Web Development',
      type: 'project',
      description: 'Developed multiple full-stack applications with modern technologies and best practices.',
      achievements: ['Built e-commerce platforms', 'Created RESTful APIs', 'Implemented authentication'],
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      icon: '💻'
    },
    {
      id: 4,
      year: '2022-2023',
      title: 'Game Development Journey',
      type: 'project',
      description: 'Started game development with Python and Tkinter, creating interactive games and simulations.',
      achievements: ['Developed Red Block Survival Game', 'Implemented game physics', 'Created multiple difficulty modes'],
      skills: ['Python', 'Tkinter', 'Game Physics', 'Algorithm Design'],
      icon: '🎮'
    },
    {
      id: 5,
      year: '2022',
      title: 'Web Development Foundations',
      type: 'learning',
      description: 'Built strong foundation in HTML, CSS, and JavaScript with multiple practice projects.',
      achievements: ['Mastered responsive design', 'Learned modern JavaScript', 'Built interactive websites'],
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      icon: '🌐'
    }
  ];

  const futureGoals = [
    {
      id: 1,
      title: 'Machine Learning Engineer',
      timeframe: '2024-2025',
      description: 'Transition into ML engineering role, focusing on production AI systems and model deployment.',
      progress: 60,
      milestones: ['Complete advanced ML courses', 'Build production-ready models', 'Contribute to open source ML projects'],
      skills: ['Advanced TensorFlow', 'ML Operations', 'Cloud Deployment', 'Production ML'],
      icon: '🎯'
    },
    {
      id: 2,
      title: 'Full-Stack Development Mastery',
      timeframe: '2024-2025',
      description: 'Deepen expertise in modern web technologies and architecture patterns.',
      progress: 75,
      milestones: ['Master advanced React patterns', 'Learn microservices architecture', 'Build scalable applications'],
      skills: ['Advanced React', 'System Design', 'Cloud Architecture', 'DevOps'],
      icon: '⚡'
    },
    {
      id: 3,
      title: 'Open Source Contributions',
      timeframe: '2024-2026',
      description: 'Actively contribute to open source projects and build a strong developer community presence.',
      progress: 30,
      milestones: ['Contribute to major projects', 'Maintain own open source projects', 'Speak at tech conferences'],
      skills: ['Git Collaboration', 'Code Review', 'Community Building', 'Technical Writing'],
      icon: '🌟'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Game Developer',
      description: 'Successfully created and published an interactive web game',
      icon: '🎮',
      unlocked: true,
      date: '2024'
    },
    {
      id: 2,
      title: 'AI Integrator',
      description: 'Integrated advanced AI capabilities into web applications',
      icon: '🤖',
      unlocked: true,
      date: '2024'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      description: 'Built complete web applications from frontend to backend',
      icon: '💻',
      unlocked: true,
      date: '2023'
    },
    {
      id: 4,
      title: 'Problem Solver',
      description: 'Developed creative solutions to complex technical challenges',
      icon: '🧩',
      unlocked: true,
      date: '2023'
    },
    {
      id: 5,
      title: 'Continuous Learner',
      description: 'Demonstrated commitment to ongoing skill development',
      icon: '📚',
      unlocked: true,
      date: '2022'
    },
    {
      id: 6,
      title: 'Cloud Architect',
      description: 'Deployed and managed applications on cloud platforms',
      icon: '☁️',
      unlocked: false,
      targetDate: '2025'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.timeline-item, .goal-card, .achievement-card');
    items.forEach(item => observer.observe(item));

    return () => {
      items.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        <div className="experience-header">
          <h2>Experience & Journey</h2>
          <p>My path through web development, game development, and AI exploration. A timeline of growth, challenges, and achievements.</p>
        </div>

        <div className="experience-tabs">
          <button
            className={`tab-button ${activeTab === 'journey' ? 'active' : ''}`}
            onClick={() => setActiveTab('journey')}
          >
            🛤️ Journey
          </button>
          <button
            className={`tab-button ${activeTab === 'goals' ? 'active' : ''}`}
            onClick={() => setActiveTab('goals')}
          >
            🎯 Future Goals
          </button>
          <button
            className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🏆 Achievements
          </button>
        </div>

        {activeTab === 'journey' && (
          <div className="journey-content">
            <div className="timeline">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`timeline-item fade-in ${index % 2 === 0 ? 'left' : 'right'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="timeline-marker">
                    <div className="timeline-icon">{event.icon}</div>
                    <div className="timeline-date">{event.year}</div>
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{event.title}</h3>
                      <span className={`event-type ${event.type}`}>
                        {event.type === 'project' ? '🚀 Project' : '📚 Learning'}
                      </span>
                    </div>

                    <p className="timeline-description">{event.description}</p>

                    <div className="timeline-achievements">
                      <h4>Key Achievements:</h4>
                      <ul>
                        {event.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="timeline-skills">
                      <h4>Skills Developed:</h4>
                      <div className="skill-tags">
                        {event.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="goals-content">
            <div className="goals-grid">
              {futureGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className="goal-card fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="goal-header">
                    <div className="goal-icon">{goal.icon}</div>
                    <div className="goal-info">
                      <h3>{goal.title}</h3>
                      <span className="goal-timeframe">{goal.timeframe}</span>
                    </div>
                  </div>

                  <p className="goal-description">{goal.description}</p>

                  <div className="goal-progress">
                    <div className="progress-info">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="goal-milestones">
                    <h4>Milestones:</h4>
                    <ul>
                      {goal.milestones.map((milestone, idx) => (
                        <li key={idx}>{milestone}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="goal-skills">
                    <h4>Skills to Develop:</h4>
                    <div className="skill-tags">
                      {goal.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-content">
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`achievement-card fade-in ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="achievement-icon">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>

                  <div className="achievement-info">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    <div className="achievement-date">
                      {achievement.unlocked ? `📅 ${achievement.date}` : `🎯 Target: ${achievement.targetDate}`}
                    </div>
                  </div>

                  <div className="achievement-status">
                    {achievement.unlocked ? (
                      <span className="status-badge unlocked">✨ Unlocked</span>
                    ) : (
                      <span className="status-badge locked">🔒 In Progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;