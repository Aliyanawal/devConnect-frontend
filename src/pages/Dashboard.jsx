import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer'
import './Dashboard.css';

const Dashboard = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/auth/userName', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    console.log("User profile:", data); // ← Add this
    if (res.ok) {
      setUser(data);
    } else {
      console.error("Error fetching profile");
    }
  };
  fetchProfile();
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/auth/bio', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const updated = await res.json();
      setUser(updated);
      setEditMode(false);
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div className='dashboard-maincontainer'>
       <Navbar />
    
    <div className="dashboard-container">
      
      <div className="dashboard-content">
        <h2>Welcome, {user?.name}</h2>

        {editMode ? (
          <>
            <input name="bio" value={user?.bio || ''} onChange={handleChange} placeholder="Bio" />
            <input name="studies" value={user?.studies || ''} onChange={handleChange} placeholder="Studies" />
            <input name="experience" value={user?.experience || ''} onChange={handleChange} placeholder="Experience" />
            <input name="projects" value={user?.projects || ''} onChange={handleChange} placeholder="Projects" />
            <input name="resume" value={user?.resume || ''} onChange={handleChange} placeholder="Resume Link" />
            <input name="github" value={user?.resume || ''} onChange={handleChange} placeholder="github Link" />
            <button  className="save-btn" onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Bio:</strong> {user?.bio || 'No bio provided'}</p>
            <p><strong>Education:</strong> {user?.studies || 'Not added'}</p>
            <p><strong>Experience:</strong> {user?.experience || 'Not added'}</p>
            <p><strong>Projects:</strong> {user?.projects || 'Not added'}</p>
            <p><strong>Resume:</strong> {user?.resume ? <a href={user.resume}>View</a> : 'Not uploaded'}</p>
            <p><strong>Github:</strong> {user?.resume ? <a href={user.resume}>View</a> : 'Not added'}</p>


          </>
        )}

        <div className="button-group">
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Dashboard;
