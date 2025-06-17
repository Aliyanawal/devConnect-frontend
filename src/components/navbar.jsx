import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default dark

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? '#f9fafb' : '#1f2937';
    document.body.style.color = darkMode ? '#1f2937' : '#f9fafb';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">DevConnect</Link>

      <div className="right-nav">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '🌞' : '🌙'}
        </button>

        <button className="hamburger" onClick={toggleMenu}>☰</button>

        <ul className={`nav-links ${showMenu ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profiles">Explore</Link></li>

          {isAuthenticated ? (
            <li className="dropdown">
              <span onClick={toggleDropdown} className="avatar">👤</span>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
