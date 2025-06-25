// pages/ConnectPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ConnectPage.css';

const dummyDevelopers = [
  {
    id: 1,
    name: 'Adil Mahmood',
    skills: ['React', 'Node.js', 'MongoDB'],
    bio: 'Full Stack Developer passionate about building modern web apps.',
  },
  {
    id: 2,
    name: 'Aisha Khan',
    skills: ['Python', 'Django', 'Machine Learning'],
    bio: 'AI enthusiast and backend developer.',
  },
  {
    id: 3,
    name: 'Ravi Verma',
    skills: ['Angular', 'Firebase', 'UI/UX'],
    bio: 'Frontend wizard with love for clean UI.',
  },
];

const ConnectPage = () => {
  const navigate = useNavigate();

  const handleConnect = (devId) => {
    navigate(`/profile/${devId}`); // This route should lead to detailed profile
  };

  return (
    <div className="connect-page">
      <Navbar />
      <h2 className="connect-heading">Connect With Other Developers</h2>
      <div className="developer-cards">
        {dummyDevelopers.map((dev) => (
          <div key={dev.id} className="developer-card">
            <h3>{dev.name}</h3>
            <p><strong>Skills:</strong> {dev.skills.join(', ')}</p>
            <p><strong>Bio:</strong> {dev.bio}</p>
            <button onClick={() => handleConnect(dev.id)}>Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectPage;
