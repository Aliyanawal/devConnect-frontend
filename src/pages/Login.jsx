import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        console.log(data.token);
        setIsAuthenticated(true);
        navigate('/dashboard'); // ✅ Navigate to dashboard
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className='login-main'><Navbar/>
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login to DevConnect</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="login-switch">
          New user? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
