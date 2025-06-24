import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>DevConnect</h3>
          <p>Connecting developers across the globe to collaborate, grow, and build amazing things together.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@devconnect.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 DevConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
