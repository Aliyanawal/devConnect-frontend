import React from 'react';
import './Landing.css';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ExploreJobs from '../components/ExploreJobs';
import ConnectWithDevs from '../components/ConnectWithDevs';

const LandingPage = () => {
  return (
    <div className='land'>
      <Navbar/>
    <div className="landing">
      
      <h1 className="landing-heading">Welcome to DevConnect</h1>
      <p className="landing-desc">
        DevConnect is a platform for developers to showcase their skills, projects,
        and connect with other devs. Build your profile and explore others’ journeys.
      </p>
      <div className="landing-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
        
      </div>
      <div className='connect'>
        <ExploreJobs/>
        <ConnectWithDevs/>
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default LandingPage;