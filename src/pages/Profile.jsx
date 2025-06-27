// pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Profile.css';

const ProfilePage = () => {
  const { id } = useParams();
  const [developer, setDeveloper] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/getUserById/${id}`)
      .then(res => res.json())
      .then(data => setDeveloper(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!developer) return <p>Loading profile...</p>;

  return (
    <div className='profile-main'>
    <div className="profile-page">
      
      <div className="profile-container">
        <h2>{developer.name}'s Profile</h2>
        <p><strong>Bio:</strong> {developer.bio}</p>
        <p><strong>Education:</strong> {developer.education}</p>
        <p><strong>Experience:</strong> {developer.experience}</p>
        <p><strong>GitHub:</strong> <a href={developer.github} target="_blank" rel="noreferrer">{developer.github}</a></p>
        <p><strong>Resume:</strong> <a href={developer.resume} target="_blank" rel="noreferrer">View Resume</a></p>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
