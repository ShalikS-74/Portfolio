import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Designed & built by Shalik © {new Date().getFullYear()} — Made with ❤️, React, and late-night coffee.</p>
      <div className="links">
        <a href="https://github.com/ShalikS-74/" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/shalik-sahul-43aaa0378/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
