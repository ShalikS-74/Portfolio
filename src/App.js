import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Achievements from './components/Achievements/Achievements';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';
import './App.css';


function App() {
  return (
    <div className="App">
      <Hero />
      <main>
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Chat />
      </main>
      <Footer />
    </div>
  );
}


export default App;
