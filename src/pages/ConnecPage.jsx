import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ConnectPage.css';

const ConnectPage = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchDevelopers();
  }, []);

  const handleConnect = (id) => {
    navigate(`/Profile/${id}`);
  };

  // Filter developers based on name, education or skills
  const filteredDevelopers = developers.filter((dev) => {
    const term = searchTerm.toLowerCase();
    return (
      dev.name?.toLowerCase().includes(term) ||
      dev.education?.toLowerCase().includes(term) ||
      dev.skills?.join(' ').toLowerCase().includes(term) // assuming skills is an array
    );
  });

  return (
    <div className="connect-wrapper">
      
      <div className="connect-page">
        <h2 className="connect-heading">Connect With Other Developers</h2>

        <input
          type="text"
          className="search-bar"
          placeholder="Search developers by name, education or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="status-text">Loading developers...</p>
        ) : filteredDevelopers.length === 0 ? (
          <p className="status-text">No matching developers found.</p>
        ) : (
          <div className="developer-cards">
            {filteredDevelopers.map((dev) => (
              <div key={dev._id} className="developer-card">
                <h3>{dev.name}</h3>
                <p><strong>Bio:</strong> {dev.bio || "No bio provided"}</p>
                <p><strong>Education:</strong> {dev.education || "Not added"}</p>
                <p><strong>Experience:</strong> {dev.experience || "Not added"}</p>
                <p>
                  <strong>GitHub:</strong>{" "}
                  {dev.github ? (
                    <a href={dev.github} target="_blank" rel="noopener noreferrer">
                      {dev.github}
                    </a>
                  ) : (
                    "Not added"
                  )}
                </p>
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
