// components/ExploreJobs.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Connect.css';

const ExploreJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="explore-box" onClick={() => navigate('/jobs')}>
      <h3>Explore Jobs</h3>
      <p>Discover new opportunities and apply instantly.</p>
    </div>
  );
};

export default ExploreJobs;
