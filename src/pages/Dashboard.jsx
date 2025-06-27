import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import './Dashboard.css';
import ExploreJobs from '../components/ExploreJobs';
import ConnectWithDevs from '../components/ConnectWithDevs';
import AppliedJobs from '../components/AppliedJobs';

const Dashboard = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/getUser', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
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
    const res = await fetch('http://localhost:5000/api/auth/updatebio', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      setEditMode(false);
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div className='dashboard-maincontainer'>
      
      <div className='add-jobs'>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2>{user?.name}</h2>

          {editMode ? (
            <>
              <input name="bio" value={user?.bio || ''} onChange={handleChange} placeholder="Bio" />
              <input name="education" value={user?.education || ''} onChange={handleChange} placeholder="Education" />
              <input name="experience" value={user?.experience || ''} onChange={handleChange} placeholder="Experience" />
              <input name="projects" value={user?.projects || ''} onChange={handleChange} placeholder="Projects" />
              <input name="resume" value={user?.resume || ''} onChange={handleChange} placeholder="Resume Link" />
              <input name="github" value={user?.github || ''} onChange={handleChange} placeholder="GitHub Link" />
              <button className="save-btn" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Bio:</strong> {user?.bio || 'No bio provided'}</p>
              <p><strong>Education:</strong> {user?.education || 'Not added'}</p>
              <p><strong>Experience:</strong> {user?.experience || 'Not added'}</p>
              <p><strong>Projects:</strong> {user?.projects || 'Not added'}</p>
              <p><strong>Resume:</strong> {user?.resume ? <a href={user.resume}>View</a> : 'Not uploaded'}</p>
              <p><strong>GitHub:</strong> {user?.github ? <a href={user.github}>View</a> : 'Not added'}</p>
            </>
          )}

          <div className="button-group">
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* ➕ Extra Cards Section */}
        <div className="extras-container">
          <div className="extra-card" onClick={() => navigate('/jobs')}>
            <ExploreJobs/>
          </div>

          {/* Connections Card */}
          <div className="extra-card">
            <ConnectWithDevs/>
          </div>
        </div>
        </div>
        <div className="dashboard-right">
          <AppliedJobs />
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
