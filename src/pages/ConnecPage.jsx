import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ConnectPage.css';

const ConnectPage = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDevelopers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/getAll');
      const data = await res.json();
      setDevelopers(data);
    } catch (err) {
      console.error('Failed to fetch developers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleConnect = (id) => {
    navigate(`/profile/${id}`);
  };


  return (
    <div className='connect.main'><Navbar />
    <div className="connect-page">
      
      <h2 className="connect-heading">Connect With Other Developers</h2>
      {loading ? (
        <p>Loading developers...</p>
      ) : developers.length === 0 ? (
        <p>No developers found.</p>
      ) : (
        <div className="developer-cards">
          {developers.map((dev) => (
            <div key={dev._id} className="developer-card">
              <h3>{dev.name}</h3>
              <p><strong>Bio:</strong> {dev.bio || "No bio provided"}</p>
              <p><strong>Education:</strong> {dev.education || "Not added"}</p>
              <p><strong>Experience:</strong> {dev.experience || "Not added"}</p>
              <p><strong>GitHub:</strong> {dev.github ? <a href={dev.github} target="_blank" rel="noopener noreferrer">{dev.github}</a> : "Not added"}</p>
              <button onClick={() => handleConnect(dev._id)}>Connect</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ConnectPage;
