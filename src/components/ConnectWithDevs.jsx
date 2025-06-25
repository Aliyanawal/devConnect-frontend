// components/ConnectWithDevs.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Connect.css';

const ConnectWithDevs = () => {
  const navigate = useNavigate();

  return (
    <div className="explore-box" onClick={() => navigate('/ConnectPage')}>
      <h3>Connect with Developers</h3>
      <p>Find and connect with fellow developers.</p>
    </div>
  );
};

export default ConnectWithDevs;
